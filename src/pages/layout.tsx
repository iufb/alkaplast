import { AppShell, Box, Burger, Group, Image, Menu, NavLink, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown, ChevronRightIcon } from 'lucide-react';
import { Link, Outlet } from 'react-router';

const links = [
    {
        label: "Пластиковые окна",
        sublinks: [
            {
                label: "ARtec",
                href: '/window/artec',
                sublinks: []
            },
            {
                label: "Exprof",
                sublinks: [
                    {
                        href: "/window/exprof58",
                        label: "Exprof 58",
                        sublinks: []
                    },
                    {
                        href: "/window/exprof70",
                        label: "Exprof 70",
                        sublinks: []
                    },
                    {
                        href: "/window/exprof101",
                        label: "Exprof 101",
                        sublinks: []
                    },
                ]
            },
            {
                label: "Galwin",
                sublinks: [
                    {
                        href: "/window/galwin58",
                        label: "Galwin 58",
                        sublinks: []
                    },

                    {
                        href: "/window/galwin70",
                        label: "Galwin 70",
                        sublinks: []
                    },
                ]
            },
        ],
    },
    {
        href: "/calculator",
        label: "Калькулятор",
        sublinks: []
    },
]

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
        >
            <AppShell.Header>
                <Group h="100%" px="md" wrap='nowrap' justify='space-between'>
                    <Image src={'/Logo.png'} w={'auto'} height={60} />
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group w={'100%'} justify='center' gap={20} visibleFrom="sm">
                        {links.map(l =>
                            <CustomLink key={l.href} isFirst={true} href={l.href} label={l.label} sublinks={l.sublinks} />
                        )}
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <Box mr={10}>
                    {links.map(link => <MobileCustomLink {...link} />)}
                </Box>
            </AppShell.Navbar>

            <AppShell.Main pt={60} >
                <Outlet />
            </AppShell.Main>
            <footer>
                <Stack mt={20} bg={'primary'} w={'100%'} p={10}>
                    <Title fz={14} ta={'center'} c={'white'}>© {new Date().getFullYear()} AlkaPlast. Все права защищены.</Title>
                </Stack>
            </footer>
        </AppShell>
    );

}
const MobileCustomLink = ({ href, label, sublinks }: CustomLinkProps) => {
    if (href) return <NavLink component={Link} to={href} label={label} />
    return <NavLink label={label}>
        {sublinks.map(s =>
            <MobileCustomLink {...s} />
        )}
    </NavLink>

}

interface CustomLinkProps {
    href?: string;
    label: string;
    isFirst?: boolean;
    sublinks: CustomLinkProps[]
}
const CustomLink = ({ href, label, isFirst, sublinks }: CustomLinkProps) => {
    if (href) return <Link to={href}><Text style={{ cursor: 'pointer' }} fw={'bold'} c={'primary'}>{label}</Text></Link>
    return <Menu closeOnItemClick={false} position={isFirst ? 'bottom-start' : 'right-start'}>
        <Menu.Target key={label}>
            <Group gap={1} >
                <Text style={{ cursor: 'pointer' }} fw={'bold'} c={'primary'}>{label}</Text>
                {isFirst ? <ChevronDown style={{ marginTop: 5 }} /> : <ChevronRightIcon />}
            </Group>

        </Menu.Target>

        <Menu.Dropdown key={label}>
            {sublinks.map(l =>
                <Menu.Item
                    key={l.href}
                >
                    <CustomLink {...l} isFirst={false} />
                </Menu.Item>
            )}
        </Menu.Dropdown>
    </Menu>
}
