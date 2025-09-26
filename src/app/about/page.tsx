import * as React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-white min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-bold mb-6">About InstaDownloader</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            InstaDownloader was created to help users save their favorite moments from Instagram. Whether it's a memorable video, a beautiful photo, or an inspiring reel, our tool makes it easy to download content for personal use. We believe in providing a simple, fast, and secure service that respects content creators and copyright laws.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}