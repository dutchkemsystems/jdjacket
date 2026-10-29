import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, FileText, ChevronLeft, ChevronRight, CheckCircle2, Shield, Download } from "lucide-react";
import { jackets, collections, JacketItem, CollectionItem, getProductSlideIndex, findCollection } from "../data/jacketsData";
import { JacketCard } from "../components/JacketCard";
import { CollectionPDFViewer } from "../components/CollectionPDFViewer";
import { PdfCatalogueModal } from "../components/PdfCatalogueModal";
import { OrderDialog } from "../components/OrderDialog";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Gallery Page
 * 
 * Styled exactly with the cloned site background colour (#f6f5f0, no addition or subtraction).
 * 
 * Features:
 * - 20 Jacket styles, each displayed with a single catalogue cover image
 * - Filter pills by collection
 * - Dual actions on every card: "Explore Jacket" & "View PDF Catalogue"
 * - Both actions open the responsive PDF catalogue in full view modal (never blank)
 * - Interactive showcase banner
 * - Direct quote order dialog
 */
export const GalleryPage: React.FC = () => {
  const [selectedJacket, setSelectedJacket] = useState<JacketItem>(jackets[0]);
  const [filterCollection, setFilterCollection] = useState<string>("all");
  const [modalJacket, setModalJacket] = useState<JacketItem | CollectionItem | null>(null);
  const [orderCollection, setOrderCollection] = useState<CollectionItem | JacketItem | null>(null);
  const [orderProductName, setOrderProductName] = useState<string | undefined>(undefined);
  const showcaseRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = "Jacket Gallery — Every angle. Every possibility. | JD Jackets";
    window.scrollTo(0, 0);
  }, []);

  const filteredJackets = jackets.filter(
    (j) => filterCollection === "all" || j.collection === filterCollection
  );

  const currentCollection = collections.find((c) => c.id === selectedJacket.collection) || collections[0];
  const currentIndex = jackets.findIndex((j) => j.id === selectedJacket.id);

  const handleSelectJacket = (jacket: JacketItem, scroll: boolean = true) => {
    setSelectedJacket(jacket);
    if (scroll && showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrevJacket = () => {
    const prevIdx = (currentIndex - 1 + jackets.length) % jackets.length;
    handleSelectJacket(jackets[prevIdx], false);
  };

  const handleNextJacket = () => {
    const nextIdx = (currentIndex + 1) % jackets.length;
    handleSelectJacket(jackets[nextIdx], false);
  };

  return (
    <div className="min-h-screen bg-[#f6f5f0] text-[#252823] flex flex-col font-['DM_Sans',sans-serif]">
      {/* Navigation Header */}
      <Header onOpenOrder={() => setOrderCollection(currentCollection)} />

      <main className="flex-1 bg-[#f6f5f0]">
        {/* Intro Section */}
        <section className="py-10 px-4 sm:px-8 border-b border-[#deded5] bg-[#f6f5f0]">
          <div className="max-w-7xl mx-auto">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#71776a] hover:text-[#e85a2a] transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              <span>Back to home</span>
            </a>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase mb-2">
                  <span className="w-1.5 h-1.5 bg-[#e85a2a] inline-block" />
                  THE OFFICIAL JACKET CATALOGUE GALLERY
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Barlow_Condensed',sans-serif] tracking-tight leading-none text-[#20231f]">
                  CUSTOM JACKETS.<br />
                  <span className="text-[#85867f]">FOR YOUR ENTIRE ORGANISATION.</span>
                </h1>
              </div>

              <div className="max-w-md text-xs sm:text-sm text-[#71776a] space-y-1">
                <p>
                  Explore all {jackets.length} signature styles across {collections.length} JD Pro 2026/27 collections.
                </p>
                <p className="text-[#e85a2a] font-medium flex items-center gap-1.5">
                  <FileText size={14} />
                  <span>Each card features an instant full-view PDF catalogue &amp; spec sheet.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Jacket Showcase Section: original site #eeeee6 background */}
        <section
          ref={showcaseRef}
          aria-label="Selected jacket feature"
          className="py-10 px-4 sm:px-8 my-6 max-w-7xl mx-auto rounded-2xl bg-[#eeeee6] border border-[#deded5] shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Showcase Single Catalogue Visual */}
            <div className="lg:col-span-5 relative bg-white border border-[#deded5] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden shadow-md group">
              {/* Stage Top Bar */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#71776a] mb-4">
                <span className="font-bold text-[#e85a2a]">
                  {currentCollection.name.toUpperCase()}™
                </span>
                <span>
                  {String(currentIndex + 1).padStart(2, "0")} / {String(jackets.length).padStart(2, "0")}
                </span>
              </div>

              {/* Single Catalogue Spread Display */}
              <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden shadow-xl border border-[#deded5] bg-[#141714]">
                <img
                  src={selectedJacket.catalogueImage}
                  alt={selectedJacket.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/catalogues/default-cover.jpg";
                  }}
                />

                {/* Floating Preview Button */}
                <button
                  type="button"
                  onClick={() => setModalJacket(selectedJacket)}
                  className="absolute inset-0 m-auto w-48 h-11 rounded-xl bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold shadow-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 border border-white/20"
                >
                  <FileText size={16} />
                  <span>VIEW FULL PDF</span>
                </button>
              </div>

              {/* Watermark in background */}
              <span className="absolute -bottom-6 -right-6 text-7xl font-extrabold font-['Barlow_Condensed',sans-serif] text-black/5 pointer-events-none select-none">
                {selectedJacket.kind.toUpperCase()}
              </span>
            </div>

            {/* Right: Showcase Details & Dual Open Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase mb-1">
                  <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
                  {currentCollection.tag}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
                  {selectedJacket.name}
                </h2>
                <p className="text-sm text-[#5f6558] mt-2 leading-relaxed">
                  {selectedJacket.description || currentCollection.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#deded5]">
                <div className="p-3 rounded-lg bg-white border border-[#deded5]">
                  <span className="block text-[10px] font-bold text-[#888e81] uppercase">COLLECTION</span>
                  <strong className="text-xs sm:text-sm text-[#20231f] font-bold">{currentCollection.name}</strong>
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#deded5]">
                  <span className="block text-[10px] font-bold text-[#888e81] uppercase">STYLE</span>
                  <strong className="text-xs sm:text-sm text-[#20231f] font-bold">{selectedJacket.kind}</strong>
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#deded5]">
                  <span className="block text-[10px] font-bold text-[#888e81] uppercase">COLOUR SHOWN</span>
                  <strong className="text-xs sm:text-sm text-[#20231f] font-bold">{selectedJacket.colour}</strong>
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#deded5]">
                  <span className="block text-[10px] font-bold text-[#888e81] uppercase">MAKE IT YOURS</span>
                  <strong className="text-xs sm:text-sm text-[#e85a2a] font-bold">Logo, Fit &amp; Colours</strong>
                </div>
              </div>

              {/* Value Props */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#52574c]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#1b803e]" />
                  <span>Technical B2B Specifications Included</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield size={15} className="text-[#e85a2a]" />
                  <span>Full Size Grading: XS to XXXL</span>
                </span>
              </div>

              {/* Dual Actions for Selected Item: "Explore Jacket" and "View PDF Catalogue" */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {/* Button 1: "Explore Jacket" (opens the PDF) */}
                <button
                  type="button"
                  onClick={() => setModalJacket(selectedJacket)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#20231f] hover:bg-[#343831] text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-102 shadow"
                >
                  <span>Explore Jacket</span>
                  <ArrowRight size={15} className="text-[#cbd0c4]" />
                </button>

                {/* Button 2: "View PDF Catalogue" (opens the PDF) */}
                <button
                  type="button"
                  onClick={() => setModalJacket(selectedJacket)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold uppercase tracking-wider shadow transition-all hover:scale-102"
                >
                  <FileText size={16} />
                  <span>View PDF Catalogue</span>
                </button>

                {/* Order Quote Button */}
                <button
                  type="button"
                  onClick={() => setOrderCollection(currentCollection)}
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-white hover:bg-[#fafaf7] text-[#1b803e] text-xs font-bold uppercase tracking-wider border border-[#b2dbbe] transition-all hover:scale-102 shadow-sm"
                >
                  <span>Request Quote</span>
                </button>
              </div>

              {/* Next / Previous Pagination Controls */}
              <div className="flex items-center justify-between pt-2 text-xs text-[#71776a]">
                <button
                  type="button"
                  onClick={handlePrevJacket}
                  className="flex items-center gap-1.5 hover:text-[#20231f] transition-colors"
                  aria-label="Previous jacket"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                <a href="#gallery-styles" className="text-[#e85a2a] hover:underline font-semibold">
                  Browse all {jackets.length} styles below ↓
                </a>
                <button
                  type="button"
                  onClick={handleNextJacket}
                  className="flex items-center gap-1.5 hover:text-[#20231f] transition-colors"
                  aria-label="Next jacket"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Styles Section */}
        <section id="gallery-styles" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto bg-[#f6f5f0]">
          {/* Section Heading & Style Count */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase mb-1">
                <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
                FIND YOUR CORPORATE SIGNATURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
                Built For Your World.
              </h2>
            </div>
            <span className="text-xs font-mono text-[#71776a] px-3.5 py-1.5 rounded-full bg-white border border-[#deded5] shadow-sm">
              {filteredJackets.length} styles available · PDF viewable
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" aria-label="Filter gallery by industry">
            <button
              type="button"
              onClick={() => setFilterCollection("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                filterCollection === "all"
                  ? "bg-[#e85a2a] text-white"
                  : "bg-white hover:bg-[#eeeee6] text-[#42463e] border border-[#deded5]"
              }`}
            >
              All Styles ({jackets.length})
            </button>
            {collections.map((col) => {
              const count = jackets.filter((j) => j.collection === col.id).length;
              if (count === 0) return null;
              const isActive = filterCollection === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => {
                    setFilterCollection(col.id);
                    const firstInCol = jackets.find((j) => j.collection === col.id);
                    if (firstInCol) setSelectedJacket(firstInCol);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                    isActive
                      ? "bg-[#e85a2a] text-white"
                      : "bg-white hover:bg-[#eeeee6] text-[#42463e] border border-[#deded5]"
                  }`}
                >
                  {col.name.replace("JD ", "")} ({count})
                </button>
              );
            })}
          </div>

          {/* The 20 Jacket Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJackets.map((jacket) => (
              <JacketCard
                key={jacket.id}
                jacket={jacket}
                isSelected={jacket.id === selectedJacket.id}
                onSelectJacket={(j) => setSelectedJacket(j)}
                onOpenPdf={(j) => setModalJacket(j)}
              />
            ))}
          </div>

          {/* End Call to Action */}
          <div className="mt-16 p-8 sm:p-12 rounded-2xl bg-[#eeeee7] border border-[#deded5] text-center max-w-3xl mx-auto shadow-sm">
            <span className="text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase block mb-2">
              READY FOR PRODUCTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f] mb-3">
              Found Your Team’s Next Outerwear Look?
            </h3>
            <p className="text-xs sm:text-sm text-[#61665a] max-w-lg mx-auto mb-6">
              Share your quantities, base colours, sizes and logos on WhatsApp.
              We provide formal quotations, sizing fitting sets and pre-production proofing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setOrderCollection(currentCollection)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-102"
              >
                <span>Order Custom Jackets</span>
                <ArrowRight size={15} />
              </button>
              <a
                href={selectedJacket.cataloguePdf}
                download
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#f6f5f0] text-[#20231f] text-xs font-semibold border border-[#deded5] transition-colors shadow-sm"
              >
                <Download size={14} className="text-[#e85a2a]" />
                <span>Download Sample Spec Sheet</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Multi-Page PDF Catalogue Viewer */}
      {modalJacket && (() => {
        const colId = "collection" in modalJacket ? modalJacket.collection : modalJacket.id;
        const resolvedCol = findCollection(colId);
        return (
          <CollectionPDFViewer
            pdfUrl={resolvedCol.pdfUrl}
            collection={resolvedCol}
            itemTitle={modalJacket.name}
            highlightTitle={"products" in modalJacket ? undefined : modalJacket.name}
            initialSlideIndex={
              "products" in modalJacket
                ? 0
                : getProductSlideIndex(resolvedCol.id, modalJacket)
            }
            onClose={() => setModalJacket(null)}
            onOpenOrder={(prod) => {
              const foundCol = collections.find((c) => c.id === resolvedCol.id) || currentCollection;
              setOrderProductName(
                prod?.name || ("products" in modalJacket ? undefined : modalJacket.name)
              );
              setOrderCollection(foundCol);
              setModalJacket(null);
            }}
            onConfigureProducts={() => {
              window.history.pushState({}, "", `/collections/${resolvedCol.id}`);
              window.dispatchEvent(new PopStateEvent("popstate"));
              setModalJacket(null);
            }}
          />
        );
      })()}

      {/* WhatsApp Order Quotation Dialog */}
      {orderCollection && (
        <OrderDialog
          collection={orderCollection}
          productName={orderProductName || selectedJacket.name}
          onClose={() => {
            setOrderCollection(null);
            setOrderProductName(undefined);
          }}
        />
      )}
    </div>
  );
};
