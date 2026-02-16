import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'platforms.wafi' });
  return { title: t('title'), description: t('description') };
}

export default async function WafiPlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'platforms.wafi' });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* Hero / Login Split */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row">
        
        {/* Left: Brand & Visuals */}
        <div className="w-full lg:w-1/2 bg-brand-navy relative overflow-hidden flex flex-col justify-center p-12 lg:p-20 text-center lg:text-start rounded-b-[4rem] lg:rounded-b-none lg:rounded-e-[5rem] z-10">
           {/* Abstract Nodes Pattern */}
           <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-sky/20 rounded-full blur-[100px]"></div>

           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 border border-white/20 text-brand-sky-light text-sm font-bold mb-8 backdrop-blur-md">
                 <Icon icon="solar:diploma-verified-bold" />
                 <span>{t('lmsSystem')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">{t('title')}</h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">{t('description')}</p>
              
              {/* Features List */}
              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                 {[t('feat1'), t('feat2'), t('feat3')].map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                       <div className="w-8 h-8 rounded-full bg-brand-sky text-brand-navy flex items-center justify-center shrink-0">
                          <Icon icon="solar:check-read-bold" />
                       </div>
                       <span className="text-white font-medium">{feat}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Login Action */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-brand-navy-dark flex items-center justify-center p-8 lg:p-20">
           <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                 <div className="w-20 h-20 bg-brand-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon icon="solar:user-circle-bold-duotone" className="text-4xl text-brand-navy" />
                 </div>
                 <h2 className="text-3xl font-bold text-brand-navy dark:text-white">{t('studentLogin')}</h2>
                 <p className="text-gray-500 mt-2">{t('loginDesc')}</p>
              </div>

              {/* Fake Login Form Visual */}
              <div className="space-y-4">
                 <div className="h-14 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center px-4 text-gray-400">
                    <Icon icon="solar:letter-bold" className="mr-3 text-xl" />
                    <span>email@example.com</span>
                 </div>
                 <div className="h-14 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center px-4 text-gray-400">
                    <Icon icon="solar:lock-password-bold" className="mr-3 text-xl" />
                    <span>••••••••</span>
                 </div>
                 <button className="w-full h-14 bg-brand-navy text-white font-bold rounded-xl shadow-lg shadow-brand-navy/20 hover:bg-brand-navy-light transition-all flex items-center justify-center gap-2">
                    {t('loginBtn')}
                    <Icon icon="solar:login-2-bold" />
                 </button>
              </div>
              
              <div className="text-center">
                 <a href="#" className="text-sm font-bold text-brand-sky hover:underline">{t('forgotPassword')}</a>
              </div>
           </div>
        </div>

      </section>
    </main>
  );
}

