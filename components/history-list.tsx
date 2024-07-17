import React, { cache } from 'react'
import HistoryItem from './history-item'
import { Chat } from '@/lib/types'
import { getChats } from '@/lib/actions/chat'
import { ClearHistory } from './clear-history'
import { Button, buttonVariants } from './ui/button'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from 'next/link'
import { cn } from '@/lib/utils'
import AuthButtons from './auth-buttons'


type HistoryListProps = {
  userId?: string
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})

// Start of Selection
export async function HistoryList({ userId }: HistoryListProps) {
  const chats = await loadChats(userId)

  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  return (
    <div className="flex flex-col flex-1 space-y-3 h-full">
      <div className="flex flex-col space-y-0.5 flex-1 overflow-y-auto">
        {!chats?.length ? (
          <div className="text-foreground/30 text-sm text-center py-4">
            No search history
          </div>
        ) : (
          chats?.map(
            (chat: Chat) => chat && <HistoryItem key={chat.id} chat={chat} />
          )
        )}
      </div>
      <div className="mt-auto">
        <ClearHistory empty={!chats?.length} />
        <AuthButtons isUserAuthenticated={isUserAuthenticated} />
      </div>
    </div>
  )
}
