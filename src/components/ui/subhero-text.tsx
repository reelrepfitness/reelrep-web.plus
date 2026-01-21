"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SubHeroTextProps {
    className?: string;
}

export function SubHeroText({ className }: SubHeroTextProps) {
    // Default text color is gray-900 unless overridden
    const textColorClass = className?.includes('text-') ? '' : 'text-gray-900';

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={cn("mt-12 md:mt-16 max-w-4xl mx-auto relative z-50 text-center px-4", className)}
            dir="rtl"
        >
            <h3 className={cn("text-2xl md:text-4xl font-black leading-tight mb-0 md:mb-1 drop-shadow-sm", textColorClass)}>
                אפליקציית תזונה חכמה שנותנת לכם{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA09B] to-[#128a86]">
                    שליטה מלאה.
                </span>
            </h3>
            <div className={cn("text-2xl md:text-4xl font-black drop-shadow-sm flex flex-row flex-wrap justify-center gap-2 md:gap-3", textColorClass)}>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    בלי לשקול.
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    בלי לנחש.
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA09B] to-[#128a86]"
                >
                    רק תוצאות.
                </motion.span>
            </div>
        </motion.div>
    );
}
