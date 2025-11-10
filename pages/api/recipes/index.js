const { readDB, writeDB } = require('../../../lib/db')

export default async function handler(req, res) {
  const { method } = req
  const db = await readDB()

  if (method === 'GET') {
    return res.status(200).json(db)
  }

  if (method === 'POST') {
    const recipe = req.body
    db.recipes.push(recipe)
    await writeDB(db)
    return res.status(201).json(db)
  }

  if (method === 'PUT') {
    const recipe = req.body
    const idx = db.recipes.findIndex(r => r.id === recipe.id)
    if (idx !== -1) db.recipes[idx] = recipe
    else db.recipes.push(recipe)
    await writeDB(db)
    return res.status(200).json(db)
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
