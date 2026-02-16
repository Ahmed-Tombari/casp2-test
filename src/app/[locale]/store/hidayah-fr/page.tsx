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
  const pillars = [
    { 
      title: t('bilingualValues'), 
      desc: t('bilingualDesc'), 
      icon: 'solar:chat-square-like-bold-duotone', 
      color: 'bg-indigo-500', 
      textColor: 'text-indigo-600' 
    },
    { 
      title: t('westernContext'), 
      desc: t('contextDesc'), 
      icon: 'solar:city-bold-duotone', 
      color: 'bg-brand-sky', 
      textColor: 'text-brand-sky' 
    },
    { 
      title: t('authenticSources'), 
      desc: t('sourceDesc'), 
      icon: 'solar:book-2-bold-duotone', 
      color: 'bg-brand-gold', 
      textColor: 'text-brand-gold-dark' 
    },
  ];

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
      bookCover: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/hidayaFr-book/hidayaFr-${key}/cover/${key}-1.png`,
      pdfUrl: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.pdf`
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

      {/* ================= PILLARS (The Bridge) ================= */}
      <section className="py-16 -mt-12 relative z-20 px-4">
         <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {pillars.map((pillar, i) => (
                  <div key={i} className="glass p-8 flex flex-col items-center text-center shadow-soft-md hover:-translate-y-2 transition-transform duration-300 bg-white dark:bg-brand-navy-dark">
                     <div className={`w-16 h-16 rounded-2xl bg-opacity-10 ${pillar.color.replace('bg-', 'bg-')} ${pillar.textColor} flex items-center justify-center mb-4 text-3xl`}>
                        <Icon icon={pillar.icon} />
                     </div>
                     <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">{pillar.title}</h3>
                     <p className="text-sm text-brand-navy/60 dark:text-gray-400 leading-relaxed">{pillar.desc}</p>
                  </div>
               ))}
            </div>
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
