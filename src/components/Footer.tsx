import React from "react";
import { MessageSquare, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import {
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  WHATSAPP_DISPLAY,
  CALL_ONLY_DISPLAY,
  CALL_ONLY_TEL_HREF,
  CORRESPONDENCE_EMAIL,
  CORRESPONDENCE_MAILTO_HREF
} from "../config/contactConfig";

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#121412] text-[#85867f] border-t border-[#232722] pt-14 pb-20 sm:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#232722]">
          {/* Col 1: Brand & Direct Mobile Contact Actions */}
          <div className="md:col-span-2 space-y-4">
            <div className="inline-block bg-[#f6f5f0] p-2 rounded">
              <img
                src="/brand/jd-co-bw-logo.png"
                alt="JD Jackets"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <p className="text-sm text-[#b8bcb0] max-w-md leading-relaxed font-['DM_Sans',sans-serif]">
              Custom branded jackets and lifestyle apparel for businesses, organisations and professional teams.
              Engineered with thermal protection, tailored executive fits, and precision embroidery.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#25d366] text-xs font-bold border border-[#25d366]/30 transition-colors"
              >
                <MessageSquare size={14} />
                <span>WhatsApp ({WHATSAPP_DISPLAY})</span>
              </a>

              <a
                href={CALL_ONLY_TEL_HREF}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#f6f5f0] text-xs font-bold border border-white/15 transition-colors"
              >
                <Phone size={14} className="text-[#e85a2a]" />
                <span>Call ({CALL_ONLY_DISPLAY})</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#f6f5f0] uppercase mb-4">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a0a599]">
              <li>
                <a href="/gallery" className="hover:text-[#e85a2a] transition-colors flex items-center gap-1">
                  <span>Custom Jackets Gallery</span>
                  <ArrowUpRight size={12} className="text-[#85867f]" />
                </a>
              </li>
              <li>
                <a href="/#industries" className="hover:text-[#e85a2a] transition-colors">
                  Nine Pro Collections
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#e85a2a] transition-colors">
                  About JD Outerwear
                </a>
              </li>
              <li>
                <a href="/client-journey" className="hover:text-[#e85a2a] transition-colors">
                  Client Journey &amp; Approvals
                </a>
              </li>
              <li>
                <a href="/customization-brief" className="hover:text-[#e85a2a] transition-colors">
                  Detailed Project Brief
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Headquarters */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#f6f5f0] uppercase mb-4">
              Headquarters &amp; Orders
            </h4>
            <div className="space-y-3 text-xs text-[#a0a599]">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#e85a2a] shrink-0 mt-0.5" />
                <span>Gaborone, Botswana (Regional &amp; International Delivery)</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageSquare size={15} className="text-[#25d366] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#6e7267]">WhatsApp</span>
                  <a
                    href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors font-mono"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={15} className="text-[#e85a2a] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#6e7267]">Call Only</span>
                  <a href={CALL_ONLY_TEL_HREF} className="hover:text-white transition-colors font-mono">
                    {CALL_ONLY_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={15} className="text-[#e85a2a] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-wider text-[#6e7267]">Correspondence Email</span>
                  <a
                    href={CORRESPONDENCE_MAILTO_HREF}
                    className="hover:text-white transition-colors break-all"
                  >
                    {CORRESPONDENCE_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e7267] gap-4">
          <p>© {new Date().getFullYear()} JD Jackets &amp; Co. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Corporate Outerwear &amp; Lifestyle Apparel · Custom B2B Manufacturing</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
