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
  const t = await getTranslations({ locale: locale, namespace: 'store.tareeqAlMuneerAr' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/store/tareeq-al-muneer`,
      languages: {
        ar: '/ar/store/tareeq-al-muneer',
        fr: '/fr/store/tareeq-al-muneer',
        en: '/en/store/tareeq-al-muneer',
      },
    },
  };
}

export default async function TareeqAlMuneerArPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.tareeqAlMuneerAr' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });



  // --- The Milestones (Levels) ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    const assetKey = key === 'P' ? 'p' : key;

    return {
      id,
      title: tLevels(titleKey),
      desc: t(['R', 'P', '1'].includes(key) ? 'level1Desc' : key === '2' ? 'level2Desc' : key === '3' ? 'level3Desc' : 'level4Desc'),
      icon: key === '2' ? 'solar:soundwave-bold-duotone' : key === '3' ? 'solar:widget-add-bold-duotone' : ['4', '5', '6'].includes(key) ? 'solar:book-2-bold-duotone' : 'solar:letter-bold-duotone',
      color: ['R', 'P', '1'].includes(key) ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : key === '2' ? 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' : key === '3' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
      border: ['R', 'P', '1'].includes(key) ? 'border-amber-200 dark:border-amber-800' : key === '2' ? 'border-teal-200 dark:border-teal-800' : key === '3' ? 'border-indigo-200 dark:border-indigo-800' : 'border-rose-200 dark:border-rose-800',
      bookCover: `/pdfbooks/store-book/tarikmunirAr-book/tarikmunirAr-${key}/1-${assetKey}.jpg`,
      pdfUrl: `/api/books/store-book/tarikmunirAr-book/tarikmunirAr-${key}/1-${assetKey}.pdf`
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION (Illuminated) ================= */}
      <section className="relative overflow-hidden bg-brand-navy pt-32 pb-1 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background Light Effects */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
             {/* Central Glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-navy-light blur-[120px] rounded-full mix-blend-screen"></div>
             {/* Ray Patterns */}
             <div className="absolute top-10 right-10 w-64 h-64 bg-amber-400/20 blur-[80px] rounded-full animate-pulse-slow"></div>
             <div className="absolute bottom-10 left-10 w-64 h-64 bg-teal-400/20 blur-[80px] rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 text-brand-sky-light text-sm font-bold mb-8 backdrop-blur-md shadow-inner-soft">
            <Icon icon="solar:lightbulb-bolt-bold" className="text-brand-gold" />
            <span>{t('literacyProgram')}</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed mb-10">
            {t('description')}
          </p>

        </div>
      </section>



      {/* ================= THE PATH MILESTONES ================= */}
        <div className="text-center py-10">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
               {t('milestones')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('milestonesDesc')}</p>
        </div>

      <PdfBookGrid 
        levels={levels} 
      />

    </main>
  );
}

