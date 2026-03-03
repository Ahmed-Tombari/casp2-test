import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.tareeqAlMuneerFr' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/store/tareeq-al-muneer-fr`,
      languages: {
        ar: '/ar/store/tareeq-al-muneer-fr',
        fr: '/fr/store/tareeq-al-muneer-fr',
        en: '/en/store/tareeq-al-muneer-fr',
      },
    },
  };
}

export default async function TareeqAlMuneerFrPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.tareeqAlMuneerFr' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });



  // --- The Learning Stages ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const levels = levelKeys.map(key => {
    const id = key;

    return {
      bookId: `tareeq-fr-${key}`,
      id,
      title: tLevels(key),
      color: "bg-blue-50 text-blue-500",
      border: "border-blue-300",
      bookCover: "/images/ourbooks/Illuminating Path Series.png",
      pdfUrl: "#"
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-blue-600 pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Decorative Background & Icons */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
             {/* Abstract curves */}
             <svg className="absolute bottom-0 left-0 w-full h-1/2 text-white/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
             </svg>
             <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white/10 rounded-full animate-spin-slow" style={{animationDuration: '20s'}}></div>
             <div className="absolute top-40 right-40 w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse"></div>
             <Icon icon="solar:map-point-bold" className="absolute top-10 right-10 text-9xl text-white animate-pulse-slow" />
             <Icon icon="solar:compass-bold" className="absolute bottom-20 left-10 text-8xl text-white animate-bounce-slow" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed mb-2">
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
