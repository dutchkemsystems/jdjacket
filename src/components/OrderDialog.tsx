import React, { useState, useRef, useEffect, useMemo } from "react";
import { X, Send, Copy, Check, Upload, ArrowRight, Phone, Mail } from "lucide-react";
import {
  CollectionItem,
  JacketItem,
  Product,
  collections,
  jacketsData,
  normalizeCollectionId,
  sizesList,
  getWhatsAppUrl,
  CALL_ONLY_DISPLAY,
  CALL_ONLY_TEL_HREF,
  CORRESPONDENCE_EMAIL,
  CORRESPONDENCE_MAILTO_HREF
} from "../data/jacketsData";

interface OrderDialogProps {
  collection?: CollectionItem | JacketItem | null;
  productName?: string;
  onClose: () => void;
}

/**
 * OrderDialog Product Configurator Component
 *
 * Preserves full size, color, customization, logo attachment, and WhatsApp order generation
 * while dynamically binding to the newly extracted 2026/27 collections and products.
 * Switching collections cleanly resets previous product/color/size/customization state
 * and loads the newly selected collection's models.
 */
export const OrderDialog: React.FC<OrderDialogProps> = ({
  collection,
  productName,
  onClose
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const resolveInitialColId = (): string => {
    if (!collection) return collections[0].id;
    if ("collection" in collection) return normalizeCollectionId(collection.collection);
    return normalizeCollectionId(collection.id);
  };

  const [selectedCollectionId, setSelectedCollectionId] = useState<string>(resolveInitialColId);
  const activeCollection = useMemo(() => {
    return (
      jacketsData.find((c) => c.id === normalizeCollectionId(selectedCollectionId)) ||
      jacketsData[0]
    );
  }, [selectedCollectionId]);

  const resolveInitialSku = (colId: string, targetName?: string): string => {
    const col = jacketsData.find((c) => c.id === normalizeCollectionId(colId)) || jacketsData[0];
    if (targetName) {
      const matched = col.products.find(
        (p) =>
          p.name.toLowerCase() === targetName.toLowerCase() ||
          p.sku.toLowerCase() === targetName.toLowerCase()
      );
      if (matched) return matched.sku;
    }
    if (collection && !("products" in collection) && "sku" in collection && collection.sku) {
      const matchedBySku = col.products.find(
        (p) => p.sku.toLowerCase() === collection.sku.toLowerCase()
      );
      if (matchedBySku) return matchedBySku.sku;
    }
    return col.products[0]?.sku || "";
  };

  const [selectedSku, setSelectedSku] = useState<string>(() =>
    resolveInitialSku(resolveInitialColId(), productName)
  );

  const activeProduct = useMemo<Product | undefined>(() => {
    return (
      activeCollection.products.find((p) => p.sku === selectedSku) ||
      activeCollection.products[0]
    );
  }, [activeCollection, selectedSku]);

  const [selectedColor, setSelectedColor] = useState<string>(
    () => activeProduct?.colors[0] || "Black"
  );
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>(() =>
    activeProduct?.customization?.slice(0, 2) || ["Embroidery"]
  );
  const getDefaultQuantitiesForProduct = (prod?: Product): Record<string, number> => {
    if (prod?.sizes?.length === 1 && prod.sizes[0] === "One Size") {
      return { "One Size": 20 };
    }
    return { M: 10, L: 15, XL: 10 };
  };

  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    getDefaultQuantitiesForProduct(activeProduct)
  );
  const [copied, setCopied] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    business: "",
    contact: "",
    phone: "",
    email: "",
    design: "Plain with branding",
    brandingText: "",
    delivery: "Gaborone, Botswana",
    date: "",
    instructions: ""
  });

  // Synchronize and reset configurator state whenever incoming collection or productName prop changes
  useEffect(() => {
    const nextColId = resolveInitialColId();
    const nextSku = resolveInitialSku(nextColId, productName);
    const colObj =
      jacketsData.find((c) => c.id === normalizeCollectionId(nextColId)) || jacketsData[0];
    const prodObj =
      colObj.products.find((p) => p.sku === nextSku) || colObj.products[0];

    setSelectedCollectionId(colObj.id);
    setSelectedSku(prodObj?.sku || "");
    setSelectedColor(prodObj?.colors[0] || "Black");
    setSelectedCustomizations(prodObj?.customization?.slice(0, 2) || ["Embroidery"]);
    setQuantities(getDefaultQuantitiesForProduct(prodObj));
    setRequestText("");
  }, [collection, productName]);

  // Handler when switching collections inside the modal: clears previous product state & loads new products
  const handleCollectionChange = (newColId: string) => {
    const normId = normalizeCollectionId(newColId);
    const nextCol = jacketsData.find((c) => c.id === normId) || jacketsData[0];
    const firstProd = nextCol.products[0];

    setSelectedCollectionId(nextCol.id);
    setSelectedSku(firstProd?.sku || "");
    setSelectedColor(firstProd?.colors[0] || "Black");
    setSelectedCustomizations(firstProd?.customization?.slice(0, 2) || ["Embroidery"]);
    setQuantities(getDefaultQuantitiesForProduct(firstProd));
    setRequestText("");
  };

  // Handler when switching products within the selected collection
  const handleProductChange = (newSku: string) => {
    const nextProd = activeCollection.products.find((p) => p.sku === newSku);
    setSelectedSku(newSku);
    if (nextProd) {
      setSelectedColor(nextProd.colors[0] || "Black");
      setSelectedCustomizations(nextProd.customization.slice(0, 2));
      setQuantities(getDefaultQuantitiesForProduct(nextProd));
    }
  };

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const availableSizes = activeProduct?.sizes?.length ? activeProduct.sizes : sizesList;
  const availableColors = activeProduct?.colors?.length ? activeProduct.colors : ["Black", "Navy"];
  const availableCustomizations = useMemo(() => {
    const base = activeProduct?.customization || [];
    const placements = [
      "Left Chest Logo",
      "Right Sleeve Badge",
      "Back Yoke Branding"
    ];
    return Array.from(new Set([...base, ...placements]));
  }, [activeProduct]);

  const totalQuantity = Object.entries(quantities)
    .filter(([s]) => availableSizes.includes(s))
    .reduce((acc, [, q]) => acc + (Number(q) || 0), 0);

  const handleSizeChange = (size: string, val: string) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setQuantities((prev) => ({ ...prev, [size]: num }));
  };

  const handleCustomizationToggle = (opt: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const buildOrderMessage = (): string => {
    const sizesSummary = availableSizes
      .filter((s) => (quantities[s] || 0) > 0)
      .map((s) => `${s}: ${quantities[s]}`)
      .join(", ");

    const styleLine = activeProduct
      ? `${activeProduct.sku} — ${activeProduct.name}${
          activeProduct.length ? ` (${activeProduct.length})` : ""
        }`
      : activeCollection.name;

    const lines = [
      `*NEW 2026/27 CUSTOM JACKET ORDER INQUIRY*`,
      `---------------------------------`,
      `*Company / Organization:* ${formData.business || "Corporate Client"}`,
      `*Contact Person:* ${formData.contact || "Business Representative"}`,
      `*Phone / WhatsApp:* ${formData.phone || "Provided"}`,
      `*Email:* ${formData.email || "N/A"}`,
      `*Collection:* ${activeCollection.name}`,
      `*Model & SKU:* ${styleLine}`,
      `*Selected Colour:* ${selectedColor}`,
      `*Design Expression:* ${formData.design}`,
      `*Total Quantity:* ${totalQuantity} units`,
      `*Sizes Breakdown:* ${sizesSummary || "To be confirmed"}`,
      `*Customization & Branding:* ${
        selectedCustomizations.length ? selectedCustomizations.join(", ") : "Please advise"
      }`,
      formData.brandingText ? `*Branding Text / Names:* ${formData.brandingText}` : "",
      uploadedFiles.length
        ? `*Artwork Files:* ${uploadedFiles
            .map((f) => f.name)
            .join(", ")} (Attaching directly in WhatsApp)`
        : `*Artwork:* Logo files to be shared in chat`,
      `*Delivery Location:* ${formData.delivery}`,
      formData.date ? `*Target Delivery Date:* ${formData.date}` : "",
      formData.instructions ? `*Special Notes:* ${formData.instructions}` : "",
      `---------------------------------`,
      `Please provide an official quotation, production lead time, and digital artwork proof.`
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMessage = buildOrderMessage();
    setRequestText(fullMessage);
    dialogRef.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(requestText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="order-dialog fixed inset-0 z-[9990] w-full max-w-3xl max-h-[92dvh] overflow-y-auto bg-[#f6f5f0] text-[#20231f] border border-[#deded5] rounded-2xl shadow-2xl p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm m-auto"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Sticky Header */}
      <div className="dialog-head sticky top-0 z-30 flex items-center justify-between px-5 sm:px-6 py-4 bg-[#f6f5f0] border-b border-[#deded5]">
        <div>
          <span className="eyebrow text-[#e85a2a] text-[9px] font-bold tracking-widest uppercase">
            2026/27 PRODUCT CONFIGURATOR
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-['Barlow_Condensed',sans-serif] tracking-normal text-[#20231f]">
            Configure &amp; Order — {activeCollection.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-[#71776a] hover:text-[#20231f] rounded-lg hover:bg-[#eeeee6] transition-colors"
          aria-label="Close order configurator"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-5 sm:p-6">
        {requestText ? (
          <div className="request-preview space-y-4">
            <div className="flex items-center gap-3 p-4 bg-[#ebf7ee] border border-[#b2e5be] rounded-xl text-[#1b803e]">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25d366] text-white font-bold shrink-0">
                ✓
              </span>
              <div>
                <h3 className="text-base font-bold text-[#1b803e]">
                  Your configured order summary is ready!
                </h3>
                <p className="text-xs text-[#2c7244]">
                  Tap &ldquo;Send on WhatsApp&rdquo; below to launch WhatsApp with your exact SKU, colour, sizing and customization breakdown.
                </p>
              </div>
            </div>

            <pre className="p-4 bg-white border border-[#deded5] rounded-xl text-xs font-mono text-[#252823] whitespace-pre-wrap max-h-64 overflow-y-auto shadow-inner">
              {requestText}
            </pre>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl(requestText)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25d366] hover:bg-[#20be5b] text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Send on WhatsApp</span>
                <ArrowRight size={16} />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-[#fafaf7] text-[#20231f] text-xs font-bold border border-[#deded5] transition-all shadow-sm"
              >
                {copied ? <Check size={16} className="text-[#1b803e]" /> : <Copy size={16} />}
                <span>{copied ? "Copied!" : "Copy Summary"}</span>
              </button>

              <a
                href={`${CORRESPONDENCE_MAILTO_HREF}?subject=${encodeURIComponent(
                  `Order Inquiry — ${activeCollection.name}`
                )}&body=${encodeURIComponent(requestText)}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-[#fafaf7] text-[#20231f] text-xs font-bold border border-[#deded5] transition-all shadow-sm"
              >
                <Mail size={15} className="text-[#e85a2a]" />
                <span>Send via Email</span>
              </a>

              <a
                href={CALL_ONLY_TEL_HREF}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#fafaf7] text-[#20231f] text-xs font-bold border border-[#deded5] transition-all shadow-sm"
              >
                <Phone size={14} className="text-[#e85a2a]" />
                <span>{CALL_ONLY_DISPLAY}</span>
              </a>

              <button
                type="button"
                onClick={() => setRequestText("")}
                className="ml-auto text-xs text-[#71776a] hover:text-[#e85a2a] underline font-medium"
              >
                Edit configuration
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 01: Collection, Model & Colour Selection */}
            <fieldset className="border border-[#deded5] rounded-xl p-4 sm:p-5 bg-white shadow-sm space-y-4">
              <legend className="px-2 text-xs font-bold tracking-widest text-[#e85a2a] uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e85a2a]/15 text-[#e85a2a] flex items-center justify-center text-[10px] font-bold">
                  01
                </span>
                Collection, Model &amp; Colour
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Select Collection
                  </label>
                  <select
                    value={selectedCollectionId}
                    onChange={(e) => handleCollectionChange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm font-medium text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  >
                    {jacketsData.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name} ({col.products.length} Models)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Select Jacket Model (SKU)
                  </label>
                  <select
                    value={selectedSku}
                    onChange={(e) => handleProductChange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm font-medium text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  >
                    {activeCollection.products.map((prod) => (
                      <option key={prod.sku} value={prod.sku}>
                        {prod.sku} — {prod.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Colour Picker from Extracted Product Data */}
              <div>
                <label className="block text-xs font-semibold text-[#42473c] mb-1.5">
                  Available Colours for {activeProduct?.sku || activeCollection.name}:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((colName) => {
                    const isActive = selectedColor === colName;
                    return (
                      <button
                        key={colName}
                        type="button"
                        onClick={() => setSelectedColor(colName)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isActive
                            ? "bg-[#20231f] text-white border-[#20231f] shadow-sm"
                            : "bg-[#f6f5f0] text-[#42473c] border-[#deded5] hover:border-[#e85a2a]"
                        }`}
                      >
                        {colName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Custom / Multi-Colour Note
                  </label>
                  <input
                    type="text"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Design Expression
                  </label>
                  <select
                    value={formData.design}
                    onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  >
                    <option value="Plain with branding">1. Plain — Clean &amp; Classic</option>
                    <option value="Trimmed with accent colours">2. Trimmed — Contrast Panels</option>
                    <option value="Signature Sublimation">3. Signature Sublimation</option>
                    <option value="Please advise">Please advise / Mixed</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* 02: Sizes & Quantities (Dynamic per Product) */}
            <fieldset className="border border-[#deded5] rounded-xl p-4 sm:p-5 bg-white shadow-sm">
              <legend className="px-2 text-xs font-bold tracking-widest text-[#e85a2a] uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e85a2a]/15 text-[#e85a2a] flex items-center justify-center text-[10px] font-bold">
                  02
                </span>
                Sizes &amp; Quantity (
                {availableSizes.length === 1
                  ? availableSizes[0]
                  : `${availableSizes[0]}–${availableSizes[availableSizes.length - 1]}`}
                )
              </legend>
              <p className="text-[11px] text-[#71776a] mb-3">
                Enter quantity per size for {activeProduct?.name || activeCollection.name}:
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {availableSizes.map((size) => (
                  <div key={size} className="text-center">
                    <label className="block text-[11px] font-semibold text-[#42473c] mb-1">
                      {size}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={quantities[size] || ""}
                      placeholder="0"
                      onChange={(e) => handleSizeChange(size, e.target.value)}
                      className="w-full text-center px-1 py-1.5 bg-[#f6f5f0] border border-[#deded5] rounded text-sm font-mono text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 p-3 bg-[#f6f5f0] rounded-lg border border-[#deded5]">
                <span className="text-xs text-[#52574b] font-medium">Total Jackets Configured:</span>
                <span className="text-base font-bold font-mono text-[#e85a2a]">
                  {totalQuantity} units
                </span>
              </div>
            </fieldset>

            {/* 03: Customization & Branding */}
            <fieldset className="border border-[#deded5] rounded-xl p-4 sm:p-5 bg-white shadow-sm">
              <legend className="px-2 text-xs font-bold tracking-widest text-[#e85a2a] uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e85a2a]/15 text-[#e85a2a] flex items-center justify-center text-[10px] font-bold">
                  03
                </span>
                Customization &amp; Branding Options
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {availableCustomizations.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2.5 p-2 rounded bg-[#f6f5f0] border border-[#deded5] cursor-pointer hover:bg-[#eeeee6] text-xs text-[#20231f]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCustomizations.includes(item)}
                      onChange={() => handleCustomizationToggle(item)}
                      className="rounded accent-[#e85a2a]"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#42473c] mb-1">
                  Branding Text, Department Names or Slogans (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Individual staff names on right chest or back role title"
                  value={formData.brandingText}
                  onChange={(e) => setFormData({ ...formData, brandingText: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                />
              </div>

              <div className="mt-4 p-3 bg-[#f6f5f0] border border-[#deded5] rounded-lg">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#42473c] mb-1">
                  <Upload size={14} className="text-[#e85a2a]" />
                  <span>Attach Logo / Reference Files</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.svg,.pdf"
                  onChange={handleFileChange}
                  className="text-xs text-[#71776a] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#e85a2a]/15 file:text-[#e85a2a] hover:file:bg-[#e85a2a]/25 cursor-pointer"
                />
              </div>
            </fieldset>

            {/* 04: Organization & Delivery */}
            <fieldset className="border border-[#deded5] rounded-xl p-4 sm:p-5 bg-white shadow-sm">
              <legend className="px-2 text-xs font-bold tracking-widest text-[#e85a2a] uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e85a2a]/15 text-[#e85a2a] flex items-center justify-center text-[10px] font-bold">
                  04
                </span>
                Organization &amp; Delivery Details
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Debswana / Apex Logistics"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thabo Moloi"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+267 7x xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="thabo@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Delivery City &amp; Country
                  </label>
                  <input
                    type="text"
                    value={formData.delivery}
                    onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#42473c] mb-1">
                    Target Delivery Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-semibold text-[#42473c] mb-1">
                  Additional Fitting or Branding Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Requesting physical sizing sample kit before bulk manufacturing."
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                />
              </div>
            </fieldset>

            {/* Submit & Direct WhatsApp */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#deded5]">
              <a
                href={getWhatsAppUrl(buildOrderMessage())}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25d366] hover:bg-[#20be5b] text-white font-bold text-xs uppercase tracking-wider shadow transition-all"
              >
                <span>Order Directly on WhatsApp</span>
                <ArrowRight size={15} />
              </a>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white font-bold text-xs uppercase tracking-wider transition-all shadow shrink-0"
              >
                <span>Review &amp; Copy Inquiry</span>
                <Send size={15} />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-[#71776a]">
              <a href={CALL_ONLY_TEL_HREF} className="hover:text-[#e85a2a] inline-flex items-center gap-1.5 font-medium">
                <Phone size={12} className="text-[#e85a2a]" />
                <span>Call Only: {CALL_ONLY_DISPLAY}</span>
              </a>
              <a href={CORRESPONDENCE_MAILTO_HREF} className="hover:text-[#e85a2a] inline-flex items-center gap-1.5 font-medium">
                <Mail size={12} className="text-[#e85a2a]" />
                <span>{CORRESPONDENCE_EMAIL}</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};
