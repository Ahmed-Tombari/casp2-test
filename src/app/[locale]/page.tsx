import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Hero from '@/app/components/Home/Hero';
import Companies from '@/app/components/Home/Companies';
import Partners from '@/app/components/Home/Partners';
import Courses from '@/app/components/Home/Courses';
import Mentor from '@/app/components/Home/Mentor';
import Testimonial from '@/app/components/Home/Testimonial';
import Newsletter from '@/app/components/Home/Newsletter';
import ContactForm from '@/app/components/Contact/Form';
import About from '@/app/components/Home/About';
import Publications from '@/app/components/Home/Publications';
import VideoSection from '@/app/components/Home/VideoSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}`,
      // languages: {
      //   'ar': '/ar',
      //   'fr': '/fr',
      //   'en': '/en',
      // },
    },
  };
}

export default async function HomePage() {
  return (
    <main>
      <Hero />
      <Companies />
      <Partners />
      <Publications />
      <About />
      <VideoSection />
      <Mentor />
      <Testimonial />
      <ContactForm />
      <Newsletter />
    </main>
  );
}

