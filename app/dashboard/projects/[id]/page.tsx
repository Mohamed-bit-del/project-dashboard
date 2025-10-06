"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/rootReducer";
import { editProjectField } from "@/src/features/dashboard/slice";

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const project = useSelector((state: RootState) =>
        state.projects.projects.find((p) => p.id === Number(id))
    );

    if (!project) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Project not found.</p>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-4 bg-gray-200 px-3 py-1 rounded"
                >
                    ← Back
                </button>
            </div>
        );
    }

    const handleEdit = (field: keyof typeof project, value: any) => {
        dispatch(editProjectField({ id: project.id, field, value }));
    };

    return (
        <div className="p-6 space-y-4">
            <button
                onClick={() => router.push("/dashboard")}
                className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded"
            >
                ← Back
            </button>

            <h1 className="text-2xl font-bold mb-4">
                🧩 {project.name} — Details
            </h1>

            <div className="space-y-3 max-w-lg">
                <div>
                    <label className="block font-medium">Name:</label>
                    <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleEdit("name", e.target.value)}
                        className="border rounded w-full px-2 py-1"
                    />
                </div>

                <div>
                    <label className="block font-medium">Status:</label>
                    <select
                        value={project.status}
                        onChange={(e) =>
                            handleEdit("status", e.target.value as typeof project.status)
                        }
                        className="border rounded px-2 py-1"
                    >
                        <option>Active</option>
                        <option>Completed</option>
                        <option>Pending</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium">Progress (%):</label>
                    <input
                        type="number"
                        value={project.progress}
                        onChange={(e) => handleEdit("progress", Number(e.target.value))}
                        className="border rounded w-full px-2 py-1"
                    />
                </div>

                <div>
                    <label className="block font-medium">Budget ($):</label>
                    <input
                        type="number"
                        value={project.budget}
                        onChange={(e) => handleEdit("budget", Number(e.target.value))}
                        className="border rounded w-full px-2 py-1"
                    />
                </div>
            </div>
        </div>
    );
}
