import { Color, windows } from "@/shared/consts"
import { Box, Button, Center, Group, Image, Stack, Text, Title } from "@mantine/core"
import { Link, useParams } from "react-router"

export const WindowPage = () => {
    const { name } = useParams()
    if (!name) return <Center>Страница не найдена</Center>
    const data = windows[name as keyof typeof windows]
    if (!data) return <Center mih={400} fz={32} c={'primary'} >Страница не найдена!</Center>
    return <Stack pt={30} maw={1400} mx={'auto'} p={{ base: 10, md: 0 }}>
        <Title order={1} ta={'center'} c={'primary'}>{data.name}</Title>
        <Group>
            <Image src={data.url} flex={1} />
            <Stack flex={2}>
                {data.highlights.map((h, idx) => <Text c={'primary'} fw={'bold'}><Text component="span" py={2} px={8} fw={'bold'} style={{
                    borderColor: Color('primary'),
                    borderWidth: 2,
                    borderRadius: '100%',
                    borderStyle: 'solid'
                }}>{idx + 1}</Text> {h}</Text>)}
            </Stack>
        </Group>
        <Group align="start" justify="space-evenly">
            <Stack>
                <Text c={'primary'} fz={22}>Цвета для ламинации</Text>
                <Group>{data.colors.map(c => <Stack align="center">
                    <Image src={c.url} w={80} height={80} />
                    <Text c={'primary'}>{c.name}</Text>
                </Stack>)}</Group>
            </Stack>
            <Stack>
                <Text c={'primary'} fz={22}>Характеристики профиля</Text>
                <Stack>
                    {data.stats.map((s, statNumber) => <Group justify="space-between">
                        <Text c={'secondary'}>{s.label}</Text>
                        <Group gap={3} >
                            {new Array(18).fill('8').map((cell, idx) => <Box w={10} h={12} bg={idx >= s.value ? 'slate.3' : {
                                0: "red", 1: 'green', 2: 'yellow'
                            }[statNumber]} />)}
                        </Group>
                    </Group>)}
                </Stack>
            </Stack>
            <Stack>
                <Text c={'primary'} fz={22}>Цена: <Text component="span" fw={'bold'} c={'primary'} fz={28}>{data.price}</Text></Text>
                <Button component={Link} to={'/calculator'}>Рассчитать окна</Button>
            </Stack>

        </Group>
        <Text c={'primary'}>{data.desc}</Text>
    </Stack>
}
