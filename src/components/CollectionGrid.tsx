import React, { useState } from "react";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import {
  CollectionItem,
  EcosystemDocument,
  ecosystemData,
  getCollectionCoverImage
} from "../data/jacketsData";
import { CollectionPDFViewer } from "./CollectionPDFViewer";

interface CollectionGridProps {
  collections: CollectionItem[];
  onViewPdf: (collection: CollectionItem) => void;
  onViewEcosystemPdf?: (doc: EcosystemDocument) => void;
  activeHeroId?: string;
}

export { getCollectionCoverImage };

/**
 * CollectionGrid Component
 *
 * 1. Renders all 8 JD 2026/27 Premium Jacket Collections exactly as configured,
 *    with Page 1 cover thumbnails, model links, and "View Full Catalog (PDF)".
 * 2. Renders "The JD Ecosystem & Process" section directly below the jacket grid,
 *    mapping over ecosystemData to display the 3 master system guides with their
 *    cover thumbnails and "View Full Document (PDF)" buttons.
 */
export const CollectionGrid: React.FC<CollectionGridProps> = ({
  collections,
  onViewPdf,
  onViewEcosystemPdf,
  activeHeroId
}) => {
  const [activeEcosystemDoc, setActiveEcosystemDoc] =
    useState<EcosystemDocument | null>(null);

  const handleOpenEcosystemPdf = (doc: EcosystemDocument) => {
    if (onViewEcosystemPdf) {
      onViewEcosystemPdf(doc);
    } else {
      setActiveEcosystemDoc(doc);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* 1. Existing 8 JD Pro Jacket Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {collections.map((col, idx) => {
          const coverSrc = col.coverImage || getCollectionCoverImage(col.id);

          return (
            <article
              key={col.id}
              className={`group relative flex flex-col justify-between bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                activeHeroId === col.id
                  ? "border-[#e85a2a] ring-2 ring-[#e85a2a]/20"
                  : "border-[#deded5] hover:border-[#b4b8ab]"
              }`}
            >
              {/* Visual Thumbnail: Page 1 Cover of the Collection's Two-Page Spread PDF */}
              <div
                onClick={() => onViewPdf(col)}
                className="relative w-full aspect-[3/2] bg-[#141714] overflow-hidden block select-none cursor-pointer border-b border-[#e8e8df]"
                title={`Open ${col.name} Full PDF Catalog`}
              >
                <img
                  src={coverSrc}
                  alt={`${col.name} 2026/27 Official Cover`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/catalogues/default-cover.jpg";
                  }}
                />

                {/* Subtle bottom gradient for metadata legibility */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                {/* Edition Number */}
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#161815]/90 backdrop-blur text-[10px] font-mono font-bold text-white border border-white/15">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Bottom Metadata Strip */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[10px] text-white pointer-events-none">
                  <span className="font-semibold tracking-wide bg-black/65 backdrop-blur px-2 py-0.5 rounded border border-white/10">
                    2026/27 Edition • {col.pdfPages} Pages
                  </span>
                  <span className="font-mono bg-[#e85a2a] px-2 py-0.5 rounded font-bold">
                    {col.products.length} Models
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-5 bg-white">
                <div className="mb-2.5">
                  <a
                    href={`/collections/${col.id}`}
                    className="group-hover:text-[#e85a2a] transition-colors block"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-[#20231f] mb-1 font-['DM_Sans',sans-serif] tracking-tight">
                      {col.name}
                    </h3>
                  </a>
                  <span className="text-[10px] font-bold text-[#e85a2a] uppercase tracking-wider block font-mono line-clamp-1">
                    {col.tag}
                  </span>
                </div>

                <p className="text-xs text-[#6e7467] line-clamp-2 mb-4 leading-relaxed">
                  {col.description}
                </p>

                {/* Key Collection Highlights */}
                <div className="space-y-1.5 mb-5">
                  {col.features.slice(0, 2).map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-1.5 text-[11px] text-[#505549]"
                    >
                      <CheckCircle2
                        size={12}
                        className="text-[#1b803e] shrink-0 mt-0.5"
                      />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons: Prominent "View Full Catalog (PDF)" + Explore Models */}
                <div className="mt-auto pt-3.5 border-t border-[#f0f0ea] flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => onViewPdf(col)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    title={`Open full PDF catalog for ${col.name}`}
                  >
                    <FileText size={14} />
                    <span>View Full Catalog (PDF)</span>
                  </button>

                  <a
                    href={`/collections/${col.id}`}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#20231f] hover:bg-[#343831] text-white text-xs font-bold transition-colors"
                    title={`Configure models in ${col.name}`}
                  >
                    <span>Explore {col.products.length} Models</span>
                    <ArrowRight size={13} className="text-[#cbd0c4]" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 2. The JD Ecosystem & Process Section */}
      <div
        id="ecosystem-process"
        className="pt-12 sm:pt-16 border-t border-[#deded5]"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#e85a2a] tracking-wide block">
              Master Architecture · Client Protocol · Customization Blueprint
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f] tracking-tight">
              The JD Ecosystem &amp; Process
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e7467] max-w-md leading-relaxed">
            Explore our complete operational blueprints covering every milestone from initial consultation and customization to quality inspection and delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ecosystemData.map((doc, idx) => (
            <article
              key={doc.id}
              className="group relative flex flex-col justify-between bg-white border border-[#deded5] hover:border-[#b4b8ab] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Visual Thumbnail using doc.coverImage */}
              <div
                onClick={() => handleOpenEcosystemPdf(doc)}
                className="relative w-full aspect-[3/2] bg-[#141714] overflow-hidden block select-none cursor-pointer border-b border-[#e8e8df]"
                title={`Open ${doc.name} Full PDF Document`}
              >
                <img
                  src={doc.coverImage}
                  alt={`${doc.name} Cover`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/catalogues/default-cover.jpg";
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[11px] text-white/95 pointer-events-none">
                  <span className="font-mono font-bold">
                    0{idx + 1}. Official System Guide
                  </span>
                  <span className="font-medium text-white/85">PDF Spreads</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-5 sm:p-6 bg-white">
                <div className="mb-3">
                  <h3
                    onClick={() => handleOpenEcosystemPdf(doc)}
                    className="text-lg sm:text-xl font-bold text-[#20231f] group-hover:text-[#e85a2a] transition-colors mb-1 font-['DM_Sans',sans-serif] tracking-tight cursor-pointer"
                  >
                    {doc.name}
                  </h3>
                  <span className="text-[10px] font-bold text-[#e85a2a] uppercase tracking-wider block font-mono leading-snug">
                    {doc.tagline}
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-[#5f6558] mb-6 leading-relaxed">
                  {doc.description}
                </p>

                {/* Prominent "View Full Document (PDF)" Button */}
                <div className="mt-auto pt-3.5 border-t border-[#f0f0ea]">
                  <button
                    type="button"
                    onClick={() => handleOpenEcosystemPdf(doc)}
                    className="w-full min-h-[42px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    title={`View full PDF document for ${doc.name}`}
                  >
                    <FileText size={14} />
                    <span>View Full Document (PDF)</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Standalone Fallback PDF Viewer if parent did not supply onViewEcosystemPdf */}
      {activeEcosystemDoc && (
        <CollectionPDFViewer
          pdfUrl={activeEcosystemDoc.pdfUrl}
          ecosystemDoc={activeEcosystemDoc}
          itemTitle={activeEcosystemDoc.name}
          onClose={() => setActiveEcosystemDoc(null)}
        />
      )}
    </div>
  );
};
