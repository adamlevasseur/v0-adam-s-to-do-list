"use client"

import type { Todo } from "@/types/todo"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatRecurrencePattern } from "@/lib/recurrence-utils"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Checkbox id={`todo-${todo.id}`} checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} />
            <div className="flex flex-col">
              <label
                htmlFor={`todo-${todo.id}`}
                className={`font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {todo.title}
              </label>

              {todo.isRecurring && todo.recurrencePattern && (
                <div className="flex items-center gap-2 mt-1">
                  <RefreshCw className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {formatRecurrencePattern(todo.recurrencePattern)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {todo.isRecurring && (
              <Badge variant="outline" className="bg-blue-50">
                Recurring
              </Badge>
            )}
            <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)} aria-label="Delete task">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </li>
  )
}
