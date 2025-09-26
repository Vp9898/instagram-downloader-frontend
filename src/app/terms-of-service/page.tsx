import * as React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-white min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            By using InstaDownloader, you agree to comply with all applicable laws, including copyright laws. This service is intended for personal use only. You are solely responsible for the content you download. You should not download content for which you do not have permission from the copyright owner. We are not responsible for any copyright infringement that may occur.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}