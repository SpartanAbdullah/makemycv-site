import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map((post) => ({
    url: `https://makemycv.ae/blog/${post.slugPath}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

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
      url: "https://makemycv.ae/blog",
      lastModified: new Date(),
      priority: 0.8,
    },
    ...blogPosts,
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
