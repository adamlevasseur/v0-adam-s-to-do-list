import type { Todo, RecurrencePattern } from "@/types/todo"
import { addDays, addWeeks, addMonths, isBefore } from "date-fns"

export function formatRecurrencePattern(pattern: RecurrencePattern): string {
  const { type, interval } = pattern

  switch (type) {
    case "daily":
      return interval === 1 ? "Every day" : `Every ${interval} days`
    case "weekly":
      return interval === 1 ? "Every week" : `Every ${interval} weeks`
    case "monthly":
      return interval === 1 ? "Every month" : `Every ${interval} months`
    default:
      return ""
  }
}

export function calculateNextOccurrence(pattern: RecurrencePattern): Date {
  const currentDate = new Date(pattern.nextOccurrence)

  switch (pattern.type) {
    case "daily":
      return addDays(currentDate, pattern.interval)
    case "weekly":
      return addWeeks(currentDate, pattern.interval)
    case "monthly":
      return addMonths(currentDate, pattern.interval)
    default:
      return currentDate
  }
}

export function generateRecurringTodos(todos: Todo[]): Todo[] {
  const now = new Date()
  const newTodos: Todo[] = []

  todos.forEach((todo) => {
    if (
      todo.isRecurring &&
      todo.recurrencePattern &&
      !todo.completed &&
      isBefore(new Date(todo.recurrencePattern.nextOccurrence), now)
    ) {
      // Calculate the next occurrence
      const nextDate = calculateNextOccurrence(todo.recurrencePattern)

      // Update the existing todo with the new next occurrence date
      todo.recurrencePattern.nextOccurrence = nextDate.toISOString()

      // Create a new instance of this recurring todo
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: todo.title,
        completed: false,
        createdAt: new Date().toISOString(),
        isRecurring: true,
        recurrencePattern: {
          ...todo.recurrencePattern,
          nextOccurrence: calculateNextOccurrence(todo.recurrencePattern).toISOString(),
        },
      }

      newTodos.push(newTodo)
    }
  })

  return newTodos
}
