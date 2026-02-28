import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
    bookId: `mufid-${key}`,
    id: key,
    title: tLevels(key),
    bookCover: `/pdfbooks/store-book/mufid-book/mufid-${key}/${key}-1.png`,
    pdfUrl: `/api/books/store-book/mufid-book/mufid-${key}/${key}-1.pdf`
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-brand-orange pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-orange-50 max-w-3xl mx-auto leading-relaxed mb-2 font-light">
            {t('description')}
          </p>

        </div>
      </section>



      {/* ================= LEVELS GRID ================= */}

      <PdfBookGrid levels={levels} />
    </main>
  );
}
