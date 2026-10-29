import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  X,
  FileText,
  Download,
  ExternalLink,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Layers,
  BookOpen,
  Tag,
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  Collection,
  Product,
  EcosystemDocument,
  findCollection,
  findEcosystemDocument,
  getWhatsAppUrl,
  getCollectionSlides,
  getEcosystemSlides,
  getProductSlideIndex,
  getProductsForSlide,
  SlideInfo
} from "../data/jacketsData";

export interface CollectionPDFViewerProps {
  /** Local path to the collection or ecosystem document PDF file */
  pdfUrl: string;
  /** Optional local path to the cover image thumbnail (Page 1 cover) */
  coverImage?: string;
  /** Optional full Collection object; automatically resolved from pdfUrl if omitted */
  collection?: Collection;
  /** Optional EcosystemDocument object; automatically resolved from pdfUrl if omitted */
  ecosystemDoc?: EcosystemDocument;
  itemTitle?: string;
  initialPage?: number | string;
  initialSlideIndex?: number;
  highlightTitle?: string;
  selectedProduct?: Product | null;
  onClose: () => void;
  onOpenOrder?: (product?: Product) => void;
  onConfigureProducts?: () => void;
}

/**
 * CollectionPDFViewer Component
 *
 * Mobile-compatible Raw PDF & Page-by-Page Spread Viewer supporting both the
 * 8 JD Pro Jacket Collections and the 3 JD Ecosystem & Process Documents:
 * - Full-screen modal on mobile devices (100vw x 100dvh/100vh) and desktops.
 * - Smooth native touch-scrolling across all individual pages on Android, iOS, and tablets.
 * - Three display modes:
 *   1. "scroll" (Touch-scroll all individual PDF spread pages + interactive product spec cards)
 *   2. "single" (Page-by-page flip view with horizontal swipe gestures and Prev/Next buttons)
 *   3. "iframe" (Full-viewport raw embedded PDF <iframe>)
 * - Prominent "Close" / "X" button at the top right for effortless exit on mobile & desktop.
 */
