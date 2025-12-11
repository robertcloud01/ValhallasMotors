"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (!auth) {
                throw new Error("Firebase Authentication não está inicializado.");
            }
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err: any) {
            console.error(err);
            setError("Erro ao fazer login. Verifique suas credenciais ou a configuração do sistema.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-black">
            {/* Left Side - Image */}
            <div className="hidden lg:block w-1/2 relative h-full">
                <Image
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
                    alt="Admin Login"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-10 left-10 p-6 glass-panel rounded-lg max-w-md">
                    <h2 className="text-2xl font-display font-bold text-white mb-2">Simplesmente Premium</h2>
                    <p className="text-silver/80">Acesso restrito ao painel administrativo.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-premium-black relative overflow-hidden">

                <form onSubmit={handleLogin} className="w-full max-w-md space-y-8 relative z-10 p-8 rounded-2xl md:border border-white/5 md:bg-premium-carbon/30">
                    <div className="text-center">
                        <h1 className="text-3xl font-display font-bold text-white mb-2">Bem-vindo de volta</h1>
                        <p className="text-silver/60">Digite suas credenciais para continuar.</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-premium-carbon border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-gold transition-colors"
                                placeholder="admin@simplesmentepremium.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-premium-carbon border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-gold transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" isLoading={loading}>
                        Entrar no Painel
                    </Button>

                    <p className="text-center text-xs text-silver/40 pt-4">
                        Problemas com acesso? Contate o suporte técnico.
                    </p>
                </form>
            </div>
        </div>
    );
}
