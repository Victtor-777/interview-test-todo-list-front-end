"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task-service";
import { toast } from "sonner";
import { CreateTaskRequest, UpdateTaskRequest } from "@/types/task";

export function useTasks() {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: taskService.getAll,
  });

  const createTask = useMutation({
    mutationFn: (data: CreateTaskRequest) => taskService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa criada com sucesso! ✅");
    },
    onError: (error: any) => {
      toast.error("Erro ao criar tarefa", {
        description: error.response?.data?.message || "Tente novamente.",
      });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskRequest }) =>
      taskService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa atualizada com sucesso! ✏️");
    },
    onError: (error: any) => {
      toast.error("Erro ao atualizar tarefa", {
        description: error.response?.data?.message || "Tente novamente.",
      });
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa deletada com sucesso! 🗑️");
    },
    onError: (error: any) => {
      toast.error("Erro ao deletar tarefa", {
        description: error.response?.data?.message || "Tente novamente.",
      });
    },
  });

  const toggleComplete = useMutation({
    mutationFn: ({ id, isCompleted }: { id: string; isCompleted: boolean }) =>
      taskService.toggleComplete(id, isCompleted),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      if (data.isCompleted) {
        toast.success("Tarefa concluída! 🎉");
      } else {
        toast.success("Tarefa reaberta! 🔄");
      }
    },
    onError: (error: any) => {
      toast.error("Erro ao atualizar status", {
        description: error.response?.data?.message || "Tente novamente.",
      });
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
}
