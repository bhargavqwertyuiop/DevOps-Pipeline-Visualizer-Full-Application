import KubernetesYAML from './KubernetesYAML'
import MonitoringCharts from './MonitoringCharts'
import { getCategoryColor } from '../data/pipelineData'

function StageDetails({ stage, pipelineStatus }) {
  if (!stage) {
    return (
      <div className="p-6 bg-devops-dark border-t border-devops-light-gray">
        <p className="text-gray-400 text-center">Select a pipeline stage to view details</p>
      </div>
    )
  }

  const status = pipelineStatus[stage.id] || stage.status
  const statusColors = {
    success: 'bg-devops-green text-white',
    failed: 'bg-devops-red text-white',
    pending: 'bg-devops-yellow text-black',
  }

  const categoryColor = stage.category ? getCategoryColor(stage.category) : 'bg-gray-500/20 text-gray-400 border-gray-500/30'

  return (
    <div className="p-4 sm:p-6 bg-devops-dark border-t border-devops-light-gray flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full px-2 sm:px-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl sm:text-2xl font-bold text-white">{stage.name}</h3>
            {stage.category && (
              <span className={`px-3 py-1 rounded-md text-xs font-semibold border ${categoryColor}`}>
                {stage.category}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {stage.executionTime && (
              <span className="text-sm text-gray-400">
                ⏱️ {stage.executionTime}s
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-600 text-white'
              }`}>
              {status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 leading-relaxed mb-3">{stage.description}</p>
          {stage.whatHappens && (
            <div className="bg-devops-gray/50 p-4 rounded-lg border border-devops-light-gray">
              <h4 className="text-sm font-semibold text-devops-blue mb-2">What Happens:</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{stage.whatHappens}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Tools Used</h4>
          <div className="flex flex-wrap gap-2">
            {stage.toolsUsed.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-devops-blue/20 text-devops-blue rounded-md text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {stage.sampleCommands && stage.sampleCommands.length > 0 && (
          <div className="mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Sample Commands</h4>
            <div className="code-block overflow-auto">
              <pre className="text-gray-300">
                {stage.sampleCommands.map((cmd, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-devops-green">$</span> {cmd}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        )}

        {stage.expectedOutput && (
          <div className="mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Expected Output</h4>
            <div className="code-block overflow-auto">
              <pre className="text-gray-300 whitespace-pre-wrap">{stage.expectedOutput}</pre>
            </div>
          </div>
        )}

        {stage.sampleLogs && stage.sampleLogs.length > 0 && (
          <div className="mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Sample Logs</h4>
            <div className="terminal overflow-auto">
              {stage.sampleLogs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special handling for AKS stage - Show Kubernetes YAML */}
        {stage.id === 'deploy-aks' && stage.kubernetesYaml && (
          <KubernetesYAML yaml={stage.kubernetesYaml} />
        )}

        {/* Special handling for Monitoring stage - Show Charts */}
        {stage.id === 'monitoring' && stage.metrics && (
          <MonitoringCharts metrics={stage.metrics} />
        )}

        {/* Security Impact Section */}
        {stage.securityImpact && (
          <div className="mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3">🔒 Security Impact</h4>
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <p className="text-sm text-gray-300 leading-relaxed">{stage.securityImpact}</p>
            </div>
          </div>
        )}

        {/* Interview Tips Section */}
        {stage.interviewTips && (
          <div className="mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3">💡 Interview Tips</h4>
            <div className="bg-devops-blue/10 border border-devops-blue/30 p-4 rounded-lg">
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{stage.interviewTips}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StageDetails

