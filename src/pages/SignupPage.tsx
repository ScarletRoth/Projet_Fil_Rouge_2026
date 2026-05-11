import { FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function SignupPage() {
  const { currentUser, register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    const result = register(email, name, password)
    if (!result.success) {
      setError(result.message)
      return
    }

    navigate('/')
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Inscription</h1>
        <p>Créez un compte pour enregistrer vos recherches.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Nom
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoComplete="name"
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="new-password"
            />
          </label>

          <label>
            Confirmer le mot de passe
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              autoComplete="new-password"
            />
          </label>

          <button type="submit" className="auth-submit">
            S'inscrire
          </button>
        </form>

        <p className="auth-footer">
          Déjà inscrit ? <Link to="/login">Connectez-vous</Link>
        </p>
      </section>
    </main>
  )
}
