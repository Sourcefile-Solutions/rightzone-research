import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

/* ---------- Background: faint market grid + ticking price lines (matches About/Services/Pricing/Terms) ---------- */
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

const PRIVACY_PARAGRAPHS = [
    {
        text: "Welcome to <strong>Rightzone Research</strong>. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard the information you provide while using our website and services.",
    },
    {
        text: "We may collect personal information such as your name, email address, phone number, and other details that you voluntarily provide through inquiry forms, registrations, subscriptions, or other interactions with our website. This information is used to provide our services, respond to your queries, improve your experience, and communicate important updates.",
    },
    {
        text: "Your personal information may also be used to send newsletters, research updates, promotional offers, service announcements, surveys, or information about new products and services that may be relevant to you. By using our services or subscribing to our communications, you consent to receiving such updates. You may opt out of promotional communications at any time.",
    },
    {
        text: "By submitting an inquiry form or contacting us through our website, email, social media, or other communication channels, you authorize <strong>Rightzone Research</strong> to contact you via phone calls, SMS, email, or WhatsApp regarding your inquiry, our services, or related updates. This consent applies even if your phone number is registered under the National Do Not Disturb (DND) registry, as permitted by applicable regulations.",
    },
    {
        text: "We implement reasonable security measures to protect your personal information from unauthorized access, misuse, or disclosure. While we strive to maintain the highest standards of data security, no method of electronic transmission or storage is completely secure, and therefore we cannot guarantee absolute security.",
    },
    {
        text: "<strong>Rightzone Research</strong> does not sell or rent your personal information to third parties. However, we may disclose your information where required by law, regulatory authorities, legal proceedings, or government agencies, or when necessary to protect our legal rights and comply with applicable regulations.",
    },
    {
        text: "Our website may use cookies and similar technologies to improve website functionality, analyze traffic, and enhance user experience. You can manage or disable cookies through your browser settings, although certain website features may not function properly if cookies are disabled.",
    },
    {
        text: "<strong>Rightzone Research</strong> reserves the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon publication on this website. Your continued use of our website and services constitutes your acceptance of the updated Privacy Policy.",
    },
    {
        text: "If you continue to use our website and services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.",
    },
];

export default function PrivacyPolicy() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Privacy Policy</title>
                <meta name="description" content="Read the Privacy Policy of Rightzone Research to understand how we collect, use, and safeguard your personal information." />
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
    Privacy <span className="text-[#F36E21]">Policy</span>
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
                        {PRIVACY_PARAGRAPHS.map((p, i) => (
                            <p
                                key={i}
                                className="text-md sm:text-[15px] leading-relaxed text-gray-600"
                                dangerouslySetInnerHTML={{ __html: p.text }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
