import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        setTimeout(() => {
            setSubmitting(false);
            alert(`Checking authentication for +91 ${cleaned}`);
            onClose();
        }, 800);
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top accent bar */}
                <div
                    className="h-1.5 w-full flex-shrink-0"
                    style={{
                        background: "linear-gradient(90deg, #1A4B9B, #F36E21)",
                    }}
                />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(26,75,155,0.08)" }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#1A4B9B"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                            Authenticate Team
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-6">
                    <label
                        htmlFor="auth-phone"
                        className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
                    >
                        Enter Phone Number
                    </label>

                    <div
                        className={`flex items-center rounded-xl overflow-hidden border transition-all ${
                            error
                                ? "border-[#F36E21]"
                                : "border-slate-300 focus-within:border-[#1A4B9B]"
                        }`}
                    >
                        <span className="px-4 py-3 text-sm font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">
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
                            className="flex-grow px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-[#F36E21] font-medium mt-2">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleCheck}
                        disabled={submitting}
                        className="w-full mt-6 py-3 rounded-xl text-white text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.99] disabled:opacity-60"
                        style={{
                            background:
                                "linear-gradient(90deg, #1A4B9B, #F36E21)",
                        }}
                    >
                        {submitting ? "Checking..." : "Check Now"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setShowScrollButton(scrollY > 100);
            setIsAtTop(scrollY < 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const resourceLinks = [
        { name: "About Us", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Reports", path: "/reports" },
        { name: "Pricing", path: "/pricing" },
        { name: "Payments", path: "/payments" },
        { name: "Contact Us", path: "/contact" },
    ];

    const legalLinks = [
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Disclaimer", path: "/disclaimer" },
        { name: "Disclosure", path: "/disclosure" },
        { name: "Client Consent Form", path: "/client-consent-form" },
    ];

    const importantLinks = [
        {
            name: "Grievance Redressal Matrix",
            path: "/grievance-redressal",
            isExternal: false,
        },
        {
            name: "Investor Charter",
            path: "/investor-charter",
            isExternal: false,
        },
        {
            name: "Complaint Board",
            path: "/complaint-board",
            isExternal: false,
        },
        {
            name: "ODR Link",
            path: "https://smartodr.in/login",
            isExternal: true,
        },
        {
            name: "ODR Circular Link",
            path: "https://www.sebi.gov.in/legal/master-circulars/dec-2023/master-circular-for-online-resolution-of-disputes-in-the-indian-securities-market_80236.html",
            isExternal: true,
        },
        {
            name: "NSE Holidays",
            path: "/nse-holidays",
            isExternal: false,
        },
        {
            name: "BSE Holidays",
            path: "/bse-holidays",
            isExternal: false,
        },
    ];

    return (
        <footer
            style={{
                background: "linear-gradient(135deg, #d5dcf3 0%, #fcead9 100%)",
                color: "#1e293b",
                fontFamily: "Inter, system-ui, sans-serif",
            }}
            className="border-t border-slate-300/40"
        >
            {/* ── Main Navigation Section ── */}
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                {/* Brand Column */}
                <div className="lg:col-span-2">
                    <Link to="/" className="inline-block">
                        <img
                            src="/assets/logo.png"
                            alt="Rightzone Research Logo"
                            className="h-16 w-auto drop-shadow-sm"
                        />
                    </Link>

                    <p className="mt-5 text-sm leading-relaxed text-slate-700 max-w-sm">
                        Analyzing for Success. Association of SEBI Registered
                        Research Analysts of India.
                    </p>
                </div>

                {/* Resources Link Column */}
                <div>
                    <h4 className="text-slate-900 text-sm font-bold uppercase tracking-widest mb-4 border-l-2 border-[#1A4B9B] pl-2.5">
                        Resources
                    </h4>
                    <ul className="space-y-2.5 text-sm">
                        {resourceLinks.map((link, i) => (
                            <li key={i}>
                                <Link
                                    to={link.path}
                                    className="text-slate-700 hover:text-[#F36E21] hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                                >
                                    <span className="text-[#F36E21] font-bold text-sm">
                                        ›
                                    </span>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal Link Column */}
                <div>
                    <h4 className="text-slate-900 text-sm font-bold uppercase tracking-widest mb-4 border-l-2 border-[#1A4B9B] pl-2.5">
                        Legal
                    </h4>
                    <ul className="space-y-2.5 text-sm">
                        {legalLinks.map((link, i) => (
                            <li key={i}>
                                <Link
                                    to={link.path}
                                    className="text-slate-700 hover:text-[#F36E21] hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                                >
                                    <span className="text-[#F36E21] font-bold text-sm">
                                        ›
                                    </span>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Important Links Column */}
                <div>
                    <h4 className="text-slate-900 text-sm font-bold uppercase tracking-widest mb-4 border-l-2 border-[#1A4B9B] pl-2.5">
                        Important Links
                    </h4>
                    <ul className="space-y-2.5 text-sm">
                        {importantLinks.map((link, i) => (
                            <li key={i}>
                                {link.isExternal ? (
                                    <a
                                        href={link.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-700 hover:text-[#F36E21] hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                                    >
                                        <span className="text-[#F36E21] font-bold text-sm">
                                            ›
                                        </span>
                                        {link.name}
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-slate-500"
                                        >
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </a>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className="text-slate-700 hover:text-[#F36E21] hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                                    >
                                        <span className="text-[#F36E21] font-bold text-sm">
                                            ›
                                        </span>
                                        {link.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ── Glassmorphism Informational Cards Section ── */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    {/* Card 1: SEBI RA Details */}
                    <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <h4 className="text-slate-900 text-base font-bold mb-3 border-b border-slate-200/80 pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1A4B9B]"></span>
                                SEBI Registered RA Details
                            </h4>
                            <div className="space-y-2 text-slate-700">
                                <p>
                                    <strong className="text-slate-900 font-semibold">
                                        Registered Name:
                                    </strong>{" "}
                                    Rightzone Research
                                </p>
                                <p>
                                    <strong className="text-slate-900 font-semibold">
                                        Type of Registration:
                                    </strong>{" "}
                                    —
                                </p>
                                <p>
                                    <strong className="text-slate-900 font-semibold">
                                        Registration Number:
                                    </strong>{" "}
                                    —
                                </p>
                                <p>
                                    <strong className="text-slate-900 font-semibold">
                                        Enlistment No:
                                    </strong>{" "}
                                    —
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-6 w-24 py-2 bg-[#F36E21] hover:bg-[#e03d0f] text-white font-semibold text-sm uppercase tracking-wide rounded-lg transition-all shadow-sm active:scale-[0.98]"
                        >
                            Verify
                        </button>
                    </div>

                    {/* Card 2: Corporate Office */}
                    <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <h4 className="text-slate-900 text-base font-bold mb-3 border-b border-slate-200/80 pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1A4B9B]"></span>
                                Corporate Office
                            </h4>
                            <div className="space-y-2 text-slate-700">
                                <p>
                                    <strong className="text-slate-900 font-semibold">
                                        Registered Address:
                                    </strong>{" "}
                                    Bangalore, Karnataka
                                </p>
                                <p>
                                    <strong className="text-slate-900 font-semibold">
                                        Email:
                                    </strong>{" "}
                                    support@rightzoneresearch.com
                                </p>
                                <p>
                                    <strong className="text-slate-900 font-semibold">
                                        Phone:
                                    </strong>{" "}
                                    +91 9342819342
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="mt-6 w-fit px-5 py-2 bg-[#1A4B9B] hover:bg-[#143a79] text-white font-semibold text-sm uppercase tracking-wide rounded-lg transition-all shadow-sm active:scale-[0.98]"
                        >
                            Authenticate Team
                        </button>
                    </div>

                    {/* Card 3: Key Contact Officers */}
                    <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <h4 className="text-slate-900 text-base font-bold mb-3 border-b border-slate-200/80 pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1A4B9B]"></span>
                                Key Contact Officers
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[11px] uppercase tracking-wider text-[#F36E21] font-bold">
                                        Principal Officer
                                    </p>
                                    <p className="text-slate-900 font-bold text-sm">
                                        Vikas Tiwari
                                    </p>
                                    <p className="text-sm text-slate-600 mt-0.5">
                                        support@rightzoneresearch.com | +91
                                        9342819342
                                    </p>
                                </div>
                                <div className="border-t border-slate-200/80 pt-3">
                                    <p className="text-[11px] uppercase tracking-wider text-[#F36E21] font-bold">
                                        Compliance Officer
                                    </p>
                                    <p className="text-slate-900 font-bold text-sm">
                                        Vikas Tiwari
                                    </p>
                                    <p className="text-sm text-slate-600 mt-0.5">
                                        support@rightzoneresearch.com | +91
                                        9342819342
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Regulatory Warning Section ── */}
            <div className="max-w-7xl mx-auto px-6 py-6 text-sm leading-relaxed text-slate-700 text-center border-t border-slate-300/60 mt-4 space-y-2">
                <p>
                    <strong className="text-slate-900">Warning: </strong>
                    "Investment in securities market are subject to market
                    risks. Read all the related documents carefully before
                    investing."
                </p>
                <p>
                    <strong className="text-slate-900">Disclaimer: </strong>
                    "Registration granted by SEBI, enlistment as RA with
                    exchange and certification from NISM in no way guarantee
                    performance of the intermediary or provide any assurance of
                    returns to investors. The securities displayed are for
                    illustration only and are not recommendatory."
                </p>
            </div>

            {/* ── Authenticate Team Modal ── */}
            {showAuthModal && (
                <AuthenticateTeamModal
                    onClose={() => setShowAuthModal(false)}
                />
            )}

            {/* ── Certificate Modal ── */}
            {/* {isModalOpen && (
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-lg w-full bg-white rounded-2xl p-6 text-center shadow-2xl border border-slate-100"
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold"
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">SEBI Verification Certificate</h3>
                        <div className="bg-slate-50 border border-dashed border-slate-300 p-8 rounded-xl flex items-center justify-center min-h-[200px]">
                            <p className="text-slate-500 text-sm">Certificate image/document preview goes here</p>
                        </div>
                    </div>
                </div>
            )} */}

            {/* ── Scroll Button ── */}
            {showScrollButton && (
                <button
                    onClick={() => {
                        if (isAtTop) {
                            window.scrollTo({
                                top: window.innerHeight,
                                behavior: "smooth",
                            });
                        } else {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}
                    className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-50 text-white"
                    style={{
                        background: "linear-gradient(135deg, #1A4B9B, #F36E21)",
                    }}
                    aria-label="Scroll Toggle"
                >
                    {isAtTop ? (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    ) : (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="18 15 12 9 6 15" />
                        </svg>
                    )}
                </button>
            )}
        </footer>
    );
}
