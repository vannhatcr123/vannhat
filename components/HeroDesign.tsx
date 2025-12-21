'use client'

import { useState, useRef, useEffect } from 'react'
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useAnimationFrame,
} from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

/* ================= TYPE ================= */
export type DesignItem = {
    id: number
    image: string
    title: string
    tools: string[]
}
const HEADER_HEIGHT = 100

/* ================= DATA (VÍ DỤ) ================= */
const designs: DesignItem[] = [
    { id: 1, image: "/image/1.jpg", title: "Landing Page UI", tools: ["Figma"] },
    { id: 2, image: "/image/2.jpg", title: "Mobile App UI", tools: ["Figma"] },
    { id: 3, image: "/image/3.jpg", title: "Dashboard UI", tools: ["Figma", "PS"] },
    { id: 4, image: "/image/3.jpg", title: "Brand Visual", tools: ["Photoshop"] },
    { id: 5, image: "/image/5.jpg", title: "Web Hero Section", tools: ["Figma"] },
    { id: 6, image: "/image/1.jpg", title: "Poster Design", tools: ["Illustrator"] },
    { id: 1, image: "/image/1.jpg", title: "Landing Page UI", tools: ["Figma"] },
    { id: 2, image: "/image/2.jpg", title: "Mobile App UI", tools: ["Figma"] },
    { id: 3, image: "/image/3.jpg", title: "Dashboard UI", tools: ["Figma", "PS"] },
    { id: 4, image: "/image/3.jpg", title: "Brand Visual", tools: ["Photoshop"] },
    { id: 5, image: "/image/5.jpg", title: "Web Hero Section", tools: ["Figma"] },
    { id: 6, image: "/image/1.jpg", title: "Poster Design", tools: ["Illustrator"] },
    { id: 1, image: "/image/1.jpg", title: "Landing Page UI", tools: ["Figma"] },
    { id: 2, image: "/image/2.jpg", title: "Mobile App UI", tools: ["Figma"] },
    { id: 3, image: "/image/3.jpg", title: "Dashboard UI", tools: ["Figma", "PS"] },
    { id: 4, image: "/image/3.jpg", title: "Brand Visual", tools: ["Photoshop"] },
    { id: 5, image: "/image/5.jpg", title: "Web Hero Section", tools: ["Figma"] },
    { id: 6, image: "/image/1.jpg", title: "Poster Design", tools: ["Illustrator"] },
];

