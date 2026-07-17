import { http, HttpResponse } from "msw";
import { getStoredTodos, updateStoredTodos, type Todo } from "./db";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const handlers = [
  http.get(`${API_URL}/todos`, () => {
    const todos = getStoredTodos();
    return HttpResponse.json(todos);
  }),
  http.post(`${API_URL}/todos`, async ({ request }) => {
    const body = (await request.json()) as Omit<Todo, "id">;
    const todos = getStoredTodos();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: body.text,
      completed: body.completed || false,
      createdAt: body.createdAt || Date.now(),
    };

    todos.push(newTodo);
    updateStoredTodos(todos);
    return HttpResponse.json(newTodo, { status: 201 });
  }),
];
