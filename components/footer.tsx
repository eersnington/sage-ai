import React from 'react'
import Link from 'next/link'
import { SiTwitter, SiProducthunt } from 'react-icons/si'
import { Button } from './ui/button'

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-1 md:p-2 fixed bottom-0 right-0">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Link href="/terms" className="text-xs text-muted-foreground/50 hover:text-muted-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="text-xs text-muted-foreground/50 hover:text-muted-foreground">
            Privacy
          </Link>
          <Link href="/refund" className="text-xs text-muted-foreground/50 hover:text-muted-foreground">
            Refund
          </Link>
        </div>
        <div className="flex">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="text-muted-foreground/50"
          >
            <Link href="https://twitter.com/sreenington" target="_blank">
              <SiTwitter size={18} />
            </Link>
          </Button>
          <Button
            variant={'ghost'}
            size={'icon'}
            className="text-muted-foreground/50"
          >
            <Link href="https://www.producthunt.com/@sreenington" target="_blank">
              <SiProducthunt size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer