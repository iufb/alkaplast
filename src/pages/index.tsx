import { AdminLayout } from "@/pages/admin/layout";
import { AdminMainPage } from "@/pages/admin/page";
import { ProductPage } from "@/pages/admin/product";
import { ProductsPage } from "@/pages/admin/products";
import { WorkerPage } from "@/pages/admin/worker";
import { AdminWorkers } from "@/pages/admin/workers";
import { CalculatorPage } from "@/pages/calculator/CalculatorPage";
import { HomePage } from "@/pages/home/home";
import { BaseLayout } from "@/pages/layout";
import { WindowPage } from "@/pages/window/window";
import '@mantine/carousel/styles.css';
import { Route, Routes } from "react-router-dom";
export const Pages = () => {
    return (
        <Routes>
            <Route path="/">
                <Route path="admin" element={<AdminLayout />}>
                    <Route path="" element={<AdminMainPage />} />
                    <Route path="workers" element={<AdminWorkers />} />
                    <Route path="workers/:id" element={<WorkerPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:id" element={<ProductPage />} />
                </Route>
                <Route element={<BaseLayout />}>
                    <Route path="home" element={<HomePage />} />
                    <Route path="calculator" element={<CalculatorPage />} />
                    <Route path="window/:name" element={<WindowPage />} />
                </Route>
            </Route>
        </Routes>
    );
};
