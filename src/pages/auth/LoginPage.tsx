import { rLogin } from "@/shared/api/auth"
import { useAuth } from "@/shared/context/auth"
import { useM } from "@/shared/hooks"
import { Button, Image, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { FormEvent } from "react"
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
    const { mutate, isLoading, isError } = useM({
        fn: rLogin, mKey: 'login', onSuccess: (data) => {
            localStorage.setItem('access', data.access)
            localStorage.setItem('role', data.role)
            login(data.access)
            navigate('/home')
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
