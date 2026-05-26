import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { createTicket, CreateTicketData } from '../services/ticketService'
import './ContactPage.css'

interface TicketForm {
  subject: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: string
}

const CATEGORIES = [
  { value: 'general', label: 'Question générale' },
  { value: 'technical', label: 'Problème technique' },
  { value: 'account', label: 'Problème de compte' },
  { value: 'property', label: 'Question sur un bien' },
  { value: 'billing', label: 'Facturation' },
  { value: 'other', label: 'Autre' }
]

const PRIORITIES = [
  { value: 'low', label: 'Faible', color: 'var(--color-success)' },
  { value: 'medium', label: 'Moyenne', color: 'var(--color-warning)' },
  { value: 'high', label: 'Élevée', color: 'var(--color-error)' },
  { value: 'urgent', label: 'Urgente', color: '#dc2626' }
]

export default function ContactPage() {
  const { currentUser } = useAuth()
  const [form, setForm] = useState<TicketForm>({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState<string>('')

  const handleInputChange = (field: keyof TicketForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.subject.trim() || !form.category || !form.description.trim()) {
      alert('Veuillez remplir tous les champs obligatoires.')
      return
    }

    setIsSubmitting(true)

    try {
      const ticketData: CreateTicketData = {
        subject: form.subject.trim(),
        category: form.category,
        priority: form.priority,
        description: form.description.trim(),
        userId: currentUser?.email,
        userName: currentUser?.name,
        userEmail: currentUser?.email
      }

      const ticket = await createTicket(ticketData)
      setTicketId(ticket.id)
      setSubmitted(true)

      setForm({
        subject: '',
        category: '',
        priority: 'medium',
        description: ''
      })

    } catch (error) {
      alert('Erreur lors de l\'envoi du ticket. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="success-message">
            <div className="success-icon"></div>
            <h1>Ticket envoyé avec succès !</h1>
            <p>Votre demande a été enregistrée sous le numéro :</p>
            <div className="ticket-id">{ticketId}</div>
            <p className="success-note">
              Vous recevrez une réponse par email dans les plus brefs délais.
              Notre équipe traite généralement les demandes sous 24-48h.
            </p>
            <button
              className="btn-primary"
              onClick={() => setSubmitted(false)}
            >
              Créer un nouveau ticket
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contactez-nous</h1>
          <p>
            Besoin d'aide ? Notre équipe est là pour vous accompagner.
            Créez un ticket et nous vous répondrons rapidement.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon"></div>
              <h3>Email</h3>
              <p>support@ymmo.fr</p>
            </div>

            <div className="info-card">
              <div className="info-icon"></div>
              <h3>Téléphone</h3>
              <p>01 23 45 67 89</p>
              <small>Lun-Ven 9h-18h</small>
            </div>

            <div className="info-card">
              <div className="info-icon"></div>
              <h3>Adresse</h3>
              <p>123 Rue de l'Immobilier<br />75001 Paris</p>
            </div>
          </div>

          <div className="ticket-form-container">
            <div className="form-header">
              <h2>Créer un ticket</h2>
              <p>Remplissez ce formulaire pour nous contacter</p>
            </div>

            <form className="ticket-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="subject">
                  Sujet <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  value={form.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Résumez brièvement votre demande"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">
                    Catégorie <span className="required">*</span>
                  </label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priorité</label>
                  <select
                    id="priority"
                    value={form.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                  >
                    {PRIORITIES.map(prio => (
                      <option key={prio.value} value={prio.value}>
                        {prio.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Décrivez votre problème ou votre question en détail..."
                  rows={6}
                  required
                />
              </div>

              {currentUser && (
                <div className="user-info">
                  <p><strong>Utilisateur :</strong> {currentUser.name}</p>
                  <p><strong>Email :</strong> {currentUser.email}</p>
                </div>
              )}

              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer le ticket'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}