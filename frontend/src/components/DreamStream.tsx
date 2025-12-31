"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const COLUMN_1 = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
];

const COLUMN_2 = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=800&auto=format&fit=crop",
];

const COLUMN_3 = [
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512914890251-2f96a9b0bbe2?q=80&w=800&auto=format&fit=crop",
];

export function DreamStream() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

    // Create Parallax transforms
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <main ref={containerRef} className="relative h-[800px] overflow-hidden bg-white">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 h-full">
                <Column images={COLUMN_1} y={y1} />
                <Column images={COLUMN_2} y={y2} className="hidden md:flex translate-y-[-100px]" />
                <Column images={COLUMN_3} y={y3} className="hidden md:flex" />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-white via-white/80 to-transparent z-10 flex items-end justify-center pb-20 pointer-events-none">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center tracking-tight">
                    Every Home has <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Perfect Value.</span>
                </h2>
            </div>
        </main>
    );
}

function Column({ images, y, className = "" }: { images: string[], y: any, className?: string }) {
    return (
        <motion.div style={{ y }} className={`flex flex-col gap-8 ${className}`}>
            {images.map((src, i) => (
                <motion.div
                    key={i}
                    whileHover={{
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: 5,
                        boxShadow: "0px 20px 40px rgba(255, 56, 92, 0.3)",
                        z: 50
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ perspective: 1000 }}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl brightness-105 transition-all duration-300 transform-gpu"
                >
                    <Image src={src} alt="Luxury Home" fill className="object-cover" />
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
            ))}
            {/* Repeat for seamless loop illusion */}
            {images.map((src, i) => (
                <motion.div
                    key={`dup-${i}`}
                    whileHover={{
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: 5,
                        boxShadow: "0px 20px 40px rgba(255, 56, 92, 0.3)",
                        z: 50
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ perspective: 1000 }}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl brightness-105 transition-all duration-300 transform-gpu"
                >
                    <Image src={src} alt="Luxury Home" fill className="object-cover" />
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
            ))}
        </motion.div>
    )
}
