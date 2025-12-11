"use client";

import { AuthProvider } from "@/contexts/AuthContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black">
                {children}
            </div>
        </AuthProvider>
    );
}
