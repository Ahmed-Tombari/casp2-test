import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.gardenOfArabic' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/store/garden-of-arabic`,
      languages: {
        ar: '/ar/store/garden-of-arabic',
        fr: '/fr/store/garden-of-arabic',
        en: '/en/store/garden-of-arabic',
      },
    },
  };
}

export default async function GardenOfArabicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.gardenOfArabic' });
  const tLevels = await getTranslations({ locale: locale, namespace: 'store.levels' });

  // --- Dynamic Level Generation ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8'];
  
  const generateLevels = (isExercises = false) => {
    return levelKeys.map(key => {
      let id = key;
      let titleKey = key;
      if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
      else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

      const section = isExercises ? 'exercices' : 'assas';
      const colorMap: Record<string, { icon: string, color: string, border: string }> = {
        'R': { icon: 'solar:leaf-bold-duotone', color: 'bg-emerald-100 text-emerald-600', border: 'border-emerald-200' },
        'P': { icon: 'mdi-sprout', color: 'bg-teal-100 text-teal-600', border: 'border-teal-200' },
        '1': { icon: 'mdi:tree', color: 'bg-green-100 text-green-700', border: 'border-green-200' },
        '2': { icon: 'mdi:apple', color: 'bg-lime-100 text-lime-600', border: 'border-lime-200' },
        '3': { icon: 'solar:leaf-bold-duotone', color: 'bg-emerald-100 text-emerald-600', border: 'border-emerald-200' },
        '4': { icon: 'mdi-sprout', color: 'bg-teal-100 text-teal-600', border: 'border-teal-200' },
      };
      
      const config = colorMap[key] || { icon: 'mdi:tree', color: 'bg-green-100 text-green-700', border: 'border-green-200' };

      return {
        id,
        title: tLevels(titleKey),
        sub: t(['R', 'P', '1'].includes(key) ? 'level1Sub' : key === '2' ? 'level2Sub' : key === '3' ? 'level3Sub' : 'stagesDesc'),
        desc: t(['R', 'P', '1'].includes(key) ? 'level1Desc' : key === '2' ? 'level2Desc' : key === '3' ? 'level3Desc' : 'level4Desc'),
        icon: config.icon,
        color: `${config.color} dark:bg-emerald-900/30 dark:text-emerald-400`,
        border: `${config.border} dark:border-emerald-800`,
        bookCover: `/pdfbooks/store-book/garden-book/garden-${key}/${section}/cover/${key}.jpg`,
        pdfUrl: isExercises 
          ? `${process.env.NEXT_PUBLIC_R2_BASE_URL}/store-book/garden-book/garden-${key}/${section}/${key}.pdf`
          : `${process.env.NEXT_PUBLIC_R2_BASE_URL}/store-book/garden-book/garden-${key}/${section}/gardenAsses${key}.pdf`
      };
    });
  };

  const levels = generateLevels(false);
  const exercisesLevels = generateLevels(true);

  return (
    <main className="min-h-screen bg-background">
      
      {/* ================= HERO SECTION (Nature Themed) ================= */}
      <section className="relative overflow-hidden bg-brand-navy pt-32 pb-1 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Abstract Leaves Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
           <Icon icon="solar:leaf-bold" className="absolute top-10 left-10 text-9xl text-emerald-400 animate-pulse-slow" />
           <Icon icon="solar:leaf-bold" className="absolute bottom-20 right-10 text-8xl text-brand-sky animate-pulse-slow" style={{animationDelay: '2s'}} />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-bold mb-8 backdrop-blur-md">
            <Icon icon="solar:sun-2-bold" className="text-brand-gold animate-spin-slow" />
            <span>{t('comprehensiveSeries')}</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-emerald-50/80 max-w-2xl mx-auto leading-relaxed mb-10">
            {t('description')}
          </p>
        </div>
      </section>

      {/* ================= THE GARDEN PATH (Main Levels) ================= */}
      <div className="text-center px-4 py-6 mt-4">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
           {t('stagesOfGrowth')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">{t('stagesDesc')}</p>
      </div>

      <PdfBookGrid levels={levels} watermark={true} />

      {/* ================= EXERCISES PATH ================= */}
      <div className="text-center px-4 py-10 mt-20 border-t border-gray-100 dark:border-gray-800/20">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
           {t('exercisesTitle')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {t('exercisesDesc')}
        </p>
      </div>

      <PdfBookGrid levels={exercisesLevels} watermark={true} />


    </main>
  );
}
