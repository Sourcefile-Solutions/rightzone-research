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
                id="grid4"
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
            <linearGradient id="fade4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid4)" />
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
        <rect width="1200" height="800" fill="url(#fade4)" />
    </svg>
);

const MATRIX = [
    {
        designation: "Customer Care",
        name: "Vikas Tiwari",
        address: "Bangalore, Karnataka",
        phone: "+91 9342819342",
        email: "support@rightzoneresearch.com",
        hours: "Mon-Sat, 9am to 5pm",
    },
    {
        designation: "Head of Customer Care",
        name: "—",
        address: "—",
        phone: "—",
        email: "—",
        hours: "—",
    },
    {
        designation: "Compliance Officer",
        name: "Vikas Tiwari",
        address: "Bangalore, Karnataka",
        phone: "+91 9342819342",
        email: "support@rightzoneresearch.com",
        hours: "Mon-Sat, 9am to 5pm",
    },
    {
        designation: "CEO",
        name: "—",
        address: "—",
        phone: "—",
        email: "—",
        hours: "—",
    },
    {
        designation: "Principal Officer",
        name: "Vikas Tiwari",
        address: "Bangalore, Karnataka",
        phone: "+91 9342819342",
        email: "support@rightzoneresearch.com",
        hours: "Mon-Sat, 9am to 5pm",
    },
];

export default function GrievanceRedressal() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Grievance Redressal</title>
                <meta name="description" content="Read about our structured grievance redressal mechanism and compliance officer contact details." />
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
                        Grievance Redressal /{" "}
                        <span className="text-[#F36E21]">
                            Escalation Matrix
                        </span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ 2. CONTENT ============ */}
            <section className="relative bg-[#fafbff] py-14 sm:py-20 px-4 overflow-hidden">
                <MarketGridBG className="opacity-40" />
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section heading */}
                    <div className="text-center mb-10" data-aos="fade-up">
                        <p className="mt-3 text-md sm:text-base text-gray-600 max-w-xl mx-auto">
                            If you have a grievance, you can reach out to our
                            Support Team for assistance.
                        </p>
                    </div>

                    {/* ── Contact Matrix Table ── */}
                    <div data-aos="fade-up" className="mb-10">
                        <div
                            className="overflow-x-auto rounded-2xl"
                            style={{
                                border: "1.5px solid #ececf6",
                                boxShadow: "0 4px 20px rgba(26,75,155,0.04)",
                            }}
                        >
                            <table className="w-full text-md text-left">
                                <thead>
                                    <tr style={{ background: "#1A4B9B" }}>
                                        <th className="px-4 py-3 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                                            Designation
                                        </th>
                                        <th className="px-4 py-3 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                                            Contact Person
                                        </th>
                                        <th className="px-4 py-3 text-white font-bold text-xs uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th className="px-4 py-3 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                                            Contact No.
                                        </th>
                                        <th className="px-4 py-3 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                                            Email ID
                                        </th>
                                        <th className="px-4 py-3 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                                            Working Hours
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MATRIX.map((row, i) => (
                                        <tr
                                            key={i}
                                            className={
                                                i % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-[#f7f8ff]"
                                            }
                                        >
                                            <td className="px-4 py-4 font-semibold text-[#1A4B9B] whitespace-nowrap">
                                                {row.designation}
                                            </td>
                                            <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                                                {row.name}
                                            </td>
                                            <td className="px-4 py-4 text-gray-600 text-xs leading-relaxed max-w-xs">
                                                {row.address}
                                            </td>
                                            <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                                                {row.phone !== "—" ? (
                                                    <a
                                                        href={`tel:${row.phone.replace(/\s/g, "")}`}
                                                        className="text-[#1A4B9B] hover:underline font-medium"
                                                    >
                                                        {row.phone}
                                                    </a>
                                                ) : (
                                                    row.phone
                                                )}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {row.email !== "—" ? (
                                                    <a
                                                        href={`mailto:${row.email}`}
                                                        className="text-[#1A4B9B] hover:underline"
                                                    >
                                                        {row.email}
                                                    </a>
                                                ) : (
                                                    row.email
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                                {row.hours}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ── Escalation Steps ── */}
                    <div className="space-y-5 mb-10" data-aos="fade-up">
                        {/* Step 1 */}
                        <div
                            className="rounded-2xl bg-white p-5 sm:p-6 flex gap-4 sm:gap-6 items-start"
                            style={{
                                border: "1.5px solid #ececf6",
                                boxShadow: "0 4px 20px rgba(26,75,155,0.04)",
                            }}
                        >
                            <span
                                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-md font-extrabold text-white"
                                style={{ background: "#1A4B9B" }}
                            >
                                1
                            </span>
                            <div>
                                <p className="text-md text-gray-600 leading-relaxed">
                                    The above mentioned details would facilitate
                                    the complainants to approach the concerned
                                    IA/RA before filing a complaint to SEBI. For
                                    more details, go to{" "}
                                    <a
                                        href="https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx?page=20241209-41"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#1A4B9B] hover:underline font-medium"
                                    >
                                        <p>BSE Notice</p>
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div
                            className="rounded-2xl bg-white p-5 sm:p-6 flex gap-4 sm:gap-6 items-start"
                            style={{
                                border: "1.5px solid #ececf6",
                                boxShadow: "0 4px 20px rgba(26,75,155,0.04)",
                            }}
                        >
                            <span
                                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-md font-extrabold text-white"
                                style={{ background: "#F36E21" }}
                            >
                                2
                            </span>
                            <div>
                                <p className="text-md text-gray-600 leading-relaxed mb-2">
                                    We aim to resolve all grievances within 21
                                    working days from the date of receipt. If
                                    your grievance is not resolved within this
                                    timeframe, you can escalate it to SEBI’s
                                    SCORES Platform (SEBI Complaints Redress
                                    System).
                                </p>
                                <a
                                    href="https://scores.sebi.gov.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-md font-bold text-[#1A4B9B] hover:underline"
                                >
                                    scores.sebi.gov.in
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div
                            className="rounded-2xl bg-white p-5 sm:p-6 flex gap-4 sm:gap-6 items-start"
                            style={{
                                border: "1.5px solid #ececf6",
                                boxShadow: "0 4px 20px rgba(26,75,155,0.04)",
                            }}
                        >
                            <span
                                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-md font-extrabold text-white"
                                style={{ background: "#1A4B9B" }}
                            >
                                3
                            </span>
                            <div>
                                <p className="text-md text-gray-600 leading-relaxed mb-2">
                                    In case you are unsatisfied with the
                                    resolution provided through our support or
                                    the SCORES platform, you can access the
                                    Online Dispute Resolution (ODR) Portal.
                                </p>
                                <a
                                    href="https://smartodr.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-md font-bold text-[#1A4B9B] hover:underline"
                                >
                                    smartodr.in
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
