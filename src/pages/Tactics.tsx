/**
 * Tactics & Match Simulation page component - advanced tactical management and match simulation
 * Enhanced modern design with comprehensive tactical options and match simulation features
 */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

// Tactical formations
const formations = [
  { 
    name: '4-4-2', 
    description: 'Balanced formation with wide midfielders',
    positions: [
      { pos: 'GK', x: 50, y: 90 },
      { pos: 'RB', x: 20, y: 70 },
      { pos: 'CB', x: 35, y: 80 },
      { pos: 'CB', x: 65, y: 80 },
      { pos: 'LB', x: 80, y: 70 },
      { pos: 'RM', x: 20, y: 40 },
      { pos: 'CM', x: 40, y: 50 },
      { pos: 'CM', x: 60, y: 50 },
      { pos: 'LM', x: 80, y: 40 },
      { pos: 'ST', x: 35, y: 20 },
      { pos: 'ST', x: 65, y: 20 }
    ]
  },
  { 
    name: '4-3-3', 
    description: 'Attacking formation with three forwards',
    positions: [
      { pos: 'GK', x: 50, y: 90 },
      { pos: 'RB', x: 20, y: 70 },
      { pos: 'CB', x: 35, y: 80 },
      { pos: 'CB', x: 65, y: 80 },
      { pos: 'LB', x: 80, y: 70 },
      { pos: 'CM', x: 35, y: 50 },
      { pos: 'CM', x: 50, y: 55 },
      { pos: 'CM', x: 65, y: 50 },
      { pos: 'RW', x: 20, y: 25 },
      { pos: 'ST', x: 50, y: 20 },
      { pos: 'LW', x: 80, y: 25 }
    ]
  },
  { 
    name: '3-5-2', 
    description: 'Defensive formation with wing-backs',
    positions: [
      { pos: 'GK', x: 50, y: 90 },
      { pos: 'CB', x: 30, y: 75 },
      { pos: 'CB', x: 50, y: 80 },
      { pos: 'CB', x: 70, y: 75 },
      { pos: 'RWB', x: 15, y: 50 },
      { pos: 'CM', x: 30, y: 45 },
      { pos: 'CM', x: 50, y: 50 },
      { pos: 'CM', x: 70, y: 45 },
      { pos: 'LWB', x: 85, y: 50 },
      { pos: 'ST', x: 35, y: 20 },
      { pos: 'ST', x: 65, y: 20 }
    ]
  },
  { 
    name: '4-2-3-1', 
    description: 'Modern formation with attacking midfielder',
    positions: [
      { pos: 'GK', x: 50, y: 90 },
      { pos: 'RB', x: 20, y: 70 },
      { pos: 'CB', x: 35, y: 80 },
      { pos: 'CB', x: 65, y: 80 },
      { pos: 'LB', x: 80, y: 70 },
      { pos: 'CDM', x: 35, y: 60 },
      { pos: 'CDM', x: 65, y: 60 },
      { pos: 'CAM', x: 50, y: 40 },
      { pos: 'RW', x: 20, y: 30 },
      { pos: 'ST', x: 50, y: 20 },
      { pos: 'LW', x: 80, y: 30 }
    ]
  }
]

// Playing styles
const playingStyles = [
  { id: 'balanced', name: 'Balanced', description: 'Equal focus on attack and defense' },
  { id: 'attacking', name: 'Attacking', description: 'High pressure, offensive play' },
  { id: 'defensive', name: 'Defensive', description: 'Solid defense, counter-attacks' },
  { id: 'possession', name: 'Possession', description: 'Keep ball, control tempo' },
  { id: 'counter', name: 'Counter-Attack', description: 'Quick transitions, fast breaks' }
]

// Mentality options
const mentalityOptions = [
  { id: 'defensive', name: 'Defensive', risk: 'Low' },
  { id: 'cautious', name: 'Cautious', risk: 'Low-Medium' },
  { id: 'balanced', name: 'Balanced', risk: 'Medium' },
  { id: 'positive', name: 'Positive', risk: 'Medium-High' },
  { id: 'attacking', name: 'Attacking', risk: 'High' }
]

// Press intensity options
const pressIntensityOptions = [
  { id: 'low', name: 'Low Press', description: 'Conserve energy, protect shape' },
  { id: 'medium', name: 'Medium Press', description: 'Balanced approach' },
  { id: 'high', name: 'High Press', description: 'Intense pressure, win ball back quickly' },
  { id: 'gegenpress', name: 'Gegenpress', description: 'Immediate counter-pressing' }
]

// Match simulation data
interface MatchEvent {
  minute: number
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'injury' | 'half_time' | 'full_time'
  team: 'home' | 'away'
  player?: string
  description: string
}

