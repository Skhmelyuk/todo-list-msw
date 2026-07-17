import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { createRouter } from "./route";

async function enableMocking() {
    // Запускаємо мокування тільки в режимі розробки (Development)
    // та за умови, що VITE_ENABLE_MSW явно не вимкнено (встановлено в 'false')
    if (!import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === "false") {
        return;
    }

    const { worker } = await import("@/shared/api/mocks/browser");

    // start() повертає Promise, тому ми впевнені, що мокування
    // почне працювати до того, як React виконає перший запит
    return worker.start({
        onUnhandledRequest: "bypass", // Пропускати запити до статичних файлів та асетів без попереджень
    });
}
const queryClient = new QueryClient();
const router = createRouter();

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StrictMode>,
    );
});
