import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import RegisterPage from './pages/Register'
import CreateClubPage from './pages/CreateClub'
import DashboardPage from './pages/Dashboard'
import SquadPage from './pages/Squad'
import TacticsPage from './pages/Tactics'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-club" element={<CreateClubPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/squad" element={<SquadPage />} />
        <Route path="/tactics" element={<TacticsPage />} />
      </Routes>
    </HashRouter>
  )
}
