import { HeaderItem } from '@/app/types/menu';
import { Locale } from '@/i18n/config';

/**
 * Navigation translations
 */
const navKeys = {
  ar: {
    home: 'الرئيسية',

    teacherGuide: 'دليل المعلم',
      gardenGuide: 'دليل في حديقة اللغة العربية',
      wafiGuide: 'دليل الوافي',
      mufidGuide: 'دليل المفيد',
      happyMuslimGuide: 'دليل المسلم السعيد',
      hidayahGuide: 'دليل هداية',

    // quizzes
    quizzes: 'الاختبارات',
    placementTest: 'اختبار تحديد المستوى',
    educationalCDs: 'السيديات التعليمية',
    lessonsTests: 'دروس واختبارات',
      handwritingExercises: 'تمارين الخط',
      letterColoring: 'أوراق تلوين الحروف',
    
    // channel
    channel: 'القناة',
    youtubeChannel: 'قناتنا على اليوتيوب',
    facebookChannel: 'قناتنا على الفايسبوك',

    // platforms
    platforms: 'المنصات',
    qalamNetPlatform: 'منصة قلم نات',
    wafiPlatform: 'منصة الوافي',
    myBookPlatform: 'منصة كتابي',

    // services
    services: 'الخدمات',
    contact: 'اتصل بنا',
    accessBook: 'الوصول للكتاب',
    
    // store
    store: 'المتجر',
    alMufid: 'المفيد',
    alShamil: 'الشامل',
    alWafi: 'الوافي',
    ebooks: 'كتب إلكترونية',
    gardenOfArabic: 'في حديقة اللغة العربية',
    hidayahArabic: 'هداية (عربي)',
    hidayahFrench: 'هداية (فرنسي)',
    hidayahEnglish: 'هداية (إنجليزي)', 
    printedBooks: 'كتب ورقية',
    qawedMobasta: 'قواعد مبسطة',
    alTareeqAlMuneerArabic: 'الطريق المنير (عربي)',
    alTareeqAlMuneerFrench: 'الطريق المنير (فرنسي)',
    alTareeqAlMuneerEnglish: 'الطريق المنير (إنجليزي)',
    theHappyMuslim: 'المسلم السعيد',
  },

  en: {
    home: 'Home',

    teacherGuide: 'Teacher Guide',
      gardenGuide: 'Garden of Arabic Guide',
      wafiGuide: 'Wafi Guide',
      mufidGuide: 'Mufid Guide',
      happyMuslimGuide: 'Happy Muslim Guide',
      hidayahGuide: 'Hidayah Guide',

    // quizzes
    quizzes: 'Quizzes',
    placementTest: 'Placement Test',
    educationalCDs: 'Educational CDs',
    lessonsTests: 'Lessons & Tests',
      handwritingExercises: 'Handwriting Exercises',
      letterColoring: 'Letter Coloring',

    // channel
    channel: 'Channel',
    youtubeChannel: 'YouTube Channel',
    facebookChannel: 'Facebook Channel',

    // platforms 
    platforms: 'Platforms', 
    qalamNetPlatform: 'Qalam-Net Platform', 
    wafiPlatform: 'Al-Wafi Platform', 
    myBookPlatform: 'Kittaby Platform',

    // services 
    services: 'Services',
    contact: 'Contact',
    accessBook: 'Book Access',

    // store
    store: 'Store',
    alMufid: 'Al-Mufid',
    alShamil: 'Al-Shamil',
    alWafi: 'Al-Wafi',
    ebooks: 'E-Books',
    gardenOfArabic: 'Garden of Arabic',
    hidayahArabic: 'Hidayah (Arabic)',
    hidayahFrench: 'Hidayah (French)',
    hidayahEnglish: 'Hidayah (English)',
    printedBooks: 'Printed Books',
    qawedMobasta: 'Qawaed Mobasta',
    alTareeqAlMuneerArabic: 'Al-Tareeq Al-Muneer (Arabic)',
    alTareeqAlMuneerFrench: 'Al-Tareeq Al-Muneer (French)',
    alTareeqAlMuneerEnglish: 'Al-Tareeq Al-Muneer (English)',
    theHappyMuslim: 'the happy muslim',
  },

  fr: {
    home: 'Accueil',

    teacherGuide: 'Guide prof',
      gardenGuide: 'Guide du jardin',
      wafiGuide: 'Guide du wafi',
      mufidGuide: 'Guide du mufid',
      happyMuslimGuide: 'Guide du happy muslim',
      hidayahGuide: 'Guide du hidayah',
    
    // quizzes
    quizzes: 'Tests',
    placementTest: 'Test de niveau',
    educationalCDs: 'CDs éducatifs',
    lessonsTests: 'Leçons et tests',
      handwritingExercises: 'Exercices d’écriture',
      letterColoring: 'Coloriage des lettres',
    
    // channel
    channel: 'Chaîne',
    youtubeChannel: 'Chaîne YouTube',
    facebookChannel: 'Chaîne Facebook',

    // platforms
    platforms: 'Plateformes',
    qalamNetPlatform: 'Plateforme qalam-Net',
    wafiPlatform: 'Plateforme al-Wafi',
    myBookPlatform: 'Plateforme kittaby',

    // services
    services: 'Services',
    contact: 'Contact',
    accessBook: 'Accès au livre',

    // store
    store: 'Boutique',
    alMufid: 'Al-Mufid',
    alShamil: 'Al-Shamil',
    alWafi: 'Al-Wafi',
    ebooks: 'Livres électroniques',
    gardenOfArabic: 'Jardin de l’arabe',
    hidayahArabic: 'Hidayah (Arabe)',
    hidayahFrench: 'Hidayah (Français)',
    hidayahEnglish: 'Hidayah (Anglais)',
    printedBooks: 'Livres imprimés',
    qawedMobasta: 'Qawaed Mobasta',
    alTareeqAlMuneerArabic: 'Al-Tareeq Al-Muneer (Arabe)',
    alTareeqAlMuneerFrench: 'Al-Tareeq Al-Muneer (Français)',
    alTareeqAlMuneerEnglish: 'Al-Tareeq Al-Muneer (Anglais)',
    theHappyMuslim: 'Happy Muslim',
  },
} as const;

