// pricingData.ts

export interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
  }
  
  export const pricingTiers = [
    {
        name: "Pro",
        price: "$34/month",
        description: "For indie devs who regularly ship products and need ongoing market insights.",
        features: [
            "Unlimited market size estimations",
            "AI-powered competitor analysis",
            "Trend forecasting for your niche",
            "Customer segmentation analysis",
            "Market opportunity identification"
        ],
        cta: "Accelerate Your Growth"
    },
    {
        name: "Flex",
        price: "$19/report",
        description: "For indie developers who need on-demand insights to validate their next big idea.",
        features: [
            "Comprehensive market size report",
            "Customer segmentation analysis",
            "Competitive landscape overview",
            "Market opportunity identification",
            "Key market trends analysis",
            "Pay per report, no subscription required"
        ],
        cta: "Validate Your Idea"
    }
];
