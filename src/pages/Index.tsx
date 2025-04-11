
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import CTASection from '@/components/home/CTASection';

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
