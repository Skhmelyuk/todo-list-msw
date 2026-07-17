import { useState, useRef } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { ItemTodo, type TodoDTO } from "./ItemTodo"
import { api } from "@/shared/api/base"
import { ClipboardList, Plus, ArrowUpDown, Loader2 } from "lucide-react"

export const TodosPage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSorted, setIsSorted] = useState<boolean>(false)
  const queryClient = useQueryClient()

  // 1. Отримання завдань через TanStack Query
  const {
    data: todos = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await api.get<TodoDTO[]>("/todos")
      return response.data
    },
  })

  // 2. Мутація додавання завдання
  const addTodoMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await api.post<TodoDTO>("/todos", {
        text,
        completed: false,
        createdAt: Date.now(),
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  // 3. Мутація видалення завдання
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/todos/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  // 4. Мутація зміни статусу виконано/невиконано
  const toggleTodoMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const response = await api.patch<TodoDTO>(`/todos/${id}`, {
        completed,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const handleAddTodo = () => {
    const newText = inputRef.current?.value?.trim()
    if (!newText) return

    addTodoMutation.mutate(newText, {
      onSuccess: () => {
        if (inputRef.current) {
          inputRef.current.value = ""
          inputRef.current.focus()
        }
      },
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo()
    }
  }

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id)
  }

  const handleToggleTodo = (id: string, currentCompleted: boolean) => {
    toggleTodoMutation.mutate({ id, completed: !currentCompleted })
  }

  // Обчислення статистики
  const totalTasks = todos.length
  const completedTasks = todos.filter((todo) => todo.completed).length

  // Сортування
  const displayTodos = isSorted
    ? [...todos].sort((a, b) => a.text.localeCompare(b.text, "uk-UA"))
    : todos

  return (
    <div className="max-w-[560px] w-full mx-auto my-6 p-6 bg-card border border-border rounded-3xl shadow-sm flex flex-col gap-6">
      <div className="flex items-center gap-3 justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ClipboardList className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">
          Список завдань
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Що потрібно зробити?"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          disabled={addTodoMutation.isPending}
        />
        <div className="flex gap-2.5">
          <Button
            className="flex-1 font-bold cursor-pointer"
            onClick={handleAddTodo}
            disabled={addTodoMutation.isPending}
          >
            {addTodoMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Додати
              </>
            )}
          </Button>
          <Button
            className="font-semibold cursor-pointer"
            variant={isSorted ? "secondary" : "outline"}
            onClick={() => setIsSorted(!isSorted)}
          >
            <ArrowUpDown className="h-4 w-4" />
            {isSorted ? "Скинути сортування" : "Сортувати (А-Я)"}
          </Button>
        </div>
      </div>

      <div className="text-xs font-semibold text-muted-foreground flex justify-between border-b border-border/40 pb-3">
        <div>
          Завдань: <span className="text-foreground font-bold">{totalTasks}</span>
        </div>
        <div>
          Виконано: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{completedTasks}</span>
        </div>
      </div>

      {isPending ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs">Завантаження списку...</p>
        </div>
      ) : isError ? (
        <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-xl border border-destructive/20 text-center">
          Помилка при завантаженні: {error instanceof Error ? error.message : "Невідома помилка"}
        </div>
      ) : displayTodos.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground text-sm flex flex-col items-center justify-center gap-2 bg-muted/10">
          <ClipboardList className="h-8 w-8 text-muted-foreground/50" />
          У вас немає завдань. Створіть перше!
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 max-h-[350px] overflow-y-auto pr-1">
          {displayTodos.map((todo) => (
            <ItemTodo
              item={todo}
              key={todo.id}
              toggleTodo={() => handleToggleTodo(todo.id!, todo.completed)}
              deleteTodo={() => handleDeleteTodo(todo.id!)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
