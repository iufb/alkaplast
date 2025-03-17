import { queryClient } from "@/main";
import { rGetManagerApplications } from "@/shared/api/applications";
import { rChainMaster, rGetMasters } from "@/shared/api/workers";
import { ApplicationStatus } from "@/shared/consts";
import { useAuth } from "@/shared/context/auth";
import { Box, Button, Drawer, Group, ScrollArea, Skeleton, Stack, Table, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";

export const ManagerPage = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/home')
    }
    return <Stack p={{ base: 10 }} pt={20} maw={1400} mx={'auto'}>
        <Button onClick={handleLogout}>Выйти</Button>
        <Title ta={'center'} order={3} c={'primary'}>Панель управления для менеджеров</Title>
        <ManagerBoard />
    </Stack>
}

const ManagerBoard = () => {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['managerBoard'],
        queryFn: async () => {
            const response = await rGetManagerApplications();
            return response;
        },
    });
    console.log(data)
    return (
        <Stack>
            <Title order={4} c={'primary'}>Необработанные заявки</Title>
            {isLoading ? <Skeleton height={400} /> : (isError && !data) ? <Text c={'red'}>Ошибка загрузки...</Text> : data.length == 0 ? <Text c={'secondary'}>Нет заявок</Text> :
                <Table.ScrollContainer minWidth={290}>
                    <Table ta={'center'} withTableBorder withColumnBorders>
                        <Table.Thead >
                            <Table.Tr>
                                <Table.Th ta={'center'}>Телефон</Table.Th>
                                <Table.Th ta={'center'}>Адрес</Table.Th>
                                <Table.Th ta={'center'}>Статус</Table.Th>
                                <Table.Th ta={'center'}>Дата отправки</Table.Th>
                                <Table.Th ta={'center'}>Связать с мастером</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data.map((a: any) =>
                                <Table.Tr key={a.id}>
                                    <Table.Td>{a.phone}</Table.Td>
                                    <Table.Td>{a.address}</Table.Td>
                                    <Table.Td>{ApplicationStatus[a.status as keyof typeof ApplicationStatus]}</Table.Td>
                                    <Table.Td>{dayjs(a.created_at).format('DD-MM-YYYY')}</Table.Td>
                                    <Table.Td><ConnectWithMaster applicationId={a.id} /></Table.Td>
                                </Table.Tr>)}
                        </Table.Tbody>

                    </Table></Table.ScrollContainer>}
        </Stack>
    );
}
interface ConnectProps {
    applicationId: number
}
const ConnectWithMaster = ({ applicationId }: ConnectProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Drawer styles={{ body: { height: 'calc(100% - 100px)' } }} position="right" opened={opened} onClose={close} title="Связать с мастером">
                <Form close={close} applicationId={applicationId} />
            </Drawer>

            <Button onClick={open}>
                Связать
            </Button>
        </>
    );

}
const Form = ({ applicationId, close }: ConnectProps & { close: () => void }) => {
    const [selected, setSelected] = useState<number | null>(null)
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['masterSelect'],
        queryFn: async () => {
            const response = await rGetMasters();
            return response;
        }
    });
    const { mutate, isLoading: mutationLoading, isError: mutationError } = useMutation({
        mutationFn: rChainMaster,
        onSuccess: (data) => {
            notifications.show({
                title: 'Успешно',
                message: 'Мастер успешно привязан',
                color: 'green'
            });
            queryClient.invalidateQueries({ queryKey: ['managerBoard'] });
        },
        onError: (error) => {
            notifications.show({
                title: 'Ошибка',
                message: 'Произошла ошибка при привязке мастера',
                color: 'red'
            });
        },
    });
    const submit = (e: FormEvent) => {
        e.preventDefault()
        mutate({ "request_id": applicationId, "worker_id": selected })
    }

    return <form onSubmit={submit} style={{ height: '100%' }} >
        <Stack h={'100%'}>
            <ScrollArea>
                {isLoading ? <Skeleton h={66} /> : (isError && !data) ? <Text>Ошибка загрузки</Text> : data?.map(w => <Group justify="space-evenly" onClick={() => setSelected(w.id)} c={'primary'} style={{ borderRadius: 10, border: selected != w.id ? "1px solid var(--mantine-color-primary-5)" : '1px solid var(--mantine-color-blue-8)' }} bg={selected ? 'slate.3' : 'white'} py={5} px={10}>
                    <Stack gap={5}>
                        <Text>
                            ФИО: {w.fio}
                        </Text>
                        <Text>
                            Логин: {w.username}
                        </Text>
                    </Stack>
                    <Stack gap={5}>
                        <Box>Завершено: {w.completed_details}</Box>
                        <Box>В процессе: {w.waiting_details}</Box>
                    </Stack>
                </Group>)}
            </ScrollArea>
        </Stack>
        <Button type="submit" loading={mutationLoading} disabled={!selected || mutationLoading} fullWidth>Связать</Button>
    </form>
}