/**
 * Navigation structure
 */
export function getNavigationData(locale: Locale): HeaderItem[] {
  const t = navKeys[locale];

  return [
    {
      label: t.home,
      href: '/',
    },
    {
      label: t.store,
      href: '/store',
      submenu: [
        { label: t.gardenOfArabic, href: '/store/garden-of-arabic' },
        { label: t.alMufid, href: '/store/al-mufid' },
        { label: t.alShamil, href: '/store/al-shamil' },
        { label: t.alWafi, href: '/store/al-wafi' },
        { label: t.hidayahArabic, href: '/store/hidayah' },
        { label: t.hidayahFrench, href: '/store/hidayah-fr' },
        { label: t.hidayahEnglish, href: '/store/hidayah-en' },
        { label: t.qawedMobasta, href: '/store/qawaed-mobasta' },
        { label: t.alTareeqAlMuneerArabic, href: '/store/tareeq-al-muneer' },
        { label: t.alTareeqAlMuneerFrench, href: '/store/tareeq-al-muneer-fr' },
        { label: t.alTareeqAlMuneerEnglish, href: '/store/tareeq-al-muneer-en' },
        { label: t.theHappyMuslim, href: '/store/the-happy-muslim' },
        
      ],
    },
    {
      label: t.services,
      href: '/services',
      submenu: [
        { label: t.contact, href: '/services/contact' },
        { label: t.accessBook, href: '/services/book-access' },
      ],
    },
    {
          label: t.teacherGuide,
          href: '/teacher-guide',
          submenu: [
            {
              label: t.gardenGuide,
              href: '/teacher-guide/garden-guide',
            },
            {
              label: t.wafiGuide,
              href: '/teacher-guide/wafi-guide',
            },
            {
              label: t.mufidGuide,
              href: '/teacher-guide/mufid-guide',
            },
            {
              label: t.happyMuslimGuide,
              href: '/teacher-guide/happyMuslim-guide',
            },
          ],
        },
        {
      label: t.platforms,
      href: '/platform',
      submenu: [
        { label: t.qalamNetPlatform, href: 'https://qalamnet.com/' },
        { label: t.wafiPlatform, href: 'https://alwafi.academy/' },
        { label: t.myBookPlatform, href: 'https://www.keetaby.com/' },
      ],
    },
    {
      label: t.channel,
      href: '/channel',
     submenu: [
        { label: t.youtubeChannel, href: 'https://www.youtube.com/@%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D9%84%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%D8%A9-%D9%83%D9%86' },
        { label: t.facebookChannel, href: 'https://www.facebook.com/caspeducation?rdid=gMP9FoFjFiCWfr4W&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HDVhzFqx4%2F#' },
      ],
    },
  ];
}
