"use client";
import React from "react";

interface FiltersBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusChange: (value: string) => void;
}

export default function FiltersBar({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusChange,
}: FiltersBarProps) {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-4 bg-gray-50 p-4 rounded-lg shadow-sm border">
            {/* 🔍 البحث */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by project name..."
                className="border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* 🏷️ فلترة بالحالة */}
            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    );
}
