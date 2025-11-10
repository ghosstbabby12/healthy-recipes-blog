const fs = require('fs').promises
const path = require('path')

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    return { recipes: [] }
  }
}

async function writeDB(data) {
  // write atomically
  const tmp = DB_PATH + '.tmp'
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8')
  await fs.rename(tmp, DB_PATH)
}

// Keep CommonJS exports to be compatible with Next.js API files
module.exports = { readDB, writeDB }
