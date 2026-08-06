import React, { useEffect } from "react";
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
                id="grid-payment"
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
            <linearGradient id="fade-payment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid-payment)" />
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
        <rect width="1200" height="800" fill="url(#fade-payment)" />
    </svg>
);

/* ---------- Simple Field (no copy) ---------- */
function Field({ label, value }) {
    return (
        <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                {label}
            </p>
            <div
                className="rounded-xl px-4 py-3"
                style={{ background: "#f5f5fb", border: "1.5px solid #ececf6" }}
            >
                <span className="text-sm font-bold text-gray-900 tracking-wide">
                    {value}
                </span>
            </div>
        </div>
    );
}

/* ---------- Bank Card ---------- */
function BankCard({ bank, index }) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={index * 120}
            className="group relative bg-white rounded-2xl p-8 sm:p-10 flex flex-col gap-5"
            style={{
                border: "1.5px solid #ececf6",
                boxShadow: "0 8px 32px rgba(26,75,155,0.06)",
            }}
        >
            {/* Top accent bar */}
            <div
                className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full"
                style={{ background: bank.accent }}
            />

            {/* Bank header */}
            <div className="flex items-center gap-4">
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                        background: `${bank.accent}12`,
                        border: `1.5px solid ${bank.accent}22`,
                    }}
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"
                            stroke={bank.accent}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div>
                    <p
                        className="text-[14px] font-bold uppercase tracking-widest mb-0.5"
                        style={{ color: bank.accent }}
                    >
                        Bank Account Name
                    </p>
                    <h3 className="text-lg font-extrabold text-gray-900">
                        {bank.bankName}
                    </h3>
                </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Fields */}
            <div className="space-y-4">
                <Field label="Bank Name" value={bank.bankName} />
                <Field label="Account Name" value={bank.name} />
                <Field label="Account Number" value={bank.accountNo} />
                <Field label="IFSC Code" value={bank.ifsc} />
                {bank.branch && <Field label="Branch" value={bank.branch} />}
            </div>

            {/* UPI */}
            {bank.upi && (
                <>
                    <div className="w-full h-px bg-gray-100" />
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                            UPI ID
                        </p>
                        <div
                            className="flex items-center gap-2.5 rounded-xl px-4 py-3.5"
                            style={{
                                background: `${bank.accent}08`,
                                border: `1.5px solid ${bank.accent}20`,
                            }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <rect
                                    x="2"
                                    y="5"
                                    width="20"
                                    height="14"
                                    rx="2"
                                    stroke={bank.accent}
                                    strokeWidth="1.8"
                                />
                                <path
                                    d="M2 10h20"
                                    stroke={bank.accent}
                                    strokeWidth="1.8"
                                />
                            </svg>
                            <span
                                className="text-sm font-bold"
                                style={{ color: bank.accent }}
                            >
                                {bank.upi}
                            </span>
                        </div>
                    </div>
                </>
            )}

            {/* Per-card notice */}
            {bank.notice && (
                <>
                    <div className="w-full h-px bg-gray-100" />
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        📌 {bank.notice}
                    </p>
                </>
            )}
        </div>
    );
}

const BANKS = [
    {
        accent: "#1A4B9B",
        bankName: "",
        name: "",
        accountNo: "",
        ifsc: "",
        branch: "",
        notice: "Please send the transaction reference to support@rightzoneresearch.com once the payment is complete.",
    },
    {
        accent: "#F36E21",
        bankName: " ",
        name: "",
        accountNo: "",
        ifsc: "",
        branch: "",
        notice: "Please send the transaction reference to support@rightzoneresearch.com once the payment is complete.",
    },
];

export default function Payment() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Payments</title>
                <meta name="description" content="Make secure payments and choose subscription billing options for Rightzone Research services." />
            </Helmet>
            {/* ── HERO ── */}
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
    Payments <span className="text-[#F36E21]"></span>
</h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ── BANK CARDS + NOTICE ── */}
            <section className="relative bg-[#fafbff] py-16 sm:py-20 px-4 overflow-hidden">
                <MarketGridBG className="opacity-40" />
                <div className="max-w-5xl mx-auto relative z-10 space-y-10">
                    {/* Bank cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {BANKS.map((bank, i) => (
                            <BankCard
                                key={bank.bankName}
                                bank={bank}
                                index={i}
                            />
                        ))}
                    </div>

                    {/* Important Payment Notice */}
                    <div
                        data-aos="fade-up"
                        className="bg-orange-50/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-l-4 flex flex-col md:flex-row gap-5 items-start shadow-sm"
                        style={{ borderColor: "#F36E21" }}
                    >
                        <div className="p-3 bg-white rounded-xl shadow-sm text-xl flex-shrink-0">
                            ⚠️
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                                Important Payment Notice
                            </h2>
                            <div className="text-gray-700 text-sm leading-relaxed space-y-3">
                                <p>
                                    Please make all payments only to our{" "}
                                    <span className="font-bold text-[#1A4B9B] bg-[#1A4B9B]/5 px-1.5 py-0.5 rounded">
                                        official company bank account
                                    </span>{" "}
                                    or{" "}
                                    <span className="font-bold text-[#1A4B9B] bg-[#1A4B9B]/5 px-1.5 py-0.5 rounded">
                                        authorized company UPI ID
                                    </span>
                                    .
                                </p>
                                <p>
                                    Payments made to any personal bank accounts
                                    or personal UPI addresses are{" "}
                                    <span className="font-bold text-[#F36E21] bg-[#F36E21]/5 px-1.5 py-0.5 rounded">
                                        not valid
                                    </span>{" "}
                                    and will not be recognized.
                                </p>
                                <p className="text-sm text-gray-500 font-medium pt-2 border-t border-orange-100">
                                    We disclaim any responsibility for losses or
                                    fraud arising from payments to unauthorized
                                    accounts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
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
                            className="bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-lg sm:rounded-full flex-grow focus:outline-none text-sm"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-lg sm:rounded-full flex-grow focus:outline-none text-sm"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-lg sm:rounded-full flex-grow focus:outline-none text-sm"
                        />
                        <button
                            type="submit"
                            className="bg-[#F36E21] text-white font-semibold px-6 py-3 rounded-lg sm:rounded-full hover:bg-opacity-90 transition text-sm shrink-0"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
