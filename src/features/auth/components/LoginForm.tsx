"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../slice";
import { AppDispatch, RootState } from "@/src/store/rootReducer";
import { useRouter } from "next/navigation";

function LoginForm() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, error, loading } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) router.push("/dashboard");
        dispatch(clearError());
    }, [user, router, dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(loginUser({ email, password }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
            <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                    type="email"
                    className="w-full border p-2 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@test.com"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Password</label>
                <input
                    type="password"
                    className="w-full border p-2 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123456"
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}

export default LoginForm;