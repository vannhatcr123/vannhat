'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react'

/* ================= TYPE ================= */
export type VideoItem = {
    id: number
    title: string
    youtubeUrl: string
    category: 'Short' | 'Personal' | 'Commercial' | 'Animation'
    description: string
    tools: string[]
}

const filters: ('All' | VideoItem['category'])[] = [
    'All',
    'Short',
    'Personal',
    'Commercial',
    'Animation',
]

/* ================= HELPER ================= */
const getYoutubeId = (url: string) => {
    const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&]+)/
    )
    return match ? match[1] : ''
}

/* ================= COMPONENT ================= */
export default function HeroVideo({ videos }: { videos: VideoItem[] }) {
    const [active, setActive] = useState<'All' | VideoItem['category']>('All')
    const [selected, setSelected] = useState<VideoItem | null>(null)

    /* ===== MOBILE PAGINATION ===== */
    const ITEMS_PER_PAGE_MOBILE = 2
    const [page, setPage] = useState(1)

    const filtered =
        active === 'All' ? videos : videos.filter(v => v.category === active)

    useEffect(() => {
        setPage(1)
    }, [active])

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE_MOBILE)

    const mobileItems = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE_MOBILE,
        page * ITEMS_PER_PAGE_MOBILE
    )

    const countByCategory = (category: string) => {
        if (category === 'All') return videos.length
        return videos.filter(v => v.category === category).length
    }

    return (
        <>
            {/* ================= SECTION ================= */}
            <section
                id="portfolio"
                className="relative  pb-20 bg-transparent"
            >
                <div className="max-w-7xl mx-auto px-6">

                    {/* ===== TITLE + FILTER ===== */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-16">
                        <div className="relative">
                            <span className="absolute -top-4 left-0 h-[3px] w-16 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                            <h2 className="text-[42px] md:text-[46px] font-extrabold tracking-tight text-white">
                                Featured{" "}
                                <span className="
    bg-gradient-to-r from-indigo-400 to-cyan-400
    bg-clip-text text-transparent
  ">
                                    Works
                                </span>
                            </h2>

                            <p className="mt-4 max-w-md text-[15px] text-white/60">
                                Selected short-form, personal & commercial projects crafted with
                                storytelling, rhythm, and modern visual language.
                            </p>
                        </div>

                        {/* FILTER */}
                        <div className="
              inline-flex items-center gap-2 flex-wrap
              rounded-full p-1
              border border-white/10
              bg-white/5 backdrop-blur-xl
            ">
                            {filters.map(item => {
                                const isActive = active === item
                                return (
                                    <button
                                        key={item}
                                        onClick={() => setActive(item)}
                                        className={`
                      flex items-center gap-2 px-4 py-2 rounded-full
                      text-sm font-semibold transition-all duration-300
                      ${isActive
                                                ? `
    bg-gradient-to-r from-indigo-400 to-cyan-400
    text-white shadow-[0_0_25px_rgba(99,102,241,0.5)]
    scale-105
  `
                                                : `
    text-white/70
    hover:bg-white/10
    hover:text-white
  `
}
                    `}
                                    >
                                        {item}
                                        <span
                                            className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-white/10 text-white/70'}
                      `}
                                        >
                                            {countByCategory(item)}
                                        </span>
                                    </button>
                                )
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
                                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 rounded-full border border-white/10 text-white/70 disabled:opacity-30"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <span className="text-sm font-medium text-white/60">
                                    {page} / {totalPages}
                                </span>

                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="p-2 rounded-full border border-white/10 text-white/70 disabled:opacity-30"
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
                        className="fixed inset-0 z-[1000]   flex items-start justify-center   pt-24 md:pt-28 bg-black/80 backdrop-blur-md"
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
                                className="absolute -top-12 right-0 text-white   hover:text-cyan-300
  transition-colors"
                            >
                                <X size={28} />
                            </button>

                            <div className="aspect-video rounded-2xl overflow-hidden bg-black">
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
                                {/* <p className="mt-3 text-sm text-white/60">
                                    {selected.description}
                                </p> */}
                                <div className="mt-2 flex justify-center gap-2 flex-wrap">
                                    {selected.tools.map(tool => (
                                        <span
                                            key={tool}
                                            className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/15"
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
    )
}

/* ================= VIDEO CARD ================= */
function VideoCard({
    video,
    onSelect,
}: {
    video: VideoItem
    onSelect: (v: VideoItem) => void
}) {
    const videoId = getYoutubeId(video.youtubeUrl)
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

    return (
        <motion.div
            whileHover={{ y: -10 }}
            onClick={() => onSelect(video)}
            className="
        group cursor-pointer rounded-2xl overflow-hidden
        border border-white/10
        bg-white/5 backdrop-blur-xl
    hover:border-indigo-400/60
hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.5)]

        transition-all duration-300
      "
        >
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={thumbnail}
                    // alt={video.title}
                    className="
            w-full h-full object-cover
            scale-105 group-hover:scale-110
            transition-transform duration-700
          "
                />
                <div className="
          absolute inset-0 flex items-center justify-center
          bg-black/30 group-hover:bg-black/55
          transition-colors duration-300
        ">
                    <div className="
            flex items-center justify-center
            w-14 h-14 rounded-full
           bg-gradient-to-r from-indigo-400 to-cyan-400
shadow-[0_0_35px_rgba(99,102,241,0.65)]

            scale-90 group-hover:scale-100
            transition-all duration-300
          ">
                        <Play className="text-white ml-0.5" size={22} />
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-2">
                <h3 className="text-[16px] font-semibold text-white group-hover:text-cyan-300
 transition-colors">
                    {video.title}
                </h3>
                <div className="flex items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-400/15 text-indigo-200
 font-medium">
                        {video.category}
                    </span>
                    <span className="text-white/80">Video Edit</span>
                </div>
            </div>
        </motion.div>
    )
}
