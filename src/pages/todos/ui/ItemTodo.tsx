import { Button } from "@/shared/ui/button"
import { Checkbox } from "@/shared/ui/checkbox"

export interface TodoDTO {
  id?: string
  text: string
  completed: boolean
  createdAt: number
}

interface ItemTodoProps {
  item: TodoDTO
  toggleTodo: () => void
  deleteTodo: () => void
}

export const ItemTodo = ({ item, toggleTodo, deleteTodo }: ItemTodoProps) => {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-card border border-border rounded-xl shadow-xs hover:bg-muted/40 transition-all duration-200">
      <Checkbox checked={item.completed} onCheckedChange={toggleTodo} />
      <span
        className={`grow text-sm font-medium transition-all duration-300 select-none ${
          item.completed ? "line-through text-muted-foreground" : "text-foreground"
        }`}
      >
        {item.text}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="text-destructive hover:text-destructive hover:bg-destructive/10 py-1.5 h-8 font-semibold cursor-pointer"
        onClick={deleteTodo}
      >
        Видалити
      </Button>
    </div>
  )
}
