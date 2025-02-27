import { Pages } from "@/pages/index.tsx";
import { AuthProvider } from "@/shared/context/auth";
import { theme } from "@/theme.ts";
import '@mantine/carousel/styles.css';
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router";
import "./globals.css";

export const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <MantineProvider theme={theme}>

            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Pages />
                </AuthProvider>
            </QueryClientProvider>
        </MantineProvider>
    </BrowserRouter>,
);
