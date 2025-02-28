import { useAuth } from '@/shared/context/auth';
import { AuthStatus } from '@/widgets';
import { AppShell, Box, Burger, Button, ButtonProps, Group, Image, Menu, NavLink, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ArrowRight, ChevronDown, ChevronRightIcon } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router';

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
export function BaseLayout() {
    const [opened, { toggle, close: closeBurger }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        >
            <AppShell.Header>
                <Group h="100%" px="md" wrap='nowrap' justify='space-between'>
                    <Link to={'/home'}>
                        <Image src={'/Logo.png'} w={'auto'} height={60} />
                    </Link>
                    <Group w={'100%'} justify='center' gap={20} visibleFrom="sm">
                        {links.map(l =>
                            <CustomLink key={l.label} isFirst={true} href={l.href} label={l.label} sublinks={l.sublinks} />
                        )}
                    </Group>
                    <Group w={{ base: 'auto', md: 340 }}>
                        <AuthStatus />
                        <Logout visibleFrom='md' />
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    </Group>

                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <Box mr={10}>
                    {links.map(link => <MobileCustomLink close={closeBurger} key={link.label} {...link} />)}
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
const Logout = ({ ...props }: ButtonProps) => {
    const { logout, isLogged } = useAuth()
    if (!isLogged) { return; }
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/home')
    }
    return <Button onClick={handleLogout} rightSection={<ArrowRight size={14} />} {...props}>Выйти</Button>
}
const MobileCustomLink = ({ href, label, sublinks, close }: CustomLinkProps & { close: () => void }) => {

    if (href) return <NavLink onClick={close} component={Link} to={href} label={label} />
    return <NavLink label={label}>
        {sublinks.map(s =>
            <MobileCustomLink close={close} key={s.label} {...s} />
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
    if (href) return <Link to={href}><Text w={'100%'} h={'100%'} style={{ cursor: 'pointer' }} fw={'bold'} c={'primary'}>{label}</Text></Link>
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
