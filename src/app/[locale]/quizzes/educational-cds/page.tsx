import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

interface CdProduct {
  id: string;
  title: string;
  category: string;
  desc: string;
  price: string;
  icon: string;
  color: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.educationalCDs' });
  return { title: t('title'), description: t('description') };
}

export default async function EducationalCDsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.educationalCDs' });
  const isRTL = locale === 'ar';

  // --- Features (Why buy CDs in 2026?) ---
  const features = [
    { title: t('offlineAccess'), desc: t('offlineDesc'), icon: 'solar:home-wifi-angle-bold' },
    { title: t('interactiveSoftware'), desc: t('interactiveDesc'), icon: 'solar:gamepad-old-bold-duotone' },
    { title: t('highQualityAudio'), desc: t('audioDesc'), icon: 'solar:music-library-bold-duotone' },
  ];

  // --- The Products ---
  const products: CdProduct[] = [
    { 
      id: 'garden-interactive', 
      title: t('gardenCdTitle'), 
      category: t('categorySoftware'), 
      desc: t('gardenCdDesc'), 
      price: '$25.00',
      icon: 'solar:leaf-bold-duotone',
      color: 'bg-emerald-500' 
    },
    { 
      id: 'wafi-audio', 
      title: t('wafiCdTitle'), 
      category: t('categoryAudio'), 
      desc: t('wafiCdDesc'), 
      price: '$19.00',
      icon: 'solar:library-bold-duotone',
      color: 'bg-brand-navy' 
    },
    { 
      id: 'happy-muslim-games', 
      title: t('happyCdTitle'), 
      category: t('categoryGames'), 
      desc: t('happyCdDesc'), 
      price: '$22.00',
      icon: 'solar:gamepad-bold-duotone',
      color: 'bg-brand-gold' 
    },
    { 
      id: 'tareeq-phonics', 
      title: t('tareeqCdTitle'), 
      category: t('categoryAudio'), 
      desc: t('tareeqCdDesc'), 
      price: '$15.00',
      icon: 'solar:microphone-large-bold-duotone',
      color: 'bg-brand-orange' 
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-brand-navy pt-32 pb-24 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background Spinning Disc Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[40px] border-white/5 rounded-full animate-spin-slow" style={{animationDuration: '30s'}}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-white/10 rounded-full"></div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 text-brand-sky-light text-sm font-bold mb-8 backdrop-blur-md">
             <Icon icon="solar:diskette-bold-duotone" className="text-brand-gold" />
             <span>{t('digitalLibrary')}</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="py-16 -mt-16 relative z-20 px-4">
         <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {features.map((feature, idx) => (
                  <div key={idx} className="glass p-6 flex flex-col items-center text-center shadow-soft-md bg-white dark:bg-brand-navy-dark">
                     <div className="w-14 h-14 rounded-full bg-brand-navy/5 text-brand-navy dark:text-brand-sky flex items-center justify-center mb-4 text-3xl">
                        <Icon icon={feature.icon} />
                     </div>
                     <h3 className="text-lg font-bold text-brand-navy dark:text-white mb-2">{feature.title}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= PRODUCTS SHOWCASE ================= */}
      <section className="py-16 pb-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {products.map((product) => (
              <div 
                key={product.id}
                className="group bg-white dark:bg-brand-navy-dark rounded-3xl p-4 shadow-soft border border-gray-100 dark:border-white/5 hover:shadow-soft-lg hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                {/* Visual Cover Art (Simulated Box/Disc) */}
                <div className={`aspect-square rounded-2xl ${product.color} relative overflow-hidden mb-6 flex items-center justify-center shadow-inner-soft`}>
                   
                   {/* Disc Shine Effect */}
                   <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   
                   {/* Central Icon */}
                   <Icon icon={product.icon} className="text-7xl text-white drop-shadow-md" />

                   {/* Corner Badge */}
                   <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-white/20">
                      {product.category}
                   </div>
                </div>

                {/* Info */}
                <div className="px-2 flex-grow flex flex-col">
                   <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2 group-hover:text-brand-orange transition-colors">
                      {product.title}
                   </h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
                      {product.desc}
                   </p>
                   
                   <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                      <span className="text-xl font-bold text-brand-navy dark:text-white">{product.price}</span>
                      <button className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center hover:bg-brand-orange transition-colors shadow-md">
                         <Icon icon="solar:cart-large-2-bold" className={isRTL ? "mr-0.5" : "ml-0.5"} />
                      </button>
                   </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}

