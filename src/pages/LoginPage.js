import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function LoginPage() {
    const { currentUser, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    if (currentUser) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const result = login(email, password);
        if (!result.success) {
            setError(result.message);
            return;
        }
        navigate('/');
    };
    return (_jsx("main", { className: "auth-page", children: _jsxs("section", { className: "auth-card", children: [_jsx("h1", { children: "Connexion" }), _jsx("p", { children: "Connectez-vous pour acc\u00E9der \u00E0 votre compte." }), error && _jsx("div", { className: "auth-error", children: error }), _jsxs("form", { onSubmit: handleSubmit, className: "auth-form", children: [_jsxs("label", { children: ["E-mail", _jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true, autoComplete: "username" })] }), _jsxs("label", { children: ["Mot de passe", _jsx("input", { type: "password", value: password, onChange: (event) => setPassword(event.target.value), required: true, autoComplete: "current-password" })] }), _jsx("button", { type: "submit", className: "auth-submit", children: "Se connecter" })] }), _jsxs("p", { className: "auth-footer", children: ["Pas encore de compte ? ", _jsx(Link, { to: "/signup", children: "Inscrivez-vous" })] })] }) }));
}
