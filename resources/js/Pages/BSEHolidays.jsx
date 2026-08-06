import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

/* ---------- Background: faint market grid + ticking price lines ---------- */
const MarketGridBG = ({ className = "" }) => (
    <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern
                id="grid3"
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
            <linearGradient id="fade3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid3)" />
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
        <rect width="1200" height="800" fill="url(#fade3)" />
    </svg>
);

/* ---------- FAQ data ---------- */
const FAQS = [
    {
        q: "Does BSE operate on Saturdays and Sundays?",
        a: "No, BSE is not operational on the weekends i.e. Saturdays and Sundays.",
    },
    {
        q: "What are the regular BSE trading hours?",
        a: "BSE trades occur from 9.15 a.m. to 3.30 p.m. on weekdays, while Saturday-Sunday is observed as BSE holidays.",
    },
    {
        q: "Which month in the year 2026 has the maximum BSE trading holidays?",
        a: "In the year 2026, March and November months have maximum trading holidays of 3 days.",
    },
    {
        q: "Can BSE change its declared holidays?",
        a: "Yes, the exchange has the complete right to alter the already announced holidays via a circular.",
    },
    {
        q: "Are the timings different for different trading instruments in BSE trading?",
        a: "Yes, the market hours of different trading instruments are different in BSE.",
    },
    {
        q: "How many trading days are there in India in 2026?",
        a: "In 2026, there will be 15 non-trading holidays on the BSE and NSE. These holidays are spread across January, April, May, June, September, October, November, and December, with March having multiple, reducing the total number of trading days for the year.",
    },
];

function FaqItem({ faq, isOpen, onToggle }) {
    return (
        <div
            className="rounded-2xl bg-white overflow-hidden"
            style={{
                border: "1.5px solid #ececf6",
                boxShadow: "0 4px 20px rgba(26,75,155,0.04)",
            }}
            data-aos="fade-up"
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-4 text-left px-5 sm:px-7 py-4 sm:py-5"
            >
                <span className="flex-grow text-md sm:text-base font-bold text-gray-900 leading-snug">
                    {faq.q}
                </span>
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F36E21"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 transition-transform duration-300"
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            <div
                className="px-5 sm:px-7 text-md leading-relaxed text-gray-600 overflow-hidden transition-all duration-300"
                style={{
                    maxHeight: isOpen ? "600px" : "0px",
                    paddingBottom: isOpen ? "1.25rem" : "0px",
                }}
            >
                {faq.a}
            </div>
        </div>
    );
}

