import * as React from 'react';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection'; // التأكد من وجود هذا السطر

// سنقوم ببناء الفوتر في الخطوة التالية
// import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-gray-50">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        
        {/* مكان الفوتر */}
        <div className="h-48 flex items-center justify-center bg-gray-800 text-white">Footer Placeholder</div>
      </main>
    </>
  );
}