import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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

const TERMS_PARAGRAPHS = [
    "By accessing and using the <strong>Rightzone Research</strong> website, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, please discontinue using our website and services.",
    "The research reports, market insights, technical analysis, and recommendations provided by <strong>Rightzone Research</strong> are intended for informational and educational purposes only. They are based on our independent research and analysis and should not be considered a guarantee of future performance or investment returns.",
    "Any free trial recommendations are provided solely to demonstrate the quality of our research services. Whether you choose to act on these recommendations is entirely your responsibility.",
    "Investing and trading in financial markets involve inherent risks. All investment decisions are made at your own discretion, and <strong>Rightzone Research</strong> shall not be held responsible for any profits, losses, or damages arising from the use of our research, reports, or recommendations.",
    "While we strive to provide accurate and timely information, we do not guarantee the completeness, accuracy, or reliability of the content published on our website. Market conditions, technical issues, and unforeseen events may affect the availability or accuracy of our services.",
    "All research reports, market analysis, and website content are the intellectual property of <strong>Rightzone Research</strong> and are intended solely for personal use. Copying, reproducing, distributing, or sharing any content without prior written permission is strictly prohibited.",
    "<strong>Rightzone Research</strong> does not manage Demat or trading accounts. We will never ask for your account credentials, passwords, OTPs, or other confidential information. Please do not share such details with anyone claiming to represent our organization.",
    "All payments for our services must be made only through the official payment methods published by <strong>Rightzone Research</strong>. Our employees or representatives are not authorized to accept payments in personal accounts or request personal benefits.",
    "<strong>Rightzone Research</strong> reserves the right to update or modify these Terms & Conditions at any time without prior notice. Continued use of the website after any changes signifies your acceptance of the revised terms.",
    "By using this website, you acknowledge that you have read, understood, and agreed to these Terms & Conditions and accept full responsibility for your investment and trading decisions.",
];

export default function TermsAndConditions() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Terms and Conditions</title>
                <meta name="description" content="Review the Terms and Conditions of service governing your relationship with Rightzone Research." />
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
    Terms and  <span className="text-[#F36E21]">Conditions</span>
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
                    <div className="space-y-5">
                        {TERMS_PARAGRAPHS.map((p, i) => (
                            <p
                                key={i}
                                className="text-md sm:text-[15px] leading-relaxed text-gray-600"
                                dangerouslySetInnerHTML={{ __html: p }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
