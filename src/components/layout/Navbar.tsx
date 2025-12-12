"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { List, X, MagnifyingGlass } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { ValhallasLogo } from "@/components/ui/ValhallasLogo";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Estoque", href: "/estoque" },
        { name: "Sobre", href: "/sobre" },
        { name: "DNA", href: "#dna" }, // New anchor
        { name: "Contato", href: "/contato" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "py-3 glass-panel-heavy"
                    : "py-6 bg-gradient-to-b from-black/80 to-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="relative z-50 hover:opacity-80 transition-opacity">
                    <ValhallasLogo />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    <div className="flex items-center space-x-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-xs uppercase tracking-[0.2em] font-medium text-silver/80 hover:text-white transition-all duration-300 hover:tracking-[0.25em]"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-6 w-[1px] bg-white/10" />

                    <div className="flex items-center space-x-4">
                        <button className="text-white/60 hover:text-white transition-colors">
                            <MagnifyingGlass size={20} />
                        </button>
                        <Link href="/estoque">
                            <Button
                                size="sm"
                                className="bg-white text-black hover:bg-gold hover:text-white border-none rounded-none px-6 tracking-widest text-[10px] uppercase font-bold transition-all duration-300 transform hover:-translate-y-1 magnetic-button"
                            >
                                Ver Veículos
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white relative z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 bg-petrol z-40 flex flex-col justify-center items-center space-y-8"
                    >
                        {navLinks.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    className="text-3xl font-display font-bold uppercase tracking-widest text-white hover:text-gold transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
