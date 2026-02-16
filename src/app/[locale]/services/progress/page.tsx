import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'services.progress' });
  return { title: t('title') };
}

export default async function ProgressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'services.progress' });

  // Skills Data
  const skills = [
    { name: t('reading'), score: 85, color: 'bg-emerald-500' },
    { name: t('writing'), score: 60, color: 'bg-brand-orange' },
    { name: t('listening'), score: 92, color: 'bg-brand-sky' },
    { name: t('speaking'), score: 70, color: 'bg-brand-gold' },
  ];

  return (
    // FIX: Explicitly using dark:bg-[#09121E] for the locale background
    <main className="min-h-screen bg-gray-50 dark:bg-[#09121E] pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
           <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy dark:text-white mb-4 transition-colors">
             {t('title')}
           </h1>
           <p className="text-gray-500 dark:text-gray-400 text-lg">
             {t('subtitle')}
           </p>
        </div>

        {/* Overall Score Card */}
        {/* FIX: Using dark:bg-[#112240] for the card background */}
        <div className="bg-white dark:bg-[#112240] rounded-[2.5rem] p-8 md:p-12 shadow-soft dark:shadow-none border border-transparent dark:border-white/5 mb-10 flex flex-col md:flex-row items-center gap-10 transition-all">
           
           {/* Circular Chart */}
           <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
              <div 
                className="absolute inset-0 rounded-full" 
                style={{background: 'conic-gradient(#2B5A96 78%, #e5e7eb 0)'}} 
              />
              {/* Inner Circle (The Mask) - Matches Card Background */}
              <div className="absolute inset-4 bg-white dark:bg-[#112240] rounded-full flex flex-col items-center justify-center transition-colors">
                 <span className="text-4xl font-black text-brand-navy dark:text-white">78%</span>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('totalScore')}</span>
              </div>
           </div>

           {/* Feedback Text */}
           <div className="flex-1 text-center md:text-start rtl:md:text-right">
              <h2 className="text-2xl font-bold mb-4 text-brand-navy dark:text-white">{t('greatJob')}</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                {t('feedbackText')}
              </p>
              
              {/* Stats Badge */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                 <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 rounded-lg font-bold text-sm border border-green-100 dark:border-green-500/20">
                    <Icon icon="solar:graph-up-bold" /> 
                    <span>+12% {t('thisMonth')}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Skills Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {skills.map((skill, i) => (
              // FIX: Using dark:bg-[#112240] for skill cards
              <div key={i} className="bg-white dark:bg-[#112240] p-6 rounded-3xl shadow-soft dark:shadow-none border border-transparent dark:border-white/5 hover:border-brand-sky/20 transition-all">
                 <div className="flex justify-between mb-4">
                    <h3 className="font-bold text-lg text-brand-navy dark:text-white">{skill.name}</h3>
                    <span className="font-bold text-brand-navy dark:text-white">{skill.score}%</span>
                 </div>
                 
                 {/* Progress Bar Track - Darker track for dark mode */}
                 <div className="w-full h-4 bg-gray-100 dark:bg-black/20 rounded-full overflow-hidden">
                    <div 
                       className={`h-full rounded-full ${skill.color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`} 
                       style={{width: `${skill.score}%`}}
                    ></div>
                 </div>
              </div>
           ))}
        </div>

      </div>
    </main>
  );
}

