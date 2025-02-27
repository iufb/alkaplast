import { Protected } from "@/features";
import { AdminLayout } from "@/pages/admin/layout";
import { AdminMainPage } from "@/pages/admin/page";
import { ProductPage } from "@/pages/admin/product";
import { ProductsPage } from "@/pages/admin/products";
import { WorkerPage } from "@/pages/admin/worker";
import { AdminWorkers } from "@/pages/admin/workers";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ProfilePage } from "@/pages/auth/Profile";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { CalculatorPage } from "@/pages/calculator/CalculatorPage";
import { HomePage } from "@/pages/home/home";
import { BaseLayout } from "@/pages/layout";
import { ManagerPage } from "@/pages/manager/ManagerPage";
import { MasterPage } from "@/pages/master/MasterPage";
import { WindowPage } from "@/pages/window/window";
import { Navigate, Route, Routes } from "react-router-dom";
export const Pages = () => {
    return (
        <Routes>
            <Route path="/">
                <Route path="admin" element={<Protected><AdminLayout /></Protected>}>
                    <Route path="" element={<AdminMainPage />} />
                    <Route path="workers" element={<AdminWorkers />} />
                    <Route path="workers/:id" element={<WorkerPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:id" element={<ProductPage />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="manager" element={<ManagerPage />} />
                <Route path="master" element={<MasterPage />} />
                <Route element={<BaseLayout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="calculator" element={<CalculatorPage />} />
                    <Route path="window/:name" element={<WindowPage />} />
                    <Route path="profile" element={<Protected><ProfilePage /></Protected>} />
                </Route>
            </Route>
        </Routes>
    );
};
