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
  const t = await getTranslations({ locale, namespace: 'store.alShamil' });
  return { title: t('title'), description: t('description') };
}

export default async function AlShamilPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alShamil' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });

  // --- Features: Why Al-Shamil? ---
  const features: Feature[] = [
    { title: t('academicRigor'), desc: t('academicDesc'), icon: 'solar:diploma-verified-bold-duotone' },
    { title: t('modernTopics'), desc: t('modernDesc'), icon: 'solar:global-bold-duotone' },
    { title: t('skillIntegration'), desc: t('skillDesc'), icon: 'solar:layers-minimalistic-bold-duotone' },
  ];

  // --- The Levels (Modules) ---
  const levelKeys = ['1', '2', '3', '4'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    const isAdvanced = ['3', '6', '7', '8', '9', '10'].includes(key);
    const isIntermediate = ['2', '4', '5'].includes(key);

    return {
      id,
      title: tLevels(titleKey),
      subtitle: t(isAdvanced ? 'level3Sub' : isIntermediate ? 'level2Sub' : 'level1Sub'),
      topics: isAdvanced ? [t('topicMedia'), t('topicCulture'), t('topicLiterature')] : 
              isIntermediate ? [t('topicTravel'), t('topicHealth'), t('topicShopping')] :
              [t('topicGreeting'), t('topicFamily'), t('topicDaily')],
      color: isAdvanced ? 'bg-brand-navy' : isIntermediate ? 'bg-brand-sky' : 'bg-emerald-500',
      bookCover: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/shamil-book/shamil-${key}/cover/${key}.jpg`,
      pdfUrl: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/shamil-book/shamil-${key}/${key}.pdf`
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-brand-navy pt-32 pb-1 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background: Architectural Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 text-brand-gold-light text-sm font-bold mb-8 backdrop-blur-md">
            <Icon icon="solar:hat-graduation-bold" className="text-brand-gold" />
            <span>{t('forUniversities')}</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            {t('description')}
          </p>

        </div>
      </section>

      {/* ================= METHODOLOGY ================= */}
      <section className="py-20 -mt-12 relative z-20 px-4">
         <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {features.map((feature, i) => (
                  <div key={i} className="bg-white dark:bg-brand-navy-dark p-8 rounded-4xl shadow-soft hover:-translate-y-2 transition-transform duration-300 border-t-4 border-brand-gold flex flex-col items-center text-center">
                     <div className="w-16 h-16 rounded-full bg-brand-navy/5 text-brand-navy dark:text-brand-sky flex items-center justify-center mb-6 text-3xl">
                        <Icon icon={feature.icon} />
                     </div>
                     <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-3">{feature.title}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
               {t('academicPath')}
            </h2>
            <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
          </div>

      <PdfBookGrid 
        levels={levels} 
      />

    </main>
  );
}
