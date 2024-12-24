import { Task } from "@/app/api/tasks/route";

interface TaskSummaryProps {
  tasks: Task[];
}

export default function TaskSummary({ tasks }: TaskSummaryProps) {
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-md shadow-md">
      <div className="text-lg font-semibold">
        <span className="text-blue-400">Tasks</span>: {tasks.length}
      </div>
      <div className="text-lg font-semibold">
        <span className="text-green-400">Completed</span>: {completedCount}
      </div>
    </div>
  );
}
