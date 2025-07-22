import { motion } from 'framer-motion'

const Header = ({ onViewChange, currentView }) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyber-blue to-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CyberShield</h1>
              <p className="text-xs text-gray-400">AI Intelligence System</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewChange('landing')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === 'landing' 
                  ? 'bg-cyber-blue text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewChange('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-cyber-blue text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Dashboard
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewChange('scanner')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === 'scanner' 
                  ? 'bg-cyber-blue text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Website Scanner
            </motion.button>
          </nav>

          {/* Status Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">System Online</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header 