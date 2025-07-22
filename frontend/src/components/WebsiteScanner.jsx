import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WebsiteScanner = () => {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [attacks, setAttacks] = useState([])
  const [intelligence, setIntelligence] = useState(null)
  const [activeTab, setActiveTab] = useState('scanner')

  useEffect(() => {
    // Fetch real-time data
    fetchAttacks()
    fetchIntelligence()
    
    // Set up real-time updates
    const interval = setInterval(() => {
      fetchAttacks()
      fetchIntelligence()
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchAttacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/monitor/attacks')
      const data = await response.json()
      setAttacks(data.attacks)
    } catch (error) {
      console.error('Error fetching attacks:', error)
    }
  }

  const fetchIntelligence = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/intelligence/realtime')
      const data = await response.json()
      setIntelligence(data)
    } catch (error) {
      console.error('Error fetching intelligence:', error)
    }
  }

  const handleScan = async () => {
    if (!url) return

    setScanning(true)
    setScanResult(null)

    try {
      const response = await fetch('http://localhost:5000/api/scan/website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const result = await response.json()
      setScanResult(result)
    } catch (error) {
      console.error('Scan error:', error)
    } finally {
      setScanning(false)
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Website Security Scanner</h1>
          <p className="text-gray-400">Comprehensive vulnerability scanning and real-time threat monitoring</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white/5 rounded-lg p-1">
          {[
            { id: 'scanner', label: 'Vulnerability Scanner', icon: '🔍' },
            { id: 'attacks', label: 'Attack Monitor', icon: '🛡️' },
            { id: 'intelligence', label: 'Real-time Intel', icon: '🧠' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-cyber-blue text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'scanner' && (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Scanner Input */}
              <div className="cyber-card">
                <h3 className="text-xl font-semibold text-white mb-4">Website Vulnerability Scanner</h3>
                <div className="flex space-x-4">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL (e.g., https://example.com)"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                  />
                  <button
                    onClick={handleScan}
                    disabled={scanning || !url}
                    className="cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scanning ? (
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Scanning...</span>
                      </div>
                    ) : (
                      'Start Scan'
                    )}
                  </button>
                </div>
              </div>

              {/* Scan Results */}
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="cyber-card"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Scan Results</h3>
                    <div className="text-sm text-gray-400">
                      {new Date(scanResult.timestamp).toLocaleString()}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(scanResult.summary).map(([key, value]) => (
                      <div key={key} className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-white">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">
                          {key.replace('_', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vulnerabilities */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Detected Vulnerabilities</h4>
                    {scanResult.vulnerabilities.map((vuln, index) => (
                      <motion.div
                        key={vuln.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white/5 rounded-lg border-l-4 border-red-500"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-semibold text-white">{vuln.type}</h5>
                            <p className="text-gray-400 text-sm">{vuln.description}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(vuln.severity)}`}>
                            {vuln.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Location:</span>
                            <span className="text-white ml-2">{vuln.location}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">CVE:</span>
                            <span className="text-white ml-2">{vuln.cve}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Risk Score:</span>
                            <span className="text-white ml-2">{vuln.risk_score}/10</span>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-blue-900/20 rounded border border-blue-500/30">
                          <span className="text-blue-400 font-semibold">Recommendation:</span>
                          <p className="text-white mt-1">{vuln.recommendation}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'attacks' && (
            <motion.div
              key="attacks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="cyber-card"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Real-time Attack Monitoring</h3>
              <div className="space-y-4">
                {attacks.map((attack, index) => (
                  <motion.div
                    key={attack.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/5 rounded-lg border-l-4 border-red-500"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">⚔️</span>
                        <div>
                          <h4 className="font-semibold text-white">{attack.type}</h4>
                          <p className="text-gray-400 text-sm">{attack.details}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(attack.severity)}`}>
                          {attack.severity.toUpperCase()}
                        </span>
                        <div className="text-sm text-gray-400 mt-1">
                          {new Date(attack.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Source:</span>
                        <span className="text-white ml-2">{attack.source}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Target:</span>
                        <span className="text-white ml-2">{attack.target}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <span className={`ml-2 ${attack.status === 'blocked' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {attack.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'intelligence' && (
            <motion.div
              key="intelligence"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {intelligence && (
                <>
                  {/* Threat Level */}
                  <div className="cyber-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">Threat Intelligence</h3>
                      <div className="text-sm text-gray-400">
                        Last updated: {new Date(intelligence.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <div className={`text-3xl font-bold ${getThreatLevelColor(intelligence.threat_level)}`}>
                          {intelligence.threat_level.toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-400">Threat Level</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-3xl font-bold text-white">{intelligence.active_threats}</div>
                        <div className="text-sm text-gray-400">Active Threats</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Incidents */}
                  <div className="cyber-card">
                    <h4 className="text-lg font-semibold text-white mb-4">Recent Incidents</h4>
                    <div className="space-y-3">
                      {intelligence.recent_incidents.map((incident, index) => (
                        <motion.div
                          key={incident.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-white">{incident.type}</h5>
                              <p className="text-gray-400 text-sm">{incident.description}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(incident.severity)}`}>
                              {incident.severity.toUpperCase()}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* IOC Indicators */}
                  <div className="cyber-card">
                    <h4 className="text-lg font-semibold text-white mb-4">Indicators of Compromise (IOC)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {intelligence.ioc_indicators.map((ioc, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">{ioc.type}</span>
                            <span className="text-sm text-green-400">{ioc.confidence}% confidence</span>
                          </div>
                          <div className="font-mono text-white">{ioc.value}</div>
                          <div className="text-sm text-gray-400 mt-1">{ioc.threat_type}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="cyber-card">
                    <h4 className="text-lg font-semibold text-white mb-4">Security Recommendations</h4>
                    <div className="space-y-2">
                      {intelligence.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg"
                        >
                          <span className="text-blue-400 mt-1">•</span>
                          <span className="text-white">{rec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default WebsiteScanner 