"use client";

import * as React from 'react';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { ShieldX, Loader2 } from 'lucide-react';

const BACKEND_URL = 'https://instagram-downloader-backend.foade984.workers.dev';
type ViewState = 'FORM' | 'LOADING' | 'RESULTS' | 'ERROR';

export default function HomePage() {
  const [view, setView] = React.useState<ViewState>('FORM');
  const [data, setData] = React.useState<any | null>(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleDownloadRequest = async (url: string) => {
    setView('LOADING');
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const result = await response.json();
      if (!response.ok) {
        const details = (result.details || result.error || '').toLowerCase();
        if (details.includes('private') || details.includes('not available') || details.includes('login required')) {
          throw new Error('This content is private or unavailable and cannot be downloaded.');
        } else {
          throw new Error('Failed to fetch the media. Please check the URL and try again.');
        }
      }
      setData(result);
      setView('RESULTS');
    } catch (err: any) {
      setErrorMessage(err.message);
      setView('ERROR');
    }
  };

  const handleReset = () => {
    setData(null);
    setErrorMessage('');
    setView('FORM');
  };

  return (
    <>
      <Header />
      <main className="pt-16 bg-gray-50">
        {/* عرض الفورم والأقسام الإضافية */}
        {view === 'FORM' && (
          <>
            <HeroSection onSubmit={handleDownloadRequest} isLoading={false} />
            <FeaturesSection />
            <HowItWorksSection />
          </>
        )}

        {/* عرض مؤشر التحميل */}
        {view === 'LOADING' && (
          <div className="flex flex-col items-center justify-center min-h-[calc(80vh)] text-gray-600">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
            <p className="mt-4 text-lg font-semibold">Processing your link...</p>
          </div>
        )}

        {/* عرض بطاقة النتائج */}
        {view === 'RESULTS' && data && (
          <div className="py-12 md:py-16">
             <ResultsDisplay data={data} />
          </div>
        )}
        
        {/* عرض بطاقة الخطأ */}
        {view === 'ERROR' && (
          <div className="py-12 md:py-16 flex items-center justify-center">
            <div className="w-full max-w-lg mx-auto rounded-xl bg-white shadow-xl animate-fade-in overflow-hidden">
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <ShieldX className="h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Download Failed</h2>
                <p className="mt-2 text-gray-600">{errorMessage}</p>
                <button onClick={handleReset} className="mt-6 rounded-md bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-700">
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}