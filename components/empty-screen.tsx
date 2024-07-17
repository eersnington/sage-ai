import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'What is the market size and growth rate of project management tools?',
    message: 'What is the market size and growth rate of project management tools?'
  },
  {
    heading: 'Who are the top competitors in the email marketing software space?',
    message: 'Who are the top competitors in the email marketing software space?'
  },
  {
    heading: 'What are the common pain points for CRM users?',
    message: 'What are the common pain points for CRM users?'
  },
  {
    heading: 'What are the most desired features in social media scheduling tools?',
    message: 'What are the most desired features in social media scheduling tools?'
  },
  {
    heading: 'What are the pricing models for analytics dashboards and how much are customers willing to pay?',
    message: 'What are the pricing models for analytics dashboards and how much are customers willing to pay?'
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
