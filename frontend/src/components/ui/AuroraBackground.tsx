"use client";
import React from "react";

export function AuroraBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative overflow-hidden w-full">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[aurora_20s_linear_infinite] opacity-50 bg-[radial-gradient(circle_at_50%_50%,rgba(255,56,92,0.4),transparent_50%),radial-gradient(circle_at_0%_0%,rgba(255,160,50,0.4),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(255,56,92,0.4),transparent_50%)] blur-[100px]" />
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[aurora_15s_linear_infinite_reverse] opacity-30 bg-[radial-gradient(circle_at_100%_0%,rgba(50,100,255,0.2),transparent_50%)] blur-[80px]" />
            </div>

            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}
