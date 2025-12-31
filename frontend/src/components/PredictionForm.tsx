"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Loader2, Check, Sparkles, MapPin } from "lucide-react";
import { cn } from "@/utils/cn";
import { API_URL } from "@/utils/config";

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur", "Hyderabad", "Chennai", "Kolkata"];
const PROPERTY_TYPES = ["Apartment", "Villa", "Bungalow", "Studio", "Heritage Haveli", "Beach House"];

export function PredictionForm() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        city: "Mumbai",
        property_type: "Apartment",
        room_type: "Entire home/apt",
        accommodates: 2,
        bathrooms: 1,
        bedrooms: 1,
        beds: 1,
        amenities: [] as string[],
    });

    const handleInputChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Simulate API delay for dramatic effect if fast
        const startTime = Date.now();

        try {
            const res = await fetch(`${API_URL}/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, amenities: formData.amenities.join(",") }),
            });
            const data = await res.json();

            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 1000) await new Promise(r => setTimeout(r, 1000 - elapsedTime));

            if (data.success) setResult(data.predicted_price);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="prediction-form" className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-30" />

            <div className="container relative mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">Predict Your Earnings</h2>
                        <p className="text-neutral-400">AI-powered pricing for Airbnb hosts across India.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Card */}
                        <div className="lg:col-span-2">
                            <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormGroup label="Location">
                                            <CustomSelect
                                                value={formData.city}
                                                options={CITIES}
                                                onChange={(v) => handleInputChange("city", v)}
                                            />
                                        </FormGroup>
                                        <FormGroup label="Property Type">
                                            <CustomSelect
                                                value={formData.property_type}
                                                options={PROPERTY_TYPES}
                                                onChange={(v) => handleInputChange("property_type", v)}
                                            />
                                        </FormGroup>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <NumberInput label="Guests" value={formData.accommodates} onChange={(v) => handleInputChange("accommodates", v)} />
                                        <NumberInput label="Beds" value={formData.beds} onChange={(v) => handleInputChange("beds", v)} />
                                        <NumberInput label="Rooms" value={formData.bedrooms} onChange={(v) => handleInputChange("bedrooms", v)} />
                                        <NumberInput label="Baths" value={formData.bathrooms} step={0.5} onChange={(v) => handleInputChange("bathrooms", v)} />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-16 text-lg font-bold rounded-xl bg-gradient-to-r from-airbnb to-airbnb-dark hover:from-red-500 hover:to-red-600 transition-all shadow-[0_0_20px_rgba(255,90,95,0.3)] hover:shadow-[0_0_40px_rgba(255,90,95,0.5)]"
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="animate-spin" /> Analyzing Market...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 fill-current" /> Calculate Optimal Price
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Result Card */}
                        <div className="lg:col-span-1">
                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="h-full glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center border-airbnb/30 relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-airbnb/10 to-transparent rounded-3xl" />
                                        <span className="text-neutral-400 uppercase tracking-widest textxs font-bold mb-4 relative">Daily Rate</span>
                                        <div className="text-7xl font-bold text-white font-display mb-2 relative">
                                            ₹{result}
                                        </div>
                                        <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-400/10 px-3 py-1 rounded-full relative">
                                            <Check className="w-3 h-3" /> High Confidence
                                        </div>
                                        <p className="mt-8 text-sm text-neutral-500 relative">
                                            Predicted using data from similar listings in {formData.city}.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="h-full glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-neutral-600">
                                            <Sparkles className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-white font-bold text-xl mb-2">AI Ready</h3>
                                        <p className="text-neutral-500 text-sm">Fill in the details to see the magic happen.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

// Subcomponents
function FormGroup({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">{label}</label>
            {children}
        </div>
    )
}

function CustomSelect({ value, options, onChange }: { value: string, options: string[], onChange: (v: string) => void }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {options.map(opt => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onChange(opt)}
                    className={cn(
                        "px-4 py-3 rounded-xl text-sm font-medium transition-all text-left truncate relative overflow-hidden",
                        value === opt
                            ? "bg-white text-black shadow-lg"
                            : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                    )}
                >
                    {opt}
                </button>
            ))}
        </div>
    )
}

function NumberInput({ label, value, onChange, step = 1 }: { label: string, value: number, onChange: (v: number) => void, step?: number }) {
    return (
        <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-white/5 hover:border-white/10 transition-colors group">
            <span className="text-xs text-neutral-500 uppercase tracking-wider">{label}</span>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                min={0}
                step={step}
                className="w-full bg-transparent text-center text-2xl font-bold text-white focus:outline-none focus:ring-0 appearance-none m-0 p-0"
            />
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => onChange(Math.max(0, value - step))} className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-xs hover:bg-white/20">-</button>
                <button type="button" onClick={() => onChange(value + step)} className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-xs hover:bg-white/20">+</button>
            </div>
        </div>
    )
}
