import { queryClient } from "@/main";
import { rFinishApplication, rGetMasterApplications } from "@/shared/api/applications";
import { rGetMasterProducts, rGetRequestedItems, rGetRequestedProducts, rMasterRequest } from "@/shared/api/products";
import { ApplicationStatus, ImageFallback } from "@/shared/consts";
import { useAuth } from "@/shared/context/auth";
import { Button, ButtonProps, Drawer, Group, Image, Modal, Paper, ScrollArea, Select, Skeleton, Stack, Table, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";

export const MasterPage = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/home')
    }

    return <Stack p={{ base: 10 }} pt={20} maw={1400} mx={'auto'}>

        <Button onClick={handleLogout}>Выйти</Button>
        <Title ta={'center'} order={3} c={'primary'}>Панель управления для мастеров - Добро Пожаловать {localStorage.getItem('username')}</Title>
        <MasterBoard />
    </Stack>
};

const MasterBoard = () => {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['masterBoard'],
        queryFn: async () => {
            const response = await rGetMasterApplications();
            return response;
        },
    });
    console.log(data)
    return (
        <Stack>
            <Title order={4} c={'primary'}>Необработанные заявки</Title>
            {isLoading ? <Skeleton height={250} /> : (isError && !data) ? <Text c={'red'}>Ошибка загрузки...</Text> : data?.length == 0 ? <Text c={'secondary'}>Нет заявок</Text> :
                <Table.ScrollContainer minWidth={290}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Телефон</Table.Th>
                                <Table.Th>Адрес</Table.Th>
                                <Table.Th>Статус</Table.Th>
                                <Table.Th>Дата отправки</Table.Th>
                                <Table.Th>Данные окна</Table.Th>
                                <Table.Th>Материалы</Table.Th>
                                <Table.Th>Завершить</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data?.map((a: any) =>
                                <Table.Tr key={a.id}>
                                    <Table.Td>{a.phone}</Table.Td>
                                    <Table.Td>{a.address}</Table.Td>
                                    <Table.Td>{ApplicationStatus[a.status as keyof typeof ApplicationStatus]}</Table.Td>
                                    <Table.Td>{dayjs(a.created_at).format('DD-MM-YYYY')}</Table.Td>
                                    <Table.Th><WindowData window_image={a.window_image} width={a.width} height={a.height} window_type={a.window_type} /></Table.Th>
                                    <Table.Td><RequestMaterials id={a.id} /></Table.Td>
                                    <Table.Td><Finish id={a.id} /></Table.Td>
                                </Table.Tr>)}
                        </Table.Tbody>
                    </Table></Table.ScrollContainer>}
        </Stack>
    );
}
const WindowData = ({ width, height, window_type, window_image }: { width: number, height: number, window_type: number, window_image: string }) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal size={'lg'} opened={opened} onClose={close} title="Данные окна">

                <Text fz={18} c={'primary'}>Ширина окна {width} cm</Text>
                <Text fz={18} c={'primary'}>Высота окна {height} cm</Text>
                <Text fz={18} c={'primary'}>Вид окна: </Text>
                <Image maw={300} src={`/calculator/${window_image}`} />
            </Modal>
            <Button variant="default" onClick={open}>
                Посмотреть
            </Button>
        </>)
}
const Finish = ({ id }: { id: number } & ButtonProps) => {
    const { mutate, isLoading, isError } = useMutation({
        mutationFn: rFinishApplication,
        onSuccess: (data) => {
            notifications.show({
                title: 'Успешно',
                message: 'Заявка успешно завершена',
                color: 'green'
            });
            queryClient.invalidateQueries({ queryKey: ['masterBoard'] });
        },
        onError: (error) => {
            notifications.show({
                title: 'Ошибка',
                message: 'Произошла ошибка при завершении заявки',
                color: 'red'
            });
        },
    }); return <Button loading={isLoading} disabled={isLoading} onClick={() => mutate(id)}>Завершить</Button>
}
const RequestMaterials = ({ id }: { id: number }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { data: requestedItems, isLoading: reqItemsLoading, isError: reqItemsError } = useQuery({
        queryKey: [`requestedItems ${id}`],
        queryFn: async () => {
            const data = await rGetRequestedItems(id);
            return data
        },
    });
    const showAdd = requestedItems?.length == 0
    return (
        <>
            <Drawer styles={{ body: { height: 'calc(100% - 85px)' } }} opened={opened} onClose={close} title={reqItemsError ? "Запросить материалы" : "Посмотреть запрошенные материалы"}
            >
                {showAdd ? <AddItemsForm id={id} /> : <ShowRequestedItems requestedItems={requestedItems} />}

            </Drawer>

            <Button variant="default" onClick={open}>
                {showAdd ? "Запросить" : "Посмотреть"}
            </Button>
        </>
    );
}

