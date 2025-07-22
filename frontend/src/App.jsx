import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import WebsiteScanner from './components/WebsiteScanner'
import AgentGrid from './components/AgentGrid'
import ThreatMap from './components/ThreatMap'
import SystemHealth from './components/SystemHealth'

function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [systemData, setSystemData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 2000)
    
    // Fetch system data
    fetchSystemData()
  }, [])

  const fetchSystemData = async () => {
    try {
      const [agentsRes, threatsRes, healthRes] = await Promise.all([
        fetch('http://localhost:5000/api/agents/status'),
        fetch('http://localhost:5000/api/threats'),
        fetch('http://localhost:5000/api/system/health')
      ])
      
      const agents = await agentsRes.json()
      const threats = await threatsRes.json()
      const health = await healthRes.json()
      
      setSystemData({ agents, threats, health })
    } catch (error) {
      console.error('Error fetching system data:', error)
      // Use mock data if API is not available
      setSystemData({
        agents: { agents: [] },
        threats: { threats: [] },
        health: { status: 'offline' }
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen cyber-gradient flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Initializing AI Agents</h2>
          <p className="text-gray-300">Loading cybersecurity intelligence system...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      <Header onViewChange={setCurrentView} currentView={currentView} />
      
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onGetStarted={() => setCurrentView('dashboard')} />
          </motion.div>
        )}
        
        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard systemData={systemData} />
          </motion.div>
        )}

        {currentView === 'scanner' && (
          <motion.div
            key="scanner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <WebsiteScanner />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
