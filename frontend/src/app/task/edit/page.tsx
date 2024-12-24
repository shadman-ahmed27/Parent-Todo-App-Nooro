"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Task } from "@/app/api/tasks/route";

export default function EditTaskPage() {
  const searchParams = useSearchParams(); // Get query parameters
  const router = useRouter();
  const taskId = searchParams.get("id"); // Extract the task ID from query
  const [task, setTask] = useState<Task | null>(null);

  // Fetch the task by ID
  useEffect(() => {
    if (!taskId) return;

    fetch(`/api/tasks`)
      .then((res) => res.json())
      .then((tasks) => setTask(tasks.find((t: Task) => t.id === taskId)));
  }, [taskId]);

  const updateTask = async () => {
    if (!task?.title) return alert("Title is required.");
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    router.push("/home"); // Navigate back to home after updating
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-400 mb-4">Edit Task</h1>
        {task ? (
          <div className="bg-gray-800 p-4 rounded-md shadow-md">
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Title"
              className="border border-gray-700 bg-gray-900 text-white p-2 w-full mb-4 rounded"
            />
            <select
              value={task.color}
              onChange={(e) => setTask({ ...task, color: e.target.value })}
              className="border border-gray-700 bg-gray-900 text-white p-2 w-full mb-4 rounded"
            >
              <option value="bg-blue-800">Blue</option>
              <option value="bg-red-800">Red</option>
              <option value="bg-green-800">Green</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={updateTask}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
              >
                Save
              </button>
              <button
                onClick={() => router.push("/home")}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Loading task...</p>
        )}
      </div>
    </div>
  );
}
