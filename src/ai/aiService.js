// aiService: Abstracted AI interface. By default this will call an external LLM
// when a build-time `VITE_OPENAI_API_KEY` is present. It returns a simple
// `{ answer: string }` shape. Errors are prefixed with "ERROR:" so the UI
// can render them specially.

export async function sendAIQuery({ prompt, mode, question, stageContext } = {}) {
    const apiKey = typeof import.meta !== 'undefined' ? import.meta.env.VITE_OPENAI_API_KEY : null

    if (!apiKey) {
        return { answer: 'ERROR: No OpenAI API key provided. Set VITE_OPENAI_API_KEY in .env and restart the dev server.' }
    }

    try {
        const body = {
            model: 'openai/gpt-oss-20b:free',
            messages: [
                { role: 'system', content: 'You are a senior DevSecOps engineer. Answer concisely and provide interview tips when requested.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.2,
            max_tokens: 900
        }

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            const errText = await res.text()
            return { answer: `ERROR: OpenAI request failed (${res.status}). ${errText}` }
        }

        const data = await res.json()
        const content = data?.choices?.[0]?.message?.content

        if (!content || String(content).trim() === '') {
            console.error('OpenAI returned empty content:', data)
            return { answer: 'ERROR: The AI provider returned an empty response. Verify your API key, model, or try again.' }
        }

        return { answer: String(content) }
    } catch (e) {
        console.error('sendAIQuery error', e)
        return { answer: `ERROR: Error calling AI service: ${e?.message || e}` }
    }
}
