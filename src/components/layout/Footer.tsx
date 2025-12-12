"use client";

import Link from "next/link";
import { InstagramLogo, FacebookLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { ValhallasLogo } from "@/components/ui/ValhallasLogo";

export function Footer() {
    return (
        <footer className="bg-petrol border-t border-white/5 pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="inline-block">
                            <ValhallasLogo showText={true} />
                        </Link>
                        <p className="text-silver/60 max-w-sm font-light leading-relaxed text-sm">
                            Curadoria exclusiva de veículos exóticos e de luxo. Entregamos obras de arte sobre rodas para colecionadores que exigem a perfeição.
                        </p>
                    </div>

                    {/* Navigation - Offset for layout balance */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h4 className="text-white uppercase tracking-widest font-bold mb-8 text-xs">Menu</h4>
                        <ul className="space-y-4">
                            {["Estoque", "DNA", "Sobre", "Contato"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === "DNA" ? "#dna" : `/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                                        className="text-silver/60 hover:text-gold transition-colors text-sm uppercase tracking-wider"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social / Contact */}
                    <div className="md:col-span-3 md:col-start-9">
                        <h4 className="text-white uppercase tracking-widest font-bold mb-8 text-xs">Conecte-se</h4>
                        <div className="flex flex-col space-y-6">
                            <div className="space-y-2">
                                <span className="block text-silver/60 text-sm">Av. Europa, 1234 - Jardins</span>
                                <span className="block text-silver/60 text-sm">São Paulo - SP</span>
                            </div>

                            <a href="tel:+5511999999999" className="text-white hover:text-gold transition-colors font-display text-lg">
                                +55 11 99999-9999
                            </a>

                            <div className="flex space-x-4 pt-2">
                                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
                                    <InstagramLogo size={20} />
                                </Link>
                                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
                                    <FacebookLogo size={20} />
                                </Link>
                                <Link href="https://wa.me/5511999999999" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-green-500 hover:border-green-500 hover:text-white transition-all duration-300">
                                    <WhatsappLogo size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-silver/30">
                    <p>&copy; {new Date().getFullYear()} Valhallas Motors.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
                        <Link href="#" className="hover:text-white transition-colors">Termos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