/* ================= HELPER ================= */
const chunk = <T,>(arr: T[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    )

/* ================= COMPONENT ================= */
export default function HeroDesign() {
    const [selected, setSelected] = useState<DesignItem | null>(null)

    return (
        <>
            {/* ================= SECTION ================= */}
            <section className="pb-24 relative">
                <div className="max-w-7xl mx-auto px-6">

                    {/* ===== TITLE ===== */}
                    <div className="mb-14">
                        <span className="absolute -top-4 left-58 h-[3px] w-16 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                        <h2 className="text-[38px] md:text-[42px] font-extrabold tracking-tight text-white">
                            Design{' '}
                            <span
                                className="
                  bg-gradient-to-r from-indigo-400 to-cyan-400
                  bg-clip-text text-transparent
                "
                            >
                                Works
                            </span>
                        </h2>

                        <p className="mt-3 text-sm text-white max-w-md">
                            UI & visual design works focused on clarity, spacing and modern aesthetics.
                        </p>
                    </div>

                    {/* ===== DESKTOP / TABLET ===== */}
                    <div className="hidden sm:block space-y-16 overflow-hidden">
                        {chunk(designs, Math.ceil(designs.length / 3)).map((row, i) => (
                            <InfiniteRow
                                key={i}
                                items={row}
                                direction={i % 2 === 0 ? -1 : 1}
                                onSelect={setSelected}
                            />
                        ))}
                    </div>

                    {/* ===== MOBILE ===== */}
                    <div className="sm:hidden overflow-hidden">
                        <InfiniteRow
                            items={designs}
                            direction={-1}
                            onSelect={setSelected}
                            mobile
                        />
                    </div>
                </div>
            </section>

         
            {/* ================= MODAL ================= */}
            <AnimatePresence>
                {selected && (
                    <>
                        {/* OVERLAY */}
                        <motion.div
                            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelected(null)}
                        />

                        {/* MODAL CONTENT */}
                        <motion.div
                            className="
          fixed left-0 right-0 z-[1000]
          flex items-center justify-center
          px-6
        "
                            style={{
                                top: HEADER_HEIGHT,
                                height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                            }}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                        >
                            <div
                                className="relative max-w-[92vw] max-h-full"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* CLOSE */}
                                <button
                                    onClick={() => setSelected(null)}
                                    className="
              absolute -top-10 right-0
              text-white hover:text-indigo-400
              transition-colors
            "
                                >
                                    <X size={28} />
                                </button>

                                {/* IMAGE */}
                                <img
                                    src={selected.image}
                                    alt={selected.title}
                                    className="
              max-h-[75vh] w-auto object-contain
              rounded-2xl
              shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]
            "
                                />

                                {/* INFO */}
                                <div className="mt-5 text-center">
                                    <h3 className="text-lg font-semibold text-white">
                                        {selected.title}
                                    </h3>

                                    <div className="mt-3 flex justify-center gap-2 flex-wrap">
                                        {selected.tools.map(tool => (
                                            <span
                                                key={tool}
                                                className="
                    px-3 py-1 text-xs rounded-full
                    bg-white/10 text-white
                    border border-white/20
                  "
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </>
    )
}

/* ================= INFINITE ROW ================= */
function InfiniteRow({
    items,
    direction,
    onSelect,
    mobile = false,
}: {
    items: DesignItem[]
    direction: 1 | -1
    onSelect: (item: DesignItem) => void
    mobile?: boolean
}) {
    const x = useMotionValue(0)
    const rowRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const speed = useRef(0.35 * direction)
    const [loopWidth, setLoopWidth] = useState(0)

    useEffect(() => {
        if (!rowRef.current) return

        const measure = () => {
            const fullWidth = rowRef.current!.scrollWidth
            setLoopWidth(fullWidth / 2)
        }

        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [items])

    useAnimationFrame(() => {
        if (!loopWidth || isDragging.current) return

        let currentX = x.get() - speed.current

        if (currentX <= -loopWidth) currentX += loopWidth
        else if (currentX >= 0) currentX -= loopWidth

        x.set(currentX)
    })

    return (
        <motion.div
            ref={rowRef}
            className="flex gap-8 md:gap-10 w-max cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragElastic={0.06}
            dragMomentum={false}
            onDragStart={() => (isDragging.current = true)}
            onDragEnd={(_, info) => {
                isDragging.current = false
                const v = info.velocity.x * 0.002
                if (Math.abs(v) > 0.05) {
                    speed.current = Math.max(Math.min(v, 1), -1)
                }
            }}
        >
            {[...items, ...items].map((item, i) => (
                <div key={`${item.id}-${i}`} className="shrink-0">
                    <div
                        onClick={() => onSelect(item)}
                        className="group relative"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            draggable={false}
                            className="
                h-[220px] md:h-[260px] w-auto object-contain
                rounded-2xl
                transition-all duration-500
                group-hover:scale-[1.05]
                group-hover:shadow-[0_25px_60px_-18px_rgba(99,102,241,0.45)]
              "
                        />

                        <div
                            className="
                absolute bottom-3 right-3
                w-9 h-9 rounded-full
                bg-white/80 backdrop-blur
                flex items-center justify-center
                opacity-0 group-hover:opacity-100
                transition
              "
                        >
                            <ZoomIn size={16} className="text-indigo-400" />
                        </div>
                    </div>

                    <div className="mt-3">
                        <p className="text-sm font-semibold text-indigo-100">
                            {item.title}
                        </p>

                        <p className="text-xs text-indigo-300/70 tracking-wide">
                            {item.tools.join(' · ')}
                        </p>

                    </div>
                </div>
            ))}
        </motion.div>
    )
}
