import { queryClient } from "@/main";
import { rCreateWorker } from "@/shared/api/auth";
import { WorkerRoles } from "@/shared/consts";
import { Button, FileInput, Modal, Select, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { FormEvent, ReactNode, useState } from "react";
import { useMutation } from "react-query";

export const CreateWorker = ({ children }: { children: ReactNode }) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Создать работника">
                <Form />
            </Modal>
            <Button onClick={open}>
                {children}
            </Button>
        </>
    )
}

const Form = () => {
    const [username, setUsername] = useInputState('')
    const [fio, setFio] = useInputState('')
    const [photo, setPhoto] = useState<File | null>(null)
    const [pass, setPass] = useInputState('')
    const [role, setRole] = useInputState('Менеджер')
    const { mutate, isLoading, isError } = useMutation({
        mutationKey: ['CreateWorker'],
        mutationFn: rCreateWorker,
        onSuccess: () => {
            notifications.show({
                title: 'Успешно',
                message: 'Работник успешно создан',
                color: 'green'
            });
            queryClient.invalidateQueries({ queryKey: ['workerlist'] });
        },
        onError: (error) => {
            notifications.show({
                title: 'Ошибка',
                message: 'Произошла ошибка при создании работника',
                color: 'red'
            });
        },
    }); const submit = (e: FormEvent) => {
        e.preventDefault()
        mutate({ username, fio, photo, password: pass, role: role == WorkerRoles[0] ? 'manager' : 'master' })
    }
    return <form onSubmit={submit}>
        <Stack>
            <TextInput label="Логин" value={username} onChange={setUsername} />
            <TextInput label="Пароль" value={pass} onChange={setPass} />
            <TextInput label="ФИО" value={fio} onChange={setFio} />
            <FileInput label="Фото" value={photo} onChange={setPhoto} />
            <Select data={WorkerRoles} value={role} onChange={setRole} />
            {isError && <Text c={'red'}>Произошла ошибка при создании работника</Text>}
            <Button type="submit" loading={isLoading} disabled={isLoading}>Добавить</Button>
        </Stack>
    </form>
}
