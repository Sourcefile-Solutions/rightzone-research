import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

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

const CORE_VALUES = [
    {
        label: "Our Vision",
        desc: "To be a trusted equity research partner, respected for integrity, precision, and the discipline that drives lasting performance.",
        accent: "#7f00ff",
        glyph: (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                    d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"
                    stroke="#1A2B6B"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#1A2B6B"
                    strokeWidth="1.8"
                />
            </svg>
        ),
    },
    {
        label: "Our Values",
        desc: "Integrity, transparency, and discipline guide every report—unbiased research that puts the investor's interest first.",
        accent: "#F36E21",
        glyph: (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                    d="M6 3h12l3 5-9 13L3 8l3-5z"
                    stroke="#1A2B6B"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M3 8h18M9 3l3 5 3-5M12 8l-2 13M12 8l2 13"
                    stroke="#1A2B6B"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        label: "Our Mission",
        desc: "To empower investors with disciplined, research-backed insights that cut through market noise and build long-term wealth.",
        accent: "#22c55e",
        glyph: (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"
                    stroke="#1A2B6B"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 16l-1.5 4M19 16l1.5 4"
                    stroke="#1A2B6B"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

function ValueCard({ val }) {
    return (
        <div className="flex flex-col items-center text-center w-full max-w-[220px] mx-auto">
            <div className="relative flex items-center justify-center">
                <div
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center"
                    style={{
                        background: `linear-gradient(135deg, ${val.accent} 0%, #1A2B6B 100%)`,
                    }}
                >
                    <div
                        className="w-[74%] h-[74%] rounded-full flex items-center justify-center"
                        style={{
                            background: `linear-gradient(135deg, ${val.accent} 0%, #1A2B6B 100%)`,
                            boxShadow: `inset 0 0 0 6px rgba(255,255,255,0.15)`,
                        }}
                    >
                        <div className="w-[68%] h-[68%] rounded-full bg-white flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
                            {val.glyph}
                        </div>
                    </div>
                </div>
                {/* connector line — shorter on mobile so spacing isn't excessive when stacked */}
                <div
                    className="absolute top-full w-[3px] h-6 sm:h-10"
                    style={{ background: val.accent }}
                />
                <div
                    className="absolute w-2.5 h-2.5 rounded-full"
                    style={{
                        background: val.accent,
                        top: "calc(100% + 1.5rem)",
                    }}
                />
            </div>
            <h3
                className="text-sm font-extrabold uppercase tracking-[0.14em] mt-10 sm:mt-14 mb-2"
                style={{ color: val.accent }}
            >
                {val.label}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed px-2 sm:px-0">
                {val.desc}
            </p>
        </div>
    );
}

export default function About() {
    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
            offset: 60,
        });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | About Us</title>
                <meta
                    name="description"
                    content="Learn more about Rightzone Research, our mission, values, and story as a SEBI-registered Research Analyst."
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

                <div className="max-w-3xl mx-auto relative z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1A4B9B] leading-tight mb-5 tracking-tight">
                        About <span className="text-[#F36E21]">Us</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ 2. STORY ============ */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-24 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                <div
                    className="w-full md:w-1/2 relative order-1"
                    data-aos="fade-right"
                >
                    <div className="absolute -top-5 -left-5 w-24 h-24 rounded-2xl border-2 border-[#c084fc]/30 -z-0 hidden sm:block" />
                    <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-[#1A4B9B]/5 aspect-video md:aspect-[4/3] bg-gradient-to-br from-[#eef0ff] to-[#fff4ee] flex items-center justify-center">
                        <img
                            src="/assets/about1.jpg"
                            alt="Our analytical philosophy"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    </div>
                </div>

                <div
                    className="w-full md:w-1/2 text-left order-2"
                    data-aos="fade-left"
                >
                    <span className="text-xs font-bold text-[#F36E21] tracking-widest uppercase block mb-2">
                        Who We Are
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A4B9B] mb-5 leading-tight">
                        Creating Wealth Through{" "}
                        <span className="text-[#F36E21]">
                            Research, Discipline
                        </span>{" "}
                        &amp; Informed Decisions
                    </h2>
                    <p className="text-gray-600 mb-4 text-md md:text-base leading-relaxed">
                        At <strong>Rightzone Research</strong>, we are a
                        SEBI-registered Research Analyst committed to providing
                        unbiased, research-driven, and data-backed investment
                        recommendations. We help both retail and institutional
                        investors make informed financial decisions through
                        reliable market research and actionable insights.
                    </p>
                    <p className="text-gray-600 text-md md:text-base leading-relaxed mb-6">
                        Our philosophy is simple : disciplined investing, backed
                        by thorough research and consistency, is the foundation
                        of long-term wealth creation. We believe that informed
                        decisions—not speculation—lead to sustainable financial
                        success.
                    </p>
                </div>
            </section>

            {/* ============ 3. MISSION / VISION ============ */}
            <section className="relative bg-[#fafbff] py-20 px-4 border-y border-gray-100 overflow-hidden">
                <MarketGridBG className="opacity-50" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-5xl font-semibold text-[#1A4B9B] max-w-4xl mx-auto leading-tight">
                            Long-Term Wealth Begins With
                            <span className="block text-[#F36E21]">
                                Disciplined Investment Decisions
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-12 sm:gap-6 pt-6">
                        {CORE_VALUES.map((val, index) => (
                            <div
                                key={val.label}
                                data-aos="zoom-in-up"
                                data-aos-delay={index * 150}
                                className={
                                    index === 1 ? "sm:-translate-y-6" : ""
                                }
                            >
                                <ValueCard val={val} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ 4. CLOSING CTA ============ */}
            <section className="relative bg-gradient-to-r from-[#ff5e3a] to-[#7f00ff] py-12 px-4 text-center text-white overflow-hidden">
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
        </main>
    );
}