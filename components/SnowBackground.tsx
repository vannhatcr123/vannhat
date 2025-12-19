'use client';

import { motion } from "framer-motion";

export default function SnowBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-80"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: -20,
                        opacity: Math.random(),
                    }}
                    animate={{
                        y: window.innerHeight + 50,
                    }}
                    transition={{
                        duration: 8 + Math.random() * 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
}
