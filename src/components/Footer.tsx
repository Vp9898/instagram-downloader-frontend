import * as React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-12">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p>&copy; {currentYear} InstaDownloader. Made with ❤️ for content creators.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="/about" className="hover:text-white">About</a>
          <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-white">Terms of Service</a>
        </div>
        <p className="mt-6 text-xs text-gray-500 max-w-2xl mx-auto">
          This tool respects Instagram's terms of service. Only download content you have permission to use. We are not affiliated with Instagram.
        </p>
      </div>
    </footer>
  );
}
```4.  **احفظ الملف (Commit new file).**