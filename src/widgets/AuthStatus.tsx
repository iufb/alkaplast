import { useAuth } from "@/shared/context/auth"
import { Button } from "@mantine/core"
import { ChevronRight, User } from "lucide-react"
import { Link } from "react-router"

export const AuthStatus = () => {
    const { isLogged: status } = useAuth()
    return <Button to={status ? '/profile' : "/login"} component={Link} rightSection={!status && <ChevronRight />} >{status ? <User size={18} /> : "Войти"}</Button>
}
