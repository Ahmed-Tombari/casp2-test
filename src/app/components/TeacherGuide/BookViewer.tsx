'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import { encodeAssetUrl } from "@/utils/obfuscation";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface BookViewerProps {
  title: string;
  pdfUrl: string;
  readLabel: string;
  downloadLabel: string;
  closeLabel: string;
  color: string;
  borderColor: string;
  icon: string;
  isRTL: boolean;
  coverImage?: string;
  watermark?: boolean;
}

export default function BookViewer({
  title,
  pdfUrl,
  readLabel,
  downloadLabel,
  closeLabel,
  color,
  borderColor,
  icon,
  isRTL,
  coverImage,
  watermark = false,
}: BookViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);
  const [zoom, setZoom] = useState(1.0);

  const [hasError, setHasError] = useState(false);
  const [blobPdfUrl, setBlobPdfUrl] = useState<string | null>(null);
  const [blobCoverUrl, setBlobCoverUrl] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const pdfBlobRef = useRef<string | null>(null);
  const coverBlobRef = useRef<string | null>(null);

  // Asset protection: Fetch and create Blob URLs
  useEffect(() => {
    const fetchAsset = async (url: string, setter: (blobUrl: string) => void, ref: React.MutableRefObject<string | null>) => {
      try {
        let fetchUrl = url;
        
        if (url.toLowerCase().endsWith('.pdf') || url.includes('/api/pdf')) {
          // Use or update the secure PDF endpoint
          let baseUrl = url;
          const params = new URLSearchParams();

          if (!url.includes('/api/pdf')) {
            baseUrl = '/api/pdf';
            params.set('url', url);
          } else {
            // Extract existing params if any
            const [path, query] = url.split('?');
            baseUrl = path;
            if (query) {
              new URLSearchParams(query).forEach((val, key) => params.set(key, val));
            }
          }
          
          if (watermark) {
            params.set('watermark', 'true');
          }
          
          // Try to get access code from URL or local storage
          const searchParams = new URLSearchParams(window.location.search);
          const urlCode = searchParams.get('token') || searchParams.get('code');
          const storedCode = localStorage.getItem('accessCode');
          const code = urlCode || storedCode;
          
          if (code) {
            params.set('code', code);
          }

          fetchUrl = `${baseUrl}?${params.toString()}`;
        } else if (!url.startsWith('/') && !url.includes(window.location.origin)) {
          // Proxy images
          const encoded = encodeAssetUrl(url);
          fetchUrl = `/api/assets?url=${encoded}`;
        }

        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error("Failed to fetch asset");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        if (ref.current) URL.revokeObjectURL(ref.current);
        
        ref.current = blobUrl;
        setter(blobUrl);
      } catch (error) {
        console.error("Failed to load protected asset:", error);
        setHasError(true);
      }
    };

    if (pdfUrl) fetchAsset(pdfUrl, setBlobPdfUrl, pdfBlobRef);
    if (coverImage) fetchAsset(coverImage, setBlobCoverUrl, coverBlobRef);

    return () => {
      if (pdfBlobRef.current) URL.revokeObjectURL(pdfBlobRef.current);
      if (coverBlobRef.current) URL.revokeObjectURL(coverBlobRef.current);
      pdfBlobRef.current = null;
      coverBlobRef.current = null;
    };
  }, [pdfUrl, coverImage, watermark]);

  // soft protection: handle context menu and key shortcuts
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        console.warn("Protected content: Inspection is disabled.");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Resize handler for responsive PDF
  const updatePageWidth = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      setPageWidth(Math.min(width * 0.95, 800)); 
    }
  }, []);

  // Update width on resize and open
  useEffect(() => {
    if (!isOpen) return;

    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);

    const resizeObserver = new ResizeObserver(updatePageWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updatePageWidth);
      resizeObserver.disconnect();
    };
  }, [isOpen, updatePageWidth]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
      setTimeout(updatePageWidth, 100);
      setZoom(1.0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, updatePageWidth]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    setHasError(false);
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error);
    setIsLoading(false);
    setHasError(true);
  }

  return (
    <>
      {/* Card Design */}
      <div
        className={`group relative bg-white dark:bg-brand-navy-dark p-8 md:p-10 rounded-4xl shadow-soft border-2 ${borderColor} hover:-translate-y-2 hover:shadow-soft-hover transition-all duration-300 flex flex-col items-center text-center h-full`}
      >
        {/* Background Decoration */}
        <div className="absolute top-8 left-8 rtl:right-auto rtl:left-8 ltr:left-auto ltr:right-8 opacity-5 pointer-events-none">
          <Icon icon="solar:book-2-bold" className="text-6xl dark:text-white" />
        </div>

        {/* Icon Box or Cover Image */}
        {coverImage ? (
          <div className="w-full aspect-3/4 mb-8 relative z-10 group-hover:-translate-y-4 transition-transform duration-500 ease-out perspective-1000">
            <div 
              onContextMenu={handleContextMenu}
              className="relative w-full h-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)] rounded-2xl overflow-hidden transform group-hover:rotate-x-2 group-hover:scale-105 transition-all duration-500 ring-1 ring-black/5 dark:ring-white/10 group-hover:ring-4 group-hover:ring-brand-gold/20 dark:group-hover:ring-brand-sky/20 bg-gray-50 dark:bg-white/5"
            >
              {blobCoverUrl ? (
                <Image
                  src={blobCoverUrl}
                  alt={title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110 p-2"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
                  <Icon icon="solar:gallery-bold-duotone" className="text-4xl text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        ) : (
          <div
            className={`w-24 h-24 rounded-4xl flex items-center justify-center text-5xl shadow-inner-soft ${color} mb-6 relative z-10`}
          >
            <Icon icon={icon} />
          </div>
        )}
        {/* Title */}
        <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-4 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
          {title}
        </h3>

         {/* Action Button 2 */}
          <button 
           onClick={() => setIsOpen(true)}
           className="group relative px-8 py-4 bg-brand-gold text-brand-navy-dark rounded-2xl font-bold shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
             <span className="relative z-10 flex items-center gap-2">
              {readLabel}
                <Icon icon="solar:eye-bold" className={isRTL ? "rotate-0" : ""} />
             </span>
             {/* Shine Effect on Button */}
             <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
         </button>
      </div>

    

      {/* PDF Modal */}
      {isOpen &&
        createPortal(
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          >
            <div
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="w-full max-w-6xl h-[95vh] bg-gray-100 dark:bg-[#0f172a] rounded-4xl shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-300 ring-1 ring-white/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-white/5 z-20 shadow-sm shrink-0">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div
                    className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    <Icon icon={icon} className="text-xl" />
                  </div>
                  <h3 className="font-bold text-lg text-brand-navy dark:text-white truncate">
                    {title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Download Button (Disabled) */}
                  {!hasError && (
                    <button
                      disabled
                      className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed text-sm font-bold opacity-60"
                    >
                      <Icon
                        icon="solar:download-square-bold"
                        className="text-lg"
                      />
                      <span>{downloadLabel}</span>
                    </button>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-400 transition-colors"
                  >
                    <Icon icon="solar:close-circle-bold" className="text-xl" />
                    <span className="hidden sm:inline font-bold text-sm">
                      {closeLabel}
                    </span>
                  </button>
                </div>
              </div>

              {/* Vertical Zoom Toolbar */}
              {!hasError && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center bg-white/90 dark:bg-brand-navy-dark/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden min-w-14 animate-in slide-in-from-right-10 duration-500">
                  <button
                    onClick={() => setZoom(prev => Math.min(prev + 0.1, 2.0))}
                    className="w-full h-14 flex items-center justify-center hover:bg-brand-sky hover:text-white dark:hover:bg-brand-sky text-brand-navy dark:text-white transition-all duration-300 group/btn"
                    title="Zoom In"
                  >
                    <Icon icon="solar:add-circle-bold-duotone" className="text-3xl group-hover/btn:scale-110 transition-transform" />
                  </button>
                  
                  <div className="w-8 h-px bg-gray-200 dark:bg-white/10 mx-auto"></div>

                  <button
                    onClick={() => setZoom(1.0)}
                    className="w-full h-14 flex items-center justify-center hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-brand-navy dark:text-white transition-all duration-300 group/btn"
                    title="Reset Zoom"
                  >
                    <Icon icon="solar:refresh-linear" className="text-2xl group-hover/btn:rotate-180 transition-transform duration-500" />
                  </button>

                  <div className="w-8 h-px bg-gray-200 dark:bg-white/10 mx-auto"></div>

                  <button
                    onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
                    className="w-full h-14 flex items-center justify-center hover:bg-brand-sky hover:text-white dark:hover:bg-brand-sky text-brand-navy dark:text-white transition-all duration-300 group/btn"
                    title="Zoom Out"
                  >
                    <Icon icon="solar:minus-circle-bold-duotone" className="text-3xl group-hover/btn:scale-110 transition-transform" />
                  </button>

                  <div className="w-full py-2 bg-gray-50 dark:bg-white/5 text-center border-t border-gray-200 dark:border-white/10">
                    <span className="text-[10px] font-black text-brand-navy dark:text-gray-400">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                </div>
              )}

              {/* Content Area - Scrollable */}
              <div
                ref={containerRef}
                onContextMenu={handleContextMenu}
                className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200/50 dark:bg-[#020617] relative p-4 md:p-8 flex flex-col items-center select-none"
              >
                {/* Loader */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-brand-sky/30 border-t-brand-sky rounded-full animate-spin mb-4"></div>
                    <p className="text-brand-navy dark:text-gray-200 font-medium">
                      Loading...
                    </p>
                  </div>
                )}

                {/* Error State */}
                {hasError && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-6">
                      <Icon icon="solar:shield-warning-bold-duotone" className="text-5xl text-orange-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">
                       Coming Soon!
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                      This book is currently being prepared and will be available shortly. Thank you for your patience.
                    </p>
                  </div>
                )}

                {!hasError && blobPdfUrl && (
                  <Document
                    file={blobPdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                      <div className="h-96 flex items-center justify-center text-gray-500">
                        Loading Book...
                      </div>
                    }
                    className="flex flex-col gap-6 md:gap-8 items-center w-full"
                  >
                    {/* Render all pages */}
                    {numPages &&
                      Array.from(new Array(numPages), (el, index) => (
                        <div
                          key={`page_${index + 1}`}
                          className="relative shadow-lg md:shadow-2xl rounded-sm overflow-hidden bg-white"
                        >
                           <Page
                            pageNumber={index + 1}
                            width={pageWidth * zoom}
                            loading={
                              <div
                                style={{ width: pageWidth * zoom, height: pageWidth * zoom * 1.4 }}
                                className="bg-white flex items-center justify-center text-gray-400 animate-pulse"
                              >
                                Loading Page {index + 1}...
                              </div>
                            }
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="bg-white block" 
                          />
                        </div>
                      ))}
                  </Document>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
