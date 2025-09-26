import * as React from 'react';
import { Download, Loader2 } from 'lucide-react';

// (لا تغيير هنا)
interface MediaItem { thumbnail: string; url: string; }
interface ApiResponse { media: MediaItem[]; }
interface ResultsDisplayProps { data: ApiResponse; }

// رابط الواجهة الخلفية لاستخدامه في الوكيل
const BACKEND_URL = 'https://instagram-downloader-backend.foade984.workers.dev';

export function ResultsDisplay({ data }: ResultsDisplayProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);

  if (!data?.media?.length) return null;

  const firstMedia = data.media[0];
  const isVideo = firstMedia.url.includes('.mp4') || firstMedia.url.includes('video');

  // --- استخدام الوكيل الخاص بنا لعرض وتحميل الصور ---
  const displayUrl = isVideo ? firstMedia.url : `${BACKEND_URL}/image-proxy?url=${encodeURIComponent(firstMedia.url)}`;
  const downloadUrl = isVideo ? firstMedia.url : displayUrl;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(downloadUrl);
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
      window.open(firstMedia.url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 rounded-xl bg-white shadow-xl animate-fade-in overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Your Media is Ready!</h2>
      </div>

      <div className="bg-gray-50 p-4 md:p-6 flex flex-col items-center">
        {/* --- إصلاح مشكلة الأبعاد --- */}
        <div className="w-full flex justify-center mb-6">
          {isVideo ? (
            <video
              src={displayUrl}
              controls
              className="w-auto h-auto max-w-full max-h-[70vh] rounded-lg shadow-md"
              poster={firstMedia.thumbnail}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={displayUrl}
              alt="Downloaded media"
              className="w-auto h-auto max-w-full max-h-[70vh] rounded-lg shadow-md"
            />
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
      </div>
    </div>
  );
}