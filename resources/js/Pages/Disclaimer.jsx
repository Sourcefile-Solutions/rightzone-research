import React, { useEffect } from "react";
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

export default function Disclaimer() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Disclaimer</title>
                <meta
                    name="description"
                    content="Read the legal disclaimer and research analyst advisory policies of Rightzone Research."
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
                        Disclaimer
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ 2. CONTENT ============ */}
            <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
                <div
                    className="rounded-2xl bg-white p-7 sm:p-10"
                    style={{
                        border: "1.5px solid #ececf6",
                        boxShadow: "0 4px 24px rgba(26,75,155,0.04)",
                    }}
                    data-aos="fade-up"
                >
                    {/* Standard Warning */}
                    <div className="mb-7 pb-7 border-b border-gray-100">
                        <h2 className="text-md font-bold text-[#F36E21] uppercase tracking-wide mb-3">
                            Standard Warning
                        </h2>
                        <p className="text-md sm:text-[15px] leading-relaxed text-gray-700 font-medium">
                            Investment in the securities market is subject to
                            market risks. Please read all related documents
                            carefully before investing.
                        </p>
                    </div>

                    {/* Disclaimer */}
                    <h2 className="text-md font-bold text-[#1A4B9B] uppercase tracking-wide mb-4">
                        Disclaimer
                    </h2>
                    <div className="space-y-4">
                        <p className="text-md sm:text-[15px] leading-relaxed text-gray-600">
                            Registration granted by SEBI, registration as a
                            Research Analyst, membership with any exchange, or
                            certification from NISM does not guarantee the
                            performance of the Research Analyst or assure any
                            returns to investors.
                        </p>
                        <p className="text-md sm:text-[15px] leading-relaxed text-gray-600">
                            Any securities, stocks, indices, or financial
                            instruments mentioned on this website are provided
                            solely for illustrative and educational purposes and
                            should not be construed as investment
                            recommendations or solicitation to buy or sell any
                            securities.
                        </p>
                        <p className="text-md sm:text-[15px] leading-relaxed text-gray-600">
                            By accessing and using{" "}
                            <strong>www.rightzoneresearch.com</strong>, you
                            acknowledge that you have read, understood, and
                            agreed to this disclaimer. Investing and trading in
                            financial markets involve substantial risk,
                            including the potential loss of capital. You are
                            solely responsible for your investment and trading
                            decisions, and <strong>Rightzone Research</strong>{" "}
                            shall not be liable for any financial losses or
                            damages arising from the use of the information
                            provided on this website.
                        </p>
                        <p className="text-md sm:text-[15px] leading-relaxed text-gray-600">
                            The research reports, market analysis, opinions, and
                            other content published on this website are intended
                            for informational and educational purposes only.
                            They do not constitute personalized investment
                            advice, financial planning, or any guarantee of
                            future performance.
                        </p>
                        <p className="text-md sm:text-[15px] leading-relaxed text-gray-600">
                            All content available on this website, including
                            research reports, recommendations, analysis, and
                            educational material, is the intellectual property
                            of <strong>Rightzone Research</strong> and is
                            intended solely for personal use. Unauthorized
                            reproduction, distribution, modification, or copying
                            of any content without prior written permission is
                            strictly prohibited.
                        </p>
                        <p className="text-md sm:text-[15px] leading-relaxed text-gray-600">
                            By continuing to use this website, you acknowledge
                            and agree to our Terms & Conditions, Privacy Policy,
                            and Disclaimer.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
