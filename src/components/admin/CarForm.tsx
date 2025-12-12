"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Sparkle, Car as CarIcon, FloppyDisk } from "@phosphor-icons/react";
import { Car } from "@/services/cars";

interface CarFormProps {
    initialData?: Car;
}

export function CarForm({ initialData }: CarFormProps) {
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const router = useRouter();

    const [vehicleNameForAI, setVehicleNameForAI] = useState("");

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        price: "",
        year: new Date().getFullYear(),
        km: 0,
        power: "",
        description: "",
        category: "Supercar",
        vehicleType: "car" as 'car' | 'moto' | 'truck' | 'boat' | 'jetski' | 'utv' | 'suv' | 'pickup' | 'supercar',
        status: "active" as 'active' | 'sold' | 'inactive',
        fuelType: undefined as any,
        cylinderCapacity: undefined as any,
        horsePower: undefined as any,
        transmissionType: undefined as any,
    });

    const [imagePublicIds, setImagePublicIds] = useState<string[]>([]);
    const [videoPublicId, setVideoPublicId] = useState<string>("");
    const [coverImageId, setCoverImageId] = useState<string>("");

    // Initialize form with data if provided
    useEffect(() => {
        if (initialData) {
            setFormData({
                brand: initialData.brand,
                model: initialData.model,
                price: initialData.price,
                year: initialData.year,
                km: initialData.km,
                power: initialData.power,
                description: initialData.description,
                category: initialData.category,
                vehicleType: initialData.vehicleType || "car",
                status: (initialData as any).status || "active",
                fuelType: initialData.fuelType,
                cylinderCapacity: (initialData as any).cylinderCapacity,
                horsePower: (initialData as any).horsePower,
                transmissionType: (initialData as any).transmissionType,
            });
            setImagePublicIds(initialData.images || []);
            setVideoPublicId(initialData.video || "");
            setCoverImageId(initialData.thumbnail || (initialData.images && initialData.images[0]) || "");
        }
    }, [initialData]);

    const handleImageUpload = useCallback((publicIds: string[]) => {
        setImagePublicIds(publicIds);
        if (!coverImageId && publicIds.length > 0) {
            setCoverImageId(publicIds[0]);
        }
    }, [coverImageId]);

    const handleVideoUpload = useCallback((publicIds: string[]) => {
        setVideoPublicId(publicIds[0] || "");
    }, []);

    const handleSetCover = useCallback((publicId: string) => {
        setCoverImageId(publicId);
    }, []);

    const handleAIFill = async () => {
        if (!vehicleNameForAI.trim()) {
            alert("Digite o nome do veículo para usar a IA");
            return;
        }

        setAiLoading(true);

        try {
            const response = await fetch("/api/generate-vehicle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: vehicleNameForAI
                }),
            });

            if (!response.ok) throw new Error("Erro na API");
            const data = await response.json();

            setFormData(prev => ({
                ...prev,
                brand: data.marca || "",
                model: data.modelo || "",
                price: data.valorEstimado || "",
                year: data.ano ? Number(data.ano) : new Date().getFullYear(),
                power: data.potencia || "",
                description: data.descricao || "",
                category: data.categoria || "Supercar",
                // Keep status as is
            }));

            alert("✨ Dados preenchidos automaticamente pela IA!");
        } catch (error) {
            console.error("Erro ao gerar com IA:", error);
            alert("Erro ao gerar dados com IA.");
        } finally {
            setAiLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (imagePublicIds.length === 0) {
            alert("Por favor, adicione pelo menos uma foto do veículo.");
            return;
        }

        if (!db) {
            alert("Firebase não configurado.");
            return;
        }

        setLoading(true);

        try {
            const dataToSave: any = {
                ...formData,
                year: Number(formData.year),
                km: Number(formData.km),
                images: imagePublicIds,
                thumbnail: coverImageId || imagePublicIds[0],
                video: videoPublicId || null,
                updatedAt: new Date(),
            };

            // Remove undefined optional fields
            if (formData.fuelType) dataToSave.fuelType = formData.fuelType;
            if (formData.cylinderCapacity) dataToSave.cylinderCapacity = formData.cylinderCapacity;
            if (formData.horsePower) dataToSave.horsePower = Number(formData.horsePower);
            if (formData.transmissionType) dataToSave.transmissionType = formData.transmissionType;


            if (initialData?.id) {
                // UPDATE
                await updateDoc(doc(db, "cars", initialData.id), dataToSave);
                alert("Veículo atualizado com sucesso!");
            } else {
                // CREATE
                dataToSave.createdAt = new Date();
                await addDoc(collection(db, "cars"), dataToSave);
                // alert("Veículo criado com sucesso!"); // Optional, maybe just redirect
            }

            router.push("/admin/vehicles");
        } catch (error: any) {
            console.error("Error saving car:", error);
            alert(`Erro ao salvar: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const inputStyles = "w-full bg-premium-carbon border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-gold transition-colors";

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
            {/* Status Bar (Only for Edit or explicitly added) */}
            <div className="bg-premium-carbon border border-white/5 rounded-xl p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-white font-bold text-lg">Status do Veículo</h3>
                    <p className="text-silver/40 text-sm">Defina a visibilidade no site.</p>
                </div>
                <div className="flex gap-4">
                    {['active', 'sold', 'inactive'].map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setFormData({ ...formData, status: status as any })}
                            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase transition-all ${formData.status === status
                                    ? status === 'active' ? 'bg-green-500 text-white' : status === 'sold' ? 'bg-red-500 text-white' : 'bg-silver text-petrol'
                                    : 'bg-white/5 text-silver hover:bg-white/10'
                                }`}
                        >
                            {status === 'active' ? 'Ativo' : status === 'sold' ? 'Vendido' : 'Inativo'}
                        </button>
                    ))}
                </div>
            </div>

            {/* AI Auto-Fill Section (Only show if new or explicitly requested?) - Keeping it always for convenience */}
            {!initialData && (
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-purple-500/20 blur-[100px] pointer-events-none group-hover:bg-purple-500/30 transition-colors" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkle size={24} className="text-purple-400" weight="fill" />
                            <h3 className="text-xl font-bold text-white">Preencher com IA</h3>
                        </div>
                        <p className="text-silver/60 text-sm mb-4">
                            Digite o modelo e a IA buscará dados técnicos automaticamente.
                        </p>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={vehicleNameForAI}
                                onChange={(e) => setVehicleNameForAI(e.target.value)}
                                placeholder="Ex: Porsche 911 GT3 RS 2024"
                                className={`${inputStyles} flex-1`}
                                disabled={aiLoading}
                            />
                            <button
                                type="button"
                                onClick={handleAIFill}
                                disabled={aiLoading || !vehicleNameForAI.trim()}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                                         disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-bold
                                         flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-purple-500/20"
                            >
                                {aiLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Gerando...
                                    </>
                                ) : (
                                    <>
                                        <Sparkle size={20} weight="fill" />
                                        Mágica IA
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Fields */}
            <div className="bg-premium-carbon border border-white/5 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <CarIcon size={20} className="text-gold" />
                    Informações Principais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Marca</label>
                        <input name="brand" value={formData.brand} onChange={handleInputChange} className={inputStyles} placeholder="Ex: Ferrari" required />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Modelo</label>
                        <input name="model" value={formData.model} onChange={handleInputChange} className={inputStyles} placeholder="Ex: SF90 Stradale" required />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Preço (R$)</label>
                        <input name="price" value={formData.price} onChange={handleInputChange} className={inputStyles} placeholder="R$ 6.500.000" required />
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
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Potência (Ex: 1000cv)</label>
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
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Tipo</label>
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
            </div>

            {/* Tech Specs */}
            <div className="bg-premium-carbon border border-white/5 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <Sparkle size={20} className="text-gold" />
                    Especificações Técnicas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Combustível</label>
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
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Transmissão</label>
                        <select name="transmissionType" value={formData.transmissionType || ""} onChange={handleInputChange} className={inputStyles}>
                            <option value="">Não especificado</option>
                            <option value="Manual">Manual</option>
                            <option value="Automática">Automática</option>
                            <option value="CVT">CVT</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Cilindrada (Motos)</label>
                        <input name="cylinderCapacity" value={formData.cylinderCapacity || ""} onChange={handleInputChange} className={inputStyles} placeholder="Ex: 1000cc" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">HP (Náutico)</label>
                        <input name="horsePower" type="number" value={formData.horsePower || ""} onChange={handleInputChange} className={inputStyles} placeholder="Ex: 300" />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-premium-carbon border border-white/5 rounded-xl p-6">
                <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Descrição Detalhada</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`${inputStyles} h-40 py-4`}
                    placeholder="Descreva os detalhes exclusivos deste veículo..."
                    required
                />
            </div>

            {/* Media */}
            <div className="bg-premium-carbon border border-white/5 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <ImageIcon size={20} className="text-gold" />
                    Galeria de Mídia
                </h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-4">
                            Fotos <span className="text-gold">({imagePublicIds.length} enviadas)</span>
                            <span className="ml-2 text-gold text-[10px] normal-case bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                                {coverImageId ? "Capa definida" : "A primeira será a capa"}
                            </span>
                        </label>
                        <CloudinaryUploader
                            onUploadComplete={handleImageUpload}
                            maxFiles={50} // "Multiplas imagens"
                            folder={`cars/${formData.vehicleType}`}
                            resourceType="image"
                            acceptedFormats={['jpg', 'png', 'webp', 'heic']}
                            onSelectCover={handleSetCover}
                            selectedCoverId={coverImageId}
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-silver/60 mb-4">
                            Vídeo de Apresentação
                        </label>
                        <CloudinaryUploader
                            onUploadComplete={handleVideoUpload}
                            maxFiles={1}
                            folder={`cars/${formData.vehicleType}/videos`}
                            resourceType="video"
                            acceptedFormats={['mp4', 'mov', 'avi']}
                        />
                        {videoPublicId && (
                            <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
                                <Sparkle weight="fill" /> Vídeo anexado com sucesso
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="ghost" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit" size="lg" isLoading={loading} leftIcon={<FloppyDisk size={20} />}>
                    {initialData ? 'Salvar Alterações' : 'Cadastrar Veículo'}
                </Button>
            </div>
        </form>
    );
}

// Helper icon component
import { Image as ImageIcon } from "@phosphor-icons/react";
