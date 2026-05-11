import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function SignupPage() {
    const { currentUser, register } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    if (currentUser) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }
        const result = register(email, name, password);
        if (!result.success) {
            setError(result.message);
            return;
        }
        navigate('/');
    };
    return (_jsx("main", { className: "auth-page", children: _jsxs("section", { className: "auth-card", children: [_jsx("h1", { children: "Inscription" }), _jsx("p", { children: "Cr\u00E9ez un compte pour enregistrer vos recherches." }), error && _jsx("div", { className: "auth-error", children: error }), _jsxs("form", { onSubmit: handleSubmit, className: "auth-form", children: [_jsxs("label", { children: ["Nom", _jsx("input", { type: "text", value: name, onChange: (event) => setName(event.target.value), required: true, autoComplete: "name" })] }), _jsxs("label", { children: ["E-mail", _jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true, autoComplete: "email" })] }), _jsxs("label", { children: ["Mot de passe", _jsx("input", { type: "password", value: password, onChange: (event) => setPassword(event.target.value), required: true, autoComplete: "new-password" })] }), _jsxs("label", { children: ["Confirmer le mot de passe", _jsx("input", { type: "password", value: confirmPassword, onChange: (event) => setConfirmPassword(event.target.value), required: true, autoComplete: "new-password" })] }), _jsx("button", { type: "submit", className: "auth-submit", children: "S'inscrire" })] }), _jsxs("p", { className: "auth-footer", children: ["D\u00E9j\u00E0 inscrit ? ", _jsx(Link, { to: "/login", children: "Connectez-vous" })] })] }) }));
}
