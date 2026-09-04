<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\KycController;

// accept API-style POSTs to store contact messages (disable CSRF for these endpoints)
Route::post('/api/contacts', [ContactController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

Route::post('/api/contact', [ContactController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

// Proxy endpoint to check employee phone using external API to avoid CORS
Route::post('/api/check-employees-phone', [ContactController::class, 'checkEmployeesPhone'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
Route::get('/api/check-employees-phone/{phone?}', [ContactController::class, 'checkEmployeesPhone'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);


// KYC proxy endpoints (POST + GET) to support client consent form
Route::get('/api/kyc/get-token-data', [KycController::class, 'index'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
Route::post('/api/kyc/checkphone', [KycController::class, 'checkphone'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
Route::get('/api/kyc/checkphone/{phone?}', [KycController::class, 'checkphone'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
Route::post('/api/kyc/verify-otp', [KycController::class, 'verifyOtp'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
