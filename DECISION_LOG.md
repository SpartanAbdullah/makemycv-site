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
