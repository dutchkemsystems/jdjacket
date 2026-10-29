/**
 * JD Jackets Outerwear & Apparel Data — 2026/27 Premium Collections
 *
 * Official 2026/27 Master Collections:
 * 1. JD Corporate Pro  — JD_Corporate_Pro_TWO_PAGE_SPREADS.pdf
 * 2. JD Sport Pro      — JD_Sport_Pro_TWO_PAGE_SPREADS.pdf
 * 3. JD Safari Pro     — JD_Safari_Pro_TWO_PAGE_SPREADS.pdf
 * 4. JD Mining Pro     — JD_Mining_Pro_TWO_PAGE_SPREADS.pdf
 * 5. JD Logistics Pro  — JD_Logistics_Pro_TWO_PAGE_SPREADS.pdf
 * 6. JD Tactical Pro   — JD_Tactical_Pro_TWO_PAGE_SPREADS.pdf
 * 7. JD Healthcare Pro — JD_Healthcare_Pro_TWO_PAGE_SPREADS.pdf
 * 8. JD Campus Pro     — JD_Campus_Pro_TWO_PAGE_SPREADS.pdf
 * 9. JD Lifestyle Pro  — JD_Lifestyle_Pro_2026-27_WEBSITE-1.pdf
 */

import {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  CALL_ONLY_NUMBER,
  CALL_ONLY_DISPLAY,
  CALL_ONLY_TEL_HREF,
  CORRESPONDENCE_EMAIL,
  CORRESPONDENCE_MAILTO_HREF,
  DEFAULT_WHATSAPP_MESSAGE,
  getWhatsAppUrl
} from "../config/contactConfig";

export interface Product {
  sku: string;
  name: string;
  fit?: string;
  length?: string;
  slidePage?: number;
  features: string[];
  sizes: string[];
  colors: string[];
  customization: string[];
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pdfUrl: string;
  coverImage: string;
  products: Product[];
  idealFor?: string[];
  features?: string[];
  pdfPages?: string;
  cataloguePdf?: string;
}

export interface CollectionItem {
  id: string;
  slug: string;
  name: string;
  type: string;
  tag: string;
  description: string;
  features: string[];
  color: string;
  coverImage: string;
  catalogueImage: string;
  pdfUrl: string;
  cataloguePdf: string;
  pdfPages: string;
  products: Product[];
}

export interface IndustryItem {
  id: string;
  name: string;
  audience: string;
  description: string;
  teams: string[];
  focus: string[];
  catalogueImage: string;
  cataloguePdf: string;
}

export interface JacketItem {
  id: string;
  sku: string;
  name: string;
  collection: string;
  colour: string;
  kind: string;
  aspect: number;
  catalogueImage: string;
  cataloguePdf: string;
  description: string;
  tag: string;
  features: string[];
  sizes: string[];
  colors: string[];
  customization: string[];
}

export interface SlideInfo {
  pageNumber: number;
  title: string;
  image: string;
}

/**
 * Normalizes any collection identifier (e.g. "corporate" or "corporate-pro")
 * into its canonical "-pro" slug.
 */
export function normalizeCollectionId(collectionId: string): string {
  const base = (collectionId || "corporate-pro")
    .toLowerCase()
    .trim()
    .replace(/-pro$/, "");
  return `${base}-pro`;
}

/**
 * Maps a collection ID to the static cover image (Page 1 of its PDF).
 */
export function getCollectionCoverImage(collectionId: string): string {
  switch (normalizeCollectionId(collectionId)) {
    case "corporate-pro":
      return "/assets/images/covers/corporate-pro-cover.jpg";
    case "sport-pro":
      return "/assets/images/covers/sport-pro-cover.jpg";
    case "safari-pro":
      return "/assets/images/covers/safari-pro-cover.jpg";
    case "mining-pro":
      return "/assets/images/covers/mining-pro-cover.jpg";
    case "logistics-pro":
      return "/assets/images/covers/logistics-pro-cover.jpg";
    case "tactical-pro":
      return "/assets/images/covers/tactical-pro-cover.jpg";
    case "healthcare-pro":
      return "/assets/images/covers/healthcare-pro-cover.jpg";
    case "campus-pro":
      return "/assets/images/covers/campus-pro-cover.jpg";
    case "lifestyle-pro":
      return "/assets/images/covers/lifestyle-pro-cover.jpg";
    default:
      return "/assets/images/covers/corporate-pro-cover.jpg";
  }
}

