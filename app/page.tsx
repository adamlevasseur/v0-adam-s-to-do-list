import TodoApp from "@/components/todo-app"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Adam's To-Do List</h1>
      <TodoApp />
    </main>
  )
}
