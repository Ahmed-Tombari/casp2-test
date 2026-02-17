'use client';

import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

const BookViewer = dynamic(() => import('@/app/components/TeacherGuide/BookViewer'), {
  ssr: false,
});

interface Level {
  id: string | number;
  title: string;
  bookCover: string;
  pdfUrl: string;
}

interface PdfBookGridProps {
  levels: Level[];
  watermark?: boolean;
}

export default function PdfBookGrid({ levels, watermark = false }: PdfBookGridProps) {
  const tNav = useTranslations('nav');
  const tGuide = useTranslations('store');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {levels.map((level, idx) => (
            <BookViewer
              key={idx}
              title={`${level.title}`}
              pdfUrl={level.pdfUrl}
              readLabel={tNav('readBook')}
              downloadLabel={tGuide('downloadBtn')}
              closeLabel={tGuide('close')}
              color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
              borderColor="border-emerald-200 dark:border-emerald-800"
              icon="solar:book-bookmark-bold-duotone"
              isRTL={isRTL}
              coverImage={level.bookCover}
              watermark={watermark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
