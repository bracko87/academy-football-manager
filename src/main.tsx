import { createRoot } from 'react-dom/client'
import './shadcn.css'
import App from './App'

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)
root.render(<App />)
