/* Single source of truth for owned social profiles. Used by the Footer, the
   homepage SocialSection, the blog AuthorBlock and the exit card.
   Keep in sync with ORG_SAME_AS in lib/seo.ts (entity graph). */

export const LINKEDIN_URL = "https://www.linkedin.com/company/makemycv-ae";
export const INSTAGRAM_URL = "https://www.instagram.com/makemycv.ae/";

export const SOCIAL_PROFILES = [
  { id: "linkedin", label: "LinkedIn", url: LINKEDIN_URL },
  { id: "instagram", label: "Instagram", url: INSTAGRAM_URL },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/profile.php?id=61596108358844" },
  { id: "x", label: "X", url: "https://x.com/makemycv_ae" },
  { id: "threads", label: "Threads", url: "https://www.threads.com/@makemycv.ae" },
  { id: "medium", label: "Medium", url: "https://medium.com/@makemycv.ae" },
] as const;

export type SocialId = (typeof SOCIAL_PROFILES)[number]["id"];
