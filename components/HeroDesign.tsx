'use client';


import { useState, useRef,useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useAnimationFrame,
} from "framer-motion";
import { X, ZoomIn } from "lucide-react";

/* ================= TYPE ================= */
export type DesignItem = {
    id: number;
    image: string;
    title: string;
    tools: string[];
};

/* ================= DATA ================= */
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


/* ================= CHUNK ================= */
const chunk = <T,>(arr: T[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

/* ================= COMPONENT ================= */
export default function HeroDesign() {
    const [selected, setSelected] = useState<DesignItem | null>(null);

    return (
        <>
            <section className=" pb-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">

                    {/* ===== TITLE ===== */}
                    <div className="mb-12">
                        <h2 className="text-[38px] md:text-[42px] font-extrabold tracking-tight text-black">
                            Design <span className="text-[#4F39F7]">Works</span>
                        </h2>
                        <p className="mt-3 text-sm text-gray-600 max-w-md">
                            UI & visual design works focused on clarity, spacing and modern aesthetics.
                        </p>
                    </div>

                    {/* ===== DESKTOP / TABLET ===== */}
                    <div className="hidden sm:block space-y-14 overflow-hidden">
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
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative max-w-[92vw] max-h-[92vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute -top-12 right-0 text-white hover:text-[#4F39F7]"
                            >
                                <X size={28} />
                            </button>

                            <img
                                src={selected.image}
                                alt={selected.title}
                                className="max-h-[75vh] w-auto object-contain rounded-xl"
                            />

                            <div className="mt-5 text-center">
                                <h3 className="text-lg font-semibold text-white">
                                    {selected.title}
                                </h3>
                                <div className="mt-3 flex justify-center gap-2 flex-wrap">
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

/* ================= INFINITE ROW ================= */
function InfiniteRow({
    items,
    direction,
    onSelect,
    mobile = false,
}: {
    items: DesignItem[];
    direction: 1 | -1;
    onSelect: (item: DesignItem) => void;
    mobile?: boolean;
}) {
    const x = useMotionValue(0);
    const rowRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const speed = useRef(0.35 * direction);
    const [loopWidth, setLoopWidth] = useState(0);

    /* === đo chính xác 1 vòng === */
    useEffect(() => {
        if (!rowRef.current) return;

        const measure = () => {
            const fullWidth = rowRef.current!.scrollWidth;
            setLoopWidth(fullWidth / 2);
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [items]);

    /* === auto move + modulo wrap (KHÔNG BAO GIỜ MẤT) === */
    useAnimationFrame(() => {
        if (!loopWidth || isDragging.current) return;

        let currentX = x.get() - speed.current;

        // ⭐ WRAP CHUẨN – KHÔNG GIẬT – KHÔNG PHỤ THUỘC DIRECTION
        if (currentX <= -loopWidth) {
            currentX += loopWidth;
        } else if (currentX >= 0) {
            currentX -= loopWidth;
        }

        x.set(currentX);
    });

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
                isDragging.current = false;

                // hướng + tốc độ theo lực tay
                const v = info.velocity.x * 0.002;
                if (Math.abs(v) > 0.05) {
                    speed.current = Math.max(Math.min(v, 1), -1);
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
                                rounded-xl
                                transition-all duration-500
                                group-hover:scale-[1.04]
                                group-hover:shadow-[0_20px_40px_-15px_rgba(79,57,247,0.35)]
                            "
                        />

                        <div className="
                            absolute bottom-3 right-3
                            w-9 h-9 rounded-full
                            bg-white/80 backdrop-blur
                            flex items-center justify-center
                            opacity-0 group-hover:opacity-100
                            transition
                        ">
                            <ZoomIn size={16} className="text-[#4F39F7]" />
                        </div>
                    </div>

                    <div className="mt-3">
                        <p className="text-sm font-semibold text-black">
                            {item.title}
                        </p>
                        <p className="text-xs text-gray-500 tracking-wide">
                            {item.tools.join(" · ")}
                        </p>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

