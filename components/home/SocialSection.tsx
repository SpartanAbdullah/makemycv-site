"use client";

import * as React from "react";
import { FloatingIconsHero } from "@/components/ui/floating-icons-hero-section";
import { LINKEDIN_URL, INSTAGRAM_URL } from "@/lib/social";
import { IconLinkedIn, IconInstagram } from "@/components/SocialIcons";

/* Social follow section — currently LinkedIn + Instagram only.
   Floating brand tiles alternate between the two networks; every tile links
   to the profile it shows. */

const socialIcons = [
  { id: 1, icon: IconLinkedIn, className: "top-[12%] left-[8%]", href: LINKEDIN_URL, label: "MakeMyCV on LinkedIn" },
  { id: 2, icon: IconInstagram, className: "top-[18%] right-[10%]", href: INSTAGRAM_URL, label: "MakeMyCV on Instagram" },
  { id: 3, icon: IconInstagram, className: "bottom-[14%] left-[14%]", href: INSTAGRAM_URL, label: "MakeMyCV on Instagram" },
  { id: 4, icon: IconLinkedIn, className: "bottom-[10%] right-[16%]", href: LINKEDIN_URL, label: "MakeMyCV on LinkedIn" },
  { id: 5, icon: IconLinkedIn, className: "top-[8%] left-[42%]", href: LINKEDIN_URL, label: "MakeMyCV on LinkedIn" },
  { id: 6, icon: IconInstagram, className: "bottom-[6%] left-[46%]", href: INSTAGRAM_URL, label: "MakeMyCV on Instagram" },
  { id: 7, icon: IconInstagram, className: "top-[45%] left-[4%]", href: INSTAGRAM_URL, label: "MakeMyCV on Instagram" },
  { id: 8, icon: IconLinkedIn, className: "top-[48%] right-[5%]", href: LINKEDIN_URL, label: "MakeMyCV on LinkedIn" },
];

export function SocialSection() {
  return (
    <FloatingIconsHero
      title="Follow MakeMyCV"
      subtitle="CV tips, UAE hiring insights and new free tools — first on LinkedIn and Instagram."
      ctaText="Follow on LinkedIn"
      ctaHref={LINKEDIN_URL}
      secondaryCtaText="Follow on Instagram"
      secondaryCtaHref={INSTAGRAM_URL}
      icons={socialIcons}
    />
  );
}
