import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours
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


  // --- The Levels ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    return {
      bookId: `hidayah-en-${key}`,
      id,
      title: tLevels(titleKey),
      desc: t(['R', 'P', '1'].includes(key) ? 'level1Desc' : key === '2' ? 'level2Desc' : key === '3' ? 'level3Desc' : 'level4Desc'),
      icon: ['R', 'P', '1'].includes(key) ? 'solar:leaf-bold-duotone' : key === '2' ? 'solar:sun-2-bold-duotone' : key === '3' ? 'solar:map-point-bold-duotone' : 'solar:user-hand-up-bold-duotone',
      color: ['R', 'P', '1'].includes(key) ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : key === '2' ? 'bg-brand-gold-light/20 text-brand-gold-dark dark:bg-brand-gold/10 dark:text-brand-gold' : key === '3' ? 'bg-brand-navy-light/20 text-brand-navy dark:bg-brand-navy/30 dark:text-brand-sky' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      border: ['R', 'P', '1'].includes(key) ? 'border-emerald-200 dark:border-emerald-800' : key === '2' ? 'border-brand-gold/30' : key === '3' ? 'border-brand-navy/20' : 'border-indigo-200 dark:border-indigo-800',
      bookCover: "/images/ourbooks/Arabic Garden Series.png", // Use valid fallback
      pdfUrl: "#"
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09121E] text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #EAB308 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <Icon icon="solar:moon-stars-bold" className="absolute top-10 right-10 text-9xl text-brand-gold animate-pulse-slow" />
           <Icon icon="solar:stars-minimalistic-bold-duotone" className="absolute bottom-20 left-10 text-8xl text-brand-sky animate-pulse-slow" style={{animationDelay: '1.5s'}} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">{t('title')}</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed mb-2 font-light">{t('description')}</p>
        </div>
      </section>

      <PdfBookGrid 
        levels={levels} 
      />

    </main>
  );
}
