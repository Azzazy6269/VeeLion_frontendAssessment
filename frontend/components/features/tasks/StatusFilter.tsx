import type { TaskFilter } from "@/types/api";

const FILTERS: Array<{ label: string; value: TaskFilter }> = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

type StatusFilterProps = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
};

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div aria-label="Filter tasks by status" className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-xl w-fit">
        {FILTERS.map((filter) => {
          const active = filter.value === value;

          return (
            <button
              key={filter.value}
              type="button"
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
              active
                ? "bg-[#8B5CF6] text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
              onClick={() => onChange(filter.value)}
              aria-pressed={active}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
  );
}
