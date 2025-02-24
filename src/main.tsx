import { Pages } from "@/pages/index.tsx";
import { theme } from "@/theme.ts";
import '@mantine/carousel/styles.css';
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router";
import "./globals.css";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <MantineProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Pages />
            </QueryClientProvider>
        </MantineProvider>
    </BrowserRouter>,
);
