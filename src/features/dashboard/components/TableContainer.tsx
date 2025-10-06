"use client";
import React from "react";

export function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead className="bg-gray-100 border-b">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>;
}

export function TableContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="overflow-x-auto border rounded-lg shadow bg-white">
            <table className="min-w-full border-collapse">{children}</table>
        </div>
    );
}
