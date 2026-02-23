import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.hidayahFr' });
  return { title: t('title'), description: t('description') };
}

export default async function HidayahFrenchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.hidayahFr' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });

  // --- Pillars: Tailored for Francophones ---


  // --- The Levels ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    return {
      id,
      title: tLevels(titleKey),
      desc: t(['R', 'P', '1'].includes(key) ? 'level1Desc' : key === '2' ? 'level1Desc' : key === '3' ? 'level1Desc' : 'level1Desc'), // Following existing pattern
      icon: 'solar:leaf-bold-duotone',
      color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
      bookCover: `/pdfbooks/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.png`,
      pdfUrl: `/api/books/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.pdf`
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-brand-navy pt-32 pb-1 text-center relative overflow-hidden rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background: Abstract Map / Connections */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 Q 50 0 100 100" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M0 80 Q 50 -20 100 80" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" />
           </svg>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm font-bold mb-8 backdrop-blur-md">
             <Icon icon="solar:global-bold" />
             <span>{t('francophoneEdition')}</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            {t('description')}
          </p>

        </div>
      </section>



      {/* ================= LEVELS GRID ================= */}
        <div className="text-center py-10">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
               {t('learningJourney')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('journeyDesc')}</p>
          </div>

      <PdfBookGrid 
        levels={levels.map(l => ({
          ...l,
        }))} 
      />

    </main>
  );
}
