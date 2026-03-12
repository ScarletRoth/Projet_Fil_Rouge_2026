import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {}
        <Link to="/" className="logo">
          <div className="logo-icon"></div>
          <h1>Ymmo</h1>
        </Link>

        {}
        <nav className="nav">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/sale" className="nav-link">À Vendre</Link>
          <Link to="/rent" className="nav-link">À Louer</Link>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {}
        <div className="auth-buttons">
          <button className="btn-login">Connexion</button>
          <button className="btn-signup">Inscription</button>
        </div>
      </div>
    </header>
  )
}
