import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';



export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alShamil' });
  return { title: t('title'), description: t('description') };
}

export default async function AlShamilPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alShamil' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });



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
      bookId: `shamil-${key}`,
      id,
      title: tLevels(titleKey),
      subtitle: t(isAdvanced ? 'level3Sub' : isIntermediate ? 'level2Sub' : 'level1Sub'),
      topics: isAdvanced ? [t('topicMedia'), t('topicCulture'), t('topicLiterature')] : 
              isIntermediate ? [t('topicTravel'), t('topicHealth'), t('topicShopping')] :
              [t('topicGreeting'), t('topicFamily'), t('topicDaily')],
      color: isAdvanced ? 'bg-brand-navy' : isIntermediate ? 'bg-brand-sky' : 'bg-emerald-500',
      bookCover: `/pdfbooks/store-book/shamil-book/shamil-${key}/${key}.jpg`,
      pdfUrl: `/api/books/store-book/shamil-book/shamil-${key}/${key}.pdf`
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-brand-navy pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background: Architectural Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-2 font-light">
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
