export const SHORT_CODE_PATTERN = /^[a-z0-9-]+$/
export const SHORT_CODE_MIN = 3
export const SHORT_CODE_MAX = 40
export const URL_MAX = 2048
export const PRODUCT_MAX = 100

const ALLOWED_FIELDS = ['shortCode', 'destinationUrl', 'product']

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function normalizeShortCode(value) {
  return value.trim().toLowerCase()
}

// Expects an already-normalized value; the pattern is lowercase-only on purpose.
export function isValidShortCode(value) {
  return (
    typeof value === 'string' &&
    value.length >= SHORT_CODE_MIN &&
    value.length <= SHORT_CODE_MAX &&
    SHORT_CODE_PATTERN.test(value)
  )
}

export function isValidDestinationUrl(value) {
  if (typeof value !== 'string' || value.length > URL_MAX) return false
  let url
  try {
    url = new URL(value)
  } catch {
    return false
  }
  // Only http(s): blocks javascript:, data:, file: etc. from ever being redirect targets.
  return url.protocol === 'http:' || url.protocol === 'https:'
}

// Returns { value } on success or { errors } on failure. Never throws on bad input.
export function validateCreateLink(payload) {
  if (!isPlainObject(payload)) {
    return { errors: { body: 'Request body must be a JSON object' } }
  }

  const errors = {}

  for (const key of Object.keys(payload)) {
    if (!ALLOWED_FIELDS.includes(key)) {
      errors[key] = 'Unexpected field'
    }
  }

  // Type-check before trimming so objects like { "$ne": "" } are rejected, not coerced.
  const { shortCode, destinationUrl, product } = payload

  if (typeof shortCode !== 'string') {
    errors.shortCode = 'shortCode is required and must be a string'
  } else if (!isValidShortCode(normalizeShortCode(shortCode))) {
    errors.shortCode = `shortCode must be ${SHORT_CODE_MIN}-${SHORT_CODE_MAX} characters: letters, numbers, hyphens (case-insensitive, stored lowercase)`
  }

  if (typeof destinationUrl !== 'string') {
    errors.destinationUrl = 'destinationUrl is required and must be a string'
  } else if (!isValidDestinationUrl(destinationUrl.trim())) {
    errors.destinationUrl = 'destinationUrl must be an absolute http or https URL'
  }

  if (product !== undefined) {
    if (typeof product !== 'string') {
      errors.product = 'product must be a string'
    } else if (product.trim().length > PRODUCT_MAX) {
      errors.product = `product must be at most ${PRODUCT_MAX} characters`
    }
  }

  if (Object.keys(errors).length > 0) return { errors }

  const value = {
    shortCode: normalizeShortCode(shortCode),
    destinationUrl: destinationUrl.trim(),
  }
  if (product !== undefined && product.trim() !== '') {
    value.product = product.trim()
  }
  return { value }
}
