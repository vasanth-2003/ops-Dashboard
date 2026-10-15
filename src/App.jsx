import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './layout/AppShell.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import LinksPage from './features/links/LinksPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<ComingSoon title="Overview" />} />
        <Route path="links" element={<LinksPage />} />
        <Route path="research" element={<ComingSoon title="Research board" />} />
        <Route path="content" element={<ComingSoon title="Content calendar" />} />
        <Route path="payouts" element={<ComingSoon title="Payouts" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
