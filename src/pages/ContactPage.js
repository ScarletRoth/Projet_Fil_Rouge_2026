import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createTicket } from '../services/ticketService';
import './ContactPage.css';
const CATEGORIES = [
    { value: 'general', label: 'Question générale' },
    { value: 'technical', label: 'Problème technique' },
    { value: 'account', label: 'Problème de compte' },
    { value: 'property', label: 'Question sur un bien' },
    { value: 'billing', label: 'Facturation' },
    { value: 'other', label: 'Autre' }
];
const PRIORITIES = [
    { value: 'low', label: 'Faible', color: 'var(--color-success)' },
    { value: 'medium', label: 'Moyenne', color: 'var(--color-warning)' },
    { value: 'high', label: 'Élevée', color: 'var(--color-error)' },
    { value: 'urgent', label: 'Urgente', color: '#dc2626' }
];
export default function ContactPage() {
    const { currentUser } = useAuth();
    const [form, setForm] = useState({
        subject: '',
        category: '',
        priority: 'medium',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [ticketId, setTicketId] = useState('');
    const handleInputChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.subject.trim() || !form.category || !form.description.trim()) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        setIsSubmitting(true);
        try {
            const ticketData = {
                subject: form.subject.trim(),
                category: form.category,
                priority: form.priority,
                description: form.description.trim(),
                userId: currentUser?.email,
                userName: currentUser?.name,
                userEmail: currentUser?.email
            };
            const ticket = await createTicket(ticketData);
            setTicketId(ticket.id);
            setSubmitted(true);
            setForm({
                subject: '',
                category: '',
                priority: 'medium',
                description: ''
            });
        }
        catch (error) {
            alert('Erreur lors de l\'envoi du ticket. Veuillez réessayer.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (submitted) {
        return (_jsx("div", { className: "contact-page", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "success-message", children: [_jsx("div", { className: "success-icon" }), _jsx("h1", { children: "Ticket envoy\u00E9 avec succ\u00E8s !" }), _jsx("p", { children: "Votre demande a \u00E9t\u00E9 enregistr\u00E9e sous le num\u00E9ro :" }), _jsx("div", { className: "ticket-id", children: ticketId }), _jsx("p", { className: "success-note", children: "Vous recevrez une r\u00E9ponse par email dans les plus brefs d\u00E9lais. Notre \u00E9quipe traite g\u00E9n\u00E9ralement les demandes sous 24-48h." }), _jsx("button", { className: "btn-primary", onClick: () => setSubmitted(false), children: "Cr\u00E9er un nouveau ticket" })] }) }) }));
    }
    return (_jsx("div", { className: "contact-page", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "contact-header", children: [_jsx("h1", { children: "Contactez-nous" }), _jsx("p", { children: "Besoin d'aide ? Notre \u00E9quipe est l\u00E0 pour vous accompagner. Cr\u00E9ez un ticket et nous vous r\u00E9pondrons rapidement." })] }), _jsxs("div", { className: "contact-content", children: [_jsxs("div", { className: "contact-info", children: [_jsxs("div", { className: "info-card", children: [_jsx("div", { className: "info-icon" }), _jsx("h3", { children: "Email" }), _jsx("p", { children: "support@ymmo.fr" })] }), _jsxs("div", { className: "info-card", children: [_jsx("div", { className: "info-icon" }), _jsx("h3", { children: "T\u00E9l\u00E9phone" }), _jsx("p", { children: "01 23 45 67 89" }), _jsx("small", { children: "Lun-Ven 9h-18h" })] }), _jsxs("div", { className: "info-card", children: [_jsx("div", { className: "info-icon" }), _jsx("h3", { children: "Adresse" }), _jsxs("p", { children: ["123 Rue de l'Immobilier", _jsx("br", {}), "75001 Paris"] })] })] }), _jsxs("div", { className: "ticket-form-container", children: [_jsxs("div", { className: "form-header", children: [_jsx("h2", { children: "Cr\u00E9er un ticket" }), _jsx("p", { children: "Remplissez ce formulaire pour nous contacter" })] }), _jsxs("form", { className: "ticket-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { htmlFor: "subject", children: ["Sujet ", _jsx("span", { className: "required", children: "*" })] }), _jsx("input", { type: "text", id: "subject", value: form.subject, onChange: (e) => handleInputChange('subject', e.target.value), placeholder: "R\u00E9sumez bri\u00E8vement votre demande", required: true })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { htmlFor: "category", children: ["Cat\u00E9gorie ", _jsx("span", { className: "required", children: "*" })] }), _jsxs("select", { id: "category", value: form.category, onChange: (e) => handleInputChange('category', e.target.value), required: true, children: [_jsx("option", { value: "", children: "S\u00E9lectionnez une cat\u00E9gorie" }), CATEGORIES.map(cat => (_jsx("option", { value: cat.value, children: cat.label }, cat.value)))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "priority", children: "Priorit\u00E9" }), _jsx("select", { id: "priority", value: form.priority, onChange: (e) => handleInputChange('priority', e.target.value), children: PRIORITIES.map(prio => (_jsx("option", { value: prio.value, children: prio.label }, prio.value))) })] })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { htmlFor: "description", children: ["Description ", _jsx("span", { className: "required", children: "*" })] }), _jsx("textarea", { id: "description", value: form.description, onChange: (e) => handleInputChange('description', e.target.value), placeholder: "D\u00E9crivez votre probl\u00E8me ou votre question en d\u00E9tail...", rows: 6, required: true })] }), currentUser && (_jsxs("div", { className: "user-info", children: [_jsxs("p", { children: [_jsx("strong", { children: "Utilisateur :" }), " ", currentUser.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Email :" }), " ", currentUser.email] })] })), _jsx("button", { type: "submit", className: "btn-submit", disabled: isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "spinner" }), "Envoi en cours..."] })) : ('Envoyer le ticket') })] })] })] })] }) }));
}
