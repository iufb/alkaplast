import { rRegister } from "@/shared/api/auth"
import { Button, Image, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { FormEvent } from "react"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router"
export const RegisterPage = () => {
    return <Stack mx={'auto'} maw={600} align="center" justify="center" w={'100%'} h={'100svh'}>
        <Image src={'/Logo.png'} w='auto' mah={60} />
        <Title ta={'center'} c={'primary'} order={3}>Создайте аккаунт, чтобы оформить заказ и получать скидки на установку окон.</Title>
        <Form />

    </Stack>
}

const Form = () => {
    const [username, setLogin] = useInputState<string>('')
    const [pass, setPass] = useInputState<string>('')
    const navigate = useNavigate()
    const { mutate, isError, isLoading } = useMutation({
        mutationKey: ['register'],
        mutationFn: rRegister,
        onSuccess: (data) => {
            notifications.show({
                title: 'Успешная регистрация',
                message: 'Войдите, чтобы продолжить',
                color: 'green'
            })
            navigate('/login')
        },
        onError: (error) => {
            notifications.show({
                title: 'Ошибка',
                message: 'Произошла ошибка при регистрации',
                color: 'red'
            })

        },

    });
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        mutate({ username, password: pass })
    }
    return <form onSubmit={onSubmit} style={{ width: '100%', padding: 10 }}>
        <Stack w={'100%'}>
            <TextInput required value={username} onChange={setLogin} c={'primary'} label='Логин' />
            <PasswordInput value={pass} onChange={setPass} required c={'primary'} label='Пароль' />
            <Text ta={'start'} c={'secondary'}>Есть аккаунт? <Text ml={9} c={'primary'} fw={'bold'} to={'/login'} component={Link}>Войти</Text></Text>
            {isError && <Text c={'red'}>Произошла ошибка при регистрации</Text>}
            <Button disabled={isLoading} loading={isLoading} type="submit">Регистрация</Button>
        </Stack>
    </form>
}
