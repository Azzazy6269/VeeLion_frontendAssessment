////////////////////////////
// TASKS TYPES /////////////
////////////////////////////

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
  title: string;
  completed?: boolean;
};

export type CreateTaskResponse = {
  data: Task;
};

export type PatchTaskRequest = {
  title?: string;
  completed?: boolean;
};

export type PatchTaskResponse = {
  data: Task;
};

export type DeleteTaskResponse = void;

export type TaskFilter = "all" | "completed" | "pending";

////////////////////////////
// ACTIVITY TYPES //////////
////////////////////////////

export type ActivityLog = {
  id: string;
  action?: string;
  info?: string;
  when: string;
};


export type ErrorResponse = {
  error?: {
    message?: string;
  };
};


