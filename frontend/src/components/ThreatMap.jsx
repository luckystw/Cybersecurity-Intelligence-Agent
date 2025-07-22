import { motion } from 'framer-motion'

const ThreatMap = ({ threats }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getThreatIcon = (type) => {
    switch (type) {
      case 'malware': return '🦠'
      case 'phishing': return '🎣'
      case 'vulnerability': return '🔓'
      case 'ddos': return '🌊'
      default: return '⚠️'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating': return 'text-yellow-400'
      case 'mitigated': return 'text-green-400'
      case 'patched': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Threat Intelligence Map</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Critical</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-400">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Medium</span>
          </div>
        </div>
      </div>

      {/* Threat Visualization */}
      <div className="relative h-64 mb-6 bg-gradient-to-br from-cyber-dark to-gray-900 rounded-lg overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Animated Threat Points */}
        {threats.map((threat, index) => (
          <motion.div
            key={threat.id}
            className="absolute"
            style={{
              left: `${20 + (index * 20)}%`,
              top: `${30 + (index * 15)}%`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <motion.div
              className={`w-4 h-4 ${getSeverityColor(threat.severity)} rounded-full relative`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 border-2 border-current rounded-full"
                animate={{
                  scale: [1, 2],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M20,50 Q50,30 80,50"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M30,70 Q60,40 90,70"
            stroke="rgba(239, 68, 68, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/50 rounded-lg p-3">
          <div className="text-sm text-white font-semibold mb-2">Active Threats</div>
          <div className="text-xs text-gray-300">
            {threats.filter(t => t.status === 'investigating').length} investigating
          </div>
        </div>
      </div>

      {/* Threat List */}
      <div className="space-y-3">
        {threats.map((threat, index) => (
          <motion.div
            key={threat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="text-2xl">{getThreatIcon(threat.type)}</div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-white">{threat.description}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(threat.severity)}`}>
                  {threat.severity.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Source: {threat.source}</span>
                <span className={`font-semibold ${getStatusColor(threat.status)}`}>
                  {threat.status.charAt(0).toUpperCase() + threat.status.slice(1)}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {new Date(threat.timestamp).toLocaleString()}
              </div>
            </div>

            {/* Status indicator */}
            <div className={`w-3 h-3 rounded-full ${
              threat.status === 'investigating' ? 'bg-yellow-500 animate-pulse' :
              threat.status === 'mitigated' ? 'bg-green-500' :
              threat.status === 'patched' ? 'bg-blue-500' : 'bg-gray-500'
            }`} />
          </motion.div>
        ))}
      </div>

      {/* Threat Statistics */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: 'Total Threats', value: threats.length, color: 'text-blue-400' },
          { label: 'Investigating', value: threats.filter(t => t.status === 'investigating').length, color: 'text-yellow-400' },
          { label: 'Resolved', value: threats.filter(t => t.status !== 'investigating').length, color: 'text-green-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            className="text-center"
          >
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ThreatMap 