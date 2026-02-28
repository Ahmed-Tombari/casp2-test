import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const revalidate = 86400; // 24 hours
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



  // --- The Levels (The Toolkit) ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    return {
      bookId: `qawaed-${key}`,
      id,
      title: tLevels(titleKey),
      desc: t(['R', 'P', '1'].includes(key) ? 'sentenceDesc' : key === '2' ? 'tensesDesc' : key === '3' ? 'pronounsDesc' : 'particlesDesc'),
      icon: ['R', 'P', '1'].includes(key) ? 'solar:ruler-pen-bold-duotone' : key === '2' ? 'solar:history-bold-duotone' : key === '3' ? 'solar:users-group-two-rounded-bold-duotone' : 'solar:link-circle-bold-duotone',
      color: ['R', 'P', '1'].includes(key) ? 'bg-brand-navy' : key === '2' ? 'bg-brand-orange' : key === '3' ? 'bg-teal-600' : 'bg-rose-500',
      bookCover: "/images/ourbooks/Arabic Shamel Series.png",
      pdfUrl: "#"
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-background text-foreground transition-colors duration-300">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-brand-navy pt-24 pb-0 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background: Blueprint Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed font-light">
            {t('description')}
          </p>
        </div>
      </section>

      {/* ================= TOPICS GRID (The "Smart Cards") ================= */}

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
