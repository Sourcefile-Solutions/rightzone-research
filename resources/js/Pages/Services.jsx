import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

/* ---------- Background: faint market grid + ticking price lines (matches About page) ---------- */
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

const SERVICES_DATA = [
    {
        id: "01",
        title: "Fundamental Research for Smarter Investing",
        desc: "Build a stronger investment portfolio with comprehensive fundamental research backed by data, industry expertise, and disciplined analysis.",
        img: "/assets/s1.jpg",
        path: "/fundamental-research",
        accent: "#1A4B9B",
    },
    {
        id: "02",
        title: "Derivatives Research & Trading Strategies",
        desc: "Gain a strategic edge in the derivatives market with research-driven Futures & Options strategies designed for changing market conditions.",
        img: "/assets/s2.jpg",
        path: "/derivatives-research",
        accent: "#F36E21",
    },
    {
        id: "03",
        title: "Market Momentum & Technical Research",
        desc: "Stay ahead of market trends with professional technical analysis designed to identify high-probability trading opportunities.",
        img: "/assets/s3.PNG",
        path: "/market-momentum",
        accent: "#1A4B9B",
    },
    {
        id: "04",
        title: "Investment Strategy & Stock Research",
        desc: "Make informed investment decisions with comprehensive stock research and actionable recommendations backed by in-depth market analysis.",
        img: "/assets/s4.jfif",
        path: "/investment-strategy",
        accent: "#F36E21",
    },
    {
        id: "05",
        title: "Market Intelligence & Economic Insights",
        desc: "Gain a broader perspective on the financial markets with comprehensive sector and market trend analysis. ",
        img: "/assets/s5.jfif",
        path: "/market-intelligence",
        accent: "#1A4B9B",
    },
];

function ServicesShowcase({ services }) {
    const [active, setActive] = React.useState(0);

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden bg-white"
            style={{
                border: "1.5px solid #ececf6",
                boxShadow: "0 8px 30px rgba(26,75,155,0.06)",
            }}
        >
            {/* Left: list */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-gray-100">
                {services.map((svc, idx) => {
                    const isActive = idx === active;
                    return (
                        <Link
                            key={svc.id}
                            to={svc.path}
                            onMouseEnter={() => setActive(idx)}
                            onFocus={() => setActive(idx)}
                            className="w-full text-left flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-6 sm:py-7 border-b border-gray-100 last:border-b-0 transition-colors duration-300 relative"
                            style={{
                                background: isActive
                                    ? `${svc.accent}0c`
                                    : "transparent",
                            }}
                        >
                            <span
                                className="absolute left-0 top-0 bottom-0 w-[3px] transition-transform duration-300 origin-top"
                                style={{
                                    background: svc.accent,
                                    transform: isActive
                                        ? "scaleY(1)"
                                        : "scaleY(0)",
                                }}
                            />
                            <span
                                className="text-2xl sm:text-3xl font-black tabular-nums shrink-0 transition-colors duration-300"
                                style={{
                                    color: isActive ? svc.accent : "#c7cae8",
                                }}
                            >
                                {svc.id}
                            </span>
                            <div className="flex-1 min-w-0">
                                <h3
                                    className="text-base sm:text-lg font-bold leading-snug transition-colors duration-300"
                                    style={{
                                        color: isActive ? "#111827" : "#374151",
                                    }}
                                >
                                    {svc.title}
                                </h3>
                                {isActive && (
                                    <p className="hidden sm:block text-sm text-gray-500 mt-1.5 leading-relaxed max-w-md">
                                        {svc.desc}
                                    </p>
                                )}
                            </div>
                            <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="none"
                                stroke={isActive ? svc.accent : "#c7cae8"}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="shrink-0 transition-transform duration-300"
                                style={{
                                    transform: isActive
                                        ? "translateX(4px)"
                                        : "translateX(0)",
                                }}
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    );
                })}
            </div>

            {/* Right: preview (Now shows clean image content only) */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] bg-[#0b0d2e]">
                {services.map((svc, idx) => (
                    <div
                        key={svc.id}
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                            opacity: idx === active ? 1 : 0,
                            pointerEvents: idx === active ? "auto" : "none",
                        }}
                    >
                        <img
                            src={svc.img}
                            alt={svc.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Services() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Services</title>
                <meta name="description" content="Discover our specialized investment research advisory, F&O strategies, and wealth creation services." />
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
                        Our <span className="text-[#F36E21]">Services</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ 2. SERVICES LIST (ticker-row layout) ============ */}
            <section className="relative bg-[#fafbff] py-16 sm:py-20 px-4 border-b border-gray-100 overflow-hidden">
                <MarketGridBG className="opacity-50" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <ServicesShowcase services={SERVICES_DATA} />
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
