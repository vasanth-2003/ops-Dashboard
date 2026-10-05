import { useState } from 'react'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { getLinks, deleteLink } from '../../lib/api.js'

const LIMIT = 10

function formatCreatedAt(isoUtcString) {
  return new Date(isoUtcString).toLocaleString()
}

function LinksList() {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['links', { page, limit: LIMIT }],
    queryFn: () => getLinks({ page, limit: LIMIT }),
    placeholderData: keepPreviousData,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  if (isLoading) {
    return <p className="p-4 text-sm text-slate-600 sm:p-6">Loading links…</p>
  }

  if (isError) {
    return (
      <p className="p-4 text-sm text-red-600 sm:p-6">
        Failed to load links: {error.message}
      </p>
    )
  }

  const links = data.links
  const { totalPages } = data.pagination

  if (links.length === 0) {
    return <p className="p-4 text-sm text-slate-600 sm:p-6">No links yet.</p>
  }

  return (
    <div className="overflow-x-auto p-4 sm:p-6">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-3 py-2 font-semibold text-slate-700">
              Short code
            </th>
            <th className="whitespace-nowrap px-3 py-2 font-semibold text-slate-700">
              Destination URL
            </th>
            <th className="whitespace-nowrap px-3 py-2 font-semibold text-slate-700">
              Product
            </th>
            <th className="whitespace-nowrap px-3 py-2 font-semibold text-slate-700">
              Clicks
            </th>
            <th className="whitespace-nowrap px-3 py-2 font-semibold text-slate-700">
              Created
            </th>
            <th className="whitespace-nowrap px-3 py-2 font-semibold text-slate-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {links.map((link) => (
            <tr key={link._id}>
              <td className="whitespace-nowrap px-3 py-2">{link.shortCode}</td>
              <td className="max-w-xs truncate px-3 py-2">{link.destinationUrl}</td>
              <td className="whitespace-nowrap px-3 py-2">{link.product || '—'}</td>
              <td className="whitespace-nowrap px-3 py-2">{link.clickCount}</td>
              <td className="whitespace-nowrap px-3 py-2">{formatCreatedAt(link.createdAt)}</td>
              <td className="whitespace-nowrap px-3 py-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete link "${link.shortCode}"?`)) {
                      deleteMutation.mutate(link._id)
                    }
                  }}
                  disabled={deleteMutation.isPending && deleteMutation.variables === link._id}
                  className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-40"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteMutation.isError && (
        <p className="mt-2 text-sm text-red-600">
          Failed to delete link: {deleteMutation.error.message}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="rounded bg-slate-800 px-3 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm text-slate-600">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
          className="rounded bg-slate-800 px-3 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default LinksList
