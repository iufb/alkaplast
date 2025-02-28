import { rFinishApplication, rGetMasterApplications } from "@/shared/api/applications";
import { rGetMasterProducts, rGetRequestedItems, rGetRequestedProducts, rMasterRequest } from "@/shared/api/products";
import { ApplicationStatus, ImageFallback } from "@/shared/consts";
import { Button, Drawer, Group, Image, Paper, ScrollArea, Select, Skeleton, Stack, Table, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const MasterPage = () => {
    return <Stack p={{ base: 10 }} pt={20} maw={1400} mx={'auto'}>
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
        onSuccess: (data) => {
            // Handle success
        },
        onError: (error) => {
            // Handle error
        },
    });

    return (
        <Stack>
            <Title order={4} c={'primary'}>Необработанные заявки</Title>
            {isLoading ? <Skeleton height={400} /> : (isError && !data) ? <Text c={'red'}>Ошибка загрузки...</Text> : data?.length == 0 ? <Text c={'secondary'}>Нет заявок</Text> :
                <Table.ScrollContainer minWidth={290}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Телефон</Table.Th>
                                <Table.Th>Адрес</Table.Th>
                                <Table.Th>Статус</Table.Th>
                                <Table.Th>Дата отправки</Table.Th>
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
                                    <Table.Td><RequestMaterials id={a.id} /></Table.Td>
                                    <Table.Td><Finish id={a.id} /></Table.Td>
                                </Table.Tr>)}
                        </Table.Tbody>

                    </Table></Table.ScrollContainer>}
        </Stack>
    );
}
const Finish = ({ id }: { id: number }) => {
    const { mutate, isLoading, isError } = useMutation({
        mutationFn: rFinishApplication,
        onSuccess: (data) => {
            // Handle success
        },
        onError: (error) => {
            // Handle error
        },

    });
    return <Button loading={isLoading} disabled={isLoading} onClick={() => mutate(id)}>Завершить</Button>
}
const RequestMaterials = ({ id }: { id: number }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { data: requestedItems, isLoading: reqItemsLoading, isError: reqItemsError } = useQuery({
        queryKey: ['requestedItems'],
        queryFn: async () => {
            const data = await rGetRequestedItems(id);
            return data
        },
        onSuccess: (data) => {
            // Handle success
        },
        onError: (error) => {
            // Handle error
        },

    });
    console.log(requestedItems)
    console.log(requestedItems, `REQITEMS -${id}`)
    return (
        <>
            <Drawer styles={{ body: { height: 'calc(100% - 85px)' } }} opened={opened} onClose={close} title={reqItemsError ? "Запросить материалы" : "Посмотреть запрошенные материалы"}
            >
                {reqItemsError ? <AddItemsForm id={id} /> : <ShowRequestedItems requestedItems={requestedItems} />}

            </Drawer>

            <Button variant="default" onClick={open}>
                {reqItemsError ? "Запросить" : "Посмотреть"}
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
        onSuccess: (data) => {
            // Handle success
        },
        onError: (error) => {
            // Handle error
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
        onSuccess: (data) => {
            // Handle success
        },
        onError: (error) => {
            // Handle error
        },
    });
    const { mutate, isLoading: mutationLoading, isError: mutationError } = useMutation({
        mutationFn: rMasterRequest,
        onSuccess: (data) => {
            // Handle success
        },
        onError: (error) => {
            // Handle error
        },

    });
    const setCount = (id: number, value: number) => {
        setSelected({ ...selected, [id]: value })
    }

    return <> isLoading ? <Skeleton h={50} /> : (!data && isError) ? <Text c={'red'}>Ошибка загрузки...</Text> : <ScrollArea h={'100%'}>
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
    </ScrollArea>
        <Button fullWidth onClick={() => {
            mutate({ data: selected, detail_id: id })
        }}>
            Запросить
        </Button>
    </>
}


