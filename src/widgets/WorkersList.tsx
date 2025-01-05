import { Color } from "@/shared/consts";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  Image,
  RangeSlider,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router";
export type Worker = (typeof workers)[0];

const workers = [
  {
    id: 1,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Алексей Иванов",
    role: "Менеджер по продажам окон",
    kpi: {
      workload: "75%",
      income: "120,000 ₽",
    },
    workEfficiencyByMonth: [
      { month: "Январь", completed: 75, remaining: 25 },
      { month: "Февраль", completed: 70, remaining: 30 },
      { month: "Март", completed: 80, remaining: 20 },
      { month: "Апрель", completed: 60, remaining: 40 },
      { month: "Май", completed: 85, remaining: 15 },
    ],
  },
  {
    id: 2,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Екатерина Петрова",
    role: "Координатор проектов по остеклению",
    kpi: {
      workload: "85%",
      income: "150,000 ₽",
    },
    workEfficiencyByMonth: [
      { month: "Январь", completed: 85, remaining: 15 },
      { month: "Февраль", completed: 80, remaining: 20 },
      { month: "Март", completed: 90, remaining: 10 },
      { month: "Апрель", completed: 75, remaining: 25 },
      { month: "Май", completed: 95, remaining: 5 },
    ],
  },
  {
    id: 3,
    img: "https://randomuser.me/api/portraits/men/56.jpg",
    name: "Игорь Сидоров",
    role: "Технический специалист по окнам",
    kpi: {
      workload: "65%",
      income: "100,000 ₽",
    },
    workEfficiencyByMonth: [
      { month: "Январь", completed: 65, remaining: 35 },
      { month: "Февраль", completed: 60, remaining: 40 },
      { month: "Март", completed: 70, remaining: 30 },
      { month: "Апрель", completed: 55, remaining: 45 },
      { month: "Май", completed: 75, remaining: 25 },
    ],
  },
  {
    id: 4,
    img: "https://randomuser.me/api/portraits/women/35.jpg",
    name: "Мария Васильева",
    role: "Консультант по дизайну окон",
    kpi: {
      workload: "90%",
      income: "170,000 ₽",
    },
    workEfficiencyByMonth: [
      { month: "Январь", completed: 90, remaining: 10 },
      { month: "Февраль", completed: 85, remaining: 15 },
      { month: "Март", completed: 95, remaining: 5 },
      { month: "Апрель", completed: 80, remaining: 20 },
      { month: "Май", completed: 100, remaining: 0 },
    ],
  },
  {
    id: 5,
    img: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "Дмитрий Смирнов",
    role: "Региональный менеджер по продажам окон",
    kpi: {
      workload: "80%",
      income: "200,000 ₽",
    },
    workEfficiencyByMonth: [
      { month: "Январь", completed: 80, remaining: 20 },
      { month: "Февраль", completed: 85, remaining: 15 },
      { month: "Март", completed: 90, remaining: 10 },
      { month: "Апрель", completed: 75, remaining: 25 },
      { month: "Май", completed: 95, remaining: 5 },
    ],
  },
  {
    id: 6,
    img: "https://avatars.mds.yandex.net/i?id=ccfdbbdb64776e3d27fc1059ac09d8e0_l-8244056-images-thumbs&n=13",
    name: "Михаил Джекович",
    role: "Управляющий по строению окон",
    kpi: {
      workload: "1%",
      income: "999,999 ₽",
    },
    workEfficiencyByMonth: [
      { month: "Январь", completed: 1, remaining: 99 },
      { month: "Февраль", completed: 5, remaining: 95 },
      { month: "Март", completed: 10, remaining: 90 },
      { month: "Апрель", completed: 2, remaining: 98 },
      { month: "Май", completed: 15, remaining: 85 },
    ],
  },
];
function filterWorkersByRange(
  w: Worker[],
  filters: Record<string, [number, number]>,
) {
  return w.filter((worker) => {
    return Object.entries(filters).every(([key, [min, max]]) => {
      if (key === "workload") {
        const workload = parseInt(worker.kpi.workload.replace("%", ""), 10);
        return (
          (min === undefined || workload >= min) &&
          (max === undefined || workload <= max)
        );
      }
      if (key === "income") {
        const income = parseInt(worker.kpi.income.replace(/[^0-9]/g, ""), 10);
        return (
          (min === undefined || income >= min) &&
          (max === undefined || income <= max)
        );
      }
      return true; // Ignore unknown keys
    });
  });
}

export const WorkersList = () => {
  const [w, setW] = useState<typeof workers>(workers);
  useEffect(() => {
    const saved = localStorage.getItem("workers");
    if (saved) {
      return;
    }
    localStorage.setItem("workers", JSON.stringify(workers));
  }, []);
  return (
    <Flex gap={20}>
      {w.length == 0 && <Box>Не найдено</Box>}
      <SimpleGrid flex={2} style={{ overflowY: "auto" }} cols={3}>
        {w.map((w, idx) => (
          <WorkerCard key={idx} {...w} />
        ))}
      </SimpleGrid>
      <WorkersFilter filter={setW} maw={300} h={300} />
    </Flex>
  );
};
const baseFilter: {
  income: [number, number];
  workload: [number, number];
} = {
  income: [0, 999999],
  workload: [0, 100],
};
const WorkersFilter = ({
  filter,
  ...props
}: {
  filter: Dispatch<SetStateAction<Worker[]>>;
} & FlexProps) => {
  const [options, setOptions] = useState<{
    income: [number, number];
    workload: [number, number];
  }>(baseFilter);
  const changeOption = (type: string, value: [number, number]) => {
    setOptions({
      ...options,
      [type]: value,
    });
  };
  const clearFilter = () => {
    filter(workers);
    setOptions(baseFilter);
  };
  console.log(options);

  return (
    <Flex
      maw={300}
      flex={1}
      p={20}
      direction={"column"}
      gap={20}
      style={{ border: `1px solid ${Color("slate-3")}`, borderRadius: 10 }}
      {...props}
    >
      <Title order={3}>Фильтрация</Title>
      <FilterItem
        range={{ min: 0, max: 999999, step: 1000 }}
        value={options.income}
        type={{ label: "По доходу", value: "income" }}
        save={changeOption}
      />
      <FilterItem
        range={{ min: 0, max: 100, step: 5 }}
        value={options.workload}
        type={{ label: "По загруженности", value: "workload" }}
        save={changeOption}
      />
      <Button onClick={() => filter(filterWorkersByRange(workers, options))}>
        Показать
      </Button>
      <Button onClick={() => clearFilter()}>Очистить фильтр</Button>
    </Flex>
  );
};

const FilterItem = ({
  type,
  value,
  save,
  range,
}: {
  type: { label: string; value: string };
  value: [number, number];
  save: (type: string, value: [number, number]) => void;
  range: { min: number; max: number; step: number };
}) => {
  return (
    <Flex gap={10} direction={"column"}>
      <Title order={5}>{type.label}</Title>
      <RangeSlider
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        onChange={(value) => save(type.value, value)}
        defaultValue={[range.min, range.max]}
      />
    </Flex>
  );
};

const WorkerCard = (props: (typeof workers)[0]) => {
  return (
    <Link to={`/admin/workers/${props.id}`}>
      <Flex
        direction={"column"}
        bg={"slate.2"}
        p={10}
        style={{ borderRadius: 10 }}
        gap={20}
      >
        <Box>
          <Image radius={"md"} src={props.img} alt={props.name} />
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
