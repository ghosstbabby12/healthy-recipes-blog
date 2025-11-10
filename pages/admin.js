import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Admin({ t }) {
  const [recipes, setRecipes] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetch('/api/recipes').then(r => r.json()).then(data => setRecipes(data.recipes || []))
  }, [])

  async function saveRecipe(e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const id = editing?.id || uuidv4()
    const title = { es: formData.get('title_es'), en: formData.get('title_en') }
    const instructions = { es: formData.get('inst_es'), en: formData.get('inst_en') }
    const ingredientsRaw = formData.get('ingredients') || ''
    const ingredients = ingredientsRaw.split('\n').map(line => {
      const [amount, es, en] = line.split('|').map(s => s?.trim())
      return { amount: amount || '', name: { es: es || '', en: en || '' } }
    })

    const recipe = { id, title, instructions, ingredients, photo: '/placeholder.png' }

    const method = editing ? 'PUT' : 'POST'
    const res = await fetch('/api/recipes', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(recipe) })
    const data = await res.json()
    setRecipes(data.recipes || [])
    setEditing(null)
    form.reset()
  }

  async function remove(id) {
    const res = await fetch('/api/recipes/' + id, { method: 'DELETE' })
    const data = await res.json()
    setRecipes(data.recipes || [])
  }

  function startEdit(r) {
    setEditing(r)
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>{t.adminPanel}</h1>
      <section>
        <h2>{t.addRecipe}</h2>
        <form onSubmit={saveRecipe}>
          <div>
            <label>Title (ES)</label>
            <input name="title_es" defaultValue={editing?.title?.es || ''} />
          </div>
          <div>
            <label>Title (EN)</label>
            <input name="title_en" defaultValue={editing?.title?.en || ''} />
          </div>
          <div>
            <label>Instructions (ES)</label>
            <textarea name="inst_es" defaultValue={editing?.instructions?.es || ''} />
          </div>
          <div>
            <label>Instructions (EN)</label>
            <textarea name="inst_en" defaultValue={editing?.instructions?.en || ''} />
          </div>
          <div>
            <label>Ingredients (one per line, format: amount | name_es | name_en)</label>
            <textarea name="ingredients" defaultValue={editing?.ingredients?.map(i => `${i.amount} | ${i.name.es} | ${i.name.en}`).join('\n') || ''} />
          </div>
          <button type="submit">{t.save}</button>
        </form>
      </section>

      <section>
        <h2>Recipes</h2>
        <ul>
          {recipes.map(r => (
            <li key={r.id} style={{ marginBottom: 8 }}>
              <strong>{r.title?.es}</strong>
              <button onClick={() => startEdit(r)}>{t.edit}</button>
              <button onClick={() => remove(r.id)}>{t.delete}</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
