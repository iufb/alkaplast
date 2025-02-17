import { AppShell, Burger, Group, Image, Menu, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet } from 'react-router';

const links = [
    {
        label: "Пластиковые окна",
        sublinks: [
            {
                label: "ARtes",
                href: '/artes',
                sublinks: []
            },
            {
                label: "Exprof",
                sublinks: [
                    {
                        href: "/exprof58",
                        label: "Exprof 58",
                        sublinks: []
                    },
                    {
                        href: "/exprof70",
                        label: "Exprof 70",
                        sublinks: []
                    },
                    {
                        href: "/exprof101",
                        label: "Exprof 101",
                        sublinks: []
                    },
                ]
            },
            {
                label: "Galwin",
                sublinks: [
                    {
                        href: "/galwin58",
                        label: "Galwin 58",
                        sublinks: []
                    },

                    {
                        href: "/galwin70",
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
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Image src={'/Logo.png'} w={'auto'} height={60} />
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Group mx={'auto'} ml="xl" gap={20} visibleFrom="sm">
                            {links.map(l =>
                                <CustomLink key={l.href} isFirst={true} href={l.href} label={l.label} sublinks={l.sublinks} />
                            )}
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
            </AppShell.Navbar>

            <AppShell.Main pt={60} maw={1400} mx={'auto'}>
                <Outlet />
            </AppShell.Main>
            <footer>
                <Stack bg={'#333333'} w={'100%'} h={100} p={20}>
                    <Title fz={20} ta={'center'} c={'white'}>AlkaPlast  {new Date().getFullYear()}</Title>
                </Stack>
            </footer>
        </AppShell>
    );

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
            <Text style={{ cursor: 'pointer' }} fw={'bold'} c={'primary'}>{label}</Text>
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
