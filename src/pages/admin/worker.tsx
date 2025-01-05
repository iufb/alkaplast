import { monthTranslations, Color } from "@/shared/consts";
import { Worker } from "@/widgets/WorkersList";
import { Box, Flex, Image, Text, Title } from "@mantine/core";
import { useParams } from "react-router";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Tooltip,
} from "recharts";

export const WorkerPage = () => {
  const workers: any[] = JSON.parse(localStorage.getItem("workers") ?? "");
  const { id } = useParams();
  const currentWorker: Worker = workers.filter((w) => w.id == id)[0];
  return (
    <Flex direction={"column"} gap={30}>
      <Title>{currentWorker.name}</Title>
      <Text>{currentWorker.role}</Text>
      <Image src={currentWorker.img} maw={300} />
      <Flex direction={"column"} gap={20}>
        <Box>
          <Title order={4}>
            Всего успешных работ :{" "}
            {currentWorker.workEfficiencyByMonth.reduce(
              (p, c) => p + c.completed,
              0,
            )}
          </Title>
          <Title order={4}>
            Всего неуспешных работ :{" "}
            {currentWorker.workEfficiencyByMonth.reduce(
              (p, c) => p + c.remaining,
              0,
            )}
          </Title>
        </Box>
        <Box w={"100%"} h={300}>
          <ResponsiveContainer width={"100%"} height={400}>
            <BarChart data={currentWorker.workEfficiencyByMonth}>
              <Tooltip
                formatter={(value, name) => {
                  return name == "compeleted"
                    ? [value, "Завершено"]
                    : [value, "Не завершено"];
                }}
                label={"month"}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey={"completed"} fill={Color("sky-3")} />
              <Bar dataKey={"remaining"} fill={Color("red-3")} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    </Flex>
  );
};
