import React, { cache, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// Token utilities
function setWithExpiry(key, value, hours) {
    const now = new Date();
    localStorage.setItem(
        key,
        JSON.stringify({
            value,
            expiry: now.getTime() + hours * 60 * 60 * 1000,
        }),
    );
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

export default function ClientConsentForm() {
    const [searchParams] = useSearchParams();

    const urlToken = searchParams.get("token");
    const authToken = getWithExpiry("auth_token");

    console.log("URL Token:", urlToken);
    console.log("Auth Token:", authToken);

    const [isLoading, setIsLoading] = useState(true);

    const [params, setParams] = useState({
        tab: "phone",
        url: "",
        phone: "",
        lockPhone: false,
        token: authToken || "",
        fields: [],
        mandatory: [],
        data: {},
        formData: {},
        existingFiles: {},
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const [errors, setErrors] = useState({});

    const fetchTokenData = async (token) => {
        try {
            const response = await fetch(
                `/api/kyc/get-token-data?token=${token}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Failed to fetch token data");
            }
            const data = await response.json();
            if (data.status == "success") {
                setParams({
                    tab: "phone",
                    url: data.url,
                    phone: data.phone,
                    lockPhone: true,
                });
            } else {
                setParams({
                    tab: "phone",
                });
            }
        } catch (error) {
            console.error("Error fetching token data:", error);
            setParams({
                tab: "phone",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getPhoneData = async (token) => {
        try {
            const response = await axios.get(
                `/api/kyc/get-phone?url=${params.url}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.status === "success") {
                const fields = response.data.fields || [];
                const mandatory = response.data.mandatory || [];
                const data = response.data.data || {};

                console.log("Phone data response:", response.data);

                // Initialize formData with existing data
                const initialFormData = {};
                const initialExistingFiles = {};

                fields.forEach((field) => {
                    if (data[field] !== null && data[field] !== undefined) {
                        initialFormData[field] = data[field];
                    }
                    // Check if file already exists (for upload fields and signature)
                    if (
                        data[field] &&
                        (field.includes("upload_") || field === "signature")
                    ) {
                        initialExistingFiles[field] = true;
                        console.log(`Existing file detected: ${field}`);
                    }
                });

                console.log("Initial existing files:", initialExistingFiles);

                setParams((prevParams) => ({
                    ...prevParams,
                    fields: fields,
                    mandatory: mandatory,
                    data: data,
                    formData: initialFormData,
                    existingFiles: initialExistingFiles,
                    tab: "form",
                    phone: response.data.phone || prevParams.phone,
                }));
            }
        } catch (error) {
            console.error("Error fetching phone data:", error);
        }
    };

    useEffect(() => {
        if (authToken) {
            // If we have an auth token, load form data directly
            setParams((prev) => ({ ...prev, tab: "form" }));
            getPhoneData(authToken);
            setIsLoading(false);
        } else if (urlToken) {
            // If we have a URL token, fetch token data first
            fetchTokenData(urlToken);
        } else {
            // No token, show phone input
            setParams((prev) => ({ ...prev, tab: "phone" }));
            setIsLoading(false);
        }
    }, [urlToken, authToken]);

    const changeValue = (e) => {
        const { value, name, files } = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));

        // Handle form fields separately
        if (
            [
                "full_name",
                "email",
                "pan_number",
                "dob",
                "aadhaar_number",
                "age",
            ].includes(name)
        ) {
            setParams((prevParams) => ({
                ...prevParams,
                formData: {
                    ...prevParams.formData,
                    [name]: value,
                },
            }));
        } else if (
            [
                "signature",
                "upload_pan",
                "upload_aadhaar_front",
                "upload_aadhaar_back",
            ].includes(name)
        ) {
            // Handle file inputs
            if (files && files[0]) {
                setParams((prevParams) => ({
                    ...prevParams,
                    formData: {
                        ...prevParams.formData,
                        [name]: files[0],
                    },
                }));
            }
        } else {
            setParams((prevParams) => ({
                ...prevParams,
                [name]: value,
            }));
        }
    };

    const getOtp = async () => {
        if (params.phone.length < 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: "Phone number must be 10 digits",
            }));
            return;
        }

        console.log("Sending OTP request:", {
            phone: params.phone,
            url: params.url,
        });

        try {
            const response = await axios.post("/api/kyc/checkphone", {
                phone: params.phone,
                url: params.url,
            });

            console.log("OTP response:", response.data);

            if (response.data.status == "success") {
                const fields = response.data.fields || [];
                const mandatory = response.data.mandatory || [];
                const data = response.data.data || {};
                console.log("fields", fields);
                console.log("mandatory", mandatory);
                console.log("data", data);
                console.log("Full response:", response.data);
                setParams((prevParams) => ({
                    ...prevParams,
                    tab: "otp",
                    fields: fields,
                    mandatory: mandatory,
                    data: data,
                }));
            } else if (response.data.status == "error") {
                // Handle warning response
                console.log("Error response:", response.data);
                if (response.data.action == "warning") {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        phone: response.data.message,
                    }));
                } else if (response.data.action == "error") {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        phone: response.data.message,
                    }));
                }
            }
        } catch (e) {
            console.log("error", e);
            console.log("error response", e.response?.data);
        } finally {
        }
    };

    const verifyOtp = async () => {
        if (params.phone.length < 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: "Phone number must be 10 digits",
            }));
            return;
        }

        if (params.otp.length < 4) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                otp: "OTP must be 4 digits",
            }));
            return;
        }
        try {
            const response = await axios.post("/api/kyc/verify-otp", {
                phone: params.phone,
                url: params.url,
                otp: params.otp,
            });

            if (response.data.status == "success") {
                console.log(
                    "OTP verified successfully, token:",
                    response.data.token,
                );

                // Store token in localStorage with 1 hour expiry (like discipline research)
                setWithExpiry("auth_token", response.data.token, 1);

                // Load form data using the new token
                getPhoneData(response.data.token);
            }
        } catch (e) {
            console.log("error", e);
            let errorMessage = "Invalid OTP. Please try again.";

            if (e.response && e.response.data) {
                if (e.response.data.errors && e.response.data.errors.otp) {
                    errorMessage = Array.isArray(e.response.data.errors.otp)
                        ? e.response.data.errors.otp[0]
                        : e.response.data.errors.otp;
                } else if (e.response.data.message) {
                    errorMessage = e.response.data.message;
                }
            }

            setErrors((prevErrors) => ({
                ...prevErrors,
                otp: errorMessage,
            }));
        } finally {
        }
    };

    const submitKyc = async (e) => {
        e.preventDefault();

        console.log("Submitting KYC with params:", params);
        console.log("Token:", params.token);
        console.log("Fields:", params.fields);
        console.log("Mandatory:", params.mandatory);
        console.log("FormData:", params.formData);
        console.log("ExistingFiles:", params.existingFiles);

        // Validate mandatory fields
        let hasError = false;
        const newErrors = {};

        params.fields.forEach((field) => {
            const isMandatory = params.mandatory.includes(field);
            const value = params.formData[field];

            console.log(
                `Field: ${field}, Mandatory: ${isMandatory}, Value: ${value}, Existing: ${params.existingFiles[field]}`,
            );

            if (isMandatory && !value && !params.existingFiles[field]) {
                newErrors[field] = `${field.replace(/_/g, " ")} is required`;
                hasError = true;
            }

            // Format validations
            if (
                field === "email" &&
                value &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ) {
                newErrors[field] = "Invalid email";
                hasError = true;
            }

            if (
                field === "pan_number" &&
                value &&
                !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)
            ) {
                newErrors[field] = "Invalid PAN";
                hasError = true;
            }

            if (
                field === "aadhaar_number" &&
                value &&
                !/^\d{12}$/.test(value)
            ) {
                newErrors[field] = "Invalid Aadhaar";
                hasError = true;
            }
        });

        if (hasError) {
            console.log("Validation errors:", newErrors);
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append("phone", params.phone);
        formData.append("url", params.url);
        formData.append("fields", JSON.stringify(params.fields));
        formData.append("mandatory", JSON.stringify(params.mandatory));
        formData.append("existingFiles", JSON.stringify(params.existingFiles));

        // Add form fields
        Object.keys(params.formData).forEach((key) => {
            if (params.formData[key]) {
                console.log(
                    `Adding to FormData: ${key} =`,
                    params.formData[key],
                );
                if (
                    key === "signature" &&
                    params.formData[key] instanceof File
                ) {
                    formData.append(key, params.formData[key]);
                } else {
                    formData.append(key, params.formData[key]);
                }
            }
        });

        console.log("Final FormData entries:");
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await axios.post("/api/kyc/submit-kyc", formData, {
                headers: {
                    Authorization: `Bearer ${params.token}`,
                },
            });

            console.log("KYC submission response:", response.data);

            if (response.data.status === "success") {
                // Clear auth token like discipline research
                localStorage.removeItem("auth_token");
                setShowSuccess(true);
                // Handle success - maybe redirect or show success message
            }
        } catch (error) {
            console.error("KYC submission error:", error);
            console.error("Error response:", error.response?.data);
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setErrors(error.response.data.errors);
            } else {
                alert("Failed to submit KYC. Please try again.");
            }
        }
    };

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            {showSuccess ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
                        <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            Client Consent Submitted Successfully!
                        </h2>
                    </div>
                </div>
            ) : isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-lg font-semibold">Loading...</p>
                </div>
            ) : params.tab === "phone" ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            Please verify your phone number
                        </h1>
                    </div>

                    <div>
                        <label htmlFor="">Enter Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={params.phone}
                            disabled={params.lockPhone}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            onChange={(e) => changeValue(e)}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                    <div>
                        <button onClick={getOtp} disabled={isLoading}>
                            GET OTP
                        </button>
                    </div>
                </div>
            ) : params.tab === "otp" ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            Please enter the OTP sent to your phone
                        </h1>
                    </div>
                    <div>
                        <label htmlFor="">Enter OTP</label>
                        <input
                            type="tel"
                            name="otp"
                            value={params.otp}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            onChange={(e) => changeValue(e)}
                        />
                        {errors.otp && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.otp}
                            </p>
                        )}
                    </div>
                    <div>
                        <button onClick={verifyOtp} disabled={isLoading}>
                            VERIFY OTP
                        </button>
                    </div>
                </div>
            ) : params.tab === "form" ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            Complete Your Client Consent
                        </h1>

                        <form onSubmit={submitKyc}>
                            {/* Show message if no fields */}
                            {params.fields.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 mb-4">
                                        No additional fields required for KYC.
                                    </p>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        Complete KYC
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Full Name */}
                                    {params.fields.includes("full_name") && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">
                                                Full Name (As per Aadhaar)
                                            </label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={
                                                    params.formData.full_name ||
                                                    (params.data &&
                                                        params.data
                                                            .full_name) ||
                                                    ""
                                                }
                                                onChange={(e) => changeValue(e)}
                                                className="w-full border border-gray-300 rounded px-4 py-2"
                                                required={params.mandatory.includes(
                                                    "full_name",
                                                )}
                                            />
                                            {errors.full_name && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.full_name}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Email */}
                                    {params.fields.includes("email") && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={
                                                    params.formData.email ||
                                                    (params.data &&
                                                        params.data.email) ||
                                                    ""
                                                }
                                                onChange={(e) => changeValue(e)}
                                                className="w-full border border-gray-300 rounded px-4 py-2"
                                                required={params.mandatory.includes(
                                                    "email",
                                                )}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* PAN Number */}
                                    {params.fields.includes("pan_number") && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">
                                                PAN Number
                                            </label>
                                            <input
                                                type="text"
                                                name="pan_number"
                                                value={
                                                    params.formData
                                                        .pan_number ||
                                                    (params.data &&
                                                        params.data
                                                            .pan_number) ||
                                                    ""
                                                }
                                                onChange={(e) => changeValue(e)}
                                                className="w-full border border-gray-300 rounded px-4 py-2 uppercase"
                                                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                                                placeholder="ABCDE1234F"
                                                maxLength="10"
                                                required={params.mandatory.includes(
                                                    "pan_number",
                                                )}
                                            />
                                            {errors.pan_number && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.pan_number}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* PAN Card Upload */}
                                    {params.fields.includes("upload_pan") && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">
                                                Upload PAN Card
                                            </label>
                                            <input
                                                type="file"
                                                name="upload_pan"
                                                onChange={(e) => changeValue(e)}
                                                className="w-full border border-gray-300 rounded px-4 py-2"
                                                accept="image/*,application/pdf"
                                                required={
                                                    params.mandatory.includes(
                                                        "upload_pan",
                                                    ) &&
                                                    !params.existingFiles
                                                        .upload_pan
                                                }
                                            />
                                            {errors.upload_pan && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.upload_pan}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Date of Birth */}
                                    {params.fields.includes("dob") && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={
                                                    params.formData.dob ||
                                                    (params.data &&
                                                        params.data.dob) ||
                                                    ""
                                                }
                                                onChange={(e) => changeValue(e)}
                                                className="w-full border border-gray-300 rounded px-4 py-2"
                                                required={params.mandatory.includes(
                                                    "dob",
                                                )}
                                            />
                                            {errors.dob && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.dob}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Aadhaar Number */}
                                    {params.fields.includes(
                                        "aadhaar_number",
                                    ) && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">
                                                Aadhaar Number
                                            </label>
                                            <input
                                                type="text"
                                                name="aadhaar_number"
                                                value={
                                                    params.formData
                                                        .aadhaar_number ||
                                                    (params.data &&
                                                        params.data
                                                            .aadhaar_number) ||
                                                    ""
                                                }
                                                onChange={(e) => changeValue(e)}
                                                className="w-full border border-gray-300 rounded px-4 py-2"
                                                placeholder="Enter your Aadhaar number"
                                                maxLength="12"
                                                required={params.mandatory.includes(
                                                    "aadhaar_number",
                                                )}
                                            />
                                            {errors.aadhaar_number && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.aadhaar_number}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Age */}
                                    {params.fields.includes("age") && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">
                                                Age
                                            </label>
                                            <input
                                                type="number"
                                                name="age"
                                                value={
                                                    params.formData.age ||
                                                    (params.data &&
                                                        params.data.age) ||
                                                    ""
                                                }
                                                onChange={(e) => changeValue(e)}
                                                className="w-full border border-gray-300 rounded px-4 py-2"
                                                placeholder="Enter your age"
                                                required={params.mandatory.includes(
                                                    "age",
                                                )}
                                            />
                                            {errors.age && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.age}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Signature */}
                                    {params.fields.includes("signature") && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">
                                                Signature
                                            </label>
                                            <input
                                                type="file"
                                                name="signature"
                                                onChange={(e) => changeValue(e)}
                                                className="w-full border border-gray-300 rounded px-4 py-2"
                                                accept="image/*"
                                                required={params.mandatory.includes(
                                                    "signature",
                                                )}
                                            />
                                            {errors.signature && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.signature}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="text-center mt-6">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                        >
                                            Submit KYC
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            ) : null}
        </main>
    );
}
