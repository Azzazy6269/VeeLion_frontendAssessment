import type { Task } from "@/types/api";
import { TaskItem } from "@/components/features/tasks/TaskItem";

type TaskListProps = {
  tasks: Task[];
  updatingTaskId: string;
  deletingTaskId?: string;
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export function TaskList({ tasks, updatingTaskId, deletingTaskId, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <section className="bg-white border border-slate-100 rounded-2xl p-8 text-center">
        <p className="text-slate-400 font-medium text-sm">No tasks match this filter.</p>
      </section>
    );
  }

  return (
    <section aria-label="Task list">
      <ul className="list-none m-0 p-0 grid gap-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            busy={updatingTaskId === task.id}
            deleting={deletingTaskId === task.id}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
