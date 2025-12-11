"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { UploadSimple, X, Check, Star } from '@phosphor-icons/react';
import { getUploadPreset } from '@/lib/cloudinary';
import Image from 'next/image';

interface CloudinaryUploaderProps {
    onUploadComplete: (publicIds: string[]) => void;
    maxFiles?: number;
    folder?: string;
    resourceType?: 'image' | 'video' | 'auto';
    acceptedFormats?: string[];
    onSelectCover?: (publicId: string) => void;
    selectedCoverId?: string;
}

interface UploadedAsset {
    publicId: string;
    secureUrl: string;
    thumbnail: string;
    resourceType: string;
}

export function CloudinaryUploader({
    onUploadComplete,
    maxFiles = 10,
    folder = 'cars',
    resourceType = 'image',
    acceptedFormats = ['jpg', 'png', 'webp', 'mp4', 'mov'],
    onSelectCover,
    selectedCoverId,
}: CloudinaryUploaderProps) {
    const [uploadedAssets, setUploadedAssets] = useState<UploadedAsset[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const uploadPreset = getUploadPreset();

    const handleUploadSuccess = (result: any) => {
        const asset: UploadedAsset = {
            publicId: result.info.public_id,
            secureUrl: result.info.secure_url,
            thumbnail: result.info.thumbnail_url || result.info.secure_url,
            resourceType: result.info.resource_type,
        };

        // Defer state update to avoid React warning
        setTimeout(() => {
            setUploadedAssets(prev => {
                const updated = [...prev, asset];
                // Send URLs back to parent
                onUploadComplete(updated.map(a => a.publicId));
                return updated;
            });
        }, 0);
    };

    const removeAsset = (index: number) => {
        setTimeout(() => {
            setUploadedAssets(prev => {
                const updated = prev.filter((_, i) => i !== index);
                onUploadComplete(updated.map(a => a.publicId));
                return updated;
            });
        }, 0);
    };

    return (
        <div className="space-y-6">
            {/* Upload Button */}
            <CldUploadWidget
                uploadPreset={uploadPreset}
                options={{
                    folder,
                    maxFiles,
                    resourceType,
                    clientAllowedFormats: acceptedFormats,
                    maxFileSize: 10000000, // 10MB
                    multiple: true,
                    sources: ['local', 'url', 'camera'],
                }}
                onSuccess={(result: any) => {
                    console.log("✅ Upload success!", result);
                    handleUploadSuccess(result);
                }}
                onError={(error: any) => {
                    console.error("❌ Upload error:", error);
                }}
                onOpen={() => {
                    console.log("📤 Upload widget opened");
                    setIsUploading(true);
                }}
                onClose={() => {
                    console.log("📪 Upload widget closed");
                    setIsUploading(false);
                }}
            >
                {({ open }) => (
                    <button
                        type="button"
                        onClick={() => open()}
                        disabled={uploadedAssets.length >= maxFiles}
                        className="w-full border-2 border-dashed border-white/10 rounded-xl p-12 
                                 hover:border-gold/50 transition-all duration-300
                                 bg-premium-carbon/30 hover:bg-premium-carbon/50
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 group"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center
                                          group-hover:bg-gold/20 transition-colors">
                                <UploadSimple
                                    size={32}
                                    className="text-gold group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-white font-medium mb-1">
                                    {isUploading ? 'Enviando...' : 'Enviar Mídias'}
                                </p>
                                <p className="text-silver/60 text-sm">
                                    Clique ou arraste {resourceType === 'image' ? 'imagens' : 'vídeos'} aqui
                                </p>
                                <p className="text-silver/40 text-xs mt-2">
                                    Máximo: {maxFiles} arquivos | Formatos: {acceptedFormats.join(', ')}
                                </p>
                            </div>
                        </div>
                    </button>
                )}
            </CldUploadWidget>

            {/* Preview Grid */}
            {uploadedAssets.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold">
                            ✓ {uploadedAssets.length} {uploadedAssets.length === 1 ? 'arquivo enviado' : 'arquivos enviados'}
                        </h3>
                        <span className="text-silver/60 text-sm">
                            {uploadedAssets.length}/{maxFiles}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {uploadedAssets.map((asset, index) => (
                            <div
                                key={asset.publicId}
                                className={`relative group aspect-square rounded-xl overflow-hidden 
                                         bg-premium-carbon border-2 
                                         ${selectedCoverId === asset.publicId ? "border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "border-green-500/30 hover:border-green-500/50"}
                                         transition-all duration-300`}
                            >
                                {/* Preview Image */}
                                <Image
                                    src={asset.thumbnail}
                                    alt={`Upload ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                    {onSelectCover && resourceType === 'image' && (
                                        <button
                                            type="button"
                                            onClick={() => onSelectCover(asset.publicId)}
                                            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors
                                                ${selectedCoverId === asset.publicId
                                                    ? "bg-gold text-black hover:bg-gold/90"
                                                    : "bg-white/20 text-white hover:bg-white/30"}`}
                                        >
                                            <Star size={16} weight={selectedCoverId === asset.publicId ? "fill" : "bold"} />
                                            {selectedCoverId === asset.publicId ? "Destaque" : "Destacar"}
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => removeAsset(index)}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg 
                                                 text-white font-bold text-sm flex items-center gap-2
                                                 transition-colors"
                                    >
                                        <X size={16} weight="bold" />
                                        Remover
                                    </button>
                                </div>

                                {/* Success Badge */}
                                <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-green-500 
                                             flex items-center gap-1.5">
                                    <Check size={12} weight="bold" className="text-white" />
                                    <span className="text-white text-xs font-bold">OK</span>
                                </div>

                                {/* Cover Badge */}
                                {selectedCoverId === asset.publicId && (
                                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gold 
                                                 flex items-center gap-1.5 shadow-lg">
                                        <Star size={12} weight="fill" className="text-black" />
                                        <span className="text-black text-xs font-bold">CAPA</span>
                                    </div>
                                )}

                                {/* Resource Type */}
                                {asset.resourceType === 'video' && (
                                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded 
                                                 bg-black/80 text-xs text-white font-bold">
                                        📹 Vídeo
                                    </div>
                                )}

                                {/* Index Number */}
                                <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full 
                                             bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{index + 1}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
