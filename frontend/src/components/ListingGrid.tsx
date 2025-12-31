"use client";
import { Star, Heart } from "lucide-react";
import Image from "next/image";

const LISTINGS = [
    { city: "Mumbai", title: "Seaview Apartment", price: "8,500", rating: "4.9", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80" },
    { city: "Goa", title: "Beachside Villa", price: "12,000", rating: "4.8", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
    { city: "Delhi", title: "Modern Studio", price: "4,200", rating: "4.7", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
    { city: "Bangalore", title: "Garden Penthouse", price: "6,500", rating: "5.0", img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80" },
    { city: "Jaipur", title: "Heritage Haveli", price: "9,800", rating: "4.9", img: "https://images.unsplash.com/photo-1470713836263-ea0078028741?auto=format&fit=crop&w=800&q=80" },
    { city: "Hyderabad", title: "Luxury Condo", price: "5,500", rating: "4.8", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" },
    { city: "Chennai", title: "Ocean View", price: "4,900", rating: "4.6", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80" },
    { city: "Kolkata", title: "City Center Flat", price: "3,800", rating: "4.7", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80" },
];

export function ListingGrid() {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {LISTINGS.map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 mb-3">
                            <Image
                                src={item.img}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 text-white/50 hover:scale-110 transition-transform">
                                <Heart className="w-6 h-6 fill-black/50 stroke-white" />
                            </div>
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold text-black">
                                Guest favorite
                            </div>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-black text-[15px]">{item.city}, India</h3>
                                <p className="text-gray-500 text-[15px] leading-snug">{item.title}</p>
                                <p className="text-gray-500 text-[15px]">Oct 22-27</p>
                                <div className="mt-1 flex items-baseline gap-1">
                                    <span className="font-semibold text-black text-[15px]">₹{item.price}</span>
                                    <span className="text-black text-[15px]">night</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-[15px]">
                                <Star className="w-3 h-3 fill-black text-black" />
                                <span>{item.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
