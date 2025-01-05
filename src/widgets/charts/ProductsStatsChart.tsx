import { monthTranslations, Color } from "@/shared/consts";
import { Box, Flex, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Tooltip,
} from "recharts";

export const productsData = [
  {
    name: "Окна ПВХ",
    desc: "Популярные окна с хорошими теплоизоляционными свойствами.",
    img: "https://via.placeholder.com/150/00aaff/ffffff?text=Окна+ПВХ",
    additionalInfo: "Идеальны для квартир и домов в холодных климатах.",
    stats: [
      { month: "Январь", sells: 150 },
      { month: "Февраль", sells: 180 },
      { month: "Март", sells: 200 },
      { month: "Апрель", sells: 250 },
      { month: "Май", sells: 230 },
      { month: "Июнь", sells: 210 },
      { month: "Июль", sells: 240 },
      { month: "Август", sells: 220 },
      { month: "Сентябрь", sells: 200 },
      { month: "Октябрь", sells: 210 },
      { month: "Ноябрь", sells: 190 },
      { month: "Декабрь", sells: 220 },
    ],
  },
  {
    name: "Рулонные шторы",
    desc: "Шторы для окон с возможностью управления освещением.",
    img: "https://via.placeholder.com/150/ffaa00/ffffff?text=Рулонные+Шторы",
    additionalInfo: "Доступны в различных цветах и стилях для любой комнаты.",
    stats: [
      { month: "Январь", sells: 100 },
      { month: "Февраль", sells: 120 },
      { month: "Март", sells: 130 },
      { month: "Апрель", sells: 140 },
      { month: "Май", sells: 150 },
      { month: "Июнь", sells: 160 },
      { month: "Июль", sells: 155 },
      { month: "Август", sells: 160 },
      { month: "Сентябрь", sells: 170 },
      { month: "Октябрь", sells: 180 },
      { month: "Ноябрь", sells: 175 },
      { month: "Декабрь", sells: 185 },
    ],
  },
  {
    name: "Жалюзи",
    desc: "Эстетичные и удобные жалюзи для офисных и жилых помещений.",
    img: "https://via.placeholder.com/150/ff5500/ffffff?text=Жалюзи",
    additionalInfo: "Подходят для любых окон. Легко чистятся и долговечны.",
    stats: [
      { month: "Январь", sells: 80 },
      { month: "Февраль", sells: 90 },
      { month: "Март", sells: 95 },
      { month: "Апрель", sells: 100 },
      { month: "Май", sells: 105 },
      { month: "Июнь", sells: 110 },
      { month: "Июль", sells: 115 },
      { month: "Август", sells: 120 },
      { month: "Сентябрь", sells: 125 },
      { month: "Октябрь", sells: 130 },
      { month: "Ноябрь", sells: 135 },
      { month: "Декабрь", sells: 140 },
    ],
  },
  {
    name: "Окна с двойным остеклением",
    desc: "Энергоэффективные окна с улучшенной шумоизоляцией.",
    img: "https://via.placeholder.com/150/00ff55/ffffff?text=Двойное+Остекление",
    additionalInfo:
      "Рекомендуются для офисов и жилых помещений с высоким уровнем шума.",
    stats: [
      { month: "Январь", sells: 70 },
      { month: "Февраль", sells: 75 },
      { month: "Март", sells: 80 },
      { month: "Апрель", sells: 85 },
      { month: "Май", sells: 90 },
      { month: "Июнь", sells: 95 },
      { month: "Июль", sells: 100 },
      { month: "Август", sells: 110 },
      { month: "Сентябрь", sells: 120 },
      { month: "Октябрь", sells: 130 },
      { month: "Ноябрь", sells: 140 },
      { month: "Декабрь", sells: 150 },
    ],
  },
  {
    name: "Тентовые окна",
    desc: "Окна с тентами для защиты от солнца и дождя.",
    img: "https://via.placeholder.com/150/5500ff/ffffff?text=Тентовые+Окна",
    additionalInfo: "Прекрасно подходят для террас и открытых пространств.",
    stats: [
      { month: "Январь", sells: 40 },
      { month: "Февраль", sells: 50 },
      { month: "Март", sells: 60 },
      { month: "Апрель", sells: 65 },
      { month: "Май", sells: 70 },
      { month: "Июнь", sells: 75 },
      { month: "Июль", sells: 80 },
      { month: "Август", sells: 85 },
      { month: "Сентябрь", sells: 90 },
      { month: "Октябрь", sells: 100 },
      { month: "Ноябрь", sells: 110 },
      { month: "Декабрь", sells: 120 },
    ],
  },
];

export const ProductsStatsChart = () => {
  const matches = useMediaQuery("(min-width: 56.25em)");
  return (
    <>
      <Title c={"sky.6"} mb={30}>
        Статистика продуктов
      </Title>
      <Flex w={"100%"} direction={"column"} gap={40}>
        {productsData.map((pr) => (
          <Flex
            justify={"space-between"}
            gap={matches ? 0 : 20}
            direction={matches ? "row" : "column"}
            align={"center"}
          >
            <ProductInfo props={{ name: pr.name, desc: pr.desc }} />
            <ProductStats stats={pr.stats} />
          </Flex>
        ))}
      </Flex>
    </>
  );
};

const ProductInfo = ({ props }: { props: Record<string, string> }) => {
  return (
    <Flex
      flex={1}
      direction={"column"}
      gap={20}
      justify={"center"}
      align={"center"}
      p={10}
      style={{
        border: `1px solid ${Color("slate-3")}`,
        borderRadius: 10,
      }}
    >
      <Title ta={"center"} order={4}>
        {props.name}
      </Title>
      <Text ta={"center"}>{props.desc}</Text>
    </Flex>
  );
};

export const ProductStats = ({
  stats,
}: {
  stats: (typeof productsData)[0]["stats"];
}) => {
  return (
    <Box flex={4}>
      <ResponsiveContainer width={"100%"} height={250}>
        <BarChart data={stats}>
          <Tooltip
            formatter={(value, name) => {
              return name == "sells" && [value, "Продажи"];
            }}
          />
          <XAxis dataKey="month" />
          <YAxis />
          <Bar dataKey={"sells"} fill={Color("purple-5")} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
