"use client";

import { Clock, Car, Trash, PencilSimple } from "@phosphor-icons/react";

// Mock Data - In a real app this would come from a "logs" collection in Firebase
const activities = [
    {
        id: 1,
        action: "create",
        user: "Admin",
        details: "Cadastrou Ferrari SF90 Stradale",
        time: "Há 2 horas",
        icon: <Car weight="fill" />,
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20"
    },
    {
        id: 2,
        action: "edit",
        user: "Admin",
        details: "Alterou preço de Porsche 911 GT3",
        time: "Há 5 horas",
        icon: <PencilSimple weight="fill" />,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20"
    },
    {
        id: 3,
        action: "delete",
        user: "Admin",
        details: "Removeu BMW X6 M (Vendido)",
        time: "Ontem",
        icon: <Trash weight="fill" />,
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20"
    },
    {
        id: 4,
        action: "create",
        user: "Admin",
        details: "Cadastrou Lamborghini Urus",
        time: "Há 2 dias",
        icon: <Car weight="fill" />,
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20"
    },
];

export function RecentActivity() {
    return (
        <div className="bg-premium-carbon border border-white/5 rounded-xl p-6 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-display font-bold text-white">Atividade Recente</h3>
                <button className="text-xs text-gold hover:text-white transition-colors uppercase tracking-widest font-bold">
                    Ver Todos
                </button>
            </div>

            <div className="space-y-4">
                {activities.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
                    >
                        <div className={`p-2 rounded-lg ${item.bg} ${item.color} ${item.border} border`}>
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-sm font-medium leading-tight mb-1">
                                {item.details}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-silver/40">
                                <span>{item.user}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Clock size={12} />
                                    {item.time}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
