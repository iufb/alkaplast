import { Pages } from "@/pages/index.tsx";
import { AuthProvider } from "@/shared/context/auth";
import { theme } from "@/theme.ts";
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router";

import '@mantine/carousel/styles.css';
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import "./globals.css";

export const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <MantineProvider theme={theme}>
            <Notifications />
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Pages />
                </AuthProvider>
            </QueryClientProvider>
        </MantineProvider>
    </BrowserRouter>,
);
