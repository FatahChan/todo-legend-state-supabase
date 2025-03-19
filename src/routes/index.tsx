import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTodo, deleteTodo, todos$, toggleDone } from "@/lib/SupaLegend";
import { cn } from "@/lib/utils";
import { observer, use$ } from "@legendapp/state/react";
import { createFileRoute } from "@tanstack/react-router";

const TodoPage = observer(() => {
  const todos = use$(() => Object.values(todos$.get() ?? {}));

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Todo App</h1>
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-6">
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
});

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Check</title>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Trash</title>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UndoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Undo</title>
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
  );
}
export const Route = createFileRoute("/")({
  component: TodoPage,
});
