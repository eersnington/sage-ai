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
      price: "$34/month",
      description: "For indie hackers who regularly ship products and need ongoing market insights.",
      features: [
        "Unlimited market size estimations",
        "AI-powered competitor analysis",
        "Trend forecasting for your niche",
        "Customer sentiment tracking",
        "Personalized market opportunity alerts",
        "API access for integration with your tools"
      ],
      cta: "Accelerate Your Growth"
    },
    {
      name: "Flex",
      price: "$19/report",
      description: "For developers who need on-demand insights to validate their next big idea.",
      features: [
        "Comprehensive market size report",
        "Potential customer segmentation",
        "Competitive landscape overview",
        "Identified market gaps and opportunities",
        "Key market trends analysis",
        "Pay per report, no subscription required"
      ],
      cta: "Validate Your Idea"
    }
  ];