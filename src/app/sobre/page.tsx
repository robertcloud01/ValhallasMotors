"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    const milestones = [
        { year: "2010", title: "A Fundação", description: "Iniciamos nossa jornada com um pequeno showroom focado em clássicos europeus." },
        { year: "2015", title: "Expansão Global", description: "Estabelecemos parcerias exclusivas com fabricantes na Itália e Alemanha." },
        { year: "2020", title: "A Nova Era", description: "Inauguração da nossa sede premium em São Paulo, um marco na arquitetura automotiva." },
        { year: "2024", title: "Liderança", description: "Reconhecidos como a principal revenda de supercarros da América Latina." },
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Hero */}
            <section className="relative py-32 md:py-48 px-6 text-center overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <span className="text-gold uppercase tracking-[0.2em] font-bold mb-4 block">Nossa História</span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Mais do que carros,<br />legados sobre rodas.</h1>
                    <p className="text-silver/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Na Simplesmente Premium, não vendemos apenas veículos. Entregamos sonhos, engenharia de ponta e uma experiência de vida incomparável.
                    </p>
                </div>
                <div className="absolute top-0 w-full h-full left-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                    <Image src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2000" alt="Background" fill className="object-cover" />
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-premium-carbon relative">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-display font-bold mb-16 text-center">Nossa Trajetória</h2>

                    <div className="relative border-l border-white/10 ml-6 md:ml-1/2 md:border-l-0">
                        {milestones.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                key={index}
                                className={`mb-12 relative md:flex ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between`}
                            >
                                {/* Center Line Dot */}
                                <div className="absolute left-[-5px] md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 bg-gold rounded-full z-10 box-content border-4 border-premium-carbon" />

                                <div className={`pl-8 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12 text-left" : "md:pr-12 md:text-right"}`}>
                                    <span className="text-gold font-bold text-xl">{item.year}</span>
                                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-silver/60">{item.description}</p>
                                </div>
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values/Team with B&W Interaction */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[600px] w-full group overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-700">
                            <Image
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                                alt="CEO"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/90 to-transparent w-full">
                                <span className="text-gold font-bold uppercase tracking-widest text-xs">Fundador</span>
                                <h3 className="text-2xl font-display font-bold text-white">Roberto Almeida</h3>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Missão</h3>
                                <p className="text-silver/60">Proporcionar acesso às máquinas mais extraordinárias já criadas pela engenharia humana.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Visão</h3>
                                <p className="text-silver/60">Ser a referência global em curadoria automotiva de alto padrão.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Valores</h3>
                                <p className="text-silver/60">Transparência absoluta, paixão por performance e atendimento sob medida.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
