import { useState, useRef, useEffect } from 'react'
import { sendAIQuery } from '../ai/aiService'
import { buildPrompt } from '../ai/promptBuilder'

function AIChat({ onClose, stageContext }) {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isThinking, setIsThinking] = useState(false)
    const [mode, setMode] = useState('general') // general | stage | interview
    const envKey = typeof import.meta !== 'undefined' ? import.meta.env.VITE_OPENAI_API_KEY : null
    const containerRef = useRef()

    useEffect(() => {
        containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
    }, [messages])

    const send = async (type) => {
        if (!input.trim()) return
        const userMsg = { role: 'user', text: input.trim() }
        setMessages(prev => [...prev, userMsg])
        setInput('')

        const effectiveMode = type || mode
        const prompt = buildPrompt({ mode: effectiveMode, question: userMsg.text, stageContext: effectiveMode === 'stage' ? stageContext : null })
        setIsThinking(true)

        const aiResp = await sendAIQuery({ prompt, mode: effectiveMode, question: userMsg.text, stageContext: effectiveMode === 'stage' ? stageContext : null })

        // Append AI response
        setMessages(prev => [...prev, { role: 'ai', text: aiResp.answer }])
        setIsThinking(false)
    }

    const quickAsk = async (buttonType) => {
        let q = ''
        if (buttonType === 'interview') q = stageContext ? 'Ask me a common interview question for this stage.' : 'Ask me a common DevOps interview question.'
        if (buttonType === 'simple') q = stageContext ? `Explain this stage simply: ${stageContext.name}` : 'Explain this DevOps concept simply.'
        if (buttonType === 'example') q = stageContext ? `Give a real-world example for: ${stageContext.name}` : 'Give a real-world DevOps example.'
        setInput(q)
        await new Promise(r => setTimeout(r, 50))
        await send(buttonType === 'interview' ? 'interview' : (stageContext ? 'stage' : 'general'))
    }

    return (
        <div className="fixed right-6 top-20 w-96 h-[72vh] bg-devops-dark border border-devops-light-gray rounded-lg shadow-xl z-50 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-devops-light-gray">
                <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 bg-devops-blue/20 rounded flex items-center justify-center text-devops-blue font-bold">🤖</div>
                    <div>
                        <div className="text-sm font-semibold text-white">AI Interview Assistant</div>
                        <div className="text-xs text-gray-400">Mode: {mode}</div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {stageContext && (
                        <div className="text-xs text-gray-300 bg-white/5 px-2 py-0.5 rounded">{stageContext.name}</div>
                    )}
                    <button onClick={onClose} className="text-sm text-gray-400 hover:text-white">Close</button>
                </div>
            </div>

            <div ref={containerRef} className="flex-1 p-3 overflow-y-auto space-y-3">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`${m.role === 'user' ? 'bg-devops-blue text-white' : 'bg-devops-gray text-gray-200'} px-3 py-2 rounded-md max-w-[78%] text-sm`}>{m.text}</div>
                    </div>
                ))}
                {isThinking && (
                    <div className="text-sm text-gray-400">AI is thinking...</div>
                )}
            </div>

            <div className="p-3 border-t border-devops-light-gray">
                <div className="flex items-center space-x-2 mb-2">
                    <select value={mode} onChange={e => setMode(e.target.value)} className="bg-devops-gray text-sm text-gray-200 px-2 py-1 rounded">
                        <option value="general">General Q&A</option>
                        <option value="stage">Stage-specific</option>
                        <option value="interview">Interview Coach</option>
                    </select>
                    <button onClick={() => quickAsk('interview')} className="text-xs px-2 py-1 bg-devops-blue text-white rounded">Ask Interview</button>
                    <button onClick={() => quickAsk('simple')} className="text-xs px-2 py-1 bg-gray-700 text-white rounded">Explain Simply</button>
                    <button onClick={() => quickAsk('example')} className="text-xs px-2 py-1 bg-gray-700 text-white rounded">Real-World Example</button>
                </div>

                <div className="mb-2 text-xs text-gray-300">
                    {envKey
                        ? (<div>OpenAI key loaded from <code>.env</code> (VITE_OPENAI_API_KEY).</div>)
                        : (<div>No OpenAI key found. To enable real AI responses, add <code>VITE_OPENAI_API_KEY=sk-&lt;your-key&gt;</code> to a `.env` file at project root and restart the dev server.</div>)}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && send()}
                        placeholder="Type your question here..."
                        className="flex-1 bg-devops-gray text-sm text-gray-200 rounded px-3 py-2"
                    />
                    <button onClick={() => send()} className="px-3 py-2 bg-devops-blue text-white rounded">Send</button>
                </div>
            </div>
        </div>
    )
}

export default AIChat
