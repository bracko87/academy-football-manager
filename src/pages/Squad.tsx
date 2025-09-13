/**
 * Squad Management page component - comprehensive player management system
 * Enhanced modern design with advanced features and detailed player information
 */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

// Player positions
const positions = [
  'GK', 'RB', 'CB', 'LB', 'RWB', 'LWB', 'CDM', 'CM', 'CAM', 'RM', 'LM', 'RW', 'LW', 'CF', 'ST'
]

// Player data structure
interface Player {
  id: number
  name: string
  age: number
  position: string
  overall: number
  potential: number
  value: number
  wage: number
  contract: string
  status: 'available' | 'injured' | 'suspended' | 'loaned'
  form: number
  fitness: number
  morale: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  nationality: string
  preferredFoot: 'left' | 'right' | 'both'
}

// Mock squad data
const mockSquad: Player[] = [
  {
    id: 1,
    name: 'James Rodriguez',
    age: 28,
    position: 'CAM',
    overall: 85,
    potential: 88,
    value: 45000000,
    wage: 180000,
    contract: '2027-06-30',
    status: 'available',
    form: 8.2,
    fitness: 95,
    morale: 85,
    goals: 12,
    assists: 18,
    yellowCards: 3,
    redCards: 0,
    nationality: 'Colombia',
    preferredFoot: 'left'
  },
  {
    id: 2,
    name: 'Erling Haaland',
    age: 23,
    position: 'ST',
    overall: 89,
    potential: 94,
    value: 120000000,
    wage: 250000,
    contract: '2028-06-30',
    status: 'available',
    form: 9.1,
    fitness: 98,
    morale: 90,
    goals: 28,
    assists: 5,
    yellowCards: 2,
    redCards: 0,
    nationality: 'Norway',
    preferredFoot: 'right'
  },
  {
    id: 3,
    name: 'Virgil van Dijk',
    age: 31,
    position: 'CB',
    overall: 90,
    potential: 91,
    value: 75000000,
    wage: 220000,
    contract: '2026-06-30',
    status: 'injured',
    form: 7.8,
    fitness: 45,
    morale: 70,
    goals: 2,
    assists: 1,
    yellowCards: 4,
    redCards: 0,
    nationality: 'Netherlands',
    preferredFoot: 'right'
  },
  {
    id: 4,
    name: 'Kevin De Bruyne',
    age: 31,
    position: 'CM',
    overall: 91,
    potential: 92,
    value: 85000000,
    wage: 280000,
    contract: '2025-06-30',
    status: 'available',
    form: 8.9,
    fitness: 92,
    morale: 88,
    goals: 8,
    assists: 22,
    yellowCards: 5,
    redCards: 1,
    nationality: 'Belgium',
    preferredFoot: 'right'
  },
  {
    id: 5,
    name: 'Alisson Becker',
    age: 29,
    position: 'GK',
    overall: 89,
    potential: 90,
    value: 65000000,
    wage: 200000,
    contract: '2027-06-30',
    status: 'available',
    form: 8.5,
    fitness: 96,
    morale: 87,
    goals: 0,
    assists: 2,
    yellowCards: 1,
    redCards: 0,
    nationality: 'Brazil',
    preferredFoot: 'right'
  },
  {
    id: 6,
    name: 'Trent Alexander-Arnold',
    age: 24,
    position: 'RB',
    overall: 86,
    potential: 90,
    value: 55000000,
    wage: 160000,
    contract: '2026-06-30',
    status: 'suspended',
    form: 7.9,
    fitness: 100,
    morale: 75,
    goals: 3,
    assists: 15,
    yellowCards: 8,
    redCards: 1,
    nationality: 'England',
    preferredFoot: 'right'
  },
  {
    id: 7,
    name: 'Phil Foden',
    age: 22,
    position: 'LW',
    overall: 84,
    potential: 90,
    value: 48000000,
    wage: 140000,
    contract: '2027-06-30',
    status: 'available',
    form: 8.3,
    fitness: 94,
    morale: 86,
    goals: 15,
    assists: 10,
    yellowCards: 2,
    redCards: 0,
    nationality: 'England',
    preferredFoot: 'left'
  },
  {
    id: 8,
    name: 'Rodri',
    age: 26,
    position: 'CDM',
    overall: 87,
    potential: 89,
    value: 52000000,
    wage: 170000,
    contract: '2027-06-30',
    status: 'available',
    form: 8.4,
    fitness: 97,
    morale: 85,
    goals: 4,
    assists: 6,
    yellowCards: 6,
    redCards: 0,
    nationality: 'Spain',
    preferredFoot: 'right'
  }
]

