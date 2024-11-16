import React from "react";
import { ReferralTaskType } from "@/types/TaskType";

interface ReferralTaskDrawerProps {
  task: ReferralTaskType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReferralTaskDrawer({
  task,
  open,
  onOpenChange,
}: ReferralTaskDrawerProps) {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-4/5 p-4 bg-white rounded-lg">
        <h2 className="text-lg font-bold">{task.title}</h2>
        <p className="text-sm">Reward: {task.reward.toLocaleString()} coins</p>
        <button
          onClick={() => onOpenChange(false)}
          className="mt-4 text-sm text-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
