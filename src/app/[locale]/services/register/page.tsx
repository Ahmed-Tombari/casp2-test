import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SignUp from '@/app/components/Auth/SignUp';
import AuthWrapper from '@/app/components/Auth/AuthWrapper';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'nav' });

  return {
    title: t('register'),
    description: `Register for a new ${t('educationalPlatform')} account`,
  };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tAuth = await getTranslations({ locale: locale, namespace: 'auth' });

  return (
    <AuthWrapper
      title={tAuth('signUpTitle')}
      subtitle={tAuth('signUpSubtitle')}
    >
      <SignUp />
    </AuthWrapper>
  );
}


