import * as React from 'react';
import { Download, Loader2 } from 'lucide-react';

interface MediaItem { thumbnail: string; url: string; }
interface ApiResponse { media: MediaItem[]; }
interface ResultsDisplayProps { data: ApiResponse; }

export function ResultsDisplay({ data }: ResultsDisplayProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);

  if (!data?.media?.length) return null;

  const firstMedia = data.media[0];
  const isVideo = firstMedia.url.includes('.mp4') || firstMedia.url.includes('video');

  // ---  وظيفة التحميل المحسّنة ---
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // خدعة بسيطة: إنشاء عنصر <a> غير مرئي وتعيين سمة 'download'
      // هذا يخبر المتصفح ببدء التحميل مباشرة عند النقر
      const link = document.createElement('a');
      link.href = firstMedia.url;
      // نضيف 'download' لنجبر المتصفح على التحميل بدلاً من الفتح
      link.setAttribute('download', `instadownloader-${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`);
      // لمنع مشاكل CORS، نطلب من المتصفح عدم إرسال بيانات المصدر
      link.setAttribute('rel', 'noopener noreferrer'); 
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed, opening in new tab:", error);
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
        {/* --- خدعة CSS لإصلاح مشكلة الأبعاد --- */}
        {/* نستخدم الصورة المصغرة (thumbnail) كعنصر مرجعي للأبعاد */}
        <div className="w-full max-w-md mb-6 relative" style={{ paddingBottom: '125%' }}> 
          {/* padding-bottom: 125% مناسب للفيديوهات الطولية (Reels) */}
          <div className="absolute top-0 left-0 w-full h-full">
            {isVideo ? (
              <video
                src={firstMedia.url}
                controls
                poster={firstMedia.thumbnail}
                className="w-full h-full object-contain rounded-lg" 
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              // نعرض الصورة المصغرة (thumbnail) بدلاً من الصورة الكاملة
              // لأنها مضمونة العرض وبنفس الأبعاد
              <img
                src={firstMedia.thumbnail}
                alt="Downloaded media thumbnail"
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>
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