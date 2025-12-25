import { useState } from 'react'
import { sendAIQuery } from '../ai/aiService'

// Lightweight SRE assistant that will call `sendAIQuery` when an API key
// is configured; otherwise it falls back to a simple mock heuristic.
function SREChat({ incident }) {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    const addMessage = (role, text) => setMessages(m => [...m, { role, text }])

    const ask = async (text) => {
        if (!text || !text.trim()) return
        addMessage('user', text)
        setInput('')

        const apiKey = typeof import.meta !== 'undefined' ? import.meta.env.VITE_OPENAI_API_KEY : null

        if (apiKey) {
            // show a thinking placeholder and replace it with the real answer
            setMessages(prev => [...prev, { role: 'ai', text: 'AI is analyzing the incident...' }])
            const incidentDetails = `Incident details:\n- Type: ${incident.title}\n- Affected Stage: ${incident.affectedStage}\n- Environment: ${incident.environment}\n- Symptoms: ${incident.symptoms.join('; ')}\n- Logs:\n${incident.logs.join('\n')}`
            const prompt = `You are a Senior Site Reliability Engineer.\nAn incident has occurred.\n${incidentDetails}\nUser question: ${text}\n\nTask: 1) Analyze the issue 2) Identify root cause 3) Suggest step-by-step resolution 4) Explain prevention 5) Explain like teaching a DevOps fresher 6) Ask follow-up diagnostic questions.`

            try {
                const resp = await sendAIQuery({ prompt, mode: 'incident', question: text, stageContext: null })
                const answer = resp?.answer || 'ERROR: No response from AI.'
                setMessages(prev => [...prev.slice(0, -1), { role: 'ai', text: answer }])
            } catch (e) {
                setMessages(prev => [...prev.slice(0, -1), { role: 'ai', text: `ERROR: ${e?.message || e}` }])
            }
        } else {
            // fallback mock heuristic
            const lower = text.toLowerCase()
            if (lower.includes('root') || lower.includes('cause')) {
                addMessage('ai', `Root cause (quick): ${incident.rootCause}`)
            } else if (lower.includes('fix') || lower.includes('resolve')) {
                addMessage('ai', `Suggested steps:\n- ${incident.resolutionSteps.join('\n- ')}\nUse these steps interactively and validate each change.`)
            } else if (lower.includes('prevent') || lower.includes('avoid')) {
                addMessage('ai', `Prevention: ${incident.preventionSteps.join('; ')}`)
            } else if (lower.includes('explain') || lower.includes('what') || lower.includes('why')) {
                addMessage('ai', `Explanation: ${incident.rootCause}. Symptoms include ${incident.symptoms.join(', ')}. Start with checking logs and timeline.`)
            } else if (lower.includes('question') || lower.includes('ask')) {
                addMessage('ai', `Interview Q: Explain how you would triage this incident step-by-step.`)
            } else {
                addMessage('ai', `Start diagnostics:\n1) Check logs in the Log Viewer.\n2) Check timeline for recent changes.\n3) Run quick checks (pod status, metrics, DB connections).\nAsk me to 'show root cause', 'show fix', or 'show prevention'.`)
            }
        }
    }

    return (
        <div>
            <div className="mb-2 text-sm text-gray-300">SRE Assistant — {typeof import.meta !== 'undefined' && import.meta.env.VITE_OPENAI_API_KEY ? 'AI mode' : 'Mock mode'}</div>
            <div className="h-44 bg-black/40 rounded p-3 overflow-auto mb-3 font-mono text-sm text-gray-200">
                {messages.length === 0 && (
                    <div className="text-gray-400">Ask the SRE assistant questions like "What is the root cause?" or "How to fix?"</div>
                )}
                {messages.map((m, i) => {
                    const isUser = m.role === 'user'
                    const isError = !isUser && typeof m.text === 'string' && m.text.startsWith('ERROR:')
                    return (
                        <div key={i} className={`mb-2 ${isUser ? 'text-devops-blue' : (isError ? 'text-red-300' : 'text-gray-200')}`}>
                            <div className="text-xs text-gray-400">{m.role}</div>
                            <div className={`whitespace-pre-wrap break-words ${isError ? 'font-semibold' : ''}`}>{m.text}</div>
                        </div>
                    )
                })}
            </div>

            <div className="flex items-center gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && ask(input)} placeholder="Ask the SRE assistant..." className="flex-1 bg-devops-gray rounded px-3 py-2 text-sm text-gray-200" />
                <button onClick={() => ask(input)} className="px-3 py-2 bg-devops-blue text-white rounded">Send</button>
                <button onClick={() => { addMessage('ai', `Guided RCA:\nRoot Cause: ${incident.rootCause}\nSteps:\n- ${incident.resolutionSteps.join('\n- ')}\nPrevention:\n- ${incident.preventionSteps.join('\n- ')}`) }} className="px-3 py-2 bg-gray-700 text-white rounded">Auto RCA</button>
            </div>
        </div>
    )
}

export default SREChat
