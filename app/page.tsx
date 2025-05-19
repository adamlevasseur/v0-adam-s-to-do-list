import TodoApp from "@/components/todo-app"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Not Adam's To-Do List</h1>
        <ThemeToggle />
      </div>
      <TodoApp />
    </main>
  )
}
