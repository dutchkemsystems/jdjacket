import React, { useState, useEffect } from "react";
import { HomePage } from "./pages/Home";
import { GalleryPage } from "./pages/Gallery";
import { AboutPage } from "./pages/About";
import { ClientJourneyPage } from "./pages/ClientJourney";
import { CustomizationBriefPage } from "./pages/CustomizationBrief";
import { IndustryPage } from "./pages/IndustryPage";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);

    // Global navigation interceptor for SPA navigation
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        anchor.target === "_blank" ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http://") ||
        href.startsWith("https://")
      ) {
        return;
      }

      // In-page hash link
      if (href.startsWith("#")) {
        const hashId = href.slice(1);
        const el = document.getElementById(hashId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
        return;
      }

      // Root with hash (e.g. /#industries, /#how-it-works)
      if (href.startsWith("/#") || href.includes("#")) {
        const [targetPath, hash] = href.split("#");
        const normalTargetPath = targetPath || "/";
        if (normalTargetPath === window.location.pathname) {
          e.preventDefault();
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", href);
          }
          return;
        }
      }

      // Internal route link
      if (href.startsWith("/")) {
        e.preventDefault();
        const [targetPath, hash] = href.split("#");
        window.history.pushState(null, "", href);
        setCurrentPath(targetPath || "/");

        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Route matching
  const cleanPath = currentPath.replace(/\/$/, "") || "/";

  if (cleanPath.startsWith("/collections/")) {
    const slug = cleanPath.replace("/collections/", "");
    return <IndustryPage key={cleanPath} industryId={slug} />;
  }

  if (cleanPath.startsWith("/industries/")) {
    const industryId = cleanPath.replace("/industries/", "");
    return <IndustryPage key={cleanPath} industryId={industryId} />;
  }

  switch (cleanPath) {
    case "/gallery":
      return <GalleryPage key={cleanPath} />;
    case "/about":
      return <AboutPage key={cleanPath} />;
    case "/client-journey":
      return <ClientJourneyPage key={cleanPath} />;
    case "/customization-brief":
      return <CustomizationBriefPage key={cleanPath} />;
    case "/":
    default:
      return <HomePage key={cleanPath} />;
  }
}
