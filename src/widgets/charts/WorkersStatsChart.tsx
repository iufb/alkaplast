import { Color } from "@/shared/consts";
import { Piechart } from "@/shared/ui";
import { Flex, Grid, SimpleGrid, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip } from "recharts";
const data = [
  { name: "Worker 1", successfulWorks: 120 },
  { name: "Worker 2", successfulWorks: 95 },
  { name: "Worker 3", successfulWorks: 150 },
  { name: "Worker 4", successfulWorks: 80 },
];
const COLORS = [
  Color("sky-5"),
  Color("green-5"),
  Color("yellow-5"),
  Color("purple-5"),
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: Record<string, number>) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export const WorkersStatsChart = () => {
  const matches = useMediaQuery("(min-width: 56.25em)");
  return (
    <>
      <Title c={"sky.6"} mb={30}>
        Статистика работников
      </Title>
      <Flex
        w={"100%"}
        h={400}
        mb={matches ? 0 : 200}
        miw={"60%"}
        direction={matches ? "row" : "column"}
      >
        <SimpleGrid cols={2} w={"100%"}>
          {data.map((workerData) => (
            <Flex
              direction={"column"}
              key={workerData.name}
              justify={"center"}
              align={"center"}
              p={10}
              gap={20}
              style={{
                border: `1px solid ${Color("slate-3")}`,
                borderRadius: 10,
              }}
            >
              <Title order={5}>Работник:{workerData.name}</Title>
              <Text>Успешных работ {workerData.successfulWorks}</Text>
            </Flex>
          ))}
        </SimpleGrid>
        <Piechart
          data={data}
          pieKey="successfulworks"
          tooltipProps={{
            formatter: (value, name) => [`${value} успешных работ`, name],
            labelFormatter: (label) => `Работник: ${label}`,
          }}
        />
      </Flex>
    </>
  );
};
