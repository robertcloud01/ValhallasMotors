"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { StatCard } from "@/components/admin/StatCard";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { Eye, Cursor, Users, Car, Money, Tag, Image as ImageIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { getCars } from "@/services/cars";

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        sold: 0, // Mocked for now as we don't have 'sold' status yet
        totalValue: 0,
        avgPrice: 0,
        totalImages: 0
    });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        async function fetchStats() {
            const cars = await getCars();

            const total = cars.length;
            // Parse price string "R$ 1.000.000" -> 1000000
            const prices = cars.map(c => {
                const num = c.price.replace(/[^0-9,]/g, '').replace(',', '.');
                return parseFloat(num) || 0;
            });

            const totalValue = prices.reduce((a, b) => a + b, 0);
            const totalImages = cars.reduce((acc, car) => acc + (car.images?.length || 0), 0);

            setStats({
                total,
                active: total, // Assuming all are active for now
                sold: 0,
                totalValue,
                avgPrice: total > 0 ? totalValue / total : 0,
                totalImages
            });
            setLoadingStats(false);
        }

        if (user) fetchStats();
    }, [user]);

    if (loading || loadingStats) return <div className="h-screen flex items-center justify-center text-white">Carregando Dashboard...</div>;
    if (!user) return null;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
    };

    const formatCompactNumber = (num: number) => {
        return Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(num);
    };

    return (
        <div className="flex min-h-screen bg-petrol">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-12">
                <div className="flex justify-between items-center mb-12 animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-silver/60">Visão geral do império Valhallas.</p>
                    </div>
                    <Button href="/admin/new" leftIcon={<span className="text-xl">+</span>}>
                        Adicionar Veículo
                    </Button>
                </div>

                {/* Primary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-up">
                    <StatCard
                        label="Total em Estoque"
                        value={stats.total.toString()}
                        trend="Veículos"
                        icon={<Car size={24} weight="duotone" />}
                    />
                    <StatCard
                        label="Valor do Estoque"
                        value={formatCompactNumber(stats.totalValue)}
                        trend="BRL"
                        icon={<Money size={24} weight="duotone" />}
                    />
                    <StatCard
                        label="Ticket Médio"
                        value={formatCompactNumber(stats.avgPrice)}
                        trend="BRL"
                        icon={<Tag size={24} weight="duotone" />}
                    />
                    <StatCard
                        label="Fotos Hospedadas"
                        value={stats.totalImages.toString()}
                        trend="Arquivos"
                        icon={<ImageIcon size={24} weight="duotone" />}
                    />
                </div>

                {/* Secondary Stats & Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    <div className="lg:col-span-2 space-y-6">
                        {/* Marketing / Engagement Stats (Mocked) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard label="Visualizações (Mês)" value="42.5k" trend="+12%" icon={<Eye size={24} />} />
                            <StatCard label="Cliques em Botões" value="1.2k" trend="+5%" icon={<Cursor size={24} />} />
                            <StatCard label="Novos Leads" value="156" trend="+18%" icon={<Users size={24} />} />
                        </div>

                        {/* Placeholder for Chart or larger widget */}
                        <div className="bg-premium-carbon border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-center h-[300px] hover:border-gold/20 transition-colors">
                            <h3 className="text-white font-bold mb-2">Performance de Vendas</h3>
                            <p className="text-silver/40 text-sm">Gráfico de desempenho será implementado na v2.0</p>
                            {/* Visual Placeholder */}
                            <div className="w-full h-32 mt-6 flex items-end justify-center gap-2 opacity-50">
                                {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                    <div key={i} className="w-8 bg-gold/20 hover:bg-gold rounded-t-sm transition-all duration-300" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <RecentActivity />
                    </div>
                </div>
            </main>
        </div>
    );
}
