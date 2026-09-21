import React from 'react';
import Hero from '../components/Home/Hero';
import CategoryMarquee from '../components/Home/CategoryMarquee';
import PremiumCollection from '../components/Home/PremiumCollection';
import CoreServices from '../components/Home/CoreServices';
import QualityTesting from '../components/Home/QualityTesting';
import ContactStrip from '../components/Home/ContactStrip';
import Stats from '../components/Home/Stats';
import CompanyCapabilities from '../components/Home/CompanyCapabilities';
import ManufacturingProcess from '../components/Home/ManufacturingProcess';
import AdvancedManufacturing from '../components/Home/AdvancedManufacturing';
import LeatherSection from '../components/Home/LeatherSection';
import StrategicAdvantage from '../components/Home/StrategicAdvantage';
import Portfolio from '../components/Home/Portfolio';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import BlogPreview from '../components/Home/BlogPreview';
import CTA from '../components/Home/CTA';

const Home = () => {
  return (
    <main>
      <Hero />
      <CategoryMarquee />
      <PremiumCollection />
      <CoreServices />
      <QualityTesting />
      <ManufacturingProcess />
      <AdvancedManufacturing />
      <LeatherSection />
      <CompanyCapabilities />
      <StrategicAdvantage />
      <FeaturedProducts />
      <Portfolio />
      <ContactStrip />
      <Stats />
      <BlogPreview />
      <CTA />
    </main>
  );
};

export default Home;
