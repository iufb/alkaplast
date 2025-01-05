import { AppShell, Box, Burger, Group, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import styles from './layout.module.css';


const windows = [
    { label: "Окно 1", href: "" },
    { label: "Окно 2", href: "" },
    { label: "Окно 3", href: "" },
    { label: "Окно 4", href: "" },

]
export function BaseLayout() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Title order={3}>
                        Alka
                        <Text
                            style={{
                                border: "2px solid var(--mantine-color-slate-6)",
                                borderRadius: 10,
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
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Group ml="xl" gap={20} visibleFrom="sm">
                            <CustomLink type='group' href='$' label='Окна' children={windows} />
                            <CustomLink type='content' href='$' label='Калькулятор' />
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <CustomLink type='content' href='$' label='Окна' />
                <CustomLink type='content' href='$' label='Окна' />
            </AppShell.Navbar>

            <AppShell.Main p={0}>
                <Outlet />
            </AppShell.Main>
            <footer>
                <Stack bg={'#333333'} w={'100%'} h={100} p={20}>
                    <Title fz={20} ta={'center'} c={'white'}>Alka plas  {new Date().getFullYear()}</Title>
                </Stack>
            </footer>
        </AppShell>
    );

}

interface CustomLinkProps {
    type: 'group' | 'content'
    label: string;
    href: string;
    children?: { label: string, href: string }[]
}
const CustomLink = ({ children, type, label, href }: CustomLinkProps) => {
    const [show, setShow] = useState(false)
    switch (type) {
        case 'group': return <Group style={{ position: 'relative' }}>
            <button className={styles.link} onClick={() => setShow(!show)}>
                {label}
            </button>
            <Box className={clsx(styles.menu)} style={{ maxHeight: show ? 50 * (children?.length ?? 0) : 0, cursor: 'pointer', opacity: show ? 1 : 0 }}>
                <Stack ml={10} mx={10} gap={10} py={10}>
                    {children?.map(({ label, href }, idx) => <Link type='content' to={href}>{label}</Link>)}
                </Stack>
            </Box>
        </Group>;

        case 'content': return <Link className={styles.link} to={href}>{label}</Link>
    }
}
