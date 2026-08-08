import Link from "next/link";
import { TaskDashboard } from "@/components/features/tasks/TaskDashboard";

export default function TasksPage() {
  return (
    <main className="stack">
      <TaskDashboard />
    </main>
  );
}
