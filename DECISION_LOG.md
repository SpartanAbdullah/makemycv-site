# DECISION LOG

Major product/business decisions and reasoning. Append-only. Future-self / future-AI: read before changing direction.

---

## 2026-05-31 — Pricing Model Pivot: Paid Pro → Free + Voluntary Support

### What changed
MakeMyCV is now a fully free tool with a voluntary tip jar. No paid tier, no premium features, no paywalls. Tip surface uses Ko-fi (`ko-fi.com/makemycv_ae`) as primary and PayPal (`paypal.me/Abdullah2431`) as secondary alternative.

### Why
Legal: UAE commercial activity requires a trade licence (mainland or free zone) or freelancer permit. Operating a paid SaaS as an unlicensed individual carries asymmetric risk. Founder is currently employed full-time at Interior360 General Trading LLC; no freelance permit obtained.

Honesty: Previous "$5 per download" copy and disabled "Coming Soon" Pro buttons constituted false advertising. AUDIT.md flagged this as a trust/legal liability — this pivot resolves it.

Sequencing: Path B (obtain UAE freelance permit, build commercial product properly) is the correct upgrade trigger AFTER product-market fit is validated, not before. Pre-launch with zero traffic, the licensing cost (AED 7,500–22,000/year) is premature.

### Payment infrastructure
- PayPal Business account active (handle `Abdullah2431`)
- Ko-fi account active (`ko-fi.com/makemycv_ae`)
- Ko-fi pays out via PayPal — sidesteps Stripe's UAE trade-licence requirement
- Combined fee on tips: ~14% (PayPal processing + USD→AED FX) — accepted trade-off
- See `makemycv-app/DECISION_LOG.md` for the full payment-platform exploration history

### What this affects on the marketing site
- `/support` page built (new) with About-Abdullah trust anchor + Ko-fi-primary tip surface
- `/thanks` page built (new) for return-from-tip flow
- `/pricing` route 301 redirects to `/support`
- All "Pro" / "$5" / "Premium" / "Upgrade" copy removed
- Footer adds contact email `hello@makemycv.ae` and "Built by Abdullah" line

### What is deferred to Phase 2 (post-licence)
- Pro tier
- Stripe + Tap integration
- Subscriptions, coupons, B2B features
- Multi-CV save (also requires Supabase auth — separate roadmap item)

### Path B triggers (revisit if any hit)
- Sustained traffic >1,000 MAU for 3 consecutive months
- Sustained monthly tips >AED 1,500 for 3 consecutive months
- Concrete B2B opportunity (HR partner, recruitment agency, government program)

### References
- Audit findings: `AUDIT.md`
- Roadmap: `ROADMAP.md`
- Full payments exploration: `makemycv-app/DECISION_LOG.md`

---

## 2026-07-12 — UI Redesign Sprint 1: One Brand Across Marketing + Product

### What changed
Branch `ui/redesign-sprint-1` (both repos, unmerged). The marketing site dropped its electric-blue/dark-navy "AI SaaS" look (glow borders, scanner-beam-adjacent gradients, 6-card feature grid, numbered steps, empty testimonial slots) for the builder app's warm-paper Focus Flow language: paper `#FBFAF7`, ink `#0B0F0C`, UAE-green `#0E7C4A`, gold `#C49A48` for "Free"/highlight moments, Bricolage Grotesque display + Inter body.

### Why
A public comment called the site's design "what ChatGPT 3.5 would make." The redesign brief prescribed a teal-on-warm-white palette; the builder app already shipped exactly that philosophy (Focus Flow v3). Adopting the app's palette instead of inventing a third one makes marketing and product read as one brand — the strongest antidote to "looks generated".

### Key decisions
- **TrustSection removed** from home. The 3 empty "share your story" slots looked worse than no social proof. The hard rule stands: no fabricated counts, no placeholder testimonials (documented in `app/page.tsx`). When real consented stories land, add a simple quote block — no carousel.
- **Template content aligned with the product.** Site advertised "Graduate" and "Minimal" templates that don't exist in the builder. `graduate.mdx` → `ats-clean.mdx` (the real template serving that audience), `minimal.mdx` deleted. Template previews are now real Playwright captures of the builder's output (`makemycv-app` `/preview/[templateId]` route + `scripts/capture-previews.js`), not HTML facsimiles — what you see is what you download.
- **next/dynamic dropped for home sections.** They're static server components; code-splitting bought nothing and its suspense boundaries broke (permanently unresolved) once sections gained a client child (`Reveal`) in Next 16.1.
- **Legacy pages untouched by design.** blog/checker/JD-match/about/contact keep their scoped dark heroes this sprint; shared tokens were repointed so their CTAs went emerald coherently. Full unification is sprint 2.

### Merge notes
`beat-jobxdubai` (GEO build) is 16+ commits ahead of main and touches Footer/internal links. Expect conflicts in `Footer.tsx`, `globals.css` and home components when both merge — resolve toward this sprint's skin, keep GEO's link mesh.
