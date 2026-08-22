import React from 'react';
import { HeroSection } from '@features/home/components/HeroSection';
import StatsBar from '@features/home/components/StatsBar';
import { ExploreSportsSection } from '@features/home/components/ExploreSportsSection';
import { PopularVenuesSection } from '@features/home/components/PopularVenuesSection';
import { WhyUsSection } from '@features/home/components/WhyUsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ExploreSportsSection />
      <PopularVenuesSection />
      <WhyUsSection />
    </>
  );
}