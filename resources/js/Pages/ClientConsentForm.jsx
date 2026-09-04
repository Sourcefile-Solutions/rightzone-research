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

/* ---------- Background: faint market grid + ticking price lines ---------- */
const MarketGridBG = ({ className = "" }) => (
    <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="#1A4B9B"
                    strokeOpacity="0.05"
                    strokeWidth="1"
                />
            </pattern>
            <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid)" />
        <polyline
            points="0,560 90,520 180,580 270,460 360,500 450,360 540,420 630,300 720,340 810,220 900,260 990,150 1080,190 1200,110"
            fill="none"
            stroke="#F36E21"
            strokeOpacity="0.14"
            strokeWidth="3"
        />
        <polyline
            points="0,620 90,600 180,640 270,610 360,650 450,590 540,610 630,560 720,580 810,520 900,540 990,480 1080,500 1200,460"
            fill="none"
            stroke="#1A4B9B"
            strokeOpacity="0.12"
            strokeWidth="3"
        />
        <rect width="1200" height="800" fill="url(#fade)" />
    </svg>
);

/* ---------- Reusable styled field ---------- */
function Field({ label, error, ...props }) {
    return (
        <label className="block">
            <span className="text-sm font-semibold text-gray-500 mb-1.5 block">
                {label}
            </span>
            <input
                {...props}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1A4B9B]/30 focus:border-[#1A4B9B] transition"
            />
            {error && (
                <p className="text-xs font-semibold text-red-500 mt-1.5">
                    {error}
                </p>
            )}
        </label>
    );
}

/* ---------- File upload box with preview ---------- */
function UploadBox({ label, name, onChange, error, required }) {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const previewUrl = file ? URL.createObjectURL(file) : null;

    const handleChange = (f) => {
        setFile(f);
        if (onChange) {
            onChange({
                target: {
                    name,
                    files: f ? [f] : [],
                },
            });
        }
    };

    return (
        <div>
            <span className="text-sm font-semibold text-gray-500 mb-1.5 block">
                {label}
            </span>
            <div
                onClick={() => inputRef.current?.click()}
                className="relative cursor-pointer rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1A4B9B]/40 bg-[#fafbff] transition flex flex-col items-center justify-center text-center p-5 min-h-[110px]"
            >
                {file && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleChange(null);
                            if (inputRef.current) inputRef.current.value = "";
                        }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#F36E21] flex items-center justify-center text-sm"
                    >
                        ×
                    </button>
                )}
                {previewUrl && file.type.startsWith("image/") ? (
                    <img
                        src={previewUrl}
                        alt={`${label} preview`}
                        className="h-16 object-contain rounded-md"
                    />
                ) : (
                    <>
                        <span className="text-2xl mb-1.5">📷</span>
                        <span className="text-sm font-semibold text-gray-600">
                            {file ? file.name : `Click to upload ${label}`}
                        </span>
                        <span className="text-[11px] text-gray-400 mt-1">
                            JPG, PNG or PDF (Max 5MB)
                        </span>
                    </>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    required={required}
                    onChange={(e) => handleChange(e.target.files?.[0] || null)}
                />
            </div>
            {error && (
                <p className="text-xs font-semibold text-red-500 mt-1.5">
                    {error}
                </p>
            )}
        </div>
    );
}

