'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const icons = [
    { src: '/icon/Ae.png', size: 64 },
    { src: '/icon/Pr.png', size: 64 },
    { src: '/icon/Ps.png', size: 60 },
    { src: '/icon/Dn.png', size: 58 },
    { src: '/icon/Ai.png', size: 58 },
]

function random(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export default function FloatingIcons() {
    const [items, setItems] = useState<any[]>([])

    // ✅ HOOK CHỈ GỌI 1 LẦN
    const { scrollYProgress } = useScroll()
    const scrollBase = useTransform(scrollYProgress, [0, 1], [0, 160])

    useEffect(() => {
        const COUNT = 16

        const generated = Array.from({ length: COUNT }).map((_, i) => {
            const icon = icons[i % icons.length]
            return {
                id: i,
                ...icon,
                x: random(-200, window.innerWidth - 100),
                y: random(-200, window.innerHeight - 100),
                dx: random(-220, 220),
                dy: random(-220, 220),
                rotate: random(-180, 180),
                duration: random(14, 26),
                scrollFactor: random(0.15, 0.45), // 👈 mỗi icon phản ứng scroll khác nhau
            }
        })

        setItems(generated)
    }, [])

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* GLASS BACKGROUND */}
            <div className="absolute inset-0 bg-glass-gradient backdrop-blur-[120px]" />

            {items.map(item => (
                <motion.div
                    key={item.id}
                    initial={{
                        x: item.x,
                        y: item.y,
                        rotate: item.rotate,
                        opacity: 0,
                    }}
                    animate={{
                        x: item.x + item.dx,
                        y: item.y + item.dy,
                        rotate: item.rotate + 360,
                        opacity: 1,
                    }}
                    style={{
                        y: scrollBase.get() * item.scrollFactor, // ✅ dùng transform đã tạo sẵn
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'linear',
                    }}
                    className="absolute"
                >
                    {/* GLOW */}
                    <div className="absolute inset-0 blur-xl opacity-60 bg-indigo-400/30 rounded-full" />

                    <Image
                        src={item.src}
                        alt="icon"
                        width={item.size}
                        height={item.size}
                        className="relative drop-shadow-[0_0_18px_rgba(99,102,241,0.45)]"
                        draggable={false}
                    />
                </motion.div>
            ))}
        </div>
    )
}