const mockMatchEvents: MatchEvent[] = [
  { minute: 1, type: 'half_time', team: 'home', description: 'First half begins' },
  { minute: 12, type: 'goal', team: 'home', player: 'Erling Haaland', description: 'Goal! Great finish from close range' },
  { minute: 28, type: 'yellow_card', team: 'away', player: 'Harry Kane', description: 'Yellow card for tactical foul' },
  { minute: 45, type: 'half_time', team: 'home', description: 'First half ends' },
  { minute: 46, type: 'half_time', team: 'home', description: 'Second half begins' },
  { minute: 58, type: 'substitution', team: 'home', player: 'Phil Foden', description: 'Substitution: Foden replaces James Rodriguez' },
  { minute: 67, type: 'goal', team: 'away', player: 'Son Heung-min', description: 'Goal! Beautiful curling shot' },
  { minute: 78, type: 'yellow_card', team: 'home', player: 'Rodri', description: 'Yellow card for late challenge' },
  { minute: 85, type: 'goal', team: 'home', player: 'Kevin De Bruyne', description: 'Goal! Stunning free-kick!' },
  { minute: 90, type: 'full_time', team: 'home', description: 'Full time' }
]

export default function TacticsPage() {
  const navigate = useNavigate()
  const [selectedFormation, setSelectedFormation] = useState(formations[0])
  const [playingStyle, setPlayingStyle] = useState(playingStyles[2])
  const [mentality, setMentality] = useState(mentalityOptions[2])
  const [pressIntensity, setPressIntensity] = useState(pressIntensityOptions[1])
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentMinute, setCurrentMinute] = useState(0)
  const [matchEvents, setMatchEvents] = useState<MatchEvent[]>([])
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Simulate match
  const simulateMatch = async () => {
    setIsSimulating(true)
    setCurrentMinute(0)
    setMatchEvents([])
    setHomeScore(0)
    setAwayScore(0)

    for (let minute = 1; minute <= 90; minute += 2) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setCurrentMinute(minute)

      // Add random events
      if (Math.random() < 0.05) {
        const eventTypes: MatchEvent['type'][] = ['goal', 'yellow_card', 'substitution']
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const team = Math.random() < 0.6 ? 'home' : 'away'
        
        let event: MatchEvent
        if (eventType === 'goal') {
          const scorers = ['Erling Haaland', 'Kevin De Bruyne', 'Phil Foden', 'James Rodriguez']
          const awayScorers = ['Harry Kane', 'Son Heung-min', 'Dejan Kulusevski', 'Richarlison']
          const player = team === 'home' ? scorers[Math.floor(Math.random() * scorers.length)] : awayScorers[Math.floor(Math.random() * awayScorers.length)]
          
          event = {
            minute,
            type: 'goal',
            team,
            player,
            description: `Goal! ${player} scores!`
          }
          
          if (team === 'home') setHomeScore(prev => prev + 1)
          else setAwayScore(prev => prev + 1)
        } else {
          event = {
            minute,
            type: eventType,
            team,
            description: `${eventType === 'yellow_card' ? 'Yellow card' : 'Substitution'}`
          }
        }
        
        setMatchEvents(prev => [...prev, event])
      }
    }

    // Add full time event
    setMatchEvents(prev => [...prev, { minute: 90, type: 'full_time', team: 'home', description: 'Full time' }])
    setIsSimulating(false)
  }

  const getEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal': return '⚽'
      case 'yellow_card': return '🟨'
      case 'red_card': return '🟥'
      case 'substitution': return '🔄'
      case 'injury': return '🏥'
      case 'half_time': return '⏱️'
      case 'full_time': return '🏁'
      default: return '📝'
    }
  }

  const getEventColor = (type: MatchEvent['type'], team: 'home' | 'away') => {
    if (type === 'goal') return team === 'home' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
    if (type === 'yellow_card') return 'text-yellow-600 bg-yellow-50'
    if (type === 'red_card') return 'text-red-600 bg-red-50'
    if (type === 'substitution') return 'text-blue-600 bg-blue-50'
    if (type === 'injury') return 'text-orange-600 bg-orange-50'
    return 'text-gray-600 bg-gray-50'
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
                    item.id === 'tactics' 
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
                <h1 className="text-3xl font-bold text-gray-900">Tactics & Match Simulation</h1>
                <p className="text-gray-600">Configure your tactics and simulate matches</p>
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

        {/* Tactics Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Match Simulation Section */}
          <div className="mb-8 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-2">Match Simulation</h2>
                <p className="text-xl text-green-100">Test your tactics against the opposition</p>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-green-200 mb-2">Next Match</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold text-lg">vs Tottenham Hotspur</div>
                  <div className="text-sm text-green-100">Premier League • Home</div>
                </div>
              </div>
            </div>

            {/* Match Score */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-6xl font-bold">{homeScore}</div>
                <div className="text-xl text-green-100">FC London</div>
              </div>
              
              <div className="text-3xl font-bold text-green-200">vs</div>
              
              <div className="text-center">
                <div className="text-6xl font-bold">{awayScore}</div>
                <div className="text-xl text-green-100">Tottenham</div>
              </div>
            </div>

            {/* Simulation Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={simulateMatch}
                disabled={isSimulating}
                className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSimulating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Simulating...
                  </>
                ) : (
                  'Simulate Match'
                )}
              </Button>
              
              {isSimulating && (
                <div className="text-lg font-semibold">
                  Minute: {currentMinute}'
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tactical Setup */}
            <div className="space-y-6">
              {/* Formation Selection */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Formation Setup</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {formations.map((formation) => (
                    <button
                      key={formation.name}
                      onClick={() => setSelectedFormation(formation)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedFormation.name === formation.name
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{formation.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{formation.description}</div>
                    </button>
                  ))}
                </div>

                {/* Formation Diagram */}
                <div className="bg-green-50 rounded-lg p-4 relative" style={{ height: '300px' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-white opacity-50"></div>
                  </div>
                  
                  {/* Field lines */}
                  <div className="absolute inset-0 border-2 border-green-300 rounded-lg"></div>
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-green-300"></div>
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-green-300"></div>
                  <div className="absolute left-1/3 top-0 bottom-0 w-px bg-green-300"></div>
                  <div className="absolute left-2/3 top-0 bottom-0 w-px bg-green-300"></div>
                  
                  {/* Players */}
                  {selectedFormation.positions.map((player, index) => (
                    <div
                      key={index}
                      className="absolute w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${player.x}%`, top: `${player.y}%` }}
                    >
                      {player.pos}
                    </div>
                  ))}
                </div>
              </div>

              {/* Playing Style */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Playing Style</h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {playingStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setPlayingStyle(style)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        playingStyle.id === style.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{style.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Tactics */}
            <div className="space-y-6">
              {/* Mentality & Pressing */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Tactics</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">Team Mentality</Label>
                    <Select value={mentality.id} onValueChange={(value) => {
                      const selected = mentalityOptions.find(m => m.id === value)
                      if (selected) setMentality(selected)
                    }}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mentalityOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            <div>
                              <div className="font-medium">{option.name}</div>
                              <div className="text-xs text-gray-500">Risk: {option.risk}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">Press Intensity</Label>
                    <Select value={pressIntensity.id} onValueChange={(value) => {
                      const selected = pressIntensityOptions.find(p => p.id === value)
                      if (selected) setPressIntensity(selected)
                    }}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {pressIntensityOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            <div>
                              <div className="font-medium">{option.name}</div>
                              <div className="text-xs text-gray-500">{option.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tactical Sliders */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label className="text-sm font-medium text-gray-700">Defensive Line</Label>
                        <span className="text-sm text-gray-500">Medium</span>
                      </div>
                      <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label className="text-sm font-medium text-gray-700">Width</Label>
                        <span className="text-sm text-gray-500">Medium</span>
                      </div>
                      <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label className="text-sm font-medium text-gray-700">Tempo</Label>
                        <span className="text-sm text-gray-500">Medium</span>
                      </div>
                      <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Events */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Match Events</h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {matchEvents.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <div className="text-4xl mb-2">⚽</div>
                      <p>Simulate a match to see events</p>
                    </div>
                  ) : (
                    matchEvents.map((event, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${getEventColor(event.type, event.team)}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{getEventIcon(event.type)}</span>
                            <div>
                              <div className="font-medium text-gray-900">
                                {event.minute}' - {event.description}
                              </div>
                              {event.player && (
                                <div className="text-sm text-gray-600">{event.player}</div>
                              )}
                            </div>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            event.team === 'home' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {event.team === 'home' ? 'Home' : 'Away'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Tactical Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:shadow-md transition-all"
              >
                <span className="text-2xl">💾</span>
                <span className="text-sm font-medium">Save Tactics</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-green-200 text-green-700 hover:bg-green-50 hover:shadow-md transition-all"
              >
                <span className="text-2xl">📋</span>
                <span className="text-sm font-medium">Load Preset</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:shadow-md transition-all"
              >
                <span className="text-2xl">🎯</span>
                <span className="text-sm font-medium">Set Pieces</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 flex flex-col items-center gap-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 hover:shadow-md transition-all"
              >
                <span className="text-2xl">📊</span>
                <span className="text-sm font-medium">Analyze</span>
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
                <span>Current Formation:</span>
                <span className="font-medium text-white">{selectedFormation.name}</span>
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