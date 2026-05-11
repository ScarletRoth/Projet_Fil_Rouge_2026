import { FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { currentUser, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = login(email, password)
    if (!result.success) {
      setError(result.message)
      return
    }

    navigate('/')
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Connexion</h1>
        <p>Connectez-vous pour accéder à votre compte.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
            />
          </label>

          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          <button type="submit" className="auth-submit">
            Se connecter
          </button>
        </form>

        <p className="auth-footer">
          Pas encore de compte ? <Link to="/signup">Inscrivez-vous</Link>
        </p>
      </section>
    </main>
  )
}
