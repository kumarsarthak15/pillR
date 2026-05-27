import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: "MediGrab",
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0D1F33",
    theme_color: "#0D1F33",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
