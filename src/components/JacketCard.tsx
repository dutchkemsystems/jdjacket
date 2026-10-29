import React from "react";
import { FileText, ArrowRight, Eye, ShieldCheck } from "lucide-react";
import { JacketItem } from "../data/jacketsData";

interface JacketCardProps {
  jacket: JacketItem;
  isSelected?: boolean;
  onSelectJacket?: (jacket: JacketItem) => void;
  onOpenPdf: (jacket: JacketItem) => void;
}

/**
 * JacketCard Component
 * Displays a single catalogue image (no jacket image), with dual actions:
 * 1. "Explore Jacket" -> opens PDF catalogue in full view modal
 * 2. "View PDF Catalogue" -> opens PDF catalogue in full view modal
 * 
 * Styled for the exact light corporate theme (background #f6f5f0, card #ffffff).
 */
export const JacketCard: React.FC<JacketCardProps> = ({
  jacket,
  isSelected = false,
  onSelectJacket,
  onOpenPdf
}) => {
  const coverSrc = jacket.catalogueImage || `/catalogues/${jacket.id}-cover.jpg`;

  return (
    <article
      className={`group relative flex flex-col justify-between bg-white border ${
        isSelected ? "border-[#e85a2a] ring-2 ring-[#e85a2a]/20" : "border-[#deded5] hover:border-[#b4b8ab]"
      } rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      {/* 1. Single Catalogue Spread Visual Container */}
      <div 
        className="relative w-full aspect-[3/2] bg-[#141714] overflow-hidden cursor-pointer select-none border-b border-[#ecece3]"
        onClick={() => {
          onSelectJacket?.(jacket);
          onOpenPdf(jacket);
        }}
        title={`Click to view PDF catalogue for ${jacket.name}`}
      >
        {/* Subtle top/bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 z-10 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 z-20 flex items-center justify-between pointer-events-none">
          <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/95 backdrop-blur text-[#e85a2a] shadow-sm border border-[#e5e5dc]">
            {jacket.sku}
          </span>
          <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#20231f]/85 backdrop-blur text-white shadow-sm">
            {jacket.kind}
          </span>
        </div>

        {/* Single Catalogue Cover Image */}
        <img
          src={coverSrc}
          alt={`Catalogue cover for ${jacket.name}`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/catalogues/default-cover.jpg";
          }}
        />

        {/* Floating Catalogue Document Indicator */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/90 backdrop-blur border border-[#deded5] text-[10px] text-[#20231f] pointer-events-none shadow-sm transition-transform group-hover:translate-x-1">
          <FileText size={12} className="text-[#e85a2a]" />
          <span className="font-semibold tracking-wide">PDF Catalogue Edition</span>
        </div>

        {/* Hover Quick-Peek Overlay on Image */}
        <div className="absolute inset-0 z-15 bg-[#20231f]/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e85a2a] text-white text-xs font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye size={15} /> Open PDF Catalogue
          </span>
        </div>
      </div>

      {/* 2. Card Content & Details */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 bg-white">
        {/* Collection & Category */}
        <div className="flex items-center justify-between text-[11px] text-[#71776a] mb-1.5 font-medium">
          <span className="uppercase tracking-wider font-semibold text-[#8b9183]">
            JD {jacket.collection.replace(/-/g, " ").toUpperCase()}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[#e85a2a] font-bold">
            <ShieldCheck size={12} /> B2B Verified
          </span>
        </div>

        {/* Jacket Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#20231f] line-clamp-1 mb-1 font-['DM_Sans',sans-serif]">
          {jacket.name}
        </h3>

        {/* Colour & Style specs */}
        <p className="text-xs text-[#71776a] mb-4 flex items-center gap-2">
          <span>Colour: <strong className="text-[#20231f] font-medium">{jacket.colour}</strong></span>
          <span className="text-[#deded5]">·</span>
          <span>Fit: <strong className="text-[#20231f] font-medium">Standard / Custom</strong></span>
        </p>

        {/* Dual Actions Container: "Explore Jacket" and "View PDF Catalogue" */}
        <div className="mt-auto pt-3 border-t border-[#f0f0ea] flex flex-col sm:flex-row gap-2">
          {/* Button 1: "Explore Jacket" (opens the PDF catalogue in full view) */}
          <button
            type="button"
            onClick={() => {
              onSelectJacket?.(jacket);
              onOpenPdf(jacket);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#20231f] hover:bg-[#323630] text-white text-xs font-bold transition-all hover:scale-[1.02] shadow-sm"
            title={`Explore ${jacket.name} PDF Catalogue`}
          >
            <span>Explore Jacket</span>
            <ArrowRight size={13} className="text-[#d0d4c8] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Button 2: "View PDF Catalogue" (distinct styled button that opens same PDF in full view) */}
          <button
            type="button"
            onClick={() => {
              onSelectJacket?.(jacket);
              onOpenPdf(jacket);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02]"
            title={`View PDF Catalogue for ${jacket.name}`}
          >
            <FileText size={14} className="text-white" />
            <span>View PDF Catalogue</span>
          </button>
        </div>
      </div>
    </article>
  );
};
