"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MagicCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add particle to trail
            const newParticle = { x: e.clientX, y: e.clientY, id: Date.now() };
            setTrail((prev) => [...prev.slice(-20), newParticle]); // Limit trail length
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    // Cleanup old particles
    useEffect(() => {
        const interval = setInterval(() => {
            setTrail(prev => prev.filter(p => Date.now() - p.id < 500));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div
                className="fixed w-4 h-4 rounded-full border-2 border-rose-500 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
                style={{ left: mousePosition.x, top: mousePosition.y }}
            />
            <AnimatePresence>
                {trail.map((particle, index) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed pointer-events-none z-[9998] w-2 h-2 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            transform: "translate(-50%, -50%)"
                        }}
                    />
                ))}
            </AnimatePresence>
        </>
    );
}
