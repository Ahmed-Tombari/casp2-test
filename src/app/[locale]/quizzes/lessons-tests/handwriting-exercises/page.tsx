import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

interface Worksheet {
  id: number;
  letter: string;
  title: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.handwritingExercises' });
  return { title: t('title'), description: t('description') };
}

export default async function HandwritingExercisesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.handwritingExercises' });

  // Mock Data: Sheets
  const sheets: Worksheet[] = [
    { id: 1, letter: 'أ', title: t('sheetAlif') },
    { id: 2, letter: 'ب', title: t('sheetBa') },
    { id: 3, letter: 'ج', title: t('sheetJim') },
    { id: 4, letter: 'د', title: t('sheetDal') },
    { id: 5, letter: 'ر', title: t('sheetRa') },
    { id: 6, letter: 'س', title: t('sheetSin') },
  ];

  return (
    <main className="min-h-screen bg-[#F9F7F2] dark:bg-background"> {/* Paper-like background */}
      
      {/* Hero Section */}
      <section className="bg-brand-navy pt-32 pb-24 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
             <Icon icon="solar:pen-new-square-bold-duotone" className="text-4xl text-brand-gold" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">{t('description')}</p>
        </div>
      </section>

      {/* Copybook Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy dark:text-white">{t('practiceSheets')}</h2>
              <p className="text-gray-500">{t('chooseLetter')}</p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {sheets.map((sheet) => (
                 <div key={sheet.id} className="group relative bg-white dark:bg-brand-navy-dark p-2 rounded-[2rem] shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2">
                    {/* Visual of Lined Paper */}
                    <div className="relative aspect-[4/5] bg-[#fff] border-2 border-gray-100 rounded-[1.5rem] overflow-hidden flex flex-col items-center justify-center mb-4">
                        {/* Lines */}
                        <div className="absolute inset-0 w-full h-full flex flex-col justify-evenly opacity-10 pointer-events-none">
                           {[...Array(10)].map((_, i) => <div key={i} className="w-full h-px bg-brand-navy"></div>)}
                        </div>
                        
                        {/* The Letter */}
                        <span className="text-9xl font-serif text-brand-navy/10 group-hover:text-brand-orange transition-colors duration-500 z-10">
                           {sheet.letter}
                        </span>
                        
                        {/* Overlay Button */}
                        <div className="absolute inset-0 bg-brand-navy/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                           <button className="px-6 py-3 bg-brand-gold text-brand-navy-dark font-bold rounded-xl shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <Icon icon="solar:printer-bold" />
                              <span>{t('print')}</span>
                           </button>
                        </div>
                    </div>
                    
                    <div className="text-center pb-2">
                       <h3 className="text-xl font-bold text-brand-navy dark:text-white">{sheet.title}</h3>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>
    </main>
  );
}

