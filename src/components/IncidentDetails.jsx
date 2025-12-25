import LogViewer from './LogViewer'
import Timeline from './Timeline'

function IncidentDetails({ incident }) {
    if (!incident) return null
    const exportRCA = () => {
        const html = `
            <html><head><title>RCA - ${incident.id}</title>
                <style>body{font-family:Arial,Helvetica,sans-serif;background:#0b1220;color:#111; padding:20px;} h1{color:#222} pre{background:#f6f6f6;padding:12px;border-radius:6px}</style>
            </head><body>
                <h1>RCA - ${incident.title}</h1>
                <p><strong>Incident ID:</strong> ${incident.id}</p>
                <p><strong>Severity:</strong> ${incident.severity}</p>
                <p><strong>Environment:</strong> ${incident.environment}</p>
                <h2>Root Cause</h2>
                <p>${incident.rootCause}</p>
                <h2>Resolution Steps</h2>
                <ol>${incident.resolutionSteps.map(s => `<li>${s}</li>`).join('')}</ol>
                <h2>Prevention</h2>
                <ol>${incident.preventionSteps.map(s => `<li>${s}</li>`).join('')}</ol>
            </body></html>
        `
        const w = window.open('', '_blank')
        if (!w) return alert('Popup blocked. Allow popups to export PDF.')
        w.document.write(html)
        w.document.close()
        w.focus()
        // Give the new window a moment to render then call print()
        setTimeout(() => w.print(), 400)
    }

    return (
        <div className="bg-devops-dark border border-devops-light-gray rounded p-4">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                    <div className="text-xs text-gray-400">{incident.environment} • {incident.affectedStage}</div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="text-sm px-2 py-1 rounded bg-white/5">Severity: {incident.severity}</div>
                    <button onClick={exportRCA} className="text-xs px-2 py-1 rounded bg-devops-blue text-white">Export RCA</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <h4 className="text-sm text-gray-300 mb-2">Symptoms</h4>
                    <ul className="list-disc ml-5 text-gray-200 mb-4">
                        {incident.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>

                    <h4 className="text-sm text-gray-300 mb-2">Logs</h4>
                    <LogViewer logs={incident.logs} />
                </div>

                <div>
                    <h4 className="text-sm text-gray-300 mb-2">Timeline</h4>
                    <Timeline events={incident.timeline} />

                    <h4 className="text-sm text-gray-300 mt-4 mb-2">Impact</h4>
                    <div className="text-sm text-gray-200">Service disruption for affected users; could impact SLAs.</div>

                    <h4 className="text-sm text-gray-300 mt-4 mb-2">Quick RCA</h4>
                    <div className="text-sm text-gray-200">{incident.rootCause}</div>
                </div>
            </div>
        </div>
    )
}

export default IncidentDetails
