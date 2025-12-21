'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CVModal from "./CVModal";

export default function CVPreview() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const esc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, []);

    return (
        <>
            <section className="py-12 relative bg-transparent">
                <div className="max-w-7xl mx-auto px-6">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="
                            relative rounded-3xl
                            border border-white/10
                            bg-white/5 backdrop-blur-xl
                            p-10 md:p-14
                            overflow-hidden
                        "
                    >
                        <div className="grid md:grid-cols-2 gap-14 items-center relative z-10">

                            {/* ================= AVATAR ================= */}
                            <motion.div
                                onClick={() => setOpen(true)}
                                whileHover={{ scale: 1.06 }}
                                transition={{ type: "spring", stiffness: 180 }}
                                className="relative mx-auto cursor-pointer group"
                            >
                                {/* RING */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                    className="absolute inset-[-14px] rounded-full border border-indigo-400/40"
                                />

                                {/* GLOW */}
                                <div className="
                                    absolute inset-0 rounded-full
                                    bg-indigo-400/20 blur-2xl
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-500
                                " />

                                {/* IMAGE */}
                                <div className="
                                    relative w-56 h-56 md:w-64 md:h-64
                                    rounded-full overflow-hidden
                                    border border-white/30
                                    bg-black/20
                                    shadow-[0_0_45px_rgba(99,102,241,0.45)]
                                ">
                                    <img
                                        src="/image/1.png"
                                        alt="Van Nhat Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* ================= INFO ================= */}
                            <div>
                                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                    <span className="
                                        bg-gradient-to-r
                                        from-indigo-400 to-cyan-400
                                        bg-clip-text text-transparent
                                    ">
                                        Văn Nhật
                                    </span>
                                </h3>

                                <p className="
                                    mt-2 text-[15px] font-semibold
                                    text-indigo-300
                                ">
                                    Video Editor & UI Designer
                                </p>

                                <p className="
                                    mt-4 max-w-md
                                    text-white/70 leading-relaxed
                                ">
                                    Cinematic editing, short-form content,
                                    <span className="block">
                                        storytelling & modern UI design.
                                    </span>
                                </p>

                                {/* ================= BUTTON ================= */}
                                <button
                                    onClick={() => setOpen(true)}
                                    className="
                                        mt-8 inline-flex items-center gap-3
                                        px-7 py-3 rounded-full
                                        bg-gradient-to-r from-indigo-500 to-cyan-500
                                        text-white font-semibold
                                        shadow-[0_10px_40px_-10px_rgba(99,102,241,0.6)]
                                        hover:scale-[1.05]
                                        hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.8)]
                                        transition-all duration-300
                                    "
                                >
                                    View Full CV
                                    <ArrowRight size={18} />
                                </button>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </section>

            {/* ================= MODAL ================= */}
            <CVModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}
