"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("bg-blue-800");

  const createTask = async () => {
    if (!title) return alert("Title is required.");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, color, completed: false }),
    });
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="w-full max-w-md p-6">
        <h1 className="text-center text-4xl font-bold text-blue-400 mb-8">
          Todo App
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <label className="block text-sm mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Brush your teeth"
            className="block w-full text-sm bg-gray-700 text-white p-3 rounded-md mb-6 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="block text-sm mb-2">Color</label>
          <div className="flex items-center justify-between mb-6">
            {[
              "bg-blue-800",
              "bg-red-800",
              "bg-green-800",
              "bg-yellow-800",
              "bg-purple-800",
              "bg-pink-800",
              "bg-orange-800",
              "bg-teal-800",
              "bg-gray-700",
            ].map((bgColor) => (
              <div
                key={bgColor}
                onClick={() => setColor(bgColor)}
                className={`h-8 w-8 rounded-full cursor-pointer border-2 ${
                  color === bgColor ? "border-white" : "border-gray-500"
                } ${bgColor}`}
              ></div>
            ))}
          </div>
          <button
            onClick={createTask}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-md flex items-center justify-center"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
