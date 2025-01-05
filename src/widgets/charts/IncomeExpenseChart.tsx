import { Color, monthTranslations } from "@/shared/consts";
import { getThemeColor, Title, useMantineTheme } from "@mantine/core";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const financialData = [
  { month: "January", income: 5000, expense: 3000 },
  { month: "February", income: 5200, expense: 2800 },
  { month: "March", income: 4800, expense: 3500 },
  { month: "April", income: 6000, expense: 4000 },
  { month: "May", income: 5800, expense: 3900 },
  { month: "June", income: 6200, expense: 4100 },
  { month: "July", income: 5500, expense: 3700 },
  { month: "August", income: 5400, expense: 3600 },
  { month: "September", income: 5900, expense: 4000 },
  { month: "October", income: 6100, expense: 3900 },
  { month: "November", income: 6000, expense: 3800 },
  { month: "December", income: 6500, expense: 4200 },
];

export const IncomeExpenseChart = () => {
  return (
    <>
      <Title c={"sky.6"} mb={30}>
        Доход - Расход
      </Title>
      <ResponsiveContainer width={"100%"} height={400}>
        <BarChart data={financialData}>
          <Tooltip
            formatter={(value, name) => {
              return name == "income" ? [value, "Доход"] : [value, "Расход"];
            }}
            labelFormatter={(label: keyof typeof monthTranslations) =>
              monthTranslations[label]
            }
          />
          <XAxis
            dataKey="month"
            tickFormatter={(label: keyof typeof monthTranslations) =>
              monthTranslations[label]
            }
          />
          <YAxis />
          <Bar dataKey={"income"} fill={Color("sky-3")} />
          <Bar dataKey={"expense"} fill={Color("red-3")} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
