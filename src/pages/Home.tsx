import React, { useState } from "react";
import { ArrowRight, MessageSquare, Phone, Mail, FileText, CheckCircle2, Shield, Truck, ChevronDown } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { OrderDialog } from "../components/OrderDialog";
import { CollectionPDFViewer } from "../components/CollectionPDFViewer";
import { CollectionGrid } from "../components/CollectionGrid";
import { QuickSelectNav } from "../components/QuickSelectNav";
import {
  collections,
  jackets,
  CollectionItem,
  JacketItem,
  EcosystemDocument,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  CALL_ONLY_DISPLAY,
  CALL_ONLY_TEL_HREF,
  CORRESPONDENCE_EMAIL,
  CORRESPONDENCE_MAILTO_HREF,
  getProductSlideIndex,
  findCollection
} from "../data/jacketsData";

export const HomePage: React.FC = () => {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number>(0);
  const [modalJacket, setModalJacket] = useState<CollectionItem | JacketItem | null>(null);
  const [modalEcosystemDoc, setModalEcosystemDoc] = useState<EcosystemDocument | null>(null);
  const [orderCollection, setOrderCollection] = useState<CollectionItem | null>(null);
  const [orderProductName, setOrderProductName] = useState<string | undefined>(undefined);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeHeroCol = collections[selectedHeroIndex] || collections[0];

  const faqs = [
    {
      q: "What is the minimum order quantity (MOQ)?",
      a: "Minimum quantities typically start from 15 to 20 units depending on the specific jacket style and customization level. You can combine different sizes (XS to XXXL) to meet the minimum. Contact our team on WhatsApp for volume tier discounts."
    },
    {
      q: "Can we upload our own company logo and custom colours?",
      a: "Yes, absolutely! We support Japanese tatami high-density embroidery, custom embossed rubber patches, reflective safety transfers, and full-body sublimation. Provide your logo in PNG, PDF, or vector format, and we provide digital proofs before manufacturing."
    },
    {
      q: "What jacket and apparel styles are available in the JD Pro collections?",
      a: "Our nine JD Pro collections include executive puffers, 3-layer bonded softshells, weatherproof parkas, heavyweight fleeces, athletic windbreakers, high-vis mining safety jackets, insulated bodywarmers, and smart-casual lifestyle apparel & club kits."
    },
    {
      q: "How does the sizing process work across large teams?",
      a: "We offer full standard unisex and tailored women's sizing from XS to XXXL. For larger corporate orders, we can supply physical sample sizing sets so your team can verify their exact fit prior to bulk production."
    },
    {
      q: "How long does production and delivery take?",
      a: "Standard production generally takes 10 to 18 business days after artwork approval and sizing sign-off. We provide courier delivery across Gaborone, nationwide Botswana, and regional southern African territories."
    },
    {
      q: "How do I place an order or get a quote?",
      a: "Simply click 'Order Custom Jackets' on this website to generate your structured WhatsApp order inquiry, or click 'View PDF Catalogue' on any jacket card to review technical specifications first."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f5f0] text-[#252823] flex flex-col font-['DM_Sans',sans-serif]">
      <Header onOpenOrder={() => setOrderCollection(activeHeroCol)} />

      <main className="flex-1 bg-[#f6f5f0]">
        {/* 1. Hero Section with Interactive Collection Showcase */}
        <section className="relative py-12 sm:py-20 px-4 sm:px-8 border-b border-[#deded5] bg-[#f6f5f0]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase">
                <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
                CUSTOM BRANDED OUTERWEAR FOR BUSINESSES &amp; ORGANIZATIONS
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-['Barlow_Condensed',sans-serif] tracking-tight leading-[0.95] text-[#20231f]">
                OUTFIT YOUR TEAM.<br />
                <span className="text-[#e85a2a]">STAND OUT EVERYWHERE.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#5f6558] max-w-xl leading-relaxed">
                Custom corporate jackets, executive puffers and heavy-duty industrial workwear.
                Engineered for weather protection, tailored comfort, and lasting corporate identity.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setOrderCollection(activeHeroCol)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-102"
                >
                  <span>ORDER CUSTOM JACKETS</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href="/gallery"
                  className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-[#20231f] hover:bg-[#343831] text-white text-xs font-bold transition-all hover:scale-102 shadow-sm"
                >
                  <FileText size={15} className="text-[#e85a2a]" />
                  <span>Explore PDF Gallery</span>
                </a>

                <a
                  href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-3.5 rounded-lg bg-white hover:bg-[#fafaf7] text-[#1b803e] text-xs font-bold border border-[#b2dbbe] transition-colors shadow-sm"
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Hero Collection Selector Tabs & JD Ecosystem Quick Select Entry Points */}
              <QuickSelectNav
                selectedCollectionIndex={selectedHeroIndex}
                onSelectCollection={(idx) => setSelectedHeroIndex(idx)}
                activeEcosystemId={modalEcosystemDoc?.id || null}
                onOpenEcosystemDoc={(doc) => setModalEcosystemDoc(doc)}
              />

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#71776a] border-t border-[#e2e2d8]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#1b803e]" />
                  <span>Fast Turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={15} className="text-[#e85a2a]" />
                  <span>Premium Embroidery &amp; Prints</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={15} className="text-[#e85a2a]" />
                  <span>Nationwide &amp; Regional Delivery</span>
                </div>
              </div>
            </div>

            {/* Hero Right Featured Catalogue Stage: Dynamic for Active Collection */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl border border-[#3b4037] shadow-xl overflow-hidden group bg-[radial-gradient(at_50%_42%,#3b4037_0%,#252a24_55%,#1d211d_100%)]">
                <div className="flex items-center justify-between text-xs text-[#d0d4c8] mb-4">
                  <span className="font-bold text-[#e85a2a] uppercase tracking-wider text-[10px]">
                    FEATURED COLLECTION LOOKBOOK
                  </span>
                  <span className="font-mono text-[11px] bg-black/40 px-2.5 py-0.5 rounded border border-white/10 text-white">
                    EDITION 2026/27
                  </span>
                </div>

                <div
                  onClick={() => setModalJacket(activeHeroCol)}
                  className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-2xl bg-[#141714] border border-white/10 cursor-pointer"
                  title={`Open ${activeHeroCol.name} Full PDF Catalog`}
                >
                  <img
                    src={activeHeroCol.coverImage}
                    alt={`${activeHeroCol.name} Catalogue`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/catalogues/default-cover.jpg";
                    }}
                  />

                  {/* Floating Action Badge on Desktop Hover */}
                  <div className="hidden sm:flex absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex-col items-center justify-center p-6 text-center gap-3">
                    <span className="text-white font-bold text-sm">
                      {activeHeroCol.name}
                    </span>
                    <span className="text-xs text-white/80 line-clamp-2 max-w-xs">
                      {activeHeroCol.tag}
                    </span>
                    <div className="flex flex-col gap-2 w-full max-w-[210px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalJacket(activeHeroCol);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
                      >
                        <FileText size={14} />
                        <span>View Full Catalog (PDF)</span>
                      </button>
                      <a
                        href={`/collections/${activeHeroCol.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-4 py-2 rounded-lg bg-white text-[#20231f] hover:bg-[#f6f5f0] text-xs font-bold shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-3 text-xs text-white">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <strong className="text-white block font-semibold truncate">{activeHeroCol.name}</strong>
                      <span className="text-[#a4a99d] text-[11px] block truncate">{activeHeroCol.tag}</span>
                    </div>
                    <a
                      href={`/collections/${activeHeroCol.id}`}
                      className="text-[#e85a2a] hover:underline font-bold text-xs flex items-center gap-1 shrink-0"
                    >
                      <span>View Specs</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalJacket(activeHeroCol)}
                    className="sm:hidden w-full py-2.5 px-4 rounded-xl bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <FileText size={14} />
                    <span>View Full Catalog (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Strip */}
        <div className="py-4 px-4 sm:px-8 bg-[#eeeee6] border-b border-[#deded5] text-xs font-medium text-[#52574b]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
              Minimum orders from 15 units
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
              Nationwide delivery across Botswana
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
              Logo embroidery, silicone badges &amp; sublimation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
              {collections.length} Master Collections • Complete 2026/27 Catalog
            </span>
          </div>
        </div>

        {/* 2. Pro Collections Section (#industries) */}
        <section id="industries" className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto bg-[#f6f5f0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase mb-2">
                <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
                EXPLORE ALL {collections.length} PREMIUM 2026/27 COLLECTIONS
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
                Outerwear Built For Every Sector.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#71776a] max-w-md">
              Select any collection to view complete model specifications, sizing options, technical fabrics, and official PDF lookbooks.
            </p>
          </div>

          {/* Collection Grid Component: Displays cover page visual from official PDFs + Ecosystem & Process */}
          <CollectionGrid
            collections={collections}
            onViewPdf={(col) => setModalJacket(col)}
            onViewEcosystemPdf={(doc) => setModalEcosystemDoc(doc)}
            activeHeroId={activeHeroCol.id}
          />


          <div className="text-center mt-10">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-[#fafaf7] text-[#20231f] text-xs font-bold border border-[#deded5] transition-colors shadow-sm"
            >
              <span>Explore all jacket styles in the full gallery</span>
              <ArrowRight size={14} className="text-[#e85a2a]" />
            </a>
          </div>
        </section>

        {/* 3. Business Benefits */}
        <section className="py-14 sm:py-20 px-4 sm:px-8 bg-[#eeeee7] border-y border-[#deded5]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <span className="text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase block mb-1">
                YOUR PEOPLE. YOUR BUSINESS IDENTITY.
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
                Why Businesses Choose Custom Outerwear
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Executive Appearance",
                  desc: "Create an unmistakable first impression across client visits, trade exhibitions, and company leadership retreats."
                },
                {
                  title: "Extreme Weather Shield",
                  desc: "Bonded windproof laminates and thermal baffling keep drivers, technicians, and guides warm during crisp mornings."
                },
                {
                  title: "Tough Industrial Durability",
                  desc: "Reinforced seam taping and abrasion-resistant fabrics engineered to outlast ordinary off-the-shelf retail garments."
                },
                {
                  title: "Team Pride & Retention",
                  desc: "High-grade jackets that employees genuinely love wearing on and off duty, elevating staff morale and loyalty."
                }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-white border border-[#deded5] shadow-sm space-y-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e85a2a]/15 text-[#e85a2a] flex items-center justify-center font-bold text-sm">
                    0{i + 1}
                  </span>
                  <h3 className="text-base font-bold text-[#20231f]">{item.title}</h3>
                  <p className="text-xs text-[#71776a] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Who We Serve */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#071e31] text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase">
                TRUSTED ACROSS SECTORS
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-['Barlow_Condensed',sans-serif] text-white">
                Equipping Botswana &amp; Regional Teams.
              </h2>
              <p className="text-xs sm:text-sm text-[#cbd4de] leading-relaxed">
                From national logistics fleets and open-pit mining operations to private hospitals, universities, and premier safari lodges.
              </p>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-3 text-xs font-semibold">
              {[
                "Corporate Enterprises",
                "Logistics & Delivery Fleets",
                "Mining & Industrial Contractors",
                "Private Clinics & Hospitals",
                "Safari Lodges & Conservation",
                "Sports Clubs & Academies",
                "Colleges & Varsity Prefects",
                "Security & Tactical Forces"
              ].map((sector, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-[#0e2a44] border border-[#1b3d5e] flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#e85a2a] shrink-0" />
                  <span>{sector}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. How It Works Section */}
        <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-8 bg-[#f6f5f0] border-b border-[#deded5]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase block mb-1">
                FOUR-STEP B2B ORDERING PROTOCOL
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
                How Custom Orders Work
              </h2>
              <p className="text-xs sm:text-sm text-[#71776a] mt-2">
                Fast, professional, and transparent. We work directly with procurement officers and committee heads.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Select Style & Colours",
                  desc: `Browse our ${collections.length} Pro collections or ${jackets.length} catalog models. Choose base colours, trims, and fabrics.`
                },
                {
                  step: "02",
                  title: "Size Matrix & Quantities",
                  desc: "Enter your team quantities from XS to XXXL. We calculate your order requirements automatically."
                },
                {
                  step: "03",
                  title: "Branding & Artwork Approval",
                  desc: "Share your logo files. We create digital 3D mockups and thread colour samples for your formal sign-off."
                },
                {
                  step: "04",
                  title: "Production & Delivery",
                  desc: "Precision manufacturing with reinforced double-needle seams. Direct delivery to your office or worksite."
                }
              ].map((item) => (
                <div key={item.step} className="p-6 rounded-xl bg-white border border-[#deded5] shadow-sm relative space-y-3">
                  <span className="text-3xl font-extrabold font-mono text-[#e85a2a] block">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-[#20231f] font-['DM_Sans',sans-serif]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#71776a] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setOrderCollection(activeHeroCol)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold uppercase tracking-wider shadow transition-transform hover:scale-102"
              >
                <span>Start Your Order Brief Now</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* 6. Quick WhatsApp & Direct Corporate Hotline Banner */}
        <section className="py-12 px-4 sm:px-8 bg-[#172318] text-white border-b border-[#283e29]">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold tracking-widest text-[#25d366] uppercase">
                DIRECT CORPORATE HOTLINE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Barlow_Condensed',sans-serif] text-white">
                Have a Quick Question Before Ordering?
              </h3>
              <p className="text-xs text-[#a3dca3]">
                Connect immediately with our specialists on WhatsApp, call our direct line, or email{" "}
                <a href={CORRESPONDENCE_MAILTO_HREF} className="underline hover:text-white">
                  {CORRESPONDENCE_EMAIL}
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#25d366] hover:bg-[#20be5b] text-[#0e2410] font-bold text-xs uppercase tracking-wider shadow-xl transition-transform hover:scale-105"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={CALL_ONLY_TEL_HREF}
                className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors"
              >
                <Phone size={15} className="text-[#e85a2a]" />
                <span>Call {CALL_ONLY_DISPLAY}</span>
              </a>

              <a
                href={CORRESPONDENCE_MAILTO_HREF}
                className="flex items-center gap-2 px-4 py-3.5 rounded-lg bg-white/5 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-colors"
                title={CORRESPONDENCE_EMAIL}
              >
                <Mail size={15} className="text-[#e85a2a]" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </section>

        {/* 7. FAQ Section (#faq) */}
        <section id="faq" className="py-16 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto bg-[#f6f5f0]">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase block mb-1">
              COMMONLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
              Everything You Need To Know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white border border-[#deded5] overflow-hidden shadow-sm transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-[#20231f] hover:text-[#e85a2a] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#71776a] transition-transform duration-200 shrink-0 ml-3 ${
                        isOpen ? "rotate-180 text-[#e85a2a]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs text-[#5f6558] leading-relaxed border-t border-[#f0f0ea] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. Final CTA Section */}
        <section className="py-16 px-4 sm:px-8 bg-[#e85a2a] text-[#f8f5eb] text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-90">
              CUSTOM JACKETS FOR BUSINESSES &amp; ORGANIZATIONS
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold font-['Barlow_Condensed',sans-serif] text-white leading-tight">
              Ready to create custom jackets for your business?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setOrderCollection(activeHeroCol)}
                className="px-8 py-3.5 rounded-lg bg-white text-[#20231f] hover:bg-[#f6f5f0] text-xs font-bold uppercase tracking-wider shadow transition-all hover:scale-105"
              >
                <span>ORDER CUSTOM JACKETS</span>
              </button>
              <a
                href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-lg bg-[#20231f] text-white hover:bg-[#323630] text-xs font-bold uppercase tracking-wider shadow transition-all hover:scale-105 flex items-center gap-2"
              >
                <MessageSquare size={16} />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
            <p className="text-xs text-white/80 pt-2">
              Your staff. Your team. Your company identity.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Full Multi-Page Catalogue Viewer */}
      {modalJacket && (() => {
        const targetColId = "collection" in modalJacket ? modalJacket.collection : modalJacket.id;
        const resolvedCol = findCollection(targetColId);
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
              const foundCol =
                collections.find((c) => c.id === resolvedCol.id) || collections[0];
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

      {/* Full Multi-Page Ecosystem & Process Document Viewer */}
      {modalEcosystemDoc && (
        <CollectionPDFViewer
          pdfUrl={modalEcosystemDoc.pdfUrl}
          coverImage={modalEcosystemDoc.coverImage}
          ecosystemDoc={modalEcosystemDoc}
          itemTitle={modalEcosystemDoc.name}
          onClose={() => setModalEcosystemDoc(null)}
          onOpenOrder={() => {
            setOrderProductName(undefined);
            setOrderCollection(activeHeroCol);
            setModalEcosystemDoc(null);
          }}
        />
      )}

      {/* Order Quote Dialog */}
      {orderCollection && (
        <OrderDialog
          collection={orderCollection}
          productName={orderProductName}
          onClose={() => {
            setOrderCollection(null);
            setOrderProductName(undefined);
          }}
        />
      )}
    </div>
  );
};
