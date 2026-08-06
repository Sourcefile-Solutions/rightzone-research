import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

/* ── Dot Grid Decoration ── */
const DotGrid = ({
    rows = 6,
    cols = 6,
    color = "#c084fc",
    className = "",
    opacity = 0.4,
}) => (
    <svg
        className={`absolute pointer-events-none ${className}`}
        width={cols * 20}
        height={rows * 20}
        viewBox={`0 0 ${cols * 20} ${rows * 20}`}
        style={{ opacity }}
    >
        {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => (
                <circle
                    key={`${r}-${c}`}
                    cx={c * 20 + 10}
                    cy={r * 20 + 10}
                    r="2.5"
                    fill={color}
                />
            )),
        )}
    </svg>
);

/* ── Important Note Modal ── */
function ImportantNoteModal({ onClose }) {
    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(4px)",
            }}
        >
            <div
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Top accent bar */}
                <div
                    className="h-1 w-full flex-shrink-0"
                    style={{
                        background: "linear-gradient(90deg, #1A4B9B, #F36E21)",
                    }}
                />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(26,75,155,0.08)" }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#1A4B9B"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">
                            Important Note!
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 flex-shrink-0"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6b7280"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto px-6 pb-6" style={{ flex: 1 }}>
                    {/* Info card */}
                    <div
                        className="rounded-xl p-4 mb-4 text-md space-y-2"
                        style={{
                            background: "rgba(26,75,155,0.04)",
                            border: "1.5px solid rgba(26,75,155,0.10)",
                        }}
                    >
                        <p className="text-gray-700 leading-relaxed">
                            <span className="font-semibold text-gray-900">
                                SEBI Registration Number:{" "}
                            </span>
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <span className="font-semibold text-gray-900">
                                Official Website:{" "}
                            </span>
                            <a
                                href="https://www.rightzoneresearch.com"
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold underline underline-offset-2"
                                style={{ color: "#1A4B9B" }}
                            >
                                www.rightzoneresearch.com
                            </a>
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <span className="font-semibold text-gray-900">
                                E-Mail:{" "}
                            </span>
                            <span
                                className="font-semibold"
                                style={{ color: "#1A4B9B" }}
                            >
                                support@rightzoneresearch.com
                            </span>
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <span className="font-semibold text-gray-900">
                                Support Contact:{" "}
                            </span>
                            <span className="font-semibold text-gray-800">
                                +91 9342819342
                            </span>
                        </p>
                    </div>

                    {/* Warning items */}
                    <div className="space-y-3">
                        {[
                            {
                                icon: (
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#F36E21"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                        <line x1="12" y1="9" x2="12" y2="13" />
                                        <line
                                            x1="12"
                                            y1="17"
                                            x2="12.01"
                                            y2="17"
                                        />
                                    </svg>
                                ),
                                text: "We Do Not Offer Any Assured / Guaranteed / Profit Sharing / Demat Account Or Broking Services / Portfolio Management Services.",
                            },
                            {
                                icon: (
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#F36E21"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <rect
                                            x="3"
                                            y="11"
                                            width="18"
                                            height="11"
                                            rx="2"
                                        />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                ),
                                text: "Clients are never asked for their Banking Or Broking Credentials at Rightzone Research.",
                            },
                            {
                                icon: (
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#F36E21"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <rect
                                            x="1"
                                            y="4"
                                            width="22"
                                            height="16"
                                            rx="2"
                                            ry="2"
                                        />
                                        <line x1="1" y1="10" x2="23" y2="10" />
                                    </svg>
                                ),
                                text: "Do Not Share Your Credit Card / Debit Card / Netbanking Credentials / Demat Account Credentials With Any Of Our Employee. If you are being asked then inform us on +91 9342819342 or E-Mail us at support@rightzoneresearch.com",
                            },
                            {
                                icon: (
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1A4B9B"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                ),
                                text: 'We accept payments only in registered BANK ACCOUNT. Please check on "Payment" in our website to get our Bank Details.',
                            },
                            {
                                icon: (
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1A4B9B"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <path d="M18 20V10M12 20V4M6 20v-6" />
                                    </svg>
                                ),
                                text: "Investing In The Market Is Subject To Market Risk Hence Read All Our Disclaimer And T&C Carefully Before Investing.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-xl"
                                style={{
                                    background:
                                        i < 3
                                            ? "rgba(243,110,33,0.03)"
                                            : "rgba(26,75,155,0.03)",
                                    border: `1px solid ${i < 3 ? "rgba(243,110,33,0.10)" : "rgba(26,75,155,0.08)"}`,
                                }}
                            >
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{
                                        background:
                                            i < 3
                                                ? "rgba(243,110,33,0.08)"
                                                : "rgba(26,75,155,0.08)",
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <div
                    className="px-6 pb-5 pt-3 flex-shrink-0 border-t"
                    style={{ borderColor: "#f0f0f8" }}
                >
                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-full text-white text-md font-bold tracking-wide transition-opacity hover:opacity-90"
                        style={{
                            background:
                                "linear-gradient(90deg, #1A4B9B, #F36E21)",
                            boxShadow: "0 4px 18px rgba(26,75,155,0.25)",
                        }}
                    >
                        I Understand, Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Authenticate Team Modal (Phone Number) ── */
function AuthenticateTeamModal({ onClose }) {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleCheck = () => {
        const cleaned = phone.trim();
        if (!/^[6-9]\d{9}$/.test(cleaned)) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }
        setError("");
        setSubmitting(true);
        // TODO: replace with actual verification/authentication API call
        setTimeout(() => {
            setSubmitting(false);
            alert(`Checking authentication for +91 ${cleaned}`);
            onClose();
        }, 800);
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(4px)",
            }}
        >
            <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{ display: "flex", flexDirection: "column" }}
            >
                {/* Top accent bar */}
                <div
                    className="h-1 w-full flex-shrink-0"
                    style={{
                        background: "linear-gradient(90deg, #1A4B9B, #F36E21)",
                    }}
                />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(26,75,155,0.08)" }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#1A4B9B"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">
                            Authenticate Team
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 flex-shrink-0"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6b7280"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-6">
                    <label
                        htmlFor="auth-phone"
                        className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide"
                    >
                        Enter Phone Number
                    </label>

                    <div
                        className="flex items-center rounded-xl overflow-hidden"
                        style={{
                            border: `1.5px solid ${error ? "#F36E21" : "rgba(26,75,155,0.20)"}`,
                        }}
                    >
                        <span className="px-4 py-3 text-sm font-semibold text-gray-500 bg-gray-50 border-r border-gray-200">
                            +91
                        </span>
                        <input
                            id="auth-phone"
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setPhone(val);
                                if (error) setError("");
                            }}
                            className="flex-grow px-4 py-3 text-md text-gray-800 placeholder-gray-400 focus:outline-none"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-[#F36E21] font-medium mt-2">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleCheck}
                        disabled={submitting}
                        className="w-full mt-6 py-3 rounded-full text-white text-md font-bold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60"
                        style={{
                            background:
                                "linear-gradient(90deg, #1A4B9B, #F36E21)",
                            boxShadow: "0 4px 18px rgba(26,75,155,0.25)",
                        }}
                    >
                        {submitting ? "Checking..." : "Check Now"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Services Data ── */
const SERVICES = [
    {
        id: "01",
        title: "Fundamental Research for Smarter Investing",
        desc: "Build a stronger investment portfolio with comprehensive fundamental research backed by data, industry expertise, and disciplined analysis. Our research evaluates a company's financial strength, competitive advantage, business model, and future growth potential to help you make confident, long-term investment decisions.",
        img: "/assets/s1.jpg",
        path: "/fundamental-research",
        accent: "#1A4B9B",
        lightBg: "rgba(26,75,155,0.04)",
        border: "rgba(26,75,155,0.10)",
    },
    {
        id: "02",
        title: "Derivatives Research & Trading Strategies",
        desc: "Gain a strategic edge in the derivatives market with research-driven Futures & Options strategies designed for changing market conditions. Our analysis combines price action, market trends, volatility, and options data to identify high-probability trading opportunities with a disciplined risk management approach.",
        img: "/assets/s2.jpg",
        path: "/derivatives-research",
        accent: "#F36E21",
        lightBg: "rgba(243,110,33,0.04)",
        border: "rgba(243,110,33,0.10)",
    },
    {
        id: "03",
        title: "Market Momentum & Technical Research",
        desc: "Stay ahead of market trends with professional technical analysis designed to identify high-probability trading opportunities. Our research combines price action, chart patterns, trend analysis, and technical indicators to help traders make timely and informed decisions across changing market conditions.",
        img: "/assets/s3.PNG",
        path: "/market-momentum",
        accent: "#1A4B9B",
        lightBg: "rgba(26,75,155,0.04)",
        border: "rgba(26,75,155,0.10)",
    },
    {
        id: "04",
        title: "Investment Strategy & Stock Research",
        desc: "Make informed investment decisions with comprehensive stock research and actionable recommendations backed by in-depth market analysis. Our reports combine fundamental research, technical insights, and market trends to identify high-potential investment opportunities across a wide range of industries.",
        img: "/assets/s4.jfif",
        path: "/investment-strategy",
        accent: "#F36E21",
        lightBg: "rgba(243,110,33,0.04)",
        border: "rgba(243,110,33,0.10)",
    },
    {
        id: "05",
        title: "Market Intelligence & Economic Insights",
        desc: "Gain a broader perspective on the financial markets with comprehensive sector and market trend analysis. Our research evaluates economic indicators, industry performance, policy developments, and market sentiment to identify emerging opportunities and potential risks across key sectors.",
        img: "/assets/s5.jfif",
        path: "/market-intelligence",
        accent: "#1A4B9B",
        lightBg: "rgba(26,75,155,0.04)",
        border: "rgba(26,75,155,0.10)",
    },
];

function ServiceRow({ svc, index }) {
    const isEven = index % 2 === 0;
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.15 },
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-stretch gap-0 overflow-hidden rounded-2xl mb-10`}
            style={{
                background: "#fff",
                border: `1.5px solid ${svc.border}`,
                boxShadow: "0 4px 32px rgba(26,75,155,0.05)",
                opacity: visible ? 1 : 0,
                transform: visible
                    ? "translateY(0)"
                    : `translateY(36px) translateX(${isEven ? "-20px" : "20px"})`,
                transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s ease ${index * 0.1}s`,
            }}
        >
            {/* ── Image side: stretches to full row height ── */}
            <div
                className="w-full md:w-2/5 relative overflow-hidden"
                style={{ minHeight: 320 }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        background: `linear-gradient(${isEven ? "270deg" : "90deg"}, rgba(255,255,255,0.6) 0%, transparent 55%)`,
                    }}
                />
                <span
                    style={{
                        position: "absolute",
                        zIndex: 2,
                        top: 12,
                        left: isEven ? "auto" : 16,
                        right: isEven ? 16 : "auto",
                        fontSize: 90,
                        fontWeight: 900,
                        lineHeight: 1,
                        color: svc.accent,
                        opacity: 0.08,
                        fontFamily: "Arial Black, sans-serif",
                        userSelect: "none",
                    }}
                >
                    {svc.id}
                </span>
                {/* Image fills the entire panel height with object-cover */}
                <img
                    src={svc.img}
                    alt={svc.title}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.55s ease",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.06)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                    }
                />
            </div>

            {/* ── Content side ── */}
            <div
                className="w-full md:w-3/5 p-8 md:p-12 text-left flex flex-col justify-center"
                style={{ background: svc.lightBg }}
            >
                <span
                    style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: svc.accent,
                        display: "block",
                        marginBottom: 10,
                    }}
                >
                    {svc.tagline}
                </span>
                <h3
                    style={{
                        fontSize: "clamp(1.15rem, 2.5vw, 1.65rem)",
                        fontWeight: 800,
                        color: svc.accent,
                        lineHeight: 1.25,
                        marginBottom: 14,
                    }}
                >
                    {svc.title}
                </h3>
                <div
                    style={{
                        width: 48,
                        height: 3,
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${svc.accent}, transparent)`,
                        marginBottom: 18,
                    }}
                />
                <p
                    style={{
                        fontSize: 14,
                        lineHeight: 1.9,
                        color: "#4b5563",
                        marginBottom: 22,
                    }}
                >
                    {svc.desc}
                </p>
                <button
                    onClick={() => navigate(svc.path)}
                    style={{
                        background: svc.accent,
                        color: "#fff",
                        border: "none",
                        borderRadius: 40,
                        padding: "11px 28px",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        letterSpacing: "0.04em",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        boxShadow: `0 4px 18px ${svc.accent}44`,
                        alignSelf: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = `0 8px 28px ${svc.accent}66`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = `0 4px 18px ${svc.accent}44`;
                    }}
                >
                    Learn More →
                </button>
            </div>
            <DotGrid
                rows={4}
                cols={4}
                color={svc.accent}
                className={`bottom-3 ${isEven ? "left-3" : "right-3"}`}
                opacity={0.1}
            />
        </div>
    );
}

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
        // Show modal only on first visit ever
        const alreadySeen = localStorage.getItem("importantNoteSeen");
        if (!alreadySeen) {
            const t = setTimeout(() => setShowModal(true), 400);
            return () => clearTimeout(t);
        }
    }, []);

    const handleCloseModal = () => {
        localStorage.setItem("importantNoteSeen", "true");
        setShowModal(false);
    };

    return (
        <>
            <Helmet>
                <title>Rightzone Research | Home</title>
                <meta
                    name="description"
                    content="Rightzone Research provides thorough, unbiased stock market research, equity research, derivatives strategies, and investment reports."
                />
            </Helmet>

            {/* Important Note Modal */}
            {showModal && <ImportantNoteModal onClose={handleCloseModal} />}

            {/* Authenticate Team Modal */}
            {showAuthModal && (
                <AuthenticateTeamModal
                    onClose={() => setShowAuthModal(false)}
                />
            )}

            <main className="relative w-full bg-[#ffffff] font-sans overflow-x-hidden text-[#333333]">
                {/* ══════════════════════════════════════════════════
                    FULL-HEIGHT SIDE GUTTER DECORATION
                    (runs continuously from header to footer, filling
                    the entire marked red-arrow zone on both sides)
                    ══════════════════════════════════════════════════ */}
                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-24 pointer-events-none overflow-hidden z-0">
                    <div
                        className="absolute left-6 top-0 bottom-0 w-px"
                        style={{
                            background:
                                "repeating-linear-gradient(to bottom, rgba(26,75,155,0.15) 0, rgba(26,75,155,0.15) 6px, transparent 6px, transparent 14px)",
                        }}
                    />
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                top: `${i * 6.2 + 1}%`,
                                left: i % 2 === 0 ? 6 : 42,
                            }}
                        >
                            {i % 3 === 0 && (
                                <svg
                                    width="26"
                                    height="26"
                                    viewBox="0 0 26 26"
                                    style={{ opacity: 0.16 }}
                                >
                                    <circle
                                        cx="13"
                                        cy="13"
                                        r="10"
                                        fill="none"
                                        stroke="#1A4B9B"
                                        strokeWidth="2"
                                        strokeDasharray="3 3"
                                    />
                                </svg>
                            )}
                            {i % 3 === 1 && (
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    style={{ opacity: 0.15 }}
                                >
                                    <rect
                                        x="2"
                                        y="2"
                                        width="18"
                                        height="18"
                                        rx="4"
                                        fill="none"
                                        stroke="#F36E21"
                                        strokeWidth="2"
                                        transform={`rotate(${i * 11} 11 11)`}
                                    />
                                </svg>
                            )}
                            {i % 3 === 2 && (
                                <DotGrid
                                    rows={2}
                                    cols={2}
                                    color="#c084fc"
                                    opacity={0.2}
                                    className=""
                                />
                            )}
                        </div>
                    ))}
                    {/* Blurred blobs at intervals */}
                    <div
                        className="absolute -left-6 top-[10%] w-24 h-24 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(192,132,252,0.10) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute -left-8 top-[38%] w-28 h-28 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(26,75,155,0.08) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute -left-6 top-[62%] w-24 h-24 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(243,110,33,0.09) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute -left-8 top-[86%] w-28 h-28 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(192,132,252,0.10) 0%, transparent 70%)",
                        }}
                    />
                </div>

                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-24 pointer-events-none overflow-hidden z-0">
                    <div
                        className="absolute right-6 top-0 bottom-0 w-px"
                        style={{
                            background:
                                "repeating-linear-gradient(to bottom, rgba(243,110,33,0.15) 0, rgba(243,110,33,0.15) 6px, transparent 6px, transparent 14px)",
                        }}
                    />
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                top: `${i * 6.2 + 3}%`,
                                right: i % 2 === 0 ? 6 : 42,
                            }}
                        >
                            {i % 3 === 0 && (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    style={{ opacity: 0.16 }}
                                >
                                    <polygon
                                        points="12,2 22,20 2,20"
                                        fill="none"
                                        stroke="#F36E21"
                                        strokeWidth="2"
                                        strokeDasharray="3 3"
                                    />
                                </svg>
                            )}
                            {i % 3 === 1 && (
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    style={{ opacity: 0.15 }}
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="9"
                                        fill="none"
                                        stroke="#1A4B9B"
                                        strokeWidth="2"
                                    />
                                </svg>
                            )}
                            {i % 3 === 2 && (
                                <DotGrid
                                    rows={2}
                                    cols={2}
                                    color="#c084fc"
                                    opacity={0.2}
                                    className=""
                                />
                            )}
                        </div>
                    ))}
                    {/* Blurred blobs at intervals */}
                    <div
                        className="absolute -right-6 top-[6%] w-24 h-24 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(26,75,155,0.09) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute -right-8 top-[32%] w-28 h-28 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(243,110,33,0.09) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute -right-6 top-[58%] w-24 h-24 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(192,132,252,0.10) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute -right-8 top-[82%] w-28 h-28 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(26,75,155,0.08) 0%, transparent 70%)",
                        }}
                    />
                </div>

                {/* ══════════════════════════════════════════════════
                    Decorative background wrapper for HERO + ABOUT
                    (fills the blank side gutters marked by top red arrows)
                    ══════════════════════════════════════════════════ */}
                <div className="relative z-10">
                    {/* Left vertical dotted rail */}
                    <div
                        className="hidden md:block absolute left-4 top-0 bottom-0 w-px pointer-events-none"
                        style={{
                            background:
                                "repeating-linear-gradient(to bottom, rgba(26,75,155,0.18) 0, rgba(26,75,155,0.18) 6px, transparent 6px, transparent 14px)",
                        }}
                    />
                    {/* Right vertical dotted rail */}
                    <div
                        className="hidden md:block absolute right-4 top-0 bottom-0 w-px pointer-events-none"
                        style={{
                            background:
                                "repeating-linear-gradient(to bottom, rgba(243,110,33,0.18) 0, rgba(243,110,33,0.18) 6px, transparent 6px, transparent 14px)",
                        }}
                    />
                    {/* Soft blurred blobs floating in the side gutters */}
                    <div
                        className="hidden lg:block absolute -left-10 top-24 w-40 h-40 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(192,132,252,0.14) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="hidden lg:block absolute -right-10 bottom-24 w-48 h-48 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(26,75,155,0.10) 0%, transparent 70%)",
                        }}
                    />
                    <DotGrid
                        rows={5}
                        cols={3}
                        color="#c084fc"
                        className="hidden lg:block left-0 top-1/3"
                        opacity={0.18}
                    />
                    <DotGrid
                        rows={5}
                        cols={3}
                        color="#F36E21"
                        className="hidden lg:block right-0 top-1/2"
                        opacity={0.15}
                    />

                    {/* Extra blobs, top & bottom corners */}
                    <div
                        className="hidden lg:block absolute -left-14 top-2 w-32 h-32 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(243,110,33,0.09) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="hidden lg:block absolute -right-14 top-4 w-28 h-28 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="hidden lg:block absolute -left-8 bottom-4 w-36 h-36 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(26,75,155,0.08) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="hidden lg:block absolute -right-8 bottom-2 w-32 h-32 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(243,110,33,0.10) 0%, transparent 70%)",
                        }}
                    />

                    {/* Extra dot grids scattered in gutters */}
                    <DotGrid
                        rows={3}
                        cols={3}
                        color="#1A4B9B"
                        className="hidden lg:block left-2 top-4"
                        opacity={0.15}
                    />
                    <DotGrid
                        rows={3}
                        cols={3}
                        color="#c084fc"
                        className="hidden lg:block right-2 top-8"
                        opacity={0.15}
                    />
                    <DotGrid
                        rows={4}
                        cols={2}
                        color="#F36E21"
                        className="hidden lg:block left-1 bottom-1/3"
                        opacity={0.16}
                    />
                    <DotGrid
                        rows={4}
                        cols={2}
                        color="#1A4B9B"
                        className="hidden lg:block right-1 bottom-1/4"
                        opacity={0.16}
                    />

                    {/* Dashed outline shapes floating in gutters */}
                    <svg
                        className="hidden lg:block absolute left-6 top-12 opacity-25 pointer-events-none"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                    >
                        <rect
                            x="4"
                            y="4"
                            width="32"
                            height="32"
                            rx="6"
                            fill="none"
                            stroke="#1A4B9B"
                            strokeWidth="2"
                            strokeDasharray="4 3"
                        />
                    </svg>
                    <svg
                        className="hidden lg:block absolute right-6 top-1/4 opacity-25 pointer-events-none"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                    >
                        <polygon
                            points="18,3 33,30 3,30"
                            fill="none"
                            stroke="#F36E21"
                            strokeWidth="2"
                            strokeDasharray="3 3"
                        />
                    </svg>
                    <svg
                        className="hidden lg:block absolute left-8 bottom-1/4 opacity-25 pointer-events-none"
                        width="34"
                        height="34"
                        viewBox="0 0 34 34"
                    >
                        <circle
                            cx="17"
                            cy="17"
                            r="14"
                            fill="none"
                            stroke="#c084fc"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        />
                    </svg>
                    <svg
                        className="hidden lg:block absolute right-10 bottom-10 opacity-25 pointer-events-none"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                    >
                        <rect
                            x="3"
                            y="3"
                            width="24"
                            height="24"
                            rx="4"
                            fill="none"
                            stroke="#1A4B9B"
                            strokeWidth="2"
                            transform="rotate(20 15 15)"
                        />
                    </svg>

                    {/* Faint zigzag accents in gutters */}
                    <svg
                        className="hidden lg:block absolute left-3 top-1/2 opacity-20 pointer-events-none"
                        width="18"
                        height="90"
                        viewBox="0 0 18 90"
                    >
                        <polyline
                            points="2,0 16,15 2,30 16,45 2,60 16,75 2,90"
                            fill="none"
                            stroke="#F36E21"
                            strokeWidth="1.5"
                        />
                    </svg>
                    <svg
                        className="hidden lg:block absolute right-3 top-1/3 opacity-20 pointer-events-none"
                        width="18"
                        height="90"
                        viewBox="0 0 18 90"
                    >
                        <polyline
                            points="16,0 2,15 16,30 2,45 16,60 2,75 16,90"
                            fill="none"
                            stroke="#1A4B9B"
                            strokeWidth="1.5"
                        />
                    </svg>

                    {/* ============ 1. HERO SECTION ============ */}
                    <section className="relative max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center gap-6">
                        <DotGrid
                            rows={6}
                            cols={6}
                            color="#c084fc"
                            className="top-6 left-2"
                        />
                        <DotGrid
                            rows={6}
                            cols={6}
                            color="#c084fc"
                            className="bottom-6 right-2"
                        />
                        <svg
                            className="absolute top-8 right-16 opacity-30 pointer-events-none"
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                        >
                            <polygon
                                points="30,5 55,50 5,50"
                                fill="none"
                                stroke="#F36E21"
                                strokeWidth="2.5"
                            />
                        </svg>
                        <svg
                            className="absolute bottom-10 left-16 opacity-30 pointer-events-none"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                        >
                            <circle
                                cx="25"
                                cy="25"
                                r="20"
                                fill="none"
                                stroke="#a855f7"
                                strokeWidth="2.5"
                                strokeDasharray="5 3"
                            />
                        </svg>
                        <svg
                            className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
                            width="20"
                            height="140"
                            viewBox="0 0 20 140"
                        >
                            {Array.from({ length: 7 }).map((_, i) => (
                                <circle
                                    key={i}
                                    cx="10"
                                    cy={i * 20 + 10}
                                    r="3.5"
                                    fill="#F36E21"
                                />
                            ))}
                        </svg>
                        <div
                            className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)",
                            }}
                        />

                        <div
                            className="w-full md:w-5/12 text-center md:text-left"
                            data-aos="fade-right"
                        >
                            <span className="text-md font-bold text-[#F36E21] tracking-wider uppercase block mb-2">
                                Discover Opportunities. Build Wealth
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-[#1A4B9B] leading-tight mb-4">
                                Data-Driven Insights for{" "}
                                <span className="text-[#F36E21]">
                                    Smarter Investing
                                </span>
                            </h1>
                            <p className="text-gray-500 mb-6 text-md md:text-base max-w-md mx-auto md:mx-0">
                                Transform market information into confident
                                investment decisions with research designed to
                                uncover opportunities before they become trends.
                            </p>
                            <button
                                onClick={() => navigate("/contact")}
                                className="bg-[#F36E21] text-white font-medium px-6 py-3 rounded-full hover:bg-opacity-90 transition"
                            >
                                Enquiry Now
                            </button>
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="ml-4 bg-transparent border border-[#F36E21] text-[#F36E21] font-medium px-6 py-3 rounded-full hover:bg-[#F36E21] hover:text-white transition"
                            >
                                Authenticate Team
                            </button>
                        </div>

                        {/* ── Center floating animation ── */}
                        <div className="hidden md:flex w-2/12 justify-center items-center pointer-events-none">
                            <svg
                                width="120"
                                height="260"
                                viewBox="0 0 120 260"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Vertical dashed connector line */}
                                <line
                                    x1="60"
                                    y1="68"
                                    x2="60"
                                    y2="170"
                                    stroke="#1A4B9B"
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                    opacity="0.2"
                                />

                                {/* Small diamond */}
                                <polygon
                                    points="60,205 83,228 60,251 37,228"
                                    fill="none"
                                    stroke="#F36E21"
                                    strokeWidth="2"
                                    opacity="0.5"
                                >
                                    <animate
                                        attributeName="opacity"
                                        values="0.5;1;0.5"
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="0 60 228"
                                        to="45 60 228"
                                        dur="4s"
                                        repeatCount="indefinite"
                                    />
                                </polygon>
                            </svg>
                        </div>
                        <div
                            className="w-full md:w-5/12 flex justify-center relative"
                            data-aos="fade-left"
                            data-aos-delay="150"
                        >
                            <svg
                                className="absolute -bottom-4 right-8 opacity-35 pointer-events-none"
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                            >
                                <circle
                                    cx="25"
                                    cy="25"
                                    r="20"
                                    fill="none"
                                    stroke="#6555f7"
                                    strokeWidth="2"
                                    strokeDasharray="5 3"
                                />
                            </svg>
                            <svg
                                className="absolute top-4 left-4 opacity-25 pointer-events-none"
                                width="35"
                                height="35"
                                viewBox="0 0 35 35"
                            >
                                <polygon
                                    points="17,2 33,30 1,30"
                                    fill="none"
                                    stroke="#F36E21"
                                    strokeWidth="2"
                                />
                            </svg>
                            <img
                                src="/assets/hero.png"
                                alt="Hero Illustration"
                                className="w-full max-w-sm md:max-w-md object-contain relative z-10"
                            />
                        </div>
                    </section>

                    {/* ============ 2. ABOUT SECTION ============ */}
                    <section className="relative max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
                        <div
                            className="absolute -right-20 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(192,132,252,0.1) 0%, transparent 70%)",
                            }}
                        />
                        <svg
                            className="absolute top-8 right-8 opacity-25 pointer-events-none"
                            width="80"
                            height="40"
                            viewBox="0 0 80 40"
                        >
                            <polyline
                                points="0,20 10,5 20,20 30,5 40,20 50,5 60,20 70,5 80,20"
                                fill="none"
                                stroke="#F36E21"
                                strokeWidth="2.5"
                            />
                            <polyline
                                points="0,32 10,17 20,32 30,17 40,32 50,17 60,32 70,17 80,32"
                                fill="none"
                                stroke="#F36E21"
                                strokeWidth="2.5"
                            />
                        </svg>
                        <DotGrid
                            rows={5}
                            cols={5}
                            color="#c084fc"
                            className="bottom-6 left-2"
                        />
                        <div
                            className="w-full md:w-1/2 flex justify-center relative"
                            data-aos="fade-right"
                        >
                            <DotGrid
                                rows={4}
                                cols={4}
                                color="#c084fc"
                                className="top-0 left-0"
                                opacity={0.35}
                            />
                            <img
                                src="/assets/about.png"
                                alt="About Info"
                                className="w-full max-w-sm md:max-w-md object-contain relative z-10"
                            />
                        </div>
                        <div
                            className="w-full md:w-1/2 text-center md:text-left"
                            data-aos="fade-left"
                            data-aos-delay="150"
                        >
                            <span className="text-md font-bold text-[#F36E21] tracking-wider uppercase block mb-2">
                                About Us
                            </span>
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A4B9B] mb-4">
                                Who Is{" "}
                                <span className="text-[#F36E21]">
                                    Rightzone Research
                                </span>
                            </h2>
                            <p className="text-gray-500 mb-8 text-md md:text-base">
                                We are committed to helping investors navigate
                                financial markets with reliable research,
                                practical insights, and data-backed strategies.
                                Our goal is to simplify complex market movements
                                into actionable recommendations that support
                                long-term wealth creation.
                            </p>
                            <p className="text-gray-500 text-md md:text-base">
                                Our team of experienced market analysts,
                                financial researchers, and technology
                                professionals continuously monitors market
                                activity, evaluates investment opportunities,
                                and delivers timely insights to help you stay
                                ahead.
                            </p>
                        </div>
                    </section>
                </div>
                {/* ══════════════ end Hero + About wrapper ══════════════ */}

                {/* ============ 3. CTA BANNER ============ */}
                <section className="relative z-10 bg-gradient-to-r from-[#ff5e3a] to-[#7f00ff] py-12 px-4 text-center text-white overflow-hidden">
                    <svg
                        className="absolute left-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
                        width="180"
                        height="180"
                        viewBox="0 0 180 180"
                    >
                        {[85, 65, 45].map((r) => (
                            <circle
                                key={r}
                                cx="90"
                                cy="90"
                                r={r}
                                fill="none"
                                stroke="#fff"
                                strokeWidth="1.5"
                            />
                        ))}
                    </svg>
                    <svg
                        className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
                        width="180"
                        height="180"
                        viewBox="0 0 180 180"
                    >
                        {[85, 65, 45].map((r) => (
                            <circle
                                key={r}
                                cx="90"
                                cy="90"
                                r={r}
                                fill="none"
                                stroke="#fff"
                                strokeWidth="1.5"
                            />
                        ))}
                    </svg>
                    <DotGrid
                        rows={4}
                        cols={4}
                        color="#fff"
                        className="top-4 left-4"
                        opacity={0.1}
                    />
                    <DotGrid
                        rows={4}
                        cols={4}
                        color="#fff"
                        className="bottom-4 right-4"
                        opacity={0.1}
                    />
                    <div
                        className="max-w-4xl mx-auto relative z-10"
                        data-aos="zoom-in"
                    >
                        <span className="text-xs uppercase font-bold tracking-widest opacity-80 block mb-2">
                            For Enquiry
                        </span>
                        <h2 className="text-xl md:text-3xl font-bold mb-6">
                            Contact Us
                        </h2>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto bg-white/10 p-2 rounded-2xl sm:rounded-full backdrop-blur-sm">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-lg sm:rounded-full flex-grow focus:outline-none text-md"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-lg sm:rounded-full flex-grow focus:outline-none text-md"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-lg sm:rounded-full flex-grow focus:outline-none text-md"
                            />
                            <button
                                type="submit"
                                className="bg-[#F36E21] text-white font-semibold px-6 py-3 rounded-lg sm:rounded-full hover:bg-opacity-90 transition text-md shrink-0"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    Decorative background wrapper for SERVICES
                    (fills the blank side gutters marked by bottom red arrows)
                    ══════════════════════════════════════════════════ */}
                <div className="relative z-10">
                    <div
                        className="hidden md:block absolute left-6 top-0 bottom-0 w-px pointer-events-none"
                        style={{
                            background:
                                "repeating-linear-gradient(to bottom, rgba(26,75,155,0.15) 0, rgba(26,75,155,0.15) 6px, transparent 6px, transparent 14px)",
                        }}
                    />
                    <div
                        className="hidden md:block absolute right-6 top-0 bottom-0 w-px pointer-events-none"
                        style={{
                            background:
                                "repeating-linear-gradient(to bottom, rgba(243,110,33,0.15) 0, rgba(243,110,33,0.15) 6px, transparent 6px, transparent 14px)",
                        }}
                    />
                    <div
                        className="hidden lg:block absolute -left-16 top-1/4 w-56 h-56 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(192,132,252,0.10) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="hidden lg:block absolute -right-16 bottom-1/4 w-56 h-56 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(26,75,155,0.10) 0%, transparent 70%)",
                        }}
                    />
                    <DotGrid
                        rows={6}
                        cols={3}
                        color="#1A4B9B"
                        className="hidden lg:block left-0 top-10"
                        opacity={0.15}
                    />
                    <DotGrid
                        rows={6}
                        cols={3}
                        color="#F36E21"
                        className="hidden lg:block right-0 bottom-10"
                        opacity={0.15}
                    />

                    {/* Extra blobs in corners */}
                    <div
                        className="hidden lg:block absolute -left-12 top-4 w-28 h-28 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(243,110,33,0.09) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="hidden lg:block absolute -right-12 top-1/3 w-32 h-32 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(192,132,252,0.10) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="hidden lg:block absolute -left-10 bottom-1/3 w-36 h-36 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(26,75,155,0.08) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="hidden lg:block absolute -right-10 bottom-6 w-28 h-28 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(243,110,33,0.10) 0%, transparent 70%)",
                        }}
                    />

                    {/* Extra dot grids scattered along the gutters */}
                    <DotGrid
                        rows={3}
                        cols={3}
                        color="#c084fc"
                        className="hidden lg:block left-3 top-1/3"
                        opacity={0.16}
                    />
                    <DotGrid
                        rows={3}
                        cols={3}
                        color="#1A4B9B"
                        className="hidden lg:block right-3 top-1/2"
                        opacity={0.16}
                    />
                    <DotGrid
                        rows={4}
                        cols={2}
                        color="#F36E21"
                        className="hidden lg:block left-2 bottom-16"
                        opacity={0.16}
                    />
                    <DotGrid
                        rows={4}
                        cols={2}
                        color="#c084fc"
                        className="hidden lg:block right-2 top-16"
                        opacity={0.16}
                    />

                    {/* Dashed outline shapes */}
                    <svg
                        className="hidden lg:block absolute left-8 top-1/4 opacity-22 pointer-events-none"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                    >
                        <circle
                            cx="19"
                            cy="19"
                            r="15"
                            fill="none"
                            stroke="#1A4B9B"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        />
                    </svg>
                    <svg
                        className="hidden lg:block absolute right-8 top-10 opacity-22 pointer-events-none"
                        width="34"
                        height="34"
                        viewBox="0 0 34 34"
                    >
                        <rect
                            x="3"
                            y="3"
                            width="28"
                            height="28"
                            rx="6"
                            fill="none"
                            stroke="#F36E21"
                            strokeWidth="2"
                            strokeDasharray="4 3"
                            transform="rotate(15 17 17)"
                        />
                    </svg>
                    <svg
                        className="hidden lg:block absolute left-10 bottom-24 opacity-22 pointer-events-none"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                    >
                        <polygon
                            points="18,3 33,30 3,30"
                            fill="none"
                            stroke="#c084fc"
                            strokeWidth="2"
                            strokeDasharray="3 3"
                        />
                    </svg>
                    <svg
                        className="hidden lg:block absolute right-10 bottom-1/3 opacity-22 pointer-events-none"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                    >
                        <rect
                            x="3"
                            y="3"
                            width="24"
                            height="24"
                            rx="4"
                            fill="none"
                            stroke="#1A4B9B"
                            strokeWidth="2"
                        />
                    </svg>

                    {/* Faint vertical zigzag accents */}
                    <svg
                        className="hidden lg:block absolute left-1 top-1/2 opacity-18 pointer-events-none"
                        width="18"
                        height="110"
                        viewBox="0 0 18 110"
                    >
                        <polyline
                            points="2,0 16,18 2,36 16,54 2,72 16,90 2,110"
                            fill="none"
                            stroke="#F36E21"
                            strokeWidth="1.5"
                        />
                    </svg>
                    <svg
                        className="hidden lg:block absolute right-1 top-1/4 opacity-18 pointer-events-none"
                        width="18"
                        height="110"
                        viewBox="0 0 18 110"
                    >
                        <polyline
                            points="16,0 2,18 16,36 2,54 16,72 2,90 16,110"
                            fill="none"
                            stroke="#1A4B9B"
                            strokeWidth="1.5"
                        />
                    </svg>

                    {/* Faint diagonal accent lines near footer edge */}
                    <svg
                        className="hidden lg:block absolute left-4 bottom-2 opacity-20 pointer-events-none"
                        width="60"
                        height="30"
                        viewBox="0 0 60 30"
                    >
                        <line
                            x1="0"
                            y1="30"
                            x2="60"
                            y2="0"
                            stroke="#c084fc"
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                        />
                    </svg>
                    <svg
                        className="hidden lg:block absolute right-4 bottom-2 opacity-20 pointer-events-none"
                        width="60"
                        height="30"
                        viewBox="0 0 60 30"
                    >
                        <line
                            x1="60"
                            y1="30"
                            x2="0"
                            y2="0"
                            stroke="#F36E21"
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                        />
                    </svg>

                    {/* ============ 4. SERVICES ============ */}
                    <section className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
                        <div
                            className="text-center mb-14 relative"
                            data-aos="fade-up"
                        >
                            <DotGrid
                                rows={3}
                                cols={5}
                                color="#1A4B9B"
                                className="top-0 left-0"
                                opacity={0.22}
                            />
                            <DotGrid
                                rows={3}
                                cols={5}
                                color="#1A4B9B"
                                className="top-0 right-0"
                                opacity={0.22}
                            />
                            <span className="text-md font-bold text-[#F36E21] tracking-wider uppercase block mb-3">
                                Our Services
                            </span>
                            <h2 className="text-2xl md:text-4xl font-bold text-[#1A4B9B] mb-4">
                                Professional Market Research{" "}
                                <span className="text-[#F36E21]">
                                    Solutions
                                </span>
                            </h2>
                            <div className="flex items-center justify-center gap-2 mt-5">
                                <div
                                    style={{
                                        width: 48,
                                        height: 3,
                                        borderRadius: 4,
                                        background: "#1A4B9B",
                                    }}
                                />
                                <div
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        background: "#F36E21",
                                    }}
                                />
                                <div
                                    style={{
                                        width: 48,
                                        height: 3,
                                        borderRadius: 4,
                                        background: "#1A4B9B",
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none"
                            style={{
                                top: 240,
                                bottom: 60,
                                width: 1,
                                zIndex: 0,
                                background:
                                    "linear-gradient(to bottom, transparent, rgba(26,75,155,0.10) 10%, rgba(26,75,155,0.10) 90%, transparent)",
                            }}
                        />
                        <div style={{ position: "relative", zIndex: 1 }}>
                            {SERVICES.map((svc, idx) => (
                                <ServiceRow
                                    key={svc.id}
                                    svc={svc}
                                    index={idx}
                                />
                            ))}
                        </div>
                    </section>
                </div>
                {/* ══════════════ end Services wrapper ══════════════ */}
            </main>
        </>
    );
}
