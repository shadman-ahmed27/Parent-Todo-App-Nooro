"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("bg-blue-800");

  const createTask = async () => {
    if (!title) return alert("Title is required.");
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, color, completed: false }),
    });
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-400 mb-4">Create Task</h1>
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border border-gray-700 bg-gray-900 text-white p-2 w-full mb-4 rounded"
          />
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border border-gray-700 bg-gray-900 text-white p-2 w-full mb-4 rounded"
          >
            <option value="bg-blue-800">Blue</option>
            <option value="bg-red-800">Red</option>
            <option value="bg-green-800">Green</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              onClick={createTask}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Create
            </button>
            <button
              onClick={() => router.push("/home")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
