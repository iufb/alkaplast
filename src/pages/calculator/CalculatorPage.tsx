import { CreateApplication } from "@/features"
import { Box, Center, Divider, Group, Image, NumberInput, SimpleGrid, Stack, StackProps, Text, Title } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { useState } from "react"
const variants = [
    {
        maxW: 150,
        scale: 1.2,
        urls: ['1_1.png', '1_2.png', '1_3.png',]
    },
    {
        maxW: 250,
        scale: 1.8,
        urls: ['2_1.png', '2_2.png', '2_3.png',]
    },
    {
        maxW: 300,
        scale: 2.5,
        urls: ['3_1.png', '3_2.png', '3_3.png',]
    },
]
interface WindowProps { url: string, maxW: number, scale: number }
interface CalculatorProps {
    windowProps: WindowProps
}
export const CalculatorPage = () => {
    const [windowProps, setWindowProps] = useState<WindowProps>({
        url: variants[0].urls[0], maxW: variants[0].maxW, scale: variants[0].scale
    })
    const selectVariant = (props: WindowProps) => {
        setWindowProps(props)
    }
    return <Stack pt={40} p={{ base: 10, md: 0 }}>
        <Title ta={'center'} c={'primary'} fz={{ base: 25, lg: 32 }} fw={'bold'}>ОНЛАЙН КАЛЬКУЛЯТОР</Title>

        <SimpleGrid cols={{ base: 1, md: 2 }} maw={1400} mx={'auto'} >
            <TypeSelector flex={1} wProps={windowProps} selectVariant={selectVariant} />
            <Form flex={1} windowProps={windowProps} />
        </SimpleGrid>

    </Stack>
}
interface TypeSelectorProps extends StackProps {
    wProps: WindowProps,
    selectVariant: (props: WindowProps) => void
}
const TypeSelector = ({ wProps, selectVariant, ...props }: TypeSelectorProps) => {
    return <Stack gap={30} {...props} >
        <Title order={4} c={'primary'}>Тип окна:</Title>
        <Group wrap="nowrap" px={20} py={10} bg={'slate.2'} >
            {variants.map(v =>
                <Variant wProps={wProps} selectVariant={selectVariant} scale={v.scale} maxW={v.maxW} urls={v.urls} />
            )}
        </Group>
        <Image src={'/calculator/' + wProps.url} fit="contain" mah={358} />
    </Stack>

}
const Variant = ({ wProps, urls, maxW, scale, selectVariant }: { urls: string[], maxW: number, scale: number } & TypeSelectorProps) => {
    const [hovered, setHovered] = useState(false)
    const selectedVariant = urls.includes(wProps.url) ? wProps.url : urls[0]
    const onSelect = (props: WindowProps) => {
        selectVariant(props)
        setHovered(false)
    }
    const show = () => {
        setHovered(true)
        setTimeout(() => setHovered(false), 5000)
    }
    return <Box p={3} pos={'relative'}><Image opacity={hovered ? 0 : 1} onMouseEnter={show} mah={79} src={'/calculator/' + selectedVariant} />
        {maxW == wProps.maxW && !hovered && <Box style={{ pointerEvents: 'none', border: '2px solid red' }} pos={'absolute'} inset={0} opacity={.4} />}
        {hovered && <Stack bg={'primary'} p={4} pos={'absolute'} top={0} onMouseLeave={() => setHovered(false)}>
            {urls.map(u =>
                <Image onClick={() => onSelect({ url: u, maxW, scale })} src={'/calculator/' + u} />
            )}
        </Stack>}
    </Box>
}
const Form = ({ windowProps, ...props }: CalculatorProps & StackProps) => {
    const [width, setWidth] = useInputState<string | number>('')
    const [height, setHeight] = useInputState<string | number>('')
    return <form>
        <Stack {...props}>
            <Text c="primary" fz={18} fw={'bold'}>Размеры окна:</Text>
            <Group grow>
                <Stack gap={5}>
                    <Text c={'secondary'}>Ширина</Text>
                    <NumberInput defaultValue={0} max={windowProps.maxW} value={width} onChange={setWidth} suffix=" CM" />
                </Stack>
                <Stack gap={5}>
                    <Text c={'secondary'}>Высота</Text>
                    <NumberInput defaultValue={0} max={220} value={height} onChange={setHeight} suffix=" CM" />
                </Stack>
            </Group>
            <Divider />
            <Group align="start" justify="space-evenly" h={'100%'}>
                <Stack >
                    <Text fz={20} c={'primary'}>Итоговая стоимость:</Text>
                    <Center p={5} bg={'secondary'} style={{ border: '2px solid var(--mantine-color-primary)}', borderRadius: 10 }}>
                        <Text fw={'bold'} c={'primary'} fz={32}>{Math.floor(+width * +height * windowProps.scale)}</Text>
                    </Center>
                </Stack>
                <Stack fz={18} c={'secondary'}>
                    окно в комплекте <br /> панельный дом:<br />
                    Откос<br />
                    Подоконник<br />
                    Слив<br />
                    Москитная сетка<br />
                </Stack>
            </Group>
            <Divider />
            <CreateApplication>Заказать</CreateApplication>
        </Stack>
    </form>
}
