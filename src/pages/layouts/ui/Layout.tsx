import { Outlet, NavLink } from 'react-router'
import { Button } from '@/shared/ui/button'
import { CheckSquare } from 'lucide-react'

export const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm support-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <NavLink to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground transition-opacity hover:opacity-90">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <CheckSquare className="h-5 w-5" />
              </div>
              <span>
                Todo<span className="text-zinc-500 font-normal">MSW</span>
              </span>
            </NavLink>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-foreground ${
                  isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'
                }`
              }
            >
              Головна
            </NavLink>
            <NavLink
              to="/todos"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-foreground ${
                  isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'
                }`
              }
            >
              Список завдань
            </NavLink>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-2.5">
            <Button variant="ghost" size="sm" asChild>
              <NavLink to="/login">Вхід</NavLink>
            </Button>
            <Button size="sm" asChild>
              <NavLink to="/register">Реєстрація</NavLink>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50">
        <div className="mx-auto flex h-16 max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:flex-row text-xs text-muted-foreground">
          <p>© 2026 TodoMSW. Всі права захищено.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline transition-colors hover:text-foreground">Політика конфіденційності</a>
            <a href="#" className="hover:underline transition-colors hover:text-foreground">Умови використання</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
