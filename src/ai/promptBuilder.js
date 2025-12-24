// Build prompts consistently for the AI service or real LLM providers
export function buildPrompt({ mode = 'general', question = '', stageContext = null }) {
    const role = 'You are a senior DevSecOps engineer.'
    const fresher = 'Keep explanations friendly for freshers and also provide interview-ready framing.'

    // Only include stage context when explicitly asking for stage-specific responses
    let context = ''
    if (mode === 'stage' && stageContext) {
        context += `Stage: ${stageContext.name}\nCategory: ${stageContext.category}\nTools: ${stageContext.toolsUsed?.join(', ') || 'N/A'}\n`
    }

    const typeHint =
        mode === 'interview'
            ? 'Act as an interviewer: ask follow-ups and evaluate.'
            : mode === 'stage'
                ? 'Answer with stage-specific details.'
                : 'Provide general DevOps Q&A.'

    return `${role}\n${typeHint}\n${context}\nQuestion: ${question}\n${fresher}`
}
