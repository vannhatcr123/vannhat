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
            <section className="py-9 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl border p-10 md:p-14 bg-gradient-to-br from-white to-indigo-50 overflow-hidden"
                    >
                        {/* --- PHẦN ẢNH NỀN MỚI THÊM VÀO --- */}
                    
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://cdn2.tuoitre.vn/zoom/700_438/471584752817336320/2024/12/15/thiet-ke-chua-co-ten-17342478150201733793207-0-56-648-1093-crop-1734247924155307274409.gif"
                                alt="Background"
                                /* Chỉnh object-[left_80%] để đẩy nội dung ảnh lên trên, lộ phần dưới nhiều hơn */
                                className="w-full h-full object-cover opacity-80 mix-blend-multiply object-[left_80%]"
                            />

                            {/* Thêm một lớp phủ trắng mờ nhẹ ở giữa để "tách" chữ Văn Nhật ra khỏi nền Noel */}
                            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
                        </div>
                        {/* ---------------------------------- */}

                        {/* Quan trọng: Các nội dung bên dưới phải có relative z-10 để nằm trên ảnh nền */}
                        <div className="grid md:grid-cols-2 gap-14 items-center relative z-10">

                            {/* AVATAR */}
                            <motion.div
                                onClick={() => setOpen(true)}
                                whileHover={{ scale: 1.07 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="relative mx-auto cursor-pointer group"
                            >
                                {/* ROTATING RING */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                                    className="absolute inset-[-14px] rounded-full border border-indigo-400/40 blur-[1px]"
                                />

                                {/* GLOW */}
                                <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* IMAGE */}
                                <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-[0_0_45px_rgba(79,57,247,0.45)] bg-white">
                                    <img
                                        src="/image/1.png"
                                        alt="Van Nhat Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* INFO */}
                            <div className="relative z-10"> {/* Thêm z-10 ở đây cho chắc chắn */}
                                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_6px_25px_rgba(99,102,241,0.45)]">
                                        Văn Nhật
                                    </span>
                                </h3>

                                {/* Phần tiêu đề phụ: Video Editor & UI Designer */}
                                <p className="mt-2 text-[#4F39F7] font-bold text-lg drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
                                    Video Editor & UI Designer
                                </p>

                                {/* Phần mô tả: Cinematic editing... */}
                                <div className="mt-4 relative group w-fit">

                                    {/* Lớp nền mờ: inset-0 hoặc p-2 để tạo khoảng cách đệm đẹp mắt */}
                                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl -z-10" />

                                    {/* Nội dung văn bản: Thêm px-3 py-1 để chữ không chạm sát mép khung mờ */}
                                    <p className="text-gray-900 font-medium max-w-md leading-relaxed drop-shadow-sm px-3 py-2">
                                        Cinematic editing, short-form content,
                                        <span className="block">storytelling & modern UI design.</span>
                                    </p>
                                </div>

                                <button
                                    onClick={() => setOpen(true)}
                                    className="mt-8 inline-flex items-center gap-3 px-7 py-3 rounded-full bg-[#4F39F7] text-white font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
                                >
                                    View Full CV
                                    <ArrowRight size={18} />
                                </button>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </section>

            {/* MODAL */}
            <CVModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}