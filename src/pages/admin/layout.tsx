import { AdminNavbar } from "@/widgets";
import { AppShell, Burger, Group, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";

export function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
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
          <Title order={3}>
            Alka
            <Text
              style={{
                border: "1px solid var(--mantine-color-slate-6)",
              }}
              ml={5}
              c={"sky.9"}
              fw={"bold"}
              bg={"sky.4"}
              px={10}
              py={5}
              size="xl"
              component="span"
            >
              Plast
            </Text>
          </Title>
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
