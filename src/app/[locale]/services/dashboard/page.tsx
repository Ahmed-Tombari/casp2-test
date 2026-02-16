import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'services.dashboard' });
  return { title: t('title') };
}

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'services.dashboard' });
  const isRTL = locale === 'ar';

  return (
    // FIX: Explicitly using dark:bg-[#09121E] to ensure deep dark background
    <main className="min-h-screen bg-gray-50 dark:bg-[#09121E] pt-28 pb-20 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
           <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy dark:text-white mb-2 transition-colors">
                 {t('welcomeBack')}, <span className="text-brand-orange">Ahmed</span> 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium">{t('motivationalQuote')}</p>
           </div>
           <button className="px-6 py-3 bg-brand-navy text-white rounded-xl font-bold shadow-soft hover:bg-brand-navy-light hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2">
              <Icon icon="solar:play-circle-bold" className="text-xl" />
              {t('resumeLearning')}
           </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           
           {/* Time Card - FIX: Using dark:bg-[#112240] for cards */}
           <div className="bg-white dark:bg-[#112240] p-6 rounded-3xl shadow-soft dark:shadow-none border border-brand-sky/10 dark:border-white/5 flex items-center gap-4 transition-all hover:border-brand-sky/30">
              <div className="w-14 h-14 rounded-full bg-brand-sky/10 dark:bg-brand-sky/20 text-brand-sky flex items-center justify-center text-3xl">
                 <Icon icon="solar:clock-circle-bold-duotone" />
              </div>
              <div>
                 <div className="text-2xl font-bold text-brand-navy dark:text-white">12.5 {t('hours')}</div>
                 <div className="text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">{t('learningTime')}</div>
              </div>
           </div>

           {/* Streak Card */}
           <div className="bg-white dark:bg-[#112240] p-6 rounded-3xl shadow-soft dark:shadow-none border border-brand-orange/10 dark:border-white/5 flex items-center gap-4 transition-all hover:border-brand-orange/30">
              <div className="w-14 h-14 rounded-full bg-brand-orange/10 dark:bg-brand-orange/20 text-brand-orange flex items-center justify-center text-3xl">
                 <Icon icon="solar:fire-bold-duotone" />
              </div>
              <div>
                 <div className="text-2xl font-bold text-brand-navy dark:text-white">5 {t('days')}</div>
                 <div className="text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">{t('streak')}</div>
              </div>
           </div>

           {/* Points Card */}
           <div className="bg-white dark:bg-[#112240] p-6 rounded-3xl shadow-soft dark:shadow-none border border-brand-gold/10 dark:border-white/5 flex items-center gap-4 transition-all hover:border-brand-gold/30">
              <div className="w-14 h-14 rounded-full bg-brand-gold/10 dark:bg-brand-gold/20 text-brand-gold flex items-center justify-center text-3xl">
                 <Icon icon="solar:cup-star-bold-duotone" />
              </div>
              <div>
                 <div className="text-2xl font-bold text-brand-navy dark:text-white">1,250</div>
                 <div className="text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">{t('points')}</div>
              </div>
           </div>
        </div>

        {/* Active Course Card - FIX: Using dark:bg-[#112240] */}
        <div className="bg-brand-navy dark:bg-[#112240] text-white rounded-[2.5rem] p-8 md:p-12 shadow-soft-lg dark:shadow-none dark:border dark:border-white/10 relative overflow-hidden mb-10 group">
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-20"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-2/3">
                 <span className="inline-block px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold mb-4 uppercase tracking-wider shadow-sm">{t('inProgress')}</span>
                 <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{t('courseTitle')}</h2>
                 <p className="text-brand-sky-light dark:text-gray-300 mb-6 font-medium">{t('currentLesson')}: <span className="text-white">{t('lessonName')}</span></p>
                 
                 {/* Progress Bar */}
                 <div className="flex items-center gap-4">
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-orange w-[65%] rounded-full shadow-[0_0_15px_rgba(244,121,32,0.6)] animate-pulse-slow"></div>
                    </div>
                    <div className="text-sm font-bold whitespace-nowrap">65% {t('completed')}</div>
                 </div>
              </div>

              {/* Play Button Visual */}
              <div className="w-full md:w-1/3 flex justify-center">
                 <button className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center backdrop-blur-md hover:bg-white hover:text-brand-navy hover:scale-110 transition-all duration-300 shadow-xl group/play">
                    <Icon icon="solar:play-bold" className="text-4xl ml-1 group-hover/play:text-brand-navy transition-colors" />
                 </button>
              </div>
           </div>
        </div>

      </div>
    </main>
  );
}

