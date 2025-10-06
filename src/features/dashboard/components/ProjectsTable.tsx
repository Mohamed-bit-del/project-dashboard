"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TableContainer, TableHeader, TableBody } from "./TableContainer";

interface Project {
    id: number;
    name: string;
    status: "Pending" | "In Progress" | "Completed";
    start: string;
    end: string;
    progress: number;
    budget: number;
}

interface ProjectsTableProps {
    projects: Project[];
    onEdit: (id: number, field: keyof Project, value: any) => void;
    onDelete: (id: number) => void;
}

export default function ProjectsTable({ projects, onEdit, onDelete }: ProjectsTableProps) {
    const router = useRouter();

    return (
        <TableContainer>
            <TableHeader>
                <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Start</th>
                    <th className="px-4 py-2 text-left">End</th>
                    <th className="px-4 py-2 text-left">Progress</th>
                    <th className="px-4 py-2 text-left">Budget ($)</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                </tr>
            </TableHeader>

            <TableBody>
                {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 border-b">
                        <td className="px-4 py-2">{p.name}</td>

                        <td className="px-4 py-2">
                            <select
                                value={p.status}
                                onChange={(e) => onEdit(p.id, "status", e.target.value as Project["status"])}
                                className="border rounded px-2 py-1"
                            >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </td>

                        <td className="px-4 py-2">{p.start}</td>
                        <td className="px-4 py-2">{p.end}</td>

                        <td className="px-4 py-2">
                            <input
                                type="number"
                                value={p.progress}
                                onChange={(e) => onEdit(p.id, "progress", Number(e.target.value))}
                                className="w-16 border rounded px-2 py-1"
                            />
                            %
                        </td>

                        <td className="px-4 py-2">
                            <input
                                type="number"
                                value={p.budget}
                                onChange={(e) => onEdit(p.id, "budget", Number(e.target.value))}
                                className="w-20 border rounded px-2 py-1"
                            />
                        </td>

                        <td className="px-4 py-2 flex items-center gap-2 justify-center">
                            <button
                                onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            >
                                Details
                            </button>
                            <button
                                onClick={() => onDelete(p.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </TableBody>
        </TableContainer>
    );
}
