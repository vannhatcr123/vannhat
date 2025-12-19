'use client';

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Facebook,
    Instagram,
    MessageCircle,
    Menu,
    X,
} from "lucide-react";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    {/* LOGO */}
                    <Link
                        href="#home"
                        className="text-[22px] font-bold tracking-tight font-[var(--font-space-grotesk)] leading-none"
                    >
                        <span className="text-black">Video</span>{" "}
                        <span className="text-indigo-600">Editor</span>
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-12">
                        {navItems.map(item => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="relative text-[15px] font-medium text-gray-700 hover:text-black"
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                            >
                                {item.name}
                                <motion.span
                                    variants={{
                                        rest: { width: 0, opacity: 0 },
                                        hover: { width: "100%", opacity: 1 },
                                    }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="absolute left-0 -bottom-1 h-[2px] bg-indigo-600"
                                />
                            </motion.a>
                        ))}
                    </nav>

                    {/* DESKTOP SOCIAL */}
                    <div className="hidden md:flex items-center gap-5">
                        <Social />
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden text-gray-700"
                        aria-label="Open menu"
                    >
                        <Menu size={26} />
                    </button>
                </div>
            </header>

            {/* ================= MOBILE MENU ================= */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-white rounded-b-2xl px-6 pt-6 pb-8"
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* HEADER */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-lg font-bold">
                                    Menu
                                </span>
                                <button onClick={() => setOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            {/* NAV */}
                            <div className="flex flex-col gap-5">
                                {navItems.map(item => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="
                      text-[18px] font-semibold text-gray-800
                      hover:text-indigo-600 transition-colors
                    "
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                            {/* SOCIAL */}
                            <div className="mt-8 pt-6 border-t border-gray-200 flex gap-6">
                                <Social />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ================= SOCIAL ================= */
function Social() {
    return (
        <>
            <motion.a
                href="https://www.facebook.com/ngw.vnhat"
                target="_blank"
                aria-label="Facebook"
                whileHover={{ scale: 1.15 }}
                className="text-gray-500 hover:text-blue-600 transition-colors"
            >
                <Facebook size={20} strokeWidth={1.8} />
            </motion.a>

            <motion.a
                href="https://instagram.com/YOUR_INSTAGRAM"
                target="_blank"
                aria-label="Instagram"
                whileHover={{ scale: 1.15 }}
                className="text-gray-500 hover:text-pink-500 transition-colors"
            >
                <Instagram size={20} strokeWidth={1.8} />
            </motion.a>

            <motion.a
                href="https://zalo.me/YOUR_ZALO"
                target="_blank"
                aria-label="Zalo"
                whileHover={{ scale: 1.15 }}
                className="text-gray-500 hover:text-sky-500 transition-colors"
            >
                <MessageCircle size={20} strokeWidth={1.8} />
            </motion.a>
        </>
    );
}
