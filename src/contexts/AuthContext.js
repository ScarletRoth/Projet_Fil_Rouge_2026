import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useState } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authService';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
    const login = (email, password) => {
        const result = loginUser(email, password);
        if (result.success && result.user) {
            setCurrentUser(result.user);
        }
        return { success: result.success, message: result.message };
    };
    const register = (email, name, password) => {
        const result = registerUser(email, name, password);
        if (result.success && result.user) {
            setCurrentUser(result.user);
        }
        return { success: result.success, message: result.message };
    };
    const logout = () => {
        logoutUser();
        setCurrentUser(null);
    };
    const value = useMemo(() => ({ currentUser, login, register, logout }), [currentUser]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
