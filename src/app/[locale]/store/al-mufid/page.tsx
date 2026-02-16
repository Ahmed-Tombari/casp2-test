import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

// --- Type Definitions ---
interface Feature {
  title: string;
  desc: string;
  icon: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alMufid' });
  return { title: t('title'), description: t('description') };
}

export default async function AlMufidPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alMufid' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });

  // --- Features: Practical & Fast ---
  const features: Feature[] = [
    { title: t('practicalUsage'), desc: t('usageDesc'), icon: 'solar:hand-stars-bold-duotone' },
    { title: t('quickReference'), desc: t('referenceDesc'), icon: 'solar:bookmark-opened-bold-duotone' },
    { title: t('modernVocabulary'), desc: t('vocabDesc'), icon: 'solar:chat-square-like-bold-duotone' },
  ];

  // --- Al Mufid Levels ---
  const levelKeys = ['1', '2', '3', '4', '5', '6'];
  const levels = levelKeys.map(key => ({
    id: key,
    title: tLevels(key),
    bookCover: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/mufid-book/mufid-${key}/cover/${key}-1.png`,
    pdfUrl: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/mufid-book/mufid-${key}/${key}-1.pdf`
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-brand-orange pt-32 pb-1 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8 backdrop-blur-md">
            <Icon icon="solar:star-fall-bold" className="text-brand-gold" />
            <span>{t('practicalChoice')}</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-orange-50 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            {t('description')}
          </p>

        </div>
      </section>

      {/* ================= METHODOLOGY ================= */}
      <section className="py-20 -mt-12 relative z-20 px-4">
         <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {features.map((feature, i) => (
                  <div key={i} className="bg-white dark:bg-brand-navy-dark p-8 rounded-4xl shadow-soft hover:-translate-y-2 transition-transform duration-300 border-t-4 border-brand-orange flex flex-col items-center text-center">
                     <div className="w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-950/20 text-brand-orange flex items-center justify-center mb-6 text-3xl">
                        <Icon icon={feature.icon} />
                     </div>
                     <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-3">{feature.title}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= LEVELS GRID ================= */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
           {t('stagesOfGrowth')}
        </h2>
        <div className="h-1 w-24 bg-brand-orange mx-auto rounded-full"></div>
      </div>

      <PdfBookGrid levels={levels} />
    </main>
  );
}
