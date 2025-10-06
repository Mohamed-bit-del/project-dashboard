"use client";
import { useState } from "react";
import { LoginForm, RegisterForm } from "@/src/features/auth";

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");

    return (
        <div className="w-full max-w-lg mx-auto p-10 bg-white rounded-3xl relative z-10 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
            {/* Tabs */}
            <div className="flex mb-8 border-b">
                <button
                    className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === "login"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                        }`}
                    onClick={() => setActiveTab("login")}
                >
                    Login
                </button>
                <button
                    className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === "register"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                        }`}
                    onClick={() => setActiveTab("register")}
                >
                    Register
                </button>
            </div>

            {/* Forms */}
            <div>
                {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>

    );
}
