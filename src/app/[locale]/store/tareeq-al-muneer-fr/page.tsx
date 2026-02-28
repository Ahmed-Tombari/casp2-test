import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.tareeqAlMuneerFr' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/store/tareeq-al-muneer-fr`,
      languages: {
        ar: '/ar/store/tareeq-al-muneer-fr',
        fr: '/fr/store/tareeq-al-muneer-fr',
        en: '/en/store/tareeq-al-muneer-fr',
      },
    },
  };
}

export default async function TareeqAlMuneerFrPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.tareeqAlMuneerFr' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });



  // --- The Learning Stages ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    return {
      bookId: `tareeq-fr-${key}`,
      id,
      title: tLevels(titleKey),
      desc: t(['R', 'P', '1'].includes(key) ? 'stage1Desc' : key === '2' ? 'stage2Desc' : key === '3' ? 'stage3Desc' : 'stage4Desc'),
      icon: ['R', 'P', '1'].includes(key) ? 'solar:book-bookmark-bold-duotone' : key === '2' ? 'solar:pen-new-square-bold-duotone' : key === '3' ? 'solar:chat-round-line-bold-duotone' : 'solar:diploma-verified-bold-duotone',
      color: ['R', 'P', '1'].includes(key) ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : key === '2' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : key === '3' ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' : 'bg-brand-gold-light/20 text-brand-gold-dark dark:bg-brand-gold/10 dark:text-brand-gold',
      border: ['R', 'P', '1'].includes(key) ? 'border-indigo-200 dark:border-indigo-800' : key === '2' ? 'border-rose-200 dark:border-rose-800' : key === '3' ? 'border-sky-200 dark:border-sky-800' : 'border-brand-gold/30',
      bookCover: "/images/ourbooks/Illuminating Path Series.png",
      pdfUrl: "#"
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-brand-navy pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Decorative Background: Eiffel Tower / Arch Abstract or simply elegant curves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             {/* Abstract curves resembling bridges */}
             <svg className="absolute bottom-0 left-0 w-full h-1/2 text-white/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
             </svg>
             <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white/10 rounded-full animate-spin-slow" style={{animationDuration: '20s'}}></div>
             <div className="absolute top-40 right-40 w-16 h-16 bg-brand-gold/20 rounded-full blur-xl animate-pulse"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed mb-2">
            {t('description')}
          </p>

        </div>
      </section>

      <PdfBookGrid 
        levels={levels} 
      />

    </main>
  );
}
