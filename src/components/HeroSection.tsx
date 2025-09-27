"use client";

import * as React from 'react';
import { Download, Loader2 } from 'lucide-react';

interface HeroSectionProps {
  isLoading: boolean;
  onSubmit: (url: string) => void;
}

export function HeroSection({ isLoading, onSubmit }: HeroSectionProps) {
  const [url, setUrl] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLoading && url.trim()) {
      onSubmit(url);
    }
  };
  
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 text-center w-full">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">Free</span>
          <span className="ml-2 text-sm text-gray-600">No registration required</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">Download Instagram Media</h1>
        <div className="mx-auto mt-12 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg sm:p-8">
          <form onSubmit={handleSubmit}>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.instagram.com/..." className="w-full rounded-md border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:ring-purple-500" disabled={isLoading} />
            <button type="submit" className="mt-4 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-md disabled:opacity-50" disabled={isLoading}>
              {isLoading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processing...</>) : (<><Download className="mr-2 h-5 w-5" />Download</>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}