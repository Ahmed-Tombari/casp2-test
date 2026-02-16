import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'nav' });

  return {
    title: t('educationalChannel'),
    description: `Watch educational videos on our ${t('educationalChannel')}`,
  };
}

export default async function EducationalChannelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="min-h-screen pt-24">
      <section className="container py-12">
        <h1>Educational Channel</h1>
        {/* Content will be added */}
      </section>
    </main>
  );
}


