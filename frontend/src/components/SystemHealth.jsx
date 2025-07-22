import { motion } from 'framer-motion'

const SystemHealth = ({ health }) => {
  const getHealthColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getHealthIcon = (status) => {
    switch (status) {
      case 'healthy': return '🟢'
      case 'warning': return '🟡'
      case 'error': return '🔴'
      default: return '⚪'
    }
  }

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const formatMemory = (bytes) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">System Health</h3>
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl"
          >
            {getHealthIcon(health?.status || 'unknown')}
          </motion.div>
          <span className={`font-semibold ${getHealthColor(health?.status || 'unknown')}`}>
            {health?.status?.toUpperCase() || 'UNKNOWN'}
          </span>
        </div>
      </div>

      {/* System Metrics */}
      <div className="space-y-4">
        {/* Uptime */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">System Uptime</span>
            <span className="text-white font-semibold">
              {health?.uptime ? formatUptime(health.uptime) : 'N/A'}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "95%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Memory Usage</span>
            <span className="text-white font-semibold">
              {health?.memory ? formatMemory(health.memory.heapUsed) : 'N/A'}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* CPU Usage */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">CPU Load</span>
            <span className="text-white font-semibold">45%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Service Status */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-white mb-3">Service Status</h4>
        <div className="space-y-2">
          {health?.services ? Object.entries(health.services).map(([service, status], index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-2 bg-white/5 rounded"
            >
              <span className="text-sm text-gray-300 capitalize">
                {service.replace('_', ' ')}
              </span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  status === 'connected' || status === 'active' || status === 'operational' 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                }`} />
                <span className={`text-xs font-semibold ${
                  status === 'connected' || status === 'active' || status === 'operational'
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}>
                  {status}
                </span>
              </div>
            </motion.div>
          )) : (
            // Fallback services
            [
              { name: 'Database', status: 'connected' },
              { name: 'AI Agents', status: 'active' },
              { name: 'Threat Intelligence', status: 'operational' },
              { name: 'Monitoring', status: 'active' }
            ].map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-2 bg-white/5 rounded"
              >
                <span className="text-sm text-gray-300">{service.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs font-semibold text-green-400">
                    {service.status}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Performance Graph */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-white mb-3">Performance Trend</h4>
        <div className="h-20 bg-white/5 rounded-lg p-3">
          <svg className="w-full h-full" viewBox="0 0 100 20">
            <motion.path
              d="M0,15 L10,12 L20,8 L30,10 L40,5 L50,7 L60,3 L70,6 L80,2 L90,4 L100,1"
              stroke="#3b82f6"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.circle
              cx="50"
              cy="7"
              r="1"
              fill="#3b82f6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            />
          </svg>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Last updated: {health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default SystemHealth 