"use client";

import { motion } from "framer-motion";
import { Gauge, Diamond, Lightning } from "@phosphor-icons/react";

const pillars = [
    {
        icon: Lightning,
        title: "Performance",
        description: "Potência pura e engenharia de precisão para quem exige o máximo em cada curva."
    },
    {
        icon: Diamond,
        title: "Exclusividade",
        description: "Acesso a modelos raros e edições limitadas que definem o padrão global de luxo."
    },
    {
        icon: Gauge,
        title: "Design Futurista",
        description: "Linhas agressivas e estética vanguardista que transformam máquinas em obras de arte."
    }
];

export function DNASection() {
    return (
        <section id="dna" className="py-32 bg-black relative border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-carbon via-black to-black opacity-40" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
                    >
                        Valhallas DNA
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
                    >
                        O Ápice da Engenharia Automotiva
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {pillars.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.7 }}
                            className="group text-center p-8 rounded-lg hover:bg-white/5 transition-colors duration-500 border border-transparent hover:border-white/5"
                        >
                            <div className="flex justify-center mb-8">
                                <div className="p-4 rounded-full bg-carbon border border-white/10 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-500">
                                    <item.icon size={32} className="text-silver group-hover:text-gold transition-colors duration-500" weight="light" />
                                </div>
                            </div>
                            <h3 className="text-xl font-display font-bold text-white mb-4 uppercase tracking-wider">{item.title}</h3>
                            <p className="text-silver/60 font-light leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
