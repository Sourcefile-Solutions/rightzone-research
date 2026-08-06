import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: "About Us", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Reports", path: "/reports" },
        { name: "Pricing", path: "/pricing" },
        { name: "Payments", path: "/payments" },
    ];

    return (
        <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-sans">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 no-underline"
                >
                    <img
                        src="/assets/logo.png"
                        alt="Rightzone Research Logo"
                        className="h-16 w-auto"
                    />
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center">
                    <ul className="flex items-center m-0 p-0 list-none gap-0">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`text-[18px] font-medium no-underline inline-block px-[15px] transition-all duration-400 ease-in-out ${
                                            isActive
                                                ? "text-[#F36E21]"
                                                : "text-[#333333] hover:text-[#F36E21]"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center border border-[#F36E21] text-[#F36E21] bg-transparent px-5 py-2.5 ml-[15px] rounded-full text-[16px] font-medium transition-all duration-400 ease-in-out no-underline hover:bg-[#F36E21] hover:text-white"
                    >
                        Contact Us
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-gray-700 p-2 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                                menuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                            }
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 absolute left-0 right-0 top-20 z-40 shadow-md">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                className={`text-[18px] font-medium no-underline py-1 transition-all duration-200 ${
                                    isActive
                                        ? "text-[#F36E21]"
                                        : "text-[#333333]"
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="border border-[#F36E21] text-[#F36E21] bg-transparent px-5 py-2.5 rounded-full text-[16px] font-medium transition-all duration-400 no-underline mt-1 hover:bg-[#F36E21] hover:text-white self-start"
                    >
                        Contact Us
                    </Link>
                </div>
            )}
        </header>
    );
}
