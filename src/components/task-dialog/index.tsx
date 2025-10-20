"use client";

import { useState, useEffect } from "react";
import { Task, UpdateTaskRequest } from "@/types/task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
  const [formData, setFormData] = useState<UpdateTaskRequest>({
    title: task.title,
    description: task.description || "",
  });

  const { updateTask } = useTasks();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: task.title,
        description: task.description || "",
      });
    }
  }, [task, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasChanges =
      formData.title !== task.title ||
      formData.description !== (task.description || "");

    if (!hasChanges) {
      onClose();
      return;
    }

    updateTask.mutate(
      { id: task.id, data: formData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    setFormData({
      title: task.title,
      description: task.description || "",
    });
    onClose();
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
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
            <Label htmlFor="title">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Digite o título da tarefa"
              required
              autoFocus
              disabled={updateTask.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Adicione uma descrição..."
              rows={4}
              disabled={updateTask.isPending}
            />
          </div>

          <div className="space-y-1 text-xs text-muted-foreground border-t pt-3">
            <p>Criada em: {formatDate(task.createdAt)}</p>
            <p>Última atualização: {formatDate(task.updatedAt)}</p>
            {task.completedAt && (
              <p>Concluída em: {formatDate(task.completedAt)}</p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateTask.isPending}
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
