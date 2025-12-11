"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Car, SignOut } from "@phosphor-icons/react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: <House size={20} /> },
        { name: "Veículos", href: "/admin/vehicles", icon: <Car size={20} /> },
        { name: "Adicionar Veículo", href: "/admin/new", icon: <Car size={20} /> },
    ];

    return (
        <aside className="w-64 bg-premium-carbon border-r border-white/5 h-screen fixed left-0 top-0 flex flex-col">
            <div className="p-8 border-b border-white/5">
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Simplesmente Premium</span>
                <h2 className="text-white font-display font-bold text-xl">Admin</h2>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-gold text-black" : "text-silver/60 hover:text-white hover:bg-white/5"}`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 w-full transition-colors"
                >
                    <SignOut size={20} />
                    Sair
                </button>
            </div>
        </aside>
    );
}
