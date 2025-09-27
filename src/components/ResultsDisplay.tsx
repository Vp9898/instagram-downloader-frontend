"use client";

import * as React from 'react';
import { Download, Loader2, AlertTriangle } from 'lucide-react';
import { ResultsDisplay } from './ResultsDisplay';

const BACKEND_URL = 'https://instagram-downloader-backend.foade984.workers.dev';

export function HeroSection() {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any | null>(null);

  // --- إضافة جديدة: مرجع (ref) لقسم النتائج ---
  const resultsRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.details || result.error || 'An unknown error occurred.');
      }
      setData(result);

      // --- إضافة جديدة: التمرير إلى النتائج بعد تأخير بسيط ---
      // نعطي تأخيرًا بسيطًا للسماح للمكون بالظهور قبل التمرير
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // --- تعديل: نستخدم قسمًا واحدًا يحتوي على كل شيء ---
    <section className="w-full">
      {/* قسم فورم التحميل */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="mb-4">
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">Free</span>
            <span className="ml-2 text-sm text-gray-600">No registration required</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            Download Instagram
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Videos & Photos</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Save Instagram videos, photos, reels, and stories in high quality.
          </p>
          <div className="mx-auto mt-12 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <label htmlFor="url-input" className="text-lg font-semibold text-gray-800">Paste Instagram URL</label>
              <input id="url-input" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.instagram.com/p/..." className="w-full rounded-md border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:ring-purple-500" disabled={isLoading} />
              <button type="submit" className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50" disabled={isLoading}>
                {isLoading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processing...</>) : (<><Download className="mr-2 h-5 w-5" />Download</>)}
              </button>
            </form>
            {error && (
              <div className="mt-4 flex items-center justify-center text-red-600"><AlertTriangle className="mr-2 h-5 w-5" /><p>{error}</p></div>
            )}
          </div>
        </div>
      </div>

      {/* --- إضافة جديدة: قسم النتائج مع المرجع (ref) --- */}
      {/* هذا القسم لن يعرض أي شيء إلا بعد وصول البيانات */}
      <div ref={resultsRef} className="w-full bg-white py-12 md:py-20">
        {data && <ResultsDisplay data={data} />}
      </div>
    </section>
  );
}