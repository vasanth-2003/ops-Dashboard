import { useQuery } from '@tanstack/react-query'
import { getLinks } from '../../lib/api.js'

function formatCreatedAt(isoUtcString) {
  return new Date(isoUtcString).toLocaleString()
}

function LinksList() {
  const {
    data: links,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LinksList
