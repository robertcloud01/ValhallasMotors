"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { getCars, type Car } from "@/services/cars";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Pencil, Trash, Plus, MagnifyingGlass, Funnel, SortAscending, SortDescending, List as ListIcon, GridFour } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { filterCars, sortCars, FilterState } from "@/lib/adminFilters";

export default function VehiclesManagementPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [vehicles, setVehicles] = useState<Car[]>([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterState>({
        query: "",
        vehicleType: 'all',
        minPrice: "",
        maxPrice: "",
        year: ""
    });
    const [sortBy, setSortBy] = useState('date_desc');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push("/admin/login");
    }, [user, loading, router]);

    useEffect(() => {
        async function fetchVehicles() {
            const data = await getCars();
            setVehicles(data);
            setLoadingVehicles(false);
        }
        if (user) fetchVehicles();
    }, [user]);

    // Computed Inventory
    const processedVehicles = useMemo(() => {
        if (!vehicles.length) return [];
        const filtered = filterCars(vehicles, { ...filters, query: searchQuery });
        return sortCars(filtered, sortBy);
    }, [vehicles, searchQuery, filters, sortBy]);


    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este veículo?")) return;
        try {
            if (db) {
                await deleteDoc(doc(db, "cars", id));
                setVehicles(vehicles.filter(v => v.id !== id));
                // Toast success here
            }
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Erro ao excluir");
        }
    };

    if (loading || loadingVehicles) return <div className="h-screen flex items-center justify-center text-white">Carregando Inventário...</div>;
    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-petrol">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 md:p-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white mb-2">
                            Inventário
                        </h1>
                        <p className="text-silver/60">
                            Gerencie seus {vehicles.length} veículos cadastrados.
                        </p>
                    </div>
                    <Button href="/admin/new" leftIcon={<Plus size={20} />}>
                        Novo Veículo
                    </Button>
                </div>

                {/* Toolbar */}
                <div className="bg-premium-carbon border border-white/5 rounded-xl p-4 mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center sticky top-4 z-30 shadow-2xl">
                    {/* Search */}
                    <div className="relative w-full lg:w-96 group">
                        <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/40 group-focus-within:text-gold transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar por marca, modelo, ano..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50 transition-colors placeholder:text-silver/30"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${showFilters ? 'bg-gold/10 border-gold text-gold' : 'bg-transparent border-white/10 text-silver hover:text-white'}`}
                        >
                            <Funnel size={18} weight={showFilters ? "fill" : "regular"} />
                            Filtros
                        </button>

                        <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block" />

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-black/20 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-silver focus:outline-none focus:border-gold/50 cursor-pointer"
                        >
                            <option value="date_desc">Mais recentes</option>
                            <option value="date_asc">Mais antigos</option>
                            <option value="price_desc">Maior Preço</option>
                            <option value="price_asc">Menor Preço</option>
                            <option value="year_desc">Ano: Novo &gt; Velho</option>
                        </select>

                        <div className="bg-black/20 border border-white/10 rounded-lg p-1 flex items-center gap-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-silver/40 hover:text-white'}`}
                            >
                                <GridFour size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-silver/40 hover:text-white'}`}
                            >
                                <ListIcon size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Expanded Filters Panel */}
                {showFilters && (
                    <div className="bg-premium-carbon border border-white/5 rounded-xl p-6 mb-8 animate-slide-up grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="text-xs uppercase text-silver/40 font-bold mb-2 block">Tipo</label>
                            <select
                                value={filters.vehicleType}
                                onChange={(e) => setFilters({ ...filters, vehicleType: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white text-sm"
                            >
                                <option value="all">Todos</option>
                                <option value="car">Carros</option>
                                <option value="moto">Motos</option>
                                <option value="suv">SUVs</option>
                                <option value="boat">Lanchas/Iates</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs uppercase text-silver/40 font-bold mb-2 block">Ano (Exato)</label>
                            <input
                                type="number"
                                placeholder="2024"
                                value={filters.year}
                                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase text-silver/40 font-bold mb-2 block">Preço Mín (R$)</label>
                            <input
                                type="number"
                                placeholder="0"
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase text-silver/40 font-bold mb-2 block">Preço Máx (R$)</label>
                            <input
                                type="number"
                                placeholder="Unlimited"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white text-sm"
                            />
                        </div>
                    </div>
                )}

                {/* Results Inventory */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processedVehicles.map((vehicle) => (
                            <div key={vehicle.id} className="bg-premium-carbon border border-white/5 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300 group">
                                <div className="relative h-56">
                                    {vehicle.thumbnail || vehicle.images[0] ? (
                                        <CloudinaryImage
                                            src={vehicle.thumbnail || vehicle.images[0]}
                                            alt={vehicle.model}
                                            width={500}
                                            height={350}
                                            preset="card"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-black/20 flex items-center justify-center text-silver/30">Sem Foto</div>
                                    )}
                                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full text-green-400 text-xs font-bold shadow-lg">
                                        ATIVO
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-gold text-[10px] uppercase font-bold tracking-widest">{vehicle.brand}</span>
                                        <h3 className="text-white font-bold text-lg truncate">{vehicle.model}</h3>
                                        <p className="text-white font-light text-sm opacity-90">{vehicle.price}</p>
                                    </div>
                                </div>
                                <div className="p-4 grid grid-cols-2 gap-2 border-t border-white/5">
                                    <Link href={`/admin/edit/${vehicle.id}`} className="flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-silver hover:text-white transition-colors">
                                        <Pencil size={16} /> Editar
                                    </Link>
                                    <button onClick={() => handleDelete(vehicle.id)} className="flex items-center justify-center gap-2 py-2 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 transition-colors">
                                        <Trash size={16} /> Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-premium-carbon border border-white/5 rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-black/20 border-b border-white/5 text-left">
                                <tr>
                                    <th className="p-4 text-xs font-bold uppercase text-silver/40 tracking-widest">Veículo</th>
                                    <th className="p-4 text-xs font-bold uppercase text-silver/40 tracking-widest">Preço</th>
                                    <th className="p-4 text-xs font-bold uppercase text-silver/40 tracking-widest">Ano/Km</th>
                                    <th className="p-4 text-xs font-bold uppercase text-silver/40 tracking-widest">Data</th>
                                    <th className="p-4 text-xs font-bold uppercase text-silver/40 tracking-widest text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {processedVehicles.map((vehicle) => (
                                    <tr key={vehicle.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-black/30 rounded-lg overflow-hidden flex-shrink-0">
                                                {vehicle.thumbnail || vehicle.images[0] ? (
                                                    <CloudinaryImage
                                                        src={vehicle.thumbnail || vehicle.images[0]}
                                                        alt="Thumb"
                                                        width={100}
                                                        height={100}
                                                        preset="card"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : null}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-sm">{vehicle.brand} {vehicle.model}</div>
                                                <div className="text-silver/40 text-xs">{vehicle.category}</div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-white font-medium text-sm">{vehicle.price}</td>
                                        <td className="p-4 text-silver/60 text-sm">{vehicle.year} • {vehicle.km}km</td>
                                        <td className="p-4 text-silver/60 text-sm">
                                            {new Date(vehicle.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <Link href={`/admin/edit/${vehicle.id}`} className="inline-block p-2 text-gold hover:bg-gold/10 rounded transition-colors">
                                                <Pencil size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(vehicle.id)} className="inline-block p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors">
                                                <Trash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty State with Search Feedback */}
                {processedVehicles.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
                        <MagnifyingGlass size={48} className="text-silver/20 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                            Nenhum resultado encontrado
                        </h3>
                        <p className="text-silver/60 mb-6">
                            Tente ajustar seus filtros ou busca.
                        </p>
                        <button onClick={() => { setSearchQuery(""); setFilters({ query: "", vehicleType: 'all', minPrice: "", maxPrice: "", year: "" }) }} className="text-gold hover:underline text-sm">
                            Limpar Filtros
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
