import {
  productsData,
  ProductStats,
} from "@/widgets/charts/ProductsStatsChart";
import { Box, Flex, Image, Text, Title } from "@mantine/core";
import { useParams } from "react-router";

export const ProductPage = () => {
  const { id } = useParams();
  const currentProduct = productsData[Number(id) - 1];
  console.log(currentProduct);

  return (
    <Flex direction={"column"} gap={20}>
      <Title ta={"center"}>{currentProduct.name}</Title>

      <Flex gap={20}>
        <Image flex={1} src={currentProduct.img} maw={300} />
        <Box>
          <Text size="xl">{currentProduct.desc}</Text>
          <Text component="p">{currentProduct.additionalInfo}</Text>
        </Box>
      </Flex>
      <Title>Продажи</Title>
      <Box w={"90%"}>
        <ProductStats stats={currentProduct.stats} />
      </Box>
    </Flex>
  );
};
