import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createOllama } from 'ollama-ai-provider'
import { createOpenAI } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
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

  // Groq (main option)
  if (groqApiKey) {
    return createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: groqApiKey,
    }).chat('llama3-8b-8192') // You can change the model as needed
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
    return google('models/gemini-1.5-pro-latest')
  }

  // Anthropic
  if (anthropicApiKey) {
    return anthropic('claude-3-sonnet-20240229')
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
