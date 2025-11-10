const { readDB, writeDB } = require('../../../lib/db')

export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query
  const db = await readDB()

  if (method === 'GET') {
    const r = db.recipes.find(x => x.id === id)
    if (!r) return res.status(404).json({ message: 'Not found' })
    return res.status(200).json(r)
  }

  if (method === 'DELETE') {
    db.recipes = db.recipes.filter(x => x.id !== id)
    await writeDB(db)
    return res.status(200).json(db)
  }

  res.setHeader('Allow', ['GET', 'DELETE'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
