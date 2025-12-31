"use client";
import { motion } from "framer-motion";
import { RefreshCcw, Star, CheckCircle } from "lucide-react";

export function PredictionReveal({ price, onReset }: { price: number, onReset: () => void }) {
    return (
        <section className="h-[600px] flex items-center justify-center relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-white">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] animate-pulse" />
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="relative z-10 w-full max-w-lg mx-6"
            >
                {/* The Golden Ticket Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_-15px_rgba(255,56,92,0.3)] rounded-[40px] p-8 md:p-12 text-center relative overflow-hidden group">

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0 pointer-events-none" />

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/50 text-green-700 text-sm font-bold mb-6 border border-green-200">
                            <CheckCircle className="w-4 h-4" /> High Confidence
                        </div>

                        <h3 className="text-gray-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">Optimal Nightly Rate</h3>

                        <div className="flex items-center justify-center gap-1 mb-6">
                            <span className="text-4xl text-gray-400 font-light translate-y-[-8px]">₹</span>
                            <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 tracking-tighter">
                                {price.toLocaleString('en-IN')}
                            </span>
                        </div>

                        <p className="text-gray-500 text-lg mb-8 max-w-xs mx-auto leading-relaxed">
                            Based on your location, amenities, and current market demand.
                        </p>

                        <button
                            onClick={onReset}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-rose-500 transition-colors text-sm font-semibold tracking-wide uppercase hover:underline"
                        >
                            <RefreshCcw className="w-4 h-4" /> Recalculate
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
