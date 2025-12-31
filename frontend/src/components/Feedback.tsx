"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, MessageSquare } from "lucide-react";

export function Feedback() {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Feedback submitted:", { rating, comment });
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
            setRating(0);
            setComment("");
            setSubmitted(false);
        }, 3000);
    };

    return (
        <section className="min-h-[800px] bg-white pt-10 pb-20 px-6">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">Share Your Feedback</h2>
                    <p className="text-gray-500">Help us improve your experience with AI-powered predictions.</p>
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center"
                    >
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
                        <p className="text-green-600">Your feedback has been received.</p>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg"
                    >
                        {/* Star Rating */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-4">
                                How would you rate your experience?
                            </label>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="p-1 transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-10 h-10 transition-colors ${
                                                star <= (hoveredRating || rating)
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            {rating > 0 && (
                                <p className="text-center text-sm text-gray-500 mt-2">
                                    {rating === 5 && "Excellent!"}
                                    {rating === 4 && "Great!"}
                                    {rating === 3 && "Good"}
                                    {rating === 2 && "Fair"}
                                    {rating === 1 && "Needs Improvement"}
                                </p>
                            )}
                        </div>

                        {/* Comment Textarea */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                Tell us more (optional)
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts, suggestions, or any issues you encountered..."
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none text-gray-700"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={rating === 0}
                            className="w-full bg-[#FF385C] hover:bg-[#D90B3E] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full h-14 flex items-center justify-center gap-2 transition-all font-bold text-sm shadow-md"
                        >
                            <Send className="w-5 h-5" />
                            Submit Feedback
                        </button>
                    </motion.form>
                )}
            </div>
        </section>
    );
}
