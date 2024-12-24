"use client";

import { Task } from "../api/tasks/route";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import TaskSummary from "@/components/TaskSummary";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  // Fetch tasks from the API
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  // Toggle task completion
  const toggleCompletion = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  };

  // Delete task with confirmation
  const deleteTask = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-gray-800 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-blue-400 flex items-center">
            🚀 Todo App
          </h1>
          <button
            onClick={() => router.push("/task/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-500"
          >
            <span>Create Task</span>
            <span className="text-xl">➕</span>
          </button>
        </div>
      </header>

      {/* Task Summary */}
      <div className="container mx-auto mt-8 px-4">
        <TaskSummary tasks={tasks} />
      </div>

      {/* Task List */}
      <div className="container mx-auto px-4 mt-6">
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => toggleCompletion(task.id)}
                onDelete={() => deleteTask(task.id)}
                onEdit={() => router.push(`/task/${task.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-12">
            <div className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m2 0a9 9 0 11-6.999-8.36A9 9 0 0121 12z"
                />
              </svg>
            </div>
            <p className="text-gray-500 mt-4 text-center">
              You don’t have any tasks registered yet.
              <br />
              Create tasks and organize your to-do items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
