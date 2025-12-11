"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { StatCard } from "@/components/admin/StatCard";
import { Eye, Cursor, Users } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";


export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login");
        }
    }, [user, loading, router]);

    if (loading) return <div className="h-screen flex items-center justify-center text-white">Carregando...</div>;
    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-12">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-silver/60">Visão geral do sistema.</p>
                    </div>
                    <Button href="/admin/new" leftIcon={<span className="text-xl">+</span>}>
                        Adicionar Veículo
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard label="Visualizações Totais" value="12,450" trend="+12%" icon={<Eye size={24} />} />
                    <StatCard label="Cliques em CTA" value="843" trend="+5%" icon={<Cursor size={24} />} />
                    <StatCard label="Leads Gerados" value="128" trend="+18%" icon={<Users size={24} />} />
                </div>

                {/* Recent Activity or Quick List could go here */}
                <div className="bg-premium-carbon border border-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-display font-bold text-white mb-6">Atividade Recente</h3>
                    <p className="text-silver/60 text-sm">Nenhuma atividade recente para exibir.</p>
                </div>
            </main>
        </div>
    );
}
