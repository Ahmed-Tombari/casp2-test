"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import BookViewer from "@/app/components/TeacherGuide/DynamicBookViewer";


interface BookDescriptionClientProps {
  title: string;
  pdfUrl: string;
  cover: string;
  icon: string;
  color: string;
  borderColor: string;
  watermark: boolean;
  isRTL: boolean;
  locale: string;
  // Dynamic details
  pages?: number;
  lessons?: number;
  priceUSD?: number;
  isbn?: string;
  size?: string;
  levelText?: string;
}

interface TranslationType {
  priceText: string;
  quantity: string;
  buy: string;
  total: string;
  readBook: string;
  downloadBtn: string;
  close: string;
}

const translations: Record<string, TranslationType> = {
  ar: {
    priceText: "السعر (لا يتضمن تكاليف الشحن)",
    quantity: "الكمية",
    buy: "شراء الكتاب",
    total: "الإجمالي",
    readBook: "تصفح الكتاب",
    downloadBtn: "تحميل",
    close: "إغلاق"
  },
  en: {
    priceText: "Price (Shipping not included)",
    quantity: "Quantity",
    buy: "Buy Book",
    total: "Total",
    readBook: "Read Book",
    downloadBtn: "Download",
    close: "Close"
  },
  fr: {
    priceText: "Prix (Frais de port non inclus)",
    quantity: "Quantité",
    buy: "Acheter le livre",
    total: "Total",
    readBook: "Consulter le livre",
    downloadBtn: "Télécharger",
    close: "Fermer"
  }
};

export default function BookDescriptionClient({
  title,
  pdfUrl,
  cover,
  icon,
  color,
  borderColor,
  watermark,
  isRTL,
  locale,
  pages = 0,
  lessons = 0,
  priceUSD = 0,
  isbn = "N/A",
  size = "N/A",
  levelText = "N/A"
}: BookDescriptionClientProps) {
  const [quantity, setQuantity] = useState(1);
  const t = translations[locale] || translations.en;
  
  const unitPrice = priceUSD;
  const totalPrice = (quantity * unitPrice).toFixed(2);

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start" dir={isRTL ? "rtl" : "ltr"}>
      {/* Left Column: Book Viewer Card */}
      <div className="w-full lg:w-1/3 max-w-sm mx-auto lg:mx-0">
        <BookViewer
          title={title}
          pdfUrl={pdfUrl}
          readLabel={t.readBook}
          downloadLabel={t.downloadBtn}
          closeLabel={t.close}
          color={color}
          borderColor={borderColor}
          icon={icon}
          isRTL={isRTL}
          coverImage={cover}
          watermark={watermark}
        />
      </div>

      {/* Right Column: Book Details */}
      <div className="w-full lg:w-2/3 bg-white dark:bg-brand-navy-dark p-8 md:p-12 rounded-4xl shadow-soft border border-gray-100 dark:border-white/10 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-sky/10 dark:bg-brand-sky/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy dark:text-white mb-8 border-b border-gray-100 dark:border-white/10 pb-6">
            {title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-lg text-gray-700 dark:text-gray-300">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 shrink-0">
                  <Icon icon="solar:star-fall-bold-duotone" className="text-xl" />
                </div>
                <span className="font-semibold">{levelText}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-brand-sky shrink-0">
                  <Icon icon="solar:ruler-bold-duotone" className="text-xl" />
                </div>
                <span>{locale === 'ar' ? 'الحجم:' : locale === 'fr' ? 'Taille:' : 'Size:'} {size}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <Icon icon="solar:documents-bold-duotone" className="text-xl" />
                </div>
                <span>{locale === 'ar' ? 'عدد الصفحات:' : locale === 'fr' ? 'Pages:' : 'Pages:'} {pages}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 shrink-0">
                  <Icon icon="solar:notebook-bold-duotone" className="text-xl" />
                </div>
                <span>{locale === 'ar' ? 'عدد الدروس:' : locale === 'fr' ? 'Leçons:' : 'Lessons:'} {lessons}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-500 shrink-0">
                  <Icon icon="solar:tag-price-bold-duotone" className="text-xl" />
                </div>
                <span>{t.priceText}: ${priceUSD.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 shrink-0">
                  <Icon icon="lucide:barcode" className="text-xl" />
                </div>
                <span className="font-mono">ISBN: {isbn}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-brand-navy dark:text-white font-bold text-lg">{t.quantity}:</span>
              <div className="flex items-center bg-white dark:bg-brand-navy-dark rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <Icon icon="solar:minus-circle-bold" className="text-2xl" />
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-12 text-center font-bold text-xl bg-transparent border-none focus:ring-0 p-0 text-brand-navy dark:text-white"
                  min="1"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <Icon icon="solar:add-circle-bold" className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
              <div className="text-center md:text-start">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t.total}</div>
                <div className="text-3xl font-black text-brand-navy dark:text-white flex items-baseline gap-1">
                  ${totalPrice} <span className="text-lg font-bold text-gray-400">USD</span>
                </div>
              </div>

              <button className="w-full md:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg shadow-[0_10px_20px_-10px_rgba(249,115,22,0.5)] hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.8)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                      onClick={() => window.location.href = "https://qalamnet.com/dashboard"}>
                <Icon icon="solar:cart-large-4-bold" className="text-2xl" />
                <span>{t.buy}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
