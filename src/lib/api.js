async function request(path, options) {
  const res = await fetch(path, options)

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const message = body?.error || `Request failed with status ${res.status}`
    const error = new Error(message)
    error.status = res.status
    error.details = body?.details
    throw error
  }

  return res.json()
}

export function getLinks() {
  return request('/api/links')
}

export function createLink(payload) {
  return request('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
