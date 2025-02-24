import { AuthStatus } from "@/widgets";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthStatus {
    isLogged: boolean,
    role: string | null,
    logout: () => void
    login: (role: string) => void
}
const AuthContext = createContext<AuthStatus | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState({ isLogged: !!localStorage.getItem('access'), role: localStorage.getItem('role') })
    const login = (role: string) => {
        setValue({ isLogged: true, role: role })
    }
    const logout = () => {
        setValue({ isLogged: false, role: null })
        localStorage.removeItem('access')
        localStorage.removeItem('role')
    }
    return <AuthContext.Provider value={{ ...value, logout, login }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
