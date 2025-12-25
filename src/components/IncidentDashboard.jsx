import { useState } from 'react'
import { incidents } from '../data/incidents'
import IncidentDetails from './IncidentDetails'
import SREChat from './SREChat'

function IncidentDashboard() {
    const [selected, setSelected] = useState(incidents[0])

    return (
        <div className="p-4 sm:p-6 h-full flex flex-col">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Incident Simulator & SRE Command Center</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-auto">
                <div className="lg:col-span-1 bg-devops-dark border border-devops-light-gray rounded p-4 overflow-y-auto min-h-[40vh] lg:min-h-0">
                    <h3 className="text-sm text-gray-300 mb-3">Available Incidents</h3>
                    <ul className="space-y-2">
                        {incidents.map(inc => (
                            <li key={inc.id}>
                                <button onClick={() => setSelected(inc)} className={`w-full text-left px-3 py-2 rounded ${selected?.id === inc.id ? 'bg-devops-blue text-white' : 'bg-devops-gray text-gray-200 hover:bg-devops-light-gray'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium truncate">{inc.title}</div>
                                            <div className="text-xs text-gray-400">{inc.environment} • {inc.affectedStage}</div>
                                        </div>
                                        <div className="text-xs px-2 py-0.5 rounded bg-white/5">{inc.severity}</div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <IncidentDetails incident={selected} />

                    <div className="bg-devops-dark border border-devops-light-gray rounded p-4">
                        <SREChat incident={selected} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncidentDashboard
