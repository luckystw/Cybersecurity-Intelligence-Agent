import { motion } from 'framer-motion'
import AgentGrid from './AgentGrid'
import ThreatMap from './ThreatMap'
import SystemHealth from './SystemHealth'

const Dashboard = ({ systemData }) => {
  return (
    <div className="pt-20 min-h-screen bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Security Intelligence Dashboard</h1>
          <p className="text-gray-400">Real-time monitoring and AI-powered threat analysis</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Active Agents', value: systemData?.agents?.agents?.length || 0, color: 'bg-green-500' },
            { label: 'Active Threats', value: systemData?.threats?.threats?.filter(t => t.status === 'investigating').length || 0, color: 'bg-red-500' },
            { label: 'System Health', value: systemData?.health?.status === 'healthy' ? '100%' : '75%', color: 'bg-blue-500' },
            { label: 'Tasks Completed', value: systemData?.agents?.agents?.reduce((sum, agent) => sum + agent.tasksCompleted, 0) || 0, color: 'bg-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="cyber-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Agents Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <AgentGrid agents={systemData?.agents?.agents || []} />
          </motion.div>

          {/* System Health Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SystemHealth health={systemData?.health} />
          </motion.div>
        </div>

        {/* Threat Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <ThreatMap threats={systemData?.threats?.threats || []} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <div className="cyber-card">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { time: '2 minutes ago', action: 'Threat Detector identified new malware variant', type: 'threat' },
                { time: '5 minutes ago', action: 'Vulnerability Analyzer completed security scan', type: 'scan' },
                { time: '10 minutes ago', action: 'Incident Responder mitigated phishing attempt', type: 'response' },
                { time: '15 minutes ago', action: 'Intelligence Gatherer updated threat database', type: 'intel' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-white/5"
                >
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'threat' ? 'bg-red-500' :
                    activity.type === 'scan' ? 'bg-blue-500' :
                    activity.type === 'response' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard 