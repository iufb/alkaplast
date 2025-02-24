import { ReactNode } from "react"
import { Navigate } from "react-router"

export const Protected = ({ children }: { children: ReactNode }) => {
    const access = localStorage.getItem('access')
    if (!access) {
        return <Navigate to={'/home'} replace />
    }
    return children
}
