import * as React from 'react';
import { Download, Loader2 } from 'lucide-react';

// تحديث الواجهة لتطابق رد RapidAPI
interface MediaItem {
  thumbnail: string;
  url: string;
}
interface ApiResponse {
  status: string;
  data: MediaItem[];
}
interface ResultsDisplayProps {
  apiResponse: ApiResponse;
}

const BACKEND_URL = 'https://instagram-downloader-backend.foade984.workers.dev';

export function ResultsDisplay({ apiResponse }: ResultsDisplayProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);
  
  // تحديث التحقق
  if (apiResponse.status !== 'success' || !apiResponse?.data?.length) {
    return null;
  }

  const firstMedia = apiResponse.data[0];
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

  return (
    <div className="w-full max-w-lg mx-auto rounded-xl bg-white shadow-xl animate-fade-in overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Your Media is Ready!</h2>
      </div>
      <div className="bg-gray-50 p-4 md:p-6 flex flex-col items-center">
        <div className="w-full mb-6">
          {isVideo ? (
            <video src={firstMedia.url} controls poster={thumbnailProxyUrl} className="w-full h-auto rounded-lg shadow-md aspect-auto" />
          ) : (
            <img