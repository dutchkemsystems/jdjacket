import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, FileText, CheckCircle2, Shield, Download, MessageSquare, Check } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { OrderDialog } from "../components/OrderDialog";
import { PdfCatalogueModal } from "../components/PdfCatalogueModal";
import { CollectionPDFViewer } from "../components/CollectionPDFViewer";
import {
  collections,
  jacketsData,
  Product,
  normalizeCollectionId,
  getWhatsAppUrl,
  getCollectionSlides,
  getProductSlideIndex
} from "../data/jacketsData";

interface IndustryPageProps {
  industryId: string;
}

export const IndustryPage: React.FC<IndustryPageProps> = ({ industryId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customSlideIdx, setCustomSlideIdx] = useState<number>(0);
  const [targetPdfUrl, setTargetPdfUrl] = useState<string | undefined>(undefined);
  const [targetTitle, setTargetTitle] = useState<string | undefined>(undefined);

  const canonicalId = normalizeCollectionId(industryId);
  const currentCollection =
    collections.find((c) => c.id === canonicalId) || collections[0];
  const fullCollection =
    jacketsData.find((c) => c.id === canonicalId) || jacketsData[0];
  const collectionSlides = getCollectionSlides(fullCollection.id);

  // Clear previous selection state whenever switching collections
  useEffect(() => {
    setSelectedProduct(null);
    setCustomSlideIdx(0);
    setShowPdfViewer(false);
    setOrderOpen(false);
    setTargetPdfUrl(undefined);
    setTargetTitle(undefined);
  }, [canonicalId]);

  const handleOpenProductPdf = (product: Product) => {
    const idx = getProductSlideIndex(fullCollection.id, product);
    setSelectedProduct(product);
    setCustomSlideIdx(idx);
    setTargetPdfUrl(fullCollection.pdfUrl);
    setTargetTitle(product.name);
    setShowPdfViewer(true);
  };

  const handleOpenCollectionPdf = (startSlideIndex: number = 0) => {
    setSelectedProduct(null);
    setCustomSlideIdx(startSlideIndex);
    setTargetPdfUrl(fullCollection.pdfUrl);
    setTargetTitle(fullCollection.name);
    setShowPdfViewer(true);
  };

  const handleInquireProduct = (product: Product) => {
    setSelectedProduct(product);
    setOrderOpen(true);
  };

  const getProductWhatsAppUrl = (product: Product) => {
    const text = `Hello JD Jackets, I would like to inquire about the ${product.name} (SKU: ${product.sku}) from the ${fullCollection.name} collection. Please share pricing and minimum order details.`;
    return getWhatsAppUrl(text);
  };

  return (
    <div className="min-h-screen bg-[#f6f5f0] text-[#252823] flex flex-col font-['DM_Sans',sans-serif]">
      <Header onOpenOrder={() => setOrderOpen(true)} />

      <main className="flex-1 bg-[#f6f5f0]">
        {/* Industry Hero */}
        <section className="py-12 sm:py-16 px-4 sm:px-8 border-b border-[#deded5] bg-[#eeeee6]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <a
                href="/#industries"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71776a] hover:text-[#e85a2a] transition-colors"
              >
                <ArrowLeft size={14} />
                <span>All Collections</span>
              </a>
              <span className="text-[#a4a99d]">/</span>
              <span className="text-xs font-bold text-[#e85a2a]">{fullCollection.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase mb-2">
                    <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
                    {fullCollection.tagline}
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f] leading-[0.98]">
                    {fullCollection.name}
                  </h1>
                </div>

                <p className="text-sm sm:text-base text-[#5f6558] leading-relaxed max-w-xl">
                  {fullCollection.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {(fullCollection.idealFor || []).slice(0, 4).map((audience, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-white px-2.5 py-1 rounded-md border border-[#deded5] text-[#4d5345]"
                    >
                      {audience}
                    </span>
                  ))}
                </div>

                {/* Dual actions: "Explore Jacket" & "View PDF Catalogue" */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#products"
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#20231f] hover:bg-[#343831] text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-102 shadow-sm"
                  >
                    <span>View {fullCollection.products.length} Models</span>
                    <ArrowRight size={14} className="text-[#cbd0c4]" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenCollectionPdf(0)}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold uppercase tracking-wider shadow transition-all hover:scale-102"
                  >
                    <FileText size={15} />
                    <span>View Full Catalog (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#fafaf7] text-[#1b803e] text-xs font-bold uppercase tracking-wider border border-[#b2dbbe] transition-colors shadow-sm"
                  >
                    <span>Configure &amp; Quote</span>
                  </button>
                </div>
              </div>

              {/* Right: Single Catalogue Cover Image Stage */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md bg-white p-5 rounded-2xl border border-[#deded5] shadow-xl overflow-hidden group">
                  <div className="flex items-center justify-between text-xs text-[#71776a] mb-3">
                    <span className="font-bold text-[#e85a2a] uppercase tracking-wider text-[10px]">
                      {fullCollection.name.toUpperCase()}™
                    </span>
                    <span className="font-mono text-[11px] bg-[#f6f5f0] border border-[#deded5] px-2 py-0.5 rounded">
                      {collectionSlides.length} SPREADS
                    </span>
                  </div>

                  <div
                    className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-md bg-[#141714] border border-[#deded5] cursor-pointer"
                    onClick={() => handleOpenCollectionPdf(0)}
                  >
                    <img
                      src={fullCollection.coverImage}
                      alt={`${fullCollection.name} cover`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/catalogues/default-cover.jpg";
                      }}
                    />

                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-2">
                      <span className="px-4 py-2 rounded-lg bg-[#e85a2a] text-white text-xs font-bold shadow-xl flex items-center gap-2">
                        <FileText size={14} /> View Full Catalog (PDF)
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-[#71776a]">
                    <span>2026/27 Two-Page Spreads</span>
                    <a
                      href={fullCollection.pdfUrl}
                      download
                      className="text-[#e85a2a] hover:underline flex items-center gap-1 font-bold"
                    >
                      <Download size={13} />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overarching Collection Features & Target Audience */}
        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto bg-[#f6f5f0]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Column 1: Teams Served / Ideal For */}
            <div className="p-8 rounded-2xl bg-white border border-[#deded5] shadow-sm space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase">
                TARGET AUDIENCE &amp; DEPLOYMENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
                Built Around Your Organization.
              </h2>
              <ul className="space-y-3 pt-2">
                {(fullCollection.idealFor || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#464a40]">
                    <CheckCircle2 size={16} className="text-[#e85a2a] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Overarching Collection Features */}
            <div className="p-8 rounded-2xl bg-white border border-[#deded5] shadow-sm space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase">
                {fullCollection.name.toUpperCase()} SPECIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
                Material Standards &amp; Engineering.
              </h2>
              <ul className="space-y-3 pt-2">
                {(fullCollection.features || []).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#464a40]">
                    <Shield size={16} className="text-[#1b803e] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Individual Catalogue Pages Navigator (Tap any page on phone, tablet or laptop) */}
          <div className="mb-14 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase block mb-1">
                  FULL MULTI-PAGE CATALOGUE ({collectionSlides.length} INDIVIDUAL PAGES)
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
                  Browse Every Page Directly
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleOpenCollectionPdf(0)}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#20231f] hover:bg-[#343831] text-white text-xs font-bold transition-colors"
              >
                <FileText size={14} className="text-[#e85a2a]" />
                <span>Open All {collectionSlides.length} Pages</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {collectionSlides.map((slide, sIdx) => (
                <button
                  key={slide.pageNumber}
                  type="button"
                  onClick={() => handleOpenCollectionPdf(sIdx)}
                  className="group text-left bg-white border border-[#deded5] hover:border-[#e85a2a] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full bg-[#eeeee6] overflow-hidden border-b border-[#ecece3]">
                    <img
                      src={slide.image}
                      alt={`${fullCollection.name} Page ${slide.pageNumber}: ${slide.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#20231f]/90 text-white font-mono text-[10px] font-bold">
                      P{String(slide.pageNumber).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <span className="block text-[11px] font-bold text-[#20231f] group-hover:text-[#e85a2a] line-clamp-1">
                      {slide.title}
                    </span>
                    <span className="text-[10px] text-[#71776a]">
                      Page {slide.pageNumber} of {collectionSlides.length}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dedicated Product Grid for this specific collection */}
          <div id="products" className="scroll-mt-24 pt-6 border-t border-[#deded5]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase block mb-1">
                  COMPLETE {fullCollection.name.toUpperCase()} CATALOG
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
                  Available Models ({fullCollection.products.length})
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#71776a] max-w-md">
                Select any jacket below to jump directly to its catalogue page with all {collectionSlides.length} pages unlocked for navigation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullCollection.products.map((prod) => {
                const prodPageNum = getProductSlideIndex(fullCollection.id, prod) + 1;
                return (
                <article
                  key={prod.sku}
                  onClick={() => handleOpenProductPdf(prod)}
                  className="bg-white border border-[#deded5] hover:border-[#e85a2a] rounded-xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5"
                  title={`Click to view PDF specification for ${prod.name} (Page ${prodPageNum})`}
                >
                  <div>
                    {/* Header: SKU, Page & Fit */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-[#e85a2a] bg-[#e85a2a]/10 px-2.5 py-0.5 rounded border border-[#e85a2a]/20">
                          {prod.sku}
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-[#52574b] bg-[#f6f5f0] border border-[#deded5] px-1.5 py-0.5 rounded">
                          Page {prodPageNum}/{collectionSlides.length}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[#71776a] bg-[#eeeee6] px-2 py-0.5 rounded truncate">
                        {prod.fit}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#20231f] mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#e85a2a] transition-colors">
                      {prod.name}
                    </h3>

                    {/* Features list */}
                    <div className="space-y-1.5 mb-4 text-xs text-[#52574b]">
                      {prod.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check size={13} className="text-[#1b803e] shrink-0 mt-0.5" />
                          <span className="leading-snug">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Colors & Sizing */}
                    <div className="pt-3 border-t border-[#f0f0ea] space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#71776a] block mb-1">
                          Colors:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {prod.colors.map((c, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-[#f6f5f0] text-[#20231f] border border-[#deded5] px-2 py-0.5 rounded"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#71776a] block mb-1">
                          Sizes:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {prod.sizes.map((s, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono font-semibold bg-[#eeeee6] px-1.5 py-0.5 rounded text-[#464a40]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#71776a] block mb-1">
                          Branding:
                        </span>
                        <p className="text-[11px] text-[#5f6558]">
                          {prod.customization.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product action buttons */}
                  <div className="mt-5 pt-3 border-t border-[#f0f0ea] flex flex-col sm:flex-row items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProductPdf(prod);
                      }}
                      className="w-full sm:flex-1 py-2 px-3 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
                      title={`View ${prod.name} PDF specification spread`}
                    >
                      <FileText size={13} />
                      <span>View PDF Spec</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInquireProduct(prod);
                      }}
                      className="w-full sm:w-auto py-2 px-3 rounded-lg bg-[#20231f] hover:bg-[#343831] text-white text-xs font-bold transition-all text-center"
                    >
                      Inquire Specs
                    </button>
                    <a
                      href={getProductWhatsAppUrl(prod)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full sm:w-auto py-2 px-3 rounded-lg bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#1b803e] text-xs font-bold border border-[#25d366]/30 flex items-center justify-center gap-1.5 transition-colors"
                      title="Direct WhatsApp chat"
                    >
                      <MessageSquare size={13} />
                      <span className="sm:hidden">WhatsApp</span>
                    </a>
                  </div>
                </article>
                );
              })}
            </div>
          </div>

          {/* Other Collections Navigation Strip */}
          <div className="mt-16 pt-8 border-t border-[#deded5]">
            <h3 className="text-xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f] mb-4">
              Explore Other JD Pro Collections
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {collections
                .filter((c) => c.id !== fullCollection.id)
                .map((c) => (
                  <a
                    key={c.id}
                    href={`/collections/${c.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-[#eeeee6] text-xs font-semibold text-[#20231f] border border-[#deded5] transition-colors shadow-sm"
                  >
                    <span>{c.name}</span>
                    <ArrowRight size={12} className="text-[#71776a]" />
                  </a>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Full Multi-Page Catalogue Viewer for Collection or Specific Jacket */}
      {showPdfViewer && (
        <CollectionPDFViewer
          pdfUrl={targetPdfUrl || fullCollection.pdfUrl}
          collection={fullCollection}
          itemTitle={targetTitle}
          highlightTitle={selectedProduct?.name}
          selectedProduct={selectedProduct}
          initialSlideIndex={customSlideIdx}
          onClose={() => {
            setShowPdfViewer(false);
            setSelectedProduct(null);
            setCustomSlideIdx(0);
            setTargetPdfUrl(undefined);
            setTargetTitle(undefined);
          }}
          onConfigureProducts={() => {
            setShowPdfViewer(false);
            setSelectedProduct(null);
            setCustomSlideIdx(0);
            setTargetPdfUrl(undefined);
            setTargetTitle(undefined);
          }}
          onOpenOrder={(prod) => {
            if (prod) setSelectedProduct(prod);
            setShowPdfViewer(false);
            setOrderOpen(true);
          }}
        />
      )}

      {/* Legacy PDF Modal */}
      {modalOpen && (
        <PdfCatalogueModal
          jacket={currentCollection}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Order Quote Modal */}
      {orderOpen && (
        <OrderDialog
          collection={currentCollection}
          productName={selectedProduct?.name}
          onClose={() => {
            setOrderOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};
