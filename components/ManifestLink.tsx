"use client";

import { useEffect } from "react";

export default function ManifestLink() {
  useEffect(() => {
    // Ensure manifest link exists in head
    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement("link");
      link.rel = "manifest";
      link.href = "/manifest.json";
      document.head.appendChild(link);
    }

    // Set theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = "#001a4d";
      document.head.appendChild(meta);
    }
  }, []);

  return null;
}
