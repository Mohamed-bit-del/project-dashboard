"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store/rootReducer";
import { editProjectField, deleteProject, } from "@/src/features/dashboard/slice";
import ProjectsTable from "@/src/features/dashboard/components/ProjectsTable";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  const handleEdit = (id: number, field: any, value: any) => {
    dispatch(editProjectField({ id, field, value }));
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">📊 Projects Dashboard</h1>
      <ProjectsTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
