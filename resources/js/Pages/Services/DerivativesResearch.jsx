import React from "react";
import { Helmet } from "react-helmet";

const AdvancedMarketBG = ({ className = "" }) => (
    <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern
                id="techPatternFO"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
            >
                <circle
                    cx="20"
                    cy="20"
                    r="1"
                    fill="#1A4B9B"
                    fillOpacity="0.035"
                />
                <path
                    d="M 20 0 L 20 40 M 0 20 L 40 20"
                    stroke="#1A4B9B"
                    strokeOpacity="0.015"
                    strokeWidth="0.5"
                />
            </pattern>
            <pattern
                id="gridOverlayFO"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M 80 0 L 0 0 0 80"
                    fill="none"
                    stroke="#1A4B9B"
                    strokeOpacity="0.03"
                    strokeWidth="0.8"
                />
            </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#techPatternFO)" />
        <path
            d="M -100 450 Q 200 320 450 480 T 900 280 T 1300 390"
            fill="none"
            stroke="#F36E21"
            strokeOpacity="0.07"
            strokeWidth="2.5"
            strokeDasharray="8 4"
        />
        <path
            d="M -100 520 Q 180 580 500 420 T 950 510 T 1300 320"
            fill="none"
            stroke="#1A4B9B"
            strokeOpacity="0.05"
            strokeWidth="2.5"
        />
        <rect width="1200" height="800" fill="url(#gridOverlayFO)" />
    </svg>
);

const deliverables = [
    {
        title: "Strategy Development",
        desc: "Research-backed trading strategies for multiple market conditions",
        color: "#1A4B9B",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
        ),
    },
    {
        title: "Options Analytics",
        desc: "Open Interest, Implied Volatility & market positioning",
        color: "#F36E21",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
        ),
    },
    {
        title: "Trade Planning",
        desc: "Entry, target, stop-loss & risk management guidance",
        color: "#0D9488",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
            </svg>
        ),
    },
    {
        title: "Market Outlook",
        desc: "Trend analysis with bullish, bearish & sideways scenarios",
        color: "#6366F1",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                <polyline points="22 4 12 14.01 9 11.01" />
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            </svg>
        ),
    },
    {
        title: "Performance Review",
        desc: "Historical strategy evaluation & continuous optimization",
        color: "#D97706",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
            </svg>
        ),
    },
];

export default function FuturesAndOptions() {
    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>
                    Rightzone Research | Derivatives Research & Trading
                    Strategies
                </title>
                <meta
                    name="description"
                    content="Explore research-based trading and investment strategies for equities, derivatives, options, and commodities from Rightzone Research."
                />
            </Helmet>

            {/* ── HERO ── */}
            <section
                className="relative pt-20 sm:pt-24 pb-14 sm:pb-20 px-4 text-center overflow-hidden border-b border-gray-100"
                style={{
                    background:
                        "linear-gradient(135deg, #eaf1ff 0%, #fff3e9 100%)",
                }}
            >
                <AdvancedMarketBG className="opacity-80" />
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
                        Derivatives Research{" "}
                        <span className="text-[#F36E21]">
                            &amp; Trading Strategies
                        </span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ── SPLIT CONTENT ── */}
            <section className="relative bg-[#f8faff] py-16 sm:py-24 px-6 overflow-hidden">
                <AdvancedMarketBG className="opacity-30" />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Grid Layout: Left Content, Right Image on Desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        {/* ── LEFT SIDE: Content ── */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 font-medium">
                                Gain a strategic edge in the derivatives market
                                with research-driven Futures & Options
                                strategies designed for changing market
                                conditions. Our analysis combines price action,
                                market trends, volatility, and options data to
                                identify high-probability trading opportunities
                                with a disciplined risk management approach.
                            </p>
                            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-12">
                                Whether you trade index options, stock futures,
                                or options spreads, our strategy reports provide
                                actionable insights to help you manage risk,
                                improve trade timing, and make informed trading
                                decisions.
                            </p>

                            {/* "Key Insights" List Section */}
                            <div className="mb-12">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-[#F36E21]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F36E21]" />
                                    Key Insights
                                </h3>

                                {/* Compact colored-icon card grid */}
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                                    {deliverables.map((item, i) => (
                                        <div
                                            key={i}
                                            className="group relative flex flex-col items-center text-center gap-1.5 rounded-[1.75rem] border-2 bg-white/70 py-4 px-1.5 transition-all duration-300 hover:bg-white hover:shadow-[0_10px_24px_-8px_rgba(26,75,155,0.18)] hover:-translate-y-1"
                                            style={{
                                                borderColor: `${item.color}22`,
                                            }}
                                        >
                                            <div
                                                className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                                                style={{
                                                    background: item.color,
                                                }}
                                            >
                                                {item.icon}
                                            </div>
                                            <h4
                                                className="text-[11px] font-semibold leading-snug mt-1"
                                                style={{ color: item.color }}
                                            >
                                                {item.title}
                                            </h4>
                                            <p className="text-[10px] text-gray-400 leading-snug">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* "Designed For" Banner Block Section */}
                            <div className="border-t border-gray-200/60 pt-8 mt-4">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-[#F36E21]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#F36E21]" />
                                        Designed For
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed font-medium flex-1 bg-gradient-to-r from-[#1A4B9B]/5 to-transparent p-4 rounded-xl border-l-2 border-[#1A4B9B]">
                                        Options traders, futures traders,
                                        derivatives professionals, active market
                                        participants, and investors seeking
                                        structured, research-based F&O trading
                                        strategies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT SIDE: Sticky Image Display ── */}
                        <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-8">
                            <div className="relative w-full max-w-[460px]">
                                {/* Backdrop visual glow */}
                                <div
                                    className="absolute -inset-1 rounded-[2rem] blur-xl opacity-20 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #1A4B9B, #F36E21)",
                                    }}
                                />

                                {/* Decorative outer shadow boundary */}
                                <div
                                    className="absolute inset-0 rounded-[2rem] translate-x-3 translate-y-3 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #1A4B9B08, #F36E2105)",
                                        border: "1px solid #1A4B9B10",
                                    }}
                                />

                                {/* Main frame container */}
                                <div
                                    className="relative rounded-[2rem] overflow-hidden bg-white p-2.5"
                                    style={{
                                        border: "1px solid #e4e7f8",
                                        boxShadow:
                                            "0 30px 70px rgba(26,75,155,0.06), 0 10px 30px rgba(0,0,0,0.02)",
                                    }}
                                >
                                    {/* Inner image container */}
                                    <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-[#eef2ff] to-[#fff7f3]">
                                        <img
                                            src="/assets/s2.jpg"
                                            alt="Futures and Options Analytics"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Elegant glass overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A4B9B]/5 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
