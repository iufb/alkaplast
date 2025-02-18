import { Carousel } from "@mantine/carousel";
import { Accordion, Button, Group, Image, List, Paper, SimpleGrid, Stack, StackProps, Text, ThemeIcon } from "@mantine/core";
import { Check, CircleHelpIcon, ClipboardCheck, FileText, Hammer, Headphones, Lock, Paintbrush, Ruler, Search, ShieldCheck, Volume2 } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router";
import styles from './home.module.css';
const faq = [
    {
        question: "Сколько времени занимает установка окон?",
        answer: "Установка стандартного окна занимает около 2-3 часов. Полная замена окон в квартире обычно выполняется за 1 день."
    },
    {
        question: "Нужна ли предоплата перед началом работ?",
        answer: "Да, мы работаем по предоплате 50%. Оставшуюся сумму вы оплачиваете после завершения установки."
    },
    {
        question: "Какой гарантийный срок на окна?",
        answer: "Мы предоставляем гарантию на окна 5 лет и 1 год на монтажные работы."
    },
    {
        question: "Можно ли заказать установку зимой?",
        answer: "Да, установка возможна в любое время года. Мы используем зимние монтажные технологии, которые обеспечивают качественное уплотнение."
    },
    {
        question: "Как ухаживать за пластиковыми окнами?",
        answer: "Рекомендуем протирать профиль и стекла мягкой тканью с мыльным раствором, а уплотнители смазывать силиконовой смазкой раз в год."
    }
];
const steps = [
    {
        id: 1,
        title: "Оформление заявки",
        description: "Оставьте заявку на сайте или по телефону",
        icon: <FileText color="#E91E63" size={32} />
    },
    {
        id: 2,
        title: "Бесплатный замер",
        description: "Выезд мастера в удобное время",
        icon: <Ruler color="#4CAF50" size={32} />
    },
    {
        id: 3,
        title: "Подбор окон",
        description: "Поможем выбрать лучший вариант",
        icon: <Search color="#2196F3" size={32} />
    },
    {
        id: 4,
        title: "Монтаж за 1 день",
        description: "Быстро и без пыли",
        icon: <Hammer color="#FF9800" size={32} />
    },
    {
        id: 5,
        title: "Гарантия и обслуживание",
        description: "Мы на связи даже после установки",
        icon: <ShieldCheck color="#607D8B" size={32} />
    }
];
const features = [
    {
        title: "Поддержка наших клиентов 24/7",
        description: "Наш менеджер всегда на связи. В любое время Вы сможете связаться с Нами, если у Вас возникли какие либо вопросы или пожелания в ходе работы с нами!",
        icon: <Headphones color="#1E3748" size={32} />
    },
    {
        title: "Бесплатная консультация",
        description: "Составление проекта, помощь в выборе профильных систем, выезд инженера-проектировщика, консультация дизайнера, выезд менеджера.",
        icon: <ClipboardCheck color="#1E3748" size={32} />
    },
    {
        title: "Долговечность конструкций",
        description: "Наши окна рассчитаны на эксплуатацию сроком до 60 лет. Благодаря своему уникальному составу наши окна относятся к классу морозостойких, и может выдерживать температуры от -60 до +75.",
        icon: <ShieldCheck color="#1E3748" size={32} />
    },
    {
        title: "Превосходная защита от шума",
        description: "Благодаря повышенной герметичности наших изделий, в Вашем доме будут тишина и спокойствие, даже если за окном оживленная магистраль или стройка!",
        icon: <Volume2 color="#1E3748" size={32} />
    },
    {
        title: "Эксклюзивный дизайн",
        description: "Составление проекта, помощь в выборе профильных систем, выезд инженера-проектировщика, консультация дизайнера, выезд менеджера.",
        icon: <Paintbrush color="#1E3748" size={32} />
    },
    {
        title: "Гарантия безопасности",
        description: "С нашими надежными и проверенными годами партнерами мы гарантируем Вам безопасность. Противовзломная фурнитура нового поколения увеличивает время взлома с 5 до 10 минут.",
        icon: <Lock color="#1E3748" size={32} />
    }
];

const reviews = [
    {
        id: 1,
        name: "Анна Смирнова",
        photo: "/reviews/1.jpg",
        quote: "Отличное качество окон и профессиональный монтаж! Все сделали быстро и аккуратно.",
    },
    {
        id: 2,
        name: "Марина Ковальчук",
        photo: "/reviews/2.jpg",
        quote: "Думал, что установка займет несколько дней, но все сделали за один день. Очень доволен!",
    },
    {
        id: 3,
        name: "Игорь Петров",
        photo: "/reviews/3.jpg",
        quote: "Теперь в квартире стало теплее и тише. Большое спасибо за качественную работу!",
    },
    {
        id: 4,
        name: "Алексей Васильев",
        photo: "/reviews/4.jpg",
        quote: "Команда работает профессионально. Окна идеально вписались в интерьер!",
    }
];



