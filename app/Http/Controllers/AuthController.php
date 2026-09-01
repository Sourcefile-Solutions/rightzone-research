<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Models\Customer;
use App\Models\LoginOTP;
use App\Models\Settings;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{




    public function showMobileForm(Request $request)
    {


        return view('public.report.login');
    }


    public function checkUser(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|digits:10',
        ]);



      
        $response = Http::post('https://dresearch.thefinsap.com/api/public-site/check-user', [
            'phone' => $validated['phone'],
        ]);


        if ($response['status'] == "error") return response()->json([
            'status' => 'error',
            'message' => $response['message'],
        ]);

        else if ($response['status'] == "success") {
          $result = $this->sendOTP($response['lead']);
            if ($result) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'OTP sent successfully.',
                    'otpPage'=>view('public.report.otp', [
                        'phone' => $validated['phone'],
                    ])->render(),
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => "Failed to send OTP. Please try again later.",
                ]);
            }
        }
    }


    private function sendOTP($lead)
    {


        $user = User::updateOrCreate(
            [
                // Match by either lead_id or phone
                'lead_id' => $lead['id'],
                'phone' => $lead['phone'],
            ],
            [
                'first_name' => $lead['first_name'],
            ]
        );

        if (!$user) return false;

        $already = LoginOTP::where([['lead_id', $user->lead_id], ['phone', $user->phone], ['user_id', $user->id]])
            ->where('is_verified', false)
            ->first();
        $expiresAt = Carbon::now()->addMinutes(5);
        if (!$already) {
            $otp = rand(1000, 9999);
            LoginOTP::create([
                'user_id' => $user->id,
                'lead_id' => $user->lead_id,
                'phone' => $user->phone,
                'otp' => $otp,
                'expires_at' => $expiresAt,
                'ip_address' => request()->ip(),
                'user_agent' => request()->header('User-Agent'),
            ]);
        } else {
            $already->expires_at = $expiresAt;
            $already->ip_address = request()->ip();
            $already->user_agent = request()->header('User-Agent');
            $already->save();
            $otp = $already->otp;
        }

        return $this->sendOtpSMS($user, $otp);
    }

    private function sendOtpSMS($user, $otp)
    {
       
    

     try {
    $response = Http::timeout(15)->get('https://dresearch.thefinsap.com/api/public-site/whatsapp-otp-template');

    // First, check if request was successful
    if ($response->successful()) {
        $data = $response->json();

     
        if (isset($data['status']) && $data['status'] === 'success') {
            $template= $data['template'];
            $whatsappConfig=$data['whatsappConfig'];

          

              
        



$components = [];

// BODY COMPONENT (1st variable)
$components[] = [
    "type" => "body",
    "parameters" => [
        [
            "type" => "text",
            "text" =>$otp
        ]
    ]
];

// BUTTON COMPONENT (2nd variable)
$components[] = [
    "type" => "button",
    "sub_type" => "url",
    "index" => "0",
    "parameters" => [
        [
            "type" => "text",
            "text" => $otp
        ]
    ]
];


        } 

        
            $phone = '91' . $user->phone;
            $payload = [
                "messaging_product" => "whatsapp",
                "to" => $phone,
                "type" => "template",
                "template" => [
                    "name" => $template['template_name'],
                    "language" => [
                        "code" => $template['code']
                    ],
                    "components" => $components
                ]
            ];
            $payload = $payload;

          
          return $this->sendWhatsAppAPI($payload, $whatsappConfig);
    } 

} catch (\Exception $e) {
    return response()->json([
        'error' => 'Failed to connect to remote API',
        'message' => $e->getMessage(),
    ], 500);
}


      




      

          
           


      

       
    }


     private function sendWhatsAppAPI($payload, $whatsappConfig)
{
    $response = Http::withHeaders([
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . $whatsappConfig['token'],
    ])->withBody(json_encode($payload), 'application/json')
    ->post(
        $whatsappConfig['api_link'] . '/' .
        $whatsappConfig['version'] . '/' .
        $whatsappConfig['phone_no_id'] . '/messages'
    );

    if ($response->successful()) {
        return ['status' => 'success', 'data' => $response->json()];
    } else {
        Log::error('WhatsApp message failed', [
            'error' => $response->body(),
            'status' => $response->status(),
        ]);
        return ['status' => 'failed', 'error' => $response->body()];
    }
}


    public function verifyOtp(Request $request)
    {
        $otp = LoginOTP::where([['phone', $request->input('phone')], ['otp', $request->input('otp')],['is_verified', false]])
            ->first();

        if ($otp) {
            $otp->is_verified =true;
            $otp->save();
            $user = User::find($otp->user_id);
Auth::login($user);
            return response()->json(['status' => 'success', 'message' => 'OTP  verified.']);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Invalid OTP or already verified.']);
        }
    }



    // Show OTP verification form
    public function showOtpForm()
    {
        $mobile = session('mobile');
        if (!$mobile) {
            return redirect()->route('login');
        }

        $contact = Settings::first();
        return view('public.auth.otp', [
            'mobile' => $mobile,
            'contact' => $contact
        ]);
    }

    // Verify OTP and login
    // public function verifyOtp(Request $request)
    // {
    //     $otpArray = $request->input('otp');
    //     $otp = implode('', $otpArray);

    //     $request->merge(['otp' => $otp]);

    //     $request->validate([
    //         'otp' => 'required|digits:4',
    //         'mobile' => 'required|digits:10',
    //     ]);

    //     // Now continue with your logic
    //     $mobile = $request->input('mobile');
    //     $customer = Customer::where('mobile', $mobile)->first();

    //     if (!$customer) {
    //         return back()->withErrors(['mobile' => 'Customer not found']);
    //     }

    //     if ($customer->otp != $otp) {
    //         return back()->withErrors(['otp' => 'Invalid OTP']);
    //     }

    //     Auth::guard('customers')->login($customer);
    //     $request->session()->regenerate();

    //     return redirect()->intended(route('dashboard'));
    // }


    // Logout customer
    public function logout(Request $request)
    {
        Auth::guard('customers')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('reports/login')->with([
            'status' => 'success',
            'message' => 'Logged out successfully!',
        ]);
    }
}
