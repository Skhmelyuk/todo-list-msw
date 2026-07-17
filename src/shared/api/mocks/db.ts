export interface Todo {
  id?: string
  text: string
  completed: boolean
  createdAt: number
}

export const getStoredTodos = (): Todo[] => {
  const stored = localStorage.getItem('mock-todos')
  if (stored) return JSON.parse(stored)
  
  const defaultTodos: Todo[] = [
    { id: '1', text: 'Вивчити основи React Testing Library', completed: true, createdAt: Date.now() - 3600000 },
    { id: '2', text: 'Налаштувати Mock Service Worker', completed: false, createdAt: Date.now() }
  ]
  localStorage.setItem('mock-todos', JSON.stringify(defaultTodos))
  return defaultTodos
}
 
// Оновлення списку завдань у localStorage
export const updateStoredTodos = (todos: Todo[]): void => {
  localStorage.setItem('mock-todos', JSON.stringify(todos))
}