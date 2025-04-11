
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import CTASection from '@/components/home/CTASection';
import FeatureSection from '@/components/home/FeatureSection';

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </PageLayout>
  );
};

export default Index;