/* ---------- Signature pad ---------- */
function SignaturePad({ onSave, error }) {
    const canvasRef = useRef(null);
    const drawing = useRef(false);
    const [hasDrawn, setHasDrawn] = useState(false);

    const getCtx = () => canvasRef.current?.getContext("2d");

    const pos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const start = (e) => {
        drawing.current = true;
        const { x, y } = pos(e);
        const ctx = getCtx();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };
    const move = (e) => {
        if (!drawing.current) return;
        const { x, y } = pos(e);
        const ctx = getCtx();
        ctx.lineTo(x, y);
        ctx.strokeStyle = "#1A4B9B";
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.stroke();
        setHasDrawn(true);
    };
    const end = () => {
        drawing.current = false;
        if (hasDrawn && onSave) {
            canvasRef.current.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], "signature.png", {
                        type: "image/png",
                    });
                    onSave(file);
                }
            }, "image/png");
        }
    };
    const clear = () => {
        const ctx = getCtx();
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setHasDrawn(false);
        if (onSave) onSave(null);
    };

    return (
        <div>
            <span className="text-sm font-semibold text-gray-500 mb-1.5 block">
                Digital Signature
            </span>
            <div className="rounded-xl border border-gray-200 bg-[#fafbff] p-2">
                <canvas
                    ref={canvasRef}
                    width={420}
                    height={140}
                    className="w-full bg-white rounded-lg cursor-crosshair touch-none"
                    onMouseDown={start}
                    onMouseMove={move}
                    onMouseUp={end}
                    onMouseLeave={end}
                    onTouchStart={start}
                    onTouchMove={move}
                    onTouchEnd={end}
                />
                <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-[11px] text-gray-400">
                        ✏️ Draw your signature above
                    </span>
                    <button
                        type="button"
                        onClick={clear}
                        className="text-[11px] font-semibold text-[#F36E21] hover:underline"
                    >
                        Clear
                    </button>
                </div>
            </div>
            {error && (
                <p className="text-xs font-semibold text-red-500 mt-1.5">
                    {error}
                </p>
            )}
        </div>
    );
}

