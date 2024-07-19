import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createOllama } from 'ollama-ai-provider'
import { createOpenAI } from '@ai-sdk/openai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'
import { CoreMessage } from 'ai'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getModel(useSubModel = false) {
  const ollamaBaseUrl = process.env.OLLAMA_BASE_URL + '/api'
  const ollamaModel = process.env.OLLAMA_MODEL
  const ollamaSubModel = process.env.OLLAMA_SUB_MODEL
  const openaiApiBase = process.env.OPENAI_API_BASE
  const openaiApiKey = process.env.OPENAI_API_KEY
  let openaiApiModel = process.env.OPENAI_API_MODEL || 'gpt-4'
  const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY
  const groqApiKey = process.env.GROQ_API_KEY

  if (
    !(ollamaBaseUrl && ollamaModel) &&
    !openaiApiKey &&
    !googleApiKey &&
    !anthropicApiKey &&
    !groqApiKey
  ) {
    throw new Error(
      'Missing environment variables for Ollama, OpenAI, Google, Anthropic, or Groq'
    )
  }

  // Anthropic
  if (anthropicApiKey) {
    console.log("Using Anthropic Model")
    return anthropic('claude-3-sonnet-20240229')
  }

  // Groq (main option)
  if (groqApiKey) {
    console.log("Using Groq Model")
    const groq =  createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: groqApiKey,
    })

    return groq('mixtral-8x7b-32768')
  }

  // Ollama
  if (ollamaBaseUrl && ollamaModel) {
    const ollama = createOllama({ baseURL: ollamaBaseUrl })

    if (useSubModel && ollamaSubModel) {
      return ollama(ollamaSubModel)
    }

    return ollama(ollamaModel)
  }

  // Google
  if (googleApiKey) {
    console.log("Using Google Model")

    const google = createGoogleGenerativeAI({
      baseURL: 'https://generativelanguage.googleapis.com/v1beta',
      apiKey: googleApiKey
    });
    return google('models/gemini-pro')
  }

  // Fallback to OpenAI
  const openai = createOpenAI({
    baseURL: openaiApiBase,
    apiKey: openaiApiKey,
    organization: '' // optional organization
  })

  return openai.chat(openaiApiModel)
}

export function getGroqModel(){
  const groqApiKey = process.env.GROQ_API_KEY
  const openaiApiBase = process.env.OPENAI_API_BASE
  const openaiApiKey = process.env.OPENAI_API_KEY
  let openaiApiModel = process.env.OPENAI_API_MODEL || 'gpt-4'

  if (!openaiApiKey && !groqApiKey
  ) {
    throw new Error(
      'Missing environment variables for Ollama, OpenAI, Google, Anthropic, or Groq'
    )
  }

  if (groqApiKey) {
    console.log("Using Groq Model")
    const groq =  createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: groqApiKey,
    })

    return groq('mixtral-8x7b-32768')
  }

  // Fallback to OpenAI
  const openai = createOpenAI({
    baseURL: openaiApiBase,
    apiKey: openaiApiKey,
    organization: '' // optional organization
  })

  return openai.chat(openaiApiModel)
}

/**
 * Takes an array of AIMessage and modifies each message where the role is 'tool'.
 * Changes the role to 'assistant' and converts the content to a JSON string.
 * Returns the modified messages as an array of CoreMessage.
 *
 * @param aiMessages - Array of AIMessage
 * @returns modifiedMessages - Array of modified messages
 */
export function transformToolMessages(messages: CoreMessage[]): CoreMessage[] {
  return messages.map(message =>
    message.role === 'tool'
      ? {
          ...message,
          role: 'assistant',
          content: JSON.stringify(message.content),
          type: 'tool'
        }
      : message
  ) as CoreMessage[]
}
