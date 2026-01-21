"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

interface ParticleData {
    id: number;
    x: number;
    y: number;
    src: string;
}

export const CoolMode = ({
    children,
    options,
}: {
    children: React.ReactNode;
    options?: { particle?: string };
}) => {
    const [particles, setParticles] = useState<ParticleData[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const particleImage = options?.particle || "/images/icon.png";

        const newParticles = Array.from({ length: 10 }).map((_, i) => ({
            id: Date.now() + i,
            x,
            y,
            src: particleImage,
        }));

        setParticles((prev) => [...prev, ...newParticles]);

        setTimeout(() => {
            setParticles((prev) =>
                prev.filter((p) => !newParticles.some((np) => np.id === p.id))
            );
        }, 1200);
    };

    return (
        <div className="relative cursor-pointer" onClick={handleClick}>
            {children}
            <AnimatePresence>
                {particles.map((particle) => {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 50 + Math.random() * 100;
                    const endX = Math.cos(angle) * distance;
                    const endY = Math.sin(angle) * distance + 50;

                    return (
                        <motion.div
                            key={particle.id}
                            className="absolute pointer-events-none"
                            initial={{
                                x: particle.x,
                                y: particle.y,
                                opacity: 1,
                                scale: 0.5,
                            }}
                            animate={{
                                x: particle.x + endX,
                                y: particle.y + endY,
                                opacity: 0,
                                scale: 1,
                                rotate: Math.random() * 360,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
                        >
                            <Image
                                src={particle.src}
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6 object-contain"
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};
