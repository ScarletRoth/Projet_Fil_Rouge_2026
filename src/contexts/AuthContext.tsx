import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { AuthUser, getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authService'

type AuthContextValue = {
  currentUser: AuthUser | null
  login: (email: string, password: string) => { success: boolean; message: string }
  register: (email: string, name: string, password: string) => { success: boolean; message: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => getCurrentUser())

  const login = (email: string, password: string) => {
    const result = loginUser(email, password)
    if (result.success && result.user) {
      setCurrentUser(result.user)
    }
    return { success: result.success, message: result.message }
  }

  const register = (email: string, name: string, password: string) => {
    const result = registerUser(email, name, password)
    if (result.success && result.user) {
      setCurrentUser(result.user)
    }
    return { success: result.success, message: result.message }
  }

  const logout = () => {
    logoutUser()
    setCurrentUser(null)
  }

  const value = useMemo(
    () => ({ currentUser, login, register, logout }),
    [currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
