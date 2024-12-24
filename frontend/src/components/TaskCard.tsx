"use client";

import { Task } from "@/app/api/tasks/route";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const router = useRouter();

  return (
    <div
      className={`p-4 rounded-md shadow-md flex items-center justify-between ${
        task.completed ? "bg-green-900" : task.color || "bg-gray-800"
      } cursor-pointer`}
      onClick={() => router.push(`/task/edit?id=${task.id}`)} // Navigate to edit page
    >
      <div className="text-white flex-grow">
        <h3 className={`font-bold ${task.completed ? "line-through" : ""}`}>
          {task.title}
        </h3>
      </div>
      <div className="flex items-center space-x-4">
        {/* Prevent checkbox click from triggering navigation */}
        <input
          type="checkbox"
          checked={task.completed}
          onClick={(e) => e.stopPropagation()} // Prevent click from propagating to parent
          onChange={onToggle} // Trigger completion toggle
          className="cursor-pointer"
        />
        {/* Prevent delete button click from triggering navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating to parent
            onDelete();
          }}
          className="text-red-500 hover:text-red-400"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
