import { rGetUserApplications } from "@/shared/api/applications"
import { ApplicationStatus } from "@/shared/consts"
import { useAuth } from "@/shared/context/auth"
import { Button, Center, Loader, Stack, Table, Text, Title } from "@mantine/core"
import dayjs from 'dayjs'
import { useQuery } from "react-query"
import { useNavigate } from "react-router"

export const ProfilePage = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/home')
    }
    return <Stack p={10} maw={1200} mx={'auto'} px={{ base: 10, md: 0 }}>
        <Title order={3} c={'primary'}>Ваши заявки</Title>
        <Applications />
        <Button onClick={handleLogout}>Выйти</Button>

    </Stack>
}

const Applications = () => {
    const { data, isLoading, isError } = useQuery({ queryKey: ['Applications'], queryFn: rGetUserApplications })

    if (isLoading) return <Center h={200}><Loader /></Center>
    if (isError) return <Center h={200}><Text c='red'>Ошибка загрузки</Text></Center>

    if (!data) return;
    const rows = data.map((element: { id: number, status: string, address: string, created_at: string }) => (
        <Table.Tr key={element.id}>
            <Table.Td>{dayjs(element.created_at).format('DD-MM-YYYY')}</Table.Td>
            <Table.Td>{element.address}</Table.Td>
            <Table.Td>{ApplicationStatus[element.status as keyof typeof ApplicationStatus]}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table withTableBorder >
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Дата отправления заявки</Table.Th>
                    <Table.Th>Адрес</Table.Th>
                    <Table.Th>Статус заявки</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}