const ShowRequestedItems = ({ requestedItems }: { requestedItems: { item_id: number }[] }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['requestedFullItems'],
        queryFn: async () => {
            const data = await rGetRequestedProducts(requestedItems);
            return data
        },
    });
    return isLoading ? <Skeleton h={50} /> : (!data && isError) ? <Text c={'red'}>Ошибка загрузки...</Text> : <ScrollArea h={'100%'}>
        {data?.map((p: any) =>
            <Paper shadow="lg" bg={'white'} p={5}>
                <Group key={p.id}>
                    <Image w={80} fallbackSrc={ImageFallback} src={import.meta.env.VITE_BACKENDURL +
                        '/media/' + p.image} />
                    <Stack gap={10} maw={300}>
                        <Text c={'primary'} fw={'bold'}>{p.name}</Text>
                        <Text c={'primary'}>{p.category}</Text>
                        <Text c={'secondary'}>{p.description}</Text>
                        <Text c={'primary'}>Количество: {p.requestedCount}</Text>
                    </Stack>
                </Group>
            </Paper>
        )}
    </ScrollArea>
}
const AddItemsForm = ({ id }: { id: number }) => {
    const [selected, setSelected] = useState<Record<string, number>>({})
    const { data, isLoading, isError } = useQuery({
        queryKey: ['productlist'],
        queryFn: async () => {
            const data = await rGetMasterProducts();
            return data
        },
    });

    const { mutate, isLoading: mutationLoading, isError: mutationError } = useMutation({
        mutationFn: rMasterRequest,
        onSuccess: (data) => {
            notifications.show({
                title: 'Успешно',
                message: 'Запрос мастера успешно отправлен',
                color: 'green'
            });
        },
        onError: (error) => {
            notifications.show({
                title: 'Ошибка',
                message: 'Произошла ошибка при отправке запроса мастера',
                color: 'red'
            });
        },
    });
    const setCount = (id: number, value: number) => {
        setSelected({ ...selected, [id]: value })
    }

    return <> {isLoading ? <Skeleton h={50} /> : (!data && isError) ? <Text c={'red'}>Ошибка загрузки...</Text> : <ScrollArea h={'100%'}>
        {data?.map((p: any) =>
            <Paper shadow="lg" bg={'white'} p={5}>
                <Group key={p.id}>
                    <Image w={80} fallbackSrc={ImageFallback} src={import.meta.env.VITE_BACKENDURL +
                        '/media/' + p.image} />
                    <Stack gap={10} maw={300}>
                        <Text c={'primary'} fw={'bold'}>{p.name}</Text>
                        <Text c={'primary'}>{p.category}</Text>
                        <Text c={'secondary'}>{p.description}</Text>
                    </Stack>
                    <Select w={'100%'} value={selected[p.id]?.toString()} onChange={value => setCount(p.id, +(value ?? 0))} data={Array.from({ length: p.count }, (_, i) => `${i + 1}`)} />
                </Group>
            </Paper>
        )}
    </ScrollArea>}
        <Button fullWidth onClick={() => {
            mutate({ data: selected, detail_id: id })
        }}>
            Запросить
        </Button>
    </>
}


