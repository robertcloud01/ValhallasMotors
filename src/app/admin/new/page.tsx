"use client";

import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { CarForm } from "@/components/admin/CarForm";

export default function NewCarPage() {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return null; // Or redirect

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-12">
                <h1 className="text-3xl font-display font-bold text-white mb-8">Adicionar Veículo</h1>
                <CarForm />
            </main>
        </div>
    );
}
