/**
 * Dashboard page component - main hub for football management
 * Enhanced modern design with advanced features and comprehensive functionality
 */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Navigation items
const navItems = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'squad', label: 'Squad', icon: '👥' },
  { id: 'tactics', label: 'Tactics', icon: '🎯' },
  { id: 'competitions', label: 'Competitions', icon: '🏆' },
  { id: 'fixtures', label: 'Fixtures', icon: '📅' },
  { id: 'youth', label: 'Youth Teams', icon: '🌱' },
  { id: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'transfers', label: 'Transfers', icon: '🔄' },
  { id: 'statistics', label: 'Statistics', icon: '📈' }
]

// Enhanced mock data for dashboard
const mockClubData = {
  name: 'FC London',
  league: 'Premier League',
  position: 5,
  points: 42,
  played: 24,
  won: 12,
  drawn: 6,
  lost: 6,
  goalsFor: 38,
  goalsAgainst: 25,
  form: ['W', 'D', 'L', 'W', 'W'],
  nextMatch: {
    opponent: 'Tottenham Hotspur',
    date: 'Sunday, 15:00 CET',
    competition: 'Premier League',
    home: true
  }
}

const mockFinancialData = {
  balance: 25000000,
  revenue: 8500000,
  expenses: 6200000,
  transferBudget: 15000000,
  wageBudget: 8000000,
  weeklyRevenue: 185000,
  weeklyExpenses: 142000
}

const mockSquadData = {
  total: 25,
  outfield: 20,
  goalkeepers: 3,
  youth: 2,
  averageAge: 26.4,
  averageRating: 7.2,
  injured: 2,
  suspended: 1
}

const mockTransferActivity = [
  { player: 'James Rodriguez', type: 'IN', fee: '£12.5M', from: 'Real Madrid', date: '2 days ago' },
  { player: 'Marcus Rashford', type: 'OUT', fee: '£8.2M', to: 'Manchester United', date: '1 week ago' },
  { player: 'Erling Haaland', type: 'IN', fee: '£15.0M', from: 'Borussia Dortmund', date: '2 weeks ago' }
]

