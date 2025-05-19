"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TodoList from "@/components/todo-list"
import AddTodoForm from "@/components/add-todo-form"
import type { Todo, RecurrencePattern } from "@/types/todo"
import { generateRecurringTodos } from "@/lib/recurrence-utils"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage if available
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem("todos")
      return savedTodos ? JSON.parse(savedTodos) : []
    }
    return []
  })

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Check for recurring todos that need to be generated
  useEffect(() => {
    const newTodos = generateRecurringTodos(todos)
    if (newTodos.length > 0) {
      setTodos((prevTodos) => [...prevTodos, ...newTodos])
    }
  }, [todos])

  const addTodo = (title: string, isRecurring = false, recurrencePattern?: RecurrencePattern) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      isRecurring,
      recurrencePattern,
    }

    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const oneTimeTodos = todos.filter((todo) => !todo.isRecurring)
  const recurringTodos = todos.filter((todo) => todo.isRecurring)

  return (
    <div className="space-y-6">
      <AddTodoForm onAddTodo={addTodo} />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="one-time">One-time</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </TabsContent>

        <TabsContent value="one-time">
          <TodoList todos={oneTimeTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </TabsContent>

        <TabsContent value="recurring">
          <TodoList todos={recurringTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
