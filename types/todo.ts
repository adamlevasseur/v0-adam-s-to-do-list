export interface RecurrencePattern {
  type: "daily" | "weekly" | "monthly"
  interval: number
  nextOccurrence: string // ISO date string
}

export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string // ISO date string
  isRecurring?: boolean
  recurrencePattern?: RecurrencePattern
}
