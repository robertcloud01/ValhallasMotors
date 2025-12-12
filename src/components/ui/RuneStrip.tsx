"use client";

import { motion } from "framer-motion";

export function RuneStrip() {
    // Meaningful words transliterated to Elder Futhark
    // VALHALLA • LUXO • VELOCIDADE • PODER • EXCLUSIVO • ETERNO
    const runes = "ᚹᚨᛚᚺᚨᛚᛚᚨ • ᛚᚢᚲᛊᛟ • ᚹᛖᛚᛟᚲᛁᛞᚨᛞᛖ • ᛈᛟᛞᛖᚱ • ᛖᚲᛊᚲᛚᚢᛊᛁᚹᛟ • ᛖᛏᛖᚱᚾᛟ";

    // Repeat to ensure coverage
    const repeatedRunes = Array(20).fill(runes).join(" • • ");

    return (
        <div className="w-full bg-premium-petrol border-y border-gold/10 overflow-hidden py-4 relative z-20">
            {/* Gradient overlays for fade effect at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-premium-petrol to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-premium-petrol to-transparent z-10" />

            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex shrink-0 gap-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 180, // Much slower (~3x previous duration) for a majestic feel
                    }}
                >
                    <span className="text-xl md:text-2xl text-gold/30 font-serif tracking-[0.5em] select-none shadow-gold/5 drop-shadow-lg">
                        {repeatedRunes}
                    </span>
                    <span className="text-xl md:text-2xl text-gold/30 font-serif tracking-[0.5em] select-none shadow-gold/5 drop-shadow-lg">
                        {repeatedRunes}
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
