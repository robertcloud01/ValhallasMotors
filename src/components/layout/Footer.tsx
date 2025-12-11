import Link from "next/link";
import { InstagramLogo, FacebookLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { ValhallasLogo } from "@/components/ui/ValhallasLogo";

export function Footer() {
    return (
        <footer className="bg-carbon border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <Link href="/" className="mb-6 block">
                            <ValhallasLogo showText={true} />
                        </Link>
                        <p className="text-silver/60 max-w-md font-light leading-relaxed">
                            Curadoria exclusiva de veículos exóticos e de luxo. Entregamos não apenas carros, mas obras de arte sobre rodas para colecionadores exigentes.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white uppercase tracking-widest font-bold mb-6 text-sm">Navegação</h4>
                        <ul className="space-y-4">
                            {["Estoque", "Experiência", "Sobre", "Blog", "Contato"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-silver/60 hover:text-gold transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white uppercase tracking-widest font-bold mb-6 text-sm">Contato</h4>
                        <div className="flex flex-col space-y-4">
                            <span className="text-silver/60 text-sm">Av. Europa, 1234 - São Paulo, SP</span>
                            <span className="text-silver/60 text-sm">+55 11 99999-9999</span>
                            <div className="flex space-x-4 mt-2">
                                <Link href="#" className="text-white hover:text-gold transition-colors"><InstagramLogo size={24} /></Link>
                                <Link href="#" className="text-white hover:text-gold transition-colors"><FacebookLogo size={24} /></Link>
                                <Link href="https://wa.me/5511999999999" target="_blank" className="text-white hover:text-gold transition-colors"><WhatsappLogo size={24} /></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-silver/40">
                    <p>&copy; {new Date().getFullYear()} Valhallas Motors. Todos os direitos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
                        <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
