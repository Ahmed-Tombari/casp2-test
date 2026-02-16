import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.theHappyMuslim' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/store/the-happy-muslim`,
      languages: {
        ar: '/ar/store/the-happy-muslim',
        fr: '/fr/store/the-happy-muslim',
        en: '/en/store/the-happy-muslim',
      },
    },
  };
}

export default async function TheHappyMuslimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.theHappyMuslim' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });

  // --- Core Pillars (Values) ---
  const pillars = [
    {
      title: t('identityTitle'),
      desc: t('identityDesc'),
      icon: 'solar:point-on-map-bold-duotone',
      color: 'bg-indigo-100',
      textColor: 'text-indigo-600',
    },
    {
      title: t('modernityTitle'),
      desc: t('modernityDesc'),
      icon: 'solar:laptop-minimalistic-bold-duotone',
      color: 'bg-brand-sky',
      textColor: 'text-brand-sky-dark',
    },
    {
      title: t('valuesTitle'),
      desc: t('valuesDesc'),
      icon: 'solar:medal-ribbon-star-bold-duotone',
      color: 'bg-brand-gold-light',
      textColor: 'text-brand-gold-dark',
    },
  ];

  // --- The Little Muslim Bookshelf ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6'];
  const levels = levelKeys.map(key => {
    let id = key;
    let titleKey = key;
    if (key === 'R') { id = 'kg'; titleKey = 'kg'; }
    else if (key === 'P') { id = 'prep'; titleKey = 'prep'; }

    return {
      id,
      title: tLevels(titleKey),
      desc: t(['R', 'P', '1'].includes(key) ? 'book1Desc' : key === '2' ? 'book2Desc' : key === '3' ? 'book3Desc' : 'book4Desc'),
      icon: ['R', 'P', '1'].includes(key) ? 'solar:sun-2-bold-duotone' : key === '2' ? 'solar:hand-shake-bold-duotone' : key === '3' ? 'solar:book-minimalistic-bold-duotone' : 'solar:globus-bold-duotone',
      color: ['R', 'P', '1'].includes(key) ? 'bg-brand-gold-light/20 text-brand-gold-dark dark:bg-brand-gold/10 dark:text-brand-gold' : key === '2' ? 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' : key === '3' ? 'bg-brand-navy-light/20 text-brand-navy dark:bg-brand-navy/30 dark:text-brand-sky' : 'bg-brand-sky-light/20 text-brand-sky-dark dark:bg-brand-sky/10 dark:text-brand-sky',
      border: ['R', 'P', '1'].includes(key) ? 'border-brand-gold/30' : key === '2' ? 'border-teal-200 dark:border-teal-800' : key === '3' ? 'border-brand-navy/20' : 'border-brand-sky/30',
      bookCover: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/happymuslimEn-book/happymuslimEn-${key}/cover/${key}-1.png`,
      pdfUrl: `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/happymuslimEn-book/happymuslimEn-${key}/${key}-1.pdf`
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* ================= HERO SECTION (Cloudy & Playful) ================= */}
      <section className="bg-brand-sky pt-32 pb-1 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Playful Floating Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <Icon icon="solar:cloud-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
           <Icon icon="solar:balloon-bold" className="absolute bottom-20 right-10 text-8xl text-rose-400 animate-bounce-slow" />
           <Icon icon="solar:cloud-bold" className="absolute top-40 right-40 text-7xl text-white opacity-50" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/20 border border-white/30 text-brand-sky-dark text-sm font-bold mb-8 backdrop-blur-md">
            <Icon icon="solar:star-rainbow-bold-duotone" className="text-brand-gold" />
            <span>{t('forYounger')}</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-sm leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-brand-sky-dark max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            {t('description')}
          </p>

        </div>
      </section>

      {/* ================= VALUES GRID (The Pillars) ================= */}
      <section className="py-16 -mt-12 relative z-20 px-4">
         <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {pillars.map((pillar, i) => (
                  <div key={i} className="bg-white dark:bg-brand-navy-dark p-10 rounded-[2.5rem] shadow-soft flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                     <div className={`w-16 h-16 rounded-2xl bg-opacity-10 ${pillar.color} ${pillar.textColor} flex items-center justify-center mb-4 text-3xl`}>
                        <Icon icon={pillar.icon} />
                     </div>
                     <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">{pillar.title}</h3>
                     <p className="text-sm text-brand-navy/60 dark:text-gray-400 leading-relaxed">{pillar.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= BOOKSHELF (The Bookshelves) ================= */}
      <div className="text-center py-10">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
               {t('ourBooks')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('booksDesc')}</p>
          </div>

      <PdfBookGrid 
        levels={levels} 
      />

    </main>
  );
}
