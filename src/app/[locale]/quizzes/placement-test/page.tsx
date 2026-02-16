import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.placementTest' });
  return { title: t('title'), description: t('description') };
}

export default async function PlacementTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.placementTest' });

  // --- How it Works Steps ---
  const steps = [
    { title: t('step1'), desc: t('step1Desc'), icon: 'solar:laptop-minimalistic-bold-duotone' },
    { title: t('step2'), desc: t('step2Desc'), icon: 'mdi:brain' },
    { title: t('step3'), desc: t('step3Desc'), icon: 'solar:diploma-verified-bold-duotone' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-background">
      
      {/* Hero Section */}
      <section className="bg-brand-navy pt-32 pb-24 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        {/* Radar/Target Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full"></div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)]">
             <Icon icon="solar:target-bold-duotone" className="text-5xl text-brand-orange" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">{t('description')}</p>
        </div>
      </section>

      {/* Main Card */}
      <section className="py-20 -mt-16 relative z-20 px-4">
        <div className="container mx-auto max-w-5xl">
          
          <div className="bg-white dark:bg-brand-navy-dark rounded-[3rem] p-10 md:p-16 shadow-soft border border-gray-100 dark:border-white/5 text-center relative overflow-hidden">
             
             {/* Decorative Side Blobs */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-sky/5 rounded-tr-full pointer-events-none"></div>

             {/* Stats Row */}
             <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-12">
               <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 px-6 py-3 rounded-2xl">
                 <Icon icon="solar:clock-circle-bold-duotone" className="text-2xl text-brand-orange" />
                 <div className="text-left rtl:text-right">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('durationLabel')}</div>
                    <div className="text-lg font-bold text-brand-navy dark:text-white">{t('duration')}</div>
                 </div>
               </div>
               <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 px-6 py-3 rounded-2xl">
                 <Icon icon="solar:list-check-bold-duotone" className="text-2xl text-brand-sky" />
                 <div className="text-left rtl:text-right">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('questionsLabel')}</div>
                    <div className="text-lg font-bold text-brand-navy dark:text-white">{t('questions')}</div>
                 </div>
               </div>
             </div>

             <div className="h-px w-full bg-gray-100 dark:bg-white/5 mb-12"></div>

             {/* Call to Action */}
             <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-4">{t('readyTitle')}</h3>
             <p className="text-gray-500 mb-8 max-w-lg mx-auto">{t('readyDesc')}</p>

             <button className="px-12 py-5 rounded-2xl bg-brand-orange text-white text-xl font-bold hover:bg-brand-orange-dark hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-3 mx-auto shadow-brand-orange/20">
               {t('startAction')}
               <Icon icon="solar:play-circle-bold-duotone" className="text-3xl" />
             </button>
          </div>

          {/* How it Works Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                   <div className="w-16 h-16 rounded-2xl bg-brand-navy/5 dark:bg-white/5 flex items-center justify-center mb-4 text-brand-navy dark:text-white">
                      <Icon icon={step.icon} className="text-3xl" />
                   </div>
                   <h4 className="font-bold text-lg mb-2 text-brand-navy dark:text-white">{step.title}</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
             ))}
          </div>

        </div>
      </section>
    </main>
  );
}

