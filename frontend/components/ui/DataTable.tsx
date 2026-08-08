import { Loader2 } from "lucide-react";
import React from "react";

export type Column<T> = {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
};

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400 font-semibold">
              {columns.map((col, idx) => (
                <th key={idx} className="py-4 px-6">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {loading ? (
                    <tr>
                      <td colSpan={columns.length} className="py-12 text-center">
                        <div className="flex justify-center items-center text-purple-600">
                          <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                      </td>
                    </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  {columns.map((col, idx) => (
                    <td key={idx} className="py-4 px-6 font-medium">
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                        ? String(row[col.accessorKey] ?? "")
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}