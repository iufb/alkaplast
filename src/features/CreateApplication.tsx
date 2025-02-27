import { rCreateApplication } from "@/shared/api/applications";
import { useM } from "@/shared/hooks";
import { Button, Input, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { FormEvent, ReactNode } from "react";
import { IMaskInput } from 'react-imask';

export const CreateApplication = ({ children }: { children: ReactNode }) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Оставить заявку">
                <Form />
            </Modal>

            <Button onClick={open}>
                {children}
            </Button>
        </>
    )
}

const Form = () => {
    const [tel, setTel] = useInputState('')
    const [address, setAddress] = useInputState('')
    const { mutate, isLoading, isError } = useM({ mKey: 'CreateApplication', fn: rCreateApplication })
    const submit = (e: FormEvent) => {
        e.preventDefault()
        mutate({ phone: tel, address })
    }
    return <form onSubmit={submit}>
        <Stack>
            <Input component={IMaskInput} mask={"+7 (999) 999 99 99"} label="Телефон" value={tel} onChange={setTel} />
            <TextInput label="Адрес" value={address} onChange={setAddress} />
            {isError && <Text c={'red'}>Произошла ошибка при создании заявки</Text>}
            <Button type="submit" loading={isLoading} disabled={isLoading}>Отправить</Button>
        </Stack>
    </form>
}
