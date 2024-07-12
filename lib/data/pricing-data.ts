// pricingData.ts

export interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
  }
  
  export const pricingTiers: PricingTier[] = [
    {
      name: "Pro",
      price: "$29/month",
      description: "Unlock the full potential of your market with AI-powered insights.",
      features: [
        "Unlimited AI-driven market analysis",
        "30 in-depth reports per month",
        "Real-time trend detection and sentiment analysis",
        "Competitor tracking and benchmarking",
        "Customizable dashboards and alerts",
        "API access for seamless integration",
        "Priority support with 24/7 availability"
      ],
      cta: "Supercharge Your Strategy"
    },
    {
      name: "Flex",
      price: "$19/report",
      description: "Gain crucial market insights on-demand, without commitment.",
      features: [
        "Full access to Sage AI's powerful analytics",
        "Comprehensive, actionable reports",
        "Tailored insights for your specific market",
        "Identify untapped opportunities and risks",
        "Multi-format report downloads",
        "30-day access to generated reports",
        "Pay only when you need deep insights"
      ],
      cta: "Uncover Market Opportunities"
    }
  ];