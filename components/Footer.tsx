'use client'

import { Github, Facebook, Youtube, Mail, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="relative mt-32 border-t border-white/10 bg-black/40 backdrop-blur-xl">
            {/* GRADIENT LINE */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400" />

            <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">

                {/* ===== BRAND ===== */}
                <div>
                    <h3 className="text-2xl font-extrabold tracking-tight">
                        <span className="text-white">Video</span>{' '}
                        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                            Editor
                        </span>
                    </h3>

                    <p className="mt-4 text-sm text-white/60 max-w-sm leading-relaxed">
                        Cinematic video editing, short-form content & modern UI design.
                        Focused on storytelling and visual rhythm.
                    </p>
                </div>

              

                {/* ===== SOCIAL ===== */}
                <div>
                    <p className="text-sm font-semibold text-white mb-4">Connect</p>

                    <div className="flex items-center gap-4">
                        {[
                            { Icon: Facebook, href: '#' },
                            { Icon: Youtube, href: '#' },
                            { Icon: Github, href: '#' },
                            { Icon: Mail, href: 'mailto:youremail@gmail.com' },
                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                className="
                                    w-11 h-11 rounded-xl
                                    flex items-center justify-center
                                    bg-white/5 border border-white/10
                                    text-white/70
                                    hover:text-white
                                    hover:bg-gradient-to-r hover:from-indigo-400 hover:to-cyan-400
                                    hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]
                                    transition-all
                                "
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== BOTTOM ===== */}
            <div className="border-t border-white/10 py-6">
                <p className="text-center text-xs text-white/40">
                    © {new Date().getFullYear()} Văn Nhật · Video Editor & UI Designer
                </p>
            </div>
        </footer>
    )
}
