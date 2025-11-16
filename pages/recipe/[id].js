import Link from 'next/link'
import { useRouter } from 'next/router'
import useDarkMode from '../../hooks/useDarkMode'
import DarkModeToggle from '../../components/DarkModeToggle'

export async function getServerSideProps({ params }) {
  // Import only in server-side function
  const { readDB } = require('../../lib/db')
  const db = await readDB()
  const recipe = db.recipes.find(r => r.id === params.id) || null
  if (!recipe) return { notFound: true }
  return { props: { recipe } }
}

export default function RecipePage({ recipe, t }) {
  const { locale } = useRouter()
  const [isDark, toggleDarkMode, mounted] = useDarkMode()

  return (
    <div className="recipe-container">
      <header className="recipe-header">
        <div className="recipe-title-section">
          <h1 className="recipe-title">{recipe.title[locale] || recipe.title['es']}</h1>
          <p className="recipe-subtitle">{t?.siteTitle || 'Recetas Saludables'}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <DarkModeToggle isDark={isDark} toggle={toggleDarkMode} mounted={mounted} />
          <Link href="/" className="back-link">
            <span className="back-arrow">←</span> Volver
          </Link>
        </div>
      </header>

      <main className="recipe-main">
        <div className="recipe-image-wrapper">
          <img
            src={recipe.photo || '/placeholder.png'}
            alt={recipe.title[locale] || recipe.title['es']}
            className="recipe-image"
          />
        </div>

        <section className="recipe-content">
          <div className="ingredients-section">
            <h3 className="section-title">
              <span className="icon">🥗</span>
              {t?.ingredients || 'Ingredientes'}
            </h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="ingredient-item">
                  <span className="ingredient-amount">{ing.amount}</span>
                  <span className="ingredient-name">{ing.name[locale] || ing.name['es']}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h3 className="section-title">
              <span className="icon">👨‍🍳</span>
              {t?.instructions || 'Instrucciones'}
            </h3>
            <p className="instructions-text">{recipe.instructions[locale] || recipe.instructions['es']}</p>
          </div>
        </section>
      </main>
    </div>
  )
}
