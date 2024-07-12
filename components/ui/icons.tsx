'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'

function IconLogo({ className, ...props }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="sage-ai"
      width={32}
      height={32}
      className={cn(className)}
      {...props}
    />
  )
}

export { IconLogo }
