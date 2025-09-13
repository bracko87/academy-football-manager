/**
 * Create Club page component for team creation
 * Enhanced modern design with advanced features and better user experience
 */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// UEFA countries list
const uefaCountries = [
  'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina',
  'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'England', 'Estonia', 'Faroe Islands',
  'Finland', 'France', 'Georgia', 'Germany', 'Gibraltar', 'Greece', 'Hungary', 'Iceland', 'Ireland',
  'Israel', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal',
  'Romania', 'Russia', 'San Marino', 'Scotland', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'Switzerland', 'Turkey', 'Ukraine', 'Wales'
]

// Sample cities for each country (simplified for demo)
const countryCities: Record<string, string[]> = {
  'England': ['London', 'Manchester', 'Liverpool', 'Birmingham', 'Leeds', 'Sheffield', 'Bradford', 'Edinburgh', 'Glasgow', 'Liverpool'],
  'Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Malaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
  'Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Dortmund', 'Essen', 'Leipzig', 'Dresden'],
  'Italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
  'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
  'Portugal': ['Lisbon', 'Porto', 'Amadora', 'Braga', 'Setúbal', 'Coimbra', 'Funchal', 'Almada', 'Odivelas', 'Agualva-Cacém'],
  'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Groningen', 'Tilburg', 'Almere', 'Breda', 'Nijmegen'],
  'Belgium': ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Leuven', 'Mons', 'Mechelen'],
  'Scotland': ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Paisley', 'East Kilbride', 'Livingston', 'Cumbernauld', 'Hamilton', 'Dunfermline'],
  'Turkey': ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Kayseri', 'Malatya']
}

// Generate remaining cities for other countries
const generateCities = (country: string) => {
  if (countryCities[country]) return countryCities[country]
  
  const baseCities = ['City Center', 'Downtown', 'Uptown', 'Midtown', 'Eastside', 'Westside', 'Northside', 'Southside', 'Riverside', 'Hillside']
  const cities = []
  
  for (let i = 0; i < 40; i++) {
    cities.push(`${country} ${baseCities[i % baseCities.length]} ${Math.floor(i / baseCities.length) + 1}`)
  }
  
  return cities
}

// Available club prefixes
const clubPrefixes = ['FC', 'FK', 'OFK', 'SV', 'SC', 'AC', 'CD', 'UD', 'RC', 'CF']

// Available colors for club kits
const colorOptions = [
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#1F2937' }
]

// Stadium types
const stadiumTypes = [
  { name: 'Small Stadium', capacity: 5000, cost: 1000000 },
  { name: 'Medium Stadium', capacity: 15000, cost: 3000000 },
  { name: 'Large Stadium', capacity: 30000, cost: 6000000 },
  { name: 'Elite Stadium', capacity: 50000, cost: 12000000 }
]

// Formation options
const formationOptions = [
  '4-4-2', '4-3-3', '3-5-2', '4-2-3-1', '3-4-3', '5-3-2', '4-5-1', '3-6-1'
]

