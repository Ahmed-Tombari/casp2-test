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
      R: { icon: 'solar:leaf-bold-duotone', color: 'bg-emerald-50 text-emerald-500', border: 'border-emerald-300' },
      P: { icon: 'mdi-sprout', color: 'bg-emerald-50 text-emerald-500', border: 'border-emerald-300' },
      '1': { icon: 'mdi:tree', color: 'bg-emerald-50 text-emerald-500', border: 'border-emerald-300' },
      '2': { icon: 'mdi:apple', color: 'bg-emerald-50 text-emerald-500', border: 'border-emerald-300' },
      '3': { icon: 'solar:leaf-bold-duotone', color: 'bg-emerald-50 text-emerald-500', border: 'border-emerald-300' },
      '4': { icon: 'mdi-sprout', color: 'bg-emerald-50 text-emerald-500', border: 'border-emerald-300' },
    };
    const config = colorMap[key] || { icon: 'mdi:tree', color: 'bg-emerald-50 text-emerald-500', border: 'border-emerald-300' };
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
    color = "bg-amber-50 text-amber-500";
    borderColor = "border-amber-300";
  }

  // Tareeq Al Muneer (English)
  else if (bookId.startsWith("tareeq-en-")) {
    const key = bookId.replace("tareeq-en-", "");
    const assetKey = key === 'P' ? 'p' : key;
    cover = `/pdfbooks/store-book/tarikmunirEn-book/tarikmunirEn-${key}/1-${assetKey}.jpg`;
    pdfUrl = `/store-book/tarikmunirEn-book/tarikmunirEn-${key}/1-${assetKey}.pdf`;
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:letter-bold-duotone' : key === '2' ? 'solar:pen-new-square-bold-duotone' : 'solar:headphones-round-sound-bold-duotone';
    color = "bg-brand-gold text-brand-gold";
    borderColor = "border-brand-gold";
  }

  // Tareeq Al Muneer (French)
  else if (bookId.startsWith("tareeq-fr-")) {
    const key = bookId.replace("tareeq-fr-", "");
    const assetKey = key === 'P' ? 'p' : key;
    cover = `/pdfbooks/store-book/tarikmunirFr-book/tarikmunirFr-${key}/1-${assetKey}.jpg`;
    pdfUrl = `/store-book/tarikmunirFr-book/tarikmunirFr-${key}/1-${assetKey}.pdf`;
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:letter-bold-duotone' : key === '2' ? 'solar:pen-new-square-bold-duotone' : 'solar:headphones-round-sound-bold-duotone';
    color = "bg-blue-50 text-blue-500";
    borderColor = "border-blue-300";
  }

  // The Happy Muslim (English)
  else if (bookId.startsWith("happymuslim-en-")) {
    const key = bookId.replace("happymuslim-en-", "");
    cover = `/pdfbooks/store-book/happymuslimEn-book/happymuslimEn-${key}/cover/${key}-1.png`;
    pdfUrl = `/api/books/store-book/happymuslimEn-book/happymuslimEn-${key}/${key}-1.pdf`;
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:sun-2-bold-duotone' : key === '2' ? 'solar:hand-shake-bold-duotone' : key === '3' ? 'solar:book-minimalistic-bold-duotone' : 'solar:globus-bold-duotone';
    color = "bg-blue-50 text-blue-500";
    borderColor = "border-blue-300";
  }

  // Al Mufid
  else if (bookId.startsWith("mufid-")) {
    const key = bookId.replace("mufid-", "");
    // Mapping IDs to folders: R->1, P->2, 1->3, 2->4, 3->5, 4->6
    const folderMap: Record<string, string> = {
      'R': '1', 'P': '2', '1': '3', '2': '4', '3': '5', '4': '6'
    };
    const folderKey = folderMap[key] || key;
    cover = `/pdfbooks/store-book/mufid-book/mufid-${folderKey}/${folderKey}-1.png`;
    pdfUrl = `/api/books/store-book/mufid-book/mufid-${folderKey}/${folderKey}-1.pdf`;
    color = "bg-orange-50 text-orange-500";
    borderColor = "border-orange-300";
  }

  // Al Shamil
  else if (bookId.startsWith("shamil-")) {
    const key = bookId.replace("shamil-", "");
    cover = `/pdfbooks/store-book/shamil-book/shamil-${key}/${key}.jpg`;
    pdfUrl = `/api/books/store-book/shamil-book/shamil-${key}/${key}.pdf`;
    color = "bg-indigo-50 text-indigo-500";
    borderColor = "border-indigo-300";
  }

  // Al Wafi
  else if (bookId.startsWith("wafi-")) {
    const parts = bookId.split("-");
    const sectionPrefix = parts[1]; // assas or ex
    const key = parts[2] || parts[1]; // handle both wafi-assas-1 and wafi-1
    const sectionFolder = sectionPrefix === 'ex' ? 'exercices' : 'assas';
    
    cover = `/pdfbooks/store-book/wafi-book/wafi-${key}/${sectionFolder}/cover/${key}-1.png`;
    pdfUrl = `/api/books/store-book/wafi-book/wafi-${key}/${sectionFolder}/${key}-1.pdf`;
    color = "bg-brand-gold-dark text-brand-gold-dark";
    borderColor = "border-brand-gold-dark";
  }

  // Qawaed Mobasta
  else if (bookId.startsWith("qawaed-")) {
    const key = bookId.replace("qawaed-", "");
    cover = `/pdfbooks/store-book/qawaid-book/cover/${key}.jpg`;
    pdfUrl = `/api/books/store-book/qawaid-book/${key}.pdf`;
    color = "bg-lime-50 text-lime-500";
    borderColor = "border-lime-300";
  }

  // Hidayah (Arabic)
  else if (bookId.startsWith("hidayah-ar-")) {
    const key = bookId.replace("hidayah-ar-", "");
    cover = "/images/ourbooks/Arabic Garden Series.png"; // Placeholder
    pdfUrl = "#";
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:leaf-bold-duotone' : key === '2' ? 'solar:heart-shine-bold-duotone' : key === '3' ? 'mdi:road' : 'solar:users-group-rounded-bold-duotone';
    color = "bg-teal-50 text-teal-500";
    borderColor = "border-teal-300";
  }
  
  // Hidayah (English)
  else if (bookId.startsWith("hidayah-en-")) {
    const key = bookId.replace("hidayah-en-", "");
    cover = "/images/ourbooks/Arabic Garden Series.png"; // Placeholder
    pdfUrl = "#";
    
    icon = ['R', 'P', '1'].includes(key) ? 'solar:leaf-bold-duotone' : key === '2' ? 'solar:heart-shine-bold-duotone' : key === '3' ? 'mdi:road' : 'solar:users-group-rounded-bold-duotone';
    color = "bg-brand-navy text-brand-navy";
    borderColor = "border-brand-navy";
  }

  // Hidayah (French)
  else if (bookId.startsWith("hidayah-fr-")) {
    const key = bookId.replace("hidayah-fr-", "");
    cover = `/pdfbooks/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.png`;
    pdfUrl = `/api/books/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.pdf`;
    
    icon = 'solar:leaf-bold-duotone';
    color = "bg-red-50 text-red-500";
    borderColor = "border-red-300";
  }

  return {
    pdfUrl,
    cover,
    icon,
    color,
    borderColor
  };
}
