import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.hidayahEn' });
  return { title: t('title'), description: t('description') };
}

export default async function HidayahEnglishPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.hidayahEn' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });

  // --- Pillars (Western Context Focus) ---
  const pillars = [
    { 
      title: t('westernContext'), 
      desc: t('westernDesc'), 
      icon: 'solar:city-bold-duotone', 
      color: 'bg-indigo-100', 
      textColor: 'text-indigo-600' 
    },
    { 
      title: t('authenticContent'), 
      desc: t('authenticDesc'), 
      icon: 'solar:shield-check-bold-duotone', 
      color: 'bg-teal-100', 
      textColor: 'text-teal-600' 
    },
    { 
      title: t('engagingDesign'), 
      desc: t('designDesc'), 
      icon: 'solar:palette-bold-duotone', 
      color: 'bg-brand-gold-light', // slightly lighter gold
      textColor: 'text-brand-gold-dark' 
    },
  ];

  // --- The Levels ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    return {
      id,
      title: tLevels(titleKey),
      desc: t(['R', 'P', '1'].includes(key) ? 'level1Desc' : key === '2' ? 'level2Desc' : key === '3' ? 'level3Desc' : 'level4Desc'),
      icon: ['R', 'P', '1'].includes(key) ? 'solar:leaf-bold-duotone' : key === '2' ? 'solar:sun-2-bold-duotone' : key === '3' ? 'solar:map-point-bold-duotone' : 'solar:user-hand-up-bold-duotone',
      color: ['R', 'P', '1'].includes(key) ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : key === '2' ? 'bg-brand-gold-light/20 text-brand-gold-dark dark:bg-brand-gold/10 dark:text-brand-gold' : key === '3' ? 'bg-brand-navy-light/20 text-brand-navy dark:bg-brand-navy/30 dark:text-brand-sky' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      border: ['R', 'P', '1'].includes(key) ? 'border-emerald-200 dark:border-emerald-800' : key === '2' ? 'border-brand-gold/30' : key === '3' ? 'border-brand-navy/20' : 'border-indigo-200 dark:border-indigo-800',
      bookCover: "/images/books/سلسلة-في-حديقة-اللغة-العربية-213x300.png", // Use original placeholder
      pdfUrl: "#"
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09121E] text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy pt-32 pb-1 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #EAB308 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <Icon icon="solar:moon-stars-bold" className="absolute top-10 right-10 text-9xl text-brand-gold animate-pulse-slow" />
           <Icon icon="solar:stars-minimalistic-bold-duotone" className="absolute bottom-20 left-10 text-8xl text-brand-sky animate-pulse-slow" style={{animationDelay: '1.5s'}} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 text-brand-gold-light text-sm font-bold mb-8 backdrop-blur-md">
            <Icon icon="solar:global-bold" />
            <span>{t('englishEdition')}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">{t('title')}</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed mb-10 font-light">{t('description')}</p>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-16 -mt-12 relative z-20 px-4">
         <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {pillars.map((pillar, i) => (
                  <div key={i} className="bg-white dark:bg-[#112240] p-8 rounded-4xl shadow-soft flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                     <div className={`w-16 h-16 rounded-2xl bg-opacity-20 ${pillar.color} ${pillar.textColor} flex items-center justify-center mb-4 text-3xl`}>
                        <Icon icon={pillar.icon} />
                     </div>
                     <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">{pillar.title}</h3>
                     <p className="text-sm text-brand-navy/60 dark:text-gray-400 leading-relaxed">{pillar.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Levels Grid */}
       <div className="text-center py-10">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">{t('learningJourney')}</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('journeyDesc')}</p>
          </div>

      <PdfBookGrid 
        levels={levels} 
      />

    </main>
  );
}