export default function BSEHolidays() {
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | BSE Holidays </title>
                <meta name="description" content="View the official trading holidays list for the Bombay Stock Exchange (BSE) for the year 2026." />
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
                        BSE Holidays <span className="text-[#F36E21]">2026</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ 2. CONTENT ============ */}
            <section className="relative bg-[#fafbff] py-14 sm:py-20 px-4 overflow-hidden">
                <MarketGridBG className="opacity-40" />
                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Intro */}
                    <div className="mb-10 text-left" data-aos="fade-up">
                        <p className="text-md sm:text-base text-gray-600 leading-relaxed mb-2">
                            Bombay Stock Exchange is one of the premier stock
                            exchanges operating in India, listing more than 6000
                            companies. The BSE is the world's 6th largest stock
                            exchange, with a market capitalisation exceeding
                            US$5 trillion on May 21, 2024.
                        </p>
                        <p className="text-md sm:text-base text-gray-600 leading-relaxed mb-2">
                            BSE plays an important role in regulating and
                            managing the financial markets of India, channelling
                            idle resources into the economic growth of the
                            country. It includes a wide array of market data
                            products, corporate data products, EOD products, and
                            other data products as well. With its advanced
                            infrastructure and regulatory oversight, BSE plays a
                            crucial role in driving India’s economic growth and
                            financial stability.{" "}
                        </p>
                        <p className="text-md sm:text-base text-gray-600 leading-relaxed">
                            Continue reading this page to gain a comprehensive
                            understanding of the BSE holidays 2026 list and its
                            timings.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* ── Table 1: Equity Segment ── */}
                        <div data-aos="fade-up">
                            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 border-b-2 border-[#1A4B9B] pb-2">
                                BSE Holidays 2026: Equity Segment, Equity
                                Derivative Segment and SLB Segment
                            </h3>
                            <p className="text-md text-gray-500 mb-4">
                                Following is a list of BSE holidays 2026 in
                                India for the Equity Segment, Equity Derivative
                                Segment and SLB Segment:
                            </p>
                            <div
                                className="overflow-x-auto rounded-xl"
                                style={{
                                    border: "1.5px solid #ececf6",
                                    boxShadow:
                                        "0 4px 20px rgba(26,75,155,0.04)",
                                }}
                            >
                                <table className="w-full text-md text-left">
                                    <thead>
                                        <tr style={{ background: "#1A4B9B" }}>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Day
                                            </th>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Holidays
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                             [
                                                "January 15, 2026",
                                                "Thursday",
                                                "MCGM Election day",
                                            ],
                                            [
                                                "January 26, 2026",
                                                "Monday",
                                                "Republic Day",
                                            ],
                                            [
                                                "March 03, 2026",
                                                "Tuesday",
                                                "Holi",
                                            ],
                                            [
                                                "March 26, 2026",
                                                "Thursday",
                                                "Shri Ram Navami",
                                            ],
                                            [
                                                "March 31, 2026",
                                                "Tuesday",
                                                "Shri Mahavir Jayanti",
                                            ],
                                            [
                                                "April 03, 2026",
                                                "Friday",
                                                "Good Friday",
                                            ],
                                            [
                                                "April 14, 2026",
                                                "Tuesday",
                                                "Dr. Baba Saheb Ambedkar Jayanti",
                                            ],
                                            [
                                                "May 01, 2026",
                                                "Friday",
                                                "Maharashtra Day",
                                            ],
                                            [
                                                "May 28, 2026",
                                                "Thursday",
                                                "Bakri Id",
                                            ],
                                            [
                                                "June 26, 2026",
                                                "Friday",
                                                "Muharram",
                                            ],
                                            [
                                                "September 14, 2026",
                                                "Monday",
                                                "Ganesh Chaturthi",
                                            ],
                                            [
                                                "October 02, 2026",
                                                "Friday",
                                                "Mahatma Gandhi Jayanti",
                                            ],
                                            [
                                                "October 20, 2026",
                                                "Tuesday",
                                                "Dussehra",
                                            ],
                                            [
                                                "November 10, 2026",
                                                "Tuesday",
                                                "Diwali-Balipratipada",
                                            ],
                                            [
                                                "November 24, 2026",
                                                "Tuesday",
                                                "Prakash Gurpurb Sri Guru Nanak Dev",
                                            ],
                                            [
                                                "December 25, 2026",
                                                "Friday",
                                                "Christmas",
                                            ],
                                        ].map(([date, day, desc], i) => (
                                            <tr
                                                key={i}
                                                className={
                                                    i % 2 === 0
                                                        ? "bg-white"
                                                        : "bg-[#f7f8ff]"
                                                }
                                            >
                                                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">
                                                    {date}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {day}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    {desc}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-md text-gray-500 mt-2">
                                * Muhurat Trading is scheduled to take place on
                                Sunday, November 8, 2026. The specific timings
                                for the session will be announced at a later
                                date.
                            </p>
                        </div>

                        {/* ── Table 3: Commodity Derivatives ── */}
                        <div data-aos="fade-up">
                            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 border-b-2 border-[#1A4B9B] pb-2">
                                BSE Holidays 2026: Commodity Derivatives Segment
                                &amp; EGR Segment
                            </h3>
                            <p className="text-md text-gray-500 mb-4">
                                Here is a list of all BSE holidays 2026 for the
                                Commodity Derivatives Segment and Electronic
                                Gold Receipts (EGR) Segment:
                            </p>
                            <div
                                className="overflow-x-auto rounded-xl"
                                style={{
                                    border: "1.5px solid #ececf6",
                                    boxShadow:
                                        "0 4px 20px rgba(26,75,155,0.04)",
                                }}
                            >
                                <table className="w-full text-md text-left">
                                    <thead>
                                        <tr style={{ background: "#1A4B9B" }}>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Day
                                            </th>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Festival Name
                                            </th>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Morning Session
                                            </th>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Evening Session
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            [
                                                "January 01, 2026",
                                                "Thursday",
                                                "New Year Day",
                                                "Open",
                                                "Closed",
                                            ],
                                            [
                                                "January 15, 2026",
                                                "Thursday",
                                                "Municipal Corporation Election - Maharashtra",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "March 03, 2026",
                                                "Tuesday",
                                                "Holi",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "March 26, 2026",
                                                "Thursday",
                                                "Shri Ram Navami",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "March 31, 2026",
                                                "Tuesday",
                                                "Shri Mahavir Jayanti",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "April 03, 2026",
                                                "Friday",
                                                "Good Friday",
                                                "Closed",
                                                "Closed",
                                            ],
                                            [
                                                "April 14, 2026",
                                                "Tuesday",
                                                "Dr. Baba Saheb Ambedkar Jayanti",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "May 01, 2026",
                                                "Friday",
                                                "Maharashtra Day",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "May 28, 2026",
                                                "Thursday",
                                                "Bakri Id",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "June 26, 2026",
                                                "Friday",
                                                "Muharram",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "September 14, 2026",
                                                "Monday",
                                                "Ganesh Chaturthi",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "October 02, 2026",
                                                "Friday",
                                                "Mahatma Gandhi Jayanti",
                                                "Closed",
                                                "Closed",
                                            ],
                                            [
                                                "October 20, 2026",
                                                "Tuesday",
                                                "Dussehra",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "November 08, 2026",
                                                "Sunday",
                                                "Diwali Laxmi Pujan*",
                                                "Closed",
                                                "Closed",
                                            ],
                                            [
                                                "November 10, 2026",
                                                "Tuesday",
                                                "Diwali-Balipratipada",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "November 24, 2026",
                                                "Tuesday",
                                                "Prakash Gurpurb Sri Guru Nanak Dev",
                                                "Closed",
                                                "Open",
                                            ],
                                            [
                                                "December 25, 2026",
                                                "Friday",
                                                "Christmas",
                                                "Closed",
                                                "Closed",
                                            ],
                                        ].map(
                                            (
                                                [
                                                    date,
                                                    day,
                                                    desc,
                                                    morning,
                                                    evening,
                                                ],
                                                i,
                                            ) => (
                                                <tr
                                                    key={i}
                                                    className={
                                                        i % 2 === 0
                                                            ? "bg-white"
                                                            : "bg-[#f7f8ff]"
                                                    }
                                                >
                                                    <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">
                                                        {date}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-600">
                                                        {day}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {desc}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`inline-block px-2 py-0.5 rounded-full text-sm font-semibold ${morning === "Closed" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}
                                                        >
                                                            {morning}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`inline-block px-2 py-0.5 rounded-full text-sm font-semibold ${evening === "Closed" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}
                                                        >
                                                            {evening}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ── Table 2: Currency Derivatives ── */}
                        <div data-aos="fade-up">
                            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 border-b-2 border-[#F36E21] pb-2">
                                BSE Holiday List 2026: Currency Derivatives
                                Segments
                            </h3>
                            <p className="text-md text-gray-500 mb-4">
                                Check out the list of all the BSE holidays 2026
                                list in the Currency Derivatives Segments:
                            </p>
                            <div
                                className="overflow-x-auto rounded-xl"
                                style={{
                                    border: "1.5px solid #ececf6",
                                    boxShadow:
                                        "0 4px 20px rgba(26,75,155,0.04)",
                                }}
                            >
                                <table className="w-full text-md text-left">
                                    <thead>
                                        <tr style={{ background: "#F36E21" }}>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Day
                                            </th>
                                            <th className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider">
                                                Holidays
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            [
                                                "January 15, 2026",
                                                "Thursday",
                                                "Municipal Corporation Election - Maharashtra",
                                            ],
                                            [
                                                "February 19, 2026",
                                                "Thursday",
                                                "Chatrapati Shivaji Maharaj Jayanti",
                                            ],
                                            [
                                                "March 03, 2026",
                                                "Tuesday",
                                                "Holi",
                                            ],
                                            [
                                                "March 26, 2026",
                                                "Thursday",
                                                "Shri Ram Navami",
                                            ],
                                            [
                                                "March 31, 2026",
                                                "Tuesday",
                                                "Shri Mahavir Jayanti",
                                            ],
                                            [
                                                "April 01, 2026",
                                                "Wednesday",
                                                "Annual Bank Closing",
                                            ],
                                            [
                                                "April 03, 2026",
                                                "Friday",
                                                "Good Friday",
                                            ],
                                            [
                                                "April 14, 2026",
                                                "Tuesday",
                                                "Dr. Baba Saheb Ambedkar Jayanti",
                                            ],
                                            [
                                                "May 01, 2026",
                                                "Friday",
                                                "Maharashtra Day / Buddha Purnima",
                                            ],
                                            [
                                                "May 28, 2026",
                                                "Thursday",
                                                "Bakri Id",
                                            ],
                                            [
                                                "June 26, 2026",
                                                "Friday",
                                                "Muharram",
                                            ],
                                            [
                                                "August 26, 2026",
                                                "Wednesday",
                                                "Id-E-Milad",
                                            ],
                                            [
                                                "September 14, 2026",
                                                "Monday",
                                                "Ganesh Chaturthi",
                                            ],
                                            [
                                                "October 02, 2026",
                                                "Friday",
                                                "Mahatma Gandhi Jayanti",
                                            ],
                                            [
                                                "October 20, 2026",
                                                "Tuesday",
                                                "Dussehra",
                                            ],
                                            [
                                                "November 10, 2026",
                                                "Tuesday",
                                                "Diwali-Balipratipada",
                                            ],
                                            [
                                                "November 24, 2026",
                                                "Tuesday",
                                                "Prakash Gurpurb Sri Guru Nanak Dev",
                                            ],
                                            [
                                                "December 25, 2026",
                                                "Friday",
                                                "Christmas",
                                            ],
                                        ].map(([date, day, desc], i) => (
                                            <tr
                                                key={i}
                                                className={
                                                    i % 2 === 0
                                                        ? "bg-white"
                                                        : "bg-[#fff8f5]"
                                                }
                                            >
                                                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">
                                                    {date}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {day}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    {desc}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ── BSE Timings ── */}
                        <div data-aos="fade-up">
                            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 border-b-2 border-[#1A4B9B] pb-2">
                                BSE Market Timings 2026
                            </h3>
                            <p className="text-md text-gray-600 leading-relaxed mb-6">
                                BSE trades occur from 9.15 a.m. to 3.30 p.m. on
                                weekdays, while Saturday-Sunday is observed as
                                BSE holidays. Pre-market open trading happens
                                between 9.00 to 9.15 a.m. Apart from the
                                weekends, several national holidays having
                                cultural and religious significance are also
                                considered as BSE trading holidays. Trading and
                                clearing holidays have also been segregated by
                                the BSE. Trading holidays constitute no
                                transactions in the Bombay Stock Exchange.
                            </p>
                            <p className="text-md text-gray-600 leading-relaxed mb-6">
                                On days of clearing BSE holidays, on the other
                                hand, the purchase and sale of securities take
                                place, but financial transfers of resources from
                                investors to companies are postponed as banks
                                remain non-functional on these days.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        label: "Pre-Open Session",
                                        color: "#1A4B9B",
                                        items: [
                                            "Modification/order entry begins at 9:00 a.m. and ends at 9:15 a.m. on all business days.",
                                        ],
                                    },
                                    {
                                        label: "Regular Trading Session",
                                        color: "#F36E21",
                                        items: [
                                            "Restricted physical market or normal market begins at 9:15 a.m. and ends at 3:30 p.m. on all business days.",
                                        ],
                                    },
                                    {
                                        label: "Timings of Block Deal Session:",
                                        color: "#1A4B9B",
                                        items: [
                                            "The morning block deal window begins at 8:45 a.m. and ends at 9:00 a.m. The afternoon block deal window begins at 2:05 p.m. and ends at 2:20 p.m. The trading session is closed between 3:40 p.m. and 4:00 p.m.",
                                        ],
                                    },
                                ].map((card) => (
                                    <div
                                        key={card.label}
                                        className="rounded-2xl bg-white p-5"
                                        style={{
                                            border: "1.5px solid #ececf6",
                                            boxShadow:
                                                "0 4px 20px rgba(26,75,155,0.04)",
                                        }}
                                    >
                                        <div
                                            className="text-sm font-extrabold uppercase tracking-wider mb-3 pb-2"
                                            style={{
                                                color: card.color,
                                                borderBottom: `2px solid ${card.color}`,
                                            }}
                                        >
                                            {card.label}
                                        </div>
                                        <ul className="space-y-1.5">
                                            {card.items.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className="text-md text-gray-600 leading-relaxed flex gap-2"
                                                >
                                                    <span
                                                        style={{
                                                            color: card.color,
                                                        }}
                                                        className="mt-0.5 shrink-0"
                                                    >
                                                        •
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-md text-gray-600 leading-relaxed mb-6">
                            Also, if it is necessary, the trading hours can be
                            expanded, decreased, or advanced as well.
                        </p>

                        {/* ── Muhurat Trading ── */}
                        <div
                            data-aos="fade-up"
                            className="rounded-2xl p-6 sm:p-8"
                            style={{
                                background:
                                    "linear-gradient(135deg, #eaf1ff 0%, #fff3e9 100%)",
                                border: "1.5px solid #ececf6",
                            }}
                        >
                            <h3 className="text-base sm:text-lg font-extrabold text-[#1A4B9B] mb-3">
                                Muhurat Trading on BSE
                            </h3>
                            <p className="text-md text-gray-700 leading-relaxed">
                                Muhurat Trading is scheduled to take place on
                                November 08, 2026 (Sunday). The specific timings
                                for the session will be announced at a later
                                date.
                            </p>
                        </div>

                        {/* ── FAQ ── */}
                        <div data-aos="fade-up">
                            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-6 border-b-2 border-[#1A4B9B] pb-2">
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-3">
                                {FAQS.map((faq, idx) => (
                                    <FaqItem
                                        key={idx}
                                        faq={faq}
                                        isOpen={openFaq === idx}
                                        onToggle={() =>
                                            setOpenFaq(
                                                openFaq === idx ? null : idx,
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
