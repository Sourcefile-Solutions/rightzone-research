<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\Lead;
use Illuminate\Validation\Rule;

class KycController extends Controller
{

    public function getPhone(Request $request)
    {
        $lead = $request->user();

        $result = Http::get('https://rightzone-mdu.thefinsap.com/api/dresearch-get-phone/' . $lead->phone);

        if ($result['status'] == 'success') {

            return response()->json([
                'status' => 'success',
                'action' => 'continue',
                'message' => 'session active',
                'phone' => $lead->phone,
                'data' => $result['data'],
                'fields' => $result['fields'],
                'mandatory' => $result['mandatory'],
            ]);
        }


        return response()->json(['status' => 'error']);
    }

    public function checkphone(Request $request)
    {

        // Accept phone from route param, query or POST body to support GET clients
        $phone = $request->route('phone') ?? $request->query('phone') ?? $request->input('phone');

        $data = ['phone' => $phone];

        $validated = Validator::make($data, [
            'phone' => 'required|digits:10',
        ])->validate();

        $result = Http::post('https://rightzone-mdu.thefinsap.com/api/dresearch-check-phone', [
            'phone' => $validated['phone'],
        ]);


        //  return $result;
        if ($result['status'] == 'error' && $result['action'] == 'error') {
            throw ValidationException::withMessages([
                'phone' => [$result['message']],
            ]);
        } else if ($result['status'] == 'error' && $result['action'] == 'warning') {
            return response()->json(['status' => 'error', 'action' => 'warning', 'message' => $result['message']]);
        } else if ($result['status'] == 'success') {

            $user = Lead::firstOrCreate(
                ['phone' => $result['lead']['phone']],
                [
                    'first_name' => $result['lead']['first_name'],
                    'last_name' => $result['lead']['last_name'],
                    'lead_id' => $result['lead']['id'],
                ]
            );
            //$user->otp= random_int(1234, 9876);//
            // return 123;
            if ($user->save()) return response()->json(['status' => 'success', 'action' => 'continue', 'message' => 'OTP send successfully', 'data' => $result['data'], 'fields' => $result['fields']]);

            throw ValidationException::withMessages([
                'phone' => 'something went wrong',
            ]);
        }

        return $result;
    }



    public function verifyOtp(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|digits:10',
            'otp' => 'required|digits:4',
        ]);

        $result = Http::post('https://rightzone-mdu.thefinsap.com/api/dresearch-verify-otp', [
            'phone' => $validated['phone'],
            'otp' => $validated['otp'],
        ]);



        if ($result['status'] == 'error') {
            throw ValidationException::withMessages([
                'otp' => [$result['message']],
            ]);
        } else if ($result['status'] == 'success') {

            $lead = Lead::where('phone', $validated['phone'])->first();
            if (!$lead) {
                throw ValidationException::withMessages([
                    'otp' => ['Customer not found'],
                ]);
            }

            $token =  $lead->createToken('Dresearch', ['role:leads'])->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'OTP verified successfully',
                'token' => $token,
            ]);
        }

        return response()->json(['status' => 'error', 'message' => 'something went wrong']);
    }


    public function store(Request $request)
    {
        /* =====================================================
DECODE FRONTEND JSON
===================================================== */


        $visibleFields   = json_decode($request->fields, true) ?? [];
        $mandatoryFields = json_decode($request->mandatory, true) ?? [];
        $existingFiles   = json_decode($request->existingFiles, true) ?? [];

        /*
    REQUIRED RULE:
    Required ONLY when:
    - field is mandatory
    - file/data not already existing
*/
        $requiredIfNeeded = function ($field) use ($mandatoryFields, $existingFiles) {
            return Rule::requiredIf(
                in_array($field, $mandatoryFields) &&
                    empty($existingFiles[$field])
            );
        };

        /* =====================================================
   VALIDATION RULES
===================================================== */

        $rules = [

            'full_name' => [
                'sometimes',
                $requiredIfNeeded('full_name'),
                'string',
                'max:100',
            ],

            'phone' => [
                'sometimes',
                $requiredIfNeeded('phone'),
                'digits:10',
            ],

            'email' => [
                'sometimes',
                $requiredIfNeeded('email'),
                'nullable',
                'email',
                'max:255',
            ],

            'pan_number' => [
                'sometimes',
                $requiredIfNeeded('pan_number'),
                'nullable',
                'regex:/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/',
            ],

            'aadhaar_number' => [
                'sometimes',
                $requiredIfNeeded('aadhaar_number'),
                'nullable',
                'digits:12',
            ],

            'dob' => [
                'sometimes',
                $requiredIfNeeded('dob'),
                'nullable',
                'date',
            ],

            /* ---------- FILES ---------- */

            'upload_pan' => [
                'sometimes',
                $requiredIfNeeded('upload_pan'),
                'file',
                'mimes:jpg,jpeg,png,pdf',
                'max:10240',
            ],

            'upload_aadhaar_front' => [
                'sometimes',
                $requiredIfNeeded('upload_aadhaar_front'),
                'file',
                'mimes:jpg,jpeg,png,pdf',
                'max:10240',
            ],

            'upload_aadhaar_back' => [
                'sometimes',
                $requiredIfNeeded('upload_aadhaar_back'),
                'file',
                'mimes:jpg,jpeg,png,pdf',
                'max:10240',
            ],

            /* ---------- SIGNATURE ---------- */

            'signature' => [
                'sometimes',
                $requiredIfNeeded('signature'),
                'file',
                'mimes:png,jpg,jpeg',
                'max:10240',
            ],
        ];

        $validated = $request->validate($rules);

        /* =====================================================
   MULTIPART REQUEST TO MAIN SERVER
===================================================== */

        $http = Http::asMultipart();

        $fileFields = [
            'upload_pan',
            'upload_aadhaar_front',
            'upload_aadhaar_back',
            'signature'
        ];

        foreach ($fileFields as $fileField) {

            if ($request->hasFile($fileField)) {

                $file = $request->file($fileField);

                $http->attach(
                    $fileField,
                    file_get_contents($file->getRealPath()),
                    $file->getClientOriginalName()
                );

                // remove existing flag because new file uploaded
                unset($existingFiles[$fileField]);
            }
        }

        /* =====================================================
   PAYLOAD
===================================================== */

        $payload = $request->except([
            'upload_pan',
            'upload_aadhaar_front',
            'upload_aadhaar_back',
            'signature',
        ]);

        // Important → send these to API
        $payload['fields'] = json_encode($visibleFields);
        $payload['mandatory'] = json_encode($mandatoryFields);
        $payload['existingFiles'] = json_encode($existingFiles);

        /* =====================================================
   API CALL
===================================================== */

        $response = $http->post(
            'https://rightzone-mdu.thefinsap.com/api/dresearch-submit-kyc',
            $payload
        );

        return response()->json($response->json(), $response->status());
    }
}
