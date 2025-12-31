"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { User, ChevronDown, BarChart2, Settings, Menu, X } from "lucide-react";
import { PredictionHistoryModal, PredictionRecord } from "./PredictionHistoryModal";
import { SettingsModal } from "./SettingsModal";

// Helper function to load prediction history from localStorage
function loadPredictionHistory(): PredictionRecord[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('prediction_history');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return [];
        }
    }
    return [];
}

export function Navbar({ activeTab, onTabChange }: { activeTab?: string, onTabChange?: (tab: string) => void }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [predictionHistory, setPredictionHistory] = useState<PredictionRecord[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Safe default handlers if props are missing
    const handleTabChange = (tab: string) => {
        if (onTabChange) onTabChange(tab);
        setIsMobileMenuOpen(false);
    };

    // Open history modal and load data
    const openHistoryModal = useCallback(() => {
        setPredictionHistory(loadPredictionHistory());
        setIsHistoryModalOpen(true);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClearHistory = () => {
        localStorage.removeItem('prediction_history');
        setPredictionHistory([]);
    };

    const TABS = ["Home", "Feedback", "About", "Contact"];

    const PROFILE_MENU = [
        { icon: BarChart2, label: "My Predictions", action: openHistoryModal },
        { icon: Settings, label: "Settings", action: () => setIsSettingsModalOpen(true) },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 transition-colors">
                <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleTabChange("Home")}>
                        <svg width="32" height="32" fill="current" style={{ color: "#FF385C" }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 3.25.722 4.933-.483 4.336-3.6 7.587-7.951 7.587-3.088 0-5.864-1.782-6.985-4.408l-.315-.8-.315.8c-1.121 2.626-3.897 4.408-6.985 4.408-4.351 0-7.468-3.251-7.951-7.587-.188-1.683.055-3.342.722-4.933l.144-.353c.987-2.296 5.148-11.006 7.102-14.836l.533-1.025C12.536 1.963 13.992 1 16 1zm0 2c-1.273 0-2.294.753-3.078 2.158l-.42.808c-1.554 3.046-6.009 12.247-6.848 14.195l-.123.3-.122.316c-.503 1.354-.664 2.583-.497 3.844.331 2.506 2.193 4.382 4.771 4.382 2.306 0 4.379-1.391 5.145-3.486l1.172-2.977 1.171 2.977c.767 2.095 2.84 3.486 5.146 3.486 2.578 0 4.44-1.876 4.771-4.382.167-1.261.006-2.49-.497-3.844l-.122-.316-.123-.3c-.84-1.948-5.295-11.149-6.848-14.195l-.42-.808C18.294 3.753 17.273 3 16 3z"></path>
                        </svg>
                        <span className="text-[#FF385C] font-black text-xl tracking-tight hidden md:block">AIrBnb Predict</span>
                    </div>

                    {/* Center Tabs - Desktop */}
                    <div className="hidden md:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`text-sm px-4 py-2 rounded-full transition-colors ${
                                    activeTab === tab || (!activeTab && tab === "Home")
                                        ? "font-bold text-black dark:text-white bg-gray-100 dark:bg-slate-700"
                                        : "font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Right Side - Mobile Menu Button & User Avatar */}
                    <div className="flex items-center gap-2">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            )}
                        </button>

                        {/* User Avatar with Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 p-0.5 shadow-lg hover:scale-105 transition-transform">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <User className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                                    </div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform hidden md:block ${isProfileOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                                    </div>
                                    {PROFILE_MENU.map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                item.action();
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            <item.icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-700 px-4 py-4">
                        <div className="flex flex-col gap-2">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`text-left text-sm px-4 py-3 rounded-xl transition-colors ${
                                        activeTab === tab || (!activeTab && tab === "Home")
                                            ? "font-bold text-black dark:text-white bg-gray-100 dark:bg-slate-700"
                                            : "font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Modals */}
            <PredictionHistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                history={predictionHistory}
                onClearHistory={handleClearHistory}
            />
            <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
            />
        </>
    );
}
