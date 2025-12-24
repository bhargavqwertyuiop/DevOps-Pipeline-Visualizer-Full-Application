import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import PipelineView from './components/PipelineView'
import StageDetails from './components/StageDetails'
import AIChat from './components/AIChat'
import { pipelineData } from './data/pipelineData'

function App() {
  const [selectedStage, setSelectedStage] = useState(null)
  const [pipelineStatus, setPipelineStatus] = useState({})
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false)

  // Initialize with first stage selected
  useEffect(() => {
    if (pipelineData.length > 0 && !selectedStage) {
      setSelectedStage(pipelineData[0])
    }
  }, [])

  const handleStageClick = (stage) => {
    setSelectedStage(stage)
  }

  const handlePipelineStatusUpdate = (status) => {
    setPipelineStatus(status)
  }

  const toggleAIPanel = () => setIsAIPanelOpen(v => !v)

  return (
    <div className="h-screen bg-devops-darker flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          stages={pipelineData}
          selectedStage={selectedStage}
          onStageClick={handleStageClick}
          onAIClick={toggleAIPanel}
          pipelineStatus={pipelineStatus}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <PipelineView
            stages={pipelineData}
            selectedStage={selectedStage}
            onStageClick={handleStageClick}
            pipelineStatus={pipelineStatus}
            onStatusUpdate={handlePipelineStatusUpdate}
          />
          <StageDetails
            stage={selectedStage}
            pipelineStatus={pipelineStatus}
          />
        </div>
        {/* AI Assistant Panel (floating) */}
        {isAIPanelOpen && (
          <AIChat
            onClose={toggleAIPanel}
            stageContext={selectedStage}
          />
        )}
      </div>
    </div>
  )
}

export default App

