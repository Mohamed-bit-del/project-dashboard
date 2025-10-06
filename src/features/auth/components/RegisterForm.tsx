"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../slice";
import { RootState, AppDispatch } from "@/src/store/rootReducer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const registerSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["Admin", "ProjectManager", "Developer"] as const, {
        message: "Role is required",
    }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { error, user, loading } = useSelector((state: RootState) => state.auth);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: "", password: "", role: "Developer" },
    });

    const onSubmit = (data: RegisterFormData) => {
        dispatch(registerUser(data));
    };

    useEffect(() => {
        if (user) router.push("/dashboard");
    }, [user, router]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 rounded-lg shadow-md">
            <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                    {...form.register("email")}
                    type="email"
                    placeholder="user@example.com"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
            </div>

            <div>
                <label className="block font-medium mb-1">Password</label>
                <input
                    {...form.register("password")}
                    type="password"
                    placeholder="••••••"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
                )}
            </div>

            <div>
                <label className="block font-medium mb-1">Role</label>
                <select
                    {...form.register("role")}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                >
                    <option value="Admin">Admin</option>
                    <option value="ProjectManager">Project Manager</option>
                    <option value="Developer">Developer</option>
                </select>
                {form.formState.errors.role && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.role.message}</p>
                )}
            </div>

            {error && (
                <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md">{error}</div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}

export default RegisterForm;