import { rLogin } from "@/shared/api/auth"
import { useAuth } from "@/shared/context/auth"
import { Button, Image, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { FormEvent } from "react"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router"

export const LoginPage = () => {
    return <Stack mx={'auto'} maw={600} align="center" justify="center" w={'100%'} h={'100svh'}>
        <Image src={'/Logo.png'} w='auto' mah={60} />
        <Title c={'primary'} order={3}>Добро пожаловать в AlkaPlast!</Title>
        <Form />

    </Stack>
}


const Form = () => {
    const { login } = useAuth()
    const [username, setLogin] = useInputState<string>('')
    const [pass, setPass] = useInputState<string>('')
    const navigate = useNavigate()
    const { mutate, isLoading, isError } = useMutation({
        mutationFn: rLogin, mutationKey: ['login'], onSuccess: (data) => {
            localStorage.setItem('access', data.access)
            localStorage.setItem('role', data.role)
            localStorage.setItem('username', data.username)
            login(data.access)
            notifications.show({
                title: 'Успешный вход',
                message: 'Вы вошли в аккаунт',
                color: 'green'
            })

            if (data.role == 'User') {
                navigate('/home')
                return;
            }
            navigate(`/${data.role}`)
        }, onError: () => {
            notifications.show({
                title: 'Ошибка',
                message: 'Ошибка при входе',
                color: 'red'
            })

        }
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        mutate({ username, password: pass })
    }

    return <form onSubmit={onSubmit} style={{ width: '100%', padding: 10 }}>
        <Stack w={'100%'}>
            <TextInput required value={username} onChange={setLogin} c={'primary'} label='Логин' />
            <PasswordInput value={pass} onChange={setPass} required c={'primary'} label='Пароль' />
            <Text ta={'start'} c={'secondary'}>Нет аккаунта? <Text ml={9} c={'primary'} fw={'bold'} to={'/register'} component={Link}>Создать аккаунт</Text></Text>
            {isError && <Text c={'red'}>Произошла ошибка при входе</Text>}
            <Button type="submit" loading={isLoading} disabled={isLoading}>Войти</Button>
        </Stack>
    </form>
}
