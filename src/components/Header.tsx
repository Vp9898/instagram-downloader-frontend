import * as React from 'react';
import { Instagram, Sun, Moon, Languages } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-10 shadow-sm">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a className="flex items-center space-x-2" href="/">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Instagram className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800">InstaDownloader</span>
          </a>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md hover:bg-gray-200">
              <Languages className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-200">
              <Sun className="h-5 w-5 text-gray-600" />
              {/* <Moon className="h-5 w-5 text-gray-600" />  For dark mode toggle */}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}