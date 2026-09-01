<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\TestimonilController;
// use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\KycController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/






// Route::post('/reports', [ReportController::class, 'store']);
// Route::get('/reports', [ReportController::class, 'index']);
// Route::put('/reports/{id}', [ReportController::class, 'update']);
// Route::delete('/reports/{id}', [ReportController::class, 'destroy']);


Route::post('/click', [ContactController::class, 'click']);

Route::get('/click', [ContactController::class, 'click']);

// store contact messages
Route::post('/contacts', [ContactController::class, 'store']);
// also accept singular path in case client posts to /api/contact
Route::post('/contact', [ContactController::class, 'store']);

Route::get('/kyc/get-token-data', [KycController::class, 'index']);
Route::post('/kyc/checkphone', [KycController::class, 'checkphone']);
// allow GET /api/kyc/checkphone/{phone} for external services that use GET
Route::get('/kyc/checkphone/{phone?}', [KycController::class, 'checkphone']);

Route::post('/kyc/verify-otp', [KycController::class, 'verifyOtp']);

Route::group(['middleware' => 'auth:sanctum'], function () {
  Route::post('/kyc/submit-kyc', [KycController::class, 'store']);
   Route::get('/kyc/get-phone', [KycController::class, 'getPhone']);

 
});

