import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Home({ t }) {
  const { locale } = useRouter()
  const { data } = useSWR('/api/recipes', fetcher, { refreshInterval: 1000 })

  const recipes = data?.recipes || []

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{t.siteTitle}</h1>
        <div>
          <Link href="/admin">{t.adminPanel}</Link>
        </div>
      </header>

      <main>
        {recipes.map(r => (
          <article key={r.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
            <h2>{r.title[locale] || r.title['es']}</h2>
            <img src={r.photo || '/placeholder.png'} alt="photo" style={{ maxWidth: 200 }} />
            <h4>{t.ingredients}</h4>
            <ul>
              {r.ingredients.map((ing, i) => (
                <li key={i}>{ing.amount} — {ing.name[locale] || ing.name['es']}</li>
              ))}
            </ul>
            <h4>{t.instructions}</h4>
            <p>{r.instructions[locale] || r.instructions['es']}</p>
          </article>
        ))}
      </main>
    </div>
  )
}
