import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.tareeqAlMuneerEn' });
  return { title: t('title'), description: t('description') };
}

export default async function TareeqAlMuneerEnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.tareeqAlMuneerEn' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });

  // --- Features (Self-Study Focus) ---
  const features = [
    { title: t('englishInstructions'), desc: t('englishDesc'), icon: 'solar:chat-square-check-bold-duotone', color: 'bg-blue-100', textColor: 'text-blue-600' },
    { title: t('phoneticBridge'), desc: t('phoneticDesc'), icon: 'solar:soundwave-bold-duotone', color: 'bg-indigo-100', textColor: 'text-indigo-600' },
    { title: t('selfStudy'), desc: t('selfStudyDesc'), icon: 'solar:user-hand-up-bold-duotone', color: 'bg-brand-sky-light', textColor: 'text-brand-sky-dark' },
  ];

  // --- Milestones ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    const assetKey = key === 'P' ? 'p' : key;
    const isPlaceholder = ['7', '8', '9', '10'].includes(key);

    return {
      id,
      title: tLevels(titleKey),
      desc: t(['R', 'P', '1'].includes(key) ? 'vol1Sub' : key === '2' ? 'vol2Sub' : 'audioSub'),
      icon: ['R', 'P', '1'].includes(key) ? 'solar:letter-bold-duotone' : key === '2' ? 'solar:pen-new-square-bold-duotone' : 'solar:headphones-round-sound-bold-duotone',
      color: ['R', 'P', '1', '2'].includes(key) ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-brand-orange-light text-brand-orange-dark dark:bg-brand-orange/10 dark:text-brand-orange',
      border: ['R', 'P', '1', '2'].includes(key) ? 'border-blue-200 dark:border-blue-800' : 'border-brand-orange/30',
      bookCover: isPlaceholder ? '' : `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/tarikmunirEn-book/tarikmunirEn-${key}/cover/1-${assetKey}.jpg`,
      pdfUrl: isPlaceholder ? '' : `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/tarikmunirEn-book/tarikmunirEn-${key}/1-${assetKey}.pdf`
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09121E] text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy pt-32 pb-1 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen"></div>
             <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-bold mb-8 backdrop-blur-md shadow-inner-soft">
            <Icon icon="solar:global-bold" className="text-blue-300" />
            <span>{t('englishEdition')}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">{t('title')}</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed mb-10 font-light">{t('description')}</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 -mt-12 relative z-20 px-4">
         <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {features.map((feature, i) => (
                  <div key={i} className="bg-white dark:bg-[#112240] p-8 rounded-4xl shadow-soft flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                     <div className={`w-16 h-16 rounded-2xl bg-opacity-20 ${feature.color} ${feature.textColor} flex items-center justify-center mb-4 text-3xl`}>
                        <Icon icon={feature.icon} />
                     </div>
                     <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">{feature.title}</h3>
                     <p className="text-sm text-brand-navy/60 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Milestones Grid */}
      <div className="text-center py-10">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">{t('packageContent')}</h2>
            <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <PdfBookGrid 
        levels={levels} 
      />

    </main>
  );
}
