import React from 'react'
import { History } from './history'
import { HistoryList } from './history-list'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


type HistoryContainerProps = {
  location: 'sidebar' | 'header'
}

const HistoryContainer: React.FC<HistoryContainerProps> = async ({
  location
}) => {

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userId = user ? user.id : 'anonymous'

  return (
    <div
      className={location === 'header' ? 'block sm:hidden' : 'hidden sm:block'}
    >
      <History location={location}>
        <HistoryList userId={userId} />
      </History>
    </div>
  )
}

export default HistoryContainer
