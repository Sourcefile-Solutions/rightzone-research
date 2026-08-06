import React, { useEffect, useState } from "react";
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
                id="grid2"
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
            <linearGradient id="fade2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid2)" />
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
        <rect width="1200" height="800" fill="url(#fade2)" />
    </svg>
);

/* ---------- FAQ Accordion ---------- */
const FAQS = [
    {
        q: "What is Muhurat Trading?",
        a: "Muhurat Trading is a special one-hour trading session held on Diwali, symbolising prosperity and good fortune for the financial year. In 2026, it will take place on Sunday, November 8, during the evening. The exact timings will be announced closer to the date.",
    },
    {
        q: "Will the NSE share market open on 1st January 2026?",
        a: "The NSE stock market will open on 1st January 2026 for Equity Segment, Equity Derivative Segment and SLB Segment. However, the market will be closed for the Commodity Derivatives Segment.",
    },
    {
        q: "What is the total number of NSE holidays 2026 list India?",
        a: "For the year 2026, there are a total of 15 weekday holidays and 4 weekend holidays for Equity Segment, Equity Derivative Segment and SLB Segment. Additionally, for the Commodity Derivatives Segment, there are 16 weekday holidays.",
    },
    {
        q: "What if a holiday falls on the weekly expiry of equity options contracts?",
        a: "If a holiday overlaps with the weekly contract expiry day, then as per the regulations, the NSE shifts the expiry to a day preceding the holiday.",
    },
    {
        q: "What will be the last stock market holiday in 2026?",
        a: "For the year 2026, Christmas, which will fall on 25 December, will be the last stock market holiday in 2026 in India.",
    },
    {
        q: "What does a settlement holiday trade mean?",
        a: "A Settlement holiday is the day when the markets remain open, but the depositories remain closed.",
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

export default function NSEHolidays() {
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | NSE Holidays </title>
                <meta name="description" content="View the official trading holidays list for the National Stock Exchange (NSE) for the year 2026." />
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
                        NSE Holidays <span className="text-[#F36E21]">2026</span>
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
                            NSE (National Stock Exchange) is India's leading and
                            largest stock exchange. In 2024, it became the 7th
                            largest stock exchange in the world with a market
                            capitalisation of more than $5 trillion.
                        </p>
                        <p className="text-md sm:text-base text-gray-600 leading-relaxed mb-2">
                            In 2026, as investors, traders and businesses plan
                            their financial strategies, understanding the NSE
                            holiday calendar becomes crucial. This calendar not
                            only determines trading days but also aids in
                            planning investment decisions that align market
                            activities and ensure compliance with operational
                            schedules.
                        </p>
                        <p className="text-md sm:text-base text-gray-600 leading-relaxed">
                            Let us take a closer look at the NSE holidays 2026
                            and their significance for market participants.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* ── Table 1: Equity Segment ── */}
                        <div data-aos="fade-up">
                            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 border-b-2 border-[#1A4B9B] pb-2">
                                NSE Holidays 2026: Equity Segment, Equity
                                Derivative Segment and SLB Segment
                            </h3>
                            <p className="text-md text-gray-500 mb-4">
                                Following is a detailed list of all the NSE
                                holidays in 2026:
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
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
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
                        </div>

                        {/* ── Table 2: Weekends ── */}
                        <div data-aos="fade-up">
                            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 border-b-2 border-[#F36E21] pb-2">
                                NSE Holidays Falling on Weekends
                                (Saturday/Sunday)
                            </h3>
                            <p className="text-md text-gray-500 mb-4">
                                Here is an NSE holidays 2026 list falling on
                                weekends (Saturday/Sunday):
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
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            [
                                                "February 15, 2026",
                                                "Sunday",
                                                "Mahashivratri",
                                            ],
                                            [
                                                "March 21, 2026",
                                                "Saturday",
                                                "Id-Ul-Fitr (Ramadan Eid)",
                                            ],
                                            [
                                                "August 15, 2026",
                                                "Saturday",
                                                "Independence Day",
                                            ],
                                            [
                                                "November 08, 2026",
                                                "Sunday",
                                                "Diwali Laxmi Pujan*",
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

                        {/* ── Table 3: Commodity Derivatives ── */}
                        <div data-aos="fade-up">
                            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 border-b-2 border-[#1A4B9B] pb-2">
                                NSE Holidays 2026 for the Commodity Derivatives
                                Segment
                            </h3>
                            <p className="text-md text-gray-500 mb-4">
                                Check out the list of NSE holidays 2026 for the
                                Commodity Derivatives Segment:
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
                                                Description
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

                        {/* ── NSE Timings ── */}
                        <div data-aos="fade-up">
                            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 border-b-2 border-[#1A4B9B] pb-2">
                                NSE Timings 2026
                            </h3>
                            <p className="text-md text-gray-600 leading-relaxed mb-6">
                                The National Stock Exchange facilitates trading
                                in the equities segment throughout the week,
                                except on Saturdays, Sundays and
                                exchange-declared holidays.
                            </p>
                            <p className="text-md text-gray-600 leading-relaxed mb-6">
                                Understanding the detailed market schedule is
                                crucial for investors and traders to optimise
                                their trading strategies. Below are the key
                                trading sessions and their timings:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        label: "Pre-Open Session",
                                        color: "#1A4B9B",
                                        items: [
                                            "Order Entry & Modification: 09:00 AM – 09:08 AM*. The session includes a random closure during the last minute",
                                            "Order Matching: Begins immediately after close of order entry window",
                                        ],
                                    },
                                    {
                                        label: "Regular Trading Session",
                                        color: "#F36E21",
                                        items: [
                                            "Market Open: 09:15 AM",
                                            "Market Close: 03:30 PM",
                                        ],
                                    },
                                    {
                                        label: "Closing Session",
                                        color: "#1A4B9B",
                                        items: [
                                            "This session is conducted between 03:40 PM and 04:00 PM to finalise and confirm closing prices.",
                                        ],
                                    },
                                    {
                                        label: "Block Deal Session",
                                        color: "#F36E21",
                                        items: [
                                            "Morning Window: 08:45 AM – 09:00 AM",
                                            "Afternoon Window: 02:05 PM – 02:20 PM",
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
                            <p className="text-md text-black-500 mt-3">
                                <strong>
                                    Internationally Linked Agricultural
                                    Commodities:
                                </strong>{" "}
                                5:00 PM to 9:00 PM / 9:30 PM
                            </p>
                            <p className="text-md text-black-500 mt-3">
                                <strong>Note:</strong> On November 08, 2026
                                (Sunday), Muhurat Trading will be conducted in
                                the account of Diwali Laxmi Pujan.
                            </p>
                        </div>

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
                                Muhurat Trading
                            </h3>
                            <p className="text-md text-gray-700 leading-relaxed">
                                Muhurat Trading is an auspicious stock market
                                trading occasion wherein the trading happens for
                                an entire hour on Diwali, which is one of the
                                most celebrated festivals in India. This year,
                                Muhurat Trading will be conducted on{" "}
                                <strong>November 08, 2026 (Sunday)</strong>.
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
