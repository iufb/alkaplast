import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
const loadEnvInstance = loadEnv("dev", process.cwd(), "");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            proxy: {
                "/api": {
                    target: loadEnvInstance.VITE_BACKENDURL,
                    changeOrigin: true,
                    secure: false,
                },
            },
            cors: false,
        },
        preview: {
            proxy: {
                "/api": {
                    target: loadEnvInstance.VITE_BACKENDURL,
                    changeOrigin: true,
                    secure: false,
                },
            },
            cors: false,
        },
    }
})
