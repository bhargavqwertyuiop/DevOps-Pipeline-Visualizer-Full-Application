import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import PipelineView from './components/PipelineView'
import StageDetails from './components/StageDetails'
import AIChat from './components/AIChat'
import { pipelineData } from './data/pipelineData'
import IncidentDashboard from './components/IncidentDashboard'

function App() {
  const [selectedStage, setSelectedStage] = useState(null)
  const [pipelineStatus, setPipelineStatus] = useState({})
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
  const [isIncidentOpen, setIsIncidentOpen] = useState(false)

  useEffect(() => {
    const handler = () => setIsIncidentOpen(true)
    window.addEventListener('open-incidents', handler)
    return () => window.removeEventListener('open-incidents', handler)
  }, [])

  return (
    <div className="h-screen bg-devops-darker flex flex-col overflow-hidden">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(v => !v)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          stages={pipelineData}
          selectedStage={selectedStage}
          onStageClick={handleStageClick}
          onAIClick={toggleAIPanel}
          pipelineStatus={pipelineStatus}
          mobileOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
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

        {/* Incident Simulator Modal/drawer */}
        {isIncidentOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl h-[90vh]">
              <div className="bg-devops-darker border border-devops-light-gray rounded-lg overflow-hidden h-full flex flex-col">
                <div className="flex items-center justify-between p-3 border-b border-devops-light-gray">
                  <div className="text-white font-semibold">Incident Simulator</div>
                  <div>
                    <button onClick={() => setIsIncidentOpen(false)} className="text-sm text-gray-400 px-3 py-1">Close</button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto">
                  <IncidentDashboard />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

