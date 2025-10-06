"use client";
import React from "react";
import { TableContainer, TableHeader, TableBody } from "./TableContainer";

interface Task {
    id: number;
    title: string;
    status: "Pending" | "In Progress" | "Done";
}

interface TasksTableProps {
    tasks: Task[];
    onEdit: (id: number, field: keyof Task, value: any) => void;
    onDelete: (id: number) => void;
}

export default function TasksTable({ tasks, onEdit, onDelete }: TasksTableProps) {
    return (
        <TableContainer>
            <TableHeader>
                <tr>
                    <th className="px-4 py-2 text-left">Task</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                </tr>
            </TableHeader>

            <TableBody>
                {tasks.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">
                            <input
                                type="text"
                                value={t.title}
                                onChange={(e) => onEdit(t.id, "title", e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <select
                                value={t.status}
                                onChange={(e) =>
                                    onEdit(t.id, "status", e.target.value as Task["status"])
                                }
                                className="border rounded px-2 py-1"
                            >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Done</option>
                            </select>
                        </td>
                        <td className="px-4 py-2 text-center">
                            <button
                                onClick={() => onDelete(t.id)}
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
