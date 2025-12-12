"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretLeft, CaretRight, Quotes } from "@phosphor-icons/react";

const testimonials = [
    {
        id: 1,
        text: "A experiência na Valhallas Motors foi simplesmente transcendente. O atendimento personalizado e a curadoria de veículos são inigualáveis no mercado brasileiro.",
        author: "Carlos E. Mendes",
        role: "Colecionador Privado",
        image: "carlos_avatar" // Assuming placeholder logic or need to use a generic avatar
    },
    {
        id: 2,
        text: "Encontrei o modelo exato que procurava há anos. A transparência e o profissionalismo da equipe me deram total confiança para fechar o negócio à distância.",
        author: "Fernanda S. Oliveira",
        role: "CEO, Tech Ventures",
        image: "fernanda_avatar"
    },
    {
        id: 3,
        text: "Não é apenas sobre comprar um carro, é sobre entrar para um clube exclusivo. O pós-venda é impecável e os eventos são extraordinários.",
        author: "Ricardo Alencar",
        role: "Piloto Profissional",
        image: "ricardo_avatar"
    }
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Auto-play
    useEffect(() => {
        const interval = setInterval(next, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-32 bg-petrol relative border-t border-white/5 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-full bg-gradient-to-b from-transparent via-carbon/50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
                    <div className="mb-10 text-gold opacity-50">
                        <Quotes size={48} weight="fill" />
                    </div>

                    <div className="relative w-full h-[300px] md:h-[200px] flex items-center justify-center mb-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex flex-col items-center justify-center"
                            >
                                <p className="text-2xl md:text-3xl font-light text-white italic leading-relaxed mb-8">
                                    "{testimonials[currentIndex].text}"
                                </p>

                                <div>
                                    <h4 className="text-lg font-bold text-white uppercase tracking-wider">{testimonials[currentIndex].author}</h4>
                                    <span className="text-gold text-xs font-medium tracking-widest">{testimonials[currentIndex].role}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-8">
                        <button
                            onClick={prev}
                            className="p-3 rounded-full border border-white/10 text-white hover:bg-gold hover:border-gold hover:text-white transition-all duration-300"
                        >
                            <CaretLeft size={20} />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-gold w-6" : "bg-white/20 hover:bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="p-3 rounded-full border border-white/10 text-white hover:bg-gold hover:border-gold hover:text-white transition-all duration-300"
                        >
                            <CaretRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
