import * as React from 'react';
import { Video, Image, Users } from 'lucide-react';

// بيانات الميزات لتسهيل التعديل
const features = [
  {
    icon: Video,
    title: 'High Quality Videos',
    description: 'Download Instagram videos in their original quality without compression.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Image,
    title: 'Photos & Carousels',
    description: 'Save single photos and entire photo carousels from Instagram posts.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
  },
  {
    icon: Users,
    title: 'Stories & Reels',
    description: 'Easily download stories before they disappear and save your favorite reels.',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl shadow-sm">
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg ${feature.bgColor}`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}