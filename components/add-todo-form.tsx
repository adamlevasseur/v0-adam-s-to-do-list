"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import RecurrenceSettings from "@/components/recurrence-settings"
import type { RecurrencePattern } from "@/types/todo"

interface AddTodoFormProps {
  onAddTodo: (title: string, isRecurring: boolean, recurrencePattern?: RecurrencePattern) => void
}

export default function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [title, setTitle] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrencePattern, setRecurrencePattern] = useState<RecurrencePattern>({
    type: "daily",
    interval: 1,
    nextOccurrence: new Date().toISOString(),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim()) {
      onAddTodo(title, isRecurring, isRecurring ? recurrencePattern : undefined)
      setTitle("")
      setIsRecurring(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="todo-title">Task</Label>
              <Input
                id="todo-title"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="recurring-mode" checked={isRecurring} onCheckedChange={setIsRecurring} />
              <Label htmlFor="recurring-mode">Make this a recurring task</Label>
            </div>

            {isRecurring && (
              <RecurrenceSettings recurrencePattern={recurrencePattern} onPatternChange={setRecurrencePattern} />
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t p-4">
          <Button type="submit">Add Task</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
