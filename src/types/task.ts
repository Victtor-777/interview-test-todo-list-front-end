export interface Task {
  id: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  completedAt: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}
