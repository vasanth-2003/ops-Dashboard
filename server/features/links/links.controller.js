import { Link } from './links.model.js'
import {
  validateCreateLink,
  normalizeShortCode,
  isValidShortCode,
} from './links.validation.js'

export async function redirectLink(req, res) {
  const shortCode = normalizeShortCode(req.params.shortCode)

  // Invalid codes can't exist in the DB, so answer 404 without querying at all.
  if (!isValidShortCode(shortCode)) {
    return res.status(404).json({ error: 'Link not found' })
  }

  // One atomic find-and-increment; no read-then-write window where concurrent clicks are lost.
  const link = await Link.findOneAndUpdate(
    { shortCode },
    { $inc: { clickCount: 1 } },
    { new: true },
  )
  if (!link) {
    return res.status(404).json({ error: 'Link not found' })
  }

  res.redirect(302, link.destinationUrl)
}

export async function listLinks(req, res) {
  const links = await Link.find().sort({ createdAt: -1 })
  res.json(links)
}

export async function createLink(req, res) {
  const { value, errors } = validateCreateLink(req.body)
  if (errors) {
    return res.status(400).json({ error: 'Validation failed', details: errors })
  }

  try {
    const link = await Link.create(value)
    return res.status(201).json(link)
  } catch (err) {
    // 11000 is MongoDB's duplicate-key code, raised by the unique index on shortCode.
    if (err.code === 11000) {
      return res.status(409).json({
        error: 'Validation failed',
        details: { shortCode: 'shortCode is already in use' },
      })
    }
    throw err
  }
}
