'use client';

import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ZoomIn,
    ZoomOut,
    FileDown,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function CVModal({ open, onClose }: Props) {
    const cvPages = [
        "https://cdn1.vieclam24h.vn/images/assets/img/072-blue-simple-professional.jpg",
        "https://cdn1.vieclam24h.vn/images/assets/img/072-blue-simple-professional.jpg",
    ];

    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(0);
    const [zoom, setZoom] = useState(1);
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/cv/CV_Van_Nhat.pdf";
        link.download = "CV_Van_Nhat.pdf";
        link.click();
    };

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <>
                    {/* OVERLAY */}
                    <motion.div
                        className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* MODAL */}
                    <motion.div
                        className="fixed inset-0 z-[100000] flex items-center justify-center p-3 md:p-6"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                    >
                        <div
                            className="
                                relative w-full max-w-5xl h-[95vh]
                                rounded-2xl overflow-hidden
                                bg-[#0B0F1A]
                                border border-white/10
                                shadow-[0_40px_120px_rgba(99,102,241,0.45)]
                                flex flex-col
                            "
                            onClick={e => e.stopPropagation()}
                        >
                            {/* TOOLBAR */}
                            <div className="
                                sticky top-0 z-30
                                flex flex-wrap items-center justify-between gap-3
                                px-4 py-3
                                bg-[#0F172A]/90 backdrop-blur
                                border-b border-white/10
                            ">
                                {/* LEFT */}
                                <div className="flex items-center gap-2">
                                    {[ZoomIn, ZoomOut].map((Icon, i) => (
                                        <button
                                            key={i}
                                            onClick={() =>
                                                i === 0
                                                    ? setZoom(z => Math.min(z + 0.2, 2.5))
                                                    : setZoom(z => Math.max(z - 0.2, 0.5))
                                            }
                                            className="
                                                p-2.5 rounded-xl
                                                bg-white/5
                                                hover:bg-gradient-to-r
                                                hover:from-indigo-400 hover:to-cyan-400
                                                transition
                                            "
                                        >
                                            <Icon size={18} className="text-white" />
                                        </button>
                                    ))}

                                    <div className="w-px h-7 bg-white/10 mx-2" />

                                    <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-xl">
                                        <button
                                            onClick={() => setPage(p => Math.max(0, p - 1))}
                                            disabled={page === 0}
                                            className="
                                                p-1.5 rounded-lg
                                                hover:bg-gradient-to-r hover:from-indigo-400 hover:to-cyan-400
                                                disabled:opacity-30
                                            "
                                        >
                                            <ChevronLeft size={18} className="text-white" />
                                        </button>

                                        <span className="text-xs font-semibold text-white/80 min-w-[56px] text-center">
                                            {page + 1}/{cvPages.length}
                                        </span>

                                        <button
                                            onClick={() => setPage(p => Math.min(cvPages.length - 1, p + 1))}
                                            disabled={page === cvPages.length - 1}
                                            className="
                                                p-1.5 rounded-lg
                                                hover:bg-gradient-to-r hover:from-indigo-400 hover:to-cyan-400
                                                disabled:opacity-30
                                            "
                                        >
                                            <ChevronRight size={18} className="text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleDownload}
                                        className="
        flex items-center gap-2
        px-4 py-2 rounded-xl
        bg-gradient-to-r from-indigo-400 to-cyan-400
        text-black font-bold text-xs
        hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
        transition
    "
                                    >
                                        <FileDown size={16} />
                                        PDF
                                    </button>


                                    <button
                                        onClick={onClose}
                                        className="
                                            w-9 h-9 rounded-xl
                                            flex items-center justify-center
                                            bg-white/5
                                            hover:bg-red-500
                                            transition
                                        "
                                    >
                                        <X size={18} className="text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1 overflow-auto bg-black p-6 flex justify-center">
                                <motion.img
                                    key={page}
                                    src={cvPages[page]}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25 }}
                                    style={{ scale: zoom }}
                                    className="
                                        origin-top
                                        max-w-4xl
                                        rounded-xl
                                        border border-white/10
                                        shadow-2xl
                                    "
                                />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
