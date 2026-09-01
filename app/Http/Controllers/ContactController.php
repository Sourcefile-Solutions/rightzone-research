<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http as HttpClient;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index()
    {
        // $settings = Setting::first();
        return view('contact');
    }

    /**
     * Store a newly created contact message via API.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:10',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($data);

        return response()->json([
            'message' => 'Contact saved successfully',
            'data' => $contact,
        ], 201);
    }

    /**
     * Proxy check to external employee-phone API to avoid CORS issues.
     */
    public function checkEmployeesPhone(Request $request)
    {
        // accept phone from route param, query string, or POST body
        $phone = $request->route('phone') ?? $request->query('phone') ?? $request->input('phone');

        if (!is_string($phone) || trim($phone) === '') {
            return response()->json(['message' => 'phone is required'], 422);
        }

        $phone = trim($phone);

        try {
            $url = 'https://dresearch.thefinsap.com/api/check-employees-phone/' . urlencode($phone);
            $res = HttpClient::withHeaders([
                'Accept' => 'application/json',
            ])->get($url);

            $body = $res->body();
            $status = $res->status();
            $contentType = $res->header('Content-Type', 'application/json');

            return response($body, $status)->header('Content-Type', $contentType);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Upstream request failed',
                'error' => $e->getMessage(),
            ], 502);
        }
    }
}
