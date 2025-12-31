"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FallingHouseIntro() {
    const [phase, setPhase] = useState<'drop' | 'shatter' | 'done'>('drop');

    useEffect(() => {
        // Phase 1: Drop happens immediately on mount

        // Phase 2: Trigger shatter after drop (approx 1.2s to account for fall + bounce)
        const shatterTimer = setTimeout(() => {
            setPhase('shatter');
        }, 1200);

        // Phase 3: Cleanup
        const doneTimer = setTimeout(() => {
            setPhase('done');
        }, 3500);

        return () => {
            clearTimeout(shatterTimer);
            clearTimeout(doneTimer);
        };
    }, []);

    if (phase === 'done') return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <AnimatePresence>
                {phase === 'drop' && (
                    <motion.div
                        key="house-intact"
                        initial={{ y: "-120vh", scale: 0.5, rotate: -5 }}
                        animate={{
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            transition: {
                                type: "spring",
                                damping: 12,
                                stiffness: 120,
                                mass: 1.5,
                                delay: 0.5
                            }
                        }}
                        exit={{ opacity: 0, duration: 0 }} // Instant switch to shatter
                        className="relative"
                    >
                        <CartoonHouse />
                    </motion.div>
                )}

                {phase === 'shatter' && (
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                        {/* Debris Pieces */}
                        <motion.div
                            initial={{ x: 0, y: 0, rotate: 0 }}
                            animate={{ x: -200, y: -200, rotate: -45, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-0 left-0"
                        >
                            <RoofHalf />
                        </motion.div>

                        <motion.div
                            initial={{ x: 0, y: 0, rotate: 0 }}
                            animate={{ x: 200, y: -150, rotate: 45, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-0 right-0"
                        >
                            <RoofHalf flip />
                        </motion.div>

                        <motion.div
                            initial={{ x: 0, y: 0, rotate: 0 }}
                            animate={{ x: -150, y: 150, rotate: -20, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute bottom-0 left-0"
                        >
                            <WallPiece />
                        </motion.div>

                        <motion.div
                            initial={{ x: 0, y: 0, rotate: 0 }}
                            animate={{ x: 150, y: 200, rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute bottom-0 right-0"
                        >
                            <WallPiece />
                        </motion.div>

                        <motion.div
                            initial={{ y: 0, scale: 1 }}
                            animate={{ y: 50, scale: 0.8, rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        >
                            <Door />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- Cartoon House SVG Parts ---

function CartoonHouse() {
    return (
        <svg viewBox="0 0 200 200" className="w-64 h-64 md:w-96 md:h-96 drop-shadow-2xl">
            {/* Base */}
            <path d="M40 80 L160 80 L160 180 L40 180 Z" fill="#FFC107" stroke="#333" strokeWidth="4" />
            {/* Roof */}
            <path d="M20 80 L100 20 L180 80" fill="#FF5722" stroke="#333" strokeWidth="4" />
            {/* Door */}
            <rect x="85" y="120" width="30" height="60" fill="#795548" stroke="#333" strokeWidth="3" />
            {/* Window */}
            <circle cx="100" cy="65" r="15" fill="#2196F3" stroke="#333" strokeWidth="3" />
            <path d="M100 50 L100 80 M85 65 L115 65" stroke="#333" strokeWidth="2" />
        </svg>
    )
}

function RoofHalf({ flip }: { flip?: boolean }) {
    return (
        <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-48 md:h-48 drop-shadow-lg" style={flip ? { transform: "scaleX(-1)" } : {}}>
            <path d="M20 80 L100 20 L100 80 Z" fill="#FF5722" stroke="#333" strokeWidth="4" />
        </svg>
    )
}

function WallPiece() {
    return (
        <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-48 md:h-48 drop-shadow-lg">
            <path d="M0 0 L60 0 L60 100 L0 100 Z" fill="#FFC107" stroke="#333" strokeWidth="4" />
        </svg>
    )
}

function Door() {
    return (
        <svg viewBox="0 0 50 100" className="w-16 h-32 md:w-24 md:h-48 drop-shadow-lg">
            <rect x="10" y="10" width="30" height="60" fill="#795548" stroke="#333" strokeWidth="3" />
        </svg>
    )
}
