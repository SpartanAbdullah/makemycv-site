import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://makemycv.ae", lastModified: new Date(), priority: 1 },
    {
      url: "https://makemycv.ae/templates",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://makemycv.ae/pricing",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://makemycv.ae/about",
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: "https://makemycv.ae/contact",
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
