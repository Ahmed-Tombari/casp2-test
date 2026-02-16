import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'platforms.mybook' });
  return { title: t('title'), description: t('description') };
}

export default async function MyBookPlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'platforms.mybook' });

  return (
    <main className="min-h-screen bg-brand-navy-dark text-white relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-sky/10 rounded-full blur-[150px] pointer-events-none"></div>

      <section className="container mx-auto max-w-7xl px-4 py-32 relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
         
         <div className="w-24 h-24 bg-brand-orange rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(244,121,32,0.4)] animate-pulse-slow">
            <Icon icon="solar:book-bookmark-bold-duotone" className="text-5xl text-white" />
         </div>

         <h1 className="text-5xl md:text-8xl font-extrabold mb-8 tracking-tight">{t('title')}</h1>
         <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">{t('description')}</p>

         <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mx-auto">
            <button className="flex-1 py-5 rounded-2xl bg-white text-brand-navy font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-3">
               <Icon icon="solar:laptop-minimalistic-bold" className="text-2xl" />
               {t('openWebReader')}
            </button>
            <button className="flex-1 py-5 rounded-2xl bg-white/10 text-white font-bold text-lg border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-3 backdrop-blur-md">
               <Icon icon="solar:cloud-download-bold" className="text-2xl" />
               {t('downloadApp')}
            </button>
         </div>

         {/* Floating Features */}
         <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[ 
               { icon: 'solar:headphones-round-sound-bold', title: t('audioBooks'), desc: t('audioDesc') },
               { icon: 'solar:pen-new-square-bold', title: t('smartNotes'), desc: t('notesDesc') },
               { icon: 'solar:devices-bold', title: t('multiDevice'), desc: t('deviceDesc') },
            ].map((item, i) => (
               <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                  <Icon icon={item.icon} className="text-3xl text-brand-orange mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
               </div>
            ))}
         </div>

      </section>
    </main>
  );
}



