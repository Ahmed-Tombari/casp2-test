export function getStoreBookData(bookId: string) {
  if (!bookId) return null;

  let pdfUrl = "";
  let cover = "";
  let icon = "solar:book-bookmark-bold-duotone";
  let color = "bg-emerald-100 text-emerald-600";
  let borderColor = "border-emerald-200";

  // Garden of Arabic
  if (bookId.startsWith("garden-")) {
    const parts = bookId.split("-"); // ['garden', 'R', 'assas']
    const key = parts[1];
    const section = parts[2];
    const isExercises = section === "exercices";
    cover = `/pdfbooks/store-book/garden-book/garden-${key}/${section}/cover/${key}.jpg`;
    pdfUrl = isExercises
      ? `/store-book/garden-book/garden-${key}/${section}/${key}.pdf`
      : `/store-book/garden-book/garden-${key}/${section}/gardenAsses${key}.pdf`;

    const colorMap: Record<string, { icon: string; color: string; border: string }> = {
      R: { icon: 'solar:leaf-bold-duotone', color: 'bg-emerald-100 text-emerald-600', border: 'border-emerald-200' },
      P: { icon: 'mdi-sprout', color: 'bg-teal-100 text-teal-600', border: 'border-teal-200' },
      '1': { icon: 'mdi:tree', color: 'bg-green-100 text-green-700', border: 'border-green-200' },
      '2': { icon: 'mdi:apple', color: 'bg-lime-100 text-lime-600', border: 'border-lime-200' },
      '3': { icon: 'solar:leaf-bold-duotone', color: 'bg-emerald-100 text-emerald-600', border: 'border-emerald-200' },
      '4': { icon: 'mdi-sprout', color: 'bg-teal-100 text-teal-600', border: 'border-teal-200' },
    };
    const config = colorMap[key] || { icon: 'mdi:tree', color: 'bg-green-100 text-green-700', border: 'border-green-200' };
    icon = config.icon;
    color = config.color;
    borderColor = config.border;
  } 
  
  // Tareeq Al Muneer (Arabic)
  else if (bookId.startsWith("tareeq-ar-")) {
    const key = bookId.replace("tareeq-ar-", "");
    const assetKey = key === 'P' ? 'p' : key;
    cover = `/pdfbooks/store-book/tarikmunirAr-book/tarikmunirAr-${key}/1-${assetKey}.jpg`;
    pdfUrl = `/api/books/store-book/tarikmunirAr-book/tarikmunirAr-${key}/1-${assetKey}.pdf`;
    
    icon = key === '2' ? 'solar:soundwave-bold-duotone' : key === '3' ? 'solar:widget-add-bold-duotone' : ['4', '5', '6'].includes(key) ? 'solar:book-2-bold-duotone' : 'solar:letter-bold-duotone';
    color = ['R', 'P', '1'].includes(key) ? 'bg-amber-100 text-amber-600' : key === '2' ? 'bg-teal-100 text-teal-600' : key === '3' ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600';
    borderColor = ['R', 'P', '1'].includes(key) ? 'border-amber-200' : key === '2' ? 'border-teal-200' : key === '3' ? 'border-indigo-200' : 'border-rose-200';
  }

  // Tareeq Al Muneer (English)
  else if (bookId.startsWith("tareeq-en-")) {
    const key = bookId.replace("tareeq-en-", "");
    const assetKey = key === 'P' ? 'p' : key;
    cover = `/pdfbooks/store-book/tarikmunirEn-book/tarikmunirEn-${key}/1-${assetKey}.jpg`;
    pdfUrl = `/store-book/tarikmunirEn-book/tarikmunirEn-${key}/1-${assetKey}.pdf`;
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:letter-bold-duotone' : key === '2' ? 'solar:pen-new-square-bold-duotone' : 'solar:headphones-round-sound-bold-duotone';
    color = ['R', 'P', '1', '2'].includes(key) ? 'bg-blue-100 text-blue-600' : 'bg-brand-orange-light text-brand-orange-dark';
    borderColor = ['R', 'P', '1', '2'].includes(key) ? 'border-blue-200' : 'border-brand-orange/30';
  }

  // Tareeq Al Muneer (French)
  else if (bookId.startsWith("tareeq-fr-")) {
    const key = bookId.replace("tareeq-fr-", "");
    const assetKey = key === 'P' ? 'p' : key;
    cover = `/pdfbooks/store-book/tarikmunirFr-book/tarikmunirFr-${key}/1-${assetKey}.jpg`;
    pdfUrl = `/store-book/tarikmunirFr-book/tarikmunirFr-${key}/1-${assetKey}.pdf`;
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:letter-bold-duotone' : key === '2' ? 'solar:pen-new-square-bold-duotone' : 'solar:headphones-round-sound-bold-duotone';
    color = ['R', 'P', '1', '2'].includes(key) ? 'bg-blue-100 text-blue-600' : 'bg-brand-orange-light text-brand-orange-dark';
    borderColor = ['R', 'P', '1', '2'].includes(key) ? 'border-blue-200' : 'border-brand-orange/30';
  }

  // The Happy Muslim (English)
  else if (bookId.startsWith("happymuslim-en-")) {
    const key = bookId.replace("happymuslim-en-", "");
    cover = `/pdfbooks/store-book/happymuslimEn-book/happymuslimEn-${key}/cover/${key}-1.png`;
    pdfUrl = `/api/books/store-book/happymuslimEn-book/happymuslimEn-${key}/${key}-1.pdf`;
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:sun-2-bold-duotone' : key === '2' ? 'solar:hand-shake-bold-duotone' : key === '3' ? 'solar:book-minimalistic-bold-duotone' : 'solar:globus-bold-duotone';
    color = ['R', 'P', '1'].includes(key) ? 'bg-brand-gold-light/20 text-brand-gold-dark' : key === '2' ? 'bg-teal-100 text-teal-600' : key === '3' ? 'bg-brand-navy-light/20 text-brand-navy' : 'bg-brand-sky-light/20 text-brand-sky-dark';
    borderColor = ['R', 'P', '1'].includes(key) ? 'border-brand-gold/30' : key === '2' ? 'border-teal-200' : key === '3' ? 'border-brand-navy/20' : 'border-brand-sky/30';
  }

  // Al Mufid
  else if (bookId.startsWith("mufid-")) {
    const key = bookId.replace("mufid-", "");
    cover = `/pdfbooks/store-book/mufid-book/mufid-${key}/${key}-1.png`;
    pdfUrl = `/api/books/store-book/mufid-book/mufid-${key}/${key}-1.pdf`;
    color = "bg-orange-100 text-orange-600";
    borderColor = "border-orange-200";
  }

  // Al Shamil
  else if (bookId.startsWith("shamil-")) {
    const key = bookId.replace("shamil-", "");
    cover = `/pdfbooks/store-book/shamil-book/shamil-${key}/${key}-1.png`;
    pdfUrl = `/api/books/store-book/shamil-book/shamil-${key}/${key}-1.pdf`;
    color = "bg-blue-100 text-blue-600";
    borderColor = "border-blue-200";
  }

  // Al Wafi
  else if (bookId.startsWith("wafi-")) {
    const key = bookId.replace("wafi-", "");
    cover = `/pdfbooks/store-book/wafi-book/wafi-${key}/${key}-1.png`;
    pdfUrl = `/api/books/store-book/wafi-book/wafi-${key}/${key}-1.pdf`;
    color = "bg-indigo-100 text-indigo-600";
    borderColor = "border-indigo-200";
  }

  // Qawaed Mobasta
  else if (bookId.startsWith("qawaed-")) {
    const key = bookId.replace("qawaed-", "");
    cover = `/pdfbooks/store-book/qawaid-book/cover/${key}.jpg`;
    pdfUrl = `/api/books/store-book/qawaid-book/${key}.pdf`;
    color = "bg-rose-100 text-rose-600";
    borderColor = "border-rose-200";
  }

  // Hidayah (Arabic)
  else if (bookId.startsWith("hidayah-ar-")) {
    const key = bookId.replace("hidayah-ar-", "");
    cover = "/images/ourbooks/Arabic Garden Series.png"; // Placeholder
    pdfUrl = "#";
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:leaf-bold-duotone' : key === '2' ? 'solar:heart-shine-bold-duotone' : key === '3' ? 'mdi:road' : 'solar:users-group-rounded-bold-duotone';
    color = ['R', 'P', '1'].includes(key) ? 'bg-emerald-100 text-emerald-600' : key === '2' ? 'bg-brand-gold-light/20 text-brand-gold-dark' : key === '3' ? 'bg-brand-sky-light/20 text-brand-sky-dark' : 'bg-brand-navy-light/20 text-brand-navy';
    borderColor = ['R', 'P', '1'].includes(key) ? 'border-emerald-200' : key === '2' ? 'border-brand-gold/30' : key === '3' ? 'border-brand-sky/30' : 'border-brand-navy/20';
  }
  
  // Hidayah (English)
  else if (bookId.startsWith("hidayah-en-")) {
    const key = bookId.replace("hidayah-en-", "");
    cover = "/images/ourbooks/Arabic Garden Series.png"; // Placeholder
    pdfUrl = "#";
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:leaf-bold-duotone' : key === '2' ? 'solar:heart-shine-bold-duotone' : key === '3' ? 'mdi:road' : 'solar:users-group-rounded-bold-duotone';
    color = ['R', 'P', '1'].includes(key) ? 'bg-emerald-100 text-emerald-600' : key === '2' ? 'bg-brand-gold-light/20 text-brand-gold-dark' : key === '3' ? 'bg-brand-sky-light/20 text-brand-sky-dark' : 'bg-brand-navy-light/20 text-brand-navy';
    borderColor = ['R', 'P', '1'].includes(key) ? 'border-emerald-200' : key === '2' ? 'border-brand-gold/30' : key === '3' ? 'border-brand-sky/30' : 'border-brand-navy/20';
  }

  // Hidayah (French)
  else if (bookId.startsWith("hidayah-fr-")) {
    const key = bookId.replace("hidayah-fr-", "");
    cover = "/images/ourbooks/Arabic Garden Series.png"; // Placeholder
    pdfUrl = "#";
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:leaf-bold-duotone' : key === '2' ? 'solar:heart-shine-bold-duotone' : key === '3' ? 'mdi:road' : 'solar:users-group-rounded-bold-duotone';
    color = ['R', 'P', '1'].includes(key) ? 'bg-emerald-100 text-emerald-600' : key === '2' ? 'bg-brand-gold-light/20 text-brand-gold-dark' : key === '3' ? 'bg-brand-sky-light/20 text-brand-sky-dark' : 'bg-brand-navy-light/20 text-brand-navy';
    borderColor = ['R', 'P', '1'].includes(key) ? 'border-emerald-200' : key === '2' ? 'border-brand-gold/30' : key === '3' ? 'border-brand-sky/30' : 'border-brand-navy/20';
  }

  return {
    pdfUrl,
    cover,
    icon,
    color,
    borderColor
  };
}
