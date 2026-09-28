import LinksList from './features/links/LinksList.jsx'
import CreateLinkForm from './features/links/CreateLinkForm.jsx'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
        Link Tracking
      </h1>
      <CreateLinkForm />
      <LinksList />
    </div>
  )
}

export default App
