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

/* ---------- Data (verbatim from the live page) ---------- */
const MONTHLY_SUMMARY = [
    {
        source: "Directly from investor",
        pendingLast: 0,
        received: 0,
        resolved: 0,
        totalPending: 0,
        pending3m: 0,
        avgDays: "N.A",
    },
    {
        source: "SEBI (Scores)",
        pendingLast: 0,
        received: 0,
        resolved: 0,
        totalPending: 0,
        pending3m: 0,
        avgDays: "N.A",
    },
    {
        source: "Other Sources (if any)",
        pendingLast: 0,
        received: 0,
        resolved: 0,
        totalPending: 0,
        pending3m: 0,
        avgDays: "N.A",
    },
];
const MONTHLY_SUMMARY_TOTAL = {
    pendingLast: 0,
    received: 0,
    resolved: 0,
    totalPending: 0,
    pending3m: 0,
    avgDays: "N.A",
};

const MONTHLY_TREND = [
    
    {
        sr: 1,
        month: "November, 2025",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 2,
        month: "December, 2025",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 3,
        month: "January, 2026",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 4,
        month: "February, 2026",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 5,
        month: "March, 2026",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 6,
        month: "April, 2026",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 7,
        month: "May, 2026",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 8,
        month: "June, 2026",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 9,
        month: "July, 2026",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 10,
        month: "August, 2026",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
];
const MONTHLY_TREND_TOTAL = { carried: 0, received: 0, resolved: 0, pending: 0 };

const ANNUAL_TREND = [
    {
        sr: 1,
        year: "2025-26",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
    {
        sr: 2,
        year: "2026-27",
        carried: 0,
        received: 0,
        resolved: 0,
        pending: 0,
    },
];
const ANNUAL_TREND_TOTAL = { carried: 0, received: 0, resolved: 0, pending: 0 };

/* ---------- Generic responsive table ---------- */
function DataTable({ columns, rows, totalRow, totalLabel = "Grand Total" }) {
    return (
        <div
            className="overflow-x-auto rounded-2xl"
            style={{
                border: "1.5px solid #ececf6",
                boxShadow: "0 4px 20px rgba(26,75,155,0.04)",
            }}
        >
            <table className="w-full min-w-[640px] text-md">
                <thead>
                    <tr style={{ background: "#1A4B9B" }}>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="text-left text-[11px] font-bold uppercase tracking-wide text-white px-4 sm:px-5 py-3.5 whitespace-nowrap"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr
                            key={i}
                            className={
                                i % 2 === 0 ? "bg-white" : "bg-[#fafbff]"
                            }
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className="px-4 sm:px-5 py-3.5 text-gray-600 whitespace-nowrap"
                                >
                                    {row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {totalRow && (
                        <tr className="bg-[#1A4B9B]/[0.06] font-extrabold text-gray-900">
                            {columns.map((col, i) => (
                                <td
                                    key={col.key}
                                    className="px-4 sm:px-5 py-3.5 whitespace-nowrap"
                                >
                                    {i === 0
                                        ? totalLabel
                                        : (totalRow[col.key] ?? "")}
                                </td>
                            ))}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default function ComplaintBoard() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Complaint Board</title>
                <meta name="description" content="View the complaints log and investor grievance status for Rightzone Research." />
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
                        Complaint <span className="text-[#F36E21]">Board</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ 2. CONTENT ============ */}
            <section className="relative bg-[#fafbff] py-14 sm:py-20 px-4 overflow-hidden">
                <MarketGridBG className="opacity-40" />
                <div className="max-w-7xl mx-auto relative z-10 space-y-14 sm:space-y-16">
                    {/* Monthly summary */}
                    <div data-aos="fade-up">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[#1A4B9B] mb-1">
                            Data for the Month Ending – August, 2026
                        </h2>
                        <div className="w-12 h-1 bg-[#F36E21] rounded-full mb-6" />
                        <DataTable
                            columns={[
                                { key: "source", label: "Received From" },
                                {
                                    key: "pendingLast",
                                    label: "Pending (Last Month End)",
                                },
                                { key: "received", label: "Received" },
                                { key: "resolved", label: "Resolved" },
                                { key: "totalPending", label: "Total Pending" },
                                {
                                    key: "pending3m",
                                    label: "Pending > 3 Months",
                                },
                                {
                                    key: "avgDays",
                                    label: "Avg. Resolution Time (Days)",
                                },
                            ]}
                            rows={MONTHLY_SUMMARY}
                            totalRow={MONTHLY_SUMMARY_TOTAL}
                        />
                    </div>

                    {/* Monthly trend */}
                    <div data-aos="fade-up">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[#1A4B9B] mb-1">
                            Trend of Monthly Disposal of Complaints
                        </h2>
                        <div className="w-12 h-1 bg-[#F36E21] rounded-full mb-6" />
                        <DataTable
                            columns={[
                                { key: "sr", label: "Sr. No." },
                                { key: "month", label: "Month" },
                                { key: "carried", label: "Carried Forward" },
                                { key: "received", label: "Received" },
                                { key: "resolved", label: "Resolved" },
                                { key: "pending", label: "Pending" },
                            ]}
                            rows={MONTHLY_TREND}
                            totalRow={{
                                sr: "",
                                month: "",
                                ...MONTHLY_TREND_TOTAL,
                                carried: 0,
                            }}
                        />
                    </div>

                    {/* Annual trend */}
                    <div data-aos="fade-up">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[#1A4B9B] mb-1">
                            Trend of Annual Disposal of Complaints
                        </h2>
                        <div className="w-12 h-1 bg-[#F36E21] rounded-full mb-6" />
                        <DataTable
                            columns={[
                                { key: "sr", label: "Sr. No." },
                                { key: "year", label: "Year" },
                                { key: "carried", label: "Carried Forward" },
                                { key: "received", label: "Received" },
                                { key: "resolved", label: "Resolved" },
                                { key: "pending", label: "Pending" },
                            ]}
                            rows={ANNUAL_TREND}
                            totalRow={{
                                sr: "",
                                year: "",
                                ...ANNUAL_TREND_TOTAL,
                            }}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
