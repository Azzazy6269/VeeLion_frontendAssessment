"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import type { CreateActivityRequest } from "@/types/api";

type ActivityModalProps = {
  onSubmit: (data: CreateActivityRequest) => Promise<void>;
  isLoading: boolean;
};

export function ActivityModal({ onSubmit, isLoading }: ActivityModalProps) {
  const [open, setOpen] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [action, setAction] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    const cleanAction = action.trim();
    const cleanInfo = info.trim();

    if (!cleanAction) {
      setModalError("Action title is required.");
      return;
    }

    try {
      await onSubmit({ action: cleanAction, info: cleanInfo });
      setAction("");
      setInfo("");
      setOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to log activity";
      setModalError(message);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setModalError(null);
      setAction("");
      setInfo("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl shadow-md gap-2 px-5 py-2.5 font-semibold">
          <Plus className="w-5 h-5" />
          Log New Activity
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">Log Activity</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {modalError && (
            <div className="p-3 text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-600 rounded-xl">
              {modalError}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="activity-action-input" className="text-xs font-semibold text-slate-500 uppercase">
              Action Name
            </label>
            <Input
              id="activity-action-input"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="e.g. USER_LOGIN or TASK_CREATED"
              className="rounded-xl border-slate-200 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="activity-info-input" className="text-xs font-semibold text-slate-500 uppercase">
              Details / Info
            </label>
            <Input
              id="activity-info-input"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="e.g. Updated user profile settings"
              className="rounded-xl border-slate-200 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl font-medium"
            >
              {isLoading ? "Logging..." : "Log Activity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}