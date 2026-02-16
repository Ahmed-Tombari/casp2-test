import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.alWafi' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AlWafiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.alWafi' });
  const tLevels = await getTranslations({ locale: locale, namespace: 'store.levels' });

  // --- Al Wafi Features ---
  const features = [
    {
      title: t('comprehensiveGrammar'),
      desc: t('grammarDesc'),
      icon: 'solar:ruler-pen-bold-duotone',
    },
    {
      title: t('audioSupport'),
      desc: t('audioDesc'),
      icon: 'solar:headphones-round-sound-bold-duotone',
    },
    {
      title: t('exercises'),
      desc: t('exercisesDesc'),
      icon: 'solar:document-add-bold-duotone',
    },
  ];

  // --- Al Wafi Levels & Assets ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8'];
  
  const generateLevels = (isExercises = false) => {
    return levelKeys.map(key => {
      let id = key;
      let titleKey = key;
      if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
      else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

      const section = isExercises ? 'exercices' : 'assas';

      return {
        id,
        title: tLevels(titleKey),
        bookCover: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/wafi-book/wafi-${key}/${section}/cover/${key}-1.png`,
        pdfUrl: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/wafi-book/wafi-${key}/${section}/${key}-1.pdf`
      };
    });
  };

  const levels = generateLevels(false);
  const exercisesLevels = generateLevels(true);

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-brand-navy pt-32 pb-1 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] mix-blend-overlay translate-x-1/3 -translate-y-1/3"></div>
            <Icon icon="solar:book-bookmark-bold" className="absolute bottom-20 left-20 text-9xl text-brand-sky animate-pulse-slow" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 text-brand-sky-light text-sm font-bold mb-8 backdrop-blur-md">
            <Icon icon="solar:verified-check-bold" className="text-brand-gold" />
            <span>{t('title')}</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            {t('description')}
          </p>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 -mt-12 relative z-20 px-4">
         <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {features.map((feature, i) => (
                  <div key={i} className="bg-white dark:bg-brand-navy-dark p-8 rounded-4xl shadow-soft hover:-translate-y-2 transition-transform duration-300 border-t-4 border-brand-sky flex flex-col items-center text-center">
                     <div className="w-16 h-16 rounded-full bg-brand-navy/5 text-brand-navy dark:text-brand-sky flex items-center justify-center mb-6 text-3xl">
                        <Icon icon={feature.icon} />
                     </div>
                     <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-3">{feature.title}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= MAIN LEVELS GRID ================= */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
           {tLevels('growthTitle') || 'Discover the Levels'}
        </h2>
        <div className="h-1 w-24 bg-brand-sky mx-auto rounded-full"></div>
      </div>

      <PdfBookGrid levels={levels} />

      {/* ================= EXERCISES GRID ================= */}
      <div className="text-center mt-32 mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4 italic">
           {t('exercises')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          {t('exercisesDesc')}
        </p>
        <div className="h-1 w-24 bg-brand-sky mx-auto rounded-full"></div>
      </div>

      <PdfBookGrid levels={exercisesLevels} />
    </main>
  );
}
