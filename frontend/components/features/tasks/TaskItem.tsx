import type { Task } from "@/types/api";
import { CheckCircle2, Clock, Trash2, Loader2 } from "lucide-react";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  deleting: boolean;
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export function TaskItem({ task, busy,deleting, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <p className={`font-semibold text-slate-800 text-base ${task.completed ? "line-through text-slate-400" : ""}`}>
            {task.title}
          </p>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              task.completed
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-amber-50 text-amber-600 border border-amber-200"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <div className="flex items-center text-xs text-slate-400 gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated: {new Date(task.updatedAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 sm:pt-0">
        <button
          type="button"
          className={`px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors ${
            task.completed
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
              : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        >
          {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
          {busy ? "Saving..." : task.completed ? "Mark Pending" : "Mark Completed"}
        </button>

        <button
          type="button"
          className="p-2 text-xs font-semibold rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
          onClick={() => onDelete(task.id)}
          disabled={deleting}
          aria-label={`Delete task ${task.title}`}
        >
          {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </li>
  );
}
