import { Button, Image, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { Link } from "react-router"

export const LoginPage = () => {
    return <Stack mx={'auto'} maw={600} align="center" justify="center" w={'100%'} h={'100svh'}>
        <Image src={'/Logo.png'} w='auto' mah={60} />
        <Title c={'primary'} order={3}>Добро пожаловать в AlkaPlast!</Title>
        <Form />

    </Stack>
}


const Form = () => {
    return <form style={{ width: '100%', padding: 10 }}>
        <Stack w={'100%'}>
            <TextInput c={'primary'} label='Логин' />
            <PasswordInput c={'primary'} label='Пароль' />
            <Text ta={'start'} c={'secondary'}>Нет аккаунта? <Text ml={9} c={'primary'} fw={'bold'} to={'/register'} component={Link}>Создать аккаунт</Text></Text>
            <Button>Войти</Button>
        </Stack>
    </form>
}
