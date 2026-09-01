import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

/* ---------- Background: faint market grid + ticking price lines (matches rest of site) ---------- */
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
function Field({ label, ...props }) {
    return (
        <label className="block">
            <span className="text-sm font-semibold text-gray-500 mb-1.5 block">
                {label}
            </span>
            <input
                {...props}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1A4B9B]/30 focus:border-[#1A4B9B] transition"
            />
        </label>
    );
}

/* ---------- File upload box with preview ---------- */
function UploadBox({ label, file, onChange, onClear }) {
    const inputRef = useRef(null);
    const previewUrl = file ? URL.createObjectURL(file) : null;

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
                            onClear();
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
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                />
            </div>
        </div>
    );
}

/* ---------- Signature pad ---------- */
function SignaturePad({ onSave }) {
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
        if (hasDrawn && onSave) onSave(canvasRef.current.toDataURL());
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

/* ---------- API config ----------
   Rightzone Research's own Laravel backend. Mirrors the same
   checkphone / verify-otp / get-phone / submit-kyc contract used
   on the Supreme Nifty Traders KYC form. */
const API_BASE = "/api/kyc";
const ENDPOINTS = {
    checkPhone: `${API_BASE}/checkphone`, // POST { phone }
    verifyOtp: `${API_BASE}/verify-otp`, // POST { phone, otp } -> { token }
    getPhone: `${API_BASE}/get-phone`, // GET (auth) -> { fields, mandatory, data }
    submitKyc: `${API_BASE}/submit-kyc`, // POST multipart (auth)
};

const TEXT_FIELD_MAP = {
    fullName: "full_name",
    email: "email",
    pan: "pan_number",
    dob: "dob",
    aadhaar: "aadhaar_number",
};
const FILE_FIELD_MAP = {
    pan: "upload_pan",
    aadhaarFront: "upload_aadhaar_front",
    aadhaarBack: "upload_aadhaar_back",
};
const ALL_BACKEND_KEYS = [
    ...Object.values(TEXT_FIELD_MAP),
    ...Object.values(FILE_FIELD_MAP),
    "signature",
];

async function parseJsonSafe(response) {
    try {
        return await response.json();
    } catch (e) {
        return null;
    }
}

function apiErrorMessage(data, fallback) {
    if (!data) return fallback;
    if (data.errors) {
        const firstKey = Object.keys(data.errors)[0];
        if (
            firstKey &&
            Array.isArray(data.errors[firstKey]) &&
            data.errors[firstKey][0]
        ) {
            return data.errors[firstKey][0];
        }
    }
    if (data.message) return data.message;
    return fallback;
}

export default function ClientConsentForm() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    const [step, setStep] = useState(1); // 1: mobile, 2: otp, 3: kyc form
    const [mobile, setMobile] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [otpError, setOtpError] = useState("");
    const [resendTimer, setResendTimer] = useState(60);
    const [sending, setSending] = useState(false);

    // Auth / dynamic field config (from get-phone)
    const [authToken, setAuthToken] = useState("");
    const [visibleFields, setVisibleFields] = useState(ALL_BACKEND_KEYS);
    const [mandatoryFields, setMandatoryFields] = useState(ALL_BACKEND_KEYS);
    const [existingFiles, setExistingFiles] = useState({});

    // KYC form fields
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        pan: "",
        dob: "",
        aadhaar: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const [files, setFiles] = useState({
        pan: null,
        aadhaarFront: null,
        aadhaarBack: null,
    });
    const [signature, setSignature] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [modal, setModal] = useState(null); // null | 'terms' | 'mitc'
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const isVisible = (backendKey) => visibleFields.includes(backendKey);
    const isMandatory = (backendKey) => mandatoryFields.includes(backendKey);

    const authHeaders = (extra) => {
        const headers = { Accept: "application/json", ...(extra || {}) };
        if (authToken) headers.Authorization = `Bearer ${authToken}`;
        return headers;
    };

    // Resume an already-verified session on refresh.
    useEffect(() => {
        const token = localStorage.getItem("rzAuthToken");
        const phone = localStorage.getItem("rzPhone");
        if (token && phone) {
            setAuthToken(token);
            setMobile(phone);
            loadFieldConfig(token);
            setStep(3);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (step !== 2 || resendTimer <= 0) return;
        const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [step, resendTimer]);

    /* ----- Step 1: request OTP ----- */
    const requestOtp = async (phone) => {
        const response = await fetch(ENDPOINTS.checkPhone, {
            method: "POST",
            headers: authHeaders({ "Content-Type": "application/json" }),
            body: JSON.stringify({ phone }),
        });
        const data = await parseJsonSafe(response);
        if (!response.ok || (data && data.status === "error")) {
            throw new Error(
                apiErrorMessage(
                    data,
                    "Could not send verification code. Please try again.",
                ),
            );
        }
        return data;
    };

    const sendOtp = async () => {
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setMobileError("Enter a valid 10-digit mobile number.");
            return;
        }
        setMobileError("");
        setSending(true);
        try {
            await requestOtp(mobile);
            setResendTimer(60);
            setOtp(["", "", "", ""]);
            setStep(2);
        } catch (err) {
            setMobileError(err.message);
        } finally {
            setSending(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;
        setOtpError("");
        try {
            await requestOtp(mobile);
            setResendTimer(60);
            setOtp(["", "", "", ""]);
            document.getElementById("otp-0")?.focus();
        } catch (err) {
            setOtpError(err.message);
        }
    };

    /* ----- get-phone: which fields to show/require + prefill ----- */
    const loadFieldConfig = async (token) => {
        try {
            const response = await fetch(ENDPOINTS.getPhone, {
                method: "GET",
                headers: authHeaders({ Authorization: `Bearer ${token}` }),
            });
            const data = await parseJsonSafe(response);
            if (!response.ok || !data || data.status === "error") {
                setVisibleFields(ALL_BACKEND_KEYS);
                setMandatoryFields(ALL_BACKEND_KEYS);
                return;
            }

            const fields = Array.isArray(data.fields)
                ? data.fields
                : ALL_BACKEND_KEYS;
            const mandatory = Array.isArray(data.mandatory)
                ? data.mandatory
                : ALL_BACKEND_KEYS;
            setVisibleFields(fields);
            setMandatoryFields(mandatory);

            const prefill = data.data || {};
            setForm((f) => {
                const next = { ...f };
                Object.entries(TEXT_FIELD_MAP).forEach(
                    ([stateKey, backendKey]) => {
                        if (
                            prefill[backendKey] !== undefined &&
                            prefill[backendKey] !== null
                        ) {
                            next[stateKey] = prefill[backendKey];
                        }
                    },
                );
                return next;
            });

            const nextExisting = {};
            [...Object.values(FILE_FIELD_MAP), "signature"].forEach(
                (backendKey) => {
                    if (prefill[backendKey])
                        nextExisting[backendKey] = prefill[backendKey];
                },
            );
            setExistingFiles(nextExisting);
        } catch (err) {
            console.warn("get-phone failed:", err);
        }
    };

    /* ----- Step 2: verify OTP ----- */
    const verifyOtp = async () => {
        const code = otp.join("");
        if (code.length < 4) return;
        setSending(true);
        setOtpError("");
        try {
            const response = await fetch(ENDPOINTS.verifyOtp, {
                method: "POST",
                headers: authHeaders({ "Content-Type": "application/json" }),
                body: JSON.stringify({ phone: mobile, otp: code }),
            });
            const data = await parseJsonSafe(response);
            if (!response.ok || (data && data.status === "error")) {
                throw new Error(
                    apiErrorMessage(data, "Incorrect code. Please try again."),
                );
            }
            if (!data || !data.token) {
                throw new Error(
                    "Verification succeeded but no session token was returned.",
                );
            }
            setAuthToken(data.token);
            localStorage.setItem("rzAuthToken", data.token);
            localStorage.setItem("rzPhone", data.phone || mobile);
            await loadFieldConfig(data.token);
            setStep(3);
        } catch (err) {
            setOtpError(err.message);
        } finally {
            setSending(false);
        }
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setOtpError("");

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        // Handle backspace to go to previous input
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const updateField = (key, value) => {
        setForm((f) => ({ ...f, [key]: value }));
        setFormErrors((e) => ({ ...e, [key]: "" }));
    };

    /* ----- Step 3: validate + submit-kyc ----- */
    const validateForm = () => {
        const errs = {};

        if (
            isVisible("full_name") &&
            isMandatory("full_name") &&
            !form.fullName.trim()
        )
            errs.fullName = "Full name is required.";
        if (
            isVisible("email") &&
            isMandatory("email") &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        )
            errs.email = "Enter a valid email address.";
        if (
            isVisible("pan_number") &&
            isMandatory("pan_number") &&
            !/^[A-Z]{5}\d{4}[A-Z]$/.test((form.pan || "").toUpperCase())
        )
            errs.pan = "Enter a valid PAN (e.g. ABCDE1234F).";
        if (isVisible("dob") && isMandatory("dob") && !form.dob)
            errs.dob = "Date of birth is required.";
        if (
            isVisible("aadhaar_number") &&
            isMandatory("aadhaar_number") &&
            !/^\d{12}$/.test(form.aadhaar || "")
        )
            errs.aadhaar = "Enter a valid 12-digit Aadhaar number.";

        if (
            isVisible("upload_pan") &&
            isMandatory("upload_pan") &&
            !files.pan &&
            !existingFiles.upload_pan
        )
            errs.panFile = "Please upload your PAN card.";
        if (
            isVisible("upload_aadhaar_front") &&
            isMandatory("upload_aadhaar_front") &&
            !files.aadhaarFront &&
            !existingFiles.upload_aadhaar_front
        )
            errs.aadhaarFrontFile = "Please upload Aadhaar front.";
        if (
            isVisible("upload_aadhaar_back") &&
            isMandatory("upload_aadhaar_back") &&
            !files.aadhaarBack &&
            !existingFiles.upload_aadhaar_back
        )
            errs.aadhaarBackFile = "Please upload Aadhaar back.";

        if (
            isVisible("signature") &&
            isMandatory("signature") &&
            !signature &&
            !existingFiles.signature
        )
            errs.signature = "Please draw your signature.";

        setFormErrors((e) => ({ ...e, ...errs }));
        return Object.keys(errs).length === 0;
    };

    const dataUrlToBlob = async (dataUrl) => {
        const res = await fetch(dataUrl);
        return res.blob();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");
        if (!accepted) return;
        if (!validateForm()) return;

        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("phone", mobile);

            Object.entries(TEXT_FIELD_MAP).forEach(([stateKey, backendKey]) => {
                if (!isVisible(backendKey)) return;
                let value = form[stateKey];
                if (stateKey === "pan") value = (value || "").toUpperCase();
                if (stateKey === "aadhaar")
                    value = (value || "").replace(/\D/g, "");
                fd.append(backendKey, value || "");
            });

            Object.entries(FILE_FIELD_MAP).forEach(([stateKey, backendKey]) => {
                if (!isVisible(backendKey)) return;
                const file = files[stateKey];
                if (file) fd.append(backendKey, file);
            });

            if (isVisible("signature") && signature) {
                const blob = await dataUrlToBlob(signature);
                fd.append("signature", blob, "signature.png");
            }

            fd.append("fields", JSON.stringify(visibleFields));
            fd.append("mandatory", JSON.stringify(mandatoryFields));
            fd.append("existingFiles", JSON.stringify(existingFiles));

            const response = await fetch(ENDPOINTS.submitKyc, {
                method: "POST",
                headers: authHeaders(), // no Content-Type — browser sets multipart boundary
                body: fd,
            });
            const data = await parseJsonSafe(response);
            if (!response.ok || (data && data.status === "error")) {
                console.error("submit-kyc failed", {
                    status: response.status,
                    statusText: response.statusText,
                    data,
                });
                throw new Error(
                    apiErrorMessage(
                        data,
                        "Submission failed. Please review your details and try again.",
                    ),
                );
            }

            setSubmitted(true);
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Client Consent Form</title>
                <meta
                    name="description"
                    content="Complete the Client Consent Form for Rightzone Research analyst services."
                />
            </Helmet>
            {/* ============ 1. HERO ============ */}
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

            {/* ============ 2. FORM ============ */}
            <section className="relative bg-[#fafbff] py-14 sm:py-20 px-4 overflow-hidden">
                <MarketGridBG className="opacity-40" />
                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Progress steps */}
                    <div
                        className="flex items-center justify-center gap-3 mb-10"
                        data-aos="fade-up"
                    >
                        {["Mobile", "Verify OTP", "KYC Details"].map(
                            (label, i) => {
                                const n = i + 1;
                                const active = step === n;
                                const done = step > n;
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

                    {submitted ? (
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
                                Consent Submitted
                            </h2>
                            <p className="text-md text-gray-500 leading-relaxed">
                                Thank you
                                {form.fullName
                                    ? `, ${form.fullName.split(" ")[0]}`
                                    : ""}
                                . Your client consent form has been received.
                                Our team will reach out
                                {form.email ? (
                                    <>
                                        {" "}
                                        at <strong>{form.email}</strong>{" "}
                                    </>
                                ) : (
                                    " "
                                )}
                                once your KYC verification is complete.
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
                            {step === 1 && (
                                <div className="text-center relative">
                                    {/* Decorative background elements */}
                                    <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-[#1A4B9B]/5 blur-xl" />
                                    <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-[#F36E21]/5 blur-xl" />
                                    <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-[#1A4B9B]/10 blur-lg" />
                                    <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-[#F36E21]/10 blur-lg" />

                                    <h2 className="text-lg font-extrabold text-[#1A4B9B] mb-2 relative z-10">
                                        Enter Your Mobile Number
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-6 relative z-10">
                                        We'll send a one-time password to verify
                                        your number before you continue.
                                    </p>
                                    <div className="flex gap-3 justify-center max-w-xs mx-auto relative z-10">
                                        <span className="flex items-center justify-center px-4 rounded-xl border border-gray-200 bg-[#fafbff] text-md font-semibold text-gray-600">
                                            +91
                                        </span>
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            value={mobile}
                                            onChange={(e) => {
                                                setMobile(
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        "",
                                                    ),
                                                );
                                                setMobileError("");
                                            }}
                                            onKeyDown={(e) =>
                                                e.key === "Enter" && sendOtp()
                                            }
                                            placeholder="Mobile number"
                                            className="flex-grow rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A4B9B]/30 focus:border-[#1A4B9B] transition"
                                        />
                                    </div>
                                    {mobileError && (
                                        <p className="text-xs font-semibold text-red-500 mt-2 relative z-10">
                                            {mobileError}
                                        </p>
                                    )}
                                    <button
                                        onClick={sendOtp}
                                        disabled={mobile.length < 10 || sending}
                                        className="mt-6 w-auto mx-auto bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 transition relative z-10"
                                    >
                                        {sending ? "Sending OTP…" : "Send OTP"}
                                    </button>
                                </div>
                            )}

                            {/* STEP 2: OTP */}
                            {step === 2 && (
                                <div className="text-center relative">
                                    {/* Decorative background elements */}
                                    <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-[#F36E21]/5 blur-xl" />
                                    <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-[#1A4B9B]/5 blur-xl" />
                                    <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-[#F36E21]/10 blur-lg" />
                                    <div className="absolute bottom-0 right-0 w-12 h-12 rounded-full bg-[#1A4B9B]/10 blur-lg" />

                                    <h2 className="text-lg font-extrabold text-[#1A4B9B] mb-2 relative z-10">
                                        Verify OTP
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-6 relative z-10">
                                        Enter the OTP sent to +91 {mobile}.
                                    </p>
                                    <div className="flex gap-3 justify-center mb-6 relative z-10">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => {
                                                    const val =
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            "",
                                                        );
                                                    handleOtpChange(index, val);
                                                }}
                                                onKeyDown={(e) =>
                                                    handleOtpKeyDown(index, e)
                                                }
                                                placeholder="•"
                                                className="w-14 h-14 text-center text-xl font-bold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A4B9B]/30 focus:border-[#1A4B9B] transition"
                                            />
                                        ))}
                                    </div>
                                    {otpError && (
                                        <p className="text-xs font-semibold text-red-500 mb-3 relative z-10">
                                            {otpError}
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
                                            onClick={handleResend}
                                            className="font-semibold text-[#1A4B9B] disabled:text-gray-300"
                                        >
                                            Resend OTP
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="text-gray-400 underline"
                                        >
                                            Edit number
                                        </button>
                                    </div>
                                    <button
                                        onClick={verifyOtp}
                                        disabled={
                                            otp.join("").length < 4 || sending
                                        }
                                        className="mt-6 w-auto mx-auto bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 transition relative z-10"
                                    >
                                        {sending ? "Verifying…" : "Verify OTP"}
                                    </button>
                                </div>
                            )}

                            {/* STEP 3: KYC Details */}
                            {step === 3 && (
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-lg font-extrabold text-[#1A4B9B] mb-2">
                                        Complete Your Client Consent
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Fill in your KYC details exactly as per
                                        your identity documents.
                                    </p>

                                    {submitError && (
                                        <div className="rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm font-semibold px-4 py-3 mb-5">
                                            {submitError}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        {isVisible("full_name") && (
                                            <div className="sm:col-span-2">
                                                <Field
                                                    label="Full Name (As per Aadhaar)"
                                                    type="text"
                                                    placeholder="Enter your fullname"
                                                    value={form.fullName}
                                                    onChange={(e) =>
                                                        updateField(
                                                            "fullName",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {formErrors.fullName && (
                                                    <p className="text-xs font-semibold text-red-500 mt-1.5">
                                                        {formErrors.fullName}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        {isVisible("email") && (
                                            <div>
                                                <Field
                                                    label="Email Address"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    value={form.email}
                                                    onChange={(e) =>
                                                        updateField(
                                                            "email",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {formErrors.email && (
                                                    <p className="text-xs font-semibold text-red-500 mt-1.5">
                                                        {formErrors.email}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        {isVisible("pan_number") && (
                                            <div>
                                                <Field
                                                    label="PAN Number"
                                                    type="text"
                                                    maxLength={10}
                                                    placeholder="ABCDE1234F"
                                                    value={form.pan}
                                                    onChange={(e) =>
                                                        updateField(
                                                            "pan",
                                                            e.target.value.toUpperCase(),
                                                        )
                                                    }
                                                />
                                                {formErrors.pan && (
                                                    <p className="text-xs font-semibold text-red-500 mt-1.5">
                                                        {formErrors.pan}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        {isVisible("dob") && (
                                            <div>
                                                <Field
                                                    label="Date of Birth"
                                                    type="date"
                                                    value={form.dob}
                                                    onChange={(e) =>
                                                        updateField(
                                                            "dob",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {formErrors.dob && (
                                                    <p className="text-xs font-semibold text-red-500 mt-1.5">
                                                        {formErrors.dob}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        {isVisible("aadhaar_number") && (
                                            <div>
                                                <Field
                                                    label="Aadhaar Number"
                                                    type="text"
                                                    maxLength={12}
                                                    placeholder="XXXX XXXX XXXX"
                                                    value={form.aadhaar}
                                                    onChange={(e) =>
                                                        updateField(
                                                            "aadhaar",
                                                            e.target.value.replace(
                                                                /\D/g,
                                                                "",
                                                            ),
                                                        )
                                                    }
                                                />
                                                {formErrors.aadhaar && (
                                                    <p className="text-xs font-semibold text-red-500 mt-1.5">
                                                        {formErrors.aadhaar}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        {isVisible("upload_pan") && (
                                            <div>
                                                <UploadBox
                                                    label="Upload PAN Card"
                                                    file={files.pan}
                                                    onChange={(f) =>
                                                        setFiles((s) => ({
                                                            ...s,
                                                            pan: f,
                                                        }))
                                                    }
                                                    onClear={() =>
                                                        setFiles((s) => ({
                                                            ...s,
                                                            pan: null,
                                                        }))
                                                    }
                                                />
                                                {formErrors.panFile && (
                                                    <p className="text-xs font-semibold text-red-500 mt-1.5">
                                                        {formErrors.panFile}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        {isVisible("upload_aadhaar_front") && (
                                            <div>
                                                <UploadBox
                                                    label="Upload Aadhaar Front"
                                                    file={files.aadhaarFront}
                                                    onChange={(f) =>
                                                        setFiles((s) => ({
                                                            ...s,
                                                            aadhaarFront: f,
                                                        }))
                                                    }
                                                    onClear={() =>
                                                        setFiles((s) => ({
                                                            ...s,
                                                            aadhaarFront: null,
                                                        }))
                                                    }
                                                />
                                                {formErrors.aadhaarFrontFile && (
                                                    <p className="text-xs font-semibold text-red-500 mt-1.5">
                                                        {
                                                            formErrors.aadhaarFrontFile
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        {isVisible("upload_aadhaar_back") && (
                                            <div>
                                                <UploadBox
                                                    label="Upload Aadhaar Back"
                                                    file={files.aadhaarBack}
                                                    onChange={(f) =>
                                                        setFiles((s) => ({
                                                            ...s,
                                                            aadhaarBack: f,
                                                        }))
                                                    }
                                                    onClear={() =>
                                                        setFiles((s) => ({
                                                            ...s,
                                                            aadhaarBack: null,
                                                        }))
                                                    }
                                                />
                                                {formErrors.aadhaarBackFile && (
                                                    <p className="text-xs font-semibold text-red-500 mt-1.5">
                                                        {
                                                            formErrors.aadhaarBackFile
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {isVisible("signature") && (
                                        <div className="mb-7">
                                            <SignaturePad
                                                onSave={setSignature}
                                            />
                                            {formErrors.signature && (
                                                <p className="text-xs font-semibold text-red-500 mt-1.5">
                                                    {formErrors.signature}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div className="rounded-xl bg-[#fafbff] border border-gray-100 p-4 mb-3 text-sm text-gray-600 leading-relaxed">
                                        <p className="font-bold text-gray-800 mb-2">
                                            Terms and Conditions
                                        </p>
                                        <p className="mb-2">
                                            By submitting this form, you confirm
                                            that:
                                        </p>
                                        <ul className="space-y-1 list-disc pl-4 mb-2">
                                            <li>
                                                The information provided by you
                                                is true, correct and complete.
                                            </li>
                                            <li>
                                                You authorise us to use this
                                                information solely for the
                                                purpose of KYC verification and
                                                related services.
                                            </li>
                                            <li>
                                                You agree that we may contact
                                                you on the given mobile number /
                                                email regarding your application
                                                and related services.
                                            </li>
                                        </ul>
                                        <button
                                            type="button"
                                            onClick={() => setModal("terms")}
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
                                            Key highlights of the MITC include:
                                        </p>
                                        <ul className="space-y-1 list-disc pl-4 mb-2">
                                            <li>
                                                Nature of services to be
                                                provided based on your consent
                                                and KYC status.
                                            </li>
                                            <li>
                                                Applicable charges / fees, if
                                                any, as per the schedule shared
                                                with you.
                                            </li>
                                            <li>
                                                Your rights and obligations for
                                                updating contact details and KYC
                                                information.
                                            </li>
                                            <li>
                                                Grievance redressal mechanism
                                                and timelines for complaint
                                                resolution.
                                            </li>
                                        </ul>
                                        <p className="mb-2">
                                            For the complete MITC, please click
                                            on "View MITC" below.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setModal("mitc")}
                                            className="font-semibold text-[#1A4B9B] hover:underline"
                                        >
                                            View MITC →
                                        </button>
                                    </div>

                                    <label className="flex items-start gap-3 mb-6 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={accepted}
                                            onChange={(e) =>
                                                setAccepted(e.target.checked)
                                            }
                                            className="mt-0.5 w-4 h-4 accent-[#1A4B9B]"
                                        />
                                        <span className="text-sm text-gray-600 leading-relaxed">
                                            I accept the Terms &amp; Conditions
                                            and MITC and provide my consent to
                                            initiate the services and fetch my
                                            KYC details.
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={!accepted || submitting}
                                        className="w-auto mx-auto bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 shadow-lg shadow-[#F36E21]/20 transition-all"
                                    >
                                        {submitting
                                            ? "Submitting…"
                                            : "Submit Client Consent"}
                                    </button>
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
                        1) You authorize us to fetch KYC details from authorized
                        KRA/CKYC repositories.
                    </p>
                    <p>
                        2) You confirm that the details provided are true,
                        correct and up-to-date.
                    </p>
                    <p>
                        3) You agree that we may process and store your data in
                        accordance with applicable laws and our privacy policy.
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
                        You understand that the services offered are subject to
                        eligibility, KYC verification and internal risk
                        policies.
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            2. Charges and Fees
                        </strong>
                        <br />
                        Any charges, fees, interest or penalties (if applicable)
                        will be communicated separately and are subject to
                        change as per policy.
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            3. Communication and Contact
                        </strong>
                        <br />
                        You agree to receive communications via SMS, email,
                        phone and other permitted channels for service-related
                        matters.
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            4. Data Usage and Privacy
                        </strong>
                        <br />
                        Your data will be collected, stored and processed in
                        line with applicable regulations and our privacy policy.
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            5. Grievance Redressal
                        </strong>
                        <br />
                        In case of any complaints, you can contact our support
                        team at support@rightzoneresearch.com. We will endeavour
                        to resolve your concerns within the prescribed
                        timelines.
                    </p>
                </Modal>
            )}
        </main>
    );
}
