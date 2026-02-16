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
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  
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
        bookCover: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/garden-book/garden-${key}/${section}/cover/${key}.jpg`,
        pdfUrl: isExercises 
          ? `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/garden-book/garden-${key}/${section}/${key}.pdf`
          : `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/garden-book/garden-${key}/${section}/gardenAsses${key}.pdf`
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

      <PdfBookGrid levels={levels} />

      {/* ================= EXERCISES PATH ================= */}
      <div className="text-center px-4 py-10 mt-20 border-t border-gray-100 dark:border-gray-800/20">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
           {t('exercisesTitle')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {t('exercisesDesc')}
        </p>
      </div>

      <PdfBookGrid levels={exercisesLevels} />

      {/* ================= INTERACTIVE PREVIEW (The "Look Inside") ================= */}
      <section className="py-20 bg-emerald-50/50 dark:bg-[#061410] relative overflow-hidden mt-20">
         <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <div className="bg-white dark:bg-brand-navy-dark rounded-[3rem] shadow-soft-lg border border-emerald-100 dark:border-emerald-900/30 overflow-hidden flex flex-col md:flex-row">
               
               {/* Illustration / Image Area */}
               <div className="w-full md:w-1/2 bg-emerald-100 dark:bg-emerald-900/20 p-12 flex items-center justify-center relative">
                  <Icon icon="solar:book-2-bold-duotone" className="text-9xl text-emerald-600/20 absolute" />
                  <div className="relative z-10 bg-white dark:bg-brand-navy p-6 rounded-3xl shadow-soft-lg max-w-sm rotate-3 hover:rotate-0 transition-transform duration-500">
                     <div className="h-4 w-1/3 bg-emerald-100 rounded-full mb-4"></div>
                     <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mb-2"></div>
                     <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mb-2"></div>
                     <div className="h-2 w-2/3 bg-gray-100 dark:bg-gray-800 rounded-full mb-6"></div>
                     <div className="aspect-video bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Icon icon="solar:play-circle-bold" className="text-4xl text-emerald-500" />
                     </div>
                  </div>
               </div>

               {/* Content Area */}
               <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-brand-navy dark:text-white mb-6">
                     {t('interactiveTitle')}
                  </h3>
                  <ul className="space-y-6 mb-10">
                     {[t('feature1'), t('feature2'), t('feature3')].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                           <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                              <Icon icon="solar:check-circle-bold" />
                           </div>
                           <p className="text-lg text-gray-600 dark:text-gray-300">{item}</p>
                        </li>
                     ))}
                  </ul>
                  <button className="w-full sm:w-auto px-8 py-4 bg-brand-navy text-white rounded-2xl font-bold shadow-3d hover:shadow-3d-pressed hover:translate-y-1 transition-all">
                     {t('downloadSample')}
                  </button>
               </div>

            </div>
         </div>
      </section>
    </main>
  );
}
