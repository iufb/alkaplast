import { useAuth } from "@/shared/context/auth"
import { Button, Stack } from "@mantine/core"
import { useNavigate } from "react-router"

export const ProfilePage = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/home')
    }
    return <Stack p={10}>
        <Button onClick={handleLogout}>Выйти</Button>
    </Stack>
}
