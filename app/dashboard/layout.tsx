"use client";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/src/features/auth/slice";
import { RootState } from "@/src/store/rootReducer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    if (typeof window === "undefined") return null;

    useEffect(() => {
        if (!user) {
            router.push("/auth");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        {user.email} ({user.role})
                    </span>

                    <button
                        onClick={() => dispatch(logout())}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
