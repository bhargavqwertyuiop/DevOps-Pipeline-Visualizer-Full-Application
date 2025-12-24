// aiService: Abstracted AI interface. By default returns mock responses.
// Later this file can be swapped or extended to call OpenAI/Azure OpenAI services.

export async function sendAIQuery({ prompt, mode, question, stageContext }) {
    // If user provided an OpenAI API key (stored in localStorage), call the OpenAI Chat Completions API.
    const apiKey = typeof import.meta !== 'undefined' ? import.meta.env.VITE_OPENAI_API_KEY : null

    if (!apiKey) {
        return { answer: 'ERROR: VITE_OPENAI_API_KEY is not set. Add it to your .env and restart the dev server.' }
    }

    // If API key is present, call OpenAI
    if (apiKey) {
        try {
            const body = {
                model: 'openai/gpt-oss-20b:free',
                messages: [
                    { role: 'system', content: prompt },
                    { role: 'user', content: question }
                ],
                temperature: 0.2,
                max_tokens: 800
            }

            const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(body)
            })

            if (!res.ok) {
                const errText = await res.text()
                console.error('OpenAI error', res.status, errText)
                return { answer: `ERROR: OpenAI API request failed (${res.status}). ${errText}` }
            }

            const data = await res.json()
            const content = data?.choices?.[0]?.message?.content || JSON.stringify(data)
            return { answer: content }
        } catch (e) {
            console.error('OpenAI request failed', e)
            return { answer: `ERROR: OpenAI request failed: ${e.message || e}` }
        }
    }
}
