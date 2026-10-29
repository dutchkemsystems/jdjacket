import React from "react";
import {
  JacketItem,
  CollectionItem,
  findCollection,
  getProductSlideIndex
} from "../data/jacketsData";
import { CollectionPDFViewer } from "./CollectionPDFViewer";

interface PdfCatalogueModalProps {
  jacket: JacketItem | CollectionItem | null;
  onClose: () => void;
  onOpenOrder?: () => void;
}

export const PdfCatalogueModal: React.FC<PdfCatalogueModalProps> = ({
  jacket,
  onClose,
  onOpenOrder
}) => {
  if (!jacket) return null;

  const isCollectionItem = "products" in jacket;
  const colId = isCollectionItem ? jacket.id : jacket.collection;
  const matchedCollection = findCollection(colId);

  const startSlideIdx = isCollectionItem
    ? 0
    : getProductSlideIndex(matchedCollection.id, jacket);

  return (
    <CollectionPDFViewer
      pdfUrl={matchedCollection.pdfUrl}
      collection={matchedCollection}
      itemTitle={jacket.name}
      highlightTitle={isCollectionItem ? undefined : jacket.name}
      initialSlideIndex={startSlideIdx}
      onClose={onClose}
      onOpenOrder={() => {
        if (onOpenOrder) onOpenOrder();
      }}
    />
  );
};
