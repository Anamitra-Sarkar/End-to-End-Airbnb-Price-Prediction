import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, MapPin, TrendingUp } from "lucide-react";
import Image from "next/image";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen min-h-[900px] flex items-center justify-center overflow-hidden bg-black">
            {/* Parallax Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-10" />
                <Image
                    src="/hero-bg.png"
                    alt="Abstract City"
                    fill
                    className="object-cover object-center opacity-80"
                    priority
                />
            </motion.div>

            <div className="container relative z-20 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="space-y-8"
                >
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        <div className="w-2 h-2 rounded-full bg-airbnb animate-pulse" />
                        <span className="text-xs font-medium text-white/80 tracking-wider uppercase">India Market Data</span>
                    </motion.div>

                    <motion.h1
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9]"
                    >
                        Predict <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Value.</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-airbnb to-rose-500">Maximize.</span>
                    </motion.h1>

                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-lg md:text-xl text-neutral-400 max-w-lg leading-relaxed font-light"
                    >
                        AI-powered pricing insights for Airbnb hosts across India. From beach houses in Goa to heritage stays in Jaipur.
                    </motion.p>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="flex flex-wrap items-center gap-4 pt-4"
                    >
                        <Button
                            size="lg"
                            variant="airbnb"
                            className="h-14 px-8 rounded-full text-lg font-semibold shadow-[0_0_40px_-10px_rgba(255,90,95,0.6)] hover:shadow-[0_0_60px_-10px_rgba(255,90,95,0.8)] transition-all duration-500"
                            onClick={() => document.getElementById('prediction-form')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Start Prediction <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-white/20 text-white hover:bg-white/10 glass">
                            View Methodology
                        </Button>
                    </motion.div>

                    <div className="pt-8 flex items-center gap-8 border-t border-white/10">
                        <div>
                            <div className="text-3xl font-bold text-white font-display">98.5%</div>
                            <div className="text-sm text-neutral-500">Accuracy</div>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div>
                            <div className="text-3xl font-bold text-white font-display">250ms</div>
                            <div className="text-sm text-neutral-500">Latency</div>
                        </div>
                    </div>
                </motion.div>

                {/* 3D Visuals / Cards */}
                <div className="relative hidden lg:block h-[600px] w-full">
                    {/* Animated Floating Cards */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 right-10 z-20"
                    >
                        <GlassCard city="Mumbai" price="₹8,500" trend="+12%" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -30, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-60 left-10 z-10"
                    >
                        <GlassCard city="Goa" price="₹12,000" trend="+18%" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -25, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-20 right-40 z-30"
                    >
                        <GlassCard city="Bangalore" price="₹6,200" trend="+9%" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function GlassCard({ city, price, trend }: { city: string, price: string, trend: string }) {
    return (
        <div className="w-64 p-4 rounded-2xl glass-card border border-white/10 relative overflow-hidden group hover:scale-105 transition-transform duration-500">
            <div className="absolute top-0 right-0 p-4 opacity-50">
                <TrendingUp className="w-12 h-12 text-white/5" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-airbnb uppercase tracking-wider">Recommended</span>
                <h3 className="text-xl font-bold text-white">{city}</h3>
            </div>
            <div className="mt-6 flex items-end justify-between">
                <div>
                    <span className="text-xs text-neutral-400">Nightly Rate</span>
                    <div className="text-3xl font-bold text-white font-display">{price}</div>
                </div>
                <div className="px-2 py-1 rounded bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold">
                    {trend}
                </div>
            </div>
        </div>
    )
}
