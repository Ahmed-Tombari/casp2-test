import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'legal' });

  return {
    title: t('termsTitle'),
    alternates: {
      canonical: `/${locale}/terms`,
      languages: {
        'ar': '/ar/terms',
        'fr': '/fr/terms',
        'en': '/en/terms',
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'legal' });

  return (
    <main className="min-h-screen">
      <section className="bg-brand-navy pt-32 pb-20 text-center">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t('termsTitle')}
          </h1>
          <p className="text-white/60">
            {t('lastUpdated')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy-dark transition-colors duration-300">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="prose prose-lg max-w-none text-brand-navy/80 dark:text-white/80 bg-brand-sky/5 dark:bg-white/5 p-10 md:p-16 rounded-[2.5rem] border border-brand-sky/20 dark:border-white/10">
             <p className="text-xl leading-relaxed">
              {t('termsContent')}
            </p>
            {/* Additional terms points could be added here */}
          </div>
        </div>
      </section>
    </main>
  );
}


