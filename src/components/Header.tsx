import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

export default function Header() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon"></div>
          <h1>Ymmo</h1>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/sale" className="nav-link">À Vendre</Link>
          <Link to="/rent" className="nav-link">À Louer</Link>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <div className="auth-buttons">
          {currentUser ? (
            <>
              <span className="user-label">Bonjour, {currentUser.name}</span>
              <button type="button" className="btn-logout" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                Connexion
              </Link>
              <Link to="/signup" className="btn-signup">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
