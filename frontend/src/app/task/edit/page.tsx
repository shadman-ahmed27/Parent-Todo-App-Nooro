"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Task } from "@/app/api/tasks/route";

export default function EditTaskPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get("id");
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!taskId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch task");
        return res.json();
      })
      .then((task) => setTask(task))
      .catch((err) => alert(err.message));
  }, [taskId]);

  const updateTask = async () => {
    if (!task?.title) return alert("Title is required.");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      router.push("/home");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="w-full max-w-md p-6">
        <h1 className="text-center text-4xl font-bold text-blue-400 mb-8">
          Todo App
        </h1>
        {task ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <label className="block text-sm mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
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
                  onClick={() => setTask({ ...task, color: bgColor })}
                  className={`h-8 w-8 rounded-full cursor-pointer border-2 ${
                    task.color === bgColor ? "border-white" : "border-gray-500"
                  } ${bgColor}`}
                ></div>
              ))}
            </div>
            <button
              onClick={updateTask}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-md flex items-center justify-center"
            >
              Save &#10003;
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Loading task...</p>
        )}
      </div>
    </div>
  );
}
