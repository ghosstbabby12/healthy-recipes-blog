import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Home({ t }) {
  const { locale } = useRouter()
  const { data } = useSWR('/api/recipes', fetcher, { refreshInterval: 1000 })
  const recipes = data?.recipes || []

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
          <a href="#">Lo más buscado</a>
          <a href="#">Novedades</a>
          <a href="#">Cocinar</a>
          <a href="#">Utensilios</a>
        </nav>
      </header>

      <main className="content">
        <section className="hero">
          <div className="hero-inner">
            <h2>Recetas destacadas</h2>
            <p>Platos balanceados y sabrosos para tu día a día</p>
          </div>
        </section>

        <section className="grid">
          {recipes.map(r => (
            <article key={r.id} className="card">
              <Link href={`/recipe/${r.id}`}>
                <div className="card-img" style={{ backgroundImage: `url(${r.photo || '/placeholder.png'})` }} />
                <div className="card-body">
                  <h3>{r.title[locale] || r.title['es']}</h3>
                  <p className="excerpt">{(r.instructions[locale] || r.instructions['es']).slice(0, 100)}...</p>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <div>© {new Date().getFullYear()} {t.siteTitle}</div>
      </footer>
    </div>
  )
}
