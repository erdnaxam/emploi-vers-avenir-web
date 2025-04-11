
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
    </PageLayout>
  );
};

export default Index;
