"use client";

import { useCallback } from "react";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/features/tasks/StatusFilter";
import { TaskList } from "@/components/features/tasks/TaskList";
import { DashboardBanner } from "@/components/ui/DashboardBanner";
import { TaskModal } from "@/components/ui/TaskModal";
import { RefreshCw, Loader2 } from "lucide-react";

export function TaskDashboard() {
  const {
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    deletingTaskId,
    isCreating,
    setFilter,
    fetchTasks,
    updateTask,
    deleteTask,
    createTask,
  } = useTasks();

  const handleToggle = useCallback(
    (task: Task) => {
      updateTask(task.id, { completed: !task.completed });
    },
    [updateTask]
  );

  const handleDelete = useCallback(
    (taskId: string) => {
      deleteTask(taskId);
    },
    [deleteTask]
  );

  const handleCreate = useCallback(
    async (data: { title: string; completed: boolean }) => {
      await createTask(data);
    },
    [createTask]
  );

  return (
    <section className="space-y-6">
      <DashboardBanner
        title="Task Dashboard"
        description="Manage your tasks, track progress, and perform actions seamlessly."
        actionButton={<TaskModal onSubmit={handleCreate} isLoading={isCreating} />}
      />

      <div className="flex justify-between items-center flex-wrap gap-4 pt-2">
        <StatusFilter value={filter} onChange={setFilter} />
        <span className="text-xs font-semibold text-slate-400">
          Showing {filteredTasks.length} task(s)
        </span>
      </div>

      {loading ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 flex justify-center items-center text-purple-600">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : null}

      {error && filteredTasks.length === 0 ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-700 flex justify-between items-center">
          <p className="text-sm font-medium">{error}</p>
          <button
            type="button"
            className="px-4 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl flex items-center gap-1.5 hover:bg-rose-700 transition-colors"
            onClick={fetchTasks}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      ) : null}

      {!loading ? (
        <TaskList
          tasks={filteredTasks}
          updatingTaskId={updatingTaskId}
          deletingTaskId={deletingTaskId}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ) : null}
    </section>
  );
}