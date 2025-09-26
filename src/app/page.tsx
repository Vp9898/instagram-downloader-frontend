import * as React from 'react';

// بيانات الخطوات
const steps = [
  {
    number: '1',
    title: 'Copy URL',
    description: 'Copy the Instagram post, reel, or story URL from your browser or app.',
  },
  {
    number: '2',
    title: 'Paste & Process',
    description: 'Paste the URL in our tool and click download to process the content.',
  },
  {
    number: '3',
    title: 'Save Content',
    description: 'Download the high-quality content directly to your device.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
          How It Works
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          A simple 3-step process to download any Instagram content.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-800">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}