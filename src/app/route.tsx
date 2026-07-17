import { createBrowserRouter } from 'react-router'
import { Layout } from '@/pages/layouts'
import { HomePage } from '@/pages/home'
import { TodosPage } from '@/pages/todos'

export const createRouter = () =>
  createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/todos',
          element: <TodosPage />
        }
      ]
    }
  ])


