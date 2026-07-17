export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 shadow-sm text-center">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-full border border-emerald-200/50 dark:border-emerald-900/50 mb-4">
          FSD Architecture + shadcn/ui
        </span>
        <h1 className="text-3xl font-black tracking-tight text-foreground">todo-list-msw</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Проект успішно ініціалізовано без App.tsx з React Router (Data Mode) та shadcn/ui за FSD архітектурою!
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2.5 text-left text-xs font-medium text-muted-foreground">
          <div className="bg-muted/40 border border-border/40 rounded-xl p-3">
            <span className="font-bold text-foreground block mb-0.5">📁 app/</span>
            main.tsx, route.tsx, index.css
          </div>
          <div className="bg-muted/40 border border-border/40 rounded-xl p-3">
            <span className="font-bold text-foreground block mb-0.5">📁 pages/</span>
            Сторінки додатку
          </div>
          <div className="bg-muted/40 border border-border/40 rounded-xl p-3">
            <span className="font-bold text-foreground block mb-0.5">📁 features/</span>
            Фічі додатку
          </div>
          <div className="bg-muted/40 border border-border/40 rounded-xl p-3">
            <span className="font-bold text-foreground block mb-0.5">📁 shared/</span>
            ui, api, hooks, lib
          </div>
        </div>
      </div>
    </div>
  )
}
