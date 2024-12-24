import { NextResponse } from 'next/server';

export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}

// In-memory tasks array
let tasks: Task[] = [];

// GET all tasks
export async function GET() {
  return NextResponse.json(tasks);
}

// POST to create a new task
export async function POST(req: Request) {
  const newTask: Task = await req.json();
  tasks.push({ ...newTask, id: Date.now().toString() });
  return NextResponse.json({ success: true });
}

// PATCH to update a task
export async function PATCH(req: Request) {
  const updatedTask: Task = await req.json();
  tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
  return NextResponse.json({ success: true });
}

// DELETE a task
export async function DELETE(req: Request) {
  const { id } = await req.json();
  tasks = tasks.filter(task => task.id !== id);
  return NextResponse.json({ success: true });
}
