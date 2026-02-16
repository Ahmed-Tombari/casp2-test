import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Icon } from "@iconify/react";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teacherGuide" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/teacher-guide` },
  };
}

export default async function TeacherGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teacherGuide" });
  const isRTL = locale === "ar";

  const guides = [
    {
      id: "garden",
      title: t("garden.title"),
      desc: t("garden.desc"),
      icon: "solar:leaf-bold-duotone",
      href: "/teacher-guide/garden-guide",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
      groupHoverText: "group-hover:text-emerald-500",
      image: "/images/books/سلسلة-في-حديقة-اللغة-العربية-213x300.png",
    },
    {
      id: "wafi",
      title: t("wafi.title"),
      desc: t("wafi.desc"),
      icon: "solar:library-bold-duotone",
      href: "/teacher-guide/wafi-guide",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      groupHoverText: "group-hover:text-blue-500",
      image: "/images/books/سلسلة-الشّامل-للكبار-213x300.png",
    },
    {
      id: "mufid",
      title: t("mufid.title"),
      desc: t("mufid.desc"),
      icon: "solar:notebook-bold-duotone",
      href: "/teacher-guide/mufid-guide",
      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-400",
      groupHoverText: "group-hover:text-orange-500",
      image: "/images/books/سلسلة-القواعد-المبسّطة-213x300.png",
    },
    {
      id: "happy",
      title: t("happy.title"),
      desc: t("happy.desc"),
      icon: "solar:smile-circle-bold-duotone",
      href: "/teacher-guide/happyMuslim-guide",
      color: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
      border: "border-sky-200 dark:border-sky-800",
      groupHoverText: "group-hover:text-sky-500",
      image: "/images/books/سلسلة-the-happy-muslim-213x300.png",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#020617]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy pt-32 pb-4 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <Icon
            icon="solar:book-2-bold-duotone"
            className="absolute top-10 left-10 text-9xl text-emerald-400 animate-pulse-slow"
          />
          <Icon
            icon="solar:book-2-bold-duotone"
            className="absolute bottom-20 right-10 text-8xl text-brand-sky animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-bold mb-8 backdrop-blur-md">
            <Icon
              icon="solar:user-hand-up-bold"
              className="text-brand-gold animate-spin-slow"
            />
            <span>{t("educatorZone")}</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t("title")}
          </h1>

          <p className="text-xl text-orange-50/80 max-w-2xl mx-auto leading-relaxed mb-10">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-24 -mt-12 relative z-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                className={`group relative bg-white dark:bg-brand-navy-dark p-6 rounded-[2.5rem] shadow-soft border-2 ${guide.border} hover:-translate-y-2 hover:shadow-soft-hover transition-all duration-300 flex flex-col items-center text-center overflow-hidden`}
              >
                {/* Book Cover Image */}
                <div className="relative w-40 h-56 mb-6 shadow-xl rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay sheen effect */}
                  <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner-soft ${guide.color} mb-4`}
                >
                  <Icon icon={guide.icon} />
                </div>

                <h3
                  className={`text-xl font-bold text-brand-navy dark:text-white mb-3 ${guide.groupHoverText} transition-colors`}
                >
                  {guide.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-2">
                  {guide.desc}
                </p>

                <div className="mt-auto inline-flex items-center gap-2 font-bold text-sm text-brand-navy dark:text-white group-hover:gap-3 transition-all">
                  <span>{t("explore")}</span>
                  <Icon
                    icon="solar:arrow-right-linear"
                    className={`text-lg ${isRTL ? "rotate-180" : ""}`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
