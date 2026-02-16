import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.qawaedMobasta' });
  return { title: t('title'), description: t('description') };
}

export default async function QawaedMobastaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.qawaedMobasta' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });

  // --- Why Simplified? ---
  const features = [
    { title: t('visualMethod'), desc: t('visualDesc'), icon: 'solar:eye-bold-duotone', color: 'text-brand-sky' },
    { title: t('colorCoded'), desc: t('colorDesc'), icon: 'solar:palette-bold-duotone', color: 'text-rose-500' },
    { title: t('mindMaps'), desc: t('mapsDesc'), icon: 'solar:branching-paths-down-bold-duotone', color: 'text-brand-gold' },
  ];

  // --- The Levels (The Toolkit) ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    return {
      id,
      title: tLevels(titleKey),
      desc: t(['R', 'P', '1'].includes(key) ? 'sentenceDesc' : key === '2' ? 'tensesDesc' : key === '3' ? 'pronounsDesc' : 'particlesDesc'),
      icon: ['R', 'P', '1'].includes(key) ? 'solar:ruler-pen-bold-duotone' : key === '2' ? 'solar:history-bold-duotone' : key === '3' ? 'solar:users-group-two-rounded-bold-duotone' : 'solar:link-circle-bold-duotone',
      color: ['R', 'P', '1'].includes(key) ? 'bg-brand-navy' : key === '2' ? 'bg-brand-orange' : key === '3' ? 'bg-teal-600' : 'bg-rose-500',
      bookCover: "/images/books/سلسلة-القواعد-المبسّطة-213x300.png",
      pdfUrl: "#"
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-background text-foreground transition-colors duration-300">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-brand-navy pt-32 pb-1 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background: Blueprint Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-md shadow-inner-soft">
             <Icon icon="solar:magic-stick-3-bold-duotone" className="text-5xl text-brand-gold" />
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed font-light">
            {t('description')}
          </p>
        </div>
      </section>

      {/* ================= VISUAL METHODOLOGY ================= */}
      <section className="py-16 -mt-12 relative z-20 px-4">
         <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {features.map((feature, i) => (
                  <div key={i} className="bg-white dark:bg-brand-navy-dark p-8 rounded-4xl shadow-soft flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                     <Icon icon={feature.icon} className={`text-5xl mb-4 ${feature.color}`} />
                     <h3 className="text-lg font-bold text-brand-navy dark:text-white mb-2">{feature.title}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= TOPICS GRID (The "Smart Cards") ================= */}

      {/* Levels Grid */}
       <div className="text-center py-10">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">{t('coreTopics')}</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('coreDesc')}</p>
        </div>
  
      <PdfBookGrid 
        levels={levels} 
      />
      <section className="py-12 pb-10 px-4">
    {/* Interactive Preview (The "Magic" Box) */}
          <div className="mt-20 bg-brand-sky/10 dark:bg-white/5 rounded-[3rem] p-10 md:p-16 text-center border-2 border-dashed border-brand-sky/30 dark:border-white/10">
             <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-6">{t('tryIt')}</h3>
             
             {/* Simple Grammar Visualization */}
             <div className="flex flex-wrap justify-center gap-4 text-xl md:text-3xl font-bold mb-8">
                <span className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl shadow-sm">{t('verb')}</span>
                <span className="text-gray-400 flex items-center">+</span>
                <span className="px-6 py-3 bg-green-100 text-green-700 rounded-xl shadow-sm">{t('subject')}</span>
                <span className="text-gray-400 flex items-center">+</span>
                <span className="px-6 py-3 bg-orange-100 text-orange-700 rounded-xl shadow-sm">{t('object')}</span>
                <span className="text-gray-400 flex items-center">=</span>
                <span className="px-6 py-3 bg-white dark:bg-brand-navy text-brand-navy dark:text-white rounded-xl shadow-md border border-gray-100 dark:border-gray-700">{t('sentence')}</span>
             </div>
             
             <p className="text-gray-500 max-w-lg mx-auto">{t('tryDesc')}</p>
          </div>
      </section>
    </main>
  );
}
