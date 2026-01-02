import React from 'react';
import Header from './Header';
import Hero from './Hero';
import DashboardPreview from './DashboardPreview';
import Features from './Features';
import SocialProof from './SocialProof';
import Pricing from './Pricing';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root">
      <Header />
      <Hero />
      <DashboardPreview />
      <Features />
      <SocialProof />
      <Pricing />
      <Footer />
    </div>
  );
};

export default LandingPage;
