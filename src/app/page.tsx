"use client";

import * as React from 'react';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { Loader2 } from 'lucide-react';
import { ErrorModal } from '@/components/ErrorModal'; // استيراد المكون الجديد

const BACKEND_URL = 'https://instagram-downloader-backend.foade984.workers.dev';
type ViewState = 'FORM' | 'LOADING' | 'RESULTS';

export default function HomePage() {
  const [view, setView] = React.useState<ViewState>('FORM');
  const [data, setData] = React.useState<any | null>(null);
  const [errorMessage, setErrorMessage] = React.useState(''); // حالة جديدة للخطأ فقط

  const handleDownloadRequest = async (url: string) => {
    setView('LOADING');
    setErrorMessage(''); // مسح أي خطأ قديم
    
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
          throw new Error('This account is private or the Story has expired. Please check and try again.');
        } else {
          throw new Error('Failed to fetch the media. Please check the URL and try again.');
        }
      }
      setData(result);
      setView('RESULTS');
    } catch (err: any) {
      setErrorMessage(err.message);
      setView('FORM'); // --- التغيير الحاسم: عند حدوث خطأ، نعود إلى الفورم
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16 bg-gray-50">
        {/* --- عرض النافذة المنبثقة للخطأ --- */}
        <ErrorModal 
          isOpen={!!errorMessage} 
          onClose={() => setErrorMessage('')}
          title="Content not found"
          message={errorMessage}
        />

        {view === 'FORM' && (
          <>
            <HeroSection onSubmit={handleDownloadRequest} isLoading={false} />
            <FeaturesSection />
            <HowItWorksSection />
          </>
        )}

        {view === 'LOADING' && (
          <div className="flex flex-col items-center justify-center min-h-[calc(80vh)] text-gray-600">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
            <p className="mt-4 text-lg font-semibold">Processing your link...</p>
          </div>
        )}

        {view === 'RESULTS' && data && (
          <div className="py-12 md:py-16">
             <ResultsDisplay data={data} />
             {/* يمكنك إضافة زر للعودة هنا إذا أردت */}
             <div className="text-center mt-8">
                <button onClick={() => setView('FORM')} className="font-semibold text-purple-600 hover:text-purple-800">
                  &larr; Download another
                </button>
             </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}