import { queryClient } from "@/main";
import { rCreateProduct, rGetProducts, rPatchProduct } from "@/shared/api/products";
import { ImageFallback, ProductCategory } from "@/shared/consts";
import { Button, FileInput, Flex, Group, Image, Modal, NumberInput, Paper, Popover, Select, Skeleton, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { FormEvent, ReactNode, useState } from "react";
import { useMutation, useQuery } from "react-query";

export const ProductsPage = () => {
    return (
        <Flex direction={"column"} gap={20}>
            <CreateProduct>Добавить продукт</CreateProduct>
            <ProductList />

        </Flex>
    );
};

const CreateProduct = ({ children }: { children: ReactNode }) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Создать продукт">
                <Form />
            </Modal>
            <Button onClick={open}>
                {children}
            </Button>
        </>
    )
}

const Form = () => {
    const [name, setName] = useInputState('')
    const [desc, setDesc] = useInputState('')
    const [photo, setPhoto] = useState<File | null>(null)
    const [pass, setPass] = useInputState('')
    const [category, setCategory] = useInputState(ProductCategory[0])
    const [res, setRes] = useState('')
    const { mutate, isLoading, isError } = useMutation({
        mutationKey: ['CreateProduct'], mutationFn: rCreateProduct,
        onSuccess: () => {
            setRes("Продукт создан")
            queryClient.invalidateQueries({ queryKey: ['productlist'] })
        }
    })
    const submit = (e: FormEvent) => {
        e.preventDefault()
        mutate({ name, description: desc, image: photo, category })
    }
    return <form onSubmit={submit}>
        <Stack>
            <TextInput label="Название" value={name} onChange={setName} />
            <Textarea minRows={3} label="Описание" value={desc} onChange={setDesc} />
            <FileInput label="Фото" value={photo} onChange={setPhoto} />
            <Select label={'Категория'} data={ProductCategory} value={category} onChange={setCategory} />
            {isError && <Text c={'red'}>Произошла ошибка при создании продукта</Text>}
            {res && <Text c={'green'}>{res}</Text>}
            <Button type="submit" loading={isLoading} disabled={isLoading}>Добавить</Button>
        </Stack>
    </form>
}
const ProductList = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['productlist'],
        queryFn: async () => {
            const data = await rGetProducts();
            return data
        },
        onSuccess: (data) => {
            // Handle success
        },
        onError: (error) => {
            // Handle error
        },

    });
    return <Stack>
        <Title order={3} c={'primary'}>Продукты</Title>
        {isLoading ? <Skeleton h={206} /> : (!data && isError) ? <Text>Ошибка загрузки...</Text> : <Stack>
            {data.map((p: any) => <Paper shadow="md" p={10}>
                <Group><Image fallbackSrc={ImageFallback} w={250} src={import.meta.env.VITE_BACKENDURL + '/media/' + p.image} />
                    <Stack>
                        <Text>Категория: {p.category}</Text>
                        <Text>Название: {p.name}</Text>
                        <Text>Описание: {p.description}</Text>
                        <ProductRemains count={p.count} id={p.id} />
                    </Stack>
                </Group>
            </Paper>)}
        </Stack>}
    </Stack>
}
const ProductRemains = ({ count, id }: { count: number, id: number }) => {

    return <Group align="center">
        <Group ta={'center'}>На складе осталось -- <Text bg={'primary'} component="span" fw={'bold'} c={'white'} px={10} py={4}>{count}</Text><ChangeCountPopover count={count} id={id} /></Group>
    </Group>
}

const ChangeCountPopover = ({ count, id }: { count: number, id: number }) => {
    const [opened, setOpened] = useState(false);
    const [newCount, setNewCount] = useInputState<number | string>(count)
    const { mutate, isLoading, isError } = useMutation({
        mutationFn: rPatchProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['productlist'] })
            setOpened(false)
        },
        onError: (error) => {
            // Handle error
        },

    });
    const onSubmit = () => {
        mutate({ count: +newCount, id })
    }
    return (
        <Popover opened={opened} onChange={setOpened}>
            <Popover.Target>
                <Button onClick={() => setOpened((o) => !o)}>
                    Изменить
                </Button>
            </Popover.Target>

            <Popover.Dropdown>
                <Stack>
                    <NumberInput label={'Количество'} value={newCount} onChange={setNewCount} />
                    {isError && <Text c={'red'}>Ошибка при измении продукта.</Text>}
                    <Button disabled={isLoading || count == newCount} loading={isLoading} onClick={onSubmit}>Изменить</Button>
                </Stack>
            </Popover.Dropdown>
        </Popover>
    );
}
