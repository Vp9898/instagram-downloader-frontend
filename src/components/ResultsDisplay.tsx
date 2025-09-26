import * as React from 'react';
import { Download, Clapperboard, Image as ImageIcon } from 'lucide-react';

// نحدد شكل البيانات التي نتوقعها من الواجهة الخلفية
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
  if (!data || !data.media || data.media.length === 0) {
    // يمكنك إظهار رسالة خطأ أكثر وضوحًا هنا إذا أردت
    return null; 
  }

  const firstMedia = data.media[0];
  const isVideo = firstMedia.url.includes('.mp4');

  // === وظيفة التحميل المباشر ===
  const handleDownload = async () => {
    try {
      // جلب الملف كـ blob (بيانات ثنائية)
      const response = await fetch(firstMedia.url);
      const blob = await response.blob();
      
      // إنشاء رابط مؤقت في الذاكرة
      const objectUrl = window.URL.createObjectURL(blob);
      
      // إنشاء عنصر <a> وهمي
      const link = document.createElement('a');
      link.href = objectUrl;
      
      // تحديد اسم الملف (يمكننا تحسينه لاحقًا)
      link.download = `instadownloader-${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`;
      
      // محاكاة النقر على الرابط لبدء التحميل
      document.body.appendChild(link);
      link.click();
      
      // تنظيف الرابط الوهمي من الصفحة
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);

    } catch (error) {
      console.error("Download failed:", error);
      // في حال فشل التحميل، افتح الرابط في نافذة جديدة كخطة بديلة
      window.open(firstMedia.url, '_blank');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 rounded-xl bg-white shadow-xl animate-fade-in overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Your Media is Ready!</h2>
      </div>

      <div className="bg-gray-50 p-6 flex flex-col items-center">
        {/* عرض الفيديو أو الصورة */}
        <div className="w-full max-w-md mb-6">
          {isVideo ? (
            <video
              src={firstMedia.url}
              controls
              className="w-full rounded-lg border-2 border-gray-200 shadow-md"
              poster={firstMedia.thumbnail}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={firstMedia.url}
              alt="Downloaded media"
              className="w-full rounded-lg border-2 border-gray-200 shadow-md"
            />
          )}
        </div>
        
        <div className="w-full max-w-md">
          <button
            onClick={handleDownload}
            className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Download className="mr-3 h-6 w-6" />
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
}