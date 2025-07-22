import { motion } from 'framer-motion'

const AgentGrid = ({ agents }) => {
  const agentIcons = {
    'threat-detector': '🛡️',
    'vulnerability-analyzer': '🔍',
    'incident-responder': '⚡',
    'intelligence-gatherer': '🧠'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'standby': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active'
      case 'standby': return 'Standby'
      case 'error': return 'Error'
      default: return 'Unknown'
    }
  }

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">AI Agents</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Live Status</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-cyber-blue/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{agentIcons[agent.id] || '🤖'}</div>
                <div>
                  <h4 className="font-semibold text-white">{agent.name}</h4>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 ${getStatusColor(agent.status)} rounded-full`}></div>
                    <span className="text-sm text-gray-400">{getStatusText(agent.status)}</span>
                  </div>
                </div>
              </div>
              
              {/* Animated activity indicator */}
              {agent.status === 'active' && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-cyber-blue rounded-full"
                />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tasks Completed:</span>
                <span className="text-white font-semibold">{agent.tasksCompleted}</span>
              </div>
              
              <div className="text-sm">
                <span className="text-gray-400">Current Task:</span>
                <p className="text-white mt-1">{agent.currentTask}</p>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last Activity:</span>
                <span className="text-white">
                  {new Date(agent.lastActivity).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Progress bar for active agents */}
            {agent.status === 'active' && (
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className="bg-cyber-blue h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Agent Network Visualization */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <h4 className="text-sm font-semibold text-white mb-3">Agent Network</h4>
        <div className="relative h-20">
          <svg className="w-full h-full" viewBox="0 0 100 20">
            {/* Connection lines */}
            <motion.path
              d="M10,10 Q30,5 50,10 T90,10"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Agent nodes */}
            {agents.map((agent, index) => (
              <motion.circle
                key={agent.id}
                cx={10 + (index * 20)}
                cy="10"
                r="1"
                fill={agent.status === 'active' ? '#3b82f6' : '#6b7280'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default AgentGrid 