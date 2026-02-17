import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import Hero from '@/app/components/Home/Hero';
import Companies from '@/app/components/Home/Companies';
import Partners from '@/app/components/Home/Partners';


const Mentor = dynamic(() => import('@/app/components/Home/Mentor'));
const Testimonial = dynamic(() => import('@/app/components/Home/Testimonial'));
const Newsletter = dynamic(() => import('@/app/components/Home/Newsletter'));
const ContactForm = dynamic(() => import('@/app/components/Contact/Form'));
const About = dynamic(() => import('@/app/components/Home/About'));
const Publications = dynamic(() => import('@/app/components/Home/Publications'));
const VideoSection = dynamic(() => import('@/app/components/Home/VideoSection'));

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

