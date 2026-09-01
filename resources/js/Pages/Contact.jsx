import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

/* ---------- Background: faint market grid + price lines (matches site theme) ---------- */
const MarketGridBG = ({ className = "" }) => (
    <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern
                id="grid-contact"
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
            <linearGradient id="fade-contact" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid-contact)" />
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
        <rect width="1200" height="800" fill="url(#fade-contact)" />
    </svg>
);

/* ---------- Contact info items ---------- */
const CONTACT_ITEMS = [
    {
        accent: "#1A4B9B",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"
                    stroke="#1A4B9B"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        label: "Phone Number",
        value: "+91 9342819342",
    },
    {
        accent: "#F36E21",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    stroke="#F36E21"
                    strokeWidth="1.8"
                />
                <path
                    d="M22 6l-10 7L2 6"
                    stroke="#F36E21"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
        label: "Email Address",
        value: "support@rightzoneresearch.com",
    },
    {
        accent: "#1A4B9B",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                    d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"
                    stroke="#1A4B9B"
                    strokeWidth="1.8"
                />
                <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="#1A4B9B"
                    strokeWidth="1.8"
                />
            </svg>
        ),
        label: "Office Address",
        value: "Bangalore, Karnataka",
    },
];

/* ---------- Contact Info Card ---------- */
function InfoCard({ item, index }) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={index * 80}
            className="group relative bg-white rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
                border: "1.5px solid #ececf6",
                boxShadow: "0 4px 20px rgba(26,75,155,0.04)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.accent;
                e.currentTarget.style.boxShadow = `0 6px 24px ${item.accent}18`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ececf6";
                e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(26,75,155,0.04)";
            }}
        >
            {/* hover top bar */}
            <div
                className="absolute top-0 left-5 right-5 h-[3px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: item.accent }}
            />

            {/* icon circle */}
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${item.accent}12` }}
            >
                {item.icon}
            </div>

            <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    {item.label}
                </p>
                {item.href ? (
                    <a
                        href={item.href}
                        className="text-md font-extrabold text-gray-900 hover:underline block truncate"
                        style={{ color: "#1a1a2e" }}
                    >
                        {item.value}
                    </a>
                ) : (
                    <p className="text-md font-extrabold text-gray-900">
                        {item.value}
                    </p>
                )}
                <p className="text-[11px] text-gray-400 mt-0.5">{item.sub}</p>
            </div>
        </div>
    );
}

/* ---------- Contact Form ---------- */
function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const inputClass =
        "w-full h-12 rounded-xl text-md text-gray-900 px-4 focus:outline-none transition-all duration-200";
    const inputStyle = { border: "1.5px solid #ececf6", background: "#fff" };

    const handleFocus = (e) => (e.target.style.borderColor = "#1A4B9B");
    const handleBlur = (e) => (e.target.style.borderColor = "#ececf6");

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const res = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setSubmitted(true);
                setForm({ name: '', email: '', phone: '', message: '' });
                return;
            }

            const payload = await res.json();
            if (payload.errors) setErrors(payload.errors);
            else setErrors({ general: payload.message || 'Submission failed' });
        } catch (err) {
            setErrors({ general: 'Network error. Please try again.' });
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "rgba(22,163,74,0.1)" }}
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M22 11.08V12a10 10 0 11-5.93-9.14"
                            stroke="#1A4B9B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22 4L12 14.01l-3-3"
                            stroke="#1A4B9B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                    Message Sent!
                </h3>
                <p className="text-md text-gray-400 leading-relaxed max-w-xs">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Full Name <span style={{ color: "#F36E21" }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className={inputClass}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Mobile Number{" "}
                        <span style={{ color: "#F36E21" }}>*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98XXXXXXXX"
                        required
                        className={inputClass}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Email Address <span style={{ color: "#F36E21" }}>*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            {/* Message */}
            <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Message <span style={{ color: "#F36E21" }}>*</span>
                </label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    rows={5}
                    className="w-full rounded-xl text-md text-gray-900 px-4 py-3.5 focus:outline-none transition-all duration-200 resize-none"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}

                {errors.general && (
                    <p className="text-red-500 text-sm mt-2">{errors.general}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full h-12 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{
                    background: "#1A4B9B",
                    boxShadow: "0 4px 18px rgba(26,75,155,0.35)",
                }}
            >
                Send Message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </form>
    );
}

/* ---------- Main Page Export ---------- */
export default function Contact() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
        // Refresh AOS in case it was initialized before this page's
        // elements existed in the DOM (common cause of elements stuck
        // at opacity: 0 when navigating client-side between routes).
        AOS.refresh();
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Contact Us</title>
                <meta
                    name="description"
                    content="Get in touch with Rightzone Research. Contact our support or advisory team for any investment queries."
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
                        Contact <span className="text-[#F36E21]">Us</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ============ 2. INFO CARDS ============ */}
            <section className="relative bg-[#fafbff] py-14 sm:py-16 px-4 overflow-hidden border-b border-gray-100">
                <MarketGridBG className="opacity-30" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {CONTACT_ITEMS.map((item, i) => (
                            <InfoCard key={item.label} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ 3. FORM ============ */}
            <section className="relative bg-white py-16 sm:py-20 px-4 overflow-hidden">
                <MarketGridBG className="opacity-20" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <div
                        className="relative bg-white rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
                        style={{
                            border: "1.5px solid #ececf6",
                            boxShadow: "0 8px 32px rgba(26,75,155,0.06)",
                        }}
                    >
                        {/* Left: form */}
                        <div className="p-8 sm:p-10">
                            <div className="mb-7 text-left">
                                <h2 className="text-xl font-extrabold text-gray-900 mb-1.5">
                                    Send Us a Message
                                </h2>
                                <div
                                    className="w-10 h-1 rounded-full"
                                    style={{ background: "#F36E21" }}
                                />
                            </div>
                            <ContactForm />
                        </div>

                        {/* Right: illustration fills the entire side panel */}
                        <div
                            className="hidden md:block relative"
                            style={{
                                background:
                                    "linear-gradient(135deg, #eaf1ff 0%, #fff3e9 100%)",
                            }}
                        >
                            <img
                                src="/assets/contact.png"
                                alt="Contact illustration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
