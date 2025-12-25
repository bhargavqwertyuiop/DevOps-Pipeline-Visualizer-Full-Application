import { useState } from 'react'
import { getCategoryColor } from '../data/pipelineData'

function PipelineView({ stages, selectedStage, onStageClick, pipelineStatus, onStatusUpdate }) {
  const [isRunning, setIsRunning] = useState(false)

  const runPipeline = async () => {
    setIsRunning(true)
    const newStatus = {}

    // Reset all statuses
    stages.forEach(stage => {
      newStatus[stage.id] = 'pending'
    })
    onStatusUpdate(newStatus)

    // Simulate pipeline execution stage by stage
    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200))

      // Randomly assign success/failure (90% success rate)
      const success = Math.random() > 0.1
      newStatus[stages[i].id] = success ? 'success' : 'failed'
      onStatusUpdate({ ...newStatus })

      // If failed, stop the pipeline
      if (!success) {
        break
      }
    }

    setIsRunning(false)
  }

  const getStatusClass = (stageId) => {
    const status = pipelineStatus[stageId]
    if (status === 'success') return 'success'
    if (status === 'failed') return 'failed'
    if (status === 'pending') return 'pending'
    return ''
  }

  return (
    <div className="p-6 flex-shrink-0 overflow-x-hidden">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Pipeline Flow</h2>
        <button
          onClick={runPipeline}
          disabled={isRunning}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${isRunning
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-devops-blue text-white hover:bg-blue-600 hover:shadow-lg'
            }`}
        >
          {isRunning ? 'Running Pipeline...' : 'Run Pipeline'}
        </button>
      </div>

      <div className="bg-devops-dark rounded-lg p-6 border border-devops-light-gray">
        <div className="flex flex-col sm:flex-row items-center overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-devops-light-gray scrollbar-track-devops-dark">
          {stages.map((stage, index) => {
            const categoryColor = stage.category ? getCategoryColor(stage.category) : ''
            const prevStage = index > 0 ? stages[index - 1] : null
            const showCategorySeparator = prevStage && prevStage.category !== stage.category

            return (
              <div key={stage.id} className="flex items-center flex-shrink-0 flex-col sm:flex-row">
                {showCategorySeparator && (
                  <div className="mx-4 flex flex-col items-center sm:items-center">
                    <div className="w-px h-12 bg-devops-light-gray hidden sm:block"></div>
                    <div className="h-6 w-px bg-devops-light-gray sm:hidden my-2"></div>
                    <span className="text-xs text-gray-500 mt-2 whitespace-nowrap">{stage.category}</span>
                  </div>
                )}
                <div
                  onClick={() => onStageClick(stage)}
                  className={`pipeline-card ${selectedStage?.id === stage.id ? 'active' : ''
                    } ${getStatusClass(stage.id)}`}
                  style={{ minWidth: '160px', maxWidth: '160px' }}
                >
                  <div className="text-center">
                    {stage.category && (
                      <div className={`text-xs px-2 py-0.5 rounded mb-2 inline-block ${categoryColor}`}>
                        {stage.category}
                      </div>
                    )}
                    <div className="text-xl font-bold text-white mb-1">
                      {index + 1}
                    </div>
                    <div className="text-xs font-semibold text-gray-200 mb-1 leading-tight">
                      {stage.name}
                    </div>
                    <div className="text-xs text-gray-400 truncate" title={stage.toolsUsed[0]}>
                      {stage.toolsUsed[0]}
                    </div>
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <div className="mx-1 flex items-center">
                    {/* Horizontal arrow on sm+, vertical arrow on mobile */}
                    <svg className={`w-8 h-1 hidden sm:block ${pipelineStatus[stage.id] === 'success'
                        ? 'text-devops-green'
                        : pipelineStatus[stage.id] === 'failed'
                          ? 'text-devops-red'
                          : pipelineStatus[stage.id] === 'pending'
                            ? 'text-devops-yellow'
                            : 'text-devops-light-gray'
                      }`} fill="currentColor" viewBox="0 0 100 10">
                      <polygon points="0,5 100,5 95,0 100,5 95,10" />
                    </svg>

                    <svg className={`w-1 h-8 block sm:hidden ${pipelineStatus[stage.id] === 'success'
                        ? 'text-devops-green'
                        : pipelineStatus[stage.id] === 'failed'
                          ? 'text-devops-red'
                          : pipelineStatus[stage.id] === 'pending'
                            ? 'text-devops-yellow'
                            : 'text-devops-light-gray'
                      }`} fill="currentColor" viewBox="0 0 10 100">
                      <polygon points="5,0 5,100 0,95 5,100 10,95" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PipelineView

