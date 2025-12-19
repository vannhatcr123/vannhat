'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

/* ================= TYPE ================= */
export type VideoItem = {
    id: number;
    title: string;
    youtubeUrl: string;
    category: "Short" | "Personal" | "Commercial" | "Animation";
    description: string;
    tools: string[];
};

const filters: ("All" | "Short" | "Personal" | "Commercial" | "Animation")[] = [
    "All",
    "Short",
    "Personal",
    "Commercial",
    "Animation",
];

/* ================= HELPER ================= */
const getYoutubeId = (url: string) => {
    const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&]+)/,
    );
    return match ? match[1] : "";
};

/* ================= COMPONENT ================= */
export default function HeroVideo({ videos }: { videos: VideoItem[] }) {
    const [active, setActive] =
        useState<"All" | VideoItem["category"]>("All");
    const [selected, setSelected] = useState<VideoItem | null>(null);

    /* ===== MOBILE PAGINATION ===== */
    const ITEMS_PER_PAGE_MOBILE = 2;
    const [page, setPage] = useState(1);

    const filtered =
        active === "All" ? videos : videos.filter(v => v.category === active);

    useEffect(() => {
        setPage(1); // reset page khi đổi filter
    }, [active]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE_MOBILE);

    const mobileItems = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE_MOBILE,
        page * ITEMS_PER_PAGE_MOBILE
    );

    const countByCategory = (category: string) => {
        if (category === "All") return videos.length;
        return videos.filter(v => v.category === category).length;
    };

    return (
        <>
            {/* ================= SECTION ================= */}
            <section id="portfolio" className="pt-28 pb-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">

                    {/* ===== TITLE + FILTER ===== */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-16">
                        <div className="relative">
                            <span
                                className="absolute -top-4 left-0 h-[3px] w-16 rounded-full"
                                style={{
                                    background: "linear-gradient(90deg, #4F39F7, #000)",
                                }}
                            />
                            <h2 className="text-[42px] md:text-[46px] font-extrabold tracking-tight text-black">
                                Featured <span className="text-[#4F39F7]">Works</span>
                            </h2>
                            <p className="mt-4 max-w-md text-[15px] text-gray-600">
                                Selected short-form, personal & commercial projects crafted with
                                storytelling, rhythm, and modern visual language.
                            </p>
                        </div>

                        {/* FILTER */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 p-1 flex-wrap">
                            {filters.map(item => {
                                const isActive = active === item;
                                return (
                                    <button
                                        key={item}
                                        onClick={() => setActive(item)}
                                        className={`
                      flex items-center gap-2 px-4 py-2 rounded-full
                      text-sm font-semibold transition-all duration-300
                      ${isActive
                                                ? "bg-[#4F39F7] text-white shadow-md scale-105"
                                                : "text-black hover:bg-black/10"}
                    `}
                                    >
                                        {item}
                                        <span
                                            className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${isActive
                                                    ? "bg-white/20 text-white"
                                                    : "bg-black/10 text-black"}
                      `}
                                        >
                                            {countByCategory(item)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ================= DESKTOP GRID ================= */}
                    <div className="hidden md:block">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.35 }}
                                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
                            
                            >
                                {filtered.map(video => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onSelect={setSelected}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                   
                    {/* ================= MOBILE GRID ================= */}
                    <div className="md:hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${active}-${page}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 gap-8"
                            >
                                {mobileItems.map(video => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onSelect={setSelected}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* ===== PAGINATION ===== */}
                        {totalPages > 1 && (
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 rounded-full border border-black/10 disabled:opacity-30"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <span className="text-sm font-medium text-gray-600">
                                    {page} / {totalPages}
                                </span>

                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="p-2 rounded-full border border-black/10 disabled:opacity-30"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ================= MODAL ================= */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full max-w-5xl mx-6"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute -top-12 right-0 text-white hover:text-[#4F39F7]"
                            >
                                <X size={28} />
                            </button>

                            <div className="aspect-video rounded-xl overflow-hidden bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${getYoutubeId(
                                        selected.youtubeUrl
                                    )}?autoplay=1`}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            </div>

                            <div className="mt-6 text-center max-w-2xl mx-auto">
                                <h3 className="text-xl font-semibold text-white">
                                    {selected.title}
                                </h3>
                                <p className="mt-3 text-sm text-gray-300">
                                    {selected.description}
                                </p>
                                <div className="mt-4 flex justify-center gap-2 flex-wrap">
                                    {selected.tools.map(tool => (
                                        <span
                                            key={tool}
                                            className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-200 border border-white/20"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ================= VIDEO CARD ================= */
function VideoCard({
    video,
    onSelect,
}: {
    video: VideoItem;
    onSelect: (v: VideoItem) => void;
}) {
    const videoId = getYoutubeId(video.youtubeUrl);
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            onClick={() => onSelect(video)}
            className="
        group cursor-pointer rounded-2xl overflow-hidden
        border border-black/10 bg-white
        hover:border-[#4F39F7]
        hover:shadow-[0_10px_40px_-10px_rgba(79,57,247,0.35)]
        transition-all duration-300
      "
        >
            <div className="relative aspect-video bg-black overflow-hidden">
                <img
                    src={thumbnail}
                    alt={video.title}
                    className="
            w-full h-full object-cover
            scale-105 group-hover:scale-110
            transition-transform duration-500
          "
                />
                <div className="
          absolute inset-0 flex items-center justify-center
          bg-black/20 group-hover:bg-black/40
          transition-colors duration-300
        ">
                    <div className="
            flex items-center justify-center
            w-14 h-14 rounded-full
            bg-[#4F39F7]
            shadow-lg
            transition-all duration-300
            scale-90 group-hover:scale-100
          ">
                        <Play className="text-white ml-0.5" size={22} />
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-2">
                <h3 className="text-[17px] font-semibold text-black group-hover:text-[#4F39F7] transition-colors">
                    {video.title}
                </h3>
                <div className="flex items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-[#4F39F7]/10 text-[#4F39F7] font-medium">
                        {video.category}
                    </span>
                    <span className="text-gray-400">Video Edit</span>
                </div>
            </div>
        </motion.div>
    );
}
