import React, { useState } from "react";
import {
  jacketsData,
  ecosystemData,
  Collection,
  EcosystemDocument
} from "../data/jacketsData";
import { CollectionPDFViewer } from "./CollectionPDFViewer";

/**
 * Props for the QuickSelectNav ("Quick Select Collection Entry Points") component.
 */
export interface QuickSelectNavProps {
  /**
   * Zero-based index of the currently active collection in `jacketsData`
   * (0 = Corporate Pro ... 7 = Campus Pro, 8 = Lifestyle Pro).
   */
  selectedCollectionIndex?: number;

  /**
   * Callback invoked when one of the 9 collection buttons (Corporate Pro through
   * Campus Pro + Lifestyle Pro) is clicked.
   * Preserves homepage hero showcase selection or navigates to `/collections/:id`
   * when omitted.
   */
  onSelectCollection?: (index: number, collection: Collection) => void;

  /**
   * Optional ID of the currently open Ecosystem document so its button reflects
   * active selection while the PDF viewer modal is open.
   */
  activeEcosystemId?: string | null;

  /**
   * Callback invoked when one of the 3 JD Ecosystem buttons is clicked.
   * Opens the full-page raw PDF viewer (`CollectionPDFViewer`) configured with
   * the document's `pdfUrl` and `coverImage` from `ecosystemData`.
   * Falls back to an internal `CollectionPDFViewer` modal if omitted.
   */
  onOpenEcosystemDoc?: (doc: EcosystemDocument) => void;
}

/**
 * Explicit ordered IDs for the 9 Quick Select Collection Entry Points:
 * 1. Corporate Pro  (corporate-pro)
 * 2. Sport Pro      (sport-pro)
 * 3. Safari Pro     (safari-pro)
 * 4. Mining Pro     (mining-pro)
 * 5. Logistics Pro  (logistics-pro)
 * 6. Tactical Pro   (tactical-pro)
 * 7. Healthcare Pro (healthcare-pro)
 * 8. Campus Pro     (campus-pro)
 * 9. Lifestyle Pro  (lifestyle-pro) — immediately after Campus Pro
 */
const QUICK_SELECT_COLLECTION_IDS: readonly string[] = [
  "corporate-pro",
  "sport-pro",
  "safari-pro",
  "mining-pro",
  "logistics-pro",
  "tactical-pro",
  "healthcare-pro",
  "campus-pro",
  "lifestyle-pro"
];

/**
 * Shared Tailwind utility classes used by all 9 collection buttons (including
 * Lifestyle Pro) and the 3 JD Ecosystem buttons to guarantee unified sizing,
 * colors, typography, borders, touch targets, and hover/active transitions.
 */
const BASE_ENTRY_BUTTON_CLASSES =
  "text-xs px-3 py-1.5 rounded-lg font-semibold transition-all border cursor-pointer";

const ACTIVE_ENTRY_BUTTON_CLASSES =
  "bg-[#20231f] text-white border-[#20231f] shadow-sm scale-105";

const INACTIVE_ENTRY_BUTTON_CLASSES =
  "bg-white text-[#52574b] border-[#deded5] hover:border-[#b4b8ab] hover:bg-[#eeeee6]";

/**
 * QuickSelectNav — Quick Select Collection Entry Points Component
 *
 * Renders:
 * 1. All 9 JD Pro Collection entry buttons mapped from `jacketsData` in canonical
 *    order (`Corporate Pro` through `Campus Pro`, followed immediately by
 *    `Lifestyle Pro` mapped to `lifestyle-pro`) with identical styling, hover
 *    effects, and collection selection/routing logic.
 * 2. A subtle horizontal hairline separator and "JD Ecosystem:" subtitle directly
 *    beneath the collection buttons.
 * 3. The 3 JD Ecosystem & Process entry buttons mapped from `ecosystemData`
 *    (`JD Client Journey`, `JD Ordering System`, `JD Customization System`) wired
 *    to open each document's full-page raw PDF viewer (`pdfUrl` & `coverImage`).
 */
