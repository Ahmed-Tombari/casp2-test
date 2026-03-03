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
    const id = key;
    return {
      bookId: `hidayah-en-${key}`,
      id,
      title: tLevels(key),
      color: "bg-brand-navy text-brand-navy",
      border: "border-brand-navy",
      bookCover: "/images/ourbooks/Arabic Garden Series.png", // Use valid fallback
      pdfUrl: "#"
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09121E] text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <Icon icon="solar:moon-stars-bold" className="absolute top-10 right-10 text-9xl text-white animate-pulse-slow" />
           <Icon icon="solar:stars-minimalistic-bold" className="absolute bottom-20 left-10 text-8xl text-white animate-pulse-slow" style={{animationDelay: '1.5s'}} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">{t('title')}</h1>
           <p className="text-xl text-brand-sky-light max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
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
