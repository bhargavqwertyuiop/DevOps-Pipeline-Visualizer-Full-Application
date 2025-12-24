function KubernetesYAML({ yaml }) {
  if (!yaml) return null

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-white mb-3">Kubernetes Deployment YAML</h4>
      <div className="code-block">
        <pre className="text-gray-300 text-sm overflow-x-auto">
          <code>{yaml}</code>
        </pre>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-devops-gray/50 p-4 rounded-lg border border-devops-light-gray">
          <h5 className="text-sm font-semibold text-devops-blue mb-2">📦 Pods</h5>
          <p className="text-xs text-gray-300">
            Pods are the smallest deployable units in Kubernetes. Each pod contains one or more containers that share storage and network resources.
          </p>
        </div>
        
        <div className="bg-devops-gray/50 p-4 rounded-lg border border-devops-light-gray">
          <h5 className="text-sm font-semibold text-devops-blue mb-2">🔗 Services</h5>
          <p className="text-xs text-gray-300">
            Services provide a stable network endpoint (IP address) to access pods. They enable load balancing and service discovery.
          </p>
        </div>
        
        <div className="bg-devops-gray/50 p-4 rounded-lg border border-devops-light-gray">
          <h5 className="text-sm font-semibold text-devops-blue mb-2">🔄 ReplicaSets</h5>
          <p className="text-xs text-gray-300">
            ReplicaSets ensure a specified number of pod replicas are running at all times. They automatically replace failed pods.
          </p>
        </div>
        
        <div className="bg-devops-gray/50 p-4 rounded-lg border border-devops-light-gray">
          <h5 className="text-sm font-semibold text-devops-blue mb-2">📈 HPA (Horizontal Pod Autoscaler)</h5>
          <p className="text-xs text-gray-300">
            HPA automatically scales the number of pods based on CPU/memory usage or custom metrics to handle varying load.
          </p>
        </div>
      </div>
    </div>
  )
}

export default KubernetesYAML

