import { api } from "@/lib/axios";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "@/types/task";
import { AxiosResponse } from "axios";

export const taskService = {
  async getAll(): Promise<Task[]> {
    const response: AxiosResponse<Task[]> = await api.get("/tasks");
    return response.data;
  },

  async getById(id: string): Promise<Task> {
    const response: AxiosResponse<Task> = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async create(data: CreateTaskRequest): Promise<Task> {
    const response: AxiosResponse<Task> = await api.post("/tasks", data);
    return response.data;
  },

  async update(id: string, data: UpdateTaskRequest): Promise<Task> {
    const response: AxiosResponse<Task> = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async toggleComplete(id: string, isCompleted: boolean): Promise<Task> {
    return this.update(id, { isCompleted });
  },
};
