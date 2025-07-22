# 🛡️ Cybersecurity Intelligence Agent

An AI-powered cybersecurity intelligence system built with React, Node.js, CrewAI, and LangChain-Groq. This multi-agent system provides real-time threat detection, vulnerability analysis, and automated incident response with a beautiful, animated dashboard.

## ✨ Features

- **AI-Powered Threat Detection**: Real-time monitoring and analysis using multiple AI agents
- **Beautiful Animated UI**: Modern, responsive dashboard with Framer Motion animations
- **Multi-Agent System**: Coordinated AI agents for different security tasks
- **Real-Time Intelligence**: Live threat intelligence and system health monitoring
- **Interactive Threat Map**: Visual representation of security threats and their status
- **System Health Monitoring**: Comprehensive system metrics and service status

## 🏗️ Architecture

### Frontend (React + Vite)
- **React 19** with modern hooks and functional components
- **Tailwind CSS** for beautiful, responsive styling
- **Framer Motion** for smooth animations and transitions
- **Vite** for fast development and building

### Backend (Node.js + Express)
- **Express.js** REST API server
- **CrewAI** for multi-agent orchestration
- **LangChain-Groq** for AI-powered reasoning
- **CORS** enabled for frontend communication

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cybersecurity-intelligence-agent
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In backend directory, create .env file
   PORT=5000
   GROQ_API_KEY=your_groq_api_key_here
   EXA_API_KEY=your_exa_api_key_here
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎯 AI Agents

The system includes four specialized AI agents:

1. **Threat Detector** 🛡️
   - Real-time threat monitoring and identification
   - Malware and attack pattern recognition

2. **Vulnerability Analyzer** 🔍
   - Automated security scanning
   - Risk assessment and prioritization

3. **Incident Responder** ⚡
   - Automated threat response
   - Incident mitigation and containment

4. **Intelligence Gatherer** 🧠
   - Threat intelligence collection
   - Data aggregation and analysis

## 🎨 UI Components

- **Hero Section**: Animated landing page with cybersecurity theme
- **Dashboard**: Real-time monitoring dashboard with live data
- **Agent Grid**: Interactive display of AI agent status and activities
- **Threat Map**: Visual threat intelligence with animated indicators
- **System Health**: Comprehensive system metrics and performance

## 🔧 Configuration

### Backend Configuration
- Port configuration in `backend/.env`
- API key setup for Groq and Exa services
- CrewAI agent configuration

### Frontend Configuration
- Tailwind CSS custom theme in `frontend/tailwind.config.js`
- Animation settings in component files
- API endpoint configuration

## 📊 API Endpoints

- `GET /` - API status and version
- `GET /api/agents/status` - AI agent status and activities
- `GET /api/threats` - Current threat intelligence
- `GET /api/system/health` - System health and metrics

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite development server
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 🎨 Customization

### Styling
- Modify `frontend/tailwind.config.js` for theme changes
- Update `frontend/src/index.css` for custom styles
- Adjust animation parameters in component files

### AI Agents
- Configure agent behavior in `backend/agents/`
- Modify CrewAI tasks and workflows
- Add new agent types as needed

## 🔒 Security Features

- Real-time threat detection
- Automated vulnerability scanning
- Incident response automation
- Threat intelligence aggregation
- System health monitoring

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices
- Different screen sizes and orientations

## 🚀 Deployment

### Frontend Deployment
- Build the project: `npm run build`
- Deploy the `dist` folder to your hosting service
- Configure environment variables for production

### Backend Deployment
- Set up production environment variables
- Use PM2 or similar process manager
- Configure reverse proxy (nginx) if needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- CrewAI for multi-agent orchestration
- LangChain for AI framework
- Groq for fast AI inference
- Framer Motion for animations
- Tailwind CSS for styling