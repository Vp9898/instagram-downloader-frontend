import * as React from 'react';
import { Download } from 'lucide-react'; // سنستورد أيقونة جميلة للزر

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl text-center">

        {/* ========== قسم العنوان الرئيسي ========== */}
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
          Download Instagram
          <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Videos & Photos
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Save Instagram videos, photos, reels, and stories in high quality.
          Fast, secure, and completely free to use.
        </p>

        {/* ========== بطاقة الإدخال والتحميل ========== */}
        <div className="mx-auto mt-12 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg sm:p-8">
          <div className="flex flex-col space-y-4">
            <label htmlFor="url-input" className="text-left text-sm font-medium text-gray-700">
              Paste Instagram URL
            </label>
            
            <input
              id="url-input"
              type="text"
              placeholder="https://www.instagram.com/p/..."
              className="w-full rounded-md border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" />
              Download
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}