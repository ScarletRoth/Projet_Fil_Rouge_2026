import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';
export default function Header() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (_jsx("header", { className: "header", children: _jsxs("div", { className: "header-container", children: [_jsxs(Link, { to: "/", className: "logo", children: [_jsx("div", { className: "logo-icon" }), _jsx("h1", { children: "Ymmo" })] }), _jsxs("nav", { className: "nav", children: [_jsx(Link, { to: "/", className: "nav-link", children: "Accueil" }), _jsx(Link, { to: "/sale", className: "nav-link", children: "\u00C0 Vendre" }), _jsx(Link, { to: "/rent", className: "nav-link", children: "\u00C0 Louer" }), _jsx("a", { href: "#contact", className: "nav-link", children: "Contact" })] }), _jsx("div", { className: "auth-buttons", children: currentUser ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "user-label", children: ["Bonjour, ", currentUser.name] }), _jsx("button", { type: "button", className: "btn-logout", onClick: handleLogout, children: "D\u00E9connexion" })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: "btn-login", children: "Connexion" }), _jsx(Link, { to: "/signup", className: "btn-signup", children: "Inscription" })] })) })] }) }));
}
