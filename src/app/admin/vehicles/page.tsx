"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { getCars, type Car } from "@/services/cars";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Pencil, Trash, Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function VehiclesManagementPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [vehicles, setVehicles] = useState<Car[]>([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        async function fetchVehicles() {
            const data = await getCars();
            setVehicles(data);
            setLoadingVehicles(false);
        }
        if (user) {
            fetchVehicles();
        }
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este veículo?")) return;

        try {
            if (db) {
                await deleteDoc(doc(db, "cars", id));
                setVehicles(vehicles.filter(v => v.id !== id));
                alert("Veículo excluído com sucesso!");
            }
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            alert("Erro ao excluir veículo");
        }
    };

    if (loading || loadingVehicles) {
        return <div className="h-screen flex items-center justify-center text-white">Carregando...</div>;
    }
    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-12">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white mb-2">
                            Gerenciar Veículos
                        </h1>
                        <p className="text-silver/60">
                            {vehicles.length} {vehicles.length === 1 ? 'veículo' : 'veículos'} no estoque
                        </p>
                    </div>
                    <Button href="/admin/new" leftIcon={<Plus size={20} />}>
                        Adicionar Veículo
                    </Button>
                </div>

                {/* Vehicles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                        <div
                            key={vehicle.id}
                            className="bg-premium-carbon border border-white/5 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-52 bg-black/20">
                                {vehicle.images[0] || vehicle.thumbnail ? (
                                    <CloudinaryImage
                                        src={vehicle.thumbnail || vehicle.images[0]}
                                        alt={`${vehicle.brand} ${vehicle.model}`}
                                        width={500}
                                        height={350}
                                        preset="card"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-silver/40">
                                        <div className="text-4xl mb-2">🚗</div>
                                        <div className="text-sm">Sem foto</div>
                                    </div>
                                )}
                                {/* Status badge */}
                                <div className="absolute top-3 right-3">
                                    <div className="px-3 py-1 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full text-green-400 text-xs font-bold">
                                        ATIVO
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-4">
                                {/* Title */}
                                <div>
                                    <div className="text-gold text-xs uppercase tracking-widest font-bold mb-1">
                                        {vehicle.brand}
                                    </div>
                                    <h3 className="text-white font-bold text-lg leading-tight mb-1">
                                        {vehicle.model}
                                    </h3>
                                    <div className="text-xl font-bold text-white">
                                        {vehicle.price}
                                    </div>
                                </div>

                                {/* Quick Info Grid */}
                                <div className="grid grid-cols-2 gap-2 text-sm border-t border-white/5 pt-3">
                                    <div>
                                        <div className="text-silver/40 text-xs mb-0.5">Ano</div>
                                        <div className="text-white font-medium">{vehicle.year}</div>
                                    </div>
                                    <div>
                                        <div className="text-silver/40 text-xs mb-0.5">KM</div>
                                        <div className="text-white font-medium">{vehicle.km.toLocaleString('pt-BR')}</div>
                                    </div>
                                    <div>
                                        <div className="text-silver/40 text-xs mb-0.5">Potência</div>
                                        <div className="text-white font-medium">{vehicle.power}</div>
                                    </div>
                                    <div>
                                        <div className="text-silver/40 text-xs mb-0.5">Categoria</div>
                                        <div className="text-white font-medium text-xs">{vehicle.category}</div>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 border-t border-white/5 pt-3">
                                    {vehicle.vehicleType && (
                                        <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-xs text-blue-400 font-medium capitalize">
                                            {vehicle.vehicleType}
                                        </span>
                                    )}
                                    {vehicle.fuelType && (
                                        <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-md text-xs text-purple-400 font-medium">
                                            {vehicle.fuelType}
                                        </span>
                                    )}
                                    <span className="px-2.5 py-1 bg-gold/10 border border-gold/20 rounded-md text-xs text-gold font-medium">
                                        {vehicle.images.length} {vehicle.images.length === 1 ? 'foto' : 'fotos'}
                                    </span>
                                    {vehicle.video && (
                                        <span className="px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-md text-xs text-green-400 font-medium">
                                            📹 Vídeo
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Link
                                        href={`/admin/edit/${vehicle.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-lg text-gold transition-all hover:scale-[1.02]"
                                    >
                                        <Pencil size={16} weight="bold" />
                                        <span className="text-sm font-bold">Editar</span>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(vehicle.id)}
                                        className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 transition-all hover:scale-[1.02]"
                                        title="Excluir veículo"
                                    >
                                        <Trash size={16} weight="bold" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {vehicles.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-6xl mb-4">🚗</div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Nenhum veículo cadastrado
                        </h3>
                        <p className="text-silver/60 mb-6">
                            Adicione seu primeiro veículo ao estoque
                        </p>
                        <Button href="/admin/new" leftIcon={<Plus size={20} />}>
                            Adicionar Veículo
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}
