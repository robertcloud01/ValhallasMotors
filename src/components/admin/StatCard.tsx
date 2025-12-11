export function StatCard({ label, value, trend, icon }: { label: string, value: string, trend: string, icon?: React.ReactNode }) {
    return (
        <div className="bg-premium-carbon border border-white/5 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
                <span className="text-silver/60 text-xs uppercase tracking-widest font-bold">{label}</span>
                {icon && <span className="text-gold">{icon}</span>}
            </div>
            <div className="flex items-end justify-between">
                <h3 className="text-3xl font-display font-bold text-white">{value}</h3>
                <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">{trend}</span>
            </div>
        </div>
    );
}
