import { motion } from 'framer-motion'

const Hero = ({ onGetStarted }) => {
  const floatingElements = [
    { id: 1, x: 10, y: 20, delay: 0 },
    { id: 2, x: 80, y: 60, delay: 0.5 },
    { id: 3, x: 20, y: 80, delay: 1 },
    { id: 4, x: 70, y: 30, delay: 1.5 },
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 cyber-gradient">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-2 h-2 bg-cyber-blue rounded-full opacity-30"
            style={{ left: `${element.x}%`, top: `${element.y}%` }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyber-blue to-primary-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            AI-Powered
            <br />
            <span className="text-cyber-blue">Cybersecurity</span>
            <br />
            Intelligence
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Advanced threat detection, vulnerability analysis, and automated incident response 
            powered by cutting-edge AI agents and real-time intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="cyber-button text-lg px-8 py-4"
            >
              Launch Dashboard
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/scanner'}
              className="px-8 py-4 border-2 border-cyber-blue text-cyber-blue rounded-lg font-semibold hover:bg-cyber-blue hover:text-white transition-all duration-300"
            >
              Scan Website
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            {
              icon: "🛡️",
              title: "Threat Detection",
              description: "Real-time monitoring and AI-powered threat identification"
            },
            {
              icon: "🔍",
              title: "Vulnerability Analysis",
              description: "Automated scanning and risk assessment"
            },
            {
              icon: "⚡",
              title: "Incident Response",
              description: "Instant automated response to security threats"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="cyber-card text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Network Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M10,50 Q30,20 50,50 T90,50"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M10,30 Q50,10 90,30"
            stroke="rgba(16, 185, 129, 0.3)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  )
}

export default Hero 