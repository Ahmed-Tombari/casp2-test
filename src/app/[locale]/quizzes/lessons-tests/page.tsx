import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

interface TestResource {
  id: string;
  title: string;
  category: string;
  level: string;
  size: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.lessonsTests' });
  return { title: t('title'), description: t('description') };
}

export default async function LessonsTestsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'quizzes.lessonsTests' });
  const isRTL = locale === 'ar';

  // Mock Data: Tests
  const tests: TestResource[] = [
    { id: '1', title: t('testGrammar1'), category: 'Grammar', level: 'Level 1', size: '1.2 MB' },
    { id: '2', title: t('testVocab1'), category: 'Vocabulary', level: 'Level 1', size: '1.5 MB' },
    { id: '3', title: t('testReading2'), category: 'Reading', level: 'Level 2', size: '2.1 MB' },
    { id: '4', title: t('testComp3'), category: 'Comprehension', level: 'Level 3', size: '1.8 MB' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-background text-foreground">
      
      {/* Hero Section */}
      <section className="bg-brand-navy pt-32 pb-24 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner-soft">
             <Icon icon="solar:checklist-minimalistic-bold-duotone" className="text-4xl text-brand-sky-light" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">{t('description')}</p>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          
          <div className="flex items-center justify-between mb-10">
             <h2 className="text-2xl font-bold text-brand-navy dark:text-white flex items-center gap-2">
               <Icon icon="solar:folder-check-bold-duotone" className="text-brand-orange" />
               {t('availableTests')}
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tests.map((test) => (
              <div 
                key={test.id} 
                className="group flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl bg-white dark:bg-brand-navy-dark shadow-soft border border-gray-100 dark:border-white/5 hover:border-brand-sky hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-5 w-full sm:w-auto">
                  <div className="w-16 h-16 rounded-2xl bg-brand-sky/10 dark:bg-brand-sky/20 flex items-center justify-center shrink-0 group-hover:bg-brand-sky group-hover:text-white transition-colors">
                    <Icon icon="solar:document-text-bold-duotone" className="text-3xl text-brand-sky" />
                  </div>
                  <div className="text-center sm:text-start sm:rtl:text-right">
                    <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full">{test.category}</span>
                       <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded-full">{test.level}</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy dark:text-white">{test.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">PDF • {test.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
                   <button className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold hover:bg-brand-navy hover:text-white transition-all flex items-center justify-center gap-2">
                     <Icon icon="solar:eye-bold" />
                   </button>
                   <button className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-brand-navy text-white font-bold hover:bg-brand-orange transition-all flex items-center justify-center gap-2 shadow-lg">
                     <Icon icon="solar:download-bold" />
                     <span>{t('download')}</span>
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

