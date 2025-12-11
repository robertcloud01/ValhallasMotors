"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MapPin, Phone, Envelope, WhatsappLogo } from "@phosphor-icons/react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-32 pb-12 bg-premium-carbon border-b border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Entre em Contato</h1>
                    <p className="text-silver/60">Estamos prontos para atender você.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Form */}
                <div>
                    <h2 className="text-2xl font-display font-bold mb-8">Envie uma mensagem</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Nome</label>
                                <input className="w-full bg-premium-carbon border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-gold transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Telefone</label>
                                <input className="w-full bg-premium-carbon border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-gold transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Email</label>
                            <input type="email" className="w-full bg-premium-carbon border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-gold transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Mensagem</label>
                            <textarea className="w-full bg-premium-carbon border border-white/10 rounded-lg h-32 py-4 px-4 text-white focus:outline-none focus:border-gold transition-colors" />
                        </div>
                        <Button size="lg" className="w-full">Enviar Mensagem</Button>
                    </form>
                </div>

                {/* Info & Map */}
                <div className="space-y-12">
                    <div>
                        <h2 className="text-2xl font-display font-bold mb-8">Informações</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin size={24} className="text-gold shrink-0" />
                                <div>
                                    <span className="block text-white font-bold">Showroom Principal</span>
                                    <span className="text-silver/60">Av. Europa, 1234 - Jardim Europa<br />São Paulo, SP - 01449-000</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone size={24} className="text-gold shrink-0" />
                                <div>
                                    <span className="block text-white font-bold">Telefone</span>
                                    <span className="text-silver/60">+55 11 3000-0000</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Envelope size={24} className="text-gold shrink-0" />
                                <div>
                                    <span className="block text-white font-bold">Email</span>
                                    <span className="text-silver/60">contato@simplesmentepremium.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 w-full bg-premium-carbon rounded-xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.960249495632!2d-46.67756788538787!3d-23.57465998467615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c1184fac6d%3A0xc1987d32c58907f1!2sAv.%20Europa%2C%201234%20-%20Jardim%20Europa%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001449-001!5e0!3m2!1spt-BR!2sbr!4v1683838483849!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    <Link href="https://wa.me/5511999999999" target="_blank" className="block w-full">
                        <Button variant="outline" className="w-full" leftIcon={<WhatsappLogo size={24} />}>
                            Chamar no WhatsApp
                        </Button>
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
