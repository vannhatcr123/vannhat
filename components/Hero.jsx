'use client'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section className="h-screen flex items-center justify-center bg-black text-white">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center"
            >
                <h1 className="text-5xl font-bold mb-4">
                    Video Editor Portfolio
                </h1>
                <p className="text-gray-400">
                    Cinematic • Short-form • YouTube
                </p>
            </motion.div>
        </section>
    )
}
