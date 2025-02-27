import { rGetMasterApplications } from "@/shared/api/applications";
import { ApplicationStatus } from "@/shared/consts";
import { Skeleton, Stack, Table, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useQuery } from "react-query";

export const MasterPage = () => {
    return <Stack p={{ base: 10, lg: 0 }} pt={20} maw={1400} mx={'auto'}>
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
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data?.map((a: any) =>
                                <Table.Tr key={a.id}>
                                    <Table.Td>{a.phone}</Table.Td>
                                    <Table.Td>{a.address}</Table.Td>
                                    <Table.Td>{ApplicationStatus[a.status as keyof typeof ApplicationStatus]}</Table.Td>
                                    <Table.Td>{dayjs(a.created_at).format('DD-MM-YYYY')}</Table.Td>
                                </Table.Tr>)}
                        </Table.Tbody>

                    </Table></Table.ScrollContainer>}
        </Stack>
    );
}
