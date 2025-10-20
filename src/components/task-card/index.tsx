"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar, CheckCircle2, Circle, User } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { TaskDialog } from "../task-dialog";
import { toast } from "sonner";

interface TaskCardProps {
  task: Task;
  showOwner?: boolean;
}

export function TaskCard({ task, showOwner = false }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toggleComplete, deleteTask } = useTasks();

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleComplete.mutate({
      id: task.id,
      isCompleted: !task.isCompleted,
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    toast.info("Tem certeza?", {
      description: "Esta ação não pode ser desfeita.",
      action: {
        label: "Deletar",
        onClick: () => deleteTask.mutate(task.id),
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {},
      },
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Card
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex items-start gap-3 flex-1">
            <button onClick={handleToggleComplete} className="mt-1 shrink-0">
              {task.isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            <div className="flex-1 space-y-1">
              <CardTitle
                className={`text-base ${
                  task.isCompleted ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.title}
              </CardTitle>

              {showOwner && task.user && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{task.user.name}</span>
                </div>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-8 w-8 shrink-0"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </CardHeader>

        <CardContent>
          {task.description && (
            <p
              className={`text-sm mb-3 line-clamp-2 ${
                task.isCompleted ? "text-muted-foreground" : ""
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(task.createdAt)}</span>

            {task.isCompleted && task.completedAt && (
              <Badge variant="secondary" className="ml-auto">
                Concluída em {formatDate(task.completedAt)}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <TaskDialog
        task={task}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
