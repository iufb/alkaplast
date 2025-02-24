import { rRegister } from "@/shared/api/auth"
import { useM } from "@/shared/hooks"
import { Button, Image, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { FormEvent } from "react"
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
    const { mutate, isLoading, isError } = useM({
        fn: rRegister, mKey: 'register', onSuccess: () => {
            navigate('/login')
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
            <Text ta={'start'} c={'secondary'}>Есть аккаунт? <Text ml={9} c={'primary'} fw={'bold'} to={'/login'} component={Link}>Войти</Text></Text>
            {isError && <Text c={'red'}>Произошла ошибка при регистрации</Text>}
            <Button disabled={isLoading} loading={isLoading} type="submit">Регистрация</Button>
        </Stack>
    </form>
}
