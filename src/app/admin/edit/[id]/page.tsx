"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { getCarById, type Car } from "@/services/cars";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";

export default function EditVehiclePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [vehicle, setVehicle] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        price: "",
        year: new Date().getFullYear(),
        km: 0,
        power: "",
        description: "",
        category: "Supercar",
        vehicleType: "car" as Car["vehicleType"],
        fuelType: undefined as Car["fuelType"],
        cylinderCapacity: undefined as string | undefined,
        horsePower: undefined as number | undefined,
        transmissionType: undefined as Car["transmissionType"],
    });

    const [imagePublicIds, setImagePublicIds] = useState<string[]>([]);
    const [videoPublicId, setVideoPublicId] = useState<string>("");

    // Fetch vehicle data
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/admin/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        async function fetchVehicle() {
            if (!id) return;
            const data = await getCarById(id);
            if (data) {
                setVehicle(data);
                setFormData({
                    brand: data.brand,
                    model: data.model,
                    price: data.price,
                    year: data.year,
                    km: data.km,
                    power: data.power,
                    description: data.description,
                    category: data.category,
                    vehicleType: data.vehicleType || "car",
                    fuelType: data.fuelType,
                    cylinderCapacity: data.cylinderCapacity,
                    horsePower: data.horsePower,
                    transmissionType: data.transmissionType,
                });
                setImagePublicIds(data.images || []);
                setVideoPublicId(data.video || "");
            }
            setLoading(false);
        }
        if (user) {
            fetchVehicle();
        }
    }, [id, user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!db || !vehicle) {
            alert("Erro: Firebase não configurado ou veículo não encontrado");
            return;
        }

        setSaving(true);

        try {
            await updateDoc(doc(db, "cars", vehicle.id), {
                ...formData,
                year: Number(formData.year),
                km: Number(formData.km),
                horsePower: formData.horsePower ? Number(formData.horsePower) : null,
                images: imagePublicIds,
                thumbnail: imagePublicIds[0] || null,
                video: videoPublicId || null,
            });

            alert("Veículo atualizado com sucesso!");
            router.push("/admin/vehicles");
        } catch (error) {
            console.error("Error updating vehicle:", error);
            alert("Erro ao atualizar veículo");
        } finally {
            setSaving(false);
        }
    };

    if (authLoading || loading) {
        return <div className="h-screen flex items-center justify-center text-white">Carregando...</div>;
    }

    if (!user) return null;

    if (!vehicle) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Veículo não encontrado</h2>
                <Link href="/admin/vehicles">
                    <Button>Voltar para lista</Button>
                </Link>
            </div>
        );
    }

    const inputStyles = "w-full bg-premium-carbon border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-gold transition-colors";

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-12">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/admin/vehicles"
                        className="inline-flex items-center gap-2 text-silver/60 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft size={20} />
                        <span>Voltar para lista</span>
                    </Link>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Editar Veículo
                    </h1>
                    <p className="text-silver/60">
                        {vehicle.brand} {vehicle.model} • {vehicle.year}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Marca</label>
                            <input name="brand" value={formData.brand} onChange={handleInputChange} className={inputStyles} required />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Modelo</label>
                            <input name="model" value={formData.model} onChange={handleInputChange} className={inputStyles} required />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Preço</label>
                            <input name="price" value={formData.price} onChange={handleInputChange} className={inputStyles} required />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Ano</label>
                            <input name="year" type="number" value={formData.year} onChange={handleInputChange} className={inputStyles} required />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Quilometragem</label>
                            <input name="km" type="number" value={formData.km} onChange={handleInputChange} className={inputStyles} required />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Potência</label>
                            <input name="power" value={formData.power} onChange={handleInputChange} className={inputStyles} required />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Categoria</label>
                            <select name="category" value={formData.category} onChange={handleInputChange} className={inputStyles}>
                                <option value="Supercar">Supercar</option>
                                <option value="SUV">SUV de Luxo</option>
                                <option value="Sedan">Sedan Executivo</option>
                                <option value="Classic">Clássico</option>
                                <option value="Esportiva">Esportiva</option>
                                <option value="Touring">Touring</option>
                                <option value="Cruiser">Cruiser</option>
                                <option value="Iate">Iate</option>
                                <option value="Lancha">Lancha</option>
                                <option value="Jet Ski">Jet Ski</option>
                                <option value="Cavalo Mecânico">Cavalo Mecânico</option>
                                <option value="Picape">Picape</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Tipo de Veículo</label>
                            <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} className={inputStyles}>
                                <option value="car">Carro</option>
                                <option value="moto">Moto</option>
                                <option value="truck">Caminhão</option>
                                <option value="boat">Lancha</option>
                                <option value="jetski">Jet Ski</option>
                                <option value="utv">UTV/ATV</option>
                                <option value="suv">SUV</option>
                                <option value="pickup">Picape</option>
                                <option value="supercar">Supercarro</option>
                            </select>
                        </div>
                    </div>

                    {/* Optional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Combustível (Opcional)</label>
                            <select name="fuelType" value={formData.fuelType || ""} onChange={handleInputChange} className={inputStyles}>
                                <option value="">Não especificado</option>
                                <option value="Gasolina">Gasolina</option>
                                <option value="Etanol">Etanol</option>
                                <option value="Flex">Flex</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Elétrico">Elétrico</option>
                                <option value="Híbrido">Híbrido</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Transmissão (Opcional)</label>
                            <select name="transmissionType" value={formData.transmissionType || ""} onChange={handleInputChange} className={inputStyles}>
                                <option value="">Não especificado</option>
                                <option value="Manual">Manual</option>
                                <option value="Automática">Automática</option>
                                <option value="CVT">CVT</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Cilindrada - Motos (Opcional)</label>
                            <input name="cylinderCapacity" value={formData.cylinderCapacity || ""} onChange={handleInputChange} className={inputStyles} placeholder="Ex: 1000cc" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">HP - Lanchas/Jetski (Opcional)</label>
                            <input name="horsePower" type="number" value={formData.horsePower || ""} onChange={handleInputChange} className={inputStyles} placeholder="Ex: 325" />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Descrição</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} className={`${inputStyles} h-32 py-4`} required />
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-4">
                            Fotos do Veículo <span className="text-gold">(Sem Limite)</span>
                        </label>
                        <CloudinaryUploader
                            onUploadComplete={(publicIds) => setImagePublicIds(publicIds)}
                            maxFiles={999}
                            folder={`cars/${formData.vehicleType}`}
                            resourceType="image"
                            acceptedFormats={['jpg', 'png', 'webp', 'heic']}
                        />
                        <p className="text-silver/40 text-xs mt-2">
                            Atualmente: {imagePublicIds.length} {imagePublicIds.length === 1 ? 'foto' : 'fotos'}
                        </p>
                    </div>

                    {/* Video */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-4">
                            Vídeos do Veículo <span className="text-silver/40">(Sem Limite)</span>
                        </label>
                        <CloudinaryUploader
                            onUploadComplete={(publicIds) => setVideoPublicId(publicIds[0] || "")}
                            maxFiles={999}
                            folder={`cars/${formData.vehicleType}/videos`}
                            resourceType="video"
                            acceptedFormats={['mp4', 'mov', 'avi']}
                        />
                        <p className="text-silver/40 text-xs mt-2">
                            {videoPublicId ? 'Vídeo adicionado' : 'Nenhum vídeo'}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Button type="submit" size="lg" isLoading={saving}>
                            Salvar Alterações
                        </Button>
                        <Link href="/admin/vehicles">
                            <Button type="button" variant="outline" size="lg">
                                Cancelar
                            </Button>
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
}
