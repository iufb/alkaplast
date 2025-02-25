import { CreateWorker } from "@/features/CreateWorker";
import {
    Box,
    Flex,
    Image,
    Text,
    Title
} from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router";
export const WorkersList = () => {
    return (
        <Flex gap={20}>
            <CreateWorker>Создать разработника</CreateWorker>

        </Flex>
    );
};

const Table = () => {
    const { } = useQuery({ queryKey: [], queryFn: })
    const rows = elements.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Element position</Table.Th>
                    <Table.Th>Element name</Table.Th>
                    <Table.Th>Symbol</Table.Th>
                    <Table.Th>Atomic mass</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
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

