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
    console.log("1. handleSubmit triggered"); // تشخيص 1
    setView('LOADING');
    
    try {
      console.log("2. Calling backend API..."); // تشخيص 2
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      console.log("3. Backend response received with status:", response.status); // تشخيص 3

      if (!response.ok) {
        console.log("4. Response is NOT OK. Reading error..."); // تشخيص 4
        const errorResult = await response.json();
        console.log("5. Error JSON from backend:", errorResult); // تشخيص 5
        const details = (errorResult.details || errorResult.error || '').toLowerCase();
        if (details.includes('private') || details.includes('not available') || details.includes('login required')) {
          throw new Error('This content is private or unavailable and cannot be downloaded.');
        } else {
          throw new Error('Failed to fetch the media. Please check the URL and try again.');
        }
      }

      console.log("6. Response is OK. Reading data..."); // تشخيص 6
      const result = await response.json();
      console.log("7. Data JSON from backend:", result); // تشخيص 7
      setData(result);
      setView('RESULTS');

    } catch (err: any) {
      console.error("8. An error was caught:", err.message); // تشخيص 8
      setErrorMessage(err.message);
      setView('ERROR');
    }
  };

  const handleReset = () => { /* ... لا تغيير هنا ... */ };

  return (
    <section className="bg-gray-50 py-12 md:py-16 flex items-center justify-center min-h-[calc(80vh)]">
       {/* ... لا تغيير هنا ... */}
    </section>
  );
}
// ملاحظة: لقد اختصرت الأجزاء التي لم تتغير. الرجاء نسخ الكود الكامل الذي سأقدمه لك في النافذة التالية.