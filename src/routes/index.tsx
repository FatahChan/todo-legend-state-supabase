import { GitHubCorner } from "@/components/github-corner";
import { CheckIcon } from "@/components/icons/check-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
import { UndoIcon } from "@/components/icons/undo-icon";
import { Button } from "@/components/ui/button";
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
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
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
        <h1 className="text-3xl font-semibold text-center mb-6">Todo App</h1>
        <p className="text-gray-400 text-center my-2">
          data is reset every 30 minutes
        </p>
        <div className="w-full bg-white text-center dark:bg-gray-900 shadow-md rounded-lg p-6 mb-6">
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
              className="ml-4 w-1/6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md shadow-md"
            >
              Submit
            </Button>
          </form>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="py-4 flex justify-between items-center"
              >
                <span
                  className={cn(
                    "text-gray-800 dark:text-gray-100",
                    todo.done && "line-through",
                  )}
                >
                  {todo.text}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleDone(todo.id)}
                  >
                    {todo.done ? (
                      <UndoIcon className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
