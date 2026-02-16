import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@iconify/react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'platforms.hub' });
  return { title: t('title'), description: t('description') };
}

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'platforms.hub' });
  const isRTL = locale === 'ar';

  const platforms = [
    {
      id: 'wafi',
      title: t('wafiTitle'),
      subtitle: t('wafiSubtitle'),
      desc: t('wafiDesc'),
      href: '/platform/wafi-platform',
      icon: 'solar:diploma-verified-bold-duotone',
      color: 'bg-brand-navy',
      lightColor: 'bg-brand-navy/5 text-brand-navy',
      action: t('enterCampus'),
      stats: '150+ ' + t('courses'),
    },
    {
      id: 'qalam',
      title: t('qalamTitle'),
      subtitle: t('qalamSubtitle'),
      desc: t('qalamDesc'),
      href: '/platform/qalamnet-platform',
      icon: 'solar:pen-new-square-bold-duotone',
      color: 'bg-teal-600',
      lightColor: 'bg-teal-50 text-teal-600',
      action: t('enterStudio'),
      stats: '5k+ ' + t('articles'),
    },
    {
      id: 'mybook',
      title: t('mybookTitle'),
      subtitle: t('mybookSubtitle'),
      desc: t('mybookDesc'),
      href: '/platform/mybook-platform',
      icon: 'solar:book-bookmark-bold-duotone',
      color: 'bg-brand-orange',
      lightColor: 'bg-brand-orange/10 text-brand-orange',
      action: t('enterLibrary'),
      stats: '1000+ ' + t('books'),
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-brand-navy pt-36 pb-32 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Animated Network Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-white/20 rounded-full animate-spin-slow" style={{animationDuration: '60s'}}></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-white/20 rounded-full animate-spin-slow" style={{animationDuration: '45s', animationDirection: 'reverse'}}></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 text-brand-sky-light text-sm font-bold mb-8 backdrop-blur-md shadow-inner-soft">
             <Icon icon="solar:server-square-cloud-bold" className="text-brand-gold" />
             <span>{t('digitalEcosystem')}</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            {t('description')}
          </p>
        </div>
      </section>

      {/* ================= PLATFORMS GRID ================= */}
      <section className="py-20 -mt-20 relative z-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {platforms.map((platform) => (
              <Link
                key={platform.id}
                href={platform.href}
                locale={locale}
                className="group relative flex flex-col bg-white dark:bg-brand-navy-dark rounded-[3rem] p-10 shadow-soft border border-transparent hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-soft-lg overflow-hidden h-full"
              >
                {/* Hover Fill Effect */}
                <div className={`absolute inset-0 opacity-0 ${platform.color} group-hover:opacity-100 transition-opacity duration-500 ease-out`} />

                {/* Top Badge */}
                <div className="flex justify-between items-start mb-10 relative z-10">
                   <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner-soft transition-all duration-500 group-hover:bg-white/20 group-hover:text-white group-hover:scale-110 ${platform.lightColor}`}>
                      <Icon icon={platform.icon} />
                   </div>
                   <span className="py-1 px-3 rounded-full bg-gray-50 dark:bg-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:bg-white/20 group-hover:text-white transition-colors">
                      {platform.stats}
                   </span>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow flex flex-col">
                   <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-hover:text-white/60 transition-colors">
                      {platform.subtitle}
                   </div>
                   <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white mb-4 group-hover:text-white transition-colors">
                      {platform.title}
                   </h2>
                   <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10 group-hover:text-white/80 transition-colors">
                      {platform.desc}
                   </p>

                   {/* Action Button */}
                   <div className="mt-auto flex items-center gap-2 font-bold text-lg group-hover:text-white transition-colors">
                      <span>{platform.action}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-brand-navy transition-all">
                         <Icon icon="solar:arrow-right-linear" className={isRTL ? "rotate-180" : ""} />
                      </div>
                   </div>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* ================= UNIFIED LOGIN CTA ================= */}
      <section className="pb-32 pt-10 px-4">
         <div className="container mx-auto max-w-4xl">
            <div className="bg-brand-sky/10 dark:bg-white/5 border border-brand-sky/20 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="text-center md:rtl:text-right md:ltr:text-left">
                  <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">{t('unifiedAccount')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">{t('unifiedDesc')}</p>
               </div>
               <button className="px-8 py-4 bg-brand-navy text-white font-bold rounded-2xl shadow-3d hover:shadow-3d-pressed hover:translate-y-1 transition-all flex items-center gap-2 whitespace-nowrap">
                  <Icon icon="solar:user-circle-bold" className="text-xl" />
                  {t('manageAccount')}
               </button>
            </div>
         </div>
      </section>

    </main>
  );
}


