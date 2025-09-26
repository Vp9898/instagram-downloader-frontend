import * as React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection'; // استيراد المكون الجديد

// import { HowItWorksSection } from '@/components/HowItWorksSection';
// import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-gray-50">
        <HeroSection />
        <FeaturesSection /> {/* استخدام المكون الجديد هنا */}
        
        {/* مكان قسم كيف يعمل */}
        <div className="h-96 flex items-center justify-center">How It Works Section Placeholder</div>

        {/* مكان الفوتر */}
        <div className="h-48 flex items-center justify-center bg-gray-800 text-white">Footer Placeholder</div>
      </main>
    </>
  );
}