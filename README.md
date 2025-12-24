# DevSecOps Pipeline Visualizer

A production-quality web application that visually and interactively explains an enterprise-grade DevSecOps CI/CD pipeline used in real-world companies. This comprehensive tool demonstrates the complete software delivery lifecycle with security integrated at every stage.

![DevSecOps Pipeline Visualizer](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff) ![DevSecOps](https://img.shields.io/badge/DevSecOps-Enterprise-orange)

## 🎯 Project Overview

This application provides an interactive, educational visualization of a complete **enterprise DevSecOps pipeline**. It's designed to help developers, DevOps engineers, and security professionals understand:

- How enterprise CI/CD pipelines work with security integrated
- What happens at each stage of the pipeline
- Security considerations at every stage (shift-left security)
- Tools and technologies used in modern DevSecOps practices
- Kubernetes (AKS) deployment and infrastructure concepts
- Monitoring, logging, and incident response
- Interview preparation for DevOps/DevSecOps roles

## ✨ Features

### 🚀 Pipeline Visualization
- **Interactive Pipeline Flow**: Horizontal card-based visualization with 16 connected stages
- **Category Grouping**: Stages organized into Pre-CI, CI, DevSecOps, CD, and Post-Deploy
- **Collapsible Sidebar**: Navigate stages by category with expandable groups
- **Stage-by-Stage Execution**: Simulate complete pipeline runs with realistic timing
- **Status Indicators**: Visual feedback for success, failure, and pending states
- **Click-to-Explore**: Click any stage to view detailed information

### 📊 Pipeline Stages (16 Stages)

#### 🔵 Pre-CI (2 Stages)
1. **Code Commit & Branching**
   - Git workflow (GitFlow vs Trunk-based)
   - Pull requests and code reviews
   - Branch protection rules

2. **Static Code Analysis**
   - SonarQube quality gates
   - Code smells and security hotspots
   - Quality threshold enforcement

#### 🟢 CI (2 Stages)
3. **Build**
   - Maven/Gradle compilation
   - Dependency resolution
   - Artifact generation

4. **Unit Testing**
   - JUnit/Mockito testing
   - Test coverage metrics
   - Fail-fast strategy

#### 🔴 DevSecOps (4 Stages)
5. **Dependency & License Scan**
   - OWASP Dependency-Check
   - CVE detection and remediation
   - License compliance

6. **Docker Image Build**
   - Multi-stage Dockerfile
   - Image optimization
   - Security best practices

7. **Container Security Scan**
   - Trivy/Aqua scanning
   - Vulnerability severity blocking
   - Base image security

8. **Push to Container Registry**
   - Azure Container Registry
   - Image signing and immutability
   - Registry security policies

#### 🟣 CD (4 Stages)
9. **Infrastructure Provisioning**
   - Terraform IaC
   - AKS cluster creation
   - Infrastructure as Code

10. **Deploy to AKS**
    - Kubernetes deployments
    - Pods, Services, ReplicaSets
    - Rolling updates
    - Live YAML display

11. **Autoscaling**
    - Horizontal Pod Autoscaler (HPA)
    - CPU/Memory-based scaling
    - Metrics Server integration

12. **Ingress & Traffic Management**
    - NGINX Ingress Controller
    - TLS termination
    - Path-based routing

#### 🟡 Post-Deploy (4 Stages)
13. **Monitoring**
    - Prometheus metrics scraping
    - Grafana dashboards
    - Real-time charts (CPU, Memory, Requests, Errors)
    - Alert configuration

14. **Centralized Logging**
    - ELK Stack (Elasticsearch, Logstash, Kibana)
    - Log aggregation and search
    - Fluentd/Filebeat collection

15. **Alerts & Incident Response**
    - AlertManager routing
    - SLA/SLO concepts
    - On-call notifications
    - PagerDuty integration

16. **Rollback & Recovery**
    - Kubernetes rollback strategies
    - Blue-Green deployments
    - Canary deployments
    - Automated recovery

### 🎨 UI/UX Features

- **Dark Theme**: Professional DevOps dashboard look
- **Category-Based Navigation**: Collapsible sidebar with stage groups
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions
- **Terminal-Style Logs**: Authentic log display
- **Code Syntax Highlighting**: Readable code blocks
- **Interactive Charts**: Chart.js-powered visualizations
- **Security Impact Indicators**: Highlight security considerations
- **Interview Tips**: Stage-specific interview preparation guidance

### 🔒 Security Features

- **Shift-Left Security**: Security integrated at every stage
- **Vulnerability Scanning**: Dependency and container scanning
- **Security Impact Analysis**: Each stage shows security implications
- **Compliance**: License scanning and policy enforcement
- **Security Best Practices**: Built-in security guidance

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **Vite 5.0.8** - Build tool and dev server
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **JavaScript (ES6+)** - Programming language (no TypeScript)

### Visualization
- **Chart.js 4.4.0** - Chart library
- **react-chartjs-2 5.2.0** - React wrapper for Chart.js
- Custom SVG arrows for pipeline connections

### Data
- Static JSON-driven configuration
- No backend required
- Fully client-side application

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm (or yarn/pnpm)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devsecops-pipeline-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
devsecops-pipeline-visualizer/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation bar
│   │   ├── Sidebar.jsx          # Collapsible category-based stage list
│   │   ├── PipelineView.jsx     # Main pipeline visualization
│   │   ├── StageDetails.jsx     # Detailed stage information panel
│   │   ├── KubernetesYAML.jsx   # AKS YAML display component
│   │   └── MonitoringCharts.jsx # Prometheus/Grafana charts
│   ├── data/
│   │   └── pipelineData.js      # Complete DevSecOps pipeline configuration
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles and Tailwind directives
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── netlify.toml                # Netlify deployment config
└── README.md                   # This file
```

## 🌐 Deployment

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Option A: Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Option B: Connect your Git repository to Netlify
   - Option C: Use Netlify CLI
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=dist
     ```

### Azure Static Web Apps Deployment

1. **Install Azure Static Web Apps CLI**
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   swa deploy dist --deployment-token <your-token>
   ```

   Or use GitHub Actions with the Azure Static Web Apps workflow.

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## 🎓 Learning Resources

This project demonstrates real-world DevSecOps concepts:

### CI/CD Concepts
- Continuous Integration (CI)
- Continuous Deployment (CD)
- Pipeline automation
- Build automation
- Test automation

### Security (DevSecOps)
- Shift-left security
- Static code analysis
- Dependency vulnerability scanning
- Container security scanning
- Security policy enforcement
- Compliance and licensing

### Containerization
- Docker containers
- Multi-stage builds
- Container registries
- Image versioning and signing
- Security best practices

### Kubernetes (AKS)
- Pods and containers
- Services and networking
- ReplicaSets and scaling
- Deployments and rollouts
- Horizontal Pod Autoscaler (HPA)
- Ingress and traffic management
- Resource management

### Infrastructure as Code (IaC)
- Terraform
- Infrastructure versioning
- Cloud resource provisioning
- Infrastructure security

### Monitoring & Observability
- Metrics collection (Prometheus)
- Visualization (Grafana)
- Centralized logging (ELK Stack)
- Alerting and incident response
- SLA/SLO/SLI concepts
- Performance monitoring

### Deployment Strategies
- Rolling updates
- Blue-Green deployments
- Canary deployments
- Rollback and recovery

## 💡 Usage Tips

1. **Explore by Category**: Use the collapsible sidebar to navigate stages by category
2. **Run Pipeline**: Click "Run Pipeline" to simulate a complete pipeline execution
3. **View Details**: Click any stage to view:
   - Description and what happens
   - Tools used
   - Sample commands
   - Expected outputs
   - Sample logs
   - Security impact
   - Interview tips
4. **AKS Stage**: Special Kubernetes YAML display with explanations
5. **Monitoring Stage**: Interactive charts showing real-time metrics
6. **Security Focus**: Each stage includes security impact analysis

## 🤖 AI Interview Assistant

- Frontend-only AI assistant for DevSecOps interview practice
- Modes: General Q&A, Stage-specific explanations, Interview coach (architecture supports follow-ups)
- Default: Mock AI responses (no backend) via `src/ai/aiService.js`
- Easily pluggable to OpenAI / Azure OpenAI by replacing the implementation in `src/ai/aiService.js`
 
Usage: open the `AI Assistant` from the sidebar to ask stage-aware questions. The assistant receives stage context (name, category, tools) so answers are contextual and interview-ready.

Using a real OpenAI key (optional):

- Create a `.env` file at the project root and add:

```
VITE_OPENAI_API_KEY=sk-<your-key-here>
```

- Restart the dev server (`npm run dev`). The app reads `VITE_OPENAI_API_KEY` at build time and will call OpenAI's Chat Completions API when present.
- If no key is provided the assistant uses a safe mock response for offline/demo use.

Security note: adding API keys to `.env` is fine for local development but do NOT commit secrets to source control. For production, use a backend proxy that keeps secrets on the server side.

## 🎯 Interview Preparation

This project is perfect for:
- **DevSecOps Engineer Interviews**: Demonstrates security integration
- **DevOps Engineer Interviews**: Shows complete CI/CD pipeline knowledge
- **Kubernetes Interviews**: Displays K8s concepts and deployments
- **Security Engineer Interviews**: Illustrates shift-left security practices
- **SRE Interviews**: Demonstrates monitoring, alerting, and incident response
- **System Design Discussions**: Shows end-to-end system architecture

### Key Talking Points

- **DevSecOps Pipeline Design**: Explain the 16-stage pipeline and security integration
- **Shift-Left Security**: Discuss security at every stage
- **Container Security**: Explain scanning, signing, and registry policies
- **Kubernetes Deployment**: Explain Pods, Services, ReplicaSets, HPA, and Ingress
- **Infrastructure as Code**: Discuss Terraform and IaC benefits
- **Monitoring & Observability**: Explain Prometheus, Grafana, ELK Stack
- **Incident Response**: Discuss alerting, SLA/SLO, and rollback strategies
- **Deployment Strategies**: Explain rolling updates, blue-green, and canary

## 🤝 Contributing

This is a portfolio/educational project. Feel free to:
- Fork the repository
- Add more pipeline stages
- Enhance visualizations
- Improve documentation
- Add more security tools
- Enhance monitoring capabilities

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a comprehensive DevSecOps pipeline visualization tool for learning and interview preparation.

## 🙏 Acknowledgments

- Inspired by real-world enterprise DevSecOps pipelines
- Uses industry-standard tools and practices
- Designed for educational and professional development
- Security best practices from OWASP and industry leaders

---

**Ready to explore enterprise DevSecOps pipelines?** Start the development server and click through the stages to learn how modern software delivery works with security integrated at every step!
