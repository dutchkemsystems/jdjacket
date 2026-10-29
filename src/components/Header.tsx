import React, { useState } from "react";
import { MessageSquare, Phone, Mail, ArrowRight, Menu, X } from "lucide-react";
import {
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  WHATSAPP_DISPLAY,
  CALL_ONLY_DISPLAY,
  CALL_ONLY_TEL_HREF,
  CORRESPONDENCE_EMAIL,
  CORRESPONDENCE_MAILTO_HREF
} from "../config/contactConfig";

interface HeaderProps {
  onOpenOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrder }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

  const navLinks = [
    { href: "/#industries", label: "Industries" },
    { href: "/gallery", label: "Custom Jackets" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/about", label: "About Us" },
    { href: "/client-journey", label: "Client Journey" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contact", label: "Contact" }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 bg-[#f6f5f0]/95 backdrop-blur-md border-b border-[#deded5] text-[#252823] transition-colors">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="bg-[#f6f5f0] p-1 rounded flex items-center justify-center">
            <img
              src="/brand/jd-co-bw-logo.png"
              alt="JD Jackets & Co."
              className="h-9 sm:h-11 w-auto object-contain logo-image"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="hidden xs:flex flex-col">
            <span className="font-['Barlow_Condensed',sans-serif] font-bold text-lg sm:text-xl tracking-tight leading-none text-[#20231f]">
              JD JACKETS
            </span>
            <span className="text-[9px] tracking-widest text-[#e85a2a] uppercase font-bold">
              CUSTOM BRANDED OUTERWEAR
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide text-[#484c44]">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors hover:text-[#e85a2a] ${
                  isActive ? "text-[#e85a2a] font-bold" : ""
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={CALL_ONLY_TEL_HREF}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded bg-white hover:bg-[#eeeee6] text-[#20231f] border border-[#deded5] transition-colors"
            title={`Call Only: ${CALL_ONLY_DISPLAY}`}
          >
            <Phone size={13} className="text-[#e85a2a]" />
            <span>{CALL_ONLY_DISPLAY}</span>
          </a>

          <a
            href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#1b803e] border border-[#25d366]/30 transition-colors"
            title={`Chat directly on WhatsApp (${WHATSAPP_DISPLAY})`}
          >
            <MessageSquare size={14} />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onOpenOrder}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs font-bold rounded bg-[#e85a2a] hover:bg-[#cf4920] text-white transition-all shadow-sm hover:scale-102 uppercase tracking-wider"
          >
            <span>ORDER CUSTOM JACKETS</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#252823] hover:text-[#e85a2a] rounded hover:bg-[#eeeee6] transition-colors"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] z-40 bg-[#f6f5f0] border-b border-[#deded5] shadow-xl p-6 animate-fadeIn max-h-[calc(100dvh-65px)] overflow-y-auto">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-[#252823]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#e4e4db] hover:text-[#e85a2a] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#e85a2a] text-white text-xs font-bold uppercase tracking-wider shadow"
            >
              <span>Order Custom Jackets</span>
              <ArrowRight size={15} />
            </button>

            <a
              href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#25d366]/15 text-[#1b803e] text-xs font-bold border border-[#25d366]/30"
            >
              <MessageSquare size={15} />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>

            <a
              href={CALL_ONLY_TEL_HREF}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-[#20231f] text-xs font-bold border border-[#deded5]"
            >
              <Phone size={15} className="text-[#e85a2a]" />
              <span>Call Only: {CALL_ONLY_DISPLAY}</span>
            </a>

            <a
              href={CORRESPONDENCE_MAILTO_HREF}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-[#52574b] text-xs font-semibold border border-[#deded5]"
            >
              <Mail size={14} className="text-[#e85a2a]" />
              <span className="truncate">{CORRESPONDENCE_EMAIL}</span>
            </a>
          </div>
        </div>
      )}

      {/* Mobile bottom contact bar with WhatsApp, Call-Only tel: link & Order button */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 flex items-center gap-2 p-2.5 bg-[#f6f5f0]/95 backdrop-blur-md border-t border-[#deded5] shadow-lg">
        <a
          href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-lg bg-[#25d366] text-[#0e2410] text-xs font-bold shadow"
        >
          <MessageSquare size={14} />
          <span>WHATSAPP</span>
        </a>

        <a
          href={CALL_ONLY_TEL_HREF}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white text-[#20231f] text-xs font-bold border border-[#deded5] shadow-sm shrink-0"
          aria-label={`Call ${CALL_ONLY_DISPLAY}`}
        >
          <Phone size={14} className="text-[#e85a2a]" />
          <span>CALL</span>
        </a>

        <button
          type="button"
          onClick={onOpenOrder}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-lg bg-[#e85a2a] text-white text-xs font-bold shadow"
        >
          <span>ORDER</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </>
  );
};
