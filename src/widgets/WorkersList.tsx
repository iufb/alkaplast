import { CreateWorker } from "@/features/CreateWorker";
import { rGetMasters } from "@/shared/api/workers";
import {
    Box,
    Flex,
    Group,
    Image,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useQuery } from "react-query";
import { Link } from "react-router";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
export const WorkersList = () => {
    return (
        <Stack>
            <CreateWorker>Добавить работника</CreateWorker>
            <MastersTable />
        </Stack>
    );
};

const MastersTable = () => {
    const { data, isLoading, isError } = useQuery({ queryKey: ['workerlist'], queryFn: rGetMasters })
    console.log(data)
    return (
        <Stack align="center">
            <Title c={'primary'} ta={'center'} order={2}>Мастера</Title>
            {isLoading ? <Skeleton width={1000} height={190} /> : (isError && !data) ? <Text></Text> :
                data?.map((w: any) =>
                    <Paper maw={1000} p={10} shadow="md">
                        <Group align="center">
                            <Image maw={300} src={import.meta.env.VITE_BACKENDURL + w.photo} />
                            <Group align="center" flex={1} justify="space-evenly">
                                <Stack>
                                    <Title order={4}>ФИО: {w.fio}</Title>
                                    <Text>Должность: Мастер</Text>
                                    <Text>Логин: {w.username}</Text>
                                </Stack>

                                <WorkStatusPieChart data={[{ name: "В процессе", value: w.waitingDetails }, { name: "Завершено", value: w.completed_details }, { name: "Всего", value: w.total_details }]} />
                            </Group>
                        </Group>
                    </Paper>

                )}
        </Stack>
    )
}


const COLORS = ['#4CAF50', '#FFC107', '#2196F3'];

function WorkStatusPieChart({ data }: { data: { name: string, value: number }[] }) {
    return (
        <Box w={{ base: 290, sm: 300 }} h={300}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
}

const WorkerCard = (props: any) => {
    return (
        <Link to={`/admin/workers/${props.id}`} >
            <Flex
                direction={"column"}
                bg={"slate.2"}
                h={'100%'}
                p={10}
                style={{ borderRadius: 10 }}
                gap={20}
            >
                <Box h={'80%'} p={20}>
                    <Image h={'100%'} fit="cover" mah={400} radius={"md"} src={props.img} alt={props.name} />
                </Box>
                <Flex direction={"column"}>
                    <Title ta={"center"} order={5}>
                        {props.name}
                    </Title>
                    <Text ta={"center"}>{props.role}</Text>
                </Flex>
            </Flex>
        </Link>
    );
};

