import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Globe, Handshake, Sparkles } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { OrderDialog } from "../components/OrderDialog";
import { collections } from "../data/jacketsData";

export const AboutPage: React.FC = () => {
  const [orderOpen, setOrderOpen] = useState(false);

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

        {/* Hero */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#e85a2a] uppercase">
            <span className="w-1.5 h-1.5 bg-[#e85a2a]" />
            ABOUT JD JACKETS &amp; CO.
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">
            Outerwear Built To Outlast.<br />
            <span className="text-[#85867f]">Identity Tailored For Teams.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5f6558] leading-relaxed max-w-2xl">
            JD Jackets is a premier B2B manufacturer specializing in custom branded jackets, corporate puffers, and operational outerwear across Botswana and the southern African region.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="p-6 rounded-xl bg-white border border-[#deded5] shadow-sm space-y-3">
            <ShieldCheck size={28} className="text-[#e85a2a]" />
            <h3 className="text-lg font-bold text-[#20231f]">Crafted For Longevity</h3>
            <p className="text-xs text-[#71776a] leading-relaxed">
              We reject disposable corporate swag. Every jacket uses industrial-grade bonded poly, water-resistant membranes, YKK hardware, and reinforced stress points.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#deded5] shadow-sm space-y-3">
            <Globe size={28} className="text-[#e85a2a]" />
            <h3 className="text-lg font-bold text-[#20231f]">Southern African Logistics</h3>
            <p className="text-xs text-[#71776a] leading-relaxed">
              Headquartered in Gaborone with responsive delivery across Botswana and cross-border commercial routes. We handle customs and freight logistics seamlessly.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#deded5] shadow-sm space-y-3">
            <Handshake size={28} className="text-[#e85a2a]" />
            <h3 className="text-lg font-bold text-[#20231f]">Collaborative B2B Partnership</h3>
            <p className="text-xs text-[#71776a] leading-relaxed">
              From sample size runs for your executive team to custom pantone matching and embroidery stitch files, our dedicated account managers guide your project from concept to dispatch.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#deded5] shadow-sm space-y-3">
            <Sparkles size={28} className="text-[#e85a2a]" />
            <h3 className="text-lg font-bold text-[#20231f]">Precision Branding</h3>
            <p className="text-xs text-[#71776a] leading-relaxed">
              Equipped for Japanese tatami embroidery, 3D high-density silicone heat transfers, woven patches, and full high-resolution sublimation.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="p-8 rounded-2xl bg-[#eeeee7] border border-[#deded5] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-['Barlow_Condensed',sans-serif] text-[#20231f]">Ready to dress your workforce?</h3>
            <p className="text-xs text-[#71776a]">Request formal corporate pricing and digital jacket proofs.</p>
          </div>
          <button
            type="button"
            onClick={() => setOrderOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#e85a2a] hover:bg-[#cf4920] text-white text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-102 shrink-0"
          >
            <span>Order Custom Jackets</span>
            <ArrowRight size={15} />
          </button>
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
