const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Cybersecurity Intelligence Agent API',
    status: 'running',
    version: '1.0.0'
  });
});

// Agent status endpoint
app.get('/api/agents/status', (req, res) => {
  res.json({
    agents: [
      {
        id: 'threat-detector',
        name: 'Threat Detector',
        status: 'active',
        lastActivity: new Date().toISOString(),
        tasksCompleted: 156,
        currentTask: 'Scanning network for vulnerabilities'
      },
      {
        id: 'vulnerability-analyzer',
        name: 'Vulnerability Analyzer',
        status: 'active',
        lastActivity: new Date().toISOString(),
        tasksCompleted: 89,
        currentTask: 'Analyzing recent security patches'
      },
      {
        id: 'incident-responder',
        name: 'Incident Responder',
        status: 'standby',
        lastActivity: new Date().toISOString(),
        tasksCompleted: 23,
        currentTask: 'Monitoring for security incidents'
      },
      {
        id: 'intelligence-gatherer',
        name: 'Intelligence Gatherer',
        status: 'active',
        lastActivity: new Date().toISOString(),
        tasksCompleted: 234,
        currentTask: 'Collecting threat intelligence data'
      },
      {
        id: 'website-scanner',
        name: 'Website Scanner',
        status: 'active',
        lastActivity: new Date().toISOString(),
        tasksCompleted: 67,
        currentTask: 'Scanning websites for vulnerabilities'
      }
    ]
  });
});

// Threat intelligence endpoint
app.get('/api/threats', (req, res) => {
  res.json({
    threats: [
      {
        id: 'threat-001',
        type: 'malware',
        severity: 'high',
        description: 'New ransomware variant detected',
        timestamp: new Date().toISOString(),
        source: 'external',
        status: 'investigating'
      },
      {
        id: 'threat-002',
        type: 'phishing',
        severity: 'medium',
        description: 'Suspicious email campaign targeting employees',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        source: 'internal',
        status: 'mitigated'
      },
      {
        id: 'threat-003',
        type: 'vulnerability',
        severity: 'critical',
        description: 'Zero-day vulnerability in web application',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        source: 'scan',
        status: 'patched'
      }
    ]
  });
});

// System health endpoint
app.get('/api/system/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
      ai_agents: 'active',
      threat_intelligence: 'operational',
      monitoring: 'active',
      website_scanner: 'operational'
    }
  });
});

// Website vulnerability scanner endpoint
app.post('/api/scan/website', (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Simulate scanning process
  setTimeout(() => {
    const vulnerabilities = [
      {
        id: 'vuln-001',
        type: 'XSS',
        severity: 'high',
        description: 'Cross-site scripting vulnerability detected in form input',
        location: '/contact',
        cve: 'CVE-2023-1234',
        risk_score: 8.5,
        recommendation: 'Implement input validation and output encoding'
      },
      {
        id: 'vuln-002',
        type: 'SQL Injection',
        severity: 'critical',
        description: 'SQL injection vulnerability in search functionality',
        location: '/search',
        cve: 'CVE-2023-5678',
        risk_score: 9.2,
        recommendation: 'Use parameterized queries and input sanitization'
      },
      {
        id: 'vuln-003',
        type: 'Outdated SSL',
        severity: 'medium',
        description: 'SSL/TLS configuration uses outdated protocols',
        location: 'SSL/TLS',
        cve: 'CVE-2023-9012',
        risk_score: 6.8,
        recommendation: 'Update to TLS 1.3 and disable older protocols'
      }
    ];

    const scanResult = {
      url: url,
      scanId: `scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'completed',
      vulnerabilities: vulnerabilities,
      summary: {
        total_vulnerabilities: vulnerabilities.length,
        critical: vulnerabilities.filter(v => v.severity === 'critical').length,
        high: vulnerabilities.filter(v => v.severity === 'high').length,
        medium: vulnerabilities.filter(v => v.severity === 'medium').length,
        low: vulnerabilities.filter(v => v.severity === 'low').length
      }
    };

    res.json(scanResult);
  }, 3000); // Simulate 3-second scan
});

// Real-time attack monitoring endpoint
app.get('/api/monitor/attacks', (req, res) => {
  const attacks = [
    {
      id: 'attack-001',
      type: 'DDoS',
      source: '192.168.1.100',
      target: 'example.com',
      timestamp: new Date().toISOString(),
      severity: 'high',
      status: 'blocked',
      details: 'Distributed denial of service attack detected and mitigated'
    },
    {
      id: 'attack-002',
      type: 'Brute Force',
      source: '203.0.113.45',
      target: 'admin panel',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      severity: 'medium',
      status: 'monitoring',
      details: 'Multiple failed login attempts detected'
    },
    {
      id: 'attack-003',
      type: 'SQL Injection Attempt',
      source: '198.51.100.23',
      target: 'search endpoint',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      severity: 'high',
      status: 'blocked',
      details: 'Malicious SQL query attempt blocked by WAF'
    }
  ];

  res.json({ attacks });
});

// Real-time intelligence endpoint
app.get('/api/intelligence/realtime', (req, res) => {
  const intelligence = {
    timestamp: new Date().toISOString(),
    threat_level: 'medium',
    active_threats: 3,
    recent_incidents: [
      {
        id: 'incident-001',
        type: 'Phishing Campaign',
        description: 'New phishing campaign targeting financial institutions',
        severity: 'high',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'incident-002',
        type: 'Ransomware',
        description: 'New ransomware variant spreading via email attachments',
        severity: 'critical',
        timestamp: new Date(Date.now() - 7200000).toISOString()
      }
    ],
    ioc_indicators: [
      {
        type: 'IP Address',
        value: '203.0.113.45',
        threat_type: 'malware',
        confidence: 85
      },
      {
        type: 'Domain',
        value: 'malicious-site.com',
        threat_type: 'phishing',
        confidence: 92
      }
    ],
    recommendations: [
      'Update firewall rules to block suspicious IP addresses',
      'Implement additional email security measures',
      'Review and update incident response procedures'
    ]
  };

  res.json(intelligence);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Cybersecurity Intelligence Agent API running on port ${PORT}`);
  console.log(`📊 Dashboard available at: http://localhost:${PORT}`);
}); 