export default function CreateClubPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    clubName: '',
    country: '',
    city: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#EF4444',
    moto: '',
    stadiumType: 'Medium Stadium',
    formation: '4-4-2',
    budget: 5000000
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.clubName.trim()) {
      newErrors.clubName = 'Club name is required'
    }
    
    if (!formData.country) {
      newErrors.country = 'Please select a country'
    }
    
    if (!formData.city) {
      newErrors.city = 'Please select a city'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (validateForm()) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would typically send the data to your backend
      console.log('Club creation data:', formData)
      navigate('/dashboard')
    }
    
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user makes a selection
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleCountryChange = (country: string) => {
    handleInputChange('country', country)
    setFormData(prev => ({ ...prev, city: '' })) // Reset city when country changes
  }

  const generateRandomClubName = () => {
    if (!formData.country) return
    
    const prefix = clubPrefixes[Math.floor(Math.random() * clubPrefixes.length)]
    const cities = generateCities(formData.country)
    const city = cities[Math.floor(Math.random() * cities.length)]
    const randomName = `${prefix} ${city.replace(`${formData.country} `, '')}`
    
    setFormData(prev => ({ ...prev, clubName: randomName }))
  }

  const generateRandomColors = () => {
    const color1 = colorOptions[Math.floor(Math.random() * colorOptions.length)]
    let color2 = colorOptions[Math.floor(Math.random() * colorOptions.length)]
    
    // Ensure colors are different
    while (color2.value === color1.value) {
      color2 = colorOptions[Math.floor(Math.random() * colorOptions.length)]
    }
    
    setFormData(prev => ({ 
      ...prev, 
      primaryColor: color1.value, 
      secondaryColor: color2.value 
    }))
  }

  const generateRandomSetup = () => {
    generateRandomClubName()
    generateRandomColors()
    
    // Random stadium
    const randomStadium = stadiumTypes[Math.floor(Math.random() * stadiumTypes.length)]
    setFormData(prev => ({ ...prev, stadiumType: randomStadium.name }))
    
    // Random formation
    const randomFormation = formationOptions[Math.floor(Math.random() * formationOptions.length)]
    setFormData(prev => ({ ...prev, formation: randomFormation }))
    
    // Random budget
    const randomBudget = Math.floor(Math.random() * 10000000) + 3000000
    setFormData(prev => ({ ...prev, budget: randomBudget }))
  }

  const cities = formData.country ? generateCities(formData.country) : []
  const selectedStadium = stadiumTypes.find(s => s.name === formData.stadiumType)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header Section */}
      <div className="py-12 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Create Your Football Club
        </h1>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Build your legacy in European football with complete customization options
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">🏟️</span>
                Basic Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Club Name Field */}
                <div className="space-y-2">
                  <Label className="text-white font-medium">Club Name</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your club name"
                      value={formData.clubName}
                      onChange={(e) => handleInputChange('clubName', e.target.value)}
                      className="flex-1 bg-white/20 border-white/30 text-white placeholder-blue-200 focus:border-blue-400"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateRandomClubName}
                      className="bg-transparent border-white/30 text-white hover:bg-white/10 px-3"
                    >
                      🎲
                    </Button>
                  </div>
                  {errors.clubName && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.clubName}
                    </p>
                  )}
                </div>

                {/* Country Selection */}
                <div className="space-y-2">
                  <Label className="text-white font-medium">Country</Label>
                  <Select onValueChange={handleCountryChange}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white focus:border-blue-400">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {uefaCountries.map((country) => (
                        <SelectItem key={country} value={country} className="text-white hover:bg-blue-600">
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-red-400 text-sm">{errors.country}</p>
                  )}
                </div>

                {/* City Selection */}
                <div className="space-y-2">
                  <Label className="text-white font-medium">City</Label>
                  <Select onValueChange={(value) => handleInputChange('city', value)}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white focus:border-blue-400" disabled={!formData.country}>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {cities.map((city) => (
                        <SelectItem key={city} value={city} className="text-white hover:bg-blue-600">
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.city && (
                    <p className="text-red-400 text-sm">{errors.city}</p>
                  )}
                </div>

                {/* Club Motto */}
                <div className="space-y-2">
                  <Label className="text-white font-medium">Club Motto (Optional)</Label>
                  <Input
                    placeholder="Enter your club motto"
                    value={formData.moto}
                    onChange={(e) => handleInputChange('moto', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>
            </div>

            {/* Club Identity Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">🎨</span>
                Club Identity
              </h2>
              
              <div className="space-y-6">
                {/* Colors Selection */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-white font-medium">Club Colors</Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateRandomColors}
                      className="bg-transparent border-white/30 text-white hover:bg-white/10 text-sm px-3"
                    >
                      🎲 Random
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white text-sm">Primary Color</Label>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg border-2 border-white/30 shadow-lg"
                          style={{ backgroundColor: formData.primaryColor }}
                        />
                        <Select onValueChange={(value) => handleInputChange('primaryColor', value)}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white text-sm focus:border-blue-400 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/20">
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value} className="text-white hover:bg-blue-600">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded" style={{ backgroundColor: color.value }}></div>
                                  {color.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white text-sm">Secondary Color</Label>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg border-2 border-white/30 shadow-lg"
                          style={{ backgroundColor: formData.secondaryColor }}
                        />
                        <Select onValueChange={(value) => handleInputChange('secondaryColor', value)}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white text-sm focus:border-blue-400 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/20">
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value} className="text-white hover:bg-blue-600">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded" style={{ backgroundColor: color.value }}></div>
                                  {color.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Club Infrastructure Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">🏗️</span>
                Club Infrastructure
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Stadium Selection */}
                <div className="space-y-2">
                  <Label className="text-white font-medium">Stadium Type</Label>
                  <Select onValueChange={(value) => handleInputChange('stadiumType', value)}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white focus:border-blue-400">
                      <SelectValue placeholder="Select stadium type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {stadiumTypes.map((stadium) => (
                        <SelectItem key={stadium.name} value={stadium.name} className="text-white hover:bg-blue-600">
                          <div className="flex justify-between items-center w-full">
                            <span>{stadium.name}</span>
                            <span className="text-blue-300 text-sm">{stadium.capacity.toLocaleString()} seats</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Formation Selection */}
                <div className="space-y-2">
                  <Label className="text-white font-medium">Default Formation</Label>
                  <Select onValueChange={(value) => handleInputChange('formation', value)}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white focus:border-blue-400">
                      <SelectValue placeholder="Select formation" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {formationOptions.map((formation) => (
                        <SelectItem key={formation} value={formation} className="text-white hover:bg-blue-600">
                          {formation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={generateRandomSetup}
                className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10 py-3"
              >
                🎲 Generate Random Setup
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.country || !formData.city}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Club...
                  </>
                ) : (
                  'Create Club'
                )}
              </Button>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            {/* Club Preview Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Club Preview</h3>
              
              {/* Club Logo Preview */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-4 border-white/30 flex items-center justify-center shadow-2xl">
                    <div className="w-36 h-36 rounded-full flex items-center justify-center" style={{ 
                      background: `linear-gradient(45deg, ${formData.primaryColor} 50%, ${formData.secondaryColor} 50%)`
                    }}>
                      <span className="text-white font-bold text-2xl">
                        {formData.clubName ? formData.clubName.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    LOGO
                  </div>
                </div>
              </div>

              {/* Club Details Preview */}
              <div className="space-y-4 text-center">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {formData.clubName || 'Your Club Name'}
                  </h4>
                  <p className="text-blue-200">
                    {formData.city && formData.country ? `${formData.city}, ${formData.country}` : 'Your Location'}
                  </p>
                </div>
                
                {formData.moto && (
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-blue-300 italic text-sm">"{formData.moto}"</p>
                  </div>
                )}

                {/* Club Colors */}
                <div className="flex justify-center gap-3 mt-4">
                  <div className="text-center">
                    <div 
                      className="w-8 h-8 rounded-lg border border-white/50 mx-auto mb-1"
                      style={{ backgroundColor: formData.primaryColor }}
                    />
                    <span className="text-xs text-blue-200">Primary</span>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-8 h-8 rounded-lg border border-white/50 mx-auto mb-1"
                      style={{ backgroundColor: formData.secondaryColor }}
                    />
                    <span className="text-xs text-blue-200">Secondary</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Club Stats Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4 text-center">Club Information</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-blue-200">Stadium</span>
                  <span className="text-white font-medium">{formData.stadiumType}</span>
                </div>
                
                {selectedStadium && (
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-blue-200">Capacity</span>
                    <span className="text-white font-medium">{selectedStadium.capacity.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-blue-200">Formation</span>
                  <span className="text-white font-medium">{formData.formation}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-blue-200">Starting Budget</span>
                  <span className="text-green-400 font-medium">
                    £{(formData.budget / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                💡 Pro Tips
              </h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Choose colors that represent your club's identity
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Stadium size affects match day revenue
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Your formation can be changed later
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Use random generator for inspiration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