export const CollectionPDFViewer: React.FC<CollectionPDFViewerProps> = ({
  pdfUrl,
  coverImage,
  collection: collectionProp,
  ecosystemDoc: ecosystemDocProp,
  itemTitle,
  initialPage,
  initialSlideIndex,
  highlightTitle,
  selectedProduct,
  onClose,
  onOpenOrder,
  onConfigureProducts
}) => {
  // Detect whether the viewer is displaying an Ecosystem & Process document
  const ecosystemDoc = useMemo<EcosystemDocument | undefined>(() => {
    if (ecosystemDocProp) return ecosystemDocProp;
    if (collectionProp) return undefined;
    return findEcosystemDocument(pdfUrl);
  }, [ecosystemDocProp, collectionProp, pdfUrl]);

  const isEcosystemDoc = Boolean(ecosystemDoc);

  // Resolve the active jacket collection when viewing a jacket catalog
  const collection = useMemo<Collection>(() => {
    if (collectionProp) return collectionProp;
    return findCollection(pdfUrl);
  }, [collectionProp, pdfUrl]);

  const resolvedId = ecosystemDoc ? ecosystemDoc.id : collection.id;
  const resolvedName = ecosystemDoc ? ecosystemDoc.name : collection.name;
  const resolvedCoverImage = useMemo<string>(() => {
    if (coverImage && coverImage.trim().length > 0) return coverImage;
    if (ecosystemDoc) return ecosystemDoc.coverImage;
    return collection.coverImage;
  }, [coverImage, ecosystemDoc, collection.coverImage]);
  const resolvedPdfUrl = useMemo<string>(() => {
    if (pdfUrl && pdfUrl.trim().length > 0) return pdfUrl;
    if (ecosystemDoc) return ecosystemDoc.pdfUrl;
    return collection.pdfUrl;
  }, [pdfUrl, ecosystemDoc, collection.pdfUrl]);

  // Load spread slides for either the Ecosystem Document or the Jacket Collection
  const slides = useMemo<SlideInfo[]>(() => {
    if (ecosystemDoc) {
      return getEcosystemSlides(ecosystemDoc.id);
    }
    return getCollectionSlides(collection.id);
  }, [ecosystemDoc, collection.id]);

  const totalPages = slides.length || 6;

  // Determine 1-based starting page
  const resolvedStartPage = useMemo<number>(() => {
    if (typeof initialSlideIndex === "number" && initialSlideIndex >= 0) {
      return Math.max(1, Math.min(totalPages, initialSlideIndex + 1));
    }
    if (!isEcosystemDoc && selectedProduct) {
      const idx = getProductSlideIndex(collection.id, selectedProduct);
      return Math.max(1, Math.min(totalPages, idx + 1));
    }
    if (!isEcosystemDoc && highlightTitle && highlightTitle !== collection.name) {
      const matched = (collection.products || []).find(
        (p) => p.name.toLowerCase() === highlightTitle.toLowerCase()
      );
      if (matched) {
        const idx = getProductSlideIndex(collection.id, matched);
        return Math.max(1, Math.min(totalPages, idx + 1));
      }
    }
    if (initialPage !== undefined) {
      const p =
        typeof initialPage === "number"
          ? initialPage
          : parseInt(String(initialPage).trim(), 10);
      if (!isNaN(p) && p > 0) return Math.max(1, Math.min(totalPages, p));
    }
    return 1;
  }, [
    initialSlideIndex,
    isEcosystemDoc,
    selectedProduct,
    highlightTitle,
    collection,
    initialPage,
    totalPages
  ]);

  const [currentPage, setCurrentPage] = useState<number>(resolvedStartPage);
  const [viewLayout, setViewLayout] = useState<"scroll" | "single" | "iframe">("scroll");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showJacketDrawer, setShowJacketDrawer] = useState<boolean>(false);
  const [activeProductFocus, setActiveProductFocus] = useState<Product | null>(() => {
    if (isEcosystemDoc) return null;
    if (selectedProduct) return selectedProduct;
    if (highlightTitle && highlightTitle !== collection.name) {
      return (
        (collection.products || []).find(
          (p) => p.name.toLowerCase() === highlightTitle.toLowerCase()
        ) || null
      );
    }
    return null;
  });

  // Reset viewer state cleanly whenever document, collection, or pdfUrl changes
  useEffect(() => {
    setCurrentPage(resolvedStartPage);
    setZoomLevel(1);
    setShowJacketDrawer(false);
    setActiveProductFocus(isEcosystemDoc ? null : selectedProduct || null);
  }, [resolvedId, resolvedPdfUrl, resolvedStartPage, isEcosystemDoc, selectedProduct]);

  const viewerRef = useRef<HTMLDivElement>(null);
  const scrollStageRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Record<number, HTMLElement | null>>({});
  const pillRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const isProgrammaticScroll = useRef<boolean>(false);
  const lastTapRef = useRef<number>(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const effectiveTitle = activeProductFocus
    ? `${resolvedName} — ${activeProductFocus.name}`
    : itemTitle && itemTitle !== resolvedName
    ? `${resolvedName} — ${itemTitle}`
    : resolvedName;

  const goToPage = useCallback(
    (targetPage: number, smooth: boolean = true) => {
      const clamped = Math.max(1, Math.min(totalPages, targetPage));
      setCurrentPage(clamped);

      if (viewLayout === "scroll") {
        const el = pageRefs.current[clamped];
        if (el) {
          isProgrammaticScroll.current = true;
          el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
          window.setTimeout(() => {
            isProgrammaticScroll.current = false;
          }, 450);
        }
      } else if (scrollStageRef.current) {
        scrollStageRef.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    },
    [totalPages, viewLayout]
  );

  // Scroll to target page on initial open
  useEffect(() => {
    if (resolvedStartPage > 1 && viewLayout === "scroll") {
      const timer = window.setTimeout(() => {
        const el = pageRefs.current[resolvedStartPage];
        if (el) {
          isProgrammaticScroll.current = true;
          el.scrollIntoView({ behavior: "auto", block: "start" });
          window.setTimeout(() => {
            isProgrammaticScroll.current = false;
          }, 250);
        }
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [resolvedStartPage, viewLayout]);

  // Keep active page tab centered in horizontal strip
  useEffect(() => {
    const pill = pillRefs.current[currentPage];
    if (pill) {
      pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentPage]);

  // Track visible page during free touch-scrolling
  useEffect(() => {
    if (viewLayout !== "scroll") return;
    const rootEl = scrollStageRef.current;
    if (!rootEl || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        let bestPage: number | null = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            const pAttr = entry.target.getAttribute("data-page-number");
            const pNum = pAttr ? parseInt(pAttr, 10) : NaN;
            if (!isNaN(pNum)) {
              bestRatio = entry.intersectionRatio;
              bestPage = pNum;
            }
          }
        }
        if (bestPage !== null) {
          setCurrentPage(bestPage);
        }
      },
      {
        root: rootEl,
        threshold: [0.25, 0.5, 0.75]
      }
    );

    slides.forEach((s) => {
      const node = pageRefs.current[s.pageNumber];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [slides, viewLayout]);

  // Keyboard navigation & lock body scroll while viewer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showJacketDrawer) {
          setShowJacketDrawer(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft" && viewLayout !== "iframe") {
        goToPage(currentPage - 1);
      } else if (e.key === "ArrowRight" && viewLayout !== "iframe") {
        goToPage(currentPage + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [currentPage, goToPage, onClose, showJacketDrawer, viewLayout]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const ZOOM_STEPS = [1, 1.35, 1.75, 2.15, 2.5];

  const handleZoomIn = () => {
    setZoomLevel((z) => {
      const next = ZOOM_STEPS.find((step) => step > z + 0.05);
      return next ?? 2.5;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => {
      const prev = [...ZOOM_STEPS].reverse().find((step) => step < z - 0.05);
      return prev ?? 1;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const zoomWidthClass = useMemo(() => {
    if (zoomLevel >= 2.4) return "w-[250%] max-w-none";
    if (zoomLevel >= 2.0) return "w-[215%] max-w-none";
    if (zoomLevel >= 1.6) return "w-[175%] max-w-none";
    if (zoomLevel >= 1.2) return "w-[135%] max-w-none";
    return "w-full max-w-[1140px]";
  }, [zoomLevel]);

  const handlePageImageTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setZoomLevel((z) => (z > 1.05 ? 1 : 1.75));
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  const handleSingleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1.05 || e.touches.length !== 1) {
      touchStartXRef.current = null;
      return;
    }
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleSingleTouchEnd = (e: React.TouchEvent) => {
    if (zoomLevel > 1.05 || touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStartXRef.current;
    const dy = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0 && currentPage < totalPages) {
        goToPage(currentPage + 1);
      } else if (dx > 0 && currentPage > 1) {
        goToPage(currentPage - 1);
      }
    }
  };

  const handleJumpToProduct = (prod: Product) => {
    if (isEcosystemDoc) return;
    setActiveProductFocus(prod);
    const slideIdx = getProductSlideIndex(collection.id, prod);
    setShowJacketDrawer(false);
    if (viewLayout === "iframe") {
      setViewLayout("scroll");
    }
    window.setTimeout(() => goToPage(slideIdx + 1, true), 30);
  };

  const currentSlide =
    slides[Math.max(0, Math.min(totalPages - 1, currentPage - 1))] || slides[0];

  const whatsAppUrl = useMemo(() => {
    if (ecosystemDoc) {
      const text = `Hello JD Jackets, I am reviewing the ${ecosystemDoc.name} document (Spread ${currentPage} of ${totalPages}: ${currentSlide?.title || ""}). Please connect me with a specialist to start our custom outerwear consultation.`;
      return getWhatsAppUrl(text);
    }
    const prodNote = activeProductFocus
      ? ` — specifically ${activeProductFocus.name} (SKU: ${activeProductFocus.sku})`
      : "";
    const text = `Hello JD Jackets, I am viewing the ${collection.name} 2026/27 catalog (Spread ${currentPage} of ${totalPages}: ${currentSlide?.title || ""})${prodNote}. Please share quotation details and ordering information.`;
    return getWhatsAppUrl(text);
  }, [
    ecosystemDoc,
    activeProductFocus,
    collection.name,
    currentPage,
    totalPages,
    currentSlide
  ]);

  const renderPageJacketCards = (pageNumber: number) => {
    if (isEcosystemDoc) return null;
    const pageProducts = getProductsForSlide(collection, pageNumber);
    if (pageProducts.length === 0) return null;

    return (
      <div className="mt-2.5 bg-[#171a15] border border-[#2b3126] rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#e85a2a] flex items-center gap-1.5">
            <Tag size={12} />
            <span>
              Models Featured on Spread {pageNumber} ({pageProducts.length})
            </span>
          </span>
          <span className="text-[10px] text-[#8e9485] hidden sm:inline">
            Tap any model to configure &amp; request quote
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {pageProducts.map((prod) => {
            const isHighlighted = activeProductFocus?.sku === prod.sku;
            return (
              <div
                key={prod.sku}
                onClick={() => setActiveProductFocus(prod)}
                className={`rounded-lg p-3 border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                  isHighlighted
                    ? "bg-[#23291f] border-[#e85a2a] ring-1 ring-[#e85a2a]/40"
                    : "bg-[#1d211b] border-[#2e3529] hover:border-[#4c5644]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span className="font-mono text-[10px] font-bold text-[#ff7a4d]">
                      {prod.sku}
                    </span>
                    <span className="text-[10px] text-[#9ba192] truncate">
                      {prod.fit || "Standard Fit"}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mb-1.5">
                    {prod.name}
                  </h4>

                  <ul className="space-y-1 mb-2">
                    {prod.features.slice(0, 2).map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-1.5 text-[11px] text-[#b8beb0] leading-tight"
                      >
                        <Check size={11} className="text-[#4ade80] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-white/5 text-[10px] text-[#cfd4c8]">
                    <span>{prod.colors.slice(0, 4).join(" · ")}</span>
                    <span aria-hidden="true" className="text-[#6c7365]">
                      •
                    </span>
                    <span className="font-mono text-[#a5ab9c]">
                      {prod.sizes[0]}–{prod.sizes[prod.sizes.length - 1]}
                    </span>
                  </div>
                </div>

                {onOpenOrder && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProductFocus(prod);
                      onOpenOrder(prod);
                    }}
                    className="w-full py-1.5 px-2.5 rounded-md bg-[#e85a2a] hover:bg-[#cf4920] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 size={12} />
                    <span>Configure &amp; Quote {prod.sku}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[9999] w-screen h-screen supports-[height:100dvh]:h-[100dvh] bg-black/85 backdrop-blur-sm flex items-center justify-center font-['DM_Sans',sans-serif]"
      role="dialog"
      aria-modal="true"
      aria-label={`${effectiveTitle} Full PDF Viewer`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Full-Screen Responsive Viewer Container: 100vw x 100vh/100dvh on mobile and desktop */}
      <div
        ref={viewerRef}
        className="w-screen h-screen supports-[height:100dvh]:h-[100dvh] max-w-none rounded-none flex flex-col bg-[#0f110e] text-[#f6f5f0] overflow-hidden shadow-2xl"
      >
        {/* 1. Top Control Bar with Clear Close / X Button at Top Right */}
        <header className="px-3 sm:px-5 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 bg-[#161815] border-b border-[#282d23] flex items-center justify-between gap-2 sm:gap-3 shrink-0 z-30 shadow-lg">
          {/* Left: Document / Collection Title & Current Spread */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#ff7a4d] shrink-0">
              {totalPages} SPREADS
            </span>
            <span aria-hidden="true" className="text-[#4a5242] shrink-0">
              |
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-base font-bold text-white truncate font-['Barlow_Condensed',sans-serif] tracking-wide">
                {isEcosystemDoc
                  ? `${resolvedName} — Official Ecosystem Guide`
                  : `${resolvedName} — 2026/27 Catalog`}
              </h1>
              <p className="text-[10px] sm:text-[11px] text-[#a3a99a] truncate">
                {viewLayout === "iframe"
                  ? "Raw PDF Document View"
                  : `Page ${currentPage} of ${totalPages} · ${currentSlide?.title}`}
              </p>
            </div>
          </div>

          {/* Center: Desktop Page Stepper */}
          {viewLayout !== "iframe" && (
            <div className="hidden lg:flex items-center bg-[#20251c] p-0.5 rounded-lg border border-[#31382a] text-xs shrink-0">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-1.5 rounded hover:bg-[#2b3325] disabled:opacity-30 text-[#cbd0c4] hover:text-white transition-colors cursor-pointer"
                title="Previous Page"
                aria-label="Previous Page"
              >
                <ChevronLeft size={15} />
              </button>

              <span className="px-2.5 font-mono tabular-nums text-[11px] font-bold text-white whitespace-nowrap">
                Page {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-1.5 rounded hover:bg-[#2b3325] disabled:opacity-30 text-[#cbd0c4] hover:text-white transition-colors cursor-pointer"
                title="Next Page"
                aria-label="Next Page"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* Right: Mode Switcher, Zoom, Download & Prominent Top-Right Close / X Button */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Desktop Mode Switcher: Scroll Pages / 1-Page Flip / Raw PDF iframe */}
            <div className="hidden md:flex items-center bg-[#20251c] p-0.5 rounded-lg border border-[#31382a] text-[11px]">
              <button
                type="button"
                onClick={() => setViewLayout("scroll")}
                className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewLayout === "scroll"
                    ? "bg-[#e85a2a] text-white"
                    : "text-[#cbd0c4] hover:text-white"
                }`}
              >
                <Layers size={12} />
                <span>Scroll Pages</span>
              </button>
              <button
                type="button"
                onClick={() => setViewLayout("single")}
                className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewLayout === "single"
                    ? "bg-[#e85a2a] text-white"
                    : "text-[#cbd0c4] hover:text-white"
                }`}
              >
                <BookOpen size={12} />
                <span>1-Page</span>
              </button>
              <button
                type="button"
                onClick={() => setViewLayout("iframe")}
                className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewLayout === "iframe"
                    ? "bg-[#e85a2a] text-white"
                    : "text-[#cbd0c4] hover:text-white"
                }`}
              >
                <FileText size={12} />
                <span>Raw PDF</span>
              </button>
            </div>

            {/* Compact Mobile 3-Mode Segmented Control */}
            <div className="md:hidden flex items-center bg-[#20251c] p-0.5 rounded-lg border border-[#31382a] text-[10px]">
              <button
                type="button"
                onClick={() => setViewLayout("scroll")}
                className={`px-2 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                  viewLayout === "scroll"
                    ? "bg-[#e85a2a] text-white"
                    : "text-[#cbd0c4]"
                }`}
                title="Touch-scroll all pages"
              >
                Scroll
              </button>
              <button
                type="button"
                onClick={() => setViewLayout("single")}
                className={`px-2 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                  viewLayout === "single"
                    ? "bg-[#e85a2a] text-white"
                    : "text-[#cbd0c4]"
                }`}
                title="Swipe page by page"
              >
                Flip
              </button>
              <button
                type="button"
                onClick={() => setViewLayout("iframe")}
                className={`px-2 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                  viewLayout === "iframe"
                    ? "bg-[#e85a2a] text-white"
                    : "text-[#cbd0c4]"
                }`}
                title="Raw PDF iframe"
              >
                PDF
              </button>
            </div>

            {/* Zoom Controls (Desktop & Tablet) */}
            {viewLayout !== "iframe" && (
              <div className="hidden sm:flex items-center bg-[#20251c] p-0.5 rounded-lg border border-[#31382a] text-xs">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-1.5 rounded hover:bg-[#2b3325] disabled:opacity-30 text-[#cbd0c4] hover:text-white cursor-pointer"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={13} />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="px-1.5 font-mono tabular-nums text-[10px] font-bold text-[#e85a2a] cursor-pointer"
                  title="Reset Zoom to 100%"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  className="p-1.5 rounded hover:bg-[#2b3325] disabled:opacity-30 text-[#cbd0c4] hover:text-white cursor-pointer"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={13} />
                </button>
              </div>
            )}

            {/* Download Raw PDF */}
            <a
              href={resolvedPdfUrl}
              download
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#22271e] hover:bg-[#2e3529] text-[#cbd0c4] hover:text-white text-xs font-bold border border-[#37402f] flex items-center gap-1"
              title="Download Official PDF Document"
              aria-label="Download PDF"
            >
              <Download size={14} />
              <span className="hidden xl:inline">PDF</span>
            </a>

            {/* Desktop Fullscreen */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-[#22271e] hover:bg-[#2e3529] text-[#cbd0c4] hover:text-white border border-[#37402f] hidden lg:flex cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* Clear Top-Right Close / X Button (Mobile-friendly >=40px target) */}
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] sm:min-h-0 flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold shadow transition-colors cursor-pointer"
              title="Close Full-Screen PDF Viewer"
              aria-label="Close PDF viewer"
            >
              <X size={16} />
              <span>Close</span>
            </button>
          </div>
        </header>

        {/* 2. Individual Page Strip + Quick Jacket Selector (for Jacket Collections) */}
        {viewLayout !== "iframe" && (
          <div className="bg-[#131612] border-b border-[#252a21] px-2 sm:px-5 py-1.5 flex items-center justify-between gap-1.5 sm:gap-2 shrink-0 z-20">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="lg:hidden p-1.5 rounded-md bg-[#1f241c] text-white disabled:opacity-30 border border-[#30372b] shrink-0 cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0 [-webkit-overflow-scrolling:touch]">
              {slides.map((slide) => {
                const isActive = currentPage === slide.pageNumber;
                return (
                  <button
                    key={slide.pageNumber}
                    ref={(el) => {
                      pillRefs.current[slide.pageNumber] = el;
                    }}
                    type="button"
                    onClick={() => goToPage(slide.pageNumber)}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 border cursor-pointer ${
                      isActive
                        ? "bg-[#e85a2a] text-white border-[#e85a2a] font-bold shadow-sm"
                        : "bg-[#1c201a] text-[#aeb4a5] border-[#2c3327] hover:bg-[#252b22] hover:text-white"
                    }`}
                  >
                    <span className="font-mono tabular-nums text-[10px] opacity-95">
                      P{String(slide.pageNumber).padStart(2, "0")}
                    </span>
                    <span className="hidden sm:inline max-w-[180px] truncate">
                      {slide.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="lg:hidden p-1.5 rounded-md bg-[#1f241c] text-white disabled:opacity-30 border border-[#30372b] shrink-0 cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight size={14} />
            </button>

            {!isEcosystemDoc && collection.products && collection.products.length > 0 && (
              <button
                type="button"
                onClick={() => setShowJacketDrawer((v) => !v)}
                className={`px-2.5 py-1.5 rounded-md text-[11px] font-bold shrink-0 flex items-center gap-1 border transition-colors cursor-pointer ${
                  showJacketDrawer
                    ? "bg-white text-[#161815] border-white"
                    : "bg-[#22271e] text-[#ff7a4d] border-[#384130] hover:bg-[#2b3126]"
                }`}
              >
                <Tag size={12} />
                <span>Models ({collection.products.length})</span>
                {showJacketDrawer ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            )}
          </div>
        )}

        {/* Collapsible Models Quick-Jump Drawer (Jacket Collections only) */}
        {!isEcosystemDoc &&
          showJacketDrawer &&
          collection.products &&
          collection.products.length > 0 && (
            <div className="bg-[#181c16] border-b border-[#2e3529] px-3 sm:px-6 py-3 max-h-[45dvh] overflow-y-auto z-30 shadow-2xl [-webkit-overflow-scrolling:touch]">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#cbd0c4]">
                    Jump directly to any {collection.name} jacket spread:
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowJacketDrawer(false)}
                    className="text-[11px] text-[#9ba192] hover:text-white px-2 py-0.5 cursor-pointer"
                  >
                    Hide
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {collection.products.map((prod) => {
                    const pNum = getProductSlideIndex(collection.id, prod) + 1;
                    const isSelected = activeProductFocus?.sku === prod.sku;
                    return (
                      <button
                        key={prod.sku}
                        type="button"
                        onClick={() => handleJumpToProduct(prod)}
                        className={`text-left p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? "bg-[#e85a2a]/20 border-[#e85a2a] text-white"
                            : "bg-[#21261e] border-[#31382c] text-[#d6dbd0] hover:border-[#e85a2a]/60"
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="block font-mono text-[10px] font-bold text-[#ff7a4d]">
                            {prod.sku}
                          </span>
                          <span className="block text-xs font-semibold truncate text-white">
                            {prod.name}
                          </span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-black/40 font-mono text-[10px] text-[#cbd0c4] shrink-0">
                          P{pNum}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        {/* 3. Main Responsive Touch-Scrollable Viewport */}
        <main
          ref={scrollStageRef}
          onTouchStart={viewLayout === "single" ? handleSingleTouchStart : undefined}
          onTouchEnd={viewLayout === "single" ? handleSingleTouchEnd : undefined}
          className="relative flex-1 w-full overflow-auto overscroll-contain bg-[#0c0e0b] px-2 sm:px-6 py-3 sm:py-5 [-webkit-overflow-scrolling:touch] touch-[pan-x_pan-y_pinch-zoom]"
        >
          {viewLayout === "iframe" ? (
            /* RAW PDF IFRAME MODE */
            <div className="w-full h-full flex flex-col gap-2 max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#aeb4a5] px-1">
                <span className="truncate">
                  Raw PDF: {resolvedPdfUrl.split("/").pop()}
                </span>
                <button
                  type="button"
                  onClick={() => setViewLayout("scroll")}
                  className="text-[#ff7a4d] hover:underline font-bold cursor-pointer"
                >
                  Switch to Mobile Touch-Scroll Pages
                </button>
              </div>
              <div className="w-full flex-1 min-h-[75dvh] rounded-xl overflow-auto bg-white border border-white/15 shadow-2xl [-webkit-overflow-scrolling:touch]">
                <iframe
                  src={`${resolvedPdfUrl}#view=FitH`}
                  title={`${resolvedName} Raw PDF Viewer`}
                  className="w-full h-full min-h-[75dvh] border-0 block bg-white"
                />
              </div>
            </div>
          ) : viewLayout === "scroll" ? (
            /* TOUCH-SCROLL ALL PAGES MODE — Smooth native touch scrolling on Android, iOS, Tablets & Desktops */
            <div className={`mx-auto space-y-6 sm:space-y-8 pb-10 ${zoomWidthClass}`}>
              {slides.map((slide) => (
                <section
                  key={slide.pageNumber}
                  ref={(el) => {
                    pageRefs.current[slide.pageNumber] = el;
                  }}
                  data-page-number={slide.pageNumber}
                  className="scroll-mt-3"
                >
                  <div className="flex items-center justify-between gap-2 mb-2 px-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono tabular-nums text-[10px] sm:text-[11px] font-bold text-[#ff7a4d] shrink-0">
                        SPREAD {String(slide.pageNumber).padStart(2, "0")} /{" "}
                        {String(totalPages).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" className="text-[#4a5242] shrink-0">
                        ·
                      </span>
                      <h2 className="text-xs sm:text-sm font-bold text-[#e4e8de] truncate">
                        {slide.title}
                      </h2>
                    </div>
                    <span className="text-[10px] text-[#7f8677] hidden sm:inline shrink-0">
                      Double-tap or pinch to zoom
                    </span>
                  </div>

                  <div
                    onClick={handlePageImageTap}
                    className="w-full rounded-xl overflow-hidden bg-white shadow-2xl border border-white/15"
                  >
                    <img
                      src={slide.image}
                      alt={`${resolvedName} — ${slide.title}`}
                      loading={slide.pageNumber <= 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-auto block select-none"
                      onError={(e) => {
                        if (slide.pageNumber === 1 && resolvedCoverImage) {
                          (e.target as HTMLImageElement).src = resolvedCoverImage;
                        }
                      }}
                    />
                  </div>

                  {zoomLevel === 1 && renderPageJacketCards(slide.pageNumber)}
                </section>
              ))}
            </div>
          ) : (
            /* SINGLE-PAGE FLIP MODE */
            <div className={`mx-auto pb-8 ${zoomWidthClass}`}>
              {currentSlide && (
                <section>
                  <div className="flex items-center justify-between gap-2 mb-2 px-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono tabular-nums text-[10px] sm:text-[11px] font-bold text-[#ff7a4d] shrink-0">
                        SPREAD {String(currentSlide.pageNumber).padStart(2, "0")} /{" "}
                        {String(totalPages).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" className="text-[#4a5242] shrink-0">
                        ·
                      </span>
                      <h2 className="text-xs sm:text-sm font-bold text-[#e4e8de] truncate">
                        {currentSlide.title}
                      </h2>
                    </div>
                    <span className="text-[10px] text-[#8e9485] shrink-0">
                      Swipe left/right to turn pages
                    </span>
                  </div>

                  <div
                    onClick={handlePageImageTap}
                    className="w-full rounded-xl overflow-hidden bg-white shadow-2xl border border-white/15"
                  >
                    <img
                      src={currentSlide.image}
                      alt={`${resolvedName} — ${currentSlide.title}`}
                      className="w-full h-auto block select-none"
                      onError={(e) => {
                        if (currentSlide.pageNumber === 1 && resolvedCoverImage) {
                          (e.target as HTMLImageElement).src = resolvedCoverImage;
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#20251c] hover:bg-[#2b3226] disabled:opacity-35 text-xs font-bold text-white border border-[#343c2e] cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous Spread</span>
                    </button>

                    <span className="font-mono tabular-nums text-xs font-bold text-[#cbd0c4]">
                      {currentPage} / {totalPages}
                    </span>

                    <button
                      type="button"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#20251c] hover:bg-[#2b3226] disabled:opacity-35 text-xs font-bold text-white border border-[#343c2e] cursor-pointer"
                    >
                      <span>Next Spread</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {zoomLevel === 1 && renderPageJacketCards(currentSlide.pageNumber)}
                </section>
              )}
            </div>
          )}

          {/* Mobile Floating Zoom Controls */}
          {viewLayout !== "iframe" && (
            <div className="sm:hidden fixed bottom-16 right-3 flex items-center gap-0.5 bg-[#161815]/95 backdrop-blur-md p-1 rounded-xl border border-white/15 shadow-2xl z-30">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2 rounded-lg bg-[#252a21] text-white disabled:opacity-35 cursor-pointer"
                aria-label="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2 font-mono tabular-nums text-[10px] font-bold text-[#e85a2a] cursor-pointer"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-2 rounded-lg bg-[#252a21] text-white disabled:opacity-35 cursor-pointer"
                aria-label="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
            </div>
          )}
        </main>

        {/* 4. Bottom Action Bar */}
        <footer className="px-3 sm:px-6 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] bg-[#161815] border-t border-[#282d23] flex items-center justify-between gap-2 shrink-0 z-30 shadow-2xl">
          <div className="hidden md:flex items-center gap-2 text-xs text-[#a4a99d] min-w-0">
            <span className="truncate">
              {isEcosystemDoc
                ? `${resolvedName} · ${totalPages} Two-Page Spreads`
                : activeProductFocus
                ? `Selected: ${activeProductFocus.name} (${activeProductFocus.sku})`
                : `${collection.name} · ${collection.products.length} Models across ${totalPages} Two-Page Spreads`}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            {!isEcosystemDoc && onConfigureProducts && (
              <button
                type="button"
                onClick={onConfigureProducts}
                className="px-3 py-2 sm:py-2.5 rounded-xl bg-[#22271e] hover:bg-[#2e3529] text-white text-xs font-bold border border-[#384130] transition-colors shrink-0 cursor-pointer"
              >
                <span>All {collection.products.length} Models</span>
              </button>
            )}

            {onOpenOrder && (
              <button
                type="button"
                onClick={() => onOpenOrder(activeProductFocus || undefined)}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                <CheckCircle2 size={15} />
                <span>
                  {!isEcosystemDoc && activeProductFocus
                    ? `Configure ${activeProductFocus.sku}`
                    : isEcosystemDoc
                    ? "Start Custom Order"
                    : "Configure & Order"}
                </span>
              </button>
            )}

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#25d366] hover:bg-[#22bf5b] text-white text-xs font-bold shadow-lg transition-all shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageSquare size={15} />
              <span>WhatsApp</span>
            </a>

            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-xl bg-[#22271e] hover:bg-[#2e3529] text-[#cbd0c4] hover:text-white border border-[#37402f] transition-colors shrink-0 flex items-center"
              title="Open Raw PDF in New Tab"
              aria-label="Open Raw PDF in New Tab"
            >
              <ExternalLink size={15} />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
