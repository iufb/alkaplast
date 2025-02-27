import { Box, NavLink } from "@mantine/core";

import { ChevronRight, Home, Package, Users } from "lucide-react";
import { useLocation } from "react-router";

const pages = [
    {
        icon: Home,
        label: "Главная",
        href: "",
        rightSection: <ChevronRight size="1rem" strokeWidth={1.5} />, // Optional right section
    },
    {
        icon: Users,
        label: "Работники",
        href: "/workers",
        description: "Управление сотрудниками",
        rightSection: <ChevronRight size="1rem" strokeWidth={1.5} />, // Optional right section
    },
    {
        icon: Package,
        label: "Склад",
        href: "/products",
        rightSection: <ChevronRight size="1rem" strokeWidth={1.5} />, // Optional right section
    },
];

export function AdminNavbar() {
    const { pathname } = useLocation();

    const items = pages.map((item, index) => (
        <NavLink
            href={"/admin" + item.href}
            key={item.label}
            active={pathname == "/admin" + item.href}
            label={item.label}
            description={item.description}
            rightSection={item.rightSection}
            leftSection={<item.icon />}
            color="sky.5"
        />
    ));

    return <Box maw={350}>{items}</Box>;
}