export const QuickSelectNav: React.FC<QuickSelectNavProps> = ({
  selectedCollectionIndex = 0,
  onSelectCollection,
  activeEcosystemId = null,
  onOpenEcosystemDoc
}) => {
  // Standalone fallback state if parent does not supply `onOpenEcosystemDoc`
  const [standaloneEcosystemDoc, setStandaloneEcosystemDoc] =
    useState<EcosystemDocument | null>(null);

  // Resolve the ordered collection entries from `jacketsData`, ensuring
  // `lifestyle-pro` ("Lifestyle Pro") appears immediately after `campus-pro` ("Campus Pro")
  const orderedCollections = QUICK_SELECT_COLLECTION_IDS.map((id) => {
    const indexInData = jacketsData.findIndex((c) => c.id === id);
    const collection = indexInData >= 0 ? jacketsData[indexInData] : undefined;
    return collection ? { collection, indexInData } : null;
  }).filter(
    (entry): entry is { collection: Collection; indexInData: number } =>
      entry !== null
  );

  /**
   * Handles clicks on any of the 9 collection buttons (including Lifestyle Pro).
   * Delegates to `onSelectCollection` when provided (updating the active hero
   * collection showcase), or navigates directly to `/collections/:id` via SPA pushState.
   */
  const handleCollectionButtonClick = (index: number, collection: Collection) => {
    if (onSelectCollection) {
      onSelectCollection(index, collection);
      return;
    }

    window.history.pushState({}, "", `/collections/${collection.id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  /**
   * Handles clicks on any of the 3 JD Ecosystem buttons ("JD Client Journey",
   * "JD Ordering System", "JD Customization System").
   * Opens the full-screen responsive PDF viewer with the item's `pdfUrl` and `coverImage`.
   */
  const handleEcosystemButtonClick = (doc: EcosystemDocument) => {
    if (onOpenEcosystemDoc) {
      onOpenEcosystemDoc(doc);
      return;
    }

    setStandaloneEcosystemDoc(doc);
  };

  const resolvedActiveEcosystemId =
    activeEcosystemId ?? standaloneEcosystemDoc?.id ?? null;

  return (
    <div className="pt-4 space-y-2">
      {/* Section 1: 9 JD Pro Collection Entry Points (Corporate Pro -> Campus Pro -> Lifestyle Pro) */}
      <span className="text-[10px] font-bold tracking-wider uppercase text-[#71776a] block">
        Quick Select Collection Entry Points:
      </span>

      {/* Responsive flex-wrap row: wraps cleanly across iOS, Android, tablets, and desktops */}
      <div className="flex flex-wrap gap-2">
        {orderedCollections.map(({ collection: col, indexInData }) => {
          const isSelected = selectedCollectionIndex === indexInData;
          return (
            <button
              key={col.id}
              type="button"
              data-collection-id={col.id}
              onClick={() => handleCollectionButtonClick(indexInData, col)}
              className={`${BASE_ENTRY_BUTTON_CLASSES} ${
                isSelected
                  ? ACTIVE_ENTRY_BUTTON_CLASSES
                  : INACTIVE_ENTRY_BUTTON_CLASSES
              }`}
            >
              {col.name.replace("JD ", "")}
            </button>
          );
        })}
      </div>

      {/* Visual Separator + Section 2: 3 JD Ecosystem Entry Points */}
      <div className="pt-2.5 mt-1 border-t border-[#e2e2d8] space-y-2">
        <span className="text-[10px] font-bold tracking-wider uppercase text-[#71776a] block">
          JD Ecosystem:
        </span>

        {/* Responsive flex-wrap row matching the exact button styling of the collection buttons */}
        <div className="flex flex-wrap gap-2">
          {ecosystemData.map((doc) => {
            const isSelected = resolvedActiveEcosystemId === doc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => handleEcosystemButtonClick(doc)}
                aria-label={`Open ${doc.name} full PDF document`}
                className={`${BASE_ENTRY_BUTTON_CLASSES} ${
                  isSelected
                    ? ACTIVE_ENTRY_BUTTON_CLASSES
                    : INACTIVE_ENTRY_BUTTON_CLASSES
                }`}
              >
                {doc.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Standalone Full-Page Raw PDF Viewer Fallback (when used without parent modal state) */}
      {standaloneEcosystemDoc && (
        <CollectionPDFViewer
          pdfUrl={standaloneEcosystemDoc.pdfUrl}
          coverImage={standaloneEcosystemDoc.coverImage}
          ecosystemDoc={standaloneEcosystemDoc}
          itemTitle={standaloneEcosystemDoc.name}
          onClose={() => setStandaloneEcosystemDoc(null)}
        />
      )}
    </div>
  );
};
