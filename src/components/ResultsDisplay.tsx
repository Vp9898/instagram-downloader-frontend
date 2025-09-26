import * as React from 'react';
import { Download } from 'lucide-react';

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
  // نتأكد من وجود بيانات قبل عرض أي شيء
  if (!data || !data.media || data.media.length === 0) {
    return <p className="text-red-500">No media found.</p>;
  }

  const firstMedia = data.media[0];
  const isVideo = firstMedia.url.includes('.mp4');

  return (
    <div className="w-full max-w-xl mx-auto mt-8 rounded-lg bg-white p-6 shadow-lg animate-fade-in">
      <div className="flex flex-col items-center">
        {/* عرض الفيديو أو الصورة */}
        {isVideo ? (
          <video
            src={firstMedia.url}
            controls
            className="w-full max-w-md rounded-md border"
            poster={firstMedia.thumbnail}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={firstMedia.url}
            alt="Downloaded media"
            className="w-full max-w-md rounded-md border"
          />
        )}

        <div className="mt-6 w-full max-w-md">
          <a
            href={firstMedia.url}
            target="_blank" // يفتح الرابط في نافذة جديدة
            rel="noopener noreferrer" // للأمان
            download // هذه الخاصية تخبر المتصفح أن يقوم بالتحميل
            className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Now (HD)
          </a>
          {/* في المستقبل، يمكننا إضافة أزرار أخرى هنا للجودات المختلفة */}
        </div>
      </div>
    </div>
  );
}