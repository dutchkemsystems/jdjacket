import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, FileCheck, Headphones, Truck, PackageCheck, Phone, Mail } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { OrderDialog } from "../components/OrderDialog";
import {
  collections,
  WHATSAPP_DISPLAY,
  CALL_ONLY_DISPLAY,
  CALL_ONLY_TEL_HREF,
  CORRESPONDENCE_EMAIL,
  CORRESPONDENCE_MAILTO_HREF
} from "../data/jacketsData";

export const ClientJourneyPage: React.FC = () => {
  const [orderOpen, setOrderOpen] = useState(false);

  const steps = [
    {
      num: "01",
      icon: <Headphones size={24} className="text-[#e85a2a]" />,
      title: "Initial Consultation & Inquiry",
      desc: `Reach out via our website order tool, direct WhatsApp hotline (${WHATSAPP_DISPLAY}), Call Only line (${CALL_ONLY_DISPLAY}), or correspondence email (${CORRESPONDENCE_EMAIL}). Share your preferred styles, company colours, approximate quantities, and delivery timeframe.`
    },
    {
      num: "02",
      icon: <FileCheck size={24} className="text-[#e85a2a]" />,
      title: "Quotation & 3D Artwork Mockups",
      desc: "Within 24 hours, our design studio prepares an official quotation and digital visual proofs displaying your logo placement (front chest, sleeve, back) with Pantone thread matching."
    },
    {
      num: "03",
      icon: <ShieldCheck size={24} className="text-[#e85a2a]" />,
      title: "Sample Fitting & Formal Sign-Off",
      desc: "For corporate rollouts, we provide sample jackets so your procurement committee can test sizing, zipper strength, and fabric drape before full production commences."
    },
    {
      num: "04",
      icon: <PackageCheck size={24} className="text-[#e85a2a]" />,
      title: "Precision Manufacturing & QC",
      desc: "Our production line completes embroidery, cutting, assembly, and multi-point quality control inspections. Every single jacket is individually bagged and size-tagged."
    },
    {
      num: "05",
      icon: <Truck size={24} className="text-[#e85a2a]" />,
      title: "Dispatched & Delivered",
      desc: "Secure delivery to your corporate headquarters or worksite. Tracking information is communicated directly to your project lead."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f5f0] text-[#252823] flex flex-col font-['DM_Sans',sans-serif]">
      <Header onOpenOrder={() => setOrderOpen(true)} />

      <main className="flex-1 py-14 px-4 sm:px-8 max-w-5xl mx-auto space-y-12 bg-[#f6f5f0]">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#71776a] hover:text-[#e85a2a] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to home</span>
        </a>

        {/* Heading */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase">
            <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
            THE PROCUREMENT JOURNEY
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
            From First Brief To<br />
            <span className="text-[#85867f]">Flawless Delivery.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5f6558] leading-relaxed max-w-2xl">
            We understand the challenges of outfitting large corporate teams. Our clear approval milestones guarantee transparency, fit accuracy, and punctual delivery.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="space-y-6 pt-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-[#deded5] shadow-sm hover:border-[#b4b8ab] transition-colors"
            >
              <div className="flex items-center gap-4 sm:flex-col sm:items-center shrink-0">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#e85a2a]">
                  {st.num}
                </span>
                <div className="p-3 rounded-xl bg-[#f6f5f0] border border-[#deded5]">
                  {st.icon}
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold text-[#20231f] font-['Barlow_Condensed',sans-serif] tracking-wide">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#71776a] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#eeeee7] border border-[#deded5] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-2xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
              Ready to begin Step 01?
            </h3>
            <p className="text-xs text-[#71776a]">
              Start your order inquiry now and receive a custom quote within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 shrink-0">
            <a
              href={CALL_ONLY_TEL_HREF}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white hover:bg-[#fafaf7] text-[#20231f] text-xs font-bold border border-[#deded5] transition-colors shadow-sm"
            >
              <Phone size={14} className="text-[#e85a2a]" />
              <span>Call {CALL_ONLY_DISPLAY}</span>
            </a>
            <a
              href={CORRESPONDENCE_MAILTO_HREF}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white hover:bg-[#fafaf7] text-[#20231f] text-xs font-bold border border-[#deded5] transition-colors shadow-sm"
            >
              <Mail size={14} className="text-[#e85a2a]" />
              <span>Email</span>
            </a>
            <button
              type="button"
              onClick={() => setOrderOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-102"
            >
              <span>Order Custom Jackets</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
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
