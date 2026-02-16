"use client";

import dynamic from 'next/dynamic';

const BookViewer = dynamic(() => import('./BookViewer'), {
  ssr: false,
});

export default BookViewer;
