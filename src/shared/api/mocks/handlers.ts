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
  http.patch(`${API_URL}/todos/:id`, async ({ request, params }) => {
    const { id } = params;
    const body = (await request.json()) as Partial<Todo>;
    const todos = getStoredTodos();
    let updateTodo: Todo | null = null;

    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        updateTodo = { ...todo, ...body };
        return updateTodo;
      }
      return todo;
    });

    if (!updateTodo) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "todo not found!",
      });
    }

    updateStoredTodos(updateTodos);

    return HttpResponse.json(updateTodo);
  }),
  http.delete(`${API_URL}/todos/:id`, ({ params }) => {
    const { id } = params;
    const todos = getStoredTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    updateStoredTodos(filteredTodos);
    return new HttpResponse(null, { status: 200 });
  }),
];
