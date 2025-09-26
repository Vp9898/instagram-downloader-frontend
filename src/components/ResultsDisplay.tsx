import * as React from 'react';
import { Download, Loader2 } from 'lucide-react';

// (لا تغيير هنا)
interface MediaItem {
  thumbnail: string;
  url: string;
}
interface ApiResponse {
  media: MediaItem[];
}
interface ResultsDisplayProps {
  data: ApiResponse;
}

export function ResultsDisplay({ data }: ResultsDisplayProps) {
  // --- تحسينات الحالة (State) ---
  const [isDownloading, setIsDownloading] = React.useState(false);

  if (!data || !data.media || data.media.length === 0) {
    return null;
  }

  const firstMedia = data.media[0];
  // تحسين طريقة التحقق من نوع الملف لتكون أكثر دقة
  const isVideo = firstMedia.url.includes('.mp4') || firstMedia.url.includes('video');

  // --- تحسين وظيفة التحميل ---
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // جلب الملف كـ blob (بيانات ثنائية)
      // نستخدم وكيل (proxy) لتجاوز مشاكل CORS المحتملة مع الصور
      const response = await fetch(`https://cors-anywhere.herokuapp.com/${firstMedia.url}`);
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
      console.error("Download failed, opening in new tab:", error);
      window.open(firstMedia.url, '_blank'); // خطة بديلة
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
        {/* --- تحسين حاوية العرض --- */}
        <div className="w-full max-h-[70vh] flex justify-center items-center mb-6">
          {isVideo ? (
            <video
              src={firstMedia.url}
              controls
              className="max-w-full max-h-[70vh] rounded-lg border-2 border-gray-200 shadow-md"
              poster={firstMedia.thumbnail}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              // نستخدم الوكيل هنا أيضًا لعرض الصورة
              src={`https://cors-anywhere.herokuapp.com/${firstMedia.url}`}
              alt="Downloaded media"
              className="max-w-full max-h-[70vh] rounded-lg border-2 border-gray-200 shadow-md"
            />
          )}
        </div>
        
        <div className="w-full max-w-md">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {/* --- تحسين إشارة التحميل --- */}
            {isDownloading ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-3 h-6 w-6" />
                Download Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}