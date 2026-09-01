import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

// Premium subtle dot-grid matrix background for the pricing area
const MarketGridBG = ({ className = "" }) => (
    <div
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
        <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
                backgroundImage: `radial-gradient(#1A4B9B 1.2px, transparent 1.2px)`,
                backgroundSize: "32px 32px",
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafbff]/80 to-[#fafbff]" />
    </div>
);

const PLANS = [
    {
        group: "Equity & Derivatives",
        title: "Alpha Insights",
        monthly: "15,990",
        quarterly: "44,990",
        accent: "#1A4B9B",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="16" />
            </svg>
        ),
    },
    {
        group: "Equity & Derivatives",
        title: "Futures Elite",
        monthly: "17,990",
        quarterly: "47,990",
        accent: "#F36E21",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
    {
        group: "Equity & Derivatives",
        title: "Alpha Options",
        monthly: "18,990",
        quarterly: "49,990",
        accent: "#1A4B9B",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
            </svg>
        ),
    },
    {
        group: "Equity & Derivatives",
        title: "Index Vision",
        monthly: "20,990",
        quarterly: "52,990",
        accent: "#F36E21",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
        ),
    },
    {
        group: "Combo Plans",
        title: "Smart Alpha",
        monthly: "25,990",
        quarterly: "66,990",
        accent: "#1A4B9B",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        group: "Combo Plans",
        title: "Derivative Elite",
        monthly: "28,990",
        quarterly: "73,990",
        accent: "#F36E21",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
    },
    {
        group: "Combo Plans",
        title: "Triple Elite",
        monthly: "38,990",
        quarterly: "98,990",
        accent: "#1A4B9B",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
    },
    {
        group: "Combo Plans",
        title: "Prime Access",
        monthly: "49,990",
        quarterly: "1,19,990",
        accent: "#F36E21",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        group: "Commodities",
        title: "Commodities Insights",
        monthly: "12,990",
        quarterly: "34,990",
        accent: "#1A4B9B",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
        ),
    },
    {
        group: "Commodities",
        title: "Commodity Apex",
        monthly: "24,990",
        quarterly: "45,990",
        accent: "#F36E21",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        group: "Commodities",
        title: "Commodity Ultra Insights",
        monthly: "39,990",
        quarterly: "1,18,990",
        accent: "#1A4B9B",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
];

const GROUPS = ["Equity & Derivatives", "Combo Plans", "Commodities"];

function PlanCard({ plan, index }) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={(index % 4) * 90}
            className="group relative flex flex-col justify-between rounded-3xl bg-white text-left p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-gray-100"
        >
            <div>
                {/* Visual Accent Circle Identifier */}
                <div className="flex items-center justify-between mb-8">
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                            background: `${plan.accent}12`,
                            color: plan.accent,
                        }}
                    >
                        {plan.icon}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors">
                    {plan.title}
                </h3>
            </div>

            {/* Structured Bordered Pricing Tier Frame */}
            <div className="bg-[#fafbfe] border border-gray-100 rounded-2xl p-5 space-y-4">
                <div className="flex items-baseline justify-between border-b border-gray-200/60 pb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Monthly
                    </span>
                    <div>
                        <span
                            className="text-2xl font-black tracking-tight"
                            style={{ color: plan.accent }}
                        >
                            ₹{plan.monthly}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">/mo</span>
                    </div>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Quarterly
                    </span>
                    <div>
                        <span className="text-md font-bold text-gray-700">
                            ₹{plan.quarterly}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">/qt</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Pricing() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research| Pricing</title>
                <meta
                    name="description"
                    content="Explore our pricing structures and customized research advisory subscription plans."
                />
            </Helmet>
            {/* ============ 1. HERO (UNTOUCHED - AS SPECIFIED) ============ */}
            <section
                className="relative pt-20 sm:pt-24 pb-14 sm:pb-20 px-4 text-center overflow-hidden border-b border-gray-100"
                style={{
                    background:
                        "linear-gradient(135deg, #eaf1ff 0%, #fff3e9 100%)",
                }}
            >
                {/* Original Hero SVG Layout elements */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
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
                            <stop
                                offset="0%"
                                stopColor="#ffffff"
                                stopOpacity="0"
                            />
                            <stop
                                offset="100%"
                                stopColor="#ffffff"
                                stopOpacity="1"
                            />
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
                        Pricing <span className="text-[#F36E21]">Plans</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ 2. NEW PRICING LAYOUT ============ */}
            <section className="relative bg-[#fafbff] py-20 sm:py-24 px-4 overflow-hidden">
                <MarketGridBG />
                <div className="max-w-7xl mx-auto relative z-10 space-y-20 sm:space-y-28">
                    {GROUPS.map((group) => (
                        <div key={group}>
                            {/* Updated Group Headers with modern minimalistic accent lines */}
                            <div
                                className="mb-12 flex items-center justify-between gap-6"
                                data-aos="fade-up"
                            >
                                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                                    {group}
                                </h2>
                                <div className="h-[2px] flex-grow bg-gradient-to-r from-[#1A4B9B]/20 via-gray-200 to-transparent rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                                {PLANS.filter((p) => p.group === group).map(
                                    (plan, idx) => (
                                        <PlanCard
                                            key={plan.title}
                                            plan={plan}
                                            index={idx}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ 3. CLOSING CTA (UNTOUCHED - AS SPECIFIED) ============ */}
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
