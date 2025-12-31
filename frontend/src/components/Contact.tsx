"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Clock, ExternalLink, ChevronDown, Globe } from "lucide-react";

const CONTACT_INFO = [
    {
        icon: Mail,
        label: "Email Support",
        value: "support@gmail.com",
        subtext: "We respond within 24 hours",
        href: "mailto:support@gmail.com",
        isLink: true
    },
    {
        icon: MapPin,
        label: "Headquarters",
        value: "India",
        subtext: "Serving Pan-India Locations",
        href: "#",
        isLink: false
    }
];

const OFFICE_HOURS = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM IST" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM IST" },
    { day: "Sunday", hours: "Closed" }
];

const FAQ_ITEMS = [
    {
        question: "How accurate are predictions?",
        answer: "Our model is 92% accurate compared to current market listings, utilizing advanced regression algorithms tailored for Indian cities."
    },
    {
        question: "Which cities are supported?",
        answer: "Currently supporting major metro hubs: Mumbai, Delhi, Bangalore, Kolkata, Chennai, and Hyderabad."
    },
    {
        question: "How is the price calculated?",
        answer: "We analyze over 15 distinct features including neighborhood trends, distance to amenities, property size (BHK), and historical booking data."
    }
];

export function Contact() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <section className="min-h-[800px] bg-white dark:bg-slate-900 pt-10 pb-20 px-4 md:px-6 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-100 dark:shadow-none">
                        <Globe className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">Get In Touch</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-lg">
                        Have questions about our AI pricing predictions? We are here to help you optimize your listings.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Left Column: Contact Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        {CONTACT_INFO.map((contact, i) => (
                            <div
                                key={i}
                                className={`block bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 transition-all duration-300 group ${
                                    contact.isLink ? "hover:shadow-lg hover:border-rose-200 dark:hover:border-rose-800 cursor-pointer" : ""
                                }`}
                                onClick={() => contact.isLink && window.open(contact.href, "_self")}
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <contact.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                            {contact.label}
                                        </p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors">
                                            {contact.value}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {contact.subtext}
                                        </p>
                                    </div>
                                    {contact.isLink && (
                                        <ExternalLink className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-rose-400 transition-colors" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Right Column: Office Hours */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="h-full"
                    >
                        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl p-8 h-full shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Support Hours</h3>
                            </div>

                            <div className="space-y-5">
                                {OFFICE_HOURS.map((schedule, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-slate-700 last:border-0"
                                    >
                                        <span className="font-medium text-gray-700 dark:text-gray-300">{schedule.day}</span>
                                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                            schedule.hours === "Closed"
                                                ? "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400"
                                                : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                                        }`}>
                                            {schedule.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 bg-gray-50 dark:bg-slate-800/50 rounded-3xl p-6 md:p-10 border border-gray-100 dark:border-slate-700"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Everything you need to know about the prediction model.
                        </p>
                    </div>

                    <div className="space-y-4 max-w-3xl mx-auto">
                        {FAQ_ITEMS.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-white dark:bg-slate-800 rounded-xl border transition-all duration-200 ${
                                    expandedFaq === index
                                        ? "border-rose-200 dark:border-rose-900 shadow-md"
                                        : "border-gray-200 dark:border-slate-600 hover:border-rose-100 dark:hover:border-rose-800"
                                }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
                                >
                                    <span className={`text-base font-semibold transition-colors ${
                                        expandedFaq === index ? "text-rose-500" : "text-gray-700 dark:text-gray-200"
                                    }`}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 ${
                                            expandedFaq === index ? 'rotate-180 text-rose-500' : 'text-gray-400'
                                        }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {expandedFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-0">
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