export const jacketsData: Collection[] = [
  // =========================================================================
  // 1. JD CORPORATE PRO
  // =========================================================================
  {
    id: "corporate-pro",
    name: "JD Corporate Pro",
    tagline: "PROFESSIONAL. REFINED. REPRESENTATIVE.",
    description:
      "Executive outerwear for organizations that lead. Customizable professional warmth, designed in Botswana and built for corporate teams across Southern Africa.",
    pdfUrl: "/assets/pdfs/JD_Corporate_Pro_TWO_PAGE_SPREADS.pdf",
    cataloguePdf: "/assets/pdfs/JD_Corporate_Pro_TWO_PAGE_SPREADS.pdf",
    coverImage: "/assets/images/covers/corporate-pro-cover.jpg",
    pdfPages: "6",
    idealFor: [
      "Corporate Offices & Executive Leadership",
      "Financial Institutions & Banks",
      "Consulting Firms & Advisory Practices",
      "Government Departments & Public Agencies",
      "Hotels, Hospitality & Airports",
      "Universities, Conferences & Education Sector"
    ],
    features: [
      "Executive 3-layer premium stretch softshell and high-loft synthetic insulation",
      "5,000mm water resistance with durable DWR water-repellent outer finish",
      "Up to 5,000g/m²/24h breathable membrane for all-day indoor and outdoor comfort",
      "Men's Classic Fit (XS–5XL) and contoured Ladies Fit™ silhouettes (XS–5XL)",
      "Three tailored length options: Hip Length (H), Below Hip Length (BH), and Knee Length (KL)",
      "Three ways to make it yours: Plain, Trimmed, and Corporate Sublimation"
    ],
    products: [
      {
        sku: "JCP-SS01",
        name: "Executive Softshell Classic",
        fit: "Regular Fit",
        slidePage: 2,
        features: [
          "Executive 3-layer premium stretch softshell with windproof membrane",
          "Clean executive styling with YKK zipper option and adjustable hem",
          "Soft microfleece interior lining with DWR water-repellent finish",
          "Corporate embroidery-ready chest and sleeve panels"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: [
          "Embroidery",
          "Screen Print",
          "Heat Transfer",
          "Reflective Branding",
          "JD Three-Dot Branding"
        ]
      },
      {
        sku: "JCP-SS02",
        name: "Executive Softshell Premium",
        fit: "Regular Fit",
        slidePage: 2,
        features: [
          "Executive 3-layer stretch softshell with premium contrast trims",
          "Water-repellent zippers and articulated sleeves for ease of movement",
          "Adjustable storm cuffs and internal security pocket",
          "Breathable windproof membrane with soft microfleece interior"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: [
          "Embroidery",
          "Screen Print",
          "Heat Transfer",
          "Reflective Branding",
          "JD Three-Dot Branding"
        ]
      },
      {
        sku: "JCP-SS03",
        name: "Executive Women's Softshell",
        fit: "Women's Tailored Fit",
        slidePage: 2,
        features: [
          "Feminine tailored silhouette with shaped waist and contoured side panels",
          "Slightly narrower shoulders and curved hem for a refined look",
          "Executive 3-layer windproof and water-resistant stretch softshell",
          "Soft microfleece lining for all-day corporate warmth"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: [
          "Embroidery",
          "Screen Print",
          "Heat Transfer",
          "Reflective Branding",
          "JD Three-Dot Branding"
        ]
      },
      {
        sku: "JCP-SS04",
        name: "Lightweight Corporate Softshell",
        fit: "Modern Fit",
        slidePage: 2,
        features: [
          "Ultra-lightweight and packable 2-layer corporate softshell",
          "Minimalist executive design with zipped hand pockets and elastic cuffs",
          "Water-resistant, breathable, quick-dry and easy-care finish",
          "Ideal transition layer for offices, travel and client visits"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: [
          "Embroidery",
          "Screen Print",
          "Heat Transfer",
          "Reflective Branding",
          "JD Three-Dot Branding"
        ]
      },
      {
        sku: "JCP-PF01",
        name: "Executive Lightweight Puffer",
        fit: "Men's Classic Fit",
        length: "Hip Length",
        slidePage: 3,
        features: [
          "100% Polyester shell with DWR finish (5,000mm water resistance)",
          "High-loft synthetic fill for superior warmth without bulk",
          "Tightly woven wind-resistant fabric with 5,000g/m²/24h breathability",
          "Lightweight packable design with refined corporate detailing"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "Print", "JD Three-Dot Branding"]
      },
      {
        sku: "JCP-PF02",
        name: "Executive Premium Puffer",
        fit: "Men's Classic Fit",
        length: "Below Hip Length",
        slidePage: 3,
        features: [
          "Extended below-hip executive coverage with high-loft synthetic insulation",
          "Durable water-repellent (5,000mm) and wind-resistant outer shell",
          "Breathable lining keeping professionals dry and comfortable",
          "Quality zippers and clean corporate baffle lines"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "Print", "JD Three-Dot Branding"]
      },
      {
        sku: "JCP-PF03",
        name: "Executive Puffer Parka",
        fit: "Men's Classic Fit",
        length: "Knee Length",
        slidePage: 3,
        features: [
          "Full knee-length insulated puffer parka for cold winter mornings",
          "High-loft synthetic fill with wind-blocking 5,000mm DWR shell",
          "Lightweight packable warmth engineered for executive travel",
          "Available in Plain, Trimmed and Custom Sublimation finishes"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "Print", "JD Three-Dot Branding"]
      },
      {
        sku: "JCP-PF02-H",
        name: "Ladies Executive Puffer (Hip Length)",
        fit: "Ladies Fit™",
        length: "Hip Length",
        slidePage: 3,
        features: [
          "Feminine tailored silhouette with contoured side panels and shaped waist",
          "Articulated sleeves and high-loft synthetic insulation for lasting warmth",
          "5,000mm water-repellent DWR outer fabric and breathable lining",
          "Lightweight and packable without compromising executive polish"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "Print", "JD Three-Dot Branding"]
      },
      {
        sku: "JCP-PF02-BH",
        name: "Ladies Executive Puffer (Below Hip Length)",
        fit: "Ladies Fit™",
        length: "Below Hip Length",
        slidePage: 3,
        features: [
          "Below-hip tailored coverage with contoured side panels for a flattering fit",
          "High-loft thermal fill blocking cold wind while remaining lightweight",
          "Durable water-repellent outer fabric with smooth polyester lining",
          "Designed for corporate offices, hospitality and executive travel"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "Print", "JD Three-Dot Branding"]
      },
      {
        sku: "JCP-PF02-KL",
        name: "Ladies Executive Puffer (Knee Length)",
        fit: "Ladies Fit™",
        length: "Knee Length",
        slidePage: 3,
        features: [
          "Elegant knee-length Ladies Fit™ puffer with defined waist silhouette",
          "Maximum winter insulation with 5,000mm water-repellent shell",
          "Articulated sleeves and breathable lining for all-day comfort",
          "Supports Plain, Trimmed and Corporate Sublimation branding"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "Print", "JD Three-Dot Branding"]
      },
      {
        sku: "JCP-BW01",
        name: "Executive Bodywarmer",
        fit: "Classic Fit",
        length: "Hip Length",
        slidePage: 4,
        features: [
          "Smart core thermal insulation without restricting arm movement",
          "100% Polyester outer shell with 5,000mm DWR water-repellent finish",
          "Wind-resistant construction with 3,000g/m²/24h breathability",
          "Versatile indoor and outdoor layering for active corporate days"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JCP-BW02",
        name: "Premium Bodywarmer",
        fit: "Classic Fit",
        length: "Hip Length",
        slidePage: 4,
        features: [
          "Premium synthetic down baffle construction for elevated warmth",
          "Wind-resistant and water-repellent 5,000mm outer shell",
          "Durable easy-care finish with secure zip hand pockets",
          "Refined executive collar and chest branding zone"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JCP-BW03",
        name: "Lightweight Corporate Gilet",
        fit: "Classic Fit",
        length: "Hip Length",
        slidePage: 4,
        features: [
          "Lightweight and packable insulated gilet for effortless transition weather",
          "Full arm mobility ideal for events, retail and client engagements",
          "Water-repellent DWR coating and wind-resistant shell",
          "Clean minimalist front profile for crisp logo embroidery"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JCP-BW04",
        name: "Softshell Bodywarmer",
        fit: "Classic Fit",
        length: "Hip Length",
        slidePage: 4,
        features: [
          "Smooth bonded softshell sleeveless vest for sleek office-to-site wear",
          "Wind-resistant and water-repellent outer surface with soft inner backing",
          "Zipped side pockets and structured stand collar",
          "Ideal for corporate offices, banks, universities and conferences"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JCP-BW05-H",
        name: "Ladies Executive Bodywarmer (Hip / Below-Hip / Knee)",
        fit: "Ladies Fit™",
        length: "Hip / Below-Hip / Knee Length",
        slidePage: 4,
        features: [
          "Tailored to the female silhouette with contoured side panels and defined waist",
          "Available in Hip (JCP-BW05-H), Below-Hip (JCP-BW05-BH) and Knee Length (JCP-BW05-KL)",
          "Premium synthetic down fill with 5,000mm water-repellent shell",
          "Comfort and freedom of movement with sleek professional polish"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JCP-BW06-H",
        name: "Ladies Lightweight Gilet (Hip / Below-Hip / Knee)",
        fit: "Ladies Fit™",
        length: "Hip / Below-Hip / Knee Length",
        slidePage: 4,
        features: [
          "Lightweight packable Ladies Fit™ gilet with contoured waist definition",
          "Available in Hip (JCP-BW06-H), Below-Hip (JCP-BW06-BH) and Knee Length (JCP-BW06-KL)",
          "Wind-resistant and water-repellent easy-care polyester shell",
          "Designed for indoor/outdoor corporate transitions"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JCP-PK01-H",
        name: "Executive Parka (Hip Length)",
        fit: "Men's Classic Fit",
        length: "Hip Length",
        slidePage: 5,
        features: [
          "Extreme weather protection with premium synthetic down / polyester fill",
          "Adjustable hood, adjustable storm cuffs and multiple secure pockets",
          "5,000mm water-repellent DWR outer shell and 3,000g/m²/24h breathability",
          "Refined corporate silhouette built for unpredictable weather"
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JCP-PK01-BH",
        name: "Executive Parka (Below Hip Length)",
        fit: "Men's Classic Fit",
        length: "Below Hip Length",
        slidePage: 5,
        features: [
          "Extended below-hip storm protection with superior thermal insulation",
          "Wind-resistant and 5,000mm water-repellent durable outer shell",
          "Adjustable storm hood, inner heat-sealing cuffs and secure zip storage",
          "Engineered for senior leadership and outdoor corporate engagements"
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JCP-PK01-KL",
        name: "Executive Parka (Knee Length)",
        fit: "Men's Classic Fit",
        length: "Knee Length",
        slidePage: 5,
        features: [
          "Maximum knee-length protection and executive presence in severe cold",
          "Premium synthetic down insulation with breathable weatherproof shell",
          "Adjustable storm hood and cuffs sealing warmth in and cold out",
          "Multiple secure internal and external pockets"
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JCP-PK02-H",
        name: "Ladies Executive Parka (Hip / Below-Hip / Knee)",
        fit: "Ladies Fit™",
        length: "Hip / Below-Hip / Knee Length",
        slidePage: 5,
        features: [
          "Feminine tailored silhouette with contoured side panels and waist definition",
          "Available in Hip (JCP-PK02-H), Below-Hip (JCP-PK02-BH) and Knee Length (JCP-PK02-KL)",
          "5,000mm water-repellent DWR shell with premium synthetic down warmth",
          "Adjustable storm hood, secure pockets and adjustable cuffs"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Black", "Navy", "Charcoal", "Grey"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      }
    ]
  },

  // =========================================================================
  // 2. JD SPORT PRO
  // =========================================================================
  {
    id: "sport-pro",
    name: "JD Sport Pro",
    tagline: "PERFORMANCE. UNITY. VICTORY.",
    description:
      "Built for champions, designed for teams, and engineered for performance. Created for athletes, coaches and clubs who demand premium fabrics, smart design and maximum team pride from training grounds to victory laps.",
    pdfUrl: "/assets/pdfs/JD_Sport_Pro_TWO_PAGE_SPREADS.pdf",
    cataloguePdf: "/assets/pdfs/JD_Sport_Pro_TWO_PAGE_SPREADS.pdf",
    coverImage: "/assets/images/covers/sport-pro-cover.jpg",
    pdfPages: "6",
    idealFor: [
      "Professional & Semi-Pro Sports Clubs",
      "National Federations & Tournament Squads",
      "University, College & School First Teams",
      "Coaches, Technical & Medical Support Staff",
      "Corporate Sports Leagues & Athletics Clubs",
      "Warm-Ups, Travel, Training Camps & Game Days"
    ],
    features: [
      "100% Polyester outer shell with 5,000mm DWR water-repellent finish",
      "4-way stretch breathable performance fabrics (3,000g/m²/24h)",
      "Signature Diamond Performance sublimation design in custom team colours",
      "Three ways to represent: Plain, Trimmed, and Full Diamond Sublimation",
      "Dedicated Men's Fit, Ladies Fit™, and Coaches & Support Staff silhouettes",
      "7-point consistent club branding placement system with JD Three-Dot signature"
    ],
    products: [
      {
        sku: "JSP-SS01",
        name: "Performance Softshell Classic",
        fit: "Men's Athletic Fit",
        slidePage: 2,
        features: [
          "Clean and professional 4-way stretch softshell for everyday team performance",
          "Wind-resistant and 5,000mm water-repellent breathable fabric",
          "Lightweight quick-dry construction allowing athletes to move freely",
          "Ideal for team travel, media appearances and warm-ups"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Royal", "Charcoal"],
        customization: ["Plain", "Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-SS02",
        name: "Performance Softshell Premium",
        fit: "Men's Athletic Fit",
        slidePage: 2,
        features: [
          "Contrast shoulder and zip trims for a sharp, dynamic athletic identity",
          "4-way stretch wind-resistant and water-repellent performance membrane",
          "Breathable quick-dry interior engineered for active movement",
          "7-zone club crest, sponsor and player initial placement support"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy/Black", "Black/Red", "Royal/White", "Charcoal/Lime"],
        customization: ["Trimmed", "Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-SS03",
        name: "Performance Softshell Sublimation",
        fit: "Men's Athletic Fit",
        slidePage: 2,
        features: [
          "Full custom sublimation featuring the JD Signature Diamond Performance gradient",
          "4-way stretch lightweight, breathable and water-repellent shell",
          "Colour-fast high-definition team colours and crest integration",
          "Engineered to stand out on game days and stadium arrivals"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Sky Blue", "Black", "White", "Navy"],
        customization: ["Sublimation", "Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-SS04",
        name: "Ladies Performance Softshell Classic",
        fit: "Ladies Fit™",
        slidePage: 2,
        features: [
          "Feminine performance-driven silhouette for all-day athletic comfort",
          "4-way stretch, wind-resistant and water-repellent quick-dry fabric",
          "Clean classic styling for women's squads and travelling delegations",
          "Full club crest and sleeve branding compatibility"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Black", "Navy", "Charcoal", "Royal"],
        customization: ["Plain", "Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-SS05",
        name: "Ladies Performance Softshell Premium",
        fit: "Ladies Fit™",
        slidePage: 2,
        features: [
          "Contrast trims and panels creating a sleek, athletic women's silhouette",
          "Breathable 4-way stretch fabric with DWR water-repellent protection",
          "Lightweight quick-dry performance for training and match travel",
          "Custom accent zip and trim combinations"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy/Black", "Black/Red", "Royal/White", "Charcoal/Lime"],
        customization: ["Trimmed", "Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-SS06",
        name: "Ladies Performance Softshell Sublimation",
        fit: "Ladies Fit™",
        slidePage: 2,
        features: [
          "Bold diamond sublimation engineered specifically for women's teams",
          "Unmistakable team presence in custom club colourways",
          "Wind-resistant, water-repellent and breathable 4-way stretch shell",
          "Fade-resistant sublimation print built to perform season after season"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Sky Blue", "Black", "White", "Navy"],
        customization: ["Sublimation", "Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-PF01-H",
        name: "Team Puffer Jacket (Hip Length)",
        fit: "Men's Athletic Fit",
        length: "Hip Length",
        slidePage: 3,
        features: [
          "Premium synthetic down thermal insulation for pre-match and post-match warmth",
          "Adjustable hood, secure zip pockets and heat-sealing elasticated cuffs",
          "Wind-resistant and 5,000mm water-repellent outer shell",
          "Optional signature diamond sublimation panels"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Royal", "Charcoal", "Sky Blue", "White"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-PF02-BH",
        name: "Team Puffer Jacket (Below Hip Length)",
        fit: "Men's Athletic Fit",
        length: "Below Hip Length",
        slidePage: 3,
        features: [
          "Below-hip insulated length keeping substitutes and travelling squads warm",
          "Breathable lining with lightweight synthetic down fill",
          "Adjustable storm hood, premium zippers and secure zip pockets",
          "Built for game days, cold weather and training camps"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Royal", "Charcoal", "Sky Blue", "White"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-PF03-KL",
        name: "Team Puffer Jacket (Knee Length)",
        fit: "Men's Athletic Fit",
        length: "Knee Length",
        slidePage: 3,
        features: [
          "Full knee-length stadium bench puffer for maximum cold-weather retention",
          "Durable water-repellent and wind-resistant outer fabric",
          "Elasticated storm cuffs, adjustable hood and heavy-duty zippers",
          "Ideal for winter evening fixtures and tournament sidelines"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Royal", "Charcoal", "Sky Blue", "White"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-PF04-H",
        name: "Ladies Team Puffer (Hip / Below-Hip / Knee)",
        fit: "Ladies Fit™",
        length: "Hip / Below-Hip / Knee Length",
        slidePage: 3,
        features: [
          "Tailored Ladies Fit™ team puffer available in Hip (JSP-PF04-H), Below-Hip (JSP-PF05-BH) and Knee Length (JSP-PF06-KL)",
          "Lightweight thermal insulation with breathable lining and contoured waist",
          "Adjustable hood, elasticated cuffs and secure zip pockets",
          "Engineered from grassroots to professional women's clubs"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Black", "Navy", "Royal", "Charcoal", "Sky Blue", "White"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-WB01",
        name: "Windbreaker Classic",
        fit: "Athletic Fit",
        slidePage: 4,
        features: [
          "Lightweight, water-repellent and wind-resistant shell for training and travel",
          "Packable design with breathable quick-dry easy-care fabric",
          "Adjustable hood and elastic cuffs blocking wind gusts on pitch",
          "Clean team silhouette ready for club crest branding"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        colors: ["White/Sky Blue", "Black", "Navy"],
        customization: ["Plain", "Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-WB02",
        name: "Windbreaker Trimmed",
        fit: "Athletic Fit",
        slidePage: 4,
        features: [
          "Contrast trims and athletic panels for a sharp, defined club look",
          "Water-repellent, wind-resistant and breathable packable shell",
          "Quick-dry easy-care construction for high-frequency training sessions",
          "Multiple accent colour combinations"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        colors: ["Black/Sky Blue", "Navy/White", "Charcoal/Lime"],
        customization: ["Trimmed", "Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-WB03",
        name: "Windbreaker Sublimation",
        fit: "Athletic Fit",
        slidePage: 4,
        features: [
          "Full custom sublimation featuring the JD Signature Diamond pattern",
          "Ultra-lightweight packable windbreaker for warm-ups and travel days",
          "Water-repellent and breathable quick-dry performance shell",
          "Unlimited team colour customisation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        colors: ["Sky Blue/Black", "Navy/White", "Black/Red"],
        customization: ["Sublimation", "Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-BW01",
        name: "Sport Bodywarmer (Classic / Trimmed / Sublimation)",
        fit: "Athletic Layering Fit",
        slidePage: 4,
        features: [
          "Core insulated warmth without restricting throwing, coaching or sprinting motion",
          "Available in Classic (JSP-BW01), Trimmed (JSP-BW02) and Diamond Sublimation (JSP-BW03)",
          "Wind-resistant and water-repellent lightweight shell with zip pockets",
          "Ideal active layer over training tops and hoodies"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        colors: ["Black", "Navy", "Charcoal", "Black/Sky Blue", "Navy/White", "Sky Blue/Black", "Black/Red"],
        customization: ["Plain", "Trimmed", "Sublimation", "Embroidery", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-CS04",
        name: "Coach Softshell Jacket",
        fit: "Coaches & Staff Fit",
        slidePage: 5,
        features: [
          "Flexible, breathable weather-resistant softshell tailored for active sideline leaders",
          "Multiple secure zip pockets for match notes, stopwatches and radios",
          "Clean authoritative technical staff look with optional COACH back print",
          "Durable water-repellent outer membrane"
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal"],
        customization: ["Embroidery", "Screen Print", "Coach Back Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-FL01",
        name: "Coach Fleece Jacket",
        fit: "Coaches & Staff Fit",
        slidePage: 5,
        features: [
          "Warm breathable mid-layer fleece for daily training ground and travel duties",
          "Full front zipper with stand collar and secure side pockets",
          "Easy-care anti-pill construction built for daily club use",
          "Pairs seamlessly beneath Coaches Parkas in extreme cold"
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy", "Charcoal"],
        customization: ["Embroidery", "Screen Print", "JD Three-Dot Logo"]
      },
      {
        sku: "JSP-CP01",
        name: "Coaches Parka (Hip / Below-Hip / Knee Length)",
        fit: "Coaches & Staff Fit",
        length: "Hip / Below-Hip / Knee Length",
        slidePage: 5,
        features: [
          "Available in Hip (JSP-CP01), Below-Hip (JSP-CP02) and Knee Length (JSP-CP03)",
          "Extreme sideline weather protection with thermal insulation and water-repellent shell",
          "Adjustable storm hood, two-way front zip, inner storm cuffs and secure pockets",
          "Engineered for coaches, managers and medical staff in cold and wet fixtures"
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Navy"],
        customization: ["Plain", "Sublimation", "Embroidery", "Coach Back Print", "JD Three-Dot Logo"]
      }
    ]
  },

  // =========================================================================
  // 3. JD SAFARI PRO
  // =========================================================================
  {
    id: "safari-pro",
    name: "JD Safari Pro",
    tagline: "BORN FOR NATURE. MADE FOR EXPLORERS. BUILT FOR AFRICA.",
    description:
      "From the wild to the lodge, from the bush to the boardroom, JD Safari Pro delivers premium comfort, weather protection and authentic African heritage for guides, lodges, conservation teams and explorers.",
    pdfUrl: "/assets/pdfs/JD_Safari_Pro_TWO_PAGE_SPREADS.pdf",
    cataloguePdf: "/assets/pdfs/JD_Safari_Pro_TWO_PAGE_SPREADS.pdf",
    coverImage: "/assets/images/covers/safari-pro-cover.jpg",
    pdfPages: "6",
    idealFor: [
      "Luxury Safari Lodges & Bush Camps",
      "Tour Operators & Overland Expeditions",
      "Professional Field Guides & Wildlife Rangers",
      "Conservation NGOs & Research Reserves",
      "Outdoor Adventurers & Aviation Charters",
      "Corporate Bush Retreats & Incentive Groups"
    ],
    features: [
      "100% Polyester DWR water-repellent outer shells and recycled thermal insulation",
      "Exclusive Big Five Sublimation Design Library (Lion, Leopard, Elephant, Rhino, Buffalo Spirit)",
      "Three expressions: Plain Collection, Trimmed Collection, and Big Five Sublimation",
      "Curated bush palette: Olive Green, Khaki, Sand, Earth Brown, and Graphite Grey",
      "Men's S–5XL and Ladies XS–3XL sizing across all 7 safari range styles",
      "Custom zip pullers, woven/sewn lodge labels, precision embroidery and sublimation"
    ],
    products: [
      {
        sku: "JSF-PF01",
        name: "Safari Puffer Jacket",
        fit: "Men's & Ladies Expedition Fit",
        slidePage: 3,
        features: [
          "Recycled polyester / down-alternative insulation trapping heat without bulk",
          "Wind-resistant and DWR water-repellent shell for crisp early-morning game drives",
          "Compact and lightweight packable construction for bush flights and transfers",
          "Available in Plain, Trimmed and exclusive Big Five Sublimation finishes"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Olive Green", "Khaki", "Sand", "Earth Brown", "Graphite Grey"],
        customization: [
          "Embroidery",
          "Big Five Sublimation",
          "Woven/Sewn Labels",
          "Custom Zip Pullers",
          "JD Three-Dot Signature"
        ]
      },
      {
        sku: "JSF-PK01",
        name: "Safari Extreme Parka",
        fit: "Men's & Ladies Expedition Fit",
        length: "Extended Parka Length",
        slidePage: 3,
        features: [
          "Extended length and maximum thermal warmth for the coldest winter bush mornings",
          "Waterproof and windproof tough outer shell with adjustable insulated storm hood",
          "Two-way front zipper with storm flap, microfleece-lined pockets and inner security pocket",
          "Available in Plain, Trimmed and Big Five Sublimation expressions"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Olive Green", "Khaki", "Sand", "Earth Brown", "Graphite Grey"],
        customization: [
          "Embroidery",
          "Big Five Sublimation",
          "Woven/Sewn Labels",
          "Custom Zip Pullers",
          "JD Three-Dot Signature"
        ]
      },
      {
        sku: "JSF-BW01",
        name: "Safari Bodywarmer Vest",
        fit: "Unrestricted Layering Fit",
        slidePage: 4,
        features: [
          "Lightweight insulated core warmth with unrestricted arm movement for guiding and photography",
          "Designed to layer effortlessly over safari shirts or anti-pill fleece",
          "Wind-resistant outer fabric with zipped pockets to keep field essentials safe",
          "Responsibly made sustainable fabrics in Plain, Trimmed or Big Five Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Olive Green", "Khaki", "Sand", "Earth Brown", "Graphite Grey"],
        customization: [
          "Embroidery",
          "Big Five Sublimation",
          "Woven/Sewn Labels",
          "Custom Zip Pullers",
          "JD Three-Dot Signature"
        ]
      },
      {
        sku: "JSF-CG01",
        name: "Coaches & Guides Safari Jacket",
        fit: "Leaders & Guides Fit",
        slidePage: 4,
        features: [
          "Hard-wearing durable outer shell engineered for professional guides and expedition leaders",
          "Water-repellent and breathable membrane letting moisture vapour escape on bush walks",
          "YKK quality zippers, adjustable hood with cord locks, adjustable cuffs and inner security pocket",
          "Multiple utility pockets for radios, field guides and optics"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Olive Green", "Khaki", "Sand", "Earth Brown", "Graphite Grey"],
        customization: [
          "Embroidery",
          "Big Five Sublimation",
          "Guide Role Badging",
          "Woven/Sewn Labels",
          "JD Three-Dot Signature"
        ]
      },
      {
        sku: "JSF-SS01",
        name: "Safari Softshell Jacket",
        fit: "Active Explorer Fit",
        slidePage: 6,
        features: [
          "93% Polyester / 7% Spandex stretch outer shell bonded with soft microfleece backing",
          "Windproof and DWR water-repellent protection from lodge reception to open savanna",
          "Quiet, flexible fabric ideal for wildlife viewing and guest hosting",
          "Supports Plain, Trimmed and Big Five Sublimation customisation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Olive Green", "Khaki", "Sand", "Earth Brown", "Graphite Grey"],
        customization: ["Embroidery", "Big Five Sublimation", "Woven/Sewn Labels", "JD Three-Dot Signature"]
      },
      {
        sku: "JSF-FL01",
        name: "Safari Anti-Pill Fleece Jacket",
        fit: "Comfort Layer Fit",
        slidePage: 6,
        features: [
          "Soft anti-pill microfleece mid-layer delivering silent warmth around the boma and on trek",
          "Quick-drying, breathable and easy-care construction for daily lodge operations",
          "Full-zip front with secure hand pockets and stand collar",
          "Precision lodge crest embroidery ready"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Olive Green", "Khaki", "Sand", "Earth Brown", "Graphite Grey"],
        customization: ["Embroidery", "Woven/Sewn Labels", "Custom Zip Pullers", "JD Three-Dot Signature"]
      },
      {
        sku: "JSF-WB01",
        name: "Safari Micro-Ripstop Windbreaker",
        fit: "Lightweight Packable Fit",
        slidePage: 6,
        features: [
          "100% Polyester micro-ripstop shell resisting bush snags, wind and sudden drizzle",
          "Ultra-lightweight and fast-drying for summer rain seasons and boat safaris",
          "Adjustable hood and elastic cuffs for reliable field comfort",
          "Available with subtle lodge branding or Big Five sublimation accents"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Olive Green", "Khaki", "Sand", "Earth Brown", "Graphite Grey"],
        customization: ["Embroidery", "Big Five Sublimation", "Custom Zip Pullers", "JD Three-Dot Signature"]
      }
    ]
  },

  // =========================================================================
  // 4. JD MINING PRO
  // =========================================================================
  {
    id: "mining-pro",
    name: "JD Mining Pro",
    tagline: "BUILT FOR THE TOUGHEST CONDITIONS. TRUSTED EVERY SHIFT. ENGINEERED TO PERFORM.",
    description:
      "From the mine face to the boardroom, JD Mining Pro jackets are engineered for safety, comfort and endurance—delivering certified 360° high-visibility protection and extreme durability for African mining professionals.",
    pdfUrl: "/assets/pdfs/JD_Mining_Pro_TWO_PAGE_SPREADS.pdf",
    cataloguePdf: "/assets/pdfs/JD_Mining_Pro_TWO_PAGE_SPREADS.pdf",
    coverImage: "/assets/images/covers/mining-pro-cover.jpg",
    pdfPages: "6",
    idealFor: [
      "Underground & Open-Pit Surface Mining",
      "Mineral Processing Plants & Smelters",
      "Maintenance, Drilling & Engineering Contractors",
      "Mine Supervisors, Surveyors & Site Management",
      "Heavy Fleet & Plant Operators",
      "Safety, Rescue & Perimeter Shift Teams"
    ],
    features: [
      "Certified compliance: EN ISO 20471 High Visibility, EN 343 Weather Protection, EN 14058 Cold Protection & SABS Approved",
      "360° advanced reflective tape detailing for daytime contrast and night-shift visibility",
      "Heavy-duty abrasion-resistant fabrics with reinforced stitching and YKK® zippers",
      "Industrial Texture Sublimation inspired by the strength of Africa's mineral landscape",
      "OEKO-TEX® Standard 100 safe fabrics in Men's Fit (S–5XL) and Ladies Fit™ (XS–3XL)",
      "Three expressions: Plain, Trimmed, and Industrial Texture Sublimation"
    ],
    products: [
      {
        sku: "JMP-SS01",
        name: "Executive Mining Softshell",
        fit: "Men's & Ladies Site Fit",
        slidePage: 1,
        features: [
          "Lightweight, flexible wind-resistant and water-repellent industrial softshell",
          "Reflective detailing for enhanced visibility from engineering offices to pit inspections",
          "Heavy-duty YKK® zippers and reinforced seam stitching",
          "Available in Plain, Trimmed and Industrial Texture Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Safety Orange", "Hi-Vis Yellow", "Charcoal", "Black", "Steel Grey"],
        customization: [
          "Logo Embroidery",
          "Name Embroidery",
          "360° Reflective Layouts",
          "Industrial Texture Sublimation",
          "JD Three-Dot Signature"
        ]
      },
      {
        sku: "JMP-PF01",
        name: "Executive Mining Puffer",
        fit: "Men's & Ladies Site Fit",
        slidePage: 2,
        features: [
          "Lightweight high-performance insulation with a sharp supervisor look",
          "Water-repellent outer shell with zipped chest and side pockets",
          "Elasticated cuffs and inner security pocket",
          "Ideal for mine supervisors, geologists and site engineers"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Charcoal", "Black", "Safety Orange", "Hi-Vis Yellow"],
        customization: [
          "Logo Embroidery",
          "Name Embroidery",
          "Reflective Tape",
          "Industrial Texture Sublimation",
          "JD Three-Dot Signature"
        ]
      },
      {
        sku: "JMP-PF02",
        name: "Heavy-Duty Mining Puffer",
        fit: "Industrial Insulated Fit",
        slidePage: 2,
        features: [
          "High-loft thermal insulation built for long shifts in intense cold environments",
          "Windproof and water-repellent shell with 360° reflective tape on body and arms",
          "Adjustable storm hood, adjustable hem and heavy-duty YKK® zippers",
          "Reinforced stitching engineered to withstand harsh mining conditions"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Safety Orange/Navy", "Hi-Vis Yellow/Navy", "Navy", "Charcoal", "Black"],
        customization: [
          "Logo Embroidery",
          "Name Embroidery",
          "360° Reflective Tape",
          "Industrial Texture Sublimation",
          "JD Three-Dot Signature"
        ]
      },
      {
        sku: "JMP-PK01",
        name: "Executive Mining Parka",
        fit: "Supervisor Parka Fit",
        slidePage: 3,
        features: [
          "Premium thermal insulation with waterproof and windproof outer shell",
          "360° reflective tape across body and arms for site compliance",
          "Thermal-lined collar, adjustable storm hood and adjustable cuffs",
          "Designed for supervisors and engineers across open-pit and plant sites"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Orange", "Hi-Vis Yellow", "Charcoal", "Black", "Red", "Steel Grey"],
        customization: ["Logo Embroidery", "Name Embroidery", "Reflective Layouts", "JD Three-Dot Signature"]
      },
      {
        sku: "JMP-PK02",
        name: "Heavy-Duty Mining Parka",
        fit: "Full-Protection Shift Fit",
        slidePage: 3,
        features: [
          "Thigh-length insulated parka with thermal fleece lining for full shift protection",
          "Storm flap with snap and heavy-duty YKK® zipper closure",
          "Detachable storm hood, adjustable cuffs and multiple secure tool pockets",
          "Built for harsh surface mining conditions"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Orange/Navy", "Hi-Vis Yellow/Navy", "Navy", "Charcoal", "Black"],
        customization: ["Logo Embroidery", "Name Embroidery", "360° Reflective Layouts", "JD Three-Dot Signature"]
      },
      {
        sku: "JMP-PK03",
        name: "Extreme Cold Mining Parka",
        fit: "Sub-Zero Duty Fit",
        slidePage: 3,
        features: [
          "Warmest mining parka engineered for extreme winter night shifts",
          "Waterproof, windproof and breathable shell with plush fleece-lined hood",
          "Detachable faux-fur hood trim option and heat-locking ribbed inner cuffs",
          "Multiple secure storage pockets for radios, gas monitors and tools"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Charcoal", "Black", "Navy", "Steel Grey"],
        customization: ["Logo Embroidery", "Name Embroidery", "Reflective Detailing", "JD Three-Dot Signature"]
      },
      {
        sku: "JMP-PK04",
        name: "Hi-Vis Long Mining Parka",
        fit: "Night-Shift High-Vis Fit",
        slidePage: 3,
        features: [
          "Extended length coverage with high-contrast fluorescent shell and 360° reflective tape",
          "EN ISO 20471 high-visibility design built specifically for low-light and night shifts",
          "Water-repellent and windproof outer fabric with inner security pocket",
          "Thermal-lined collar and adjustable storm cuffs"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Hi-Vis Yellow/Navy", "Safety Orange/Navy"],
        customization: ["Logo Embroidery", "Name Embroidery", "360° Reflective Tape", "JD Three-Dot Signature"]
      },
      {
        sku: "JMP-BW01",
        name: "Mining Bodywarmer (Plain / Trimmed / Hi-Vis)",
        fit: "Over-Workwear Layering Fit",
        slidePage: 5,
        features: [
          "Insulated core warmth with unrestricted arm movement for plant and maintenance crews",
          "Water-repellent outer shell with microfleece lining for extra warmth",
          "Full front YKK® zip, secure zip hand pockets and adjustable hem",
          "Available in Plain, Trimmed and EN ISO 20471 Hi-Vis Reflective editions"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Orange", "Hi-Vis Yellow", "Charcoal", "Black", "Red", "Steel Grey"],
        customization: ["Logo Embroidery", "Name Embroidery", "Hi-Vis Reflective Tape", "JD Three-Dot Signature"]
      },
      {
        sku: "JMP-FL01",
        name: "Technical Mining Fleece Jacket (Plain / Trimmed / Hi-Vis)",
        fit: "Active Shift Mid-Layer Fit",
        slidePage: 5,
        features: [
          "Anti-pill microfleece fabric retaining body heat without bulk",
          "Soft, warm and breathable stretch construction for unrestricted mobility",
          "Available in Plain, Contrast Trimmed and Hi-Vis Reflective upper-panel styles",
          "Ideal as a standalone cool-shift jacket or mid-layer beneath mining parkas"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Orange", "Hi-Vis Yellow", "Charcoal", "Black", "Steel Grey"],
        customization: ["Logo Embroidery", "Name Embroidery", "Hi-Vis Reflective Tape", "JD Three-Dot Signature"]
      },
      {
        sku: "JMP-HV01",
        name: "Hi-Vis Softshell Safety Jacket",
        fit: "Certified High-Vis Fit",
        slidePage: 6,
        features: [
          "EN ISO 20471 & SABS compliant high-contrast softshell with 360° reflective tape",
          "Lightweight, flexible and water-repellent shell with reinforced shoulders",
          "Zipped chest and side pockets for comms and site credentials",
          "Adjustable cuffs and hem for day and night shift operations"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Safety Orange/Navy", "Hi-Vis Yellow/Navy", "Red/Charcoal", "Steel Grey/Charcoal"],
        customization: ["Logo Embroidery", "Name Embroidery", "360° Reflective Tape", "JD Three-Dot Signature"]
      },
      {
        sku: "JMP-HV02",
        name: "Hi-Vis Padded Safety Jacket",
        fit: "Certified High-Vis Fit",
        slidePage: 6,
        features: [
          "Thermal padded high-visibility jacket for day-to-day cold shift operations",
          "Water-repellent and wind-resistant shell with 360° reflective body and arm bands",
          "Elasticated cuffs and high-contrast lower dirt-guard panels",
          "Compliant with EN ISO 20471, EN 343 and SABS safety standards"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Hi-Vis Yellow/Navy", "Safety Orange/Navy"],
        customization: ["Logo Embroidery", "Name Embroidery", "360° Reflective Tape", "JD Three-Dot Signature"]
      },
      {
        sku: "JMP-HV03",
        name: "Hi-Vis Extreme Parka Jacket",
        fit: "Certified High-Vis Fit",
        slidePage: 6,
        features: [
          "Heavy thermal insulation with EN 343 windproof and water-repellent protection",
          "360° reflective tape, reinforced high-wear shoulders and detachable adjustable hood",
          "Multiple secure pockets for tools and PPE essentials",
          "Built for harsh open-cast night operations"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Safety Orange/Navy", "Hi-Vis Yellow/Navy"],
        customization: ["Logo Embroidery", "Name Embroidery", "360° Reflective Tape", "JD Three-Dot Signature"]
      },
      {
        sku: "JMP-HV04",
        name: "Hi-Vis Bomber Jacket",
        fit: "Classic Bomber Workwear Fit",
        slidePage: 6,
        features: [
          "Classic bomber silhouette with ribbed cuffs and hem sealing out dust and cold drafts",
          "Warm quilted lining, water-repellent shell and 360° reflective visibility bands",
          "Ideal for haul-truck operators, plant drivers and yard supervisors",
          "EN ISO 20471 & SABS compliant construction"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Hi-Vis Yellow/Navy", "Safety Orange/Navy"],
        customization: ["Logo Embroidery", "Name Embroidery", "360° Reflective Tape", "JD Three-Dot Signature"]
      }
    ]
  },

  // =========================================================================
  // 5. JD LOGISTICS PRO
  // =========================================================================
  {
    id: "logistics-pro",
    name: "JD Logistics Pro",
    tagline: "PERFORMANCE IN MOTION. BUILT FOR EVERY ENVIRONMENT.",
    description:
      "Built for long hours and designed for results. Windbreakers, technical softshells, insulated parkas, bodywarmers and anti-pill fleeces engineered for courier, freight, cold-storage and warehouse teams that keep supply chains moving.",
    pdfUrl: "/assets/pdfs/JD_Logistics_Pro_TWO_PAGE_SPREADS.pdf",
    cataloguePdf: "/assets/pdfs/JD_Logistics_Pro_TWO_PAGE_SPREADS.pdf",
    coverImage: "/assets/images/covers/logistics-pro-cover.jpg",
    pdfPages: "6",
    idealFor: [
      "Warehouse & Distribution Hub Teams",
      "Courier & Last-Mile Delivery Fleets",
      "Long-Haul Transport & Fleet Operations",
      "Cross-Docking & Yard Operations",
      "Cold Storage & Night-Shift Logistics",
      "Port, Air Cargo & Terminal Operations"
    ],
    features: [
      "EN ISO 20471 high-visibility options and OEKO-TEX® Standard 100 certified fabrics",
      "360° reflective piping and tape for early-morning and night dispatch safety",
      "Exclusive Industrial Texture Sublimation capturing supply-chain motion and precision",
      "Water-repellent and wind-resistant shells with YKK® heavy-duty zippers",
      "Men's Fit (S–5XL) and Ladies Fit™ (XS–3XL) across all fleet garments",
      "Three expressions: Plain, Trimmed, and Industrial Texture Sublimation"
    ],
    products: [
      {
        sku: "JLP-WB01",
        name: "Windbreaker Jacket — Plain",
        fit: "Ergonomic Motion Fit",
        slidePage: 4,
        features: [
          "Lightweight, wind-resistant and water-repellent shell for light rain and wind",
          "Breathable mesh lining regulating temperature during active parcel handling",
          "Elastic cuffs and hem with secure side zip pockets",
          "Packable easy-carry design stowing neatly in vehicle cabs"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Red", "Black", "Hi-Vis Yellow", "Steel Grey"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Prints",
          "Team Colours & Branding",
          "Logo Placement"
        ]
      },
      {
        sku: "JLP-WB02",
        name: "Windbreaker Jacket — Trimmed",
        fit: "Ergonomic Motion Fit",
        slidePage: 4,
        features: [
          "Sharp contrast shoulder and chest trims elevating corporate fleet identity",
          "Water-repellent and wind-resistant shell with reflective piping for visibility",
          "Adjustable hood with toggles, elastic cuffs and secure YKK® zip pockets",
          "Engineered for on-the-go courier and delivery teams"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy/Red", "Black/Red", "Charcoal/Orange"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Prints",
          "Team Colours & Branding",
          "Logo Placement"
        ]
      },
      {
        sku: "JLP-WB03",
        name: "Windbreaker Jacket — Hi-Vis Trimmed",
        fit: "360° Visibility Motion Fit",
        slidePage: 4,
        features: [
          "High-visibility upper yoke and sleeves with 360° reflective tape",
          "Lightweight, breathable and water-repellent shell for day and night visibility",
          "Elastic cuffs, adjustable hem and secure scanner/document zip pockets",
          "Ideal for roadside delivery drivers, yard marshals and cross-docking crews"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Hi-Vis Yellow/Navy", "Hi-Vis Yellow/Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "360° Reflective Prints",
          "Logo Placement"
        ]
      },
      {
        sku: "JLP-WB04",
        name: "Windbreaker Jacket — Industrial Texture",
        fit: "Dynamic Sublimated Fit",
        slidePage: 4,
        features: [
          "Signature Industrial Texture sublimation pattern capturing supply-chain motion",
          "Water-repellent, wind-resistant, lightweight and packable construction",
          "Secure YKK® zip pockets and adjustable toggle hood",
          "Modern, dynamic fleet appearance built for logistics professionals"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Charcoal/Red", "Navy/Red", "Black/Steel Grey"],
        customization: [
          "Industrial Texture Sublimation",
          "Embroidery",
          "Heat Transfer",
          "Reflective Prints"
        ]
      },
      {
        sku: "JLP-SS01",
        name: "Technical Performance Softshell",
        fit: "All-Day Shift Fit",
        slidePage: 5,
        features: [
          "All-weather defence: water-repellent, wind-resistant and highly breathable stretch shell",
          "Light insulation with moisture management keeping drivers dry and focused",
          "Reinforced construction with purposeful zip pockets for scanners and dispatch devices",
          "Available in Plain, Trimmed and Industrial Texture Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Black", "Charcoal", "Red", "Orange", "Hi-Vis Yellow", "Steel Grey"],
        customization: [
          "Plain",
          "Trimmed",
          "Industrial Texture Sublimation",
          "Embroidery",
          "Reflective Prints"
        ]
      },
      {
        sku: "JLP-PK01",
        name: "Fleet Insulated Padded Parka",
        fit: "Extreme Cold & Night-Haul Fit",
        slidePage: 5,
        features: [
          "High thermal comfort rating (5/5) engineered for cold-chain storage and winter night hauls",
          "Water-repellent and wind-resistant outer shell with reinforced seams",
          "Heavy-duty YKK® zippers, adjustable storm hood and secure cargo pockets",
          "Available with corporate contrast trims or EN ISO 20471 reflective layouts"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Black", "Charcoal", "Red", "Hi-Vis Yellow", "Steel Grey"],
        customization: ["Embroidery", "Heat Transfer", "Reflective Prints", "Logo Placement"]
      },
      {
        sku: "JLP-BW01",
        name: "Logistics Bodywarmer (Plain / Trimmed / Hi-Vis Trimmed)",
        fit: "Layering Utility Fit",
        slidePage: 6,
        features: [
          "Medium-loft core warmth with total arm freedom for loading, picking and driving",
          "Soft fleece inner lining, water-repellent outer shell and adjustable hem",
          "YKK® zippers and secure zip pockets for everyday warehouse essentials",
          "Available in Plain, Contrast Trimmed and 360° Hi-Vis Trimmed versions"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Red", "Charcoal", "Black", "Hi-Vis Yellow", "Steel Grey"],
        customization: ["Embroidery", "Heat Transfer", "Reflective Prints", "Logo Placement"]
      },
      {
        sku: "JLP-FL01",
        name: "Logistics Fleece Jacket (Plain / Trimmed / Hi-Vis Trimmed)",
        fit: "Warehouse Comfort Fit",
        slidePage: 6,
        features: [
          "Soft, warm and breathable anti-pill fleece fabric built for long-lasting daily wear",
          "Stretch construction for comfort and mobility across cool mornings and night shifts",
          "Adjustable hem, YKK® front zipper and secure zip hand pockets",
          "Available in Plain, Trimmed and Hi-Vis Reflective Trimmed editions"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Navy", "Red", "Charcoal", "Black", "Hi-Vis Yellow", "Steel Grey"],
        customization: ["Embroidery", "Heat Transfer", "Reflective Prints", "Logo Placement"]
      }
    ]
  },

  // =========================================================================
  // 6. JD TACTICAL PRO
  // =========================================================================
  {
    id: "tactical-pro",
    name: "JD Tactical Pro",
    tagline: "READY FOR THE MISSION. BUILT FOR THE PROFESSIONAL.",
    description:
      "Engineered for those who operate in high-demand environments. JD Tactical Pro combines functional multi-pocket design, reinforced materials and precision topographic aesthetics to keep security, CIT, aviation and ranger teams mission-ready.",
    pdfUrl: "/assets/pdfs/JD_Tactical_Pro_TWO_PAGE_SPREADS.pdf",
    cataloguePdf: "/assets/pdfs/JD_Tactical_Pro_TWO_PAGE_SPREADS.pdf",
    coverImage: "/assets/images/covers/tactical-pro-cover.jpg",
    pdfPages: "6",
    idealFor: [
      "Private Security & Facility Protection Teams",
      "Cash-in-Transit (CIT) & Armed Response Units",
      "VIP Protection & Aviation Security",
      "Wildlife Rangers & Anti-Poaching Patrols",
      "Emergency Response & Search Operations",
      "Security Supervisors & Field Operations Leaders"
    ],
    features: [
      "Signature Topographic Tactical Sublimation pattern inspired by navigation & mission planning",
      "Hook-and-loop ID / patch attachment panels, shoulder epaulettes, name tag strips & utility pouches",
      "Reinforced shoulder panels, heavy-duty YKK® zippers and DWR water-repellent shells",
      "Operational colourways: Black, Graphite Grey, Ranger Green, Coyote Brown, Midnight Navy",
      "Men's Fit (S–5XL) and Ladies Fit™ (XS–3XL) with 5–10 working day customisation turnaround",
      "Three expressions: Plain, Trimmed, and Topographic / Tactical Camo Sublimation"
    ],
    products: [
      {
        sku: "JTP-FJ01",
        name: "Utility Field Jacket",
        fit: "Field Operations Fit",
        slidePage: 1,
        features: [
          "Maximum 5/5 pocket utility and durability rating for demanding field operations",
          "Multi-functional front cargo pockets, reinforced shoulders and storm placket",
          "Water-repellent and wind-resistant shell built to go the distance",
          "Supports shoulder epaulettes, ID patch panels, name tag strips and utility pouches"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Graphite Grey", "Ranger Green", "Coyote Brown", "Midnight Navy"],
        customization: [
          "Embroidery",
          "ID / Patch Panels",
          "Shoulder Epaulettes",
          "Name Tag Strip",
          "Reflective Tape",
          "Topographic Sublimation"
        ]
      },
      {
        sku: "JTP-AV01",
        name: "Tactical Aviator Edition",
        fit: "Command Aviator Fit",
        slidePage: 2,
        features: [
          "Iconic aviator command silhouette with rib-knit collar, cuffs and waistband",
          "Water-repellent outer shell with reinforced shoulder panels and YKK® zippers",
          "Secure chest zip pocket, utility sleeve pocket and inside document pocket",
          "Hook-and-loop ID & patch attachment panel; Plain, Trimmed or Topographic Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Tactical Black", "Ranger Green", "Midnight Navy", "Coyote Brown"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "ID / Patch Panels",
          "Reflective Prints",
          "Topographic Sublimation"
        ]
      },
      {
        sku: "JTP-SS01",
        name: "Executive Tactical Softshell",
        fit: "Supervisor & Operations Fit",
        slidePage: 3,
        features: [
          "Advanced DWR water-repellent and wind-resistant stretch softshell with ventilated back yoke",
          "YKK® zippers, secure chest zip pocket and internal security pockets",
          "Sleeve ID & patch attachment panel, adjustable cuffs and adjustable hem",
          "Ideal for supervisors, managers and team leaders moving between office and field"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Graphite Grey", "Ranger Green", "Coyote Brown", "Midnight Navy"],
        customization: [
          "Embroidery",
          "ID / Patch Panels",
          "Reflective Prints",
          "Name Tag Strip",
          "Topographic Sublimation"
        ]
      },
      {
        sku: "JTP-WB01",
        name: "Tactical Windbreaker",
        fit: "Active Duty Lightweight Fit",
        slidePage: 4,
        features: [
          "Ultra-lightweight easy-pack tactical layer blocking wind and light rain",
          "Breathable mesh lining promoting airflow and reducing heat build-up on patrol",
          "Elastic cuffs, adjustable toggle hood and adjustable hem for a secure fit",
          "Available in Plain, Trimmed and Topographic Tactical Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Graphite Grey", "Ranger Green", "Coyote Brown", "Midnight Navy"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Prints",
          "ID / Patch Panels",
          "Topographic Sublimation"
        ]
      },
      {
        sku: "JTP-PK01",
        name: "Heavy-Duty Tactical Parka",
        fit: "Extreme Cold & Duty Fit",
        slidePage: 4,
        features: [
          "Maximum 5/5 thermal insulation, waterproof and wind-resistant protection for cold zones",
          "Storm flap with two-way YKK® zipper, adjustable hood and heat-locking cuffs",
          "Reinforced shoulders, secure chest & utility pockets, and sleeve ID & patch panel",
          "Five finishes: Plain, Trimmed, Hi-Vis Trimmed, Topographic & Tactical Camo Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Graphite Grey", "Ranger Green", "Coyote Brown", "Midnight Navy"],
        customization: [
          "Embroidery",
          "ID / Patch Panels",
          "Reflective Tape",
          "Shoulder Epaulettes",
          "Topographic / Camo Sublimation"
        ]
      },
      {
        sku: "JTP-BW01",
        name: "Tactical Bodywarmer",
        fit: "Core Warmth Mobility Fit",
        slidePage: 5,
        features: [
          "Insulated core warmth with sleeveless design for unrestricted weapon and equipment handling",
          "Moisture-wicking breathable comfort and reinforced stitching for tough duty",
          "Multiple utility zip pockets; ideal standalone or mid-layer beneath tactical parkas",
          "Available in Plain, Trimmed and Topographic Tactical Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Graphite Grey", "Ranger Green", "Coyote Brown", "Midnight Navy"],
        customization: [
          "Embroidery",
          "ID / Patch Panels",
          "Reflective Prints",
          "Name Tag Strip",
          "Topographic Sublimation"
        ]
      },
      {
        sku: "JTP-FL01",
        name: "Tactical Fleece Jacket",
        fit: "Layering Patrol Fit",
        slidePage: 5,
        features: [
          "Soft anti-pill fleece delivering warm, lightweight breathable comfort on night duty",
          "Full-zip front with secure pockets, stretch flexibility and reinforced stitching",
          "Quick-dry easy-care maintenance built for everyday shift rotation",
          "Available in Plain, Trimmed and Topographic Tactical Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        colors: ["Black", "Graphite Grey", "Ranger Green", "Coyote Brown", "Midnight Navy"],
        customization: [
          "Embroidery",
          "ID / Patch Panels",
          "Name Tag Strip",
          "Topographic Sublimation"
        ]
      }
    ]
  },

  // =========================================================================
  // 7. JD HEALTHCARE PRO
  // =========================================================================
  {
    id: "healthcare-pro",
    name: "JD Healthcare Pro",
    tagline: "PROFESSIONAL WARMTH FOR HEALTHCARE HEROES. BUILT FOR CARE. DESIGNED FOR YOU.",
    description:
      "Engineered for the long hours, night shifts and unpredictable conditions of clinical environments. JD Healthcare Pro delivers hygienic easy-care fabrics, lightweight warmth and calm clinical authority for doctors, nurses, pharmacists and emergency teams.",
    pdfUrl: "/assets/pdfs/JD_Healthcare_Pro_TWO_PAGE_SPREADS.pdf",
    cataloguePdf: "/assets/pdfs/JD_Healthcare_Pro_TWO_PAGE_SPREADS.pdf",
    coverImage: "/assets/images/covers/healthcare-pro-cover.jpg",
    pdfPages: "6",
    idealFor: [
      "Hospitals, Clinics & Specialist Medical Centres",
      "Doctors, Surgeons & Clinical Consultants",
      "Nurses, Midwives & Ward Caregivers",
      "Pharmacists & Laboratory Professionals",
      "Ambulance & Emergency Response Teams",
      "Hospital Administrators, Allied & Home Healthcare Teams"
    ],
    features: [
      "Water-repellent DWR outer shells with breathable moisture-escape membranes",
      "Quick-dry, odour-resistant and machine-washable easy-care clinical fabrics",
      "Three tailored length options on Puffers and Parkas: Hip, Below-Hip (NEW), and Knee Length",
      "Men's Fit™ (S–3XL) and contoured Ladies Fit™ (XS–3XL) sizing",
      "Smart clinical pocketing for ID cards, pens, stethoscopes and mobile devices",
      "Clinical palette: Navy Blue, Sky Blue, Teal, Charcoal Grey, Medical Blue, Medical White, Black"
    ],
    products: [
      {
        sku: "JHP-AV01",
        name: "Healthcare Aviator Edition (NEW)",
        fit: "Men's & Ladies Clinical Fit",
        slidePage: 1,
        features: [
          "New modern clinical aviator silhouette with rib-knit collar and cuffs",
          "Premium lightweight insulation with water-repellent and wind-resistant shell",
          "Smart secure pockets for ID badges, pens and ward devices",
          "Durable easy-care construction for doctors, specialists and hospital leadership"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Sky Blue", "Teal", "Charcoal Grey", "Medical White"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Department & Role Branding",
          "JD Three-Dot Logo"
        ]
      },
      {
        sku: "JHP-PF01-H",
        name: "Premium Healthcare Puffer Jacket (Hip Length)",
        fit: "Men's Fit™ & Ladies Fit™",
        length: "Hip Length",
        slidePage: 2,
        features: [
          "High-performance synthetic fill trapping warmth while remaining light and packable",
          "Advanced DWR water-repellent and wind-resistant outer shell",
          "Soft smooth inner lining for friction-free comfort over scrubs",
          "Multiple smart storage pockets for long shifts and ward rounds"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Sky Blue", "Teal", "Charcoal Grey", "Medical White"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Team Colours & Branding",
          "Logo Placement"
        ]
      },
      {
        sku: "JHP-PF01-BH",
        name: "Premium Healthcare Puffer Jacket (Below-Hip Length)",
        fit: "Men's Fit™ & Ladies Fit™",
        length: "Below-Hip Length",
        slidePage: 2,
        features: [
          "New below-hip length delivering extra coverage and warmth with a sleek clinical fit",
          "Water-repellent, wind-resistant outer shell with quick-dry easy maintenance",
          "High-loft synthetic insulation retaining warmth during cold night duties",
          "Available in Men's Fit™ (S–3XL) and contoured Ladies Fit™ (XS–3XL)"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Sky Blue", "Teal", "Charcoal Grey", "Medical White"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Team Colours & Branding",
          "Logo Placement"
        ]
      },
      {
        sku: "JHP-PF01-KL",
        name: "Premium Healthcare Puffer Jacket (Knee Length)",
        fit: "Men's Fit™ & Ladies Fit™",
        length: "Knee Length",
        slidePage: 2,
        features: [
          "Maximum knee-length protection for cold outdoor hospital transfers and emergency duty",
          "Lightweight synthetic insulation with DWR splash and rain protection",
          "Smooth easy-glide zippers and deep secure pockets",
          "Machine-washable quick-dry fabric engineered for daily healthcare service"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Sky Blue", "Teal", "Charcoal Grey", "Medical White"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Team Colours & Branding",
          "Logo Placement"
        ]
      },
      {
        sku: "JHP-BW01",
        name: "Premium Healthcare Bodywarmer Vest",
        fit: "Men's Fit™ & Ladies Fit™",
        slidePage: 3,
        features: [
          "Insulated front and back panels keeping core warm without overheating on busy wards",
          "Sleeveless design allowing maximum arm freedom for patient care and lab precision",
          "DWR water-repellent finish protecting against light rain and splashes",
          "Lightweight, packable, odour-resistant and quick-dry fabric"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Sky Blue", "Teal", "Charcoal Grey", "Medical Blue", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Department Branding",
          "Logo Placement"
        ]
      },
      {
        sku: "JHP-FL01",
        name: "Healthcare Soft-Comfort Fleece Jacket",
        fit: "Men's Fit™ & Ladies Fit™",
        slidePage: 3,
        features: [
          "Skin-friendly soft inner anti-pill microfleece for indoor clinics, labs and cool night wards",
          "Excellent heat retention without bulk and breathable moisture control",
          "Anti-pill finish for a crisp long-lasting professional appearance",
          "Easy-care machine-washable and quick-drying material"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Teal", "Charcoal Grey", "Medical Blue", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Department Branding",
          "Logo Placement"
        ]
      },
      {
        sku: "JHP-SS01",
        name: "Executive Healthcare Softshell",
        fit: "Men's Fit™ & Ladies Fit™",
        slidePage: 4,
        features: [
          "3-layer fabric system: DWR water-repellent outer, wind-resistant membrane & soft anti-pill microfleece inner",
          "Moisture-wicking breathable comfort keeping clinicians fresh across 12-hour shifts",
          "Smart secure pocketing for ID cards, pens and clinical devices",
          "Odour-resistant, easy-care and quick-dry finish"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Sky Blue", "Teal", "Charcoal Grey", "Medical White"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Logo Placement"
        ]
      },
      {
        sku: "JHP-PP01",
        name: "Insulated Healthcare Puffer Parka (3 Lengths)",
        fit: "Men's Fit™ & Ladies Fit™",
        length: "Hip / Below-Hip / Knee Length",
        slidePage: 5,
        features: [
          "Maximum high-loft insulation engineered for extreme cold, mobile clinics and ambulance response",
          "Available in Hip, Below-Hip (NEW) and Knee Length across Men's and Ladies Fit™",
          "Water-repellent and wind-blocking shell with adjustable storm hood and smooth taffeta lining",
          "Deep functional zip pockets and reinforced stitching"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Teal", "Charcoal Grey", "Medical Blue", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Emergency Details",
          "Logo Placement"
        ]
      },
      {
        sku: "JHP-LP01",
        name: "Lightweight Healthcare Parka Jacket (3 Lengths)",
        fit: "Men's Fit™ & Ladies Fit™",
        length: "Hip / Below-Hip / Knee Length",
        slidePage: 6,
        features: [
          "Everyday weather-protective breathable shell with lightweight insulated padding",
          "Available in Hip, Below-Hip (NEW) and Knee Length for every clinical role",
          "Adjustable hood, secure pockets and smooth zips keeping staff warm, not hot",
          "Easy-care quick-dry fabric built for early mornings to night shifts"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Teal", "Charcoal Grey", "Medical Blue", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Logo Placement"
        ]
      }
    ]
  },

  // =========================================================================
  // 8. JD CAMPUS PRO
  // =========================================================================
  {
    id: "campus-pro",
    name: "JD Campus Pro",
    tagline: "SCHOOL. COLLEGE. CAMPUS. ONE IDENTITY.",
    description:
      "Premium outerwear that brings students, staff, societies and academic leadership together with comfort, confidence and campus pride—built for early classes, rainy commutes, sports sidelines and study nights.",
    pdfUrl: "/assets/pdfs/JD_Campus_Pro_TWO_PAGE_SPREADS.pdf",
    cataloguePdf: "/assets/pdfs/JD_Campus_Pro_TWO_PAGE_SPREADS.pdf",
    coverImage: "/assets/images/covers/campus-pro-cover.jpg",
    pdfPages: "6",
    idealFor: [
      "Primary & High Schools (Students, Prefects & Teachers)",
      "Colleges, Universities & Academic Faculties",
      "StudentRepresentative Councils, Clubs & Societies",
      "Campus Sports Teams, Choirs & Touring Houses",
      "Graduating Classes & Alumni Associations",
      "Academic Leadership & Administrative Staff"
    ],
    features: [
      "Three ways to wear your identity: Plain, Contrast Trimmed, and Campus Sublimation",
      "Core institutional palette: Navy Blue, Bottle Green, Maroon, Royal Blue, Charcoal Grey, Black",
      "Men's Fit™ (S–3XL) and Ladies Fit™ (XS–3XL) across Parkas, Softshells, Bodywarmers & Fleeces",
      "Waterproof / water-repellent, windproof and breathable easy-care machine-washable fabrics",
      "Full crest embroidery, heat transfer, reflective safety details, society logos & student name personalisation"
    ],
    products: [
      {
        sku: "JCA-PK01-H",
        name: "Campus Parka Jacket (Hip Length)",
        fit: "Men's Fit™ & Ladies Fit™",
        length: "Hip Length",
        slidePage: 1,
        features: [
          "Smart and active hip-length waterproof and windproof campus parka",
          "Thermal insulation retaining warmth without bulk during cold morning commutes",
          "Adjustable drawstring hood, inner storm flap, adjustable cuffs and multi-pocket utility",
          "Available in Plain, Trimmed and custom Campus Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Bottle Green", "Maroon", "Royal Blue", "Charcoal Grey", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Team & Society Logos",
          "Names & Initials",
          "Department Branding",
          "Campus Sublimation"
        ]
      },
      {
        sku: "JCA-PK01-BH",
        name: "Campus Parka Jacket (Below-Hip Length)",
        fit: "Men's Fit™ & Ladies Fit™",
        length: "Below-Hip Length",
        slidePage: 1,
        features: [
          "Ideal balance of extended below-hip warmth, weather protection and institutional style",
          "Waterproof and windproof outer fabric with breathable thermal lining",
          "Premium zipper with inner storm flap, drawstring hood and secure student pockets",
          "Machine washable and quick drying for everyday school and college wear"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Bottle Green", "Maroon", "Royal Blue", "Charcoal Grey", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Team & Society Logos",
          "Names & Initials",
          "Department Branding",
          "Campus Sublimation"
        ]
      },
      {
        sku: "JCA-PK01-KL",
        name: "Campus Parka Jacket (Knee Length)",
        fit: "Men's Fit™ & Ladies Fit™",
        length: "Knee Length",
        slidePage: 1,
        features: [
          "Ultimate knee-length cold-weather protection for winter mornings, sports tours and weekend trips",
          "Waterproof, windproof and thermally insulated durable shell",
          "Adjustable storm cuffs, drawstring hood and deep multi-pocket storage",
          "Available in Plain, Contrast Trimmed and Campus Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Bottle Green", "Maroon", "Royal Blue", "Charcoal Grey", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Team & Society Logos",
          "Names & Initials",
          "Campus Sublimation"
        ]
      },
      {
        sku: "JCA-SS01",
        name: "Campus Softshell Jacket",
        fit: "Men's Fit™ & Ladies Fit™",
        slidePage: 3,
        features: [
          "Lightweight, flexible and wind/water-resistant softshell for classrooms, libraries and campus life",
          "Stretch & flex comfort moving freely from morning lectures to late-night study sessions",
          "Breathable fabric with secure zip pockets keeping phones, cards and keys safe",
          "Three ways to wear your identity: Plain, Trimmed and Campus Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Bottle Green", "Maroon", "Royal Blue", "Charcoal Grey", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Team & Society Logos",
          "Name Personalisation",
          "Campus Sublimation"
        ]
      },
      {
        sku: "JCA-BW01",
        name: "Campus Bodywarmer Vest",
        fit: "Men's Fit™ & Ladies Fit™",
        slidePage: 3,
        features: [
          "Lightweight insulated core warmth without bulk—perfect for cool mornings and breezy afternoons",
          "Easy layer system fitting neatly over school shirts, polo tops or knitwear",
          "Water-resistant durable shell with functional secure pockets",
          "Available in Plain, Contrast Trimmed and Campus Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Bottle Green", "Maroon", "Royal Blue", "Charcoal Grey", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Reflective Details",
          "Team & Society Logos",
          "Name Personalisation",
          "Campus Sublimation"
        ]
      },
      {
        sku: "JCA-FL01",
        name: "Campus Fleece Jacket",
        fit: "Men's Fit™ & Ladies Fit™",
        slidePage: 4,
        features: [
          "Ultra-soft cosy fleece delivering breathable warmth from early classes to cool evenings",
          "Full-zip comfort with embroidered crest zone, zip pockets, elastic cuffs and adjustable hem",
          "Durable machine-washable and quick-drying fabric built to last every semester",
          "Available in Plain, Trimmed and Campus Sublimation"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Bottle Green", "Maroon", "Royal Blue", "Charcoal Grey", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Name Personalisation",
          "Team & Society Logos",
          "Department Branding",
          "Graduating Class",
          "Campus Sublimation"
        ]
      },
      {
        sku: "JCA-EX01",
        name: "Faculty & College Leadership Jacket",
        fit: "Men's Fit™ & Ladies Fit™",
        slidePage: 5,
        features: [
          "Smart, professional and timeless outerwear unifying teachers, lecturers, Deans and student leaders",
          "Water-repellent, wind-resistant and thermally insulated breathable construction",
          "Multi-pocket utility and low-maintenance easy-care finish",
          "Supports Plain, Trimmed and custom faculty/house identity branding"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Navy Blue", "Bottle Green", "Maroon", "Royal Blue", "Charcoal Grey", "Black"],
        customization: [
          "Embroidery",
          "Heat Transfer",
          "Department Branding",
          "Names & Initials",
          "Campus Sublimation"
        ]
      }
    ]
  },

  // =========================================================================
  // 9. JD LIFESTYLE PRO
  // =========================================================================
  {
    id: "lifestyle-pro",
    name: "JD Lifestyle Pro",
    tagline: "FROM WORK TO LIFE. Style for every passion. Designed for every journey.",
    description:
      "Designed for professionals who live beyond the workplace. From after-work social occasions to sport, hobbies, travel and outdoor adventures - style, comfort and performance for every journey.",
    pdfUrl: "/assets/pdfs/JD_Lifestyle_Pro_2026-27_WEBSITE-1.pdf",
    cataloguePdf: "/assets/pdfs/JD_Lifestyle_Pro_2026-27_WEBSITE-1.pdf",
    coverImage: "/assets/images/covers/lifestyle-pro-cover.jpg",
    pdfPages: "16",
    idealFor: [
      "After-Work Corporate Socials & Executive Retreats",
      "Golf Days, Country Clubs & Racket Sport Leagues",
      "Corporate Cycling, Running & Wellness Clubs",
      "Fishing, Hiking, Adventure & Regional Travel",
      "Ladies & Gents Smart-Casual Lifestyle Dressing",
      "Coordinated Club Bundles & Executive Gifting Kits"
    ],
    features: [
      "Four lifestyle pillars: Signature, Sport & Hobbies, Adventure & Travel, and Accessories",
      "Three signature expressions: Plain (discreet JD three-dot), Trimmed, and Sublimation",
      "Ladies and Gents silhouettes across polos, summer bombers, overshirts and co-ords",
      "Coordinated Lifestyle Kits for golf, cycling, running and outdoor passions"
    ],
    products: [
      {
        sku: "LSP-SIG",
        name: "Signature Polos",
        slidePage: 3,
        features: [
          "Plain (discreet JD three-dot)",
          "Trimmed (contrast collar, placket, sleeve)",
          "Sublimation (compatible performance-fabric styles)"
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Black", "Navy", "White", "Olive", "Patterned"],
        customization: [
          "Chest (Three-dot)",
          "Collar & Cuffs",
          "Panels & Piping",
          "Full Sublimation"
        ]
      },
      {
        sku: "LSP-BOMB",
        name: "Sommer Bombers",
        slidePage: 4,
        features: [
          "Lightweight",
          "Stylish",
          "Versatile",
          "Plain and contrast-trim finishes"
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Black", "Navy", "Beige", "Maroon"],
        customization: [
          "Plain (Timeless)",
          "Trimmed (Modern accents)",
          "Sublimation (Stand out)"
        ]
      },
      {
        sku: "LSP-OVER",
        name: "Executive Overshirts",
        slidePage: 5,
        features: [
          "Polished casual",
          "Layering for social occasions and travel",
          "Front/back styling"
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
        colors: ["Black", "Navy", "Beige", "Olive"],
        customization: [
          "Plain (Refined & versatile)",
          "Trimmed (Premium accents)",
          "Sublimation (Modern patterns)"
        ]
      },
      {
        sku: "LSP-LADIES",
        name: "Ladies Lifestyle Co-ords & Dresses",
        slidePage: 6,
        features: [
          "Elegance beyond the office",
          "Co-ord separates",
          "Shirt dresses",
          "Smart casual fits"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL"],
        colors: ["Beige", "Blue", "Maroon"],
        customization: [
          "Plain (Sophisticated)",
          "Trimmed (Modern details)",
          "Sublimation (Distinctive designs)"
        ]
      },
      {
        sku: "LSP-GOLF",
        name: "Golf Collection",
        slidePage: 7,
        features: [
          "Performance on and off the course",
          "Golf polos, caps, visors, skorts and shorts",
          "Custom club colorways"
        ],
        sizes: ["S", "M", "L", "XL", "2XL"],
        colors: ["Black", "White", "Olive"],
        customization: [
          "Plain (Classic look)",
          "Trimmed (Premium accents)",
          "Sublimation (Course-inspired designs)"
        ]
      },
      {
        sku: "LSP-RACKET",
        name: "Racket Sports",
        slidePage: 8,
        features: [
          "Play in style",
          "Racket-sport tops, shorts and skorts",
          "Activity-specific movement"
        ],
        sizes: ["S", "M", "L", "XL", "2XL"],
        colors: ["Black", "White", "Navy"],
        customization: [
          "Plain (Clean & sharp)",
          "Trimmed (Sporty accents)",
          "Sublimation (Dynamic prints)"
        ]
      },
      {
        sku: "LSP-CYCLE",
        name: "Cycling Collection",
        slidePage: 9,
        features: [
          "Ride further together",
          "Full sublimation on compatible textiles",
          "Technical bib shorts"
        ],
        sizes: ["S", "M", "L", "XL", "2XL"],
        colors: ["Black", "Red", "White"],
        customization: [
          "Plain (Strong & sleek)",
          "Trimmed (Performance accents)",
          "Sublimation (Custom club designs)"
        ]
      },
      {
        sku: "LSP-RUN",
        name: "Running & Walking",
        slidePage: 10,
        features: [
          "Move with purpose",
          "Light & comfortable",
          "Team/club editions"
        ],
        sizes: ["S", "M", "L", "XL", "2XL"],
        colors: ["Black", "White", "Red", "Navy"],
        customization: [
          "Plain (Light & comfortable)",
          "Trimmed (Sporty details)",
          "Sublimation (Event & club designs)"
        ]
      },
      {
        sku: "LSP-OUTDOOR",
        name: "Outdoor Hobbies",
        slidePage: 11,
        features: [
          "Fishing, Hiking, Exploring",
          "Utility trousers and sun hats",
          "Functional"
        ],
        sizes: ["S", "M", "L", "XL", "2XL"],
        colors: ["Light Grey", "Olive", "Camo", "Navy"],
        customization: [
          "Plain (Functional)",
          "Trimmed (Rugged accents)",
          "Sublimation (Nature-inspired designs)"
        ]
      },
      {
        sku: "LSP-ACC",
        name: "Accessories Collection",
        slidePage: 13,
        features: [
          "The finishing touch",
          "Caps, visors, bucket hats, bags, gaiters, accessories"
        ],
        sizes: ["One Size"],
        colors: ["Black", "Navy", "Red", "Beige"],
        customization: ["Embroidery", "Transfer", "Printed panels"]
      },
      {
        sku: "LSP-KITS",
        name: "Lifestyle Kits",
        slidePage: 14,
        features: [
          "Coordinated style for every passion",
          "Golf Kit, Cycling Kit, Running Kit, Outdoor Kit"
        ],
        sizes: ["S", "M", "L", "XL", "2XL"],
        colors: ["Assorted"],
        customization: ["Bundle configurations"]
      }
    ]
  }
];

const COLLECTION_PAGE_TITLES: Record<string, string[]> = {
  "corporate-pro": [
    "Pages 01–02 • Collection Introduction",
    "Pages 03–04 • Executive Softshell Collection",
    "Pages 05–06 • Executive Puffer Collection",
    "Pages 07–08 • Executive Bodywarmer Collection",
    "Pages 09–10 • Executive Parka Collection",
    "Pages 11–12 • Product & Customisation Options"
  ],
  "sport-pro": [
    "Pages 01–02 • Performance Wear For Champions",
    "Pages 03–04 • Performance Softshell Collection",
    "Pages 05–06 • Team Puffer Collection",
    "Pages 07–08 • Windbreakers & Bodywarmers",
    "Pages 09–10 • Coaches & Support Staff Collection",
    "Pages 11–12 • Customisation System & Technical Specs"
  ],
  "safari-pro": [
    "Pages 01–02 • Born For Nature Overview",
    "Pages 03–04 • Puffer & Parka Options",
    "Pages 05–06 • Puffer & Parka Collection",
    "Pages 07–08 • Bodywarmer & Guides Jacket Collection",
    "Pages 09–10 • Bodywarmer & Guides Options",
    "Pages 11–12 • Big Five Library & Technical Specs"
  ],
  "mining-pro": [
    "Pages 01–02 • Core Mining Jacket Range",
    "Pages 03–04 • Puffer & Parka Collection",
    "Pages 05–06 • Insulated Parka Collection",
    "Pages 07–08 • Core Range & Customisation Options",
    "Pages 09–10 • Bodywarmer & Fleece Collection",
    "Pages 11–12 • 360° High-Visibility Collection"
  ],
  "logistics-pro": [
    "Pages 01–02 • Performance In Motion Overview",
    "Pages 03–04 • Bodywarmer & Fleece Spec Matrix",
    "Pages 05–06 • Technical Performance Options",
    "Pages 07–08 • Windbreaker & Lightweight Collection",
    "Pages 09–10 • Technical Softshell & Spec Comparison",
    "Pages 11–12 • Bodywarmer & Fleece Collection"
  ],
  "tactical-pro": [
    "Pages 01–02 • Tactical Operations Overview",
    "Pages 03–04 • Tactical Aviator Edition",
    "Pages 05–06 • Executive Tactical Softshell",
    "Pages 07–08 • Tactical Windbreaker & Heavy-Duty Parka",
    "Pages 09–10 • Tactical Bodywarmer & Fleece",
    "Pages 11–12 • Product Comparison & Add-On Options"
  ],
  "healthcare-pro": [
    "Pages 01–02 • Healthcare Outerwear & Aviator Edition",
    "Pages 03–04 • Premium Puffer Jackets (Three Lengths)",
    "Pages 05–06 • Premium Bodywarmer Vest & Fleece Jackets",
    "Pages 07–08 • Executive Softshell & Parka Collection",
    "Pages 09–10 • Insulated Puffer Parka (Three Lengths)",
    "Pages 11–12 • Lightweight Parka Jacket (Three Lengths)"
  ],
  "campus-pro": [
    "Pages 01–02 • All-Weather Campus Parka Jackets",
    "Pages 03–04 • Campus Parka Product Options",
    "Pages 05–06 • Softshell Jackets & Bodywarmer Vests",
    "Pages 07–08 • Campus Fleece Jackets",
    "Pages 09–10 • Built For Campus Life Overview",
    "Pages 11–12 • Softshell & Bodywarmer Options"
  ],
  "lifestyle-pro": [
    "Page 01 • Cover — From Work To Life",
    "Page 02 • Our Collection — Lifestyle For Every Passion",
    "Page 03 • Signature Polos — Classic Style, Modern Performance",
    "Page 04 • Sommer Bombers — Lightweight, Stylish, Versatile",
    "Page 05 • Executive Overshirts — Polished Casual",
    "Page 06 • Ladies Lifestyle Co-ords & Dresses",
    "Page 07 • Golf Collection — On & Off The Course",
    "Page 08 • Racket Sports — Play In Style",
    "Page 09 • Cycling Collection — Ride Further Together",
    "Page 10 • Running & Walking — Move With Purpose",
    "Page 11 • Outdoor Hobbies — Fishing, Hiking & Exploring",
    "Page 12 • Adventure & Travel — Ready For What's Next",
    "Page 13 • Accessories Collection — The Finishing Touch",
    "Page 14 • Lifestyle Kits — Coordinated Style Bundles",
    "Page 15 • JD Customization Profile — Plain, Trimmed & Sublimation",
    "Page 16 • Your JD Journey — Start A Project"
  ]
};

/**
 * Returns all HD catalog slides for a given collection ID (6 spreads for the
 * 8 outerwear collections, 16 pages for JD Lifestyle Pro).
 */
export function getCollectionSlides(collectionId: string): SlideInfo[] {
  const folder = normalizeCollectionId(collectionId);
  const titles = COLLECTION_PAGE_TITLES[folder] || [];
  const totalPages = titles.length || 6;
  const slides: SlideInfo[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const pageStr = String(i).padStart(2, "0");
    slides.push({
      pageNumber: i,
      title: titles[i - 1] || `Page ${i} of ${totalPages}`,
      image: `/gallery/slides/${folder}/page-${pageStr}.jpg`
    });
  }
  return slides;
}

/**
 * Returns the 0-based slide index where a specific product or jacket appears.
 */
export function getProductSlideIndex(
  collectionId: string,
  jacket: JacketItem | Product | CollectionItem
): number {
  if ("products" in jacket) {
    return 0;
  }

  const colSlug = normalizeCollectionId(collectionId);
  const maxSlideIdx = Math.max(0, (COLLECTION_PAGE_TITLES[colSlug]?.length || 6) - 1);

  if ("slidePage" in jacket && typeof jacket.slidePage === "number") {
    return Math.max(0, Math.min(maxSlideIdx, jacket.slidePage - 1));
  }

  const col = jacketsData.find((c) => c.id === colSlug);
  const sku = "sku" in jacket && jacket.sku ? jacket.sku.toUpperCase() : jacket.name.toUpperCase();

  if (col) {
    const matched = col.products.find(
      (p) => p.sku.toUpperCase() === sku || p.name.toLowerCase() === jacket.name.toLowerCase()
    );
    if (matched && typeof matched.slidePage === "number") {
      return Math.max(0, Math.min(maxSlideIdx, matched.slidePage - 1));
    }
  }

  return 0;
}

/**
 * Returns all products featured on a given 1-based spread page of a collection.
 */
export function getProductsForSlide(collection: Collection, pageNumber: number): Product[] {
  const targetIdx = pageNumber - 1;
  return (collection.products || []).filter(
    (prod) => getProductSlideIndex(collection.id, prod) === targetIdx
  );
}

/**
 * Finds a collection by ID, short slug ("corporate"), or pdfUrl.
 */
export function findCollection(idOrPdfUrl?: string): Collection {
  if (!idOrPdfUrl) return jacketsData[0];
  const trimmed = idOrPdfUrl.trim();
  const byUrl = jacketsData.find(
    (c) => c.pdfUrl.toLowerCase() === trimmed.toLowerCase()
  );
  if (byUrl) return byUrl;

  const norm = normalizeCollectionId(trimmed);
  return jacketsData.find((c) => c.id === norm) || jacketsData[0];
}

export const collections: CollectionItem[] = jacketsData.map((col) => ({
  id: col.id,
  slug: col.id,
  name: col.name,
  type: "2026/27 Pro Collection",
  tag: col.tagline,
  description: col.description,
  features: col.features || [],
  color: col.id === "corporate-pro" ? "#20231f" : "#e85a2a",
  coverImage: col.coverImage,
  catalogueImage: col.coverImage,
  pdfUrl: col.pdfUrl,
  cataloguePdf: col.pdfUrl,
  pdfPages: col.pdfPages || "6",
  products: col.products
}));

export const industries: IndustryItem[] = jacketsData.map((col) => ({
  id: col.id,
  name: col.name,
  audience: (col.idealFor && col.idealFor[0]) || "Professional Teams",
  description: col.description,
  teams: col.idealFor || [],
  focus: (col.features || []).slice(0, 4),
  catalogueImage: col.coverImage,
  cataloguePdf: col.pdfUrl
}));

export const jackets: JacketItem[] = jacketsData.flatMap((col) =>
  col.products.map((prod) => {
    const prodSlug = prod.sku.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    const slideIdx = getProductSlideIndex(col.id, prod);
    const pageStr = String(slideIdx + 1).padStart(2, "0");
    return {
      id: prodSlug,
      sku: prod.sku,
      name: prod.name,
      collection: col.id,
      colour: prod.colors[0] || "Black",
      kind: prod.fit || "Standard Fit",
      aspect: 1.45,
      catalogueImage: `/gallery/slides/${col.id}/page-${pageStr}.jpg`,
      cataloguePdf: col.pdfUrl,
      description: prod.features.slice(0, 2).join(". ") + ".",
      tag: `${prod.sku}${prod.fit ? ` • ${prod.fit}` : ""}`,
      features: prod.features,
      sizes: prod.sizes,
      colors: prod.colors,
      customization: prod.customization
    };
  })
);

export const sizesList = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

export {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  CALL_ONLY_NUMBER,
  CALL_ONLY_DISPLAY,
  CALL_ONLY_TEL_HREF,
  CORRESPONDENCE_EMAIL,
  CORRESPONDENCE_MAILTO_HREF,
  DEFAULT_WHATSAPP_MESSAGE,
  getWhatsAppUrl
};

// ============================================================================
// THE JD ECOSYSTEM & PROCESS DOCUMENTS
// ============================================================================

export interface EcosystemDocument {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pdfUrl: string;
  coverImage: string;
}

export const ecosystemData: EcosystemDocument[] = [
  {
    id: "client-journey",
    name: "JD Client Journey",
    tagline: "FROM FIRST CONVERSATION TO LONG-TERM PARTNERSHIP",
    description:
      "A guided experience from first contact to long-term partnership. Discover, Explore, Consult, Customize, Specify, Approve, Produce, Quality Check, Deliver, After-Sales Support, Reorder & Partnership.",
    pdfUrl: "/assets/pdfs/JD_Client_Journey_CLEAN.pdf",
    coverImage: "/assets/images/covers/client-journey-cover.jpg"
  },
  {
    id: "ordering-system",
    name: "JD Ordering System",
    tagline: "ONE ECOSYSTEM. ONE STANDARD. ONE POWERFUL EXPERIENCE.",
    description:
      "The blueprint that connects everything we do—our products, our customization, our process, our people, our documentation and our digital future—into one seamless system.",
    pdfUrl: "/assets/pdfs/JD_Ordering_System_CLEAN.pdf",
    coverImage: "/assets/images/covers/ordering-system-cover.jpg"
  },
  {
    id: "customization-system",
    name: "JD Customization System",
    tagline: "MAKE IT YOURS. ONE SYSTEM. ENDLESS WAYS TO REPRESENT YOUR IDENTITY.",
    description:
      "Every organisation is unique. Our JD Customization System™ gives you the freedom to choose how your outerwear looks, feels and represents your brand through Plain, Trimmed, or Signature Sublimation.",
    pdfUrl: "/assets/pdfs/JD_Customization_System_CLEAN.pdf",
    coverImage: "/assets/images/covers/customization-system-cover.jpg"
  }
];

const ECOSYSTEM_PAGE_TITLES: Record<string, string[]> = {
  "client-journey": [
    "Pages 01–02 • JD Client Journey Overview",
    "Pages 03–04 • The JD Difference & Partnership",
    "Pages 05–06 • Step 01 Discover & Step 02 Explore",
    "Pages 07–08 • Client Experience & Relationship Layer",
    "Pages 09–10 • Production, Quality Check & Delivery",
    "Pages 11–12 • Delivery, After-Sales & Reorder Partnership"
  ],
  "ordering-system": [
    "Pages 01–02 • JD Ecosystem Master Architecture",
    "Pages 03–04 • Step 01 Consult, Step 02 Design & Step 03 Approve",
    "Pages 05–06 • Ordering & Procurement Layers",
    "Pages 07–08 • Step 05 Specify & Step 06 Sample Approval",
    "Pages 09–10 • The Digital Ecosystem Layer",
    "Pages 11–12 • One Ecosystem & Master Governance"
  ],
  "customization-system": [
    "Pages 01–02 • JD Ecosystem Master Architecture",
    "Pages 03–04 • Product & Customization Layers",
    "Pages 05–06 • Step 03 Consult & Step 04 Customize",
    "Pages 07–08 • Plain, Trimmed & Signature Sublimation"
  ]
};

/**
 * Finds an EcosystemDocument by id, pdfUrl, or PDF filename.
 */
export function findEcosystemDocument(idOrPdfUrl?: string): EcosystemDocument | undefined {
  if (!idOrPdfUrl) return undefined;
  const trimmed = idOrPdfUrl.trim().toLowerCase();
  const fileName = trimmed.split("/").pop()?.split("#")[0]?.split("?")[0] || "";

  return ecosystemData.find((doc) => {
    const docUrl = doc.pdfUrl.toLowerCase();
    const docFile = docUrl.split("/").pop() || "";
    return (
      doc.id.toLowerCase() === trimmed ||
      docUrl === trimmed ||
      (fileName.length > 0 && docFile === fileName)
    );
  });
}

/**
 * Returns all high-resolution two-page spread slides for a given EcosystemDocument ID.
 */
export function getEcosystemSlides(docId: string): SlideInfo[] {
  const titles = ECOSYSTEM_PAGE_TITLES[docId] || [];
  const total = titles.length || 6;
  const slides: SlideInfo[] = [];

  for (let i = 1; i <= total; i++) {
    const pageStr = String(i).padStart(2, "0");
    slides.push({
      pageNumber: i,
      title: titles[i - 1] || `Spread ${i} of ${total}`,
      image: `/gallery/slides/${docId}/page-${pageStr}.jpg`
    });
  }
  return slides;
}