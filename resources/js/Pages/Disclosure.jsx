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

const INTRO_PARAGRAPHS = [
    "This Disclosure Document has been prepared in accordance with the Securities and Exchange Board of India (Research Analysts) Regulations, 2014. Its purpose is to provide prospective and existing clients with relevant information about the research and recommendation services offered by <strong>Rightzone Research</strong>, enabling them to make informed decisions before availing our services.",
];

const SECTIONS = [
    {
        title: "About Rightzone Research",
        paragraphs: [
            "<strong>Rightzone Research</strong> is a SEBI-registered Research Analyst with Registration No. INH000029661. We are engaged in providing independent, objective, and research-based investment recommendations across various market segments. Our research is conducted using systematic analysis, publicly available information, and established research methodologies with the objective of assisting clients in making informed investment decisions.",
        ],
    },
    {
        title: "Terms & Conditions",
        paragraphs: [
            "The terms governing our research and recommendation services, including the scope of services, client responsibilities, payment terms, and other applicable conditions, are available in our Terms & Conditions. Clients are advised to read these documents carefully before subscribing to any service.",
        ],
    },
    {
        title: "Regulatory & Disciplinary Status",
        paragraphs: [
            "As on the date of this document, there are no material disciplinary actions, regulatory proceedings, investigations, or legal matters pending against <strong>Rightzone Research</strong>, its Research Analyst, or its associates that are required to be disclosed under applicable SEBI regulations.",
        ],
    },
    {
        title: "Associates",
        paragraphs: [
            "As on the date of this disclosure, <strong>Rightzone Research</strong> has no associates as defined under the applicable SEBI regulations.",
        ],
    },
    {
        title: "Disclosures",
        paragraphs: [
            "<strong>Rightzone Research</strong> maintains the highest standards of integrity, transparency, and professional ethics while providing research services.",
            "The Research Analyst, its associates, or relatives may, from time to time, hold financial interests or beneficial ownership in securities that are the subject of research reports. Wherever required under applicable regulations, such interests will be appropriately disclosed in the relevant research report or recommendation.",
            "<strong>Rightzone Research</strong> follows internal policies to identify, monitor, and manage any actual or potential conflicts of interest. Any material conflict, if it arises, will be disclosed to clients in accordance with applicable regulatory requirements.",
            "The opinions and recommendations published by <strong>Rightzone Research</strong> are prepared independently and are not influenced by any issuer, intermediary, or third party.",
            "Neither <strong>Rightzone Research</strong> nor its Research Analyst or associates receive compensation from any listed company in exchange for issuing favorable research reports or recommendations, unless specifically disclosed in accordance with applicable regulations.",
            "<strong>Rightzone Research</strong> has not managed or co-managed any public issue, provided investment banking or merchant banking services, or received brokerage-related compensation from the subject company in relation to any research recommendation, unless otherwise disclosed.",
            "The Research Analyst and its associates do not serve as directors, officers, or employees of the companies covered in research reports, except where specifically disclosed.",
            "<strong>Rightzone Research</strong> does not engage in market-making activities for any securities that are the subject of its research reports.",
        ],
    },
    {
        title: "General Disclosure",
        paragraphs: [
            "All research reports, recommendations, and market insights published by <strong>Rightzone Research</strong> are intended solely for informational purposes and should not be construed as personalized investment advice or a guarantee of future returns. Investments in securities markets are subject to market risks, and clients are advised to evaluate their financial objectives and risk tolerance before making any investment decisions.",
            "This Disclosure Document may be revised from time to time in accordance with changes in applicable laws, SEBI regulations, or business practices. The latest version will be available on the <strong>Rightzone Research</strong> website.",
        ],
    },
];

function Section({ section, index }) {
    return (
        <div
            className={
                index !== SECTIONS.length - 1
                    ? "pb-7 mb-7 border-b border-gray-100"
                    : ""
            }
            data-aos="fade-up"
            data-aos-delay={(index % 4) * 60}
        >
            <h3 className="text-md sm:text-base font-bold text-[#1A4B9B] mb-4 flex items-start gap-2">
                <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                    style={{ background: "#F36E21" }}
                />
                {section.title}
            </h3>
            <div className="space-y-3 pl-3.5">
                {section.paragraphs.map((p, i) => (
                    <p
                        key={i}
                        className="text-md sm:text-[15px] leading-relaxed text-gray-600"
                        dangerouslySetInnerHTML={{ __html: p }}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Disclosure() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Disclosure</title>
                <meta
                    name="description"
                    content="View the mandatory regulatory disclosures and SEBI compliance certificates of Rightzone Research."
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
                        Disclosure
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ 2. CONTENT ============ */}
            <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
                <div
                    className="rounded-2xl bg-white p-7 sm:p-10 mb-8"
                    style={{
                        border: "1.5px solid #ececf6",
                        boxShadow: "0 4px 24px rgba(26,75,155,0.04)",
                    }}
                    data-aos="fade-up"
                >
                    <div className="space-y-4">
                        {INTRO_PARAGRAPHS.map((p, i) => (
                            <p
                                key={i}
                                className="text-md sm:text-[15px] leading-relaxed text-gray-600"
                                dangerouslySetInnerHTML={{ __html: p }}
                            />
                        ))}
                    </div>
                </div>

                <div
                    className="rounded-2xl bg-white p-7 sm:p-10"
                    style={{
                        border: "1.5px solid #ececf6",
                        boxShadow: "0 4px 24px rgba(26,75,155,0.04)",
                    }}
                >
                    {SECTIONS.map((section, idx) => (
                        <Section
                            key={section.title}
                            section={section}
                            index={idx}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
