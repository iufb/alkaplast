import { Color } from "@/shared/consts";
import { Flex, Grid, SimpleGrid, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const Piechart = ({
  data,
  pieKey,
  tooltipProps,
}: {
  data: Record<any, any>[];
  pieKey: string;
  tooltipProps: TooltipProps<ValueType, NameType>;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          fill={Color("gray-6")}
          dataKey="successfulWorks"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value} успешных работ`, name]}
          labelFormatter={(label) => `Работник: ${label}`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

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
