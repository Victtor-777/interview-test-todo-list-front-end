"use client";

import { useTasks } from "@/hooks/use-tasks";
import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, CheckSquare, XCircle } from "lucide-react";

export default function TasksPage() {
  const { tasks, isLoading } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Tarefas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas tarefas de forma simples e eficiente
          </p>
        </div>

        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Nova Tarefa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{totalTasks}</p>
            </div>
            <CheckSquare className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Concluídas
              </p>
              <p className="text-2xl font-bold text-green-600">
                {completedTasks}
              </p>
            </div>
            <CheckSquare className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pendentes
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {pendingTasks}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Nenhuma tarefa encontrada
          </h3>
          <p className="text-muted-foreground mb-6">
            Comece criando sua primeira tarefa!
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Criar primeira tarefa
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
