import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

interface ColoringPage {
  letter: string;
  animal: string; // e.g. "Asad" (Lion)
  color: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.letterColoring' });
  return { title: t('title'), description: t('description') };
}

export default async function LetterColoringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.letterColoring' });

  // Mock Data
  const pages: ColoringPage[] = [
    { letter: 'أ', animal: t('animalLion'), color: 'bg-rose-100 text-rose-500' },
    { letter: 'ب', animal: t('animalDuck'), color: 'bg-sky-100 text-sky-500' },
    { letter: 'ت', animal: t('animalCrocodile'), color: 'bg-emerald-100 text-emerald-500' },
    { letter: 'ث', animal: t('animalFox'), color: 'bg-amber-100 text-amber-500' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-background">
      
      {/* Hero Section */}
      <section className="bg-brand-navy pt-32 pb-24 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        {/* Colorful Blobs Background */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-orange rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-brand-sky rounded-full blur-3xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
             <Icon icon="solar:palette-bold-duotone" className="text-4xl text-brand-orange-light" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">{t('description')}</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {pages.map((locale, i) => (
                 <div key={i} className="group relative rounded-[2rem] overflow-hidden border-4 border-gray-100 dark:border-gray-800 hover:border-brand-sky transition-all duration-300">
                    
                    {/* Preview Area */}
                    <div className={`aspect-square ${locale.color} flex flex-col items-center justify-center relative`}>
                        <span className="text-[8rem] font-bold opacity-20 group-hover:scale-110 transition-transform duration-500">{locale.letter}</span>
                        <div className="absolute bottom-4 font-bold uppercase tracking-widest opacity-60">{locale.animal}</div>
                        
                        {/* Hover Action */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                           <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-navy hover:scale-110 transition-transform">
                              <Icon icon="solar:download-bold" className="text-xl" />
                           </button>
                        </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-brand-navy-dark text-center">
                       <h3 className="font-bold text-gray-700 dark:text-gray-200">{t('letter')} {locale.letter}</h3>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-12 text-center">
              <button className="px-10 py-4 bg-brand-orange text-white font-bold rounded-2xl shadow-3d hover:shadow-3d-pressed hover:translate-y-1 transition-all flex items-center gap-2 mx-auto">
                 <Icon icon="solar:file-download-bold" className="text-xl" />
                 <span>{t('downloadAll')}</span>
              </button>
           </div>
        </div>
      </section>
    </main>
  );
}

