import { useState } from 'react'
import { getStagesByCategory, getCategoryColor } from '../data/pipelineData'

function Sidebar({ stages, selectedStage, onStageClick, pipelineStatus, onAIClick }) {
  const [expandedCategories, setExpandedCategories] = useState({
    'Pre-CI': true,
    'CI': true,
    'DevSecOps': true,
    'CD': true,
    'Post-Deploy': true
  })

  const categories = getStagesByCategory()

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const getStatusColor = (stageId) => {
    const status = pipelineStatus[stageId]
    if (status === 'success') return 'text-devops-green'
    if (status === 'failed') return 'text-devops-red'
    if (status === 'pending') return 'text-devops-yellow'
    return 'text-gray-400'
  }

  const getStatusIcon = (stageId) => {
    const status = pipelineStatus[stageId]
    if (status === 'success') return '✓'
    if (status === 'failed') return '✗'
    if (status === 'pending') return '⟳'
    return '○'
  }

  const getStageNumber = (stage) => {
    return stages.findIndex(s => s.id === stage.id) + 1
  }

  return (
    <aside className="w-72 bg-devops-dark border-r border-devops-light-gray h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Pipeline Stages</h2>
          <button
            onClick={() => onAIClick && onAIClick()}
            className="text-xs bg-devops-blue px-3 py-1 rounded-md text-white hover:opacity-90"
          >
            AI Assistant
          </button>
        </div>
        <div className="space-y-3">
          {categories.map(({ category, stages: categoryStages }) => {
            const isExpanded = expandedCategories[category]
            const categoryColor = getCategoryColor(category)

            return (
              <div key={category} className="border border-devops-light-gray rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category)}
                  className={`w-full px-4 py-3 flex items-center justify-between ${categoryColor} border-b border-devops-light-gray hover:opacity-80 transition-opacity`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">{category}</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                      {categoryStages.length}
                    </span>
                  </div>
                  <span className="text-sm">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                </button>

                {isExpanded && (
                  <ul className="space-y-1 p-2">
                    {categoryStages.map((stage) => (
                      <li key={stage.id}>
                        <button
                          onClick={() => onStageClick(stage)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ${selectedStage?.id === stage.id
                            ? 'bg-devops-blue text-white shadow-lg'
                            : 'bg-devops-gray text-gray-300 hover:bg-devops-light-gray hover:text-white'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              <span className="text-xs font-medium text-gray-400 flex-shrink-0">
                                {getStageNumber(stage)}.
                              </span>
                              <span className="text-xs truncate">{stage.name}</span>
                            </div>
                            <span className={`text-sm flex-shrink-0 ml-2 ${getStatusColor(stage.id)}`}>
                              {getStatusIcon(stage.id)}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
