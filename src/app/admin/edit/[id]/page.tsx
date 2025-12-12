"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { getCarById, type Car } from "@/services/cars";
import { CarForm } from "@/components/admin/CarForm";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";

export default function EditVehiclePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [vehicle, setVehicle] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/admin/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        async function fetchVehicle() {
            if (!id) return;
            const data = await getCarById(id);
            setVehicle(data);
            setLoading(false);
        }
        if (user) {
            fetchVehicle();
        }
    }, [id, user]);

    if (authLoading || loading) {
        return <div className="h-screen flex items-center justify-center text-white">Carregando editor...</div>;
    }

    if (!user) return null;

    if (!vehicle) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-white space-y-4">
                <h2 className="text-2xl font-bold">Veículo não encontrado</h2>
                <Link href="/admin/vehicles">
                    <Button variant="outline">Voltar para lista</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-petrol">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-12">
                <div className="mb-8">
                    <Link
                        href="/admin/vehicles"
                        className="inline-flex items-center gap-2 text-silver/60 hover:text-white transition-colors mb-4 text-sm font-medium"
                    >
                        <ArrowLeft size={16} />
                        Voltar para Inventário
                    </Link>
                    <h1 className="text-3xl font-display font-bold text-white">
                        Editar <span className="text-gold">{vehicle.brand} {vehicle.model}</span>
                    </h1>
                </div>

                <CarForm initialData={vehicle} />
            </main>
        </div>
    );
}
