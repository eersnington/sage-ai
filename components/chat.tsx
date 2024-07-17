'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChatPanel } from './chat-panel'
import { ChatMessages } from './chat-messages'
import { useUIState } from 'ai/rsc'
import { TypewriterEffect } from './typewriter-effect'
import Image from 'next/image'

type ChatProps = {
  id?: string
  query?: string
}

export function Chat({ id, query }: ChatProps) {
  const path = usePathname()
  const [messages] = useUIState()

  useEffect(() => {
    if (!path.includes('search') && messages.length === 1) {
      window.history.replaceState({}, '', `/search/${id}`)
    }
  }, [id, path, messages, query])

  const words = [
    { text: 'Market', className: '' },
    { text: 'Insights', className: '' },
    { text: 'in', className: '' },
    { text: 'Minutes', className: 'text-green-500 dark:text-green-500' },
  ]

  return (
    <div className="px-8 sm:px-12 pt-12 md:pt-14 pb-14 md:pb-24 max-w-3xl mx-auto flex flex-col space-y-3 md:space-y-4">
      {!path.includes('search') && ( // Conditionally render if not in /search/[slug]
        <>
          <motion.div
            className="text-neutral-600 dark:text-neutral-200 text-base text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Stop wasting time on market research
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TypewriterEffect words={words} />
          </motion.div>
          {/* <a href="https://www.producthunt.com/posts/sage-ai-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sage&#0045;ai&#0045;2"
            target="_blank">
            <Image src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=471693&theme=dark"
              alt="Sage&#0032;AI - Fast&#0044;&#0032;Clear&#0032;Market&#0032;Insights&#0044;&#0032;No&#0032;Burnout | Product Hunt"
              width="250"
              height="54" />
          </a> */}
        </>
      )}
      <ChatMessages messages={messages} />
      <ChatPanel messages={messages} query={query} />
    </div>
  )
}