// Formation templates
const formations = [
  { name: '4-4-2', positions: ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CM', 'LM', 'ST', 'ST'] },
  { name: '4-3-3', positions: ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'CM', 'RW', 'ST', 'LW'] },
  { name: '3-5-2', positions: ['GK', 'CB', 'CB', 'CB', 'RWB', 'CM', 'CM', 'CM', 'LWB', 'ST', 'ST'] },
  { name: '4-2-3-1', positions: ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CDM', 'CAM', 'RW', 'ST', 'LW'] }
]

export default function SquadPage() {
  const navigate = useNavigate()
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [positionFilter, setPositionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('overall')
  const [currentFormation, setCurrentFormation] = useState(formations[0])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Filter and sort players
  const filteredPlayers = mockSquad
    .filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          player.position.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPosition = positionFilter === 'all' || player.position === positionFilter
      const matchesStatus = statusFilter === 'all' || player.status === statusFilter
      return matchesSearch && matchesPosition && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'age': return a.age - b.age
        case 'value': return b.value - a.value
        case 'wage': return b.wage - a.wage
        case 'form': return b.form - a.form
        case 'overall':
        default: return b.overall - a.overall
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100'
      case 'injured': return 'text-red-600 bg-red-100'
      case 'suspended': return 'text-yellow-600 bg-yellow-100'
      case 'loaned': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getOverallColor = (overall: number) => {
    if (overall >= 90) return 'text-purple-600 bg-purple-100'
    if (overall >= 80) return 'text-blue-600 bg-blue-100'
    if (overall >= 70) return 'text-green-600 bg-green-100'
    if (overall >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getPositionColor = (position: string) => {
    const keeperPositions = ['GK']
    const defenderPositions = ['RB', 'CB', 'LB', 'RWB', 'LWB']
    const midfielderPositions = ['CDM', 'CM', 'CAM', 'RM', 'LM']
    const attackerPositions = ['RW', 'LW', 'CF', 'ST']

    if (keeperPositions.includes(position)) return 'text-red-600 bg-red-100'
    if (defenderPositions.includes(position)) return 'text-blue-600 bg-blue-100'
    if (midfielderPositions.includes(position)) return 'text-green-600 bg-green-100'
    if (attackerPositions.includes(position)) return 'text-purple-600 bg-purple-100'
    return 'text-gray-600 bg-gray-100'
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `£${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `£${(amount / 1000).toFixed(0)}K`
    return `£${amount}`
  }

  const getMoraleColor = (morale: number) => {
    if (morale >= 85) return 'text-green-600'
    if (morale >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getFitnessColor = (fitness: number) => {
    if (fitness >= 90) return 'text-green-600'
    if (fitness >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar Navigation */}
      <div className={cn(
        "bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 shadow-2xl",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center font-bold text-white shadow-lg">
              FC
            </div>
            {isSidebarOpen && (
              <div>
                <h2 className="font-bold text-lg">FC London</h2>
                <p className="text-blue-200 text-sm">Premier League</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[
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
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.id === 'overview' ? '/dashboard' : `/${item.id}`)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                    item.id === 'squad' 
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
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
                <h1 className="text-3xl font-bold text-gray-900">Squad Management</h1>
                <p className="text-gray-600">Manage your players and team composition</p>
              </div>
            </div>

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

        {/* Squad Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Squad Overview */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-2">First Team Squad</h2>
                <p className="text-xl text-blue-100 mb-4">
                  {mockSquad.length} players • Average age: {(mockSquad.reduce((sum, p) => sum + p.age, 0) / mockSquad.length).toFixed(1)} • 
                  Average rating: {(mockSquad.reduce((sum, p) => sum + p.overall, 0) / mockSquad.length).toFixed(1)}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-200">Total Value:</span>
                    <span className="text-lg font-semibold">
                      {formatCurrency(mockSquad.reduce((sum, p) => sum + p.value, 0))}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-200">Weekly Wages:</span>
                    <span className="text-lg font-semibold">
                      {formatCurrency(mockSquad.reduce((sum, p) => sum + p.wage, 0))}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-200 mb-2">Current Formation</div>
                <Select value={currentFormation.name} onValueChange={(value) => {
                  const formation = formations.find(f => f.name === value)
                  if (formation) setCurrentFormation(formation)
                }}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white focus:border-blue-400 w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {formations.map((formation) => (
                      <SelectItem key={formation.name} value={formation.name} className="text-white hover:bg-blue-600">
                        {formation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Search Players</Label>
                <Input
                  placeholder="Search by name or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-gray-300 focus:border-blue-400"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Position</Label>
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-400">
                    <SelectValue placeholder="All positions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>{position}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-400">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="injured">Injured</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="loaned">On Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overall">Overall Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="age">Age</SelectItem>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="wage">Wage</SelectItem>
                    <SelectItem value="form">Form</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('')
                    setPositionFilter('all')
                    setStatusFilter('all')
                    setSortBy('overall')
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Players List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900">Players ({filteredPlayers.length})</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {filteredPlayers.map((player) => (
                    <div 
                      key={player.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedPlayer?.id === player.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedPlayer(player)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {player.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{player.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}>
                                {player.position}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                                {player.status}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Age: {player.age}</span>
                              <span>{player.nationality}</span>
                              <span>{player.preferredFoot}-footed</span>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-500">Overall:</span>
                                <span className={`font-semibold ${getOverallColor(player.overall).split(' ')[0]}`}>
                                  {player.overall}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-500">Form:</span>
                                <span className={`font-semibold ${getMoraleColor(player.form)}`}>
                                  {player.form.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-500">Fitness:</span>
                                <span className={`font-semibold ${getFitnessColor(player.fitness)}`}>
                                  {player.fitness}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900 mb-1">
                            {formatCurrency(player.value)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatCurrency(player.wage)}/week
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Contract: {new Date(player.contract).getFullYear()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Player Stats */}
                      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">⚽</span>
                          <span className="font-medium">{player.goals}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">🎯</span>
                          <span className="font-medium">{player.assists}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">🟨</span>
                          <span className="font-medium">{player.yellowCards}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">🟥</span>
                          <span className="font-medium">{player.redCards}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Player Details */}
            <div className="lg:col-span-1">
              {selectedPlayer ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Player Details</h3>
                  
                  {/* Player Header */}
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto mb-4">
                      {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{selectedPlayer.name}</h4>
                    <p className="text-gray-600">{selectedPlayer.position} • Age {selectedPlayer.age}</p>
                  </div>

                  {/* Key Stats */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overall Rating</span>
                      <span className={`font-bold text-lg ${getOverallColor(selectedPlayer.overall).split(' ')[0]}`}>
                        {selectedPlayer.overall}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Potential</span>
                      <span className="font-bold text-lg text-purple-600">
                        {selectedPlayer.potential}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Market Value</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(selectedPlayer.value)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Weekly Wage</span>
                      <span className="font-bold text-blue-600">
                        {formatCurrency(selectedPlayer.wage)}
                      </span>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPlayer.status)}`}>
                        {selectedPlayer.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Form</span>
                      <span className={`font-semibold ${getMoraleColor(selectedPlayer.form)}`}>
                        {selectedPlayer.form.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Fitness</span>
                      <span className={`font-semibold ${getFitnessColor(selectedPlayer.fitness)}`}>
                        {selectedPlayer.fitness}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Morale</span>
                      <span className={`font-semibold ${getMoraleColor(selectedPlayer.morale)}`}>
                        {selectedPlayer.morale}/100
                      </span>
                    </div>
                  </div>

                  {/* Season Stats */}
                  <div className="border-t pt-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Season Statistics</h5>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Goals</span>
                        <span className="font-medium">{selectedPlayer.goals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assists</span>
                        <span className="font-medium">{selectedPlayer.assists}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yellow Cards</span>
                        <span className="font-medium">{selectedPlayer.yellowCards}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Red Cards</span>
                        <span className="font-medium">{selectedPlayer.redCards}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Edit Player
                    </Button>
                    <Button variant="outline" className="w-full">
                      Offer New Contract
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                      Transfer List
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Player</h3>
                  <p className="text-gray-600">Click on a player from the list to view detailed information</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Squad Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-green-200 text-green-700 hover:bg-green-50 hover:shadow-md transition-all"
              >
                <span className="text-2xl">➕</span>
                <span className="text-sm font-medium">Sign Player</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:shadow-md transition-all"
              >
                <span className="text-2xl">📋</span>
                <span className="text-sm font-medium">Transfer List</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:shadow-md transition-all"
              >
                <span className="text-2xl">📊</span>
                <span className="text-sm font-medium">Squad Stats</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 hover:shadow-md transition-all"
              >
                <span className="text-2xl">🏥</span>
                <span className="text-sm font-medium">Medical Center</span>
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-blue-900/30 bg-blue-900/30">
          <div className="flex items-center justify-between text-sm text-blue-200">
            <div>
              <p>© 2024 Academy Football Manager. All rights reserved.</p>
              <p className="text-xs text-blue-300 mt-1">Version 2.4.1 | Last updated: Today</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>Squad Size:</span>
                <span className="font-medium text-white">{mockSquad.length} players</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-400 font-medium">System Online</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}