import * as React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-white min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            We respect your privacy. InstaDownloader does not store any personal information or the content you download. We do not track your download history. The service is completely anonymous. Any links you paste are processed to fetch the media and are not stored on our servers.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}