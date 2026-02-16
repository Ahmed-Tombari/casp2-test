import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'services.account' });
  return { title: t('title') };
}

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'services.account' });

  return (
    // FIX: Explicitly using dark:bg-[#09121E] to ensure deep dark background
    <main className="min-h-screen bg-gray-50 dark:bg-[#09121E] pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl px-4">
        
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 rounded-xl bg-brand-navy text-white flex items-center justify-center shadow-lg">
              <Icon icon="solar:settings-bold-duotone" className="text-2xl" />
           </div>
           <h1 className="text-3xl font-bold text-brand-navy dark:text-white transition-colors">{t('title')}</h1>
        </div>

        {/* FIX: Card background set to dark:bg-[#112240] (Lighter Navy) for contrast against the locale */}
        <div className="bg-white dark:bg-[#112240] rounded-[2rem] shadow-soft dark:shadow-none p-8 md:p-12 border border-brand-sky/10 dark:border-white/5 transition-all">
           
           {/* Avatar Section */}
           <div className="flex items-center gap-6 mb-12 pb-12 border-b border-gray-100 dark:border-white/5">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-black/20 flex items-center justify-center relative shrink-0">
                 <Icon icon="solar:user-bold" className="text-4xl text-gray-400 dark:text-gray-500" />
                 <button className="absolute bottom-0 right-0 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform hover:bg-brand-orange-dark">
                    <Icon icon="solar:camera-add-bold" className="text-sm" />
                 </button>
              </div>
              <div>
                 <h2 className="text-xl font-bold text-brand-navy dark:text-white transition-colors">Ahmed Student</h2>
                 <p className="text-gray-500 dark:text-gray-400 text-sm">student@example.com</p>
              </div>
           </div>

           {/* Form */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t('fullName')}</label>
                 {/* FIX: Input backgrounds dark:bg-black/20 for "cut-out" effect */}
                 <input 
                    type="text" 
                    defaultValue="Ahmed Student" 
                    className="w-full h-14 px-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 text-brand-navy dark:text-white focus:border-brand-navy focus:ring-0 transition-all outline-none" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t('email')}</label>
                 <input 
                    type="email" 
                    defaultValue="student@example.com" 
                    disabled 
                    className="w-full h-14 px-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t('phone')}</label>
                 <input 
                    type="tel" 
                    placeholder="+216 ..." 
                    className="w-full h-14 px-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 text-brand-navy dark:text-white focus:border-brand-navy focus:ring-0 transition-all outline-none" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t('language')}</label>
                 <div className="relative">
                    <select className="w-full h-14 px-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 text-brand-navy dark:text-white focus:border-brand-navy focus:ring-0 transition-all outline-none appearance-none">
                        <option className="dark:bg-brand-navy-dark">العربية</option>
                        <option className="dark:bg-brand-navy-dark">English</option>
                        <option className="dark:bg-brand-navy-dark">Français</option>
                    </select>
                    <div className="absolute top-1/2 right-4 rtl:left-4 rtl:right-auto -translate-y-1/2 pointer-events-none text-gray-400">
                        <Icon icon="solar:alt-arrow-down-bold" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex justify-end">
              <button className="px-8 py-4 bg-brand-navy text-white font-bold rounded-xl shadow-soft hover:shadow-lg hover:-translate-y-1 hover:bg-brand-navy-light transition-all flex items-center gap-2">
                 <Icon icon="solar:diskette-bold" />
                 {t('saveChanges')}
              </button>
           </div>

        </div>
      </div>
    </main>
  );
}