/* ---------- Modal ---------- */
function Modal({ title, onClose, children }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-extrabold text-[#1A4B9B] mb-5">
                    {title}
                </h3>
                <div className="space-y-3 text-md text-gray-600 leading-relaxed">
                    {children}
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-[#1A4B9B] text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-full hover:bg-opacity-90 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

/* ---------- Field label + accept config for known upload/signature fields ---------- */
const UPLOAD_LABELS = {
    upload_pan: "Upload PAN Card",
    upload_aadhaar_front: "Upload Aadhaar Front",
    upload_aadhaar_back: "Upload Aadhaar Back",
};

export default function ClientConsentForm() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    const [searchParams] = useSearchParams();

    const urlToken = searchParams.get("token");
    const authToken = getWithExpiry("auth_token");

    console.log("URL Token:", urlToken);
    console.log("Auth Token:", authToken);

    const [isLoading, setIsLoading] = useState(true);

    const [params, setParams] = useState({
        tab: "phone",
        url: urlToken?.charAt(0) || "",
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
    const [modal, setModal] = useState(null); // null | 'terms' | 'mitc'
    const [accepted, setAccepted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const fetchTokenData = async (token) => {
    try {
        const response = await fetch(`/api/kyc/get-token-data?token=${token}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch token data");

        const data = await response.json();
        if (data.status == "success") {
            setParams((prev) => ({
                ...prev,
                tab: "phone",
                url: data.url,
                phone: data.phone,
                lockPhone: true,
            }));
        } else {
            setParams((prev) => ({
                ...prev,
                tab: "phone",
            }));
        }
    } catch (error) {
        console.error("Error fetching token data:", error);
        setParams((prev) => ({
            ...prev,
            tab: "phone",
        }));
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

                console.log("fields:", fields);
                console.log("mandatory:", mandatory);
                console.log("data:", data);
                console.log("formData:", initialFormData);
                console.log("existingFiles:", initialExistingFiles);
                setParams((prevParams) => ({
                    ...prevParams,
                    fields: fields,
                    mandatory: mandatory,
                    data: data,
                    formData: initialFormData,
                    existingFiles: initialExistingFiles,
                    tab: "form",
                    phone: response.data.phone || prevParams.phone,
                    token: token,
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

    // Cosmetic resend-OTP countdown for the OTP step (does not alter submit logic)
    useEffect(() => {
        if (params.tab !== "otp") return;
        setResendTimer(60);
    }, [params.tab]);

    useEffect(() => {
        if (params.tab !== "otp" || resendTimer <= 0) return;
        const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [params.tab, resendTimer]);

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
            } else {
                // file cleared
                setParams((prevParams) => ({
                    ...prevParams,
                    formData: {
                        ...prevParams.formData,
                        [name]: undefined,
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
            const phoneErrors = e.response?.data?.errors?.phone;
            const errorMessage = Array.isArray(phoneErrors)
                ? phoneErrors[0]
                : phoneErrors || e.response?.data?.message || "Phone number not found";

            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: errorMessage,
            }));
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

            if (response.data.status === "success") {
    const newToken = response.data.token;

    console.log("OTP verified successfully, token:", newToken);

    // Store token
    setWithExpiry("auth_token", newToken, 1);

    // IMPORTANT: update params.token
    setParams((prev) => ({
        ...prev,
        token: newToken,
        tab: "form",
    }));

    // Load form data
    getPhoneData(newToken);
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
    const value = field === "phone" ? params.phone : params.formData[field];

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

        if (!accepted) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                consent: "Please accept the Terms & Conditions to continue",
            }));
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

        setSubmitting(true);
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
        } finally {
            setSubmitting(false);
        }
    };

    const stepNumber =
        params.tab === "phone" ? 1 : params.tab === "otp" ? 2 : 3;

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Client Consent Form</title>
                <meta
                    name="description"
                    content="Complete the Client Consent Form."
                />
            </Helmet>

            {/* ============ HERO ============ */}
            <section
                className="relative pt-20 sm:pt-24 pb-14 sm:pb-20 px-4 text-center overflow-hidden border-b border-gray-100"
                style={{
                    background:
                        "linear-gradient(135deg, #eaf1ff 0%, #fff3e9 100%)",
                }}
            >
                <MarketGridBG className="opacity-80" />
                <div
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: "#1A4B9B" }}
                />
                <div
                    className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: "#F36E21" }}
                />

                <div
                    className="max-w-3xl mx-auto relative z-10"
                    data-aos="fade-up"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1A4B9B] leading-tight mb-5 tracking-tight">
                        Client Consent{" "}
                        <span className="text-[#F36E21]">Form</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ FORM ============ */}
            <section className="relative bg-[#fafbff] py-14 sm:py-20 px-4 overflow-hidden">
                <MarketGridBG className="opacity-40" />
                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Progress steps */}
                    {!showSuccess && !isLoading && (
                        <div
                            className="flex items-center justify-center gap-3 mb-10"
                            data-aos="fade-up"
                        >
                            {["Mobile", "Verify OTP", "KYC Details"].map(
                                (label, i) => {
                                    const n = i + 1;
                                    const active = stepNumber === n;
                                    const done = stepNumber > n;
                                    return (
                                        <div
                                            key={label}
                                            className="flex items-center gap-2"
                                        >
                                            <div
                                                className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                                                style={{
                                                    background:
                                                        done || active
                                                            ? "#1A4B9B"
                                                            : "#e9ebf6",
                                                    color:
                                                        done || active
                                                            ? "#fff"
                                                            : "#9aa0c3",
                                                }}
                                            >
                                                {done ? "✓" : n}
                                            </div>
                                            <span
                                                className={`text-sm font-semibold ${active ? "text-[#1A4B9B]" : "text-gray-400"}`}
                                            >
                                                {label}
                                            </span>
                                            {n < 3 && (
                                                <span className="w-6 h-px bg-gray-200 mx-1" />
                                            )}
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    )}

                    {showSuccess ? (
                        <div
                            className="rounded-2xl bg-white p-8 sm:p-12 text-center"
                            style={{
                                border: "1.5px solid #ececf6",
                                boxShadow: "0 4px 24px rgba(26,75,155,0.04)",
                            }}
                            data-aos="zoom-in"
                        >
                            <div className="text-4xl mb-4">✅</div>
                            <h2 className="text-xl font-extrabold text-[#1A4B9B] mb-2">
                                Client Consent Submitted Successfully!
                            </h2>
                            <p className="text-md text-gray-500 leading-relaxed">
                                Thank you. Your client consent form has been
                                received. Our team will reach out once your
                                KYC verification is complete.
                            </p>
                        </div>
                    ) : isLoading ? (
                        <div
                            className="rounded-2xl bg-white p-8 sm:p-12 text-center"
                            style={{
                                border: "1.5px solid #ececf6",
                                boxShadow: "0 4px 24px rgba(26,75,155,0.04)",
                            }}
                        >
                            <p className="text-md font-semibold text-gray-500">
                                Loading…
                            </p>
                        </div>
                    ) : (
                        <div
                            className="rounded-2xl bg-white p-6 sm:p-10"
                            style={{
                                border: "1.5px solid #ececf6",
                                boxShadow: "0 4px 24px rgba(26,75,155,0.04)",
                            }}
                            data-aos="fade-up"
                        >
                            {/* STEP 1: Mobile number */}
                            {params.tab === "phone" && (
                                <div className="text-center relative">
                                    <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-[#1A4B9B]/5 blur-xl" />
                                    <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-[#F36E21]/5 blur-xl" />
                                    <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-[#1A4B9B]/10 blur-lg" />
                                    <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-[#F36E21]/10 blur-lg" />

                                    <h2 className="text-lg font-extrabold text-[#1A4B9B] mb-2 relative z-10">
                                        Enter Your Mobile Number
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-6 relative z-10">
                                        We'll send a one-time password to
                                        verify your number before you
                                        continue.
                                    </p>
                                    <div className="flex gap-3 justify-center max-w-xs mx-auto relative z-10">
                                        <span className="flex items-center justify-center px-4 rounded-xl border border-gray-200 bg-[#fafbff] text-md font-semibold text-gray-600">
                                            +91
                                        </span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            maxLength={10}
                                            value={params.phone}
                                            disabled={params.lockPhone}
                                            onChange={(e) => changeValue(e)}
                                            onKeyDown={(e) =>
                                                e.key === "Enter" && getOtp()
                                            }
                                            placeholder="Mobile number"
                                            className="flex-grow rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A4B9B]/30 focus:border-[#1A4B9B] transition disabled:opacity-60"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-xs font-semibold text-red-500 mt-2 relative z-10">
                                            {errors.phone}
                                        </p>
                                    )}
                                    <button
                                        onClick={getOtp}
                                        disabled={isLoading}
                                        className="mt-6 w-auto mx-auto bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 transition relative z-10"
                                    >
                                        GET OTP
                                    </button>
                                </div>
                            )}

                            {/* STEP 2: OTP */}
                            {params.tab === "otp" && (
                                <div className="text-center relative">
                                    <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-[#F36E21]/5 blur-xl" />
                                    <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-[#1A4B9B]/5 blur-xl" />
                                    <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-[#F36E21]/10 blur-lg" />
                                    <div className="absolute bottom-0 right-0 w-12 h-12 rounded-full bg-[#1A4B9B]/10 blur-lg" />

                                    <h2 className="text-lg font-extrabold text-[#1A4B9B] mb-2 relative z-10">
                                        Verify OTP
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-6 relative z-10">
                                        Enter the OTP sent to +91{" "}
                                        {params.phone}.
                                    </p>
                                    <div className="max-w-xs mx-auto relative z-10">
                                        <input
                                            type="tel"
                                            name="otp"
                                            maxLength={4}
                                            value={params.otp || ""}
                                            onChange={(e) => changeValue(e)}
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                verifyOtp()
                                            }
                                            placeholder="Enter OTP"
                                            className="w-full text-center text-xl tracking-[0.5em] font-bold rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1A4B9B]/30 focus:border-[#1A4B9B] transition"
                                        />
                                    </div>
                                    {errors.otp && (
                                        <p className="text-xs font-semibold text-red-500 mt-3 relative z-10">
                                            {errors.otp}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-center gap-4 mt-4 text-sm relative z-10">
                                        <span className="text-gray-400">
                                            {resendTimer > 0
                                                ? `Resend OTP in ${resendTimer}s`
                                                : ""}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={resendTimer > 0}
                                            onClick={getOtp}
                                            className="font-semibold text-[#1A4B9B] disabled:text-gray-300"
                                        >
                                            Resend OTP
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setParams((p) => ({
                                                    ...p,
                                                    tab: "phone",
                                                }))
                                            }
                                            className="text-gray-400 underline"
                                        >
                                            Edit number
                                        </button>
                                    </div>
                                    <button
                                        onClick={verifyOtp}
                                        disabled={isLoading}
                                        className="mt-6 w-auto mx-auto bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 transition relative z-10"
                                    >
                                        VERIFY OTP
                                    </button>
                                </div>
                            )}

                            {/* STEP 3: KYC form */}
                            {params.tab === "form" && (
                                <form onSubmit={submitKyc}>
                                    <h2 className="text-lg font-extrabold text-[#1A4B9B] mb-2">
                                        Complete Your Client Consent
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Fill in your KYC details exactly as
                                        per your identity documents.
                                    </p>

                                    {params.fields.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-600 mb-4">
                                                No additional fields required
                                                for KYC.
                                            </p>
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 transition"
                                            >
                                                {submitting
                                                    ? "Submitting…"
                                                    : "Complete KYC"}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                                {params.fields.includes(
                                                    "full_name",
                                                ) && (
                                                    <div className="sm:col-span-2">
                                                        <Field
                                                            label="Full Name (As per Aadhaar)"
                                                            type="text"
                                                            name="full_name"
                                                            placeholder="Enter your fullname"
                                                            value={
    (params.formData && params.formData.full_name) ||
    (params.data && params.data.full_name) ||
    ""
}
                                                            onChange={(e) =>
                                                                changeValue(e)
                                                            }
                                                            required={params.mandatory.includes(
                                                                "full_name",
                                                            )}
                                                            error={
                                                                errors.full_name
                                                            }
                                                        />
                                                    </div>
                                                )}

                                                {params.fields.includes(
                                                    "email",
                                                ) && (
                                                    <Field
                                                        label="Email Address"
                                                        type="email"
                                                        name="email"
                                                        placeholder="you@example.com"
                                                        value={
                                                            params.formData
                                                                .email ||
                                                            (params.data &&
                                                                params.data
                                                                    .email) ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                        required={params.mandatory.includes(
                                                            "email",
                                                        )}
                                                        error={errors.email}
                                                    />
                                                )}

                                                {params.fields.includes(
                                                    "pan_number",
                                                ) && (
                                                    <Field
                                                        label="PAN Number"
                                                        type="text"
                                                        name="pan_number"
                                                        maxLength={10}
                                                        placeholder="ABCDE1234F"
                                                        value={
                                                            params.formData
                                                                .pan_number ||
                                                            (params.data &&
                                                                params.data
                                                                    .pan_number) ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                        required={params.mandatory.includes(
                                                            "pan_number",
                                                        )}
                                                        error={
                                                            errors.pan_number
                                                        }
                                                    />
                                                )}

                                                {params.fields.includes(
                                                    "dob",
                                                ) && (
                                                    <Field
                                                        label="Date of Birth"
                                                        type="date"
                                                        name="dob"
                                                        value={
                                                            params.formData
                                                                .dob ||
                                                            (params.data &&
                                                                params.data
                                                                    .dob) ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                        required={params.mandatory.includes(
                                                            "dob",
                                                        )}
                                                        error={errors.dob}
                                                    />
                                                )}

                                                {params.fields.includes(
                                                    "aadhaar_number",
                                                ) && (
                                                    <Field
                                                        label="Aadhaar Number"
                                                        type="text"
                                                        name="aadhaar_number"
                                                        maxLength={12}
                                                        placeholder="XXXX XXXX XXXX"
                                                        value={
                                                            params.formData
                                                                .aadhaar_number ||
                                                            (params.data &&
                                                                params.data
                                                                    .aadhaar_number) ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                        required={params.mandatory.includes(
                                                            "aadhaar_number",
                                                        )}
                                                        error={
                                                            errors.aadhaar_number
                                                        }
                                                    />
                                                )}

                                                {params.fields.includes(
                                                    "age",
                                                ) && (
                                                    <Field
                                                        label="Age"
                                                        type="number"
                                                        name="age"
                                                        placeholder="Enter your age"
                                                        value={
                                                            params.formData
                                                                .age ||
                                                            (params.data &&
                                                                params.data
                                                                    .age) ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                        required={params.mandatory.includes(
                                                            "age",
                                                        )}
                                                        error={errors.age}
                                                    />
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                                {[
                                                    "upload_pan",
                                                    "upload_aadhaar_front",
                                                    "upload_aadhaar_back",
                                                ].map(
                                                    (fieldName) =>
                                                        params.fields.includes(
                                                            fieldName,
                                                        ) && (
                                                            <UploadBox
                                                                key={
                                                                    fieldName
                                                                }
                                                                label={
                                                                    UPLOAD_LABELS[
                                                                        fieldName
                                                                    ]
                                                                }
                                                                name={
                                                                    fieldName
                                                                }
                                                                onChange={(e) =>
                                                                    changeValue(
                                                                        e,
                                                                    )
                                                                }
                                                                required={
                                                                    params.mandatory.includes(
                                                                        fieldName,
                                                                    ) &&
                                                                    !params
                                                                        .existingFiles[
                                                                        fieldName
                                                                    ]
                                                                }
                                                                error={
                                                                    errors[
                                                                        fieldName
                                                                    ]
                                                                }
                                                            />
                                                        ),
                                                )}
                                            </div>

                                            {params.fields.includes(
                                                "signature",
                                            ) && (
                                                <div className="mb-7">
                                                    <SignaturePad
                                                        onSave={(file) =>
                                                            setParams(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    formData: {
                                                                        ...prev.formData,
                                                                        signature:
                                                                            file,
                                                                    },
                                                                }),
                                                            )
                                                        }
                                                        error={
                                                            errors.signature
                                                        }
                                                    />
                                                </div>
                                            )}

                                            <div className="rounded-xl bg-[#fafbff] border border-gray-100 p-4 mb-3 text-sm text-gray-600 leading-relaxed">
                                                <p className="font-bold text-gray-800 mb-2">
                                                    Terms and Conditions
                                                </p>
                                                <p className="mb-2">
                                                    By submitting this form,
                                                    you confirm that:
                                                </p>
                                                <ul className="space-y-1 list-disc pl-4 mb-2">
                                                    <li>
                                                        The information
                                                        provided by you is
                                                        true, correct and
                                                        complete.
                                                    </li>
                                                    <li>
                                                        You authorise us to
                                                        use this information
                                                        solely for the purpose
                                                        of KYC verification and
                                                        related services.
                                                    </li>
                                                    <li>
                                                        You agree that we may
                                                        contact you on the
                                                        given mobile number /
                                                        email regarding your
                                                        application and
                                                        related services.
                                                    </li>
                                                </ul>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setModal("terms")
                                                    }
                                                    className="font-semibold text-[#1A4B9B] hover:underline"
                                                >
                                                    View full Terms →
                                                </button>
                                            </div>

                                            <div className="rounded-xl bg-[#fafbff] border border-gray-100 p-4 mb-5 text-sm text-gray-600 leading-relaxed">
                                                <p className="font-bold text-gray-800 mb-2">
                                                    Most Important Terms &amp;
                                                    Conditions (MITC)
                                                </p>
                                                <p className="mb-2">
                                                    Key highlights of the
                                                    MITC include:
                                                </p>
                                                <ul className="space-y-1 list-disc pl-4 mb-2">
                                                    <li>
                                                        Nature of services to
                                                        be provided based on
                                                        your consent and KYC
                                                        status.
                                                    </li>
                                                    <li>
                                                        Applicable charges /
                                                        fees, if any, as per
                                                        the schedule shared
                                                        with you.
                                                    </li>
                                                    <li>
                                                        Your rights and
                                                        obligations for
                                                        updating contact
                                                        details and KYC
                                                        information.
                                                    </li>
                                                    <li>
                                                        Grievance redressal
                                                        mechanism and
                                                        timelines for
                                                        complaint resolution.
                                                    </li>
                                                </ul>
                                                <p className="mb-2">
                                                    For the complete MITC,
                                                    please click on "View
                                                    MITC" below.
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setModal("mitc")
                                                    }
                                                    className="font-semibold text-[#1A4B9B] hover:underline"
                                                >
                                                    View MITC →
                                                </button>
                                            </div>

                                            <label className="flex items-start gap-3 mb-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={accepted}
                                                    onChange={(e) => {
                                                        setAccepted(
                                                            e.target.checked,
                                                        );
                                                        setErrors(
                                                            (prev) => ({
                                                                ...prev,
                                                                consent: "",
                                                            }),
                                                        );
                                                    }}
                                                    className="mt-0.5 w-4 h-4 accent-[#1A4B9B]"
                                                />
                                                <span className="text-sm text-gray-600 leading-relaxed">
                                                    I accept the Terms &amp;
                                                    Conditions and MITC and
                                                    provide my consent to
                                                    initiate the services and
                                                    fetch my KYC details.
                                                </span>
                                            </label>
                                            {errors.consent && (
                                                <p className="text-xs font-semibold text-red-500 mb-4">
                                                    {errors.consent}
                                                </p>
                                            )}

                                            <div className="text-center mt-6">
                                                <button
                                                    type="submit"
                                                    disabled={submitting}
                                                    className="w-auto mx-auto bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 shadow-lg shadow-[#F36E21]/20 transition-all"
                                                >
                                                    {submitting
                                                        ? "Submitting…"
                                                        : "Submit KYC"}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* ============ MODALS ============ */}
            {modal === "terms" && (
                <Modal
                    title="Full Terms and Conditions"
                    onClose={() => setModal(null)}
                >
                    <p>
                        1) You authorize us to fetch KYC details from
                        authorized KRA/CKYC repositories.
                    </p>
                    <p>
                        2) You confirm that the details provided are true,
                        correct and up-to-date.
                    </p>
                    <p>
                        3) You agree that we may process and store your data
                        in accordance with applicable laws and our privacy
                        policy.
                    </p>
                    <p>
                        4) This consent is valid for initiation of services
                        requested by you.
                    </p>
                    <p>
                        5) You may withdraw your consent by writing to our
                        support team, subject to regulatory requirements.
                    </p>
                </Modal>
            )}

            {modal === "mitc" && (
                <Modal
                    title="Most Important Terms & Conditions (MITC)"
                    onClose={() => setModal(null)}
                >
                    <p>
                        <strong className="text-gray-800">
                            1. Nature of Services
                        </strong>
                        <br />
                        You understand that the services offered are subject
                        to eligibility, KYC verification and internal risk
                        policies.
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            2. Charges and Fees
                        </strong>
                        <br />
                        Any charges, fees, interest or penalties (if
                        applicable) will be communicated separately and are
                        subject to change as per policy.
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            3. Communication and Contact
                        </strong>
                        <br />
                        You agree to receive communications via SMS, email,
                        phone and other permitted channels for
                        service-related matters.
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            4. Data Usage and Privacy
                        </strong>
                        <br />
                        Your data will be collected, stored and processed in
                        line with applicable regulations and our privacy
                        policy.
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            5. Grievance Redressal
                        </strong>
                        <br />
                        In case of any complaints, you can contact our
                        support team. We will endeavour to resolve your
                        concerns within the prescribed timelines.
                    </p>
                </Modal>
            )}
        </main>
    );
}