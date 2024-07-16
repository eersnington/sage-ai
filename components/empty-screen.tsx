import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'What are the latest trends in remote work tools?',
    message: 'What are the latest trends in remote work tools?'
  },
  {
    heading: 'Who are the top competitors in the productivity app space?',
    message: 'Who are the top competitors in the productivity app space?'
  },
  {
    heading: 'What is the expected growth rate of the e-commerce market?',
    message: 'What is the expected growth rate of the e-commerce market?'
  },
  {
    heading: 'What pain points do small business owners face with digital marketing?',
    message: 'What pain points do small business owners face with digital marketing?'
  },
  {
    heading: 'What features are most desired in a project management tool?',
    message: 'What features are most desired in a project management tool?'
  }
];

export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
