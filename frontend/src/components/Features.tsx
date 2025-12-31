"use client";
import { motion } from "framer-motion";
import { Zap, Shield, Smartphone, Globe } from "lucide-react";

const FEATURES = [
    { icon: Zap, title: "Instant Results", desc: "Get pricing in under 300ms." },
    { icon: Shield, title: "Built for India", desc: "Trained on Indian listings." },
    { icon: Globe, title: "8+ Cities", desc: "Mumbai to Jaipur covered." },
    { icon: Smartphone, title: "Mobile First", desc: "Works on any device." },
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-neutral-950 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 rounded-3xl"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-airbnb">
                                <feat.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                            <p className="text-neutral-500">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
