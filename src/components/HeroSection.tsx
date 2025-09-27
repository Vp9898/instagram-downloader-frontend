"use client";

import * as React from 'react';
import { Download, Loader2, ShieldX } from 'lucide-react';
import { ResultsDisplay } from './ResultsDisplay';

const BACKEND_URL = 'https://instagram-downloader-backend.foade984.workers.dev';

type ViewState = 'FORM' | 'LOADING' | 'RESULTS' | 'ERROR';

export function HeroSection() {
  const [view, setView] = React.useState<ViewState>('FORM');
  const [url, setUrl] = React.useState('');
  const [data, setData] = React.useState<any | null>(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
    setUrl('');
    setData(null);
    setErrorMessage('');
    setView('FORM');
  };

  // --- الإصلاح #2: تقليل المسافة العلوية ---
  // غيرنا min-h-[calc(80vh)] إلى padding-top and bottom (py-12)
  return (
    <section className="bg-gray-50 py-12 md:py-16 flex items-center justify-center">
      <div className="mx-auto max-w-5xl px-4 text-center w-full">
        
        {view === 'LOADING' && (
          <div className="flex flex-col items-center justify-center text-gray-600">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
            <p className="mt-4 text-lg font-semibold">Processing your link...</p>
          </div>
        )}
        
        {view === 'FORM' && (
          <>
            <div className="mb-4">
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">Free</span>
              <span className="ml-2 text-sm text-gray-600">No registration required</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">Download Instagram Media</h1>
            <div className="mx-auto mt-12 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg sm:p-8">
              <form onSubmit={handleSubmit}>
                <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.instagram.com/..." className="w-full rounded-md border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                <button type="submit" className="mt-4 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-md">
                  <Download className="mr-2 h-5 w-5" />Download
                </button>
              </form>
            </div>
          </>
        )}

        {view === 'RESULTS' && data && (
          // --- الإصلاح #3: تم حذف زر "Download another" من هنا ---
          <ResultsDisplay data={data} />
        )}

        {/* --- الإصلاح #1: عرض بطاقة الخطأ بشكل صحيح --- */}
        {view === 'ERROR' && (
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
        )}
      </div>
    </section>
  );
}