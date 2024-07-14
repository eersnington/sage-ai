// pages/pricing.tsx

import React from 'react';
import { pricingTiers, PricingTier } from "@/lib/data/pricing-data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingHeader from '@/components/pricing-header';
import { HeroHighlight } from '@/components/hero-highlight';

const PricingPage: React.FC = () => {
  return (
    <HeroHighlight>
      <div className="container mx-auto py-16">
        <PricingHeader />
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier: PricingTier, index: number) => (
            <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-lg mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold text-center mb-6">{tier.price}</p>
                <ul className="space-y-3">
                  {tier.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button className="w-full text-lg font-semibold py-6 bg-emerald-500 text-black dark:text-white " size="lg">
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </HeroHighlight>
  );
};

export default PricingPage;