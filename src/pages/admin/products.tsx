import { productsData } from "@/widgets/charts/ProductsStatsChart";
import { Flex, List, Text, Title } from "@mantine/core";
import { Link } from "react-router";

export const ProductsPage = () => {
  return (
    <Flex direction={"column"} gap={20}>
      <Title>Продукты</Title>
      <List
        type="ordered"
        style={{
          display: "flex",
          gap: 20,
          flexDirection: "column",
        }}
      >
        {productsData.map((pr, idx) => (
          <List.Item
            key={idx}
            bg={"sky.3"}
            p={10}
            style={{ borderRadius: 10, cursor: "pointer" }}
          >
            <Link to={`/admin/products/${idx + 1}`}>
              <Title order={5}>{pr.name}</Title>
              <Text>{pr.desc}</Text>
            </Link>
          </List.Item>
        ))}
      </List>
    </Flex>
  );
};
