import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Pages } from "@/pages/index.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme.ts";
import "@mantine/core/styles.css";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <MantineProvider theme={theme}>
      <Pages />
    </MantineProvider>
  </BrowserRouter>,
);
