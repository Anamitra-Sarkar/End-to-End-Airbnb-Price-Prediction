"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ScrollReveal({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                    duration: 0.8,
                    ease: "easeOut"
                }
            }}
            viewport={{ once: true, margin: "-100px" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
