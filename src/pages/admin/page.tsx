import {
  IncomeExpenseChart,
  ProductsStatsChart,
  WorkersStatsChart,
} from "@/widgets";
import { Flex } from "@mantine/core";

export const AdminMainPage = () => {
  return (
    <Flex gap={30} direction={"column"} maw={1200} w={"100%"}>
      <IncomeExpenseChart />
      <WorkersStatsChart />
      <ProductsStatsChart />
    </Flex>
  );
};
