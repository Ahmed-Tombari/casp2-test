import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'services' });
  return { title: t('title'), description: t('description') };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'services' });

  const services = [
    {
      title: t('curriculumDesign'),
      desc: t('curriculumDesc'),
      icon: 'solar:ruler-pen-bold-duotone',
      color: 'bg-brand-navy',
    },
    {
      title: t('teacherTraining'),
      desc: t('trainingDesc'),
      icon: 'solar:black-hole-bold-duotone',
      color: 'bg-brand-gold',
    },
    {
      title: t('digitalTransformation'),
      desc: t('digitalDesc'),
      icon: 'solar:laptop-minimalistic-bold-duotone',
      color: 'bg-brand-sky',
    },
    {
      title: t('consultancy'),
      desc: t('consultancyDesc'),
      icon: 'solar:chat-round-line-bold-duotone',
      color: 'bg-brand-orange',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      
      {/* Hero */}
      <section className="bg-brand-navy pt-32 pb-24 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{t('description')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 -mt-16 relative z-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-white dark:bg-brand-navy-dark p-8 rounded-[2.5rem] shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-start gap-6 border border-transparent hover:border-brand-sky/20">
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                   <Icon icon={service.icon} className="text-3xl text-white" />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-3">{service.title}</h3>
                   <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

