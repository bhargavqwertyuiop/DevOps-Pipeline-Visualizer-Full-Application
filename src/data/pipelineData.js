// DevSecOps Pipeline Configuration Data
// This file contains all pipeline stages with detailed information
// Each stage represents a step in an enterprise-grade DevSecOps CI/CD pipeline
// Stages are organized by category: Pre-CI, CI, DevSecOps, CD, Post-Deploy

export const pipelineData = [
  // ========== PRE-CI ==========
  {
    id: 'code-commit',
    name: 'Code Commit & Branching',
    category: 'Pre-CI',
    description: 'Developer pushes code changes to the Git repository using feature branches. This stage involves creating pull requests (PRs) and code reviews before merging to main branch. Modern teams use GitFlow or Trunk-based development strategies.',
    whatHappens: 'When a developer commits code to a feature branch and opens a PR, the CI/CD system is notified. Code review processes ensure quality before code enters the main pipeline. Branch protection rules prevent direct commits to main/master branches, enforcing peer review.',
    toolsUsed: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
    sampleCommands: [
      'git checkout -b feature/new-feature',
      'git add .',
      'git commit -m "feat: add new feature"',
      'git push origin feature/new-feature',
      'gh pr create --title "Add new feature" --body "Description"'
    ],
    expectedOutput: '✓ Branch created: feature/new-feature\n✓ PR #123 opened\n✓ Code review requested',
    sampleLogs: [
      '[INFO] Receiving commit notification',
      '[INFO] Branch: feature/new-feature',
      '[INFO] Commit: a1b2c3d4',
      '[INFO] Author: developer@company.com',
      '[INFO] PR #123 opened',
      '[INFO] Code review required: 2 approvals',
      '[SUCCESS] Ready for CI pipeline'
    ],
    executionTime: 2,
    status: 'pending',
    securityImpact: 'Low - Initial code entry point. Branch protection and code reviews prevent malicious code.',
    interviewTips: 'Explain GitFlow vs Trunk-based development. Mention branch protection, PR templates, and code review best practices. Discuss how this stage integrates with CI/CD triggers.'
  },
  {
    id: 'static-analysis',
    name: 'Static Code Analysis',
    category: 'Pre-CI',
    description: 'Static code analysis tools scan source code without executing it to find bugs, code smells, security vulnerabilities, and maintainability issues. SonarQube is a popular tool that provides quality gates that can fail the pipeline if thresholds are not met.',
    whatHappens: 'SonarQube analyzes the codebase for code quality metrics, security vulnerabilities, and technical debt. It checks against predefined quality gates (coverage thresholds, code smells, security hotspots). If quality gates fail, the pipeline stops, preventing low-quality code from progressing.',
    toolsUsed: ['SonarQube', 'SonarLint', 'ESLint', 'Checkstyle'],
    sampleCommands: [
      'sonar-scanner -Dsonar.projectKey=myapp',
      'mvn sonar:sonar',
      'sonar-scanner -Dsonar.login=token'
    ],
    expectedOutput: 'Quality Gate: PASSED\nBugs: 0\nCode Smells: 3\nSecurity Hotspots: 1\nCoverage: 85%',
    sampleLogs: [
      '[INFO] Starting SonarQube analysis...',
      '[INFO] Analyzing 127 source files',
      '[INFO] Detecting code smells...',
      '[INFO] Scanning for security vulnerabilities...',
      '[INFO] Bugs: 0',
      '[INFO] Code Smells: 3 (minor)',
      '[INFO] Security Hotspots: 1 (low severity)',
      '[INFO] Code Coverage: 85%',
      '[SUCCESS] Quality Gate: PASSED'
    ],
    executionTime: 45,
    status: 'pending',
    securityImpact: 'High - Identifies security vulnerabilities early. Prevents common security issues like SQL injection, XSS, and insecure dependencies.',
    interviewTips: 'Explain quality gates, technical debt, and how static analysis fits into shift-left security. Mention SonarQube metrics: reliability, security, maintainability ratings. Discuss false positives and how to handle them.'
  },

  // ========== CI ==========
  {
    id: 'build',
    name: 'Build',
    category: 'CI',
    description: 'The build stage compiles source code and packages it into executable artifacts. Build tools like Maven or Gradle download dependencies, compile code, run static analysis, and create distributable packages (JAR, WAR, etc.). This is where compilation errors are caught early.',
    whatHappens: 'Maven/Gradle downloads all project dependencies from repositories, compiles source code, runs static analysis plugins, and packages the application into an artifact. Build caching optimizes subsequent builds. Failed builds stop the pipeline immediately.',
    toolsUsed: ['Maven', 'Gradle', 'Java', 'JDK', 'npm', 'yarn'],
    sampleCommands: [
      'mvn clean install',
      'mvn package -DskipTests',
      'gradle build',
      'npm run build'
    ],
    expectedOutput: 'BUILD SUCCESS\nTotal time: 45.234 s\nArtifact: target/app-1.0.0.jar',
    sampleLogs: [
      '[INFO] Scanning for projects...',
      '[INFO] Downloading dependencies...',
      '[INFO] Resolved 127 dependencies',
      '[INFO] Compiling 127 source files',
      '[INFO] Building jar: target/app-1.0.0.jar',
      '[INFO] Artifact size: 15.2 MB',
      '[SUCCESS] BUILD SUCCESS'
    ],
    executionTime: 45,
    status: 'pending',
    securityImpact: 'Medium - Build process can be compromised if dependencies are malicious. Dependency verification and signed artifacts mitigate risks.',
    interviewTips: 'Explain build caching, incremental builds, and dependency resolution. Discuss build optimization strategies. Mention how build failures are handled and reported.'
  },
  {
    id: 'unit-test',
    name: 'Unit Testing',
    category: 'CI',
    description: 'Automated unit tests verify individual components work correctly in isolation. JUnit and Mockito are standard tools for Java applications. Test coverage metrics ensure adequate testing. The fail-fast strategy stops the pipeline if any test fails.',
    whatHappens: 'Test runners execute all unit tests in parallel where possible. Mock frameworks isolate units under test. Coverage tools measure code coverage. If coverage falls below threshold or tests fail, the pipeline stops. Test results are published for visibility.',
    toolsUsed: ['JUnit', 'Mockito', 'Maven Surefire', 'JaCoCo', 'Jest', 'Jasmine'],
    sampleCommands: [
      'mvn test',
      'mvn verify',
      'mvn test -Dtest=UserServiceTest',
      'npm test'
    ],
    expectedOutput: 'Tests run: 127, Failures: 0, Errors: 0\nCoverage: 85%',
    sampleLogs: [
      '[INFO] Running test suite...',
      '[INFO] Running com.example.UserServiceTest',
      '[INFO] ✓ testCreateUser (0.023s)',
      '[INFO] ✓ testUpdateUser (0.015s)',
      '[INFO] Running com.example.OrderServiceTest',
      '[INFO] ✓ testCreateOrder (0.031s)',
      '[INFO] Tests run: 127, Failures: 0',
      '[INFO] Code Coverage: 85%',
      '[SUCCESS] All tests passed'
    ],
    executionTime: 30,
    status: 'pending',
    securityImpact: 'Low - Tests verify functionality but don\'t directly address security. Security-focused unit tests can test authentication/authorization logic.',
    interviewTips: 'Explain test pyramid, mocking strategies, and test coverage goals. Discuss parallel test execution and test optimization. Mention TDD (Test-Driven Development) and its benefits.'
  },

  // ========== DEVSECOPS ==========
  {
    id: 'dependency-scan',
    name: 'Dependency & License Scan',
    category: 'DevSecOps',
    description: 'OWASP Dependency-Check scans project dependencies for known vulnerabilities (CVEs) and license compliance issues. This prevents vulnerable libraries from entering production. The scan checks against vulnerability databases like NVD (National Vulnerability Database).',
    whatHappens: 'Dependency-Check analyzes all project dependencies (JARs, npm packages, etc.) against CVE databases. It identifies known vulnerabilities, their severity (Critical, High, Medium, Low), and suggests updates. License scanning ensures compliance with organizational policies. Critical vulnerabilities can fail the pipeline.',
    toolsUsed: ['OWASP Dependency-Check', 'Snyk', 'WhiteSource', 'FOSSA'],
    sampleCommands: [
      'dependency-check.sh --project myapp --scan target',
      'mvn org.owasp:dependency-check-maven:check',
      'snyk test',
      'npm audit'
    ],
    expectedOutput: 'Vulnerabilities found: 2 (1 High, 1 Medium)\nLicense issues: 0\nRecommendations: Update library-x to v2.0.0',
    sampleLogs: [
      '[INFO] Starting dependency scan...',
      '[INFO] Analyzing 127 dependencies',
      '[INFO] Checking against CVE database...',
      '[WARN] CVE-2023-1234: High severity in library-x v1.0.0',
      '[WARN] CVE-2023-5678: Medium severity in library-y v2.1.0',
      '[INFO] License scan: All licenses compliant',
      '[INFO] Recommendations: Update library-x to v2.0.0',
      '[SUCCESS] Scan completed (2 vulnerabilities, none critical)'
    ],
    executionTime: 60,
    status: 'pending',
    securityImpact: 'Critical - Prevents vulnerable dependencies from reaching production. Essential for supply chain security. Identifies CVEs before they become security incidents.',
    interviewTips: 'Explain CVE databases, CVSS scores, and vulnerability prioritization. Discuss automated dependency updates and patch management. Mention Software Bill of Materials (SBOM) and supply chain security.'
  },
  {
    id: 'docker-build',
    name: 'Docker Image Build',
    category: 'DevSecOps',
    description: 'The application is packaged into a Docker container image using a Dockerfile. Multi-stage builds optimize image size and security by separating build and runtime environments. This creates a portable, consistent runtime environment.',
    whatHappens: 'Docker reads the Dockerfile and builds the image layer by layer. Multi-stage builds use a builder stage for compilation and a smaller runtime stage. Each layer is cached for faster subsequent builds. The final image contains only runtime dependencies, reducing attack surface.',
    toolsUsed: ['Docker', 'Dockerfile', 'BuildKit'],
    sampleCommands: [
      'docker build -t myapp:latest .',
      'docker build --target runtime -t myapp:prod .',
      'docker images | grep myapp'
    ],
    expectedOutput: 'Successfully built abc123def456\nSuccessfully tagged myapp:latest\nImage size: 234MB',
    sampleLogs: [
      '[INFO] Building Docker image...',
      '[INFO] Step 1/8 : FROM maven:3.8-openjdk-17 AS builder',
      '[INFO] Step 2/8 : COPY pom.xml .',
      '[INFO] Step 3/8 : RUN mvn dependency:go-offline',
      '[INFO] Step 4/8 : COPY src ./src',
      '[INFO] Step 5/8 : RUN mvn package',
      '[INFO] Step 6/8 : FROM openjdk:17-jre-slim',
      '[INFO] Step 7/8 : COPY --from=builder target/app.jar /app.jar',
      '[INFO] Step 8/8 : EXPOSE 8080',
      '[INFO] Successfully built abc123def456',
      '[SUCCESS] Image tagged: myapp:latest (234MB)'
    ],
    executionTime: 90,
    status: 'pending',
    securityImpact: 'High - Container security starts here. Multi-stage builds reduce attack surface. Non-root users and minimal base images improve security posture.',
    interviewTips: 'Explain multi-stage builds, layer caching, and image optimization. Discuss distroless/minimal base images. Mention Docker best practices: non-root users, minimal layers, and security scanning.'
  },
  {
    id: 'container-scan',
    name: 'Container Security Scan',
    category: 'DevSecOps',
    description: 'Container images are scanned for vulnerabilities using tools like Trivy or Aqua Security. These tools check the image layers against vulnerability databases and can block images with critical or high-severity vulnerabilities from being pushed to registries.',
    whatHappens: 'Trivy scans all layers of the Docker image, including the base image and installed packages. It identifies CVEs, misconfigurations, and secrets. Severity-based policies can fail the pipeline if critical vulnerabilities are found. Results are reported with remediation guidance.',
    toolsUsed: ['Trivy', 'Aqua Security', 'Clair', 'Twistlock'],
    sampleCommands: [
      'trivy image myapp:latest',
      'trivy image --severity HIGH,CRITICAL myapp:latest',
      'trivy image --exit-code 1 myapp:latest'
    ],
    expectedOutput: 'Total: 5 (CRITICAL: 1, HIGH: 2, MEDIUM: 2)\nVulnerabilities found in base image',
    sampleLogs: [
      '[INFO] Scanning container image...',
      '[INFO] Analyzing image layers...',
      '[WARN] CVE-2023-1234: CRITICAL in base image (openjdk:17-jre-slim)',
      '[WARN] CVE-2023-5678: HIGH in package libssl1.1',
      '[WARN] CVE-2023-9012: HIGH in package libc6',
      '[INFO] Total: 5 vulnerabilities',
      '[INFO] CRITICAL: 1, HIGH: 2, MEDIUM: 2',
      '[ERROR] Pipeline failed: Critical vulnerability detected',
      '[INFO] Recommendation: Update base image to openjdk:17-jre-slim:latest'
    ],
    executionTime: 45,
    status: 'pending',
    securityImpact: 'Critical - Prevents vulnerable container images from reaching production. Essential for runtime security. Identifies vulnerabilities in base images and installed packages.',
    interviewTips: 'Explain image layer scanning, base image vulnerabilities, and severity-based policies. Discuss how to handle false positives and vulnerability triage. Mention continuous scanning in registries.'
  },
  {
    id: 'push-registry',
    name: 'Push to Container Registry',
    category: 'DevSecOps',
    description: 'The scanned and approved Docker image is pushed to a container registry (Azure Container Registry, Docker Hub, etc.). Images are tagged with version numbers and SHA digests for immutability. Registry policies can enforce security requirements.',
    whatHappens: 'The image is tagged with version (v1.0.0) and SHA digest for immutability. It\'s pushed to the registry where it undergoes additional scanning. Registry policies may enforce signing, scanning, and retention policies. The image becomes available for deployment.',
    toolsUsed: ['Azure Container Registry', 'Docker Hub', 'Harbor', 'AWS ECR'],
    sampleCommands: [
      'docker tag myapp:latest acr.azurecr.io/myapp:v1.0.0',
      'docker tag myapp:latest acr.azurecr.io/myapp:sha-abc123',
      'docker push acr.azurecr.io/myapp:v1.0.0',
      'az acr repository show-tags --name myregistry --repository myapp'
    ],
    expectedOutput: 'v1.0.0: digest: sha256:abc123... size: 234MB\nImage pushed successfully',
    sampleLogs: [
      '[INFO] Logging in to Azure Container Registry...',
      '[INFO] Tagging image: myapp:v1.0.0',
      '[INFO] Tagging image: myapp:sha-abc123def456',
      '[INFO] Pushing image to registry...',
      '[INFO] v1.0.0: Pushed',
      '[INFO] digest: sha256:abc123def456...',
      '[INFO] Image signed and verified',
      '[SUCCESS] Image pushed successfully to acr.azurecr.io'
    ],
    executionTime: 120,
    status: 'pending',
    securityImpact: 'High - Registry security policies enforce image signing, scanning, and access controls. Immutable tags prevent tampering. Registry scanning provides additional security layer.',
    interviewTips: 'Explain image tagging strategies (semantic versioning, SHA digests), registry security policies, and image signing. Discuss registry access controls and retention policies.'
  },

  // ========== CD ==========
  {
    id: 'infra-provision',
    name: 'Infrastructure Provisioning',
    category: 'CD',
    description: 'Infrastructure as Code (IaC) tools like Terraform provision cloud infrastructure before deployment. This stage creates or updates AKS clusters, networking, storage, and other resources needed for the application. IaC ensures consistency and repeatability.',
    whatHappens: 'Terraform reads infrastructure definitions and creates/updates cloud resources. It maintains state to track infrastructure changes. This stage provisions AKS clusters, VNets, load balancers, and storage accounts. Infrastructure changes are version-controlled and reviewed.',
    toolsUsed: ['Terraform', 'Azure Resource Manager', 'Pulumi', 'Ansible'],
    sampleCommands: [
      'terraform init',
      'terraform plan',
      'terraform apply -auto-approve',
      'az aks create --resource-group myrg --name myaks'
    ],
    expectedOutput: 'Apply complete! Resources: 5 added, 0 changed, 0 destroyed.\nAKS cluster: myaks created',
    sampleLogs: [
      '[INFO] Initializing Terraform...',
      '[INFO] Planning infrastructure changes...',
      '[INFO] Creating AKS cluster: myaks',
      '[INFO] Creating resource group: myrg',
      '[INFO] Creating virtual network...',
      '[INFO] Creating load balancer...',
      '[INFO] Apply complete! Resources: 5 added',
      '[SUCCESS] Infrastructure provisioned successfully'
    ],
    executionTime: 600,
    status: 'pending',
    securityImpact: 'High - Infrastructure security is critical. Network policies, RBAC, and encryption must be configured correctly. IaC enables security-as-code practices.',
    interviewTips: 'Explain Infrastructure as Code benefits, Terraform state management, and infrastructure versioning. Discuss cloud security best practices: network segmentation, encryption, and access controls.'
  },
  {
    id: 'deploy-aks',
    name: 'Deploy to AKS',
    category: 'CD',
    description: 'The containerized application is deployed to Azure Kubernetes Service (AKS). Kubernetes creates Pods (containers), Services (network endpoints), ReplicaSets (ensures desired number of pods), and ConfigMaps/Secrets. Rolling updates allow zero-downtime deployments.',
    whatHappens: 'Kubectl applies Kubernetes manifests (Deployments, Services, ConfigMaps). Kubernetes scheduler places pods on nodes. Services provide stable network endpoints. ReplicaSets ensure desired replica count. Rolling updates gradually replace old pods with new ones, maintaining availability.',
    toolsUsed: ['Kubernetes', 'Azure Kubernetes Service (AKS)', 'kubectl', 'Helm'],
    sampleCommands: [
      'kubectl apply -f deployment.yaml',
      'kubectl get pods',
      'kubectl get services',
      'kubectl rollout status deployment/myapp'
    ],
    expectedOutput: 'deployment.apps/myapp created\nservice/myapp created\nRollout complete: 2/2 pods ready',
    sampleLogs: [
      '[INFO] Applying Kubernetes manifests...',
      '[INFO] Creating Deployment: myapp',
      '[INFO] Creating Service: myapp-service',
      '[INFO] Creating ConfigMap: myapp-config',
      '[INFO] Waiting for pods to be ready...',
      '[INFO] Pod myapp-7d8f9c6b4-abc123: Running',
      '[INFO] Pod myapp-7d8f9c6b4-def456: Running',
      '[INFO] Rolling update: 2/2 pods updated',
      '[SUCCESS] Deployment successful - 2/2 pods ready'
    ],
    executionTime: 180,
    status: 'pending',
    securityImpact: 'High - Kubernetes security involves RBAC, network policies, pod security policies, and secrets management. Proper configuration prevents unauthorized access and data breaches.',
    interviewTips: 'Explain Kubernetes objects (Pods, Services, Deployments, ReplicaSets), rolling updates, and rollback strategies. Discuss RBAC, network policies, and secrets management. Mention Helm for package management.',
    kubernetesYaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: acr.azurecr.io/myapp:v1.0.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: myapp`
  },
  {
    id: 'autoscaling',
    name: 'Autoscaling',
    category: 'CD',
    description: 'Horizontal Pod Autoscaler (HPA) automatically scales the number of pods based on CPU, memory, or custom metrics. This ensures applications can handle varying load while optimizing resource costs. HPA monitors metrics and adjusts replica count within defined min/max bounds.',
    whatHappens: 'HPA continuously monitors pod metrics (CPU, memory, custom metrics). When metrics exceed thresholds, HPA increases replica count. When metrics drop, it scales down. Scaling decisions are made based on target utilization (e.g., 70% CPU). Metrics are provided by Metrics Server or Prometheus.',
    toolsUsed: ['Kubernetes HPA', 'Metrics Server', 'Prometheus Adapter', 'KEDA'],
    sampleCommands: [
      'kubectl apply -f hpa.yaml',
      'kubectl get hpa',
      'kubectl describe hpa myapp-hpa',
      'kubectl get pods -w'
    ],
    expectedOutput: 'horizontalpodautoscaler.autoscaling/myapp-hpa created\nCurrent replicas: 2\nDesired replicas: 3',
    sampleLogs: [
      '[INFO] Creating HPA: myapp-hpa',
      '[INFO] Min replicas: 2, Max replicas: 10',
      '[INFO] Target CPU utilization: 70%',
      '[INFO] Monitoring pod metrics...',
      '[INFO] Current CPU: 85% (above threshold)',
      '[INFO] Scaling up: 2 -> 3 replicas',
      '[INFO] New pod myapp-xyz789: Pending -> Running',
      '[SUCCESS] Autoscaling active: 3/3 pods'
    ],
    executionTime: 30,
    status: 'pending',
    securityImpact: 'Low - Autoscaling itself doesn\'t introduce security risks, but scaling events should be monitored. Ensure scaled pods follow security policies.',
    interviewTips: 'Explain HPA concepts, metrics sources (CPU, memory, custom), and scaling algorithms. Discuss vertical vs horizontal scaling, and when to use each. Mention KEDA for event-driven autoscaling.'
  },
  {
    id: 'ingress',
    name: 'Ingress & Traffic Management',
    category: 'CD',
    description: 'NGINX Ingress Controller manages external access to services in the cluster. It provides TLS termination, path-based routing, load balancing, and SSL/TLS certificates. Ingress resources define routing rules and enable external access to internal services.',
    whatHappens: 'Ingress Controller watches for Ingress resources and configures NGINX accordingly. It terminates TLS/SSL, routes traffic based on hostnames and paths, and provides load balancing. Cert-manager can automatically provision SSL certificates from Let\'s Encrypt.',
    toolsUsed: ['NGINX Ingress Controller', 'Cert-Manager', 'Let\'s Encrypt', 'Istio'],
    sampleCommands: [
      'kubectl apply -f ingress.yaml',
      'kubectl get ingress',
      'kubectl describe ingress myapp-ingress',
      'curl https://myapp.example.com'
    ],
    expectedOutput: 'ingress.networking.k8s.io/myapp-ingress created\nTLS certificate: Issued\nExternal IP: 20.123.45.67',
    sampleLogs: [
      '[INFO] Creating Ingress: myapp-ingress',
      '[INFO] Configuring NGINX Ingress Controller...',
      '[INFO] Requesting TLS certificate from Let\'s Encrypt...',
      '[INFO] Certificate issued: myapp.example.com',
      '[INFO] Configuring routing rules...',
      '[INFO] Path: / -> Service: myapp-service:80',
      '[INFO] External IP: 20.123.45.67',
      '[SUCCESS] Ingress configured: https://myapp.example.com'
    ],
    executionTime: 60,
    status: 'pending',
    securityImpact: 'High - Ingress is the entry point to applications. TLS termination, WAF rules, and rate limiting are critical security features. Proper certificate management prevents MITM attacks.',
    interviewTips: 'Explain Ingress vs LoadBalancer vs NodePort, TLS termination, and certificate management. Discuss path-based routing, host-based routing, and canary deployments via Ingress. Mention service mesh (Istio) for advanced traffic management.'
  },

  // ========== POST-DEPLOY ==========
  {
    id: 'monitoring',
    name: 'Monitoring',
    category: 'Post-Deploy',
    description: 'Prometheus scrapes metrics from applications and infrastructure at regular intervals. Grafana visualizes these metrics in dashboards. Metrics include CPU, memory, request rates, error rates, and custom business metrics. This enables proactive issue detection.',
    whatHappens: 'Prometheus scrapes metrics endpoints (e.g., /metrics) from pods using ServiceMonitor resources. Metrics are stored as time-series data. Grafana queries Prometheus to display dashboards. AlertManager evaluates alert rules and sends notifications when thresholds are exceeded.',
    toolsUsed: ['Prometheus', 'Grafana', 'AlertManager', 'ServiceMonitor'],
    sampleCommands: [
      'kubectl get pods -n monitoring',
      'curl http://prometheus:9090/api/v1/query?query=cpu_usage',
      'kubectl port-forward svc/grafana 3000:80'
    ],
    expectedOutput: 'CPU Usage: 45%\nMemory Usage: 320MB / 512MB\nRequest Rate: 120 req/s\nError Rate: 0.1%',
    sampleLogs: [
      '[INFO] Prometheus scraping metrics...',
      '[INFO] Scraping 15 targets',
      '[INFO] Grafana dashboard updated',
      '[INFO] CPU Usage: 45%',
      '[INFO] Memory Usage: 320MB / 512MB (62.5%)',
      '[INFO] Request Rate: 120 req/s',
      '[INFO] Error Rate: 0.1%',
      '[INFO] Response Time (p95): 145ms',
      '[SUCCESS] All metrics within thresholds'
    ],
    executionTime: 5,
    status: 'pending',
    securityImpact: 'Medium - Monitoring helps detect security incidents (unusual traffic, resource exhaustion attacks). However, metrics endpoints should be secured to prevent information leakage.',
    interviewTips: 'Explain Prometheus scraping model, metrics types (counter, gauge, histogram), and PromQL. Discuss Grafana dashboard creation and alerting. Mention Service Level Objectives (SLOs) and Service Level Indicators (SLIs).',
    metrics: {
      cpu: 45,
      memory: 62.5,
      requests: 120,
      errors: 0.1
    }
  },
  {
    id: 'logging',
    name: 'Centralized Logging',
    category: 'Post-Deploy',
    description: 'The ELK Stack (Elasticsearch, Logstash, Kibana) aggregates logs from all application pods and infrastructure components. Logs are collected, parsed, indexed, and made searchable. This enables troubleshooting, security auditing, and compliance reporting.',
    whatHappens: 'Fluentd or Filebeat agents running as DaemonSets collect logs from all pods. Logs are forwarded to Logstash for parsing and enrichment, then stored in Elasticsearch. Kibana provides search and visualization. Log retention policies manage storage costs.',
    toolsUsed: ['ELK Stack', 'Fluentd', 'Filebeat', 'Loki', 'Splunk'],
    sampleCommands: [
      'kubectl logs -f deployment/myapp',
      'curl http://elasticsearch:9200/_search?q=error',
      'kubectl port-forward svc/kibana 5601:5601'
    ],
    expectedOutput: 'Logs indexed: 1,234,567\nSearch results: 45 matches\nLog retention: 30 days',
    sampleLogs: [
      '[INFO] Collecting logs from pods...',
      '[INFO] Fluentd agents running on 3 nodes',
      '[INFO] Parsing log entries...',
      '[INFO] Indexing logs to Elasticsearch...',
      '[INFO] Logs indexed: 1,234,567 entries',
      '[INFO] Kibana dashboard updated',
      '[INFO] Search query: "error" -> 45 matches',
      '[SUCCESS] Centralized logging operational'
    ],
    executionTime: 10,
    status: 'pending',
    securityImpact: 'High - Logs contain sensitive information. Proper log encryption, access controls, and retention policies are essential. Log analysis helps detect security incidents and compliance violations.',
    interviewTips: 'Explain log aggregation architecture, log parsing and enrichment, and search capabilities. Discuss log retention policies and storage optimization. Mention log-based security monitoring and SIEM integration.'
  },
  {
    id: 'alerts',
    name: 'Alerts & Incident Response',
    category: 'Post-Deploy',
    description: 'AlertManager evaluates alert rules and routes notifications to appropriate channels (email, Slack, PagerDuty). Alerts are based on metrics thresholds, log patterns, or health checks. SLA (Service Level Agreement) and SLO (Service Level Objective) concepts ensure service reliability.',
    whatHappens: 'Prometheus alert rules evaluate metrics continuously. When conditions are met, alerts are sent to AlertManager. AlertManager routes alerts based on severity and routing rules. On-call engineers receive notifications. Incident response procedures are triggered for critical alerts.',
    toolsUsed: ['AlertManager', 'PagerDuty', 'Slack', 'Microsoft Teams', 'Opsgenie'],
    sampleCommands: [
      'kubectl get prometheusrules',
      'kubectl describe alertmanager main',
      'curl http://alertmanager:9093/api/v1/alerts'
    ],
    expectedOutput: 'Active alerts: 2\nCritical: 1 (High CPU)\nWarning: 1 (High Memory)\nNotifications sent: 2',
    sampleLogs: [
      '[INFO] Evaluating alert rules...',
      '[ALERT] High CPU Usage: CPU > 80% for 5 minutes',
      '[ALERT] High Memory Usage: Memory > 85% for 10 minutes',
      '[INFO] Routing alerts to on-call team...',
      '[INFO] Slack notification sent: #alerts',
      '[INFO] PagerDuty incident created: INC-1234',
      '[INFO] Email sent to: devops-team@company.com',
      '[SUCCESS] Alerts processed: 2 active, 0 resolved'
    ],
    executionTime: 5,
    status: 'pending',
    securityImpact: 'High - Security alerts detect attacks, breaches, and anomalies. Proper alert routing ensures rapid response. False positive management prevents alert fatigue.',
    interviewTips: 'Explain alerting best practices: alert fatigue, severity levels, and routing. Discuss SLA vs SLO vs SLI. Mention on-call rotations, runbooks, and incident response procedures. Explain how to reduce false positives.'
  },
  {
    id: 'rollback',
    name: 'Rollback & Recovery',
    category: 'Post-Deploy',
    description: 'When deployments cause issues, rollback mechanisms quickly revert to previous working versions. Kubernetes supports automatic and manual rollbacks. Blue-Green and Canary deployment strategies minimize risk. Recovery procedures restore service availability.',
    whatHappens: 'Kubernetes maintains deployment history. Rollback commands revert to previous ReplicaSet. Blue-Green deployments switch traffic between two identical environments. Canary deployments gradually route traffic to new version. Automated rollback triggers on health check failures.',
    toolsUsed: ['Kubernetes', 'ArgoCD', 'Flux', 'Spinnaker'],
    sampleCommands: [
      'kubectl rollout undo deployment/myapp',
      'kubectl rollout history deployment/myapp',
      'kubectl rollout status deployment/myapp',
      'argocd app rollback myapp'
    ],
    expectedOutput: 'Rollback complete\nPrevious version: v1.0.0\nCurrent version: v0.9.0\nPods: 2/2 ready',
    sampleLogs: [
      '[INFO] Health check failed: /health endpoint returning 500',
      '[INFO] Initiating automatic rollback...',
      '[INFO] Rolling back to previous ReplicaSet...',
      '[INFO] Scaling down new pods...',
      '[INFO] Scaling up previous pods...',
      '[INFO] Previous version: v0.9.0',
      '[INFO] Pods: 2/2 ready',
      '[INFO] Health check: PASSED',
      '[SUCCESS] Rollback complete - service restored'
    ],
    executionTime: 120,
    status: 'pending',
    securityImpact: 'High - Rollback capabilities are essential for security patches. Quick rollback minimizes exposure window for vulnerabilities. Recovery procedures ensure business continuity.',
    interviewTips: 'Explain rollback strategies, deployment history, and automatic vs manual rollbacks. Discuss Blue-Green vs Canary deployments and when to use each. Mention GitOps tools (ArgoCD, Flux) for declarative rollbacks.'
  }
]

// Helper function to get stages by category
export const getStagesByCategory = () => {
  const categories = ['Pre-CI', 'CI', 'DevSecOps', 'CD', 'Post-Deploy']
  return categories.map(category => ({
    category,
    stages: pipelineData.filter(stage => stage.category === category)
  }))
}

// Helper function to get category color
export const getCategoryColor = (category) => {
  const colors = {
    'Pre-CI': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'CI': 'bg-green-500/20 text-green-400 border-green-500/30',
    'DevSecOps': 'bg-red-500/20 text-red-400 border-red-500/30',
    'CD': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Post-Deploy': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }
  return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}
