export interface StoreBookDetails {
  id: string;
  levelAr: string;
  levelEn?: string;
  levelFr?: string;
  size: string;
  pages: number;
  lessons: number;
  priceUSD: number;
  isbn: string;
}

export const storeBooksDetails: Record<string, StoreBookDetails> = {
  // Garden of the Arabic Language - Exercises
  "garden-R-exercices": {
    id: "garden-R-exercices",
    levelAr: "المستوى الروضة – التمارين التكميلية",
    levelEn: "KG Level – Supplementary Exercises",
    levelFr: "Niveau Maternelle – Exercices Supplémentaires",
    size: "21* 27",
    pages: 60,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-37-4"
  },
  "garden-P-exercices": {
    id: "garden-P-exercices",
    levelAr: "المستوى التحضيري – التمارين التكميلية",
    size: "21* 27",
    pages: 64,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-02-2"
  },
  "garden-1-exercices": {
    id: "garden-1-exercices",
    levelAr: "المستوى الأول – التمارين التكميلية",
    size: "21* 27",
    pages: 64,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-04-6"
  },
  "garden-2-exercices": {
    id: "garden-2-exercices",
    levelAr: "المستوى الثاني – التمارين التكميلية",
    size: "21* 27",
    pages: 64,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-06-0"
  },
  "garden-3-exercices": {
    id: "garden-3-exercices",
    levelAr: "المستوى الثالث – التمارين التكميلية",
    size: "21* 27",
    pages: 58,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-20-6"
  },
  
  // Garden of the Arabic Language - Assas (Basics)
  "garden-R-assas": {
    id: "garden-R-assas",
    levelAr: "المستوى الروضة – الأساس + CD",
    levelEn: "KG Level – Basics + CD",
    levelFr: "Niveau Maternelle – Base + CD",
    size: "21* 27",
    pages: 120,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-36-7"
  },
  "garden-P-assas": {
    id: "garden-P-assas",
    levelAr: "المستوى التحضيري – الأساس + CD",
    size: "21* 27",
    pages: 124,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-01-5"
  },
  "garden-1-assas": {
    id: "garden-1-assas",
    levelAr: "المستوى الأول – الأساس + CD",
    size: "21* 27",
    pages: 124,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-03-9"
  },
  "garden-2-assas": {
    id: "garden-2-assas",
    levelAr: "المستوى الثاني – الأساس + CD",
    size: "21* 27",
    pages: 100,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-05-3"
  },
  "garden-3-assas": {
    id: "garden-3-assas",
    levelAr: "المستوى الثالث – الأساس + CD",
    size: "21* 27",
    pages: 83,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-19-0"
  },
  "garden-4-assas": {
    id: "garden-4-assas",
    levelAr: "المستوى الرابع – الأساس + CD",
    size: "21* 27",
    pages: 90,
    lessons: 22,
    priceUSD: 18.00,
    isbn: "978-2-923633-21-3"
  },
  "garden-5-assas": {
    id: "garden-5-assas",
    levelAr: "المستوى الخامس – الأساس + CD",
    size: "21* 27",
    pages: 84,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-23-7"
  },
  "garden-6-assas": {
    id: "garden-6-assas",
    levelAr: "المستوى السادس – الأساس + CD",
    size: "21* 27",
    pages: 84,
    lessons: 21,
    priceUSD: 18.00,
    isbn: "978-2-923633-40-4"
  },
  "garden-7-assas": {
    id: "garden-7-assas",
    levelAr: "المستوى السابع – الأساس",
    size: "21* 27",
    pages: 94,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-45-9"
  },
  "garden-8-assas": {
    id: "garden-8-assas",
    levelAr: "المستوى الثامن – الأساس",
    size: "21* 27",
    pages: 94,
    lessons: 22,
    priceUSD: 18.00,
    isbn: "978-2-923633-00-0" // Using fallback/placeholder as it wasn't provided in the prompt
  }
};
