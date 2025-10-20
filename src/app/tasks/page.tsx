"use client";

import { useState, useMemo } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { useAuth } from "@/hooks/use-auth";
import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, CheckSquare, XCircle } from "lucide-react";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterType = "all" | "my-tasks";

export default function TasksPage() {
  const { tasks, isLoading } = useTasks();
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("my-tasks");

  const filteredTasks = useMemo(() => {
    if (!user) return [];

    if (user.role === "USER") {
      return tasks.filter((task) => task.userId === user.id);
    }

    if (filter === "my-tasks") {
      return tasks.filter((task) => task.userId === user.id);
    }

    return tasks;
  }, [tasks, user, filter]);

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(
    (task) => task.isCompleted
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header da Página */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Minhas Tarefas
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie suas tarefas de forma simples e eficiente
            </p>
          </div>

          <Button
            size="lg"
            className="gap-2 cursor-pointer"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-5 w-5" />
            Nova Tarefa
          </Button>
        </div>

        {/* Filtro para Admin */}
        {user?.role === "ADMIN" && (
          <div className="mb-6">
            <Tabs
              value={filter}
              onValueChange={(value) => setFilter(value as FilterType)}
            >
              <TabsList>
                <TabsTrigger className="cursor-pointer" value="my-tasks">
                  Minhas Tarefas
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="all">
                  Todas as Tarefas
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total
                </p>
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

        {/* Lista de Tarefas */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Nenhuma tarefa encontrada
            </h3>
            <p className="text-muted-foreground mb-6">
              {filter === "my-tasks"
                ? "Comece criando sua primeira tarefa!"
                : "Nenhum usuário criou tarefas ainda."}
            </p>
            <Button
              className="gap-2 cursor-pointer"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Criar primeira tarefa
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                showOwner={user?.role === "ADMIN" && filter === "all"}
              />
            ))}
          </div>
        )}
      </div>

      <CreateTaskDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </>
  );
}
