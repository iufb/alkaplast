import { useAuth } from "@/shared/context/auth";
import { AdminNavbar } from "@/widgets";
import { AppShell, Burger, Button, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useNavigate } from "react-router";

export function AdminLayout() {
    const [opened, { toggle }] = useDisclosure();
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/home')
    }

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: { base: 200, md: 300, lg: 400 },
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Link to={'/home'}><Image src='/Logo.png' mah={60} /></Link>
                    <Button onClick={handleLogout}>Выйти</Button>
                </Group>

            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AdminNavbar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
