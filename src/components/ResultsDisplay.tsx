import * as React from 'react';
import { Download, Loader2, Copy } from 'lucide-react';

interface MediaItem { thumbnail: string; url: string; }
interface ApiResponse { media: MediaItem[]; }
interface ResultsDisplayProps { data: ApiResponse; }

const BACKEND_URL = 'https://instagram-downloader-backend.foade984.workers.dev';

export function ResultsDisplay({ data }: ResultsDisplayProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  if (!data?.media?.length) return null;

  const firstMedia = data.media[0];
  const isVideo = firstMedia.url.includes('.mp4') || firstMedia.url.includes('video');

  const thumbnailProxyUrl = `${BACKEND_URL}/image-proxy?url=${encodeURIComponent(firstMedia.thumbnail)}`;
  const imageUrlProxy = isVideo ? firstMedia.url : `${BACKEND_URL}/image-proxy?url=${encodeURIComponent(firstMedia.url)}`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(imageUrlProxy);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `instadownloader-${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(firstMedia.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 rounded-xl bg-white shadow-xl animate-fade-in overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Your Media is Ready!</h2>
      </div>

      <div className="bg-gray-50 p-4 md:p-6 flex flex-col items-center">
        <div className="w-full mb-6">
          {isVideo ? (
            <video src={firstMedia.url} controls poster={thumbnailProxyUrl} className="w-full h-auto rounded-lg shadow-md aspect-auto">
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={thumbnailProxyUrl} alt="Downloaded media" className="w-full h-auto rounded-lg shadow-md aspect-auto" />
          )}
        </div>
        
        <div className="w-full max-w-md">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-75"
          >
            {isDownloading ? (
              <><Loader2 className="mr-3 h-6 w-6 animate-spin" /> Downloading...</>
            ) : (
              <><Download className="mr-3 h-6 w-6" /> Download Now</>
            )}
          </button>
        </div>

        <div className="w-full max-w-md mt-6">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm font-semibold text-gray-600">Share:</span>
            
            <button onClick={handleCopy} className="flex items-center space-x-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
              <Copy className="h-5 w-5 text-gray-700" />
            </button>
            <span className={`text-sm text-green-600 font-semibold transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>Copied!</span>
          </div>
        </div>

      </div>
    </div>
  );
}