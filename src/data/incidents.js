// Incident dataset for Incident Simulator
export const incidents = [
    {
        id: 'INC-001',
        title: 'Kubernetes Pod CrashLoopBackOff',
        severity: 'High',
        affectedStage: 'Deploy to AKS',
        environment: 'Prod',
        symptoms: ['Pods repeatedly restart', 'Service unavailable intermittently'],
        logs: [
            'Error: failed to start app: cannot allocate memory',
            'panic: runtime error: invalid memory address',
            'kubelet: Back-off restarting failed container'
        ],
        timeline: [
            { t: '00:00', event: 'Deploy started' },
            { t: '00:45', event: 'Pods created' },
            { t: '01:00', event: 'Pods CrashLoopBackOff observed' }
        ],
        rootCause: 'Application memory leak causing OOM and repeated restarts',
        resolutionSteps: [
            'Scale replicas temporarily to reduce load',
            'Inspect logs to identify leak path',
            'Fix memory leak in application and redeploy',
            'Apply resource limits/requests in Pod spec'
        ],
        preventionSteps: ['Add memory requests/limits', 'Use liveness/readiness probes', 'Add monitoring for memory trends']
    },

    {
        id: 'INC-002',
        title: 'CI/CD Pipeline Failure - Unit Tests',
        severity: 'Medium',
        affectedStage: 'Unit Testing',
        environment: 'QA',
        symptoms: ['Build fails on unit test stage', 'New commit blocks pipeline'],
        logs: ['ERROR: Test failed: should create user', 'AssertionError: expected 200 to equal 201'],
        timeline: [
            { t: '00:00', event: 'Commit pushed' },
            { t: '00:05', event: 'Build started' },
            { t: '00:10', event: 'Unit tests failed' }
        ],
        rootCause: 'Breaking change in API that updated expected response codes',
        resolutionSteps: ['Revert commit or fix tests', 'Coordinate with feature owner', 'Add test coverage for edge case'],
        preventionSteps: ['Run tests locally before push', 'Add CI gate for PRs', 'Improve test assertions']
    },

    {
        id: 'INC-003',
        title: 'Docker Image Vulnerability Detected',
        severity: 'Low',
        affectedStage: 'Container Security Scan',
        environment: 'Dev',
        symptoms: ['Image scan flags high-severity CVE'],
        logs: ['trivy: HIGH CVE-2023-XXXXX in openssl'],
        timeline: [{ t: '00:00', event: 'Image built' }, { t: '00:02', event: 'Trivy scan' }],
        rootCause: 'Outdated base image with known CVE',
        resolutionSteps: ['Update base image', 'Rebuild image', 'Rescan and promote'],
        preventionSteps: ['Pin base image versions', 'Scheduled vulnerability scans']
    },

    {
        id: 'INC-004',
        title: 'Application Downtime - 502 Bad Gateway',
        severity: 'High',
        affectedStage: 'Ingress & Traffic Management',
        environment: 'Prod',
        symptoms: ['Users see 502 responses', 'Grafana alert: 502 spike'],
        logs: ['nginx: 502 Bad Gateway while connecting to upstream', 'upstream prematurely closed connection'],
        timeline: [{ t: '00:00', event: 'Traffic spike' }, { t: '00:10', event: '502s observed' }],
        rootCause: 'Backend pods overwhelmed, failed to accept connections',
        resolutionSteps: ['Scale backend replicas', 'Investigate slow downstream dependency', 'Increase readiness probe timeouts'],
        preventionSteps: ['Autoscaling policies', 'Circuit breakers and timeouts']
    },

    {
        id: 'INC-005',
        title: 'High CPU Usage',
        severity: 'Medium',
        affectedStage: 'Monitoring',
        environment: 'Prod',
        symptoms: ['CPU > 90% on several replicas', 'Slower response times'],
        logs: ['worker: processing backlog', 'goroutine count increasing'],
        timeline: [{ t: '00:00', event: 'Traffic increase' }, { t: '00:20', event: 'CPU alert' }],
        rootCause: 'Inefficient query causing CPU spike',
        resolutionSteps: ['Rollback problematic release', 'Optimize query', 'Scale replicas'],
        preventionSteps: ['Load testing', 'Query profiling in CI']
    },

    {
        id: 'INC-006',
        title: 'Autoscaling Failure (HPA not triggering)',
        severity: 'High',
        affectedStage: 'Autoscaling (HPA)',
        environment: 'Prod',
        symptoms: ['HPA shows desired replicas > current replicas', 'Pods not scaling up'],
        logs: ['kube-controller-manager: failed to scale deployment'],
        timeline: [{ t: '00:00', event: 'Traffic surge' }, { t: '00:15', event: 'HPA did not scale' }],
        rootCause: 'Metrics server misconfigured; HPA lacked metrics',
        resolutionSteps: ['Fix metrics-server', 'Force scale as stop-gap', 'Validate HPA config'],
        preventionSteps: ['Alert on metrics pipeline', 'Test HPA in staging']
    },

    {
        id: 'INC-007',
        title: 'Misconfigured Ingress - SSL Termination Error',
        severity: 'Medium',
        affectedStage: 'Ingress & Traffic Management',
        environment: 'QA',
        symptoms: ['SSL handshake errors', 'Some clients cannot connect'],
        logs: ['tls: handshake failure', 'ingress controller: invalid TLS secret'],
        timeline: [{ t: '00:00', event: 'Cert renewal' }, { t: '00:05', event: 'Ingress reload' }],
        rootCause: 'Invalid TLS secret (expired certificate)',
        resolutionSteps: ['Update TLS secret', 'Reload ingress controller'],
        preventionSteps: ['Automate certificate renewals', 'Monitor TTL for certs']
    },

    {
        id: 'INC-008',
        title: 'Database Connection Failure',
        severity: 'Critical',
        affectedStage: 'Deploy to AKS',
        environment: 'Prod',
        symptoms: ['App cannot connect to DB', 'Errors: connection refused'],
        logs: ['dial tcp 10.0.0.5:5432: connect: connection refused', 'db: connection pool exhausted'],
        timeline: [{ t: '00:00', event: 'DB failover' }, { t: '00:02', event: 'App errors spike' }],
        rootCause: 'Primary DB outage and misconfigured retry/backoff in app',
        resolutionSteps: ['Failover DB to replica', 'Gradually restart app pool', 'Implement backoff and retries'],
        preventionSteps: ['Multi-AZ DB', 'DB connection pool tuning']
    }
]

export function getIncidentById(id) {
    return incidents.find(i => i.id === id)
}
