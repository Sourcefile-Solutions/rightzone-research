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

export default function ClientConsentForm() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    const [step, setStep] = useState(1); // 1: mobile, 2: otp, 3: kyc form
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [resendTimer, setResendTimer] = useState(60);
    const [files, setFiles] = useState({
        pan: null,
        aadhaarFront: null,
        aadhaarBack: null,
    });
    const [signature, setSignature] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [modal, setModal] = useState(null); // null | 'terms' | 'mitc'
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (step !== 2 || resendTimer <= 0) return;
        const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [step, resendTimer]);

    const sendOtp = () => {
        if (mobile.trim().length < 10) return;
        setStep(2);
        setResendTimer(60);
    };

    const verifyOtp = () => {
        if (otp.join("").length < 4) return;
        setStep(3);
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!accepted) return;
        setSubmitted(true);
    };

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Client Consent Form</title>
                <meta name="description" content="Complete the Client Consent Form for Rightzone Research analyst services." />
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
                                Thank you. Your client consent form has been
                                received. Our team will reach out once your KYC
                                verification is complete.
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
                                            onChange={(e) =>
                                                setMobile(
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        "",
                                                    ),
                                                )
                                            }
                                            placeholder="Mobile number"
                                            className="flex-grow rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A4B9B]/30 focus:border-[#1A4B9B] transition"
                                        />
                                    </div>
                                    <button
                                        onClick={sendOtp}
                                        disabled={mobile.length < 10}
                                        className="mt-6 w-auto mx-auto bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 transition relative z-10"
                                    >
                                        Send OTP
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
                                    <div className="flex items-center justify-center gap-4 mt-4 text-sm relative z-10">
                                        <span className="text-gray-400">
                                            {resendTimer > 0
                                                ? `Resend OTP in ${resendTimer}s`
                                                : ""}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={resendTimer > 0}
                                            onClick={() => setResendTimer(60)}
                                            className="font-semibold text-[#1A4B9B] disabled:text-gray-300"
                                        >
                                            Resend OTP
                                        </button>
                                    </div>
                                    <button
                                        onClick={verifyOtp}
                                        disabled={otp.join("").length < 4}
                                        className="mt-6 w-auto mx-auto bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 transition relative z-10"
                                    >
                                        Verify OTP
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

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <Field
                                            label="Full Name (As per Aadhaar)"
                                            type="text"
                                            required
                                            placeholder="Enter your fullname"
                                        />
                                        <Field
                                            label="Email Address"
                                            type="email"
                                            required
                                            placeholder="you@example.com"
                                        />
                                        <Field
                                            label="PAN Number"
                                            type="text"
                                            required
                                            maxLength={10}
                                            placeholder="ABCDE1234F"
                                        />
                                        <Field
                                            label="Date of Birth"
                                            type="date"
                                            required
                                        />
                                        <Field
                                            label="Aadhaar Number"
                                            type="text"
                                            required
                                            maxLength={12}
                                            placeholder="XXXX XXXX XXXX"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
                                    </div>

                                    <div className="mb-7">
                                        <SignaturePad onSave={setSignature} />
                                    </div>

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
                                        disabled={!accepted}
                                        className="w-auto mx-auto bg-[#F36E21] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-opacity-90 shadow-lg shadow-[#F36E21]/20 transition-all"
                                    >
                                        Submit Client Consent
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
