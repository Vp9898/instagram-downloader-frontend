"use client";

import * as React from 'react';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ResultsDisplay } from '@/components/ResultsDisplay';

const BACKEND_URL = 'https://instagram-downloader-backend.foade984.workers.dev';

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any | null>(null);

  const resultsRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadRequest = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      
      const result = await response.json();

      if (!response.ok) {
        const details = (result.details || result.error || '').toLowerCase();
        if (details.includes('private') || details.includes('not available') || details.includes('login required') || details.includes('not found')) {
          throw new Error('This content is private or unavailable.');
        } else {
          throw new Error('Failed to fetch data. Please check the URL and try again.');
        }
      }
      
      setError(null);
      setData(result);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    } catch (err: any) {
      setData(null);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16 bg-gray-50">
        <HeroSection 
          isLoading={isLoading} 
          error={error} 
          onSubmit={handleDownloadRequest} 
        />
        
        {/* قسم النتائج سيعرض هنا */}
        <div ref={resultsRef}>
          {data && (
            <div className="bg-white py-12 md:py-20">
              <ResultsDisplay data={data} />
            </div>
          )}
        </div>

        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </>
  );
}