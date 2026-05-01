"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HeroPhoneMockup() {
  const prefersReducedMotion = useReducedMotion();
  const [animatingIn, setAnimatingIn] = useState(true);

  const scrollToSignup = () => {
    document
      .getElementById("signup")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{ perspective: "1200px" }}
      className="mt-8 relative z-30 flex items-center justify-center"
    >
      <motion.div
        initial={
          prefersReducedMotion
            ? false
            : { opacity: 0, y: 120, scale: 0.85, rotateX: 65 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => setAnimatingIn(false)}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
          willChange: animatingIn ? "transform, opacity" : "auto",
        }}
        className="relative"
      >
        <button
          type="button"
          onClick={scrollToSignup}
          aria-label="עבור לטופס ההרשמה המוקדמת"
          className="relative block w-[280px] h-[560px] md:w-[320px] md:h-[640px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl shadow-black/50 cursor-pointer border-0 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/60">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
            <video
              src="/images/hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              disablePictureInPicture
              disableRemotePlayback
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </button>
      </motion.div>
    </div>
  );
}
