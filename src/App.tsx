import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import ListingPage from './pages/ListingPage'
import MapPage from './pages/MapPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ContactPage from './pages/ContactPage'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rent" element={<ListingPage purpose="rent" />} />
            <Route path="/sale" element={<ListingPage purpose="sale" />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenue chez Ymmo</h1>
          <p>Trouvez votre prochain bien immobilier</p>
        </div>
      </section>

      <section className="quick-access">
        <div className="container">
          <h2>Que cherchez-vous?</h2>
          <div className="access-grid">
            <Link to="/rent" className="access-card">
              <div className="card-icon"></div>
              <h3>À Louer</h3>
              <p>Explorez nos annonces de location</p>
              <span className="arrow">→</span>
            </Link>

            <Link to="/sale" className="access-card">
              <div className="card-icon"></div>
              <h3>À Vendre</h3>
              <p>Découvrez nos propriétés à vendre</p>
              <span className="arrow">→</span>
            </Link>

            <Link to="/map" className="access-card">
              <div className="card-icon"></div>
              <h3>Carte</h3>
              <p>Visualisez les biens sur la carte</p>
              <span className="arrow">→</span>
            </Link>

            <Link to="/contact" className="access-card">
              <div className="card-icon"></div>
              <h3>Support</h3>
              <p>Contactez notre équipe</p>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Pourquoi Ymmo?</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">✓</span>
              <h3>Filtres Avancés</h3>
              <p>Affinez votre recherche avec des critères détaillés</p>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <h3>Visualisation Cartographique</h3>
              <p>Localisez les biens sur une carte interactive</p>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <h3>Avis & Commentaires</h3>
              <p>Lisez les retours des autres utilisateurs</p>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <h3>Système de Tickets</h3>
              <p>Contactez-nous facilement via notre système de support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
