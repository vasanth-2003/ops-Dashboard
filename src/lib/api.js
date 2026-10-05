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

  if (res.status === 204) return null
  return res.json()
}

export function getLinks({ page = 1, limit = 10 } = {}) {
  return request(`/api/links?page=${page}&limit=${limit}`)
}

export function createLink(payload) {
  return request('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export function deleteLink(id) {
  return request(`/api/links/${id}`, { method: 'DELETE' })
}
