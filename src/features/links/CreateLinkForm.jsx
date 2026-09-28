import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLink } from '../../lib/api.js'

const emptyForm = { destinationUrl: '', shortCode: '', product: '' }

function CreateLinkForm() {
  const [form, setForm] = useState(emptyForm)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      setForm(emptyForm)
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const payload = {
      destinationUrl: form.destinationUrl,
      shortCode: form.shortCode,
    }
    if (form.product.trim() !== '') {
      payload.product = form.product
    }
    mutation.mutate(payload)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 sm:max-w-md sm:p-6"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="shortCode" className="text-sm font-medium text-slate-700">
          Short code
        </label>
        <input
          id="shortCode"
          name="shortCode"
          type="text"
          value={form.shortCode}
          onChange={handleChange}
          required
          className="rounded border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="destinationUrl" className="text-sm font-medium text-slate-700">
          Destination URL
        </label>
        <input
          id="destinationUrl"
          name="destinationUrl"
          type="text"
          value={form.destinationUrl}
          onChange={handleChange}
          required
          className="rounded border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product" className="text-sm font-medium text-slate-700">
          Product (optional)
        </label>
        <input
          id="product"
          name="product"
          type="text"
          value={form.product}
          onChange={handleChange}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="rounded bg-slate-800 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {mutation.isPending ? 'Creating…' : 'Create link'}
      </button>

      {mutation.isError && (
        <p className="text-sm text-red-600">{mutation.error.message}</p>
      )}
    </form>
  )
}

export default CreateLinkForm
