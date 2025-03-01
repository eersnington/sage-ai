import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamObject } from 'ai'
import { PartialRelated, relatedSchema } from '@/lib/schema/related'
import SearchRelated from '@/components/search-related'
import { getGroqModel, getModel } from '../utils'

export async function querySuggestor(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[]
) {
  const objectStream = createStreamableValue<PartialRelated>()
  uiStream.append(<SearchRelated relatedQueries={objectStream.value} />)

  const lastMessages = messages.slice(-1).map(message => {
    return {
      ...message,
      role: 'user'
    }
  }) as CoreMessage[]

  let finalRelatedQueries: PartialRelated = {}
  await streamObject({
    model: getGroqModel(),
    // system: `As a professional web researcher, your task is to generate a set of three queries that explore the subject matter more deeply, building upon the initial query and the information uncovered in its search results.

    // For instance, if the original query was "Starship's third test flight key milestones", your output should follow this format:

    // "{
    //   "related": [
    //     "What were the primary objectives achieved during Starship's third test flight?",
    //     "What factors contributed to the ultimate outcome of Starship's third test flight?",
    //     "How will the results of the third test flight influence SpaceX's future development plans for Starship?"
    //   ]
    // }"

    // Aim to create queries that progressively delve into more specific aspects, implications, or adjacent topics related to the initial query. The goal is to anticipate the user's potential information needs and guide them towards a more comprehensive understanding of the subject matter.
    // Please match the language of the response to the user's language.`,
    system: `As a professional market researcher, your task is to generate a set of three queries that explore the subject matter more deeply. Building upon the initial query and the information uncovered in its search results, create follow-up queries that help validate and refine product ideas.

    For example, if the original query was "Market size of chatbot software in 2024", your output should follow this format:

    "{
      "related": [
        "What are the key growth drivers for the chatbot software market in 2024?",
        "Who are the leading competitors in the chatbot software space and what are their market shares?",
        "What are the most common pain points experienced by users of chatbot software?"
      ]
    }"

    Aim to create queries that progressively delve into more specific aspects, implications, or adjacent topics related to market research for SaaS ideas. The goal is to provide insights that help users understand market dynamics, competitor landscape, user needs, and potential opportunities.
    Please match the language of the response to the user's language.`,
    messages: lastMessages,
    schema: relatedSchema
  })
    .then(async result => {
      for await (const obj of result.partialObjectStream) {
        if (obj.items) {
          objectStream.update(obj)
          finalRelatedQueries = obj
        }
      }
    })
    .finally(() => {
      objectStream.done()
    })

  console.log('finalRelatedQueries', finalRelatedQueries)

  return finalRelatedQueries
}
