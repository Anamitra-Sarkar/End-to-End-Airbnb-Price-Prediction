"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

const CONTACT_INFO = [
    {
        icon: Mail,
        label: "Email",
        value: "support@email.com",
        href: "mailto:support@email.com"
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+91 XXXXX XXXXX",
        href: "tel:+91XXXXXXXXXX"
    }
];

const OFFICE_HOURS = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM IST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM IST" },
    { day: "Sunday", hours: "Closed" }
];

export function Contact() {
    return (
        <section className="min-h-[800px] bg-white pt-10 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">Get In Touch</h2>
                    <p className="text-gray-500 max-w-lg mx-auto">
                        Have questions about our AI pricing predictions? We&apos;re here to help.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        {CONTACT_INFO.map((contact, i) => (
                            <a
                                key={i}
                                href={contact.href}
                                className="block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-rose-200 transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <contact.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500 mb-1">{contact.label}</p>
                                        <p className="text-lg font-bold text-gray-900 group-hover:text-rose-500 transition-colors">
                                            {contact.value}
                                        </p>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-rose-400 transition-colors" />
                                </div>
                            </a>
                        ))}

                        {/* Location Card */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                                    <p className="text-lg font-bold text-gray-900">India</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Serving all major cities across the country
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Office Hours Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-100 rounded-2xl p-6 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Support Hours</h3>
                            </div>
                            
                            <div className="space-y-4">
                                {OFFICE_HOURS.map((schedule, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center py-3 border-b border-rose-100 last:border-0"
                                    >
                                        <span className="font-medium text-gray-700">{schedule.day}</span>
                                        <span className={`text-sm ${schedule.hours === "Closed" ? "text-gray-400" : "text-gray-600"}`}>
                                            {schedule.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-white/50 rounded-xl">
                                <p className="text-sm text-gray-600">
                                    <span className="font-bold">Quick Tip:</span> For fastest response,
                                    email us with your query and we&apos;ll get back to you within 24 hours.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* FAQ Teaser */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 text-center bg-gray-50 rounded-2xl p-8"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Common Questions?
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Our AI model is trained specifically on Indian property data and provides
                        predictions in INR (₹). For accuracy insights, check out the About page.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                            How accurate are predictions?
                        </span>
                        <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                            Which cities are supported?
                        </span>
                        <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                            How is the price calculated?
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
