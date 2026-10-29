import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Send, Copy, Check, Mail, Phone } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { OrderDialog } from "../components/OrderDialog";
import {
  collections,
  getWhatsAppUrl,
  CALL_ONLY_DISPLAY,
  CALL_ONLY_TEL_HREF,
  CORRESPONDENCE_EMAIL,
  CORRESPONDENCE_MAILTO_HREF
} from "../data/jacketsData";

export const CustomizationBriefPage: React.FC = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState("");
  const [copied, setCopied] = useState(false);

  const [brief, setBrief] = useState({
    company: "",
    representative: "",
    contactNumber: "",
    email: "",
    industry: collections[0]?.id || "corporate-pro",
    primaryStyle: "Executive Softshell Classic",
    estimatedQuantity: "31 - 75 units",
    colours: "Black & Corporate Accent",
    brandingTypes: ["Left Chest Embroidery", "Back Shoulder Big Logo"],
    budgetRange: "Corporate Standard",
    timeline: "Within 3-4 weeks",
    specialRequirements: ""
  });

  const toggleBranding = (b: string) => {
    setBrief((prev) => ({
      ...prev,
      brandingTypes: prev.brandingTypes.includes(b)
        ? prev.brandingTypes.filter((x) => x !== b)
        : [...prev.brandingTypes, b]
    }));
  };

  const handleGenerateBrief = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCol = collections.find((c) => c.id === brief.industry);
    const text = [
      `*DETAILED CORPORATE JACKET PROJECT BRIEF*`,
      `---------------------------------------`,
      `*Company:* ${brief.company || "Corporate Client"}`,
      `*Representative:* ${brief.representative || "Client Representative"}`,
      `*WhatsApp / Phone:* ${brief.contactNumber}`,
      `*Email:* ${brief.email || "Provided"}`,
      `*Collection / Sector:* ${selectedCol ? selectedCol.name : brief.industry}`,
      `*Primary Style:* ${brief.primaryStyle}`,
      `*Estimated Volume:* ${brief.estimatedQuantity}`,
      `*Colours & Aesthetics:* ${brief.colours}`,
      `*Branding Placements:* ${brief.brandingTypes.join(", ")}`,
      `*Target Timeline:* ${brief.timeline}`,
      brief.specialRequirements ? `*Special Technical Requirements:* ${brief.specialRequirements}` : "",
      `---------------------------------------`,
      `Please provide an official B2B quotation, digital mockup proposal, and sample sizing timeline.`
    ].filter(Boolean).join("\n");

    setGeneratedBrief(text);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(generatedBrief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f0] text-[#252823] flex flex-col font-['DM_Sans',sans-serif]">
      <Header onOpenOrder={() => setOrderOpen(true)} />

      <main className="flex-1 py-14 px-4 sm:px-8 max-w-4xl mx-auto space-y-10 bg-[#f6f5f0]">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#71776a] hover:text-[#e85a2a] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to home</span>
        </a>

        {/* Heading */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase">
            <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
            DETAILED PROJECT SPECIFICATION
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
            Customization Brief.
          </h1>
          <p className="text-sm text-[#5f6558] leading-relaxed max-w-xl">
            Have a custom outerwear project with specific requirements? Complete this comprehensive brief to receive an expedited quotation and custom mockups.
          </p>
        </div>

        {/* Brief Form or Generated WhatsApp Preview */}
        {generatedBrief ? (
          <div className="space-y-4 bg-white p-6 sm:p-10 rounded-2xl border border-[#deded5] shadow-sm">
            <div className="p-4 bg-[#ebf7ee] border border-[#b2e5be] rounded-xl text-[#1b803e]">
              <h3 className="text-base font-bold">Your Customization Brief is Ready!</h3>
              <p className="text-xs text-[#2c7244] mt-0.5">
                Tap &ldquo;Send on WhatsApp&rdquo; below to open WhatsApp with your structured brief pre-filled.
              </p>
            </div>
            <pre className="p-4 bg-[#f6f5f0] border border-[#deded5] rounded-xl text-xs font-mono text-[#252823] whitespace-pre-wrap">
              {generatedBrief}
            </pre>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl(generatedBrief)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25d366] hover:bg-[#20be5b] text-white text-xs font-bold uppercase tracking-wider shadow transition-all"
              >
                <span>Send on WhatsApp</span>
                <ArrowRight size={15} />
              </a>
              <a
                href={`${CORRESPONDENCE_MAILTO_HREF}?subject=${encodeURIComponent(
                  `Project Brief — ${brief.company || "Custom Apparel"}`
                )}&body=${encodeURIComponent(generatedBrief)}`}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#fafaf7] text-[#20231f] text-xs font-bold border border-[#deded5] transition-all shadow-sm"
              >
                <Mail size={15} className="text-[#e85a2a]" />
                <span>Email ({CORRESPONDENCE_EMAIL})</span>
              </a>
              <a
                href={CALL_ONLY_TEL_HREF}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white hover:bg-[#fafaf7] text-[#20231f] text-xs font-bold border border-[#deded5] transition-all shadow-sm"
              >
                <Phone size={14} className="text-[#e85a2a]" />
                <span>Call {CALL_ONLY_DISPLAY}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyBrief}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#f6f5f0] hover:bg-[#eeeee6] text-[#20231f] text-xs font-bold border border-[#deded5] transition-colors"
              >
                {copied ? <Check size={15} className="text-[#1b803e]" /> : <Copy size={15} />}
                <span>{copied ? "Copied!" : "Copy Brief"}</span>
              </button>
              <button
                type="button"
                onClick={() => setGeneratedBrief("")}
                className="ml-auto text-xs text-[#71776a] hover:text-[#e85a2a] underline font-semibold"
              >
                Edit Brief
              </button>
            </div>
          </div>
        ) : (
        <form onSubmit={handleGenerateBrief} className="space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-[#deded5] shadow-sm">
          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f] border-b border-[#deded5] pb-2 text-[#e85a2a]">
              01. Corporate Background
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#42473c] mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanbic Bank Botswana"
                  value={brief.company}
                  onChange={(e) => setBrief({ ...brief, company: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#42473c] mb-1">Contact Person *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kegomoditswe Kgosi"
                  value={brief.representative}
                  onChange={(e) => setBrief({ ...brief, representative: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#42473c] mb-1">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+267 7x xxx xxx"
                  value={brief.contactNumber}
                  onChange={(e) => setBrief({ ...brief, contactNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#42473c] mb-1">Corporate Email</label>
                <input
                  type="email"
                  placeholder="contact@company.co.bw"
                  value={brief.email}
                  onChange={(e) => setBrief({ ...brief, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f] border-b border-[#deded5] pb-2 text-[#e85a2a]">
              02. Jacket Requirements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#42473c] mb-1">Industry Sector</label>
                <select
                  value={brief.industry}
                  onChange={(e) => setBrief({ ...brief, industry: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                >
                  {collections.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.name} ({col.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#42473c] mb-1">Primary Jacket Style</label>
                <input
                  type="text"
                  value={brief.primaryStyle}
                  onChange={(e) => setBrief({ ...brief, primaryStyle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#42473c] mb-1">Estimated Quantity</label>
                <select
                  value={brief.estimatedQuantity}
                  onChange={(e) => setBrief({ ...brief, estimatedQuantity: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                >
                  <option value="15 - 30 units">15 - 30 units (Department)</option>
                  <option value="31 - 75 units">31 - 75 units (Mid-size Team)</option>
                  <option value="76 - 150 units">76 - 150 units (Branch / Fleet)</option>
                  <option value="150+ units">150+ units (Enterprise / Nationwide)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#42473c] mb-1">Colours &amp; Palette</label>
                <input
                  type="text"
                  value={brief.colours}
                  onChange={(e) => setBrief({ ...brief, colours: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
                />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f] border-b border-[#deded5] pb-2 text-[#e85a2a]">
              03. Branding &amp; Placements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Left Chest Embroidery",
                "Right Chest Name Tag / Department",
                "Right Sleeve Flag / Emblem",
                "Back Shoulder Big Logo",
                "Custom Silicone Zipper Pullers",
                "Custom Woven Neck Hanger & Size Label",
                "Sublimated Interior Lining",
                "Reflective 3M Safety Trim"
              ].map((opt) => (
                <label key={opt} className="flex items-center gap-2.5 p-2.5 rounded bg-[#f6f5f0] border border-[#deded5] cursor-pointer hover:bg-[#eeeee6] text-xs text-[#20231f]">
                  <input
                    type="checkbox"
                    checked={brief.brandingTypes.includes(opt)}
                    onChange={() => toggleBranding(opt)}
                    className="accent-[#e85a2a]"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#42473c] mb-1">
                Additional Technical or Functional Requirements
              </label>
              <textarea
                rows={3}
                placeholder="e.g., Water column rating, internal storm cuffs with thumbholes, security radio loop."
                value={brief.specialRequirements}
                onChange={(e) => setBrief({ ...brief, specialRequirements: e.target.value })}
                className="w-full px-3 py-2 bg-[#f6f5f0] border border-[#deded5] rounded-lg text-sm text-[#20231f] focus:outline-none focus:border-[#e85a2a]"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#deded5]">
            <p className="text-xs text-[#71776a]">
              Submitting sends your organized project brief directly to our quoting desk on WhatsApp.
            </p>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-102 shrink-0"
            >
              <span>Submit Brief on WhatsApp</span>
              <Send size={15} />
            </button>
          </div>
        </form>
        )}
      </main>

      <Footer />

      {orderOpen && (
        <OrderDialog
          collection={collections[0]}
          onClose={() => setOrderOpen(false)}
        />
      )}
    </div>
  );
};
