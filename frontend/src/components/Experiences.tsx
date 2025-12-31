"use client";
import { motion } from "framer-motion";
import { MapPin, Home, Sparkles, TrendingUp } from "lucide-react";

const STEPS = [
    { icon: MapPin, title: "Select Location", desc: "Choose from 8+ major Indian cities including Mumbai, Goa, and Jaipur." },
    { icon: Home, title: "Input Details", desc: "Specify property type, room count, and amenities to match your listing." },
    { icon: Sparkles, title: "AI Analysis", desc: "Our model analyzes 50,000+ real-time data points to find your optimal price." },
    { icon: TrendingUp, title: "Maximize Revenue", desc: "Get a confidence-backed price prediction to boost your yearly earnings." },
];

export function Experiences() {
    return (
        <section className="min-h-[800px] bg-white pt-10 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
                    <p className="text-gray-500">From input to insight in milliseconds.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-airbnb-hover transition-all duration-300 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <step.icon className="w-32 h-32 text-rose-500" />
                            </div>

                            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-6">
                                <step.icon className="w-6 h-6" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
