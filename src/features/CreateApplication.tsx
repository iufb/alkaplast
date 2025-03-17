import { rCreateApplication } from "@/shared/api/applications";
import { useM } from "@/shared/hooks";
import { Button, Input, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { FormEvent, ReactNode } from "react";
import { IMaskInput } from 'react-imask';
interface CreateApplicationProps {
    children: ReactNode,
    width: number,
    height: number,
    window_type: number;
    window_image: string;
    disabled?: boolean;
}
export const CreateApplication = ({ children, width, height, window_type, window_image, disabled }: CreateApplicationProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal opened={opened} onClose={close} title="Оставить заявку">
                <Form {...{ width, height, window_type, window_image }} />
            </Modal>
            <Button disabled={disabled} onClick={open}>
                {children}
            </Button>
        </>
    )
}

const Form = ({ width, height, window_type, window_image }: Omit<CreateApplicationProps, 'children'>) => {
    const [tel, setTel] = useInputState('')
    const [address, setAddress] = useInputState('')
    const { mutate, isLoading, isError } = useM({
        mKey: 'CreateApplication', fn: rCreateApplication, onSuccess: () => {
            notifications.show({
                title: 'Создана',
                message: 'Ваша заявка создана.',
                color: 'green'
            })

        }, onError: () => {
            notifications.show({
                title: 'Ошибка',
                message: 'Ваша заявка не создана.',
                color: 'red'
            })

        }
    })
    const submit = (e: FormEvent) => {
        e.preventDefault()
        mutate({ phone: tel, address, width, height, window_type, window_image })
    }
    return <form onSubmit={submit}>
        <Stack>
            <Input
                component={IMaskInput}
                mask="+7 (000) 000-00-00"
                placeholder="Телефон"
                value={tel}
                onAccept={(value) => setTel(value)}
            />
            <TextInput label="Адрес" value={address} onChange={setAddress} />
            {isError && <Text c={'red'}>Произошла ошибка при создании заявки</Text>}
            <Button type="submit" loading={isLoading} disabled={isLoading}>Отправить</Button>
        </Stack>
    </form>
}
