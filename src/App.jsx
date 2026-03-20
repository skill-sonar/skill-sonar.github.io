import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import SkillSonarPage from './pages/SkillSonar'
import ScannerPage from './pages/Scanner'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/skill-sonar" replace />} />
        <Route path="/skill-sonar" element={<SkillSonarPage />} />
        <Route path="/pre-install" element={<Navigate to="/skill-sonar" replace />} />
        <Route path="/guard-pipeline" element={<Navigate to="/skill-sonar" replace />} />
        <Route path="/scanner" element={<ScannerPage />} />
      </Routes>
    </BrowserRouter>
  )
}
