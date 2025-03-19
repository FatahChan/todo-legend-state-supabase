import { GitHubCorner } from "@/components/github-corner";
import { TrashIcon } from "@/components/icons/trash-icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { addTodo, deleteTodo, todos$, toggleDone } from "@/lib/SupaLegend";
import { cn } from "@/lib/utils";
import { use$ } from "@legendapp/state/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: TodoPage,
});

function TodoPage() {
  const todos = use$(() => {
    const todos = Object.values(todos$.get() ?? {});
    const sortedTodos = todos.sort((a, b) => {
      if (a.created_at && b.created_at) {
        return b.created_at.localeCompare(a.created_at);
      }
      return 0;
    });
    return sortedTodos;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B46C1] via-[#4F46E5] to-[#00d4ff] via-opacity-100 from-opacity-95 to-opacity-70">
      <a
        href="https://github.com/FatahChan/todo-legend-state-supabase"
        className="github-corner"
        aria-label="View source on GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubCorner />
      </a>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">
          Todo App test
        </h1>
        <p className="text-gray-200 text-center my-2">
          data is reset every 30 minutes
        </p>
        <div className="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-center shadow-md rounded-lg p-6 mb-6">
          <form
            className="mb-4 flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              try {
                addTodo(formData.get("todo-name") as string);
                e.currentTarget.reset();
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Input
              type="text"
              placeholder="Add a new task"
              className="flex-grow p-3 border rounded-md shadow-sm"
              name="todo-name"
            />
            <Button
              type="submit"
              className="ml-4 w-1/6 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-3 rounded-md shadow-md"
            >
              Submit
            </Button>
          </form>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {todos.map((todo) => (
              <li key={todo.id} className="py-4 flex items-center gap-3">
                <span
                  className={cn(
                    "flex-1 text-gray-800 dark:text-gray-100 text-left",
                    todo.done &&
                      "line-through text-gray-400 dark:text-gray-500",
                  )}
                >
                  {todo.text}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                  <Checkbox
                    checked={todo.done || false}
                    onCheckedChange={() => toggleDone(todo.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
