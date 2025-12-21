'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section
            id="home"
            className="
                relative min-h-screen w-full
                flex items-center
                bg-transparent
            "
        >
            <div className="max-w-7xl mx-auto w-full">
                {/* 12 columns layout */}
                <div className="grid grid-cols-12 items-center">

                    {/* ===== IMAGE BANNER ===== */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="
    col-span-12
    relative
    w-[92vw]
    max-w-[1200px]
    h-[360px]
    md:h-[460px]
    lg:h-[520px]
    mx-auto
    -mt-30
    md:-mt-10
    rounded-3xl
    overflow-hidden
"


                    >
                        <Image
                            src="/image/12.jpg"
                            alt="Video Editor Banner"
                            fill
                            priority
                            className="
                                object-cover
                                brightness-100
                                contrast-100
                            "
                        />

                        {/* overlay rất nhẹ – chỉ để chữ / UI nổi nếu sau này dùng */}
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
