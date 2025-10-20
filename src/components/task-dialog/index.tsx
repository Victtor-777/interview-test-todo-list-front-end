"use client";

import { useState, useEffect } from "react";
import { Task, UpdateTaskRequest } from "@/types/task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useTasks } from "@/hooks/use-tasks";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface TaskDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDialog({ task, isOpen, onClose }: TaskDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateTaskRequest>({
    title: task.title,
    description: task.description || "",
  });

  const { updateTask } = useTasks();

  useEffect(() => {
    setFormData({
      title: task.title,
      description: task.description || "",
    });
    setIsEditing(false);
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateTask.mutate(
      { id: task.id, data: formData },
      {
        onSuccess: () => {
          setIsEditing(false);
          onClose();
        },
      }
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Tarefa" : "Detalhes da Tarefa"}
          </DialogTitle>
          <DialogDescription>
            {task.isCompleted ? (
              <Badge variant="secondary" className="mt-2">
                ✅ Concluída
              </Badge>
            ) : (
              <Badge variant="outline" className="mt-2">
                ⏳ Pendente
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            {isEditing ? (
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            ) : (
              <p className="text-sm font-medium">{task.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            {isEditing ? (
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {task.description || "Sem descrição"}
              </p>
            )}
          </div>

          {!isEditing && (
            <div className="space-y-1 text-xs text-muted-foreground border-t pt-3">
              <p>Criada em: {formatDate(task.createdAt)}</p>
              <p>Última atualização: {formatDate(task.updatedAt)}</p>
              {task.completedAt && (
                <p>Concluída em: {formatDate(task.completedAt)}</p>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={updateTask.isPending}>
                  {updateTask.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={onClose}>
                  Fechar
                </Button>
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Editar
                </Button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
