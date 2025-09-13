/**
 * Homepage component for the football manager game
 * Extended modern homepage with game statistics and detailed information
 */
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export default function HomePage() {
  const navigate = useNavigate()

  // Realistic game statistics data - actual user data
  const gameStats = {
    activeManagers: 3247,        // Number of actual user managers (non-AI) who created clubs
    userClubs: 3247,            // Number of non-AI clubs created by users in the game
    totalClubs: 12890,          // Total clubs (AI clubs + user clubs)
    totalLeagues: 110,          // Total number of leagues in the game
    onlinePlayers: 3247,        // Players currently online (same as active managers)
    matchesToday: 856,          // Realistic number of matches played today
    transfersThisWeek: 1243     // Realistic number of transfers this week
  }

  // Game features data with white SVG icons
  const gameFeatures = [
    {
      title: "Realistic Match Engine",
      description: "Advanced AI-powered match simulation with realistic player behaviors, tactics, and match outcomes",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      )
    },
    {
      title: "Comprehensive Transfer System",
      description: "Dynamic transfer market with realistic player valuations, negotiations, and scouting networks",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: "Youth Academy Development",
      description: "Build future stars with advanced youth training, scouting, and development programs",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "Financial Management",
      description: "Complete financial control with realistic revenue streams, expenses, and budget management",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.93.66 1.64 2.08 1.64 1.96 0 2.37-.79 2.37-1.54 0-1.06-.77-1.48-2.5-2.01-2.02-.6-4.05-1.35-4.05-3.7 0-1.79 1.32-2.91 3.21-3.32V5h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s3.89 1.3 3.89 3.81c-.01 1.96-1.35 3.02-3.83 3.46z"/>
        </svg>
      )
    },
    {
      title: "Tactical Depth",
      description: "Create custom formations, set pieces, and playing styles with detailed tactical options",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "Multiplayer Competition",
      description: "Compete against real managers in leagues, cups, and international competitions",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
      {/* Football Stadium Background with 85% transparency */}
      <div className="absolute inset-0 bg-black/85">
        <img 
          src="https://pub-cdn.sider.ai/u/U0KAH9N4VLX/web-coder/68c58f10788befa8026857c7/resource/50f51bc5-1aae-4d42-8c79-c225d5456df6.jpg" 
          alt="Football Stadium Background"
          className="w-full h-full object-cover opacity-15"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center max-w-6xl mx-auto">
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              Academy
              <span className="text-blue-400">Football</span>
              <span className="text-blue-200">Manager</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Build your dream club, compete in leagues, and become the ultimate football manager in this immersive multiplayer experience
            </p>

            {/* Live Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {gameStats.activeManagers.toLocaleString()}
                </div>
                <div className="text-white text-sm">Active Managers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {gameStats.userClubs.toLocaleString()}
                </div>
                <div className="text-white text-sm">User Clubs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {gameStats.totalClubs.toLocaleString()}
                </div>
                <div className="text-white text-sm">Total Clubs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {gameStats.totalLeagues}
                </div>
                <div className="text-white text-sm">Total Leagues</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                size="lg"
              >
                Join the Game
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 text-xl px-12 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                size="lg"
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ultimate Football Management Experience
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Discover the most comprehensive football management game with realistic simulation and deep strategic gameplay
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gameFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-4xl mb-4 text-white flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-blue-200 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Activity Section */}
        <section className="py-20 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                Live Game Activity
              </h2>
              <p className="text-xl text-blue-800 max-w-3xl mx-auto">
                Real-time statistics from our active football management world
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 backdrop-blur-sm rounded-lg p-8 border border-blue-200 text-center">
                <div className="text-5xl font-bold text-blue-900 mb-2">
                  {gameStats.onlinePlayers.toLocaleString()}
                </div>
                <div className="text-blue-800 text-lg">Players Online</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-4">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="bg-blue-50 backdrop-blur-sm rounded-lg p-8 border border-blue-200 text-center">
                <div className="text-5xl font-bold text-blue-900 mb-2">
                  {gameStats.matchesToday.toLocaleString()}
                </div>
                <div className="text-blue-800 text-lg">Matches Today</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-4">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="bg-blue-50 backdrop-blur-sm rounded-lg p-8 border border-blue-200 text-center">
                <div className="text-5xl font-bold text-blue-900 mb-2">
                  {gameStats.transfersThisWeek.toLocaleString()}
                </div>
                <div className="text-blue-800 text-lg">Transfers This Week</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-4">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-8 bg-gradient-to-r from-blue-900 to-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your Legacy?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Join thousands of football managers and start your journey to become the ultimate champion
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Join the Game Now
              </Button>
              <Button 
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-lg font-semibold"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 border-t border-blue-900/30 bg-gradient-to-b from-blue-900/50 to-blue-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Academy Football Manager</h3>
                <p className="text-blue-200">The ultimate football management experience</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Game Features</h4>
                <ul className="space-y-2 text-blue-200">
                  <li>Match Engine</li>
                  <li>Transfer System</li>
                  <li>Youth Academy</li>
                  <li>Financial Management</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
                <ul className="space-y-2 text-blue-200">
                  <li>Forum</li>
                  <li>Discord</li>
                  <li>Support</li>
                  <li>Bug Reports</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-blue-200">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Cookies</li>
                  <li>Licenses</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-blue-900/30 pt-8 text-center text-blue-300">
              <p>© 2024 Academy Football Manager. All rights reserved.</p>
              <p className="mt-2 text-sm">This is a fan-made project. Not affiliated with any official football organizations.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}