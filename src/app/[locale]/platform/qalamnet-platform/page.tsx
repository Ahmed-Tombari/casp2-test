import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'platforms.qalamnet' });
  return { title: t('title'), description: t('description') };
}

export default async function QalamNetPlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'platforms.qalamnet' });

  return (
    <main className="min-h-screen bg-teal-50/30 dark:bg-background">
      
      {/* Centered Modern Layout */}
      <section className="container mx-auto max-w-6xl px-4 py-24 lg:py-32">
         <div className="bg-white dark:bg-brand-navy-dark rounded-[3rem] shadow-soft-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            
            {/* Visual Side */}
            <div className="w-full md:w-5/12 bg-teal-600 relative p-12 flex flex-col justify-between text-white">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center mb-8">
                     <Icon icon="solar:pen-new-square-bold-duotone" className="text-3xl text-white" />
                  </div>
                  <h1 className="text-4xl font-extrabold mb-4">{t('title')}</h1>
                  <p className="text-teal-100 leading-relaxed">{t('description')}</p>
               </div>
               
               {/* Community Stats */}
               <div className="relative z-10 flex gap-6 pt-12 border-t border-white/20">
                  <div>
                     <div className="text-2xl font-bold">5k+</div>
                     <div className="text-xs text-teal-200 uppercase">{t('writers')}</div>
                  </div>
                  <div>
                     <div className="text-2xl font-bold">120+</div>
                     <div className="text-xs text-teal-200 uppercase">{t('groups')}</div>
                  </div>
               </div>
            </div>

            {/* Content/Login Side */}
            <div className="w-full md:w-7/12 p-12 lg:p-16 flex flex-col justify-center">
               <div className="mb-10">
                  <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">{t('joinCommunity')}</h2>
                  <p className="text-gray-500">{t('communityDesc')}</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <button className="h-16 rounded-2xl border-2 border-gray-100 dark:border-white/10 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all flex items-center px-4 gap-3 group">
                     <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <Icon icon="solar:users-group-rounded-bold" />
                     </div>
                     <div className="text-start">
                        <div className="text-sm font-bold text-gray-700 dark:text-gray-200">{t('studentPortal')}</div>
                     </div>
                  </button>
                  <button className="h-16 rounded-2xl border-2 border-gray-100 dark:border-white/10 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all flex items-center px-4 gap-3 group">
                     <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        <Icon icon="solar:presentation-graph-bold" />
                     </div>
                     <div className="text-start">
                        <div className="text-sm font-bold text-gray-700 dark:text-gray-200">{t('teacherPortal')}</div>
                     </div>
                  </button>
               </div>
            </div>

         </div>
      </section>
    </main>
  );
}

