import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

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

/* ---------- Animated radar / scanning glyph — signature element for "in progress" ---------- */
const ScanGlyph = () => (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-8">
        <svg viewBox="0 0 120 120" className="w-full h-full">
            <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#1A4B9B"
                strokeOpacity="0.12"
                strokeWidth="2"
            />
            <circle
                cx="60"
                cy="60"
                r="38"
                fill="none"
                stroke="#1A4B9B"
                strokeOpacity="0.16"
                strokeWidth="2"
            />
            <circle
                cx="60"
                cy="60"
                r="22"
                fill="none"
                stroke="#F36E21"
                strokeOpacity="0.25"
                strokeWidth="2"
            />
            <line
                x1="60"
                y1="6"
                x2="60"
                y2="114"
                stroke="#1A4B9B"
                strokeOpacity="0.08"
                strokeWidth="1"
            />
            <line
                x1="6"
                y1="60"
                x2="114"
                y2="60"
                stroke="#1A4B9B"
                strokeOpacity="0.08"
                strokeWidth="1"
            />
            <g
                style={{
                    transformOrigin: "60px 60px",
                    animation: "rt-spin 3.5s linear infinite",
                }}
            >
                <path
                    d="M60 60 L60 6 A54 54 0 0 1 105 33 Z"
                    fill="#1A4B9B"
                    opacity="0.10"
                />
                <line
                    x1="60"
                    y1="60"
                    x2="60"
                    y2="6"
                    stroke="#F36E21"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            </g>
            <circle cx="60" cy="60" r="4" fill="#1A4B9B" />
        </svg>
        <style>{`
            @keyframes rt-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
    </div>
);

export default function ResearchTools() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            {/* ============ HERO / COMING SOON ============ */}
            <section
                className="relative min-h-[80vh] flex items-center pt-20 sm:pt-24 pb-20 sm:pb-24 px-4 text-center overflow-hidden border-b border-gray-100"
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
                    className="max-w-2xl mx-auto relative z-10 w-full"
                    data-aos="fade-up"
                >
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#F36E21] tracking-widest uppercase mb-6 px-3 py-1 rounded-full border border-[#F36E21]/20 bg-white/80 backdrop-blur-sm">
                        Research Tools
                    </span>

                    <ScanGlyph />

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1A4B9B] leading-tight mb-5 tracking-tight">
                        Coming <span className="text-[#F36E21]">Soon</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                    <p className="text-gray-600 text-md sm:text-base max-w-md mx-auto leading-relaxed mb-10">
                        This section is currently under development. Please
                        check back soon.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/"
                            className="bg-[#F36E21] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-opacity-90 shadow-lg shadow-[#F36E21]/20 transition-all"
                        >
                            Back to Home
                        </Link>
                        <Link
                            to="/services"
                            className="bg-white border-2 border-[#1A4B9B] text-[#1A4B9B] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-[#1A4B9B] hover:text-white transition-all"
                        >
                            View Our Services
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
