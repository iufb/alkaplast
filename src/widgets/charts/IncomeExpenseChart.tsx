import { Color, monthTranslations } from "@/shared/consts";
import { Title } from "@mantine/core";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";


const financialData = [
    { month: "January", income: 3_255_000, expense: 1_860_000 }, // Slower sales after holidays
    { month: "February", income: 3_487_500, expense: 1_953_000 }, // Gradual increase in sales
    { month: "March", income: 4_185_000, expense: 2_325_000 }, // Seasonal demand picks up in spring
    { month: "April", income: 5_115_000, expense: 2_790_000 }, // Strong demand during home renovation season
    { month: "May", income: 5_580_000, expense: 3_022_500 }, // Peak season for window replacements
    { month: "June", income: 5_347_500, expense: 2_929_500 }, // Slight dip as summer vacations start
    { month: "July", income: 4_650_000, expense: 2_697_000 }, // Lower demand due to vacations
    { month: "August", income: 4_882_500, expense: 2_790_000 }, // Demand rebounds after vacation season
    { month: "September", income: 6_045_000, expense: 3_255_000 }, // Strong sales in early autumn
    { month: "October", income: 6_510_000, expense: 3_487_500 }, // Continued high demand before winter
    { month: "November", income: 5_115_000, expense: 3_022_500 }, // Demand starts to taper off
    { month: "December", income: 4_185_000, expense: 2_557_500 }, // Slower sales due to holidays
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
