import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import BookViewer from '@/app/components/TeacherGuide/DynamicBookViewer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'teacherGuide' });
  return { title: `${t('garden.title')} - ${t('title')}` };
}

export default async function GardenGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'teacherGuide' });
  const isRTL = locale === 'ar';

  // --- Dynamic level generation ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const bookList = levelKeys.map(key => ({
    key: key === 'R' ? 'kg' : key === 'P' ? 'prep' : key,
    file: `gardenGuide-${key}.pdf`
  }));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#020617]">
      
      <section className="relative overflow-hidden bg-emerald-700 pt-32 pb-4 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <Icon icon="solar:leaf-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
           <Icon icon="solar:leaf-bold" className="absolute bottom-20 right-10 text-8xl text-white animate-pulse-slow" style={{animationDelay: '2s'}} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 text-emerald-100 text-sm font-bold mb-8 backdrop-blur-md">
            <Icon icon="solar:leaf-bold-duotone" className="text-emerald-300" />
            <span>{t('garden.title')}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">{t('garden.title')}</h1>
          <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">{t('garden.desc')}</p>
        </div>
      </section>

      <section className="py-24 -mt-12 relative z-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">{t('stagesOfGrowth')}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t('stagesDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookList.map((item, idx) => (
              <BookViewer
                key={idx}
                title={t(`garden.books.${item.key}`)}
                pdfUrl={`https://3nvnebfanoina0ww.public.blob.vercel-storage.com/dalil-book/garden-guide/${item.file}`}
                readLabel={t('readBtn')}
                downloadLabel={t('downloadBtn')}
                closeLabel={t('close')}
                color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                borderColor="border-emerald-200 dark:border-emerald-800"
                icon="solar:book-bookmark-bold-duotone"
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
