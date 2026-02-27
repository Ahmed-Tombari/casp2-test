import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';



export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alMufid' });
  return { title: t('title'), description: t('description') };
}

export default async function AlMufidPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alMufid' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });



  // --- Al Mufid Levels ---
  const levelKeys = ['1', '2', '3', '4', '5', '6'];
  const levels = levelKeys.map(key => ({
    id: key,
    title: tLevels(key),
    bookCover: `/pdfbooks/store-book/mufid-book/mufid-${key}/${key}-1.png`,
    pdfUrl: `/api/books/store-book/mufid-book/mufid-${key}/${key}-1.pdf`
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
