import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Signin from '@/app/components/Auth/SignIn';
import AuthWrapper from '@/app/components/Auth/AuthWrapper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'nav' });

  return {
    title: t('login'),
    description: `Login to your ${t('educationalPlatform')} account`,
  };
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tAuth = await getTranslations({ locale: locale, namespace: 'auth' });

  return (
    <AuthWrapper 
      title={tAuth('signInTitle')} 
      subtitle={tAuth('signInSubtitle')}
    >
      <Signin />
    </AuthWrapper>
  );
}


