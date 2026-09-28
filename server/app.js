import express from 'express'
import linksRouter, { redirectRouter } from './features/links/links.routes.js'

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/links', linksRouter)
app.use('/r', redirectRouter)

// Express's default handler leaks stack traces outside production, so respond generically.
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Malformed JSON body' })
  }
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

export default app
