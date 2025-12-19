'use client';

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, FileDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function CVModal({ open, onClose }: Props) {
    // 1. Danh sách các trang CV của bạn (Thêm bao nhiêu tùy ý)
    const cvPages = [
        "https://cdn1.vieclam24h.vn/images/assets/img/072-blue-simple-professional.jpg",
        "https://cdn1.vieclam24h.vn/images/assets/img/072-blue-simple-professional.jpg", // Thay bằng link trang 2
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.5));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

    const nextPage = () => {
        if (currentPage < cvPages.length - 1) {
            setCurrentPage(prev => prev + 1);
            setZoom(1); // Reset zoom khi đổi trang cho dễ nhìn
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
            setZoom(1);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/path-to-your-cv.pdf';
        link.download = 'CV_Van_Nhat.pdf';
        link.click();
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/90 z-50 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 pointer-events-none"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div
                            className="relative bg-[#1a1a1a] rounded-2xl max-w-5xl w-full h-[95vh] overflow-hidden shadow-2xl flex flex-col pointer-events-auto border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* TOOLBAR */}
                            <div className="flex flex-wrap items-center justify-between p-4 bg-[#252525] border-b border-white/10 sticky top-0 z-20 gap-4">
                                <div className="flex items-center gap-2">
                                    <button onClick={handleZoomIn} className="p-2.5 bg-[#333] hover:bg-indigo-600 text-white rounded-xl shadow-lg transition-all"><ZoomIn size={20} strokeWidth={2.5} /></button>
                                    <button onClick={handleZoomOut} className="p-2.5 bg-[#333] hover:bg-indigo-600 text-white rounded-xl shadow-lg transition-all"><ZoomOut size={20} strokeWidth={2.5} /></button>

                                    <div className="w-[1px] h-8 bg-white/10 mx-1" />

                                    {/* BỘ CHUYỂN TRANG */}
                                    <div className="flex items-center gap-2 bg-[#333] p-1 rounded-xl border border-white/5">
                                        <button
                                            onClick={prevPage}
                                            disabled={currentPage === 0}
                                            className="p-1.5 hover:bg-indigo-600 text-white rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <span className="text-white text-xs font-bold px-2 min-w-[60px] text-center">
                                            TRANG {currentPage + 1} / {cvPages.length}
                                        </span>
                                        <button
                                            onClick={nextPage}
                                            disabled={currentPage === cvPages.length - 1}
                                            className="p-1.5 hover:bg-indigo-600 text-white rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all font-bold text-xs shadow-lg active:scale-95"
                                    >
                                        <FileDown size={18} />
                                        <span>TẢI PDF</span>
                                    </button>
                                    <button onClick={onClose} className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-red-500 text-white transition-all border border-white/10"><X size={22} /></button>
                                </div>
                            </div>

                            {/* HIỂN THỊ NỘI DUNG */}
                            <div className="overflow-auto bg-[#121212] p-4 md:p-8 flex justify-center items-start flex-1 scrollbar-hide">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentPage} // Quan trọng để motion nhận biết đổi trang
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ scale: zoom }}
                                        className="origin-top"
                                    >
                                        <img
                                            src={cvPages[currentPage]}
                                            alt={`CV Page ${currentPage + 1}`}
                                            className="w-full max-w-4xl h-auto rounded-md shadow-2xl border border-white/5"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}