export const HomePage = () => {
    return <Stack gap={60}>
        <Section>
            <Group>
                <Stack flex={1} gap={20}>
                    <SectionTitle>Новые окна — комфорт на долгие годы!</SectionTitle>
                    <List
                        spacing="xs"
                        size="md"
                        pl={20}
                        c={'primary'}
                        center
                        icon={
                            <ThemeIcon color="primary" size={24} radius="xl">
                                <Check size={16} />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>Тепло зимой, прохлада летом</List.Item>
                        <List.Item>Тишина в доме и меньше счетов за отопление</List.Item>
                        <List.Item>Установка за 1 день без грязи и пыли</List.Item>
                    </List>
                    <Button component={Link} to={'/calculator'}>Получить бесплатный замер</Button>
                </Stack>
                <Image visibleFrom="lg" src={'/Hero.png'} height={600} flex={1} />
            </Group>
        </Section>
        <Section>
            <SectionTitle>Почему выбирают нас?</SectionTitle>
            <SimpleGrid cols={{ xs: 1, md: 2 }}>
                {features.map(f => <Paper bg={'secondary'} shadow="xs" p="xl">
                    <Group>
                        {f.icon}
                        <Text fz={24} c={'primary'} fw={'bold'}>{f.title}</Text>
                    </Group>
                    <Text>{f.description}</Text>
                </Paper>)}
            </SimpleGrid>
        </Section>
        <Section>
            <SectionTitle>Как мы работаем?</SectionTitle>
            <picture>
                <source media="(max-width: 720px)" srcSet="/workstep-mobile.png" />
                <Image maw={1200} mx={'auto'} src={'/workstep.png'} />
            </picture>
        </Section>
        <Section>
            <SectionTitle>Что говорят наши клиенты?</SectionTitle>
            <Carousel
                mx={'auto'}
                w={{ base: 290, sm: 350, md: 600, lg: 800, xl: 1200 }}
                withIndicators
                slideSize={{ sm: '50%', md: '33.333333%' }}
                slideGap={{ base: 0, sm: 'md' }}
                loop
                align="start"
            >                {reviews.map(r => <Carousel.Slide key={r.id}>
                <Paper>
                    <Group justify="center">
                        <Image height={200} width={'auto'} radius={10} src={r.photo} />
                        <Stack >
                            <Text ta={'center'} fz={16} c={'primary'} lh={1}>{r.quote}</Text>
                            <Text ta={'end'} fz={18} c={'primary'} fw={'bold'} fs={'italic'}>{r.name}</Text>
                        </Stack>
                    </Group>
                </Paper>
            </Carousel.Slide>)}
            </Carousel>
        </Section>
        <Stack className={styles.promotion} w={'100%'} h={500}>
            <Section justify="center" align="center" px={10} h={"100%"} bg={'rgba(0,0,0,.4)'}>
                <Text ta={'center'} fz={32} c={'white'}>Акция!</Text>
                <Text px={10} style={{ borderRadius: 10 }} c={'white'} ta={'center'} fz={{ base: 16, md: 18 }}>Закажите установку окон до 28.05.2025 и получите москитную сетку в подарок!</Text>
                <Button maw={500} w={'100%'} >Получить подарок!</Button>
            </Section>
        </Stack>
        <Section>
            <SectionTitle>FAQ</SectionTitle>
            <Accordion styles={{ root: { width: '100%' } }}>
                {faq.map(f =>
                    <Accordion.Item key={f.question} value={f.question}>
                        <Accordion.Control c={'primary'} fw={'bold'} icon={<CircleHelpIcon />}>{f.question}</Accordion.Control>
                        <Accordion.Panel c={'primary'} >{f.answer}</Accordion.Panel>
                    </Accordion.Item>
                )}
            </Accordion>
        </Section>
    </Stack >
}
const Section = ({ children, ...props }: { children: ReactNode } & StackProps) => {
    return <Stack {...props} p={{ base: 10, md: 20, xl: 0 }} w={'100%'} maw={1400} mx={'auto'}>
        {children}
    </Stack>
}
const SectionTitle = ({ children }: { children: ReactNode }) => {
    return <Text lh={1} c={'primary'} fz={{ base: 24, md: 32, lg: 42 }} fw={'bold'} >{children}</Text>

}

