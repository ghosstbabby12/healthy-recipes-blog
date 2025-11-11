import Link from 'next/link'
import { useRouter } from 'next/router'

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

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>{recipe.title[locale] || recipe.title['es']}</h1>
          <p style={{ color: '#666' }}>{t.siteTitle}</p>
        </div>
        <div>
          <Link href="/">← Volver</Link>
        </div>
      </header>

      <main style={{ marginTop: 16 }}>
        <img src={recipe.photo || '/placeholder.png'} alt="photo" style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 6 }} />

        <section style={{ display: 'flex', gap: 24, marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <h3>{t.ingredients}</h3>
            <ul>
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing.amount} — {ing.name[locale] || ing.name['es']}</li>
              ))}
            </ul>
          </div>

          <div style={{ flex: 2 }}>
            <h3>{t.instructions}</h3>
            <p>{recipe.instructions[locale] || recipe.instructions['es']}</p>
          </div>
        </section>
      </main>
    </div>
  )
}
