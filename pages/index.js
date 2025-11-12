import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Home({ t }) {
  const router = useRouter()
  const { locale, query } = router
  const { data } = useSWR('/api/recipes', fetcher, { refreshInterval: 1000 })
  const allRecipes = data?.recipes || []

  // Por ahora, mostrar todas las recetas independientemente del filtro
  // Aquí podrías agregar lógica específica de filtrado más adelante
  const recipes = allRecipes

  // Obtener título de la sección según el filtro
  const getSectionTitle = () => {
    switch (query.filter) {
      case 'popular': return 'Lo más buscado'
      case 'new': return 'Novedades'
      case 'cooking': return 'Cocinar'
      case 'tools': return 'Utensilios'
      default: return 'Recetas destacadas'
    }
  }

  return (
    <div className="site-container">
      <header className="site-header">
        <div className="topbar">
          <div className="social">🍏🥗</div>
          <div className="lang">
            <Link href="/" locale="es">ES</Link>
            {' | '}
            <Link href="/" locale="en">EN</Link>
          </div>
        </div>
        <div className="brand">
          <h1>{t.siteTitle}</h1>
          <p className="subtitle">Recetas saludables, fáciles y deliciosas</p>
        </div>
        <nav className="main-nav">
          <Link href="/?filter=popular" className={query.filter === 'popular' ? 'active' : ''}>
            Lo más buscado
          </Link>
          <Link href="/?filter=new" className={query.filter === 'new' ? 'active' : ''}>
            Novedades
          </Link>
          <Link href="/?filter=cooking" className={query.filter === 'cooking' ? 'active' : ''}>
            Cocinar
          </Link>
          <Link href="/?filter=tools" className={query.filter === 'tools' ? 'active' : ''}>
            Utensilios
          </Link>
        </nav>
      </header>

      <main className="content">
        <section className="hero">
          <div className="hero-inner">
            <h2>{getSectionTitle()}</h2>
            <p>Platos balanceados y sabrosos para tu día a día</p>
          </div>
        </section>

        <section className="grid">
          {recipes.map((r, index) => (
            <article key={r.id} className="card" style={{ animationDelay: `${index * 0.1}s` }}>
              <Link href={`/recipe/${r.id}`}>
                <div className="card-img" style={{ backgroundImage: `url(${r.photo || '/placeholder.png'})` }}>
                  <div className="card-overlay">
                    <span className="view-recipe">Ver receta →</span>
                  </div>
                  <span className="card-badge">Saludable</span>
                </div>
                <div className="card-body">
                  <h3>{r.title[locale] || r.title['es']}</h3>
                  <p className="excerpt">{(r.instructions[locale] || r.instructions['es']).slice(0, 100)}...</p>
                  <div className="card-meta">
                    <span className="meta-item">⏱️ 30 min</span>
                    <span className="meta-item">🍽️ 4 porciones</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">🍏 {t.siteTitle}</h4>
            <p className="footer-desc">Recetas saludables para una vida mejor</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Navegación</h4>
            <ul className="footer-links">
              <li><Link href="/?filter=popular">Lo más buscado</Link></li>
              <li><Link href="/?filter=new">Novedades</Link></li>
              <li><Link href="/?filter=cooking">Cocinar</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Síguenos</h4>
            <div className="social-links">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📸</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">📌</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {t.siteTitle}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
