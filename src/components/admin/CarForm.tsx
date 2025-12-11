"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Sparkle, Car as CarIcon } from "@phosphor-icons/react";

export function CarForm() {
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
        fuelType: undefined as any,
        cylinderCapacity: undefined as any,
        horsePower: undefined as any,
        transmissionType: undefined as any,
    });

    const [imagePublicIds, setImagePublicIds] = useState<string[]>([]);
    const [videoPublicId, setVideoPublicId] = useState<string>("");
    const [coverImageId, setCoverImageId] = useState<string>("");

    // Memoize callbacks to prevent re-renders during upload
    const handleImageUpload = useCallback((publicIds: string[]) => {
        setImagePublicIds(publicIds);
        // If no cover is selected and we have images, set the first one as cover
        setCoverImageId(prev => prev || publicIds[0] || "");
    }, []);

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

            if (!response.ok) {
                throw new Error("Erro na API");
            }

            const data = await response.json();

            // Fill form with AI data
            setFormData(prev => ({
                ...prev,
                brand: data.marca || "",
                model: data.modelo || "",
                price: data.valorEstimado || "",
                year: data.ano ? Number(data.ano) : new Date().getFullYear(),
                power: data.potencia || "",
                description: data.descricao || "",
                category: data.categoria || "Supercar",
                // Attempt to map fuel type if possible, or leave as is
                fuelType: ["Gasolina", "Etanol", "Flex", "Diesel", "Elétrico", "Híbrido"].includes(data.combustivel) ? data.combustivel : prev.fuelType,
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
            alert("Firebase não configurado. Configure o Firebase primeiro.");
            return;
        }

        setLoading(true);

        try {
            // Remove undefined values (Firestore doesn't support them)
            const dataToSave: any = {
                brand: formData.brand,
                model: formData.model,
                price: formData.price,
                year: Number(formData.year),
                km: Number(formData.km),
                power: formData.power,
                description: formData.description,
                category: formData.category,
                vehicleType: formData.vehicleType,
                images: imagePublicIds,
                thumbnail: coverImageId || imagePublicIds[0],
                createdAt: new Date(),
            };

            // Add optional fields only if they have values
            if (formData.fuelType) dataToSave.fuelType = formData.fuelType;
            if (formData.cylinderCapacity) dataToSave.cylinderCapacity = formData.cylinderCapacity;
            if (formData.horsePower) dataToSave.horsePower = Number(formData.horsePower);
            if (formData.transmissionType) dataToSave.transmissionType = formData.transmissionType;
            if (videoPublicId) dataToSave.video = videoPublicId;

            await addDoc(collection(db!, "cars"), dataToSave);

            router.push("/admin/vehicles");
        } catch (error: any) {
            console.error("Error saving car:", error);
            const errorMessage = error.message || error.toString();
            alert(`Erro ao salvar veículo: ${errorMessage}\n\nVerifique as regras do Firestore no Firebase Console.`);
        } finally {
            setLoading(false);
        }
    };

    const inputStyles = "w-full bg-premium-carbon border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-gold transition-colors";

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            {/* AI Auto-Fill Section */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkle size={24} className="text-purple-400" weight="fill" />
                    <h3 className="text-xl font-bold text-white">Preencher com IA</h3>
                </div>
                <p className="text-silver/60 text-sm mb-4">
                    Digite o nome do veículo (ex: "BMW M4 2022" ou "Ducati Panigale V4") e a IA preencherá todos os dados automaticamente!
                </p>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={vehicleNameForAI}
                        onChange={(e) => setVehicleNameForAI(e.target.value)}
                        placeholder="Ex: Ferrari SF90 Stradale 2024"
                        className={`${inputStyles} flex-1`}
                        disabled={aiLoading}
                    />
                    <button
                        type="button"
                        onClick={handleAIFill}
                        disabled={aiLoading || !vehicleNameForAI.trim()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                                 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-bold
                                 flex items-center gap-2 transition-all hover:scale-105"
                    >
                        {aiLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Gerando...
                            </>
                        ) : (
                            <>
                                <Sparkle size={20} weight="fill" />
                                Gerar com IA
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Existing Form Fields */}
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
                    <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Preço</label>
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
                    <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Potência</label>
                    <input name="power" value={formData.power} onChange={handleInputChange} className={inputStyles} placeholder="1000 cv" required />
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

            <div>
                <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">Descrição</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`${inputStyles} h-32 py-4`}
                    placeholder="Descrição premium do veículo..."
                    required
                />
            </div>

            {/* Images */}
            <div>
                <label className="block text-xs uppercase tracking-widest text-silver/60 mb-4">
                    Fotos do Veículo <span className="text-red-400">*</span>
                    <span className="ml-2 text-gold text-[10px] normal-case bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                        {coverImageId ? "Foto de capa selecionada" : "A primeira foto será a capa"}
                    </span>
                </label>
                <CloudinaryUploader
                    onUploadComplete={handleImageUpload}
                    maxFiles={999}
                    folder={`cars/${formData.vehicleType}`}
                    resourceType="image"
                    acceptedFormats={['jpg', 'png', 'webp', 'heic']}
                    onSelectCover={handleSetCover}
                    selectedCoverId={coverImageId}
                />
            </div>

            {/* Video */}
            <div>
                <label className="block text-xs uppercase tracking-widest text-silver/60 mb-4">
                    Vídeo do Veículo <span className="text-silver/40">(Opcional)</span>
                </label>
                <CloudinaryUploader
                    onUploadComplete={handleVideoUpload}
                    maxFiles={1}
                    folder={`cars/${formData.vehicleType}/videos`}
                    resourceType="video"
                    acceptedFormats={['mp4', 'mov', 'avi']}
                />
            </div>

            <Button type="submit" size="lg" isLoading={loading} leftIcon={<CarIcon size={20} />}>
                Salvar Veículo
            </Button>
        </form>
    );
}
