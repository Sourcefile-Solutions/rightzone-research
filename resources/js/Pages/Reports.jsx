import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";

/* ---------- Background: faint market grid + ticking price lines ---------- */
const MarketGridBG = ({ className = "" }) => (
    <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern
                id="grid-reports"
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
            <linearGradient id="fade-reports" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid-reports)" />
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
        <rect width="1200" height="800" fill="url(#fade-reports)" />
    </svg>
);

/* ---------- OTP Input ---------- */
function OTPInput({ onComplete }) {
    const [vals, setVals] = useState(["", "", "", ""]);
    const refs = [useRef(), useRef(), useRef(), useRef()];

    const handleChange = (i, e) => {
        const v = e.target.value.replace(/[^0-9]/g, "").slice(-1);
        const next = [...vals];
        next[i] = v;
        setVals(next);
        if (v && i < 3) refs[i + 1].current?.focus();
        if (next.every((d) => d !== "")) onComplete(next.join(""));
    };

    const handleKeyDown = (i, e) => {
        if (e.key === "Backspace" && !vals[i] && i > 0) {
            refs[i - 1].current?.focus();
        }
    };

    return (
        <div className="flex gap-3 justify-center mb-6">
            {vals.map((v, i) => (
                <input
                    key={i}
                    ref={refs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={v}
                    onChange={(e) => handleChange(i, e)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-14 h-14 text-center text-2xl font-black rounded-xl border-[1.5px] border-[#ececf6] focus:outline-none focus:border-[#1A4B9B] text-[#1A4B9B] transition-all duration-200"
                    style={{ background: "#fff" }}
                />
            ))}
        </div>
    );
}

/* ---------- Main Page Export ---------- */
export default function Reports() {
    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState("");

    const handleSendOTP = () => {
        if (phone.replace(/\D/g, "").length < 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }
        setStep("otp");
    };

    const handleOTPComplete = (otp) => {
        if (otp.length === 4) {
            console.log("OTP entered:", otp, "for phone:", phone);
        }
    };

    const handleVerify = () => {
        console.log("Verify clicked for phone:", phone);
    };

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Reports</title>
                <meta
                    name="description"
                    content="Access high-quality, data-driven equity and investment research reports."
                />
            </Helmet>
            {/* ============ LOGIN ============ */}
            <section
                className="relative py-16 sm:py-24 px-4 overflow-hidden min-h-[80vh] flex items-center justify-center border-b border-gray-100"
                style={{
                    background:
                        "linear-gradient(135deg, #eaf1ff 0%, #fff3e9 100%)",
                }}
            >
                {/* Grid Overlay */}
                <MarketGridBG className="opacity-80" />

                {/* Decorative Blur Spheres */}
                <div
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: "#1A4B9B" }}
                />
                <div
                    className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: "#F36E21" }}
                />

                {/* Form Container Card */}
                <div
                    className="relative bg-white rounded-2xl p-8 sm:p-10 w-full max-w-md mx-auto z-10"
                    style={{
                        border: "1.5px solid #ececf6",
                        boxShadow: "0 8px 32px rgba(26,75,155,0.07)",
                    }}
                >
                    {/* top accent bar */}
                    <div
                        className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full transition-colors duration-300"
                        style={{
                            background:
                                step === "phone" ? "#1A4B9B" : "#F36E21",
                        }}
                    />

                    {step === "phone" ? (
                        <>
                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                                style={{ background: "rgba(26,75,155,0.08)" }}
                            >
                                <svg
                                    width="26"
                                    height="26"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <rect
                                        x="5"
                                        y="2"
                                        width="14"
                                        height="20"
                                        rx="2"
                                        stroke="#1A4B9B"
                                        strokeWidth="1.8"
                                    />
                                    <path
                                        d="M12 18h.01"
                                        stroke="#1A4B9B"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-xl font-extrabold text-gray-900 text-center mb-1.5">
                                Verify Your Mobile
                            </h2>
                            <p className="text-sm text-gray-400 text-center mb-7 leading-relaxed">
                                Enter your registered mobile number to receive a
                                one-time password.
                            </p>

                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                Mobile Number
                            </label>
                            <div className="flex gap-2.5 mb-2">
                                <div
                                    className="flex items-center gap-1.5 px-3 h-12 rounded-xl text-md font-semibold text-gray-700 flex-shrink-0"
                                    style={{
                                        background: "#f5f5fb",
                                        border: "1.5px solid #ececf6",
                                    }}
                                >
                                    <svg
                                        width="20"
                                        height="14"
                                        viewBox="0 0 900 600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ borderRadius: 2 }}
                                    >
                                        <rect
                                            width="900"
                                            height="600"
                                            fill="#FF9933"
                                        />
                                        <rect
                                            y="200"
                                            width="900"
                                            height="200"
                                            fill="#fff"
                                        />
                                        <rect
                                            y="400"
                                            width="900"
                                            height="200"
                                            fill="#138808"
                                        />
                                        <circle
                                            cx="450"
                                            cy="300"
                                            r="60"
                                            fill="none"
                                            stroke="#000080"
                                            strokeWidth="8"
                                        />
                                    </svg>
                                    +91
                                </div>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 10),
                                        )
                                    }
                                    placeholder="98XXXXXXXX"
                                    className="flex-1 h-12 rounded-xl text-md text-gray-900 px-3.5 focus:outline-none transition-all duration-200"
                                    style={{
                                        border: "1.5px solid #ececf6",
                                        background: "#fff",
                                    }}
                                    onFocus={(e) =>
                                        (e.target.style.borderColor = "#1A4B9B")
                                    }
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = "#ececf6")
                                    }
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleSendOTP()
                                    }
                                />
                            </div>
                            <p className="text-[11px] text-gray-400 mb-6">
                                We'll send an OTP to this number
                            </p>

                            <button
                                onClick={handleSendOTP}
                                className="w-full h-12 rounded-full text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5"
                                style={{
                                    background: "#1A4B9B",
                                    boxShadow:
                                        "0 4px 18px rgba(26,75,155,0.35)",
                                }}
                            >
                                Send OTP
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M5 12h14M12 5l7 7-7 7"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                                style={{ background: "rgba(243,110,33,0.08)" }}
                            >
                                <svg
                                    width="26"
                                    height="26"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <rect
                                        x="3"
                                        y="11"
                                        width="18"
                                        height="11"
                                        rx="2"
                                        stroke="#F36E21"
                                        strokeWidth="1.8"
                                    />
                                    <path
                                        d="M7 11V7a5 5 0 0110 0v4"
                                        stroke="#F36E21"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-xl font-extrabold text-gray-900 text-center mb-1.5">
                                Enter OTP
                            </h2>
                            <p className="text-sm text-gray-400 text-center mb-7 leading-relaxed">
                                A 4-digit OTP has been sent to{" "}
                                <strong className="text-gray-700">
                                    +91 {phone}
                                </strong>
                            </p>

                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">
                                One-Time Password
                            </label>
                            <OTPInput onComplete={handleOTPComplete} />

                            <p className="text-center text-sm text-gray-400 mb-6">
                                Didn't receive it?{" "}
                                <button
                                    className="text-[#1A4B9B] font-semibold hover:underline"
                                    onClick={() => {}}
                                >
                                    Resend OTP
                                </button>
                            </p>

                            <button
                                onClick={handleVerify}
                                className="w-full h-12 rounded-full text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5"
                                style={{
                                    background: "#F36E21",
                                    boxShadow:
                                        "0 4px 18px rgba(243,110,33,0.35)",
                                }}
                            >
                                Verify & Login
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M5 12h14M12 5l7 7-7 7"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={() => setStep("phone")}
                                className="flex items-center gap-1.5 mx-auto mt-4 text-sm text-gray-400 hover:text-[#1A4B9B] transition-colors"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M19 12H5M12 19l-7-7 7-7"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Change number
                            </button>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
