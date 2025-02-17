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
    Title
} from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router";
export type Worker = (typeof workers)[0];


const workers = [
    {
        id: 1,
        img: "https://sun9-5.userapi.com/impg/0VcHWDcAFqWDoMIaMXJ7qCwRtCsNQxjSjO5Qyw/wVco99i7vac.jpg?size=607x1080&quality=95&sign=2638e9737983c85b1e110d8248381318&type=album",
        name: "Ерлан Серикбаев",
        role: "Менеджер по продажам окон",
        kpi: {
            workload: "80%",
            income: "500,000 ₸",
        },
        workEfficiencyByMonth: [
            { month: "Январь", completed: 75, remaining: 25 },
            { month: "Февраль", completed: 70, remaining: 30 },
            { month: "Март", completed: 85, remaining: 15 },
            { month: "Апрель", completed: 80, remaining: 20 },
            { month: "Май", completed: 90, remaining: 10 },
        ],
    },
    {
        id: 2,
        img: "https://randomuser.me/api/portraits/women/78.jpg",
        name: "Асель Нурмаганбетова",
        role: "Координатор проектов остекления",
        kpi: {
            workload: "85%",
            income: "600,000 ₸",
        },
        workEfficiencyByMonth: [
            { month: "Январь", completed: 85, remaining: 15 },
            { month: "Февраль", completed: 90, remaining: 10 },
            { month: "Март", completed: 95, remaining: 5 },
            { month: "Апрель", completed: 85, remaining: 15 },
            { month: "Май", completed: 100, remaining: 0 },
        ],
    },
    {
        id: 3,
        img: "https://img.freepik.com/free-photo/close-up-smiley-man-outdoors_23-2148677649.jpg?t=st=1736494620~exp=1736498220~hmac=37af497033fb41ac9466fa22010ef62285edf5456eafb7d5e6ad680bca309c2f&w=740",
        name: "Иван Соловьев",
        role: "Технический специалист по установке окон",
        kpi: {
            workload: "70%",
            income: "400,000 ₸",
        },
        workEfficiencyByMonth: [
            { month: "Январь", completed: 65, remaining: 35 },
            { month: "Февраль", completed: 70, remaining: 30 },
            { month: "Март", completed: 75, remaining: 25 },
            { month: "Апрель", completed: 70, remaining: 30 },
            { month: "Май", completed: 80, remaining: 20 },
        ],
    },
    {
        id: 4,
        img: "https://sun9-65.userapi.com/impg/Xtl2YWtZqMO26wUUzGzv70iEYd1fhgJknLmPEA/sVcMre76coI.jpg?size=720x1080&quality=96&sign=e0e5c6077ca0847323676ee2a84b78e6&type=album",
        name: "Нуржан Кулекбаев",
        role: "Региональный менеджер по продажам окон",
        kpi: {
            workload: "85%",
            income: "750,000 ₸",
        },
        workEfficiencyByMonth: [
            { month: "Январь", completed: 80, remaining: 20 },
            { month: "Февраль", completed: 85, remaining: 15 },
            { month: "Март", completed: 90, remaining: 10 },
            { month: "Апрель", completed: 85, remaining: 15 },
            { month: "Май", completed: 95, remaining: 5 },
        ],
    },
    {
        id: 5,
        img: "https://sun9-44.userapi.com/impg/PftLhP3ELoGp875rNszxZLeKW0dXEXbQKmLsOA/xazMJFjf4yE.jpg?size=1280x1084&quality=95&sign=13babafcd7407fcc9480a452981e9703&type=album",
        name: "Арман Сулейменов",
        role: "Управляющий строительными проектами",
        kpi: {
            workload: "60%",
            income: "1,200,000 ₸",
        },
        workEfficiencyByMonth: [
            { month: "Январь", completed: 60, remaining: 40 },
            { month: "Февраль", completed: 65, remaining: 35 },
            { month: "Март", completed: 70, remaining: 30 },
            { month: "Апрель", completed: 60, remaining: 40 },
            { month: "Май", completed: 75, remaining: 25 },
        ],
    },
    {
        id: 6,
        img: "https://img.freepik.com/premium-photo/full-length-portrait-mechanic-standing-against-white-background_1048944-11657080.jpg?w=740",
        name: "Игорь Черенов",
        role: "Мастер по установке окон",
        kpi: {
            workload: "75%",
            income: "450,000 ₸",
        },
        workEfficiencyByMonth: [
            { month: "Январь", completed: 70, remaining: 30 },
            { month: "Февраль", completed: 75, remaining: 25 },
            { month: "Март", completed: 80, remaining: 20 },
            { month: "Апрель", completed: 75, remaining: 25 },
            { month: "Май", completed: 85, remaining: 15 },
        ],
    },
    {
        id: 7,
        img: "https://www.oknastreet.ru/assets/components/phpthumbof/cache/350.cf052312802a9c269efb0cb76295e266.jpg",
        name: "Ерболат Сейдиров",
        role: "Специалист по монтажу окон",
        kpi: {
            workload: "65%",
            income: "420,000 ₸",
        },
        workEfficiencyByMonth: [
            { month: "Январь", completed: 60, remaining: 40 },
            { month: "Февраль", completed: 65, remaining: 35 },
            { month: "Март", completed: 70, remaining: 30 },
            { month: "Апрель", completed: 65, remaining: 35 },
            { month: "Май", completed: 75, remaining: 25 },
        ],
    },
    {
        id: 8,
        img: "https://img.freepik.com/premium-photo/35-40-year-old-man-is-lonely-sad-man-sitting-with-glass-coffee-street-cafe_131087-926.jpg?semt=ais_hybrid",
        name: "Руслан Абдраимов",
        role: "Установщик окон",
        kpi: {
            workload: "80%",
            income: "470,000 ₸",
        },
        workEfficiencyByMonth: [
            { month: "Январь", completed: 75, remaining: 25 },
            { month: "Февраль", completed: 80, remaining: 20 },
            { month: "Март", completed: 85, remaining: 15 },
            { month: "Апрель", completed: 80, remaining: 20 },
            { month: "Май", completed: 90, remaining: 10 },
        ],
    },
];

;
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
        <Link to={`/admin/workers/${props.id}`} >
            <Flex
                direction={"column"}
                bg={"slate.2"}
                h={'100%'}
                p={10}
                style={{ borderRadius: 10 }}
                gap={20}
            >
                <Box h={'80%'} p={20}>
                    <Image h={'100%'} fit="cover" mah={400} radius={"md"} src={props.img} alt={props.name} />
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

