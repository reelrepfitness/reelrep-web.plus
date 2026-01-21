"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const ScrollPinContainer = ({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform values based on scroll
    const rotateX = useTransform(scrollYProgress, [0, 0.5], [70, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
    const translateY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative z-50",
                containerClassName
            )}
        >
            <div
                style={{
                    perspective: "1000px",
                }}
                className="relative flex items-center justify-center"
            >
                <motion.div
                    style={{
                        rotateX,
                        scale,
                        opacity,
                        translateY,
                    }}
                    className="relative flex justify-center items-center"
                >
                    <div className={cn("relative z-50", className)}>{children}</div>
                </motion.div>
            </div>
        </div>
    );
};
