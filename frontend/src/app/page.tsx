"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchForm } from "@/components/SearchForm";
import { DreamStream } from "@/components/DreamStream";
import { PredictionReveal } from "@/components/PredictionReveal";
import { Feedback } from "@/components/Feedback";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { MagicCursor } from "@/components/ui/MagicCursor";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { FallingHouseIntro } from "@/components/ui/FallingHouseIntro";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [result, setResult] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Homes");

  return (
    <main className="min-h-screen bg-white">
      {/* Global Effects */}
      <MagicCursor />
      <FallingHouseIntro />

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "Homes" && (
        <>
          {/* Magic Header with Aurora Background */}
          <AuroraBackground>
            <div className="pt-28 pb-6 text-center relative z-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500 tracking-tighter drop-shadow-sm pb-2 animate-[text_3s_ease-in-out_infinite]">
                  Unlock the Magic.
                </h1>
                <p className="text-gray-400 text-xs font-bold tracking-[0.3em] uppercase">AI-Powered Price Prediction</p>
              </motion.div>
            </div>
          </AuroraBackground>

          <ScrollReveal className="relative z-20">
            <SearchForm onPredict={setResult} />
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {result === null ? (
              <motion.div
                key="dream-stream"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
              >
                <DreamStream />
              </motion.div>
            ) : (
              <motion.div
                key="prediction-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PredictionReveal price={result} onReset={() => setResult(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {activeTab === "Feedback" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-32" /> {/* Spacer for fixed navbar */}
          <Feedback />
        </motion.div>
      )}

      {activeTab === "About" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-32" /> {/* Spacer for fixed navbar */}
          <About />
        </motion.div>
      )}

      {activeTab === "Contact" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-32" /> {/* Spacer for fixed navbar */}
          <Contact />
        </motion.div>
      )}

      <ScrollReveal>
        <footer className="py-8 bg-gray-50 border-t border-gray-200 text-center mt-auto">
          <p className="text-gray-400 text-sm">
            &copy; 2025 AIrBnb Predict, Inc.
          </p>
        </footer>
      </ScrollReveal>
    </main>
  );
}
