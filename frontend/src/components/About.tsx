"use client";
import { motion } from "framer-motion";
import { Brain, MapPin, TrendingUp, Users, Sparkles, BarChart3 } from "lucide-react";

const FEATURES = [
    {
        icon: Brain,
        title: "AI-Powered Predictions",
        desc: "Leveraging advanced machine learning models trained on Indian real estate data."
    },
    {
        icon: MapPin,
        title: "6+ Indian Cities",
        desc: "Coverage across Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and Kolkata."
    },
    {
        icon: TrendingUp,
        title: "Market Insights",
        desc: "Real-time price predictions based on location, property type, and amenities."
    },
    {
        icon: BarChart3,
        title: "Data-Driven",
        desc: "Trained on thousands of property listings to ensure accurate pricing."
    }
];

const TEAM_STATS = [
    { value: "2000+", label: "Data Points" },
    { value: "6", label: "Indian Cities" },
    { value: "97%", label: "R² Score" },
    { value: "24/7", label: "Availability" }
];

export function About() {
    return (
        <section className="min-h-[800px] bg-white pt-10 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">
                        AI-Powered Real Estate Analytics for India
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Empowering property owners and hosts with intelligent price predictions
                        tailored specifically for the Indian market.
                    </p>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {TEAM_STATS.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="text-3xl font-bold text-rose-500 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-8 md:p-12 mb-16 border border-rose-100"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed">
                        We believe that every property owner deserves access to data-driven insights.
                        Our AI model analyzes multiple factors including location, property characteristics,
                        and market trends to provide accurate price predictions in Indian Rupees (₹).
                        Whether you&apos;re listing in Mumbai&apos;s bustling neighborhoods or Kolkata&apos;s
                        heritage areas, our platform helps you price your property competitively.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        What Sets Us Apart
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FEATURES.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 + i * 0.05 }}
                                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Technology Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Built With</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Python", "Scikit-Learn", "React", "Next.js", "TailwindCSS", "Flask"].map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
