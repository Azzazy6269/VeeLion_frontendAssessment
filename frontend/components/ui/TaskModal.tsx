"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type TaskModalProps = {
  onSubmit: (data: { title: string; completed: boolean }) => Promise<void>;
  isLoading: boolean;
};

export function TaskModal({ onSubmit, isLoading }: TaskModalProps) {
  const [open, setOpen] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setModalError("Title is required");
      return;
    }

    try {
      await onSubmit({ title: cleanTitle, completed });
      setTitle("");
      setCompleted(false);
      setOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create task";
      setModalError(message);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setModalError(null);
      setTitle("");
      setCompleted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl shadow-md gap-2 px-5 py-2.5 font-semibold">
          <Plus className="w-5 h-5" />
          Create New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">Create Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {modalError && (
            <div className="p-3 text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-600 rounded-xl">
              {modalError}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="task-title-input" className="text-xs font-semibold text-slate-500 uppercase">
              Task Title
            </label>
            <Input
              id="task-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Discuss database schema design"
              className="rounded-xl border-slate-200 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500 cursor-pointer"
            />
            <label htmlFor="completed" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
              Mark as completed immediately
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl font-medium"
            >
              {isLoading ? "Saving..." : "Save Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}