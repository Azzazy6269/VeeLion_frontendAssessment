export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type getTasksResponse = {
  data: Task[];
};

export type getTaskResponse = {
  data: Task;
};

export type CreateTaskRequest = {
  title: string; // required, trimmed, non-empty
  completed?: boolean; // default false
};

export type CreateTaskResponse = {
  data: Task;
};

export type PatchTaskRequest = {
  title?: string; // if provided, must be string and long enough after trim
  completed?: boolean;
};

export type PatchTaskResponse = {
  data: Task;
};

export type DeleteTaskResponse = void;

export type ErrorResponse = {
  error?: {
    message?: string;
  };
};


export type ActivityLog = {
  id: string;
  action?: string;
  info?: string;
  when: string;
};

export type TaskFilter = "all" | "completed" | "pending";