const mockTrainingSchedule = [
  { day: 'Monday', focus: 'Fitness Training', intensity: 'High', duration: '2 hours' },
  { day: 'Tuesday', focus: 'Tactical Drills', intensity: 'Medium', duration: '1.5 hours' },
  { day: 'Wednesday', focus: 'Match Preparation', intensity: 'High', duration: '2 hours' },
  { day: 'Thursday', focus: 'Recovery', intensity: 'Low', duration: '1 hour' }
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleNavClick = (id: string) => {
    setActiveNav(id)
    // In a real app, this would navigate to different pages or sections
    console.log(`Navigating to: ${id}`)
  }

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-500'
      case 'D': return 'bg-yellow-500'
      case 'L': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getFormLabel = (result: string) => {
    switch (result) {
      case 'W': return 'Win'
      case 'D': return 'Draw'
      case 'L': return 'Loss'
      default: return result
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Enhanced Sidebar */}
      <div className={cn(
        "bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 shadow-2xl",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        {/* Club Header */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center font-bold text-white shadow-lg">
              FC
            </div>
            {isSidebarOpen && (
              <div>
                <h2 className="font-bold text-lg">{mockClubData.name}</h2>
                <p className="text-blue-200 text-sm">{mockClubData.league}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                    activeNav === item.id 
                      ? "bg-white/20 text-white shadow-lg" 
                      : "text-blue-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  )}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle button */}
        <div className="lg:hidden absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back, Manager! Here's your club overview</p>
              </div>
            </div>

            {/* Enhanced Profile Section */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">John Manager</p>
                <p className="text-sm text-gray-600">Season 2024/2025</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center font-bold text-white cursor-pointer hover:ring-4 hover:ring-blue-300 transition-all shadow-lg">
                FC
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-2">Welcome to {mockClubData.name}</h2>
                <p className="text-xl text-blue-100 mb-4">
                  Currently {mockClubData.position}th in {mockClubData.league} with {mockClubData.points} points
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-200">Recent Form:</span>
                    <div className="flex gap-1">
                      {mockClubData.form.map((result, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${getFormColor(result)}`}
                          title={getFormLabel(result)}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-200 mb-2">Next Match</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold text-lg">{mockClubData.nextMatch.opponent}</div>
                  <div className="text-sm text-blue-100">{mockClubData.nextMatch.date}</div>
                  <div className="text-xs text-blue-200 mt-1">{mockClubData.nextMatch.competition}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* League Position */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">League Position</h3>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  🏆
                </div>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-1">#{mockClubData.position}</div>
              <p className="text-gray-600">{mockClubData.league}</p>
              <div className="mt-3 text-sm text-gray-500">
                {mockClubData.played} games played
              </div>
            </div>

            {/* Points */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Points</h3>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  🎯
                </div>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-1">{mockClubData.points}</div>
              <p className="text-gray-600">from {mockClubData.played} games</p>
              <div className="mt-3 text-sm text-gray-500">
                {mockClubData.won}W {mockClubData.drawn}D {mockClubData.lost}L
              </div>
            </div>

            {/* Squad Size */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Squad Size</h3>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  👥
                </div>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-1">{mockSquadData.total}</div>
              <p className="text-gray-600">{mockSquadData.outfield} outfield, {mockSquadData.goalkeepers} GK</p>
              <div className="mt-3 text-sm text-gray-500">
                Avg Age: {mockSquadData.averageAge} • Avg Rating: {mockSquadData.averageRating}
              </div>
            </div>

            {/* Transfer Budget */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Transfer Budget</h3>
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  💰
                </div>
              </div>
              <div className="text-4xl font-bold text-yellow-600 mb-1">
                £{(mockFinancialData.transferBudget / 1000000).toFixed(1)}M
              </div>
              <p className="text-gray-600">Available funds</p>
              <div className="mt-3 text-sm text-gray-500">
                Wage Budget: £{(mockFinancialData.wageBudget / 1000000).toFixed(1)}M
              </div>
            </div>
          </div>

          {/* Enhanced Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Results */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                📊 Recent Results
              </h3>
              <div className="space-y-3">
                {[
                  { opponent: 'Manchester United', result: 'W', score: '2-1', date: '2 days ago', competition: 'Premier League' },
                  { opponent: 'Liverpool', result: 'D', score: '1-1', date: '5 days ago', competition: 'Premier League' },
                  { opponent: 'Arsenal', result: 'L', score: '0-2', date: '8 days ago', competition: 'Premier League' },
                  { opponent: 'Chelsea', result: 'W', score: '3-0', date: '12 days ago', competition: 'Premier League' }
                ].map((match, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${getFormColor(match.result)}`}>
                        {match.result}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{match.opponent}</p>
                        <p className="text-xs text-gray-500">{match.competition}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{match.score}</p>
                      <p className="text-xs text-gray-500">{match.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Overview */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                💰 Financial Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Current Balance</span>
                  <span className="font-semibold text-green-600">
                    £{(mockFinancialData.balance / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-semibold text-blue-600">
                    £{(mockFinancialData.revenue / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Expenses</span>
                  <span className="font-semibold text-red-600">
                    £{(mockFinancialData.expenses / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Weekly Revenue</span>
                  <span className="font-semibold text-green-600">
                    £{(mockFinancialData.weeklyRevenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Weekly Expenses</span>
                  <span className="font-semibold text-red-600">
                    £{(mockFinancialData.weeklyExpenses / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            </div>

            {/* Transfer Activity */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🔄 Transfer Activity
              </h3>
              <div className="space-y-3">
                {mockTransferActivity.map((transfer, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        transfer.type === 'IN' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {transfer.type}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transfer.player}</p>
                        <p className="text-xs text-gray-500">
                          {transfer.type === 'IN' ? `From ${transfer.from}` : `To ${transfer.to}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{transfer.fee}</p>
                      <p className="text-xs text-gray-500">{transfer.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🏃 Training Schedule
              </h3>
              <div className="space-y-3">
                {mockTrainingSchedule.map((session, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">{session.day.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{session.day}</p>
                        <p className="text-sm text-gray-600">{session.focus}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{session.duration}</p>
                      <p className={`text-xs font-medium ${
                        session.intensity === 'High' ? 'text-red-600' :
                        session.intensity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {session.intensity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Squad Status */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                👥 Squad Status
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{mockSquadData.total - mockSquadData.injured - mockSquadData.suspended}</div>
                  <div className="text-sm text-green-700">Available</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">{mockSquadData.injured}</div>
                  <div className="text-sm text-red-700">Injured</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{mockSquadData.suspended}</div>
                  <div className="text-sm text-yellow-700">Suspended</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{mockSquadData.youth}</div>
                  <div className="text-sm text-purple-700">Youth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:shadow-md transition-all"
                onClick={() => handleNavClick('squad')}
              >
                <span className="text-2xl">👥</span>
                <span className="text-sm font-medium">Manage Squad</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-green-200 text-green-700 hover:bg-green-50 hover:shadow-md transition-all"
                onClick={() => handleNavClick('tactics')}
              >
                <span className="text-2xl">🎯</span>
                <span className="text-sm font-medium">Set Tactics</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:shadow-md transition-all"
                onClick={() => handleNavClick('transfers')}
              >
                <span className="text-2xl">🔄</span>
                <span className="text-sm font-medium">Transfer Market</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 hover:shadow-md transition-all"
                onClick={() => handleNavClick('finance')}
              >
                <span className="text-2xl">💰</span>
                <span className="text-sm font-medium">View Finances</span>
              </Button>
            </div>
          </div>
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <p>© 2024 Football Manager Pro. All rights reserved.</p>
              <p className="text-xs text-gray-500 mt-1">Version 2.4.1 | Last updated: Today</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>Next match:</span>
                <span className="font-medium text-gray-900">vs {mockClubData.nextMatch.opponent}</span>
                <span className="text-gray-500">{mockClubData.nextMatch.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-600 font-medium">System Online</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
