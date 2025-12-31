"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur", "Hyderabad", "Chennai", "Kolkata"];
const PROPERTY_TYPES = ["Apartment", "Villa", "Bungalow", "Studio", "Heritage Haveli", "Beach House"];

export function SearchForm({ onPredict }: { onPredict: (price: number) => void }) {
    const [city, setCity] = useState("Mumbai");
    const [propertyType, setPropertyType] = useState("Apartment");
    const [guests, setGuests] = useState(2);
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        setLoading(true);
        // Simulate API
        const startTime = Date.now();
        try {
            const res = await fetch("/api/index", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    city,
                    property_type: propertyType,
                    accommodates: guests,
                    // defaults
                    room_type: "Entire home/apt",
                    bedrooms: 1,
                    beds: 1,
                    bathrooms: 1,
                    amenities: ""
                }),
            });
            const data = await res.json();
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 800) await new Promise(r => setTimeout(r, 800 - elapsedTime));

            if (data.success) {
                onPredict(data.predicted_price);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="pt-4 pb-10 border-b border-gray-200 bg-white sticky top-20 z-40 transition-all">
            <div className="container mx-auto px-6 flex flex-col items-center">


                {/* The Pill */}
                <div className="w-full max-w-4xl bg-white rounded-full border border-gray-200 shadow-airbnb flex items-center p-0 relative overflow-visible h-[66px]">

                    {/* Where */}
                    <div className="flex-1 px-8 py-3 hover:bg-gray-100 rounded-full cursor-pointer relative group border-r border-gray-200">
                        <label className="block text-xs font-bold text-black tracking-wider">Where</label>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-600 font-medium focus:outline-none appearance-none cursor-pointer"
                        >
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Type */}
                    <div className="flex-1 px-8 py-3 hover:bg-gray-100 rounded-full cursor-pointer relative group border-r border-gray-200">
                        <label className="block text-xs font-bold text-black tracking-wider">Property Type</label>
                        <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-600 font-medium focus:outline-none appearance-none cursor-pointer"
                        >
                            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    {/* Guests */}
                    <div className="flex-0.8 px-8 py-3 hover:bg-gray-100 rounded-full cursor-pointer relative group">
                        <label className="block text-xs font-bold text-black tracking-wider">Who</label>
                        <div className="text-sm text-gray-600 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                            <input
                                type="number"
                                min={1}
                                max={16}
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                className="w-12 bg-transparent focus:outline-none"
                            /> guests
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="pr-2 pl-2">
                        <button
                            onClick={handlePredict}
                            disabled={loading}
                            className="bg-[#FF385C] hover:bg-[#D90B3E] text-white rounded-full h-12 px-6 flex items-center gap-2 transition-all font-bold text-sm shadow-md"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5 stroke-[2.5px]" />}
                            {loading ? "Calculating..." : "Predict"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
