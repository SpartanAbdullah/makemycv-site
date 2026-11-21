/**
 * Role-specific UAE CV example pages: the single data source for
 * app/cv-examples-uae/[role]/page.tsx, the hub's role list, the sitemap and
 * llms.txt (growth roadmap 2026-11, item 16: a ten-page pilot).
 *
 * Where the content comes from:
 *   - Skills are the app's curated per-domain bank
 *     (makemycv-app/lib/data/domainSkills.ts), narrowed to the job title.
 *   - Bullet topics follow the app's per-domain bullet library
 *     (makemycv-app/lib/data/ideaSuggestions.ts). The app leaves a blank for
 *     every number; these pages fill the blanks with PLACEHOLDER figures and
 *     say so on the page. No employer is named and nothing is a real CV.
 *   - UAE Essentials labels match the builder's own step
 *     (makemycv-app/lib/data/uaeOptions.ts).
 *
 * Rules for editing (same guardrails as the blog, see CLAUDE.md):
 *   - A legal or licensing fact carries a `sources` entry pointing at the
 *     regulator's own page, or it does not go in. Re-check the page and bump
 *     SOURCES_CHECKED when you touch one.
 *   - No statistics, salaries, success rates or named employers.
 *   - "CV", not "resume" (resume only as ATS vocabulary).
 *   - FAQ text is emitted verbatim as FAQPage schema: keep answers
 *     self-contained and never add a fact there that is not sourced in
 *     `essentials`.
 */

export type RoleSource = { label: string; url: string };

export type RoleBullet = {
  /** What the bullet is about; rendered as the H3. */
  topic: string;
  weak: string;
  strong: string;
  why: string;
};

export type RoleEssential = {
  label: string;
  text: string;
  /** Optional internal link appended after the text. */
  link?: { label: string; href: string };
  sources?: RoleSource[];
};

export type RoleFaq = { q: string; a: string };

export type RoleExample = {
  slug: string;
  /** Job title in title case, singular: "Accountant". */
  role: string;
  /** Indefinite article for the title: "a" | "an". */
  article: "a" | "an";
  sector: string;
  metaTitle: string;
  metaDescription: string;
  heroSub: string;
  /** Direct answer to roleQuestion(). `text` must start with `lead`. */
  answer: { lead: string; text: string };
  bullets: RoleBullet[];
  essentialsIntro: string;
  essentials: RoleEssential[];
  skills: { must: string[]; nice: string[] };
  skillsNote: string;
  ctaLine: string;
  faqs: RoleFaq[];
  /** Three blog slugs for the ReadNext block. */
  guides: [string, string, string];
};

/** Date the official pages below were last read. Shown next to each source. */
export const SOURCES_CHECKED = "21 November 2026";

/**
 * Every URL here was fetched and read on SOURCES_CHECKED. What each one was
 * used to support is listed in COWORK_CHANGELOG.md (2026-11-21, role pages).
 */
const U_AE_JOBS =
  "https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector";

const SRC = {
  labourLaw: {
    label: "UAE Government portal, employment laws and regulations in the private sector",
    url: `${U_AE_JOBS}/employment-laws-and-regulations-in-the-private-sector`,
  },
  notice: {
    label: "UAE Government portal, terminating employment contracts (Article 43)",
    url: `${U_AE_JOBS}/terminating-employment-contracts`,
  },
  wps: {
    label: "UAE Government portal, payment of wages",
    url: `${U_AE_JOBS}/payment-of-wages`,
  },
  emiratisation: {
    label: "UAE Government portal, Emiratis' employment in the private sector",
    url: `${U_AE_JOBS}/emiratis-employment-in-private-sector`,
  },
  workPermits: {
    label: "UAE Government portal, work permits",
    url: `${U_AE_JOBS}/work-permits`,
  },
  visitVisa: {
    label: "UAE Government portal, tips to avoid labour and visa fraud",
    url: "https://u.ae/en/information-and-services/visa-and-emirates-id/Visa-information/tips-to-avoid-labour-and-visa-fraud",
  },
  vat: {
    label: "UAE Government portal, Value Added Tax",
    url: "https://u.ae/en/information-and-services/finance-and-investment/taxation/vat/valueaddedtaxvat",
  },
  corporateTax: {
    label: "UAE Government portal, Corporate Tax",
    url: "https://u.ae/en/information-and-services/finance-and-investment/taxation/corporate-tax",
  },
  emaraTax: {
    label: "Federal Tax Authority, EmaraTax",
    url: "https://tax.gov.ae/en/emaratax.aspx",
  },
  dha: {
    label: "Dubai Health Authority, Sheryan FAQ",
    url: "https://services.dha.gov.ae/sheryan/wps/portal/home/faq",
  },
  doh: {
    label: "Department of Health Abu Dhabi, FAQ",
    url: "https://www.doh.gov.ae/en/faq",
  },
  mohap: {
    label: "Ministry of Health and Prevention, licensing of health professionals",
    url: "https://mohap.gov.ae/en/w/licensing-or-re-licensing-of-health-professional",
  },
  healthAuthorities: {
    label: "UAE Government portal, health authorities",
    url: "https://u.ae/en/information-and-services/health-and-fitness/Policy-and-governance/health-authorities",
  },
  pqr: {
    label: "Unified Healthcare Professional Qualification Requirements (April 2025, PDF)",
    url: "https://mohap.gov.ae/documents/20117/0/Unified+Healthcare+Professional+Qualification+Requirements.pdf/0c6315e3-d57d-81b5-9f16-6cd7f5ac9a1a",
  },
  dldFaq: {
    label: "Dubai Land Department, frequently asked questions",
    url: "https://dubailand.gov.ae/en/frequently-asked-questions/",
  },
  dldCard: {
    label: "Dubai Land Department, issuance of a real estate professional practice card",
    url: "https://dubailand.gov.ae/en/eservices/request-for-issuing-a-real-estate-activity-practice-card/",
  },
  dubaiEngineers: {
    label: "Dubai Administrative Resolution No. (253) of 2021 (Dubai Legislation Portal)",
    url: "https://dlp.dubai.gov.ae/en/Pages/HTMLViewer.aspx?file=QWRtaW5pc3RyYXRpdmUgUmVzb2x1dGlvbiBOby4gKDI1Mykgb2YgMjAyMSBBcHByb3ZpbmcgdGhlIFRlY2huaWNhbCBRdWFsaWZpY2F0aW9uIFJlcXVpcmVtZW50cyBhbmQgQ3JpdGVyaWE%3D&year=2021",
  },
} satisfies Record<string, RoleSource>;

export const ROLE_EXAMPLES: RoleExample[] = [
  /* ───────────────────────────── Accountant ───────────────────────────── */
  {
    slug: "accountant",
    role: "Accountant",
    article: "an",
    sector: "Accounting & audit",
    metaTitle: "Accountant CV Example for the UAE: VAT and Audit Bullets",
    metaDescription:
      "Accountant CV example for the UAE: five weak-to-strong bullet rewrites, VAT and Corporate Tax wording, the skills an ATS matches, and UAE Essentials.",
    heroSub:
      "Month-end close, VAT returns, payables and audit support, rewritten from duties into results a UAE finance manager can weigh.",
    answer: {
      lead: "An accountant CV for the UAE should show the standards and taxes you have actually worked under",
      text: "An accountant CV for the UAE should show the standards and taxes you have actually worked under: IFRS, UAE VAT and UAE Corporate Tax. Add the number of entities you kept books for, monthly transaction values in AED, the accounting software by name, your qualification status such as ACCA or CA, and your visa status and notice period.",
    },
    bullets: [
      {
        topic: "Month-end close",
        weak: "Responsible for monthly accounts and reporting.",
        strong:
          "Closed the monthly books for 3 UAE entities under IFRS, cutting the close from 10 working days to 6 by automating 14 bank and intercompany reconciliations.",
        why: "Entity count, the reporting standard, a before-and-after close time and the exact change you made.",
      },
      {
        topic: "VAT returns",
        weak: "Handled VAT work for the company.",
        strong:
          "Prepared and filed VAT returns for 4 group companies through EmaraTax, with no late-filing penalties across 3 years.",
        why: "Names the Federal Tax Authority platform you used, the scope, and a clean compliance record a reader can ask about.",
      },
      {
        topic: "Payables and receivables",
        weak: "Managed accounts payable and accounts receivable.",
        strong:
          "Ran payables and receivables of about AED 6M a month across 120 suppliers, bringing overdue receivables down from 22% to 9% of the ledger.",
        why: "Monthly value in AED and supplier count show the size of the ledger; the overdue percentage shows what you did with it.",
      },
      {
        topic: "Audit support",
        weak: "Assisted the auditors during the annual audit.",
        strong:
          "Prepared audit schedules and supporting files for 2 financial years; both external audits closed with no material adjustments.",
        why: "States your part in the audit and the outcome an audit partner cares about.",
      },
      {
        topic: "Corporate Tax",
        weak: "Worked on corporate tax.",
        strong:
          "Registered 3 group entities for UAE Corporate Tax and built the first-year tax computation workpapers with the external tax adviser.",
        why: "Corporate Tax is new enough in the UAE that first-year hands-on work is worth its own line, described honestly as shared with an adviser.",
      },
    ],
    essentialsIntro:
      "A finance manager shortlisting accountants wants to know which rules you have filed under and how soon you can start. Put these near the top.",
    essentials: [
      {
        label: "UAE tax exposure",
        text: "Say which UAE taxes you have handled yourself. VAT was introduced in the UAE on 1 January 2018 at a rate of 5%, and Corporate Tax is levied at 9% on income above AED 375,000 for financial years starting on or after 1 June 2023. Returns are filed through the Federal Tax Authority's EmaraTax platform. If your experience is from another country, name that country's tax and do not relabel it as UAE VAT.",
        sources: [SRC.vat, SRC.corporateTax, SRC.emaraTax],
      },
      {
        label: "Qualification status",
        text: "Write the qualification and where you are with it: \"ACCA member\", \"ACCA, 9 of 13 papers passed\", \"CA (ICAI)\", \"CMA candidate\". A part-qualified status stated exactly is stronger than a vague \"pursuing ACCA\".",
      },
      {
        label: "Visa status",
        text: "State it in one line, for example \"Employment visa, transferable\" or \"Family sponsorship\". It tells the employer whether they are transferring a visa or issuing a new one.",
      },
      {
        label: "Notice period",
        text: "Give your real notice period. Under the UAE labour law it is between 30 and 90 days, as written in your contract, and month-end and year-end hiring is planned around it.",
        link: { label: "Work out your last working day with the notice period calculator", href: "/notice-period-calculator" },
        sources: [SRC.notice],
      },
    ],
    skills: {
      must: [
        "IFRS",
        "UAE VAT Filing",
        "UAE Corporate Tax",
        "General Ledger",
        "Accounts Payable / Receivable",
        "Bank Reconciliation",
      ],
      nice: ["EmaraTax", "Tally ERP", "QuickBooks", "SAP FICO", "Advanced Excel", "ACCA"],
    },
    skillsNote:
      "An ATS matches the words in the advert against the words on your CV, so use the advert's own terms. Write software names in full the first time (\"Tally ERP\", not \"Tally\") and list only what you could demonstrate at a test.",
    ctaLine:
      "Add your entities, AED values and tax filings to a clean single-column layout.",
    faqs: [
      {
        q: "Do I need UAE VAT experience to get an accountant job in the UAE?",
        a: "Not always, but say exactly what you have. If you have filed UAE VAT returns, name the Federal Tax Authority's EmaraTax platform and the number of entities. If your tax experience is from India, Pakistan, the Philippines or elsewhere, name that tax as it is and add any UAE VAT or Corporate Tax course you have completed. Never relabel foreign tax work as UAE VAT.",
      },
      {
        q: "How do I write ACCA on my CV if I have not finished it?",
        a: "State the exact stage: \"ACCA, 9 of 13 papers passed\" or \"ACCA affiliate, membership pending experience requirement\". Put it in the qualifications section and repeat it in your summary line. Part-qualified status is checkable and respected; \"ACCA\" on its own when you are not a member is a claim you would have to walk back at interview.",
      },
      {
        q: "Which accounting software should I list on a UAE accountant CV?",
        a: "List the packages you have used for real work, by their full names: Tally ERP or Tally Prime, QuickBooks, Zoho Books, SAP FICO, Oracle, Microsoft Dynamics. Put the one named in the advert first. Add Excel with the functions you use, such as pivot tables and lookups, and be ready to show them in a practical test.",
      },
      {
        q: "Should an accountant CV for the UAE show figures in AED?",
        a: "Yes. Convert ledger values, budgets and savings to AED and round them honestly, for example \"about AED 6M a month\". Keep the original currency in brackets only if the size of the home-country employer matters. Use figures you can explain line by line, because finance interviewers check numbers.",
      },
    ],
    guides: ["cv-format-uae-2026", "ats-cv-checklist-uae", "adapt-indian-cv-for-uae-jobs"],
  },

  /* ─────────────────────────── Sales Executive ────────────────────────── */
  {
    slug: "sales-executive",
    role: "Sales Executive",
    article: "a",
    sector: "Sales & business development",
    metaTitle: "Sales Executive CV Example for the UAE: Targets in AED",
    metaDescription:
      "Sales Executive CV example for the UAE: weak-to-strong bullets with AED targets, pipeline and accounts, the CRM skills an ATS matches, and UAE Essentials.",
    heroSub:
      "Targets, pipeline, new accounts and territory, written so a sales manager can see what you sold, to whom, and against which number.",
    answer: {
      lead: "A Sales Executive CV for the UAE should put your numbers against your targets",
      text: "A Sales Executive CV for the UAE should put your numbers against your targets: revenue closed in AED, percentage of target achieved, new accounts opened and the territory or emirates you covered. Name what you sold and to whom, the CRM you used, the languages you sell in, whether you hold a UAE driving licence, and your visa status.",
    },
    bullets: [
      {
        topic: "Target achievement",
        weak: "Achieved sales targets consistently.",
        strong:
          "Closed AED 4.2M against an annual target of AED 3.6M (117%) selling office fit-out packages to SMEs in Dubai and Sharjah.",
        why: "Actual against target, the percentage, what was sold and where. \"Consistently\" is replaced by a number a manager can verify.",
      },
      {
        topic: "New business",
        weak: "Responsible for finding new customers.",
        strong:
          "Opened 38 new B2B accounts in 12 months through cold calls and site visits, 11 of which reordered within the same year.",
        why: "Shows both hunting and the quality of what was won, with the method named.",
      },
      {
        topic: "Pipeline",
        weak: "Maintained the sales pipeline in the CRM.",
        strong:
          "Kept a live pipeline of about AED 2M across 60 opportunities in Zoho CRM, lifting quote-to-order conversion from 18% to 26%.",
        why: "Pipeline value, opportunity count, the CRM by name and a conversion rate that moved.",
      },
      {
        topic: "Key accounts",
        weak: "Handled important client accounts.",
        strong:
          "Managed 14 key accounts worth AED 1.5M in repeat orders, renewing 13 of them at the annual contract review.",
        why: "Account count, value and a renewal figure show you keep customers as well as win them.",
      },
      {
        topic: "Field coverage",
        weak: "Visited clients regularly.",
        strong:
          "Covered Dubai, Sharjah and the Northern Emirates by own car, averaging 6 client meetings a day and 20 site surveys a month.",
        why: "Territory, mobility and activity rate. Outdoor sales managers plan routes and want to know you can run one.",
      },
    ],
    essentialsIntro:
      "These four lines answer the questions a sales manager asks before the first call, especially for a field role.",
    essentials: [
      {
        label: "Driving licence",
        text: "If you hold a UAE driving licence, say so and name the category, for example \"UAE driving licence (light vehicle)\". Add \"own car\" only if it is true. For an outdoor or field sales role this line belongs in the header area, not at the bottom of page two.",
      },
      {
        label: "Visa status",
        text: "One line: \"Employment visa, transferable\", \"Family sponsorship\", \"Visit visa\" or \"Golden Visa\". Visa status tells the employer what has to be arranged before your start date.",
      },
      {
        label: "Notice period",
        text: "State your notice period as your contract has it. Under the UAE labour law it is between 30 and 90 days. If you are available immediately, write \"Immediate\".",
        link: { label: "Check your last working day with the notice period calculator", href: "/notice-period-calculator" },
        sources: [SRC.notice],
      },
      {
        label: "Languages you sell in",
        text: "List each language with the level you can negotiate in, for example \"English (fluent), Arabic (conversational), Hindi (native)\". A language you can only greet in does not belong here.",
      },
    ],
    skills: {
      must: ["B2B Sales", "Key Account Management", "Pipeline Management", "Negotiation", "Lead Generation"],
      nice: [
        "Salesforce",
        "Zoho CRM",
        "HubSpot CRM",
        "Microsoft Dynamics 365",
        "Business Development",
        "Cold Calling",
      ],
    },
    skillsNote:
      "CRM tools are a family: Salesforce, Zoho, HubSpot and Dynamics do the same job. Name the one you have used, and mirror the advert's wording for the sales type, whether that is B2B, B2C, outdoor or key account.",
    ctaLine:
      "Put your targets, accounts and territory into a CV a sales manager can read in one pass.",
    faqs: [
      {
        q: "How do I show sales targets on a CV for UAE jobs?",
        a: "Write the actual figure, the target and the percentage together: \"Closed AED 4.2M against a target of AED 3.6M (117%)\". Add the period and what you sold. If your figures are in another currency, convert them to AED. If you missed target in a year, show the best true measure instead, such as new accounts opened or conversion rate.",
      },
      {
        q: "Should I put my driving licence on a Sales Executive CV in the UAE?",
        a: "Yes, if you hold a UAE licence. Write \"UAE driving licence (light vehicle)\" near your contact details, and add \"own car\" only if you have one. If the advert is for field or outdoor sales and asks for a licence, this line is part of the match, so do not leave it for page two. If you hold only a home-country licence, say which country.",
      },
      {
        q: "What if my sales numbers are confidential?",
        a: "Use ratios and ranks instead of company revenue: percentage of target achieved, rank within the team, number of new accounts, conversion rate, average deal size as a rounded band. These show performance without disclosing your employer's totals. Do not name client companies your contract forbids you to name.",
      },
      {
        q: "Which CRM should I list on a UAE sales CV?",
        a: "List the CRM you have actually worked in day to day, by its full name: Salesforce, Zoho CRM, HubSpot CRM or Microsoft Dynamics 365. If the advert names a different one, keep yours and add what you did in it, such as pipeline stages, forecasting and activity logging, because those habits transfer between systems.",
      },
    ],
    guides: ["cv-format-uae-2026", "why-cv-ignored-dubai", "professional-summary-examples-uae-cv"],
  },

  /* ─────────────────────── Customer Service Agent ─────────────────────── */
  {
    slug: "customer-service-agent",
    role: "Customer Service Agent",
    article: "a",
    sector: "Customer service & contact centre",
    metaTitle: "Customer Service Agent CV Example for UAE Jobs",
    metaDescription:
      "Customer Service Agent CV example for the UAE: weak-to-strong bullets with CSAT, handling time and volume, the skills an ATS matches, and UAE Essentials.",
    heroSub:
      "Volumes, CSAT, handling time and escalations, written for contact-centre team leaders who hire on metrics and shift fit.",
    answer: {
      lead: "A Customer Service Agent CV for the UAE should show your daily volume and your quality scores",
      text: "A Customer Service Agent CV for the UAE should show your daily volume and your quality scores: contacts handled per day, the channels you worked (calls, chat, email, WhatsApp), CSAT or quality-audit results, and average handling time. Add the languages you can serve customers in, the CRM or ticketing tool, shift availability, and your visa status.",
    },
    bullets: [
      {
        topic: "Volume and quality",
        weak: "Answered customer calls and emails.",
        strong:
          "Handled about 85 inbound calls and 30 chats a day for a telecom account, holding a 94% CSAT score over 12 months.",
        why: "Daily volume by channel, the type of account and a satisfaction score held over time.",
      },
      {
        topic: "Handling time",
        weak: "Resolved customer issues quickly.",
        strong:
          "Cut average handling time from 7.5 to 5.8 minutes while keeping first-contact resolution above 80%, by building a shared list of the 20 most common fixes.",
        why: "Speed is paired with a quality measure, so the reader knows you did not just rush calls, and the method is named.",
      },
      {
        topic: "Complaints and escalations",
        weak: "Dealt with customer complaints.",
        strong:
          "Owned escalated billing complaints for a 12-agent team, closing 9 in 10 within 48 hours and reversing 35 cancellation requests in a quarter.",
        why: "Shows you were trusted with the difficult cases and what happened to them.",
      },
      {
        topic: "Languages",
        weak: "Good communication skills in multiple languages.",
        strong:
          "Served customers in English, Arabic and Urdu on the same shift, taking the Arabic-language queue during evening peaks.",
        why: "Names the languages and how they were used at work. \"Good communication skills\" tells the reader nothing.",
      },
      {
        topic: "Tools and accuracy",
        weak: "Used the company system to log tickets.",
        strong:
          "Logged every contact in Zendesk with a 97% score on monthly quality audits, and trained 6 new joiners on ticket tagging.",
        why: "Tool by name, an audit score, and a sign that the team leader relied on you.",
      },
    ],
    essentialsIntro:
      "A contact-centre team is rostered by shift and language. A team leader should find these four facts without reading the whole CV.",
    essentials: [
      {
        label: "Languages",
        text: "List each language with a level you could be tested at on a call: \"English (fluent), Arabic (native), Tagalog (native)\". Language is how queues are staffed, so this is a hiring criterion for the role, not a soft skill.",
      },
      {
        label: "Availability and shifts",
        text: "Write \"Immediate\" or your notice period, and add shift flexibility if it is true: \"Available for rotating shifts including weekends\". Under the UAE labour law a notice period is between 30 and 90 days.",
        sources: [SRC.notice],
      },
      {
        label: "Visa status",
        text: "State it in one line: \"Employment visa, transferable\", \"Family sponsorship\" or \"Visit visa\". It tells the recruiter what paperwork a start date depends on.",
      },
      {
        label: "Licences",
        text: "There is no personal government licence to list for this role, so do not invent one. Product or compliance training your employer gave you, such as banking or insurance product certification, goes under training.",
      },
    ],
    skills: {
      must: [
        "Call Centre Operations",
        "Complaint Resolution",
        "CSAT / NPS",
        "CRM (Zendesk / Salesforce)",
        "Live Chat Support",
      ],
      nice: [
        "Multilingual Support",
        "Freshdesk",
        "First-Contact Resolution",
        "Quality Assurance Audits",
        "Typing Speed (WPM)",
        "MS Office 365",
      ],
    },
    skillsNote:
      "Adverts use \"call centre\", \"contact centre\" and \"customer support\" for the same job. Copy the spelling the advert uses, because an ATS may treat them as different terms, and name your ticketing tool in full.",
    ctaLine: "Turn your call volumes, CSAT and languages into a CV a team leader can scan.",
    faqs: [
      {
        q: "What metrics should a Customer Service Agent put on a CV?",
        a: "Use the measures your centre reported: contacts handled per day, CSAT or NPS, average handling time, first-contact resolution, and quality-audit score. Give the figure and the period, for example \"94% CSAT over 12 months\". Two or three real metrics are enough. If your employer shared no scores with you, use volume and the types of cases you were trusted with.",
      },
      {
        q: "How do I write languages on a customer service CV for the UAE?",
        a: "Give each language its own level: native, fluent, conversational or basic. Write \"English (fluent), Arabic (native), Hindi (conversational)\". Then prove it once in a bullet, such as taking the Arabic queue. Only list a language you could handle a complaint in, because you may be tested in it at the first interview.",
      },
      {
        q: "I have no call centre experience. What do I put on my CV?",
        a: "Use any job where you dealt with customers: retail, hotel reception, a bank counter, food delivery support. Count what you can, such as customers served per shift or complaints resolved, and add typing speed, languages and the software you have used. State shift availability clearly. Do not invent contact-centre metrics you never had.",
      },
      {
        q: "Should I mention shift availability on a UAE customer service CV?",
        a: "Yes. A contact centre that runs evenings, nights and weekends needs to know where you fit on the roster. One line such as \"Available for rotating shifts including weekends\" or \"Day shifts only\" saves both sides time. Be accurate: agreeing to night shifts on paper and refusing them at offer stage usually ends the process.",
      },
    ],
    guides: ["cv-format-uae-2026", "cv-for-freshers-uae", "ats-cv-checklist-uae"],
  },

  /* ───────────────────────────── Registered Nurse ─────────────────────── */
  {
    slug: "nurse",
    role: "Nurse",
    article: "a",
    sector: "Healthcare",
    metaTitle: "Nurse CV Example for the UAE: Clinical Bullets and Skills",
    metaDescription:
      "Nurse CV example for the UAE: five weak-to-strong clinical bullets, unit and patient-ratio wording, the skills an ATS matches, and licence status.",
    heroSub:
      "The licence line first, then unit, patient ratio and outcomes: clinical bullets rewritten the way a UAE nursing recruiter reads them.",
    answer: {
      lead: "A nurse CV for the UAE should open with your licence status for the emirate you are applying in",
      text: "A nurse CV for the UAE should open with your licence status for the emirate you are applying in: DHA for Dubai, DOH for Abu Dhabi, or MOHAP, the federal health ministry. Then give your unit and specialty, bed count and nurse-to-patient ratio, life-support certificates with expiry dates, years of post-registration experience, and your visa status.",
    },
    bullets: [
      {
        topic: "Unit and patient load",
        weak: "Provided nursing care to patients in the ward.",
        strong:
          "Cared for 6 to 8 post-operative patients per shift on a 32-bed surgical ward, covering wound care, IV therapy and discharge teaching.",
        why: "Ward type, bed count, patient ratio and the procedures you did. A nurse manager can place you on a roster from this line alone.",
      },
      {
        topic: "Triage and emergency",
        weak: "Worked in the emergency department.",
        strong:
          "Triaged about 50 patients per shift in a 24-hour emergency department using a five-level triage scale, with door-to-triage time kept under 10 minutes on audit.",
        why: "Volume, the triage method and an audited time measure.",
      },
      {
        topic: "Patient safety",
        weak: "Followed infection control and safety policies.",
        strong:
          "Led the ward's hand-hygiene audits for 12 months, raising compliance from 78% to 93% and contributing to zero central-line infections that year.",
        why: "Turns \"followed policy\" into a named responsibility with a measured result.",
      },
      {
        topic: "Documentation",
        weak: "Maintained patient records.",
        strong:
          "Charted all assessments and medication administration in the hospital's electronic medical record, scoring 98% on quarterly documentation audits.",
        why: "Names the record type and an audit score, so documentation quality is shown and not just claimed.",
      },
      {
        topic: "Teaching and seniority",
        weak: "Helped train new nurses.",
        strong:
          "Preceptored 5 newly joined nurses through a 12-week orientation and acted as charge nurse on night shifts for a team of 7.",
        why: "Shows progression toward senior or charge roles with numbers attached.",
      },
    ],
    essentialsIntro:
      "For a regulated health role, eligibility is read before experience. Put licence and verification status in the first third of page one.",
    essentials: [
      {
        label: "Licence status, by emirate",
        text: "Nurses are licensed by the health authority where they will work, not once for the whole country. Dubai has the Dubai Health Authority (DHA) and Abu Dhabi the Department of Health (DOH, previously known as HAAD); the Ministry of Health and Prevention (MOHAP) is the federal authority and runs its own licensing service. Ask the employer which authority its facility falls under. In Dubai the process has two steps: you obtain a DHA registration through the Sheryan portal, and the hiring facility activates it into a licence. So write the authority and your exact stage, for example \"DHA registration issued, licence to be activated by employer\" or \"DOH-licensed Registered Nurse\", and never write one authority's licence as if it covered another emirate.",
        sources: [SRC.dha, SRC.doh, SRC.mohap, SRC.healthAuthorities],
      },
      {
        label: "Verification and home registration",
        text: "The health authorities' unified qualification requirements say licensing documents are verified directly with the primary source, and they list a bachelor's degree in nursing for the Registered Nurse title. DHA, DOH and MOHAP each name DataFlow as a verification agency on their own pages. State where your verification stands (\"completed\" or \"in progress\", with the month) and your home-country registration, such as PRC for the Philippines or your State Nursing Council for India. Recruiters plan start dates around how far along you are.",
        sources: [SRC.pqr, SRC.dha, SRC.doh, SRC.mohap],
      },
      {
        label: "Life-support certificates",
        text: "List BLS, and ACLS, PALS or NRP where your unit needs them, each with its expiry date. An expired card should be shown as expired or renewed before you apply.",
      },
      {
        label: "Visa status and notice",
        text: "One line each. Under the UAE labour law a notice period is between 30 and 90 days, and hospital onboarding is scheduled around it.",
        sources: [SRC.notice],
      },
    ],
    skills: {
      must: [
        "DHA / DOH / MOHAP Licence (whichever you hold)",
        "BLS",
        "Patient Care",
        "Infection Control",
        "Medication Administration",
        "Electronic Medical Records (EMR)",
      ],
      nice: ["ACLS", "PALS", "Triage", "IV Therapy", "Wound Care", "Patient Education", "JCI Standards"],
    },
    skillsNote:
      "List only the licence you actually hold or are eligible for, written the way the advert writes it. DOH was previously known as HAAD and some adverts still use the old name; if yours does, include both forms once.",
    ctaLine: "Put your licence line, unit details and certificates where a nursing recruiter looks first.",
    faqs: [
      {
        q: "Which nursing licence do I put on my CV for UAE jobs?",
        a: "The one issued by the health authority where the job is. The Dubai Health Authority (DHA) covers Dubai and the Department of Health (DOH) covers Abu Dhabi; the Ministry of Health and Prevention (MOHAP) is the federal authority with its own licensing service. Write the authority and your exact stage, such as registered, exam passed or licensed. Check which authority the employer's facility falls under, and confirm current requirements on that authority's website.",
      },
      {
        q: "Can I apply for UAE nursing jobs before I have a DHA, DOH or MOHAP licence?",
        a: "You can apply, but say exactly where you are in the process: verification in progress, exam booked, exam passed or registration issued. In Dubai, the DHA describes two steps: the nurse obtains a registration, and the hiring healthcare facility activates it into a licence. So \"DHA registration issued, licence to be activated by employer\" is an accurate line, while \"DHA licensed\" is not until a facility has activated it.",
      },
      {
        q: "What nurse-to-patient ratio and unit details should I include?",
        a: "Give the unit type, bed count and your usual patient load, for example \"32-bed surgical ward, 6 to 8 patients per shift\" or \"12-bed adult ICU, 1 to 2 ventilated patients\". Add the equipment and procedures you are signed off on. These details let a nurse manager judge fit for a specific unit faster than a list of general duties.",
      },
      {
        q: "Where do BLS and ACLS go on a nurse CV?",
        a: "In a short licences and certifications block directly under your summary, each with its expiry date: \"BLS (valid to March 2027)\". Keeping them next to your licence line means the eligibility facts are all in one place. Leave off certificates that have lapsed, or mark them as due for renewal.",
      },
      {
        q: "How should a nurse applying from the Philippines or India adapt the CV?",
        a: "Keep your home registration (PRC, or your State Nursing Council) and add your UAE licensing status above it. Describe hospitals by bed count and type instead of assuming the reader knows the name, convert dates to month and year, and remove personal details such as religion, parents' names and ID numbers that UAE employers do not ask for on a CV.",
      },
    ],
    guides: ["nursing-cv-uae", "first-time-ofw-cv-uae", "cv-format-uae-2026"],
  },

  /* ───────────────────────────── Civil Engineer ───────────────────────── */
  {
    slug: "civil-engineer",
    role: "Civil Engineer",
    article: "a",
    sector: "Engineering & construction",
    metaTitle: "Civil Engineer CV Example for the UAE: Project Bullets",
    metaDescription:
      "Civil Engineer CV example for the UAE: weak-to-strong bullets with project value in AED, scope and safety record, the software an ATS matches, and essentials.",
    heroSub:
      "Project value, scope, programme and safety record, written the way UAE contractors and consultants read a site CV.",
    answer: {
      lead: "A Civil Engineer CV for the UAE should describe each project by type, value and your part in it",
      text: "A Civil Engineer CV for the UAE should describe each project by type, value and your part in it: contract value in AED, built-up area or length, whether you worked for the contractor, consultant or client, and what you delivered against programme. Add your software, safety record, degree, years of GCC experience, driving licence and visa status.",
    },
    bullets: [
      {
        topic: "Project delivery",
        weak: "Worked as site engineer on building projects.",
        strong:
          "Site engineer for a AED 85M, G+12 residential tower in Dubai on the main contractor's team, delivering the structure 3 weeks ahead of the baseline programme.",
        why: "Project value, type, your side of the contract and performance against programme.",
      },
      {
        topic: "Supervision and safety",
        weak: "Supervised workers at the site.",
        strong:
          "Supervised 4 subcontractors and about 120 workers on concrete and blockwork packages, with zero lost-time incidents over 14 months.",
        why: "Headcount, the packages you ran and the safety measure the industry uses.",
      },
      {
        topic: "Quantities and cost",
        weak: "Prepared quantities and checked bills.",
        strong:
          "Prepared take-offs and verified subcontractor payment applications worth AED 2.4M a month, recovering AED 310K in over-measured rebar and formwork.",
        why: "Monthly value handled and a specific saving with its cause.",
      },
      {
        topic: "Quality and approvals",
        weak: "Responsible for quality control.",
        strong:
          "Raised and closed 240 inspection requests with the consultant at a first-time approval rate of 91%, and cleared the authority inspection for the structure at the first visit.",
        why: "Inspection volume and approval rate make \"quality control\" measurable.",
      },
      {
        topic: "Planning",
        weak: "Followed up on the project schedule.",
        strong:
          "Maintained the 3-week look-ahead in Primavera P6 for a 600-activity programme and recovered an 18-day delay on the podium slabs by resequencing pours.",
        why: "Names the tool, the size of the programme and a delay you actually recovered.",
      },
    ],
    essentialsIntro:
      "GCC experience, mobility and start date are the practical questions for a site role. Answer them plainly.",
    essentials: [
      {
        label: "Degree and professional registration",
        text: "Write your degree with university and year, and say if it is attested. In Dubai, Administrative Resolution No. (253) of 2021 sets qualification criteria for engineers working in construction at consultancy firms and contracting companies licensed in the emirate, and its schedule for contracting companies requires membership of the Society of Engineers in the UAE and a pass in Dubai's technical competency exams. That rule is specific to Dubai and to construction, so check what the advert asks for. List a registration only if you hold it, with the membership number, or write \"in process\" if that is the honest status.",
        sources: [SRC.dubaiEngineers],
      },
      {
        label: "Driving licence",
        text: "State \"UAE driving licence (light vehicle)\" if you hold one. A site role can cover several plots or an out-of-town project, so put this line where it will be seen.",
      },
      {
        label: "GCC experience",
        text: "Split your experience in the summary line: \"8 years, including 5 in the UAE\". Name the emirate for each project, because approvals and practice differ between authorities.",
      },
      {
        label: "Visa status and notice",
        text: "One line each. Under the UAE labour law a notice period is between 30 and 90 days; projects mobilise to a date, so an accurate notice period matters.",
        link: { label: "Calculate your last working day", href: "/notice-period-calculator" },
        sources: [SRC.notice],
      },
    ],
    skills: {
      must: ["AutoCAD", "Primavera P6", "QA / QC", "Quantity Take-off", "Site Supervision", "Revit / BIM"],
      nice: [
        "NEBOSH IGC",
        "MS Project",
        "MEP Coordination",
        "Structural Detailing",
        "Method Statements",
        "PMP",
      ],
    },
    skillsNote:
      "Write software with its version family where it matters (\"Primavera P6\", \"Revit\") and keep safety certificates such as NEBOSH IGC in a certifications line with the year. List a credential only if you hold it.",
    ctaLine: "Lay out your projects by value, scope and role in a format ATS software can parse.",
    faqs: [
      {
        q: "How should I list projects on a Civil Engineer CV for the UAE?",
        a: "Give each project one line of facts before the bullets: project type, location, contract value in AED, your employer's role (contractor, consultant or client) and your dates. Then two or three bullets on what you delivered. Recruiters match candidates to live projects by type and size, so a clear project line does more than a long list of duties.",
      },
      {
        q: "Do I need UAE or GCC experience on my CV to get a civil engineering job?",
        a: "If the advert asks for it and you have it, state it clearly: \"5 years UAE experience\" in the summary and the emirate against each project. If you do not, lead with comparable project types and sizes, the codes and standards you worked to, and any GCC-relevant software and safety training. Do not present overseas projects as Gulf experience.",
      },
      {
        q: "Should I include NEBOSH or PMP on a Civil Engineer CV?",
        a: "Include them if you hold them, with the awarding body and year, in a certifications block near the top. Write the full name once, such as \"NEBOSH International General Certificate\", so both the acronym and the full form are on the page. If you are still studying, write \"in progress\" with the expected date instead of the bare title.",
      },
      {
        q: "How long should a Civil Engineer CV be for UAE jobs?",
        a: "Two pages is enough for most engineers. Give full detail for the last three or four projects and reduce older ones to a single line each with type, value and role. A separate project list can be offered on request for senior roles, but the main CV should let a recruiter see your recent project sizes on page one.",
      },
    ],
    guides: ["cv-format-uae-2026", "uae-sectors-hiring-2026", "ats-cv-checklist-uae"],
  },

  /* ───────────────────────────── HR Officer ───────────────────────────── */
  {
    slug: "hr-officer",
    role: "HR Officer",
    article: "an",
    sector: "Human resources",
    metaTitle: "HR Officer CV Example for the UAE: WPS and Hiring Bullets",
    metaDescription:
      "HR Officer CV example for the UAE: weak-to-strong bullets on recruitment, onboarding, WPS payroll and labour-law compliance, plus the skills an ATS matches.",
    heroSub:
      "Recruitment, onboarding, payroll and compliance, rewritten with headcounts and turnaround times an HR manager can check.",
    answer: {
      lead: "An HR Officer CV for the UAE should show the headcount you supported and the UAE processes you ran yourself",
      text: "An HR Officer CV for the UAE should show the headcount you supported and the UAE processes you ran yourself: recruitment and onboarding numbers, work permit and visa processing, payroll through the Wage Protection System, and end-of-service calculations under the UAE labour law. Add your HR system by name, any CIPD study, visa status and notice period.",
    },
    bullets: [
      {
        topic: "Recruitment",
        weak: "Responsible for recruitment activities.",
        strong:
          "Filled 64 roles in 12 months for a 450-person contracting company, cutting average time-to-hire from 41 to 28 days.",
        why: "Number of hires, company size and a time-to-hire figure that moved.",
      },
      {
        topic: "Onboarding and government processing",
        weak: "Handled visa and onboarding formalities.",
        strong:
          "Processed work permits, residence visas and Emirates ID applications for 180 joiners with the PRO, bringing average onboarding from offer to first day down to 19 days.",
        why: "Names the documents, the volume and the turnaround, and is honest that the work was shared with the PRO.",
      },
      {
        topic: "Payroll",
        weak: "Assisted with monthly payroll.",
        strong:
          "Prepared monthly payroll inputs for 450 employees and submitted the salary file through the Wage Protection System on time for 24 consecutive months.",
        why: "Headcount, the UAE system by name and an unbroken record.",
      },
      {
        topic: "End of service and leave",
        weak: "Calculated final settlements.",
        strong:
          "Calculated gratuity and leave settlements for 70 leavers a year under Federal Decree-Law No. 33 of 2021, with no settlement overturned on complaint.",
        why: "Volume, the law by its correct name and an outcome.",
      },
      {
        topic: "Records and engagement",
        weak: "Maintained employee files and records.",
        strong:
          "Moved 450 personnel files into the HRIS and set expiry alerts for visas, labour cards and medical insurance, ending lapsed-document fines within two quarters.",
        why: "A project with a clear before and after, and a cost that stopped.",
      },
    ],
    essentialsIntro:
      "An HR CV is read by HR people, who notice wrong terminology at once. Name UAE laws and systems exactly, and only the ones you have used.",
    essentials: [
      {
        label: "UAE labour law",
        text: "Private-sector employment in the UAE is governed by Federal Decree-Law No. 33 of 2021, in effect since 2 February 2022. If you have applied it to contracts, leave, notice or end-of-service, say which. If your HR experience is from another country, name that country's law and list any UAE labour law course separately.",
        sources: [SRC.labourLaw],
      },
      {
        label: "Wage Protection System",
        text: "Establishments registered with the Ministry of Human Resources and Emiratisation (MOHRE) must pay wages through the Wage Protection System (WPS). If you prepared or submitted salary files, say so and give the headcount. \"WPS\" as a bare skill with no bullet behind it reads as copied from an advert.",
        sources: [SRC.wps],
      },
      {
        label: "Emiratisation",
        text: "If you have worked on Emiratisation targets or with the Nafis programme, state what you did and for how many roles. If you have not, leave it out, because you would be asked about it in detail at interview.",
        sources: [SRC.emiratisation],
      },
      {
        label: "Visa status and notice",
        text: "One line each. Under the UAE labour law a notice period is between 30 and 90 days. An HR candidate who states both precisely is showing the habit the job needs.",
        link: { label: "Check the notice rules in the notice period calculator", href: "/notice-period-calculator" },
        sources: [SRC.notice],
      },
    ],
    skills: {
      must: [
        "UAE Labour Law",
        "WPS Payroll",
        "MOHRE Compliance",
        "Talent Acquisition",
        "Onboarding",
        "Gratuity / End-of-Service",
      ],
      nice: [
        "Emiratisation / Nafis",
        "HRIS (SAP SuccessFactors)",
        "Oracle HCM",
        "Employee Relations",
        "CIPD",
        "MS Excel",
      ],
    },
    skillsNote:
      "Use both the full name and the abbreviation once (\"Wage Protection System (WPS)\"), since adverts use either. Name your HRIS by product, and keep CIPD to the level you have completed or are enrolled in.",
    ctaLine: "Set out your headcount, hires and compliance record in a clean, ATS-readable CV.",
    faqs: [
      {
        q: "What UAE labour law knowledge should an HR Officer show on a CV?",
        a: "Name Federal Decree-Law No. 33 of 2021, which governs private-sector employment in the UAE, and show where you applied it: drafting contracts, calculating notice, leave and gratuity, or handling a termination. One bullet with a number, such as settlements calculated per year, is stronger than listing \"UAE labour law\" as a skill with nothing behind it.",
      },
      {
        q: "How do I describe WPS payroll experience on a CV?",
        a: "Say what your part was and for how many people: \"Prepared and submitted the monthly salary file through the Wage Protection System for 450 employees\". Establishments registered with the Ministry of Human Resources and Emiratisation must pay wages through the Wage Protection System, so employers want to know you have run it. If you only supplied attendance or overtime inputs, describe that accurately.",
      },
      {
        q: "Can I get an HR job in the UAE with HR experience from another country?",
        a: "Yes, and your CV should make the transfer easy to see. Keep the numbers for hires, headcount and payroll, name your home country's labour law correctly, and list any UAE labour law or CIPD study separately with dates. Do not rewrite overseas experience in UAE terms such as WPS or MOHRE if you did not use them.",
      },
      {
        q: "Should an HR Officer CV mention PRO or visa processing work?",
        a: "Yes, if you did it or coordinated it. Name the documents, such as work permits, residence visas and Emirates ID, the volume per year and the turnaround time. Be clear about whether you made the applications yourself or prepared files for a PRO, because the two are different jobs and interviewers will ask which.",
      },
    ],
    guides: ["cv-format-uae-2026", "mohre-cv-format-uae", "ats-cv-checklist-uae"],
  },

  /* ─────────────────────── Logistics Coordinator ──────────────────────── */
  {
    slug: "logistics-coordinator",
    role: "Logistics Coordinator",
    article: "a",
    sector: "Logistics & supply chain",
    metaTitle: "Logistics Coordinator CV Example for UAE Jobs",
    metaDescription:
      "Logistics Coordinator CV example for the UAE: weak-to-strong bullets on shipments, customs clearance, freight cost and on-time delivery, plus ATS skills.",
    heroSub:
      "Shipments, clearance times, freight cost and delivery performance, written with the volumes and documents a logistics manager expects to see.",
    answer: {
      lead: "A Logistics Coordinator CV for the UAE should show shipment volumes and the documents you handled yourself",
      text: "A Logistics Coordinator CV for the UAE should show shipment volumes and the documents you handled yourself: shipments per month by sea, air and road, customs declarations and clearance times, on-time delivery rate, and freight or demurrage costs you reduced. Name the ports, free zones and systems you worked with, and add your driving licence, visa status and notice period.",
    },
    bullets: [
      {
        topic: "Shipment volume",
        weak: "Coordinated import and export shipments.",
        strong:
          "Coordinated about 140 import and export shipments a month by sea and air through Jebel Ali and Dubai airport cargo, for a distributor with 900 active SKUs.",
        why: "Monthly volume, modes, gateways and the size of the product range.",
      },
      {
        topic: "Customs clearance",
        weak: "Handled customs documentation.",
        strong:
          "Prepared commercial invoices, packing lists and certificates of origin and worked with the clearing agent on declarations, cutting average clearance from 4 days to 2.",
        why: "Names the documents and is accurate about who filed the declaration, with a time saved.",
      },
      {
        topic: "Cost control",
        weak: "Helped reduce transport costs.",
        strong:
          "Re-tendered 3 freight forwarder contracts and consolidated less-than-container loads, saving AED 420K a year and ending demurrage charges within two quarters.",
        why: "A specific action, an annual saving in AED and a cost line that went to zero.",
      },
      {
        topic: "Delivery performance",
        weak: "Ensured timely delivery to customers.",
        strong:
          "Scheduled a fleet of 9 vehicles for deliveries across the UAE, lifting on-time-in-full from 86% to 95% over a year.",
        why: "Fleet size, coverage and the delivery measure customers hold suppliers to.",
      },
      {
        topic: "Inventory accuracy",
        weak: "Maintained stock records in the system.",
        strong:
          "Ran monthly cycle counts in the warehouse management system for a 40,000 sq ft warehouse, raising stock accuracy from 94% to 99.2%.",
        why: "Warehouse size, the system type and an accuracy figure with a baseline.",
      },
    ],
    essentialsIntro:
      "Three practical facts matter early for a logistics role: whether you drive, which gateways you know, and when you can start.",
    essentials: [
      {
        label: "Driving licence",
        text: "State the category you hold, \"UAE driving licence (light vehicle)\" or heavy vehicle, and the country if it is not a UAE licence. A coordinator may be asked to visit ports, warehouses and customer sites.",
      },
      {
        label: "Ports, free zones and systems",
        text: "Name the gateways and systems you have actually used: the port or airport, the free zone, your company's ERP and warehouse management system, and the customs or trade portal you logged into. Write \"prepared documents for the clearing agent\" if the agent filed the declarations, not \"customs clearance\".",
      },
      {
        label: "Visa status",
        text: "One line, for example \"Employment visa, transferable\" or \"Family sponsorship\". It tells the employer what has to be arranged before you start.",
      },
      {
        label: "Notice period",
        text: "Under the UAE labour law a notice period is between 30 and 90 days. Give yours as the contract states it, or write \"Immediate\".",
        link: { label: "Find your last working day with the notice period calculator", href: "/notice-period-calculator" },
        sources: [SRC.notice],
      },
    ],
    skills: {
      must: [
        "Supply Chain Management",
        "Customs Clearance",
        "Freight Forwarding",
        "Inventory Control",
        "Warehouse Management (WMS)",
        "Import / Export Documentation",
      ],
      nice: ["SAP MM", "Incoterms", "Fleet Scheduling", "Vendor Management", "MS Excel", "CIPS"],
    },
    skillsNote:
      "Match the advert's term for the function (logistics, supply chain, shipping or procurement), because an ATS may treat them as different keywords. Name your ERP module, and list Incoterms only if you can explain the ones you have shipped under.",
    ctaLine: "Put your shipment volumes, clearance times and savings into a CV that parses cleanly.",
    faqs: [
      {
        q: "What should a Logistics Coordinator CV include for UAE jobs?",
        a: "Shipment volume per month by mode, the documents you prepared, clearance and delivery times, and any freight, storage or demurrage cost you reduced, in AED. Name the ports, airports and free zones you have worked with and your ERP or warehouse system. Add driving licence, visa status and notice period near the top.",
      },
      {
        q: "How do I describe customs clearance experience honestly on a CV?",
        a: "Separate what you did from what the clearing agent did. If you prepared invoices, packing lists and certificates of origin and followed up with the agent, write that. If you filed declarations yourself through the customs portal, say so and name the portal. Interviewers in logistics ask exactly who submitted the declaration, so precision here protects you.",
      },
      {
        q: "Is a UAE driving licence needed for a Logistics Coordinator job?",
        a: "It depends on the advert: desk-based coordination roles may not ask for one, and roles that include port, warehouse and customer visits may. If you hold a licence, state the category and country in your header. If you do not, leave the line out and do not write \"in process\" unless you are enrolled with a driving school.",
      },
      {
        q: "Which numbers matter most on a logistics CV?",
        a: "Four kinds: volume (shipments, containers or orders per month), time (clearance days, delivery lead time), accuracy (stock accuracy, on-time-in-full) and money (freight spend managed, savings in AED). Give a before and after where you changed something. Choose two or three you can explain in detail over a long list of unsupported percentages.",
      },
    ],
    guides: ["cv-format-uae-2026", "uae-sectors-hiring-2026", "ats-cv-checklist-uae"],
  },

  /* ───────────────────────────── Receptionist ─────────────────────────── */
  {
    slug: "receptionist",
    role: "Receptionist",
    article: "a",
    sector: "Administration & front desk",
    metaTitle: "Receptionist CV Example for the UAE: Front-Desk Bullets",
    metaDescription:
      "Receptionist CV example for the UAE: weak-to-strong front-desk bullets with visitor and call volumes, the admin skills an ATS matches, and UAE Essentials.",
    heroSub:
      "Visitors, calls, bookings and office admin, turned from a list of duties into evidence that a front desk ran well.",
    answer: {
      lead: "A receptionist CV for the UAE should show how busy your front desk was and what you ran from it",
      text: "A receptionist CV for the UAE should show how busy your front desk was and what you ran from it: visitors and calls per day, the switchboard or booking system, meeting rooms, couriers and office supplies. Add the languages you greet and take calls in, your Microsoft Office level, availability, and your visa status.",
    },
    bullets: [
      {
        topic: "Front-desk volume",
        weak: "Greeted visitors and answered phone calls.",
        strong:
          "Ran the front desk for a 6-floor office of 220 staff, receiving about 70 visitors and 120 calls a day on a 12-line switchboard.",
        why: "Office size, daily visitors and calls, and the equipment. The reader can picture the desk.",
      },
      {
        topic: "Appointments and bookings",
        weak: "Managed appointments and meeting rooms.",
        strong:
          "Scheduled 45 patient appointments a day for 5 doctors in the clinic's booking system, cutting no-shows from 18% to 9% with same-day reminder calls.",
        why: "Volume, the setting, a measured improvement and the simple action behind it.",
      },
      {
        topic: "Office administration",
        weak: "Handled office supplies and couriers.",
        strong:
          "Managed couriers, stationery and pantry supplies on a budget of AED 8,000 a month, saving about 15% by moving to two approved suppliers.",
        why: "Shows the admin side of the role with a budget and a saving.",
      },
      {
        topic: "Executive and travel support",
        weak: "Supported management with admin tasks.",
        strong:
          "Booked flights, hotels and visit visas for about 12 business trips a month and kept the calendars of 2 directors.",
        why: "Specific tasks with a volume, pointing toward an administrator or assistant role.",
      },
      {
        topic: "Records and visitors",
        weak: "Kept records of visitors.",
        strong:
          "Introduced a digital visitor log and ID check at reception, replacing the paper register and passing 2 building security audits without findings.",
        why: "A small improvement you owned, with an outcome someone else verified.",
      },
    ],
    essentialsIntro:
      "For a front-desk role, a few practical facts are read before your experience. Put them at the top.",
    essentials: [
      {
        label: "Visa status",
        text: "Write it in one line near your contact details: \"Family sponsorship\", \"Employment visa, transferable\" or \"Visit visa\". It decides what the employer has to arrange before you can start. A resident on family sponsorship can be hired from inside the UAE on a work permit for residents on family sponsorship, which the employer applies for, while a visit or tourist visa does not give the right to work, so an employer must complete a work permit and residence visa first.",
        sources: [SRC.workPermits, SRC.visitVisa],
      },
      {
        label: "Availability",
        text: "\"Immediate\" if it is true, otherwise your notice period. Under the UAE labour law notice is between 30 and 90 days. Add shift or weekend availability if the role is in a clinic, hotel or gym.",
        sources: [SRC.notice],
      },
      {
        label: "Languages",
        text: "List each language with its level, for example \"English (fluent), Arabic (native), Russian (conversational)\". The front desk is the first voice a caller hears, so language is a selection criterion here.",
      },
      {
        label: "Photo",
        text: "A photo is optional on a UAE CV. If you include one, use a plain, recent head-and-shoulders picture and a template that keeps it out of the way of the text.",
        link: { label: "See the guide to photos on UAE CVs", href: "/blog/should-cv-have-photo-uae" },
      },
    ],
    skills: {
      must: [
        "MS Office 365",
        "Switchboard / Call Handling",
        "Calendar Management",
        "Visitor Management",
        "Customer Service",
      ],
      nice: [
        "Travel Coordination",
        "Document Control",
        "Minute Taking",
        "Typing Speed (WPM)",
        "Petty Cash Handling",
        "Appointment Booking Systems",
      ],
    },
    skillsNote:
      "Name the programmes inside Microsoft Office you really use (Outlook, Word, Excel) and give a typing speed if you know it. Adverts say \"receptionist\", \"front desk executive\" and \"front office administrator\" for similar jobs, so use the advert's title in your summary.",
    ctaLine: "Put your visa status, languages and front-desk numbers where an employer sees them first.",
    faqs: [
      {
        q: "What should a receptionist put on a CV with no numbers to show?",
        a: "There are always counts at a front desk: visitors per day, calls per day, lines on the switchboard, staff in the office, meeting rooms managed, appointments booked. Estimate honestly and write \"about\". Add one thing you improved, such as a visitor log or reminder calls. Counts like these turn a duty list into a picture of a working desk.",
      },
      {
        q: "Should I put a photo on a receptionist CV in the UAE?",
        a: "It is your choice. A photo is optional on a UAE CV; include one if the advert asks for it. If you add one, use a recent, plain head-and-shoulders photo in business dress, and a CV layout where the photo does not break the text order that applicant tracking systems read.",
      },
      {
        q: "How do I write visa status on a receptionist CV?",
        a: "Use one plain line under your contact details, such as \"Visa status: Family sponsorship\", \"Employment visa, transferable\" or \"Visit visa\". Do not add passport or Emirates ID numbers. Visa status and start date decide what an employer has to arrange, so state both clearly.",
      },
      {
        q: "Can I apply for receptionist jobs in the UAE as a fresher?",
        a: "Yes. Lead with languages, Microsoft Office skills, typing speed and availability, then any experience dealing with people: retail, events, a college help desk, volunteering. Describe it with counts, as you would a job. Keep the CV to one page, and do not pad it with duties you have not done.",
      },
    ],
    guides: ["should-cv-have-photo-uae", "cv-for-freshers-uae", "cv-format-uae-2026"],
  },

  /* ─────────────────────────── Real Estate Agent ──────────────────────── */
  {
    slug: "real-estate-agent",
    role: "Real Estate Agent",
    article: "a",
    sector: "Real estate",
    metaTitle: "Real Estate Agent CV Example for UAE Jobs",
    metaDescription:
      "Real Estate Agent CV example for the UAE: weak-to-strong bullets with deal value, listings and leads, how to write the Dubai broker card line, and ATS skills.",
    heroSub:
      "Deals closed, listings, leads and communities covered, written the way a Dubai or Abu Dhabi brokerage manager judges an agent.",
    answer: {
      lead: "A Real Estate Agent CV for the UAE should show what you closed and where",
      text: "A Real Estate Agent CV for the UAE should show what you closed and where: number and value of sales and leases in AED, the communities you specialise in, listings held and leads converted. State your broker registration honestly, for Dubai the RERA broker card, plus your driving licence, languages, the portals and CRM you use, and visa status.",
    },
    bullets: [
      {
        topic: "Deals closed",
        weak: "Sold and rented properties to clients.",
        strong:
          "Closed 22 sales worth AED 61M and 48 leases in 12 months, specialising in apartments in two Dubai waterfront communities.",
        why: "Deal count and value, split by sales and leasing, with the patch you know.",
      },
      {
        topic: "Listings",
        weak: "Managed property listings.",
        strong:
          "Built a portfolio of 35 exclusive listings from landlord cold calls and building canvassing, keeping listing quality scores above 85% on the property portals.",
        why: "Exclusive listings are an agent's stock; the line shows how they were won and how well they were presented.",
      },
      {
        topic: "Lead conversion",
        weak: "Followed up with leads.",
        strong:
          "Handled about 180 portal and referral leads a month in the CRM, converting 1 in 4 to a viewing and 1 in 14 to a signed deal.",
        why: "Lead volume and two conversion steps. A sales manager can compare this with the team average.",
      },
      {
        topic: "Off-plan and investors",
        weak: "Worked with investors on new projects.",
        strong:
          "Sold 14 off-plan units across 3 developer launches to overseas investors, taking clients from reservation to signed sale agreement.",
        why: "Units, launches and the stage of the transaction you carried.",
      },
      {
        topic: "Tenancy administration",
        weak: "Completed tenancy paperwork.",
        strong:
          "Prepared tenancy contracts and Ejari registrations for 48 leases a year, with renewals agreed on 31 of them.",
        why: "Names the Dubai registration system you used and a renewal figure that shows landlords stayed with you.",
      },
    ],
    essentialsIntro:
      "Be exact about registration and mobility, because a brokerage has to arrange whatever you do not already hold.",
    essentials: [
      {
        label: "Broker registration",
        text: "The Dubai Land Department states that a broker in Dubai must be registered in the brokers registry and hold a broker card from the Real Estate Regulatory Agency (RERA). The department's name for the document is the real estate professional practice card, and applicants must have passed the broker test. If you hold a current card, write \"RERA broker card, valid to\" and the month and year. If you have passed the course or test but hold no card, say exactly that. The card is what you hold, so write the card and not \"RERA certified\". Other emirates license brokers separately; name the emirate your registration is for.",
        sources: [SRC.dldFaq, SRC.dldCard],
      },
      {
        label: "Driving licence and car",
        text: "Write \"UAE driving licence (light vehicle)\" and \"own car\" only if both are true. Viewings are driven to, so check whether the advert asks for a licence and a car.",
      },
      {
        label: "Languages",
        text: "List the languages you can negotiate and explain a contract in, with levels. A brokerage matches agents to the clients they can serve, so be accurate about each level.",
      },
      {
        label: "Visa status",
        text: "One line. The brokerage needs to know whether it is issuing a visa and card or transferring them.",
      },
    ],
    skills: {
      must: [
        "RERA Broker Card (if held)",
        "Leasing",
        "Sales Negotiation",
        "Ejari",
        "Lead Generation",
        "Bayut / Property Finder",
      ],
      nice: ["Property CRM", "Off-plan Sales", "Property Management", "Cold Calling", "Market Valuation", "Dubizzle"],
    },
    skillsNote:
      "Ejari is a registration system you use, not a certificate you hold, so list it as a system. Name the portals and CRM you work in, and mirror the advert's wording for the specialism: sales, leasing, off-plan or commercial.",
    ctaLine: "Set out your deals, listings and broker card status on one clean page.",
    faqs: [
      {
        q: "How do I write my RERA or broker card status on a CV?",
        a: "State what you actually hold. The Dubai Land Department says a broker in Dubai must be registered in the brokers registry and hold a broker card from the Real Estate Regulatory Agency (RERA), so write \"RERA broker card, valid to\" with the date. If you completed the training or passed the test but have no card, say that instead. Write the card, not \"RERA certified\", because the card is the document a brokerage will ask to see.",
      },
      {
        q: "Can I apply for real estate agent jobs in Dubai without a broker card?",
        a: "You can apply, but be plain about it on your CV: \"No broker card yet\" or \"Broker card in process\". The Dubai Land Department says a broker must be registered in the brokers registry and hold a broker card from the Real Estate Regulatory Agency, so a brokerage needs to know what it has to arrange before you can act as a broker. Lead with your sales record from another field.",
      },
      {
        q: "What numbers should a real estate agent show on a CV?",
        a: "Deals closed and their total value in AED, split into sales and leases; exclusive listings held; leads handled per month and your conversion rate; and the communities or property types you specialise in. Give a period for each figure. If you are new to property, use the equivalent numbers from your previous sales role.",
      },
      {
        q: "Should a real estate agent CV list a driving licence?",
        a: "Yes, if you hold one. Agents drive to viewings, and if the advert asks for a UAE licence and a car your CV needs the line to match. Write \"UAE driving licence (light vehicle)\" near your contact details and add \"own car\" only if it is true. If you hold a licence from another country, name the country.",
      },
    ],
    guides: ["cv-format-uae-2026", "how-to-make-cv-for-job-in-dubai", "professional-summary-examples-uae-cv"],
  },

  /* ───────────────────────── Hotel Front Desk Agent ───────────────────── */
  {
    slug: "hotel-front-desk-agent",
    role: "Hotel Front Desk Agent",
    article: "a",
    sector: "Hospitality",
    metaTitle: "Hotel Front Desk Agent CV Example for UAE Jobs",
    metaDescription:
      "Hotel Front Desk Agent CV example for the UAE: weak-to-strong bullets with room count, check-ins, upselling revenue and guest scores, plus ATS skills.",
    heroSub:
      "Room count, arrivals, upsell revenue and guest scores, written for front office managers hiring for UAE hotels.",
    answer: {
      lead: "A Hotel Front Desk Agent CV for the UAE should describe the property and your shift in numbers",
      text: "A Hotel Front Desk Agent CV for the UAE should describe the property and your shift in numbers: star rating and room count, check-ins and check-outs handled per shift, upselling revenue in AED and guest satisfaction scores. Name the property management system you use, the languages you speak with guests, your shift availability and your visa status.",
    },
    bullets: [
      {
        topic: "Arrivals and departures",
        weak: "Checked guests in and out of the hotel.",
        strong:
          "Handled about 60 check-ins and 55 check-outs per shift at a 320-room five-star city hotel, using Opera PMS.",
        why: "Property size and category, shift volume and the system by name.",
      },
      {
        topic: "Upselling",
        weak: "Offered room upgrades to guests.",
        strong:
          "Generated AED 30,000 a month in room upgrade and late check-out revenue, ranking in the front office team's top 3 of 14 for six months running.",
        why: "Revenue in AED and a rank against colleagues. Front office managers track both.",
      },
      {
        topic: "Guest satisfaction",
        weak: "Provided excellent service to guests.",
        strong:
          "Mentioned by name in 45 guest reviews in a year, with the front desk's arrival-experience score rising from 86% to 91%.",
        why: "Replaces \"excellent service\" with two things that can be checked.",
      },
      {
        topic: "Complaint recovery",
        weak: "Handled guest complaints.",
        strong:
          "Resolved room and billing complaints at the desk within the shift in 9 of 10 cases, using service recovery limits without escalating to the duty manager.",
        why: "Shows judgement and the authority you were trusted with.",
      },
      {
        topic: "Cash and night audit",
        weak: "Responsible for cash handling.",
        strong:
          "Balanced a float and shift takings of about AED 25,000 with no variances over 18 months, and covered night audit two nights a week.",
        why: "Amount handled, a clean record and an extra responsibility.",
      },
    ],
    essentialsIntro:
      "A front office manager compares candidates on a few practical lines before experience. Make these four easy to find.",
    essentials: [
      {
        label: "Languages",
        text: "List every language you can check a guest in with, and the level: \"English (fluent), Arabic (conversational), Russian (native)\". Which languages a front office needs depends on its guests, so list every one you can work in.",
      },
      {
        label: "Availability and shifts",
        text: "State \"Immediate\" or your notice period, and that you work rotating shifts, nights and public holidays if that is true. Under the UAE labour law a notice period is between 30 and 90 days.",
        sources: [SRC.notice],
      },
      {
        label: "Visa status",
        text: "One line. Say whether you are in the UAE now and on what status, or applying from abroad.",
      },
      {
        label: "Photo and grooming",
        text: "Whether to add a photo is your choice. If you do, use a recent head-and-shoulders picture in business dress on a plain background.",
        link: { label: "Read the full hospitality CV guide", href: "/blog/hospitality-cv-uae" },
      },
    ],
    skills: {
      must: ["Opera PMS", "Guest Relations", "Upselling", "Check-in / Check-out", "Cash Handling", "Complaint Resolution"],
      nice: [
        "Night Audit",
        "Reservations",
        "Micros POS",
        "Loyalty Programme Enrolment",
        "Concierge Services",
        "Revenue Management",
      ],
    },
    skillsNote:
      "Write the property management system by its product name; an ATS matching \"Opera\" will not find \"hotel software\". Adverts use \"front desk agent\", \"front office agent\" and \"guest service agent\" for the same job, so take the title from the advert.",
    ctaLine: "Show your property, shift numbers and languages in a CV built for UAE hotel recruiters.",
    faqs: [
      {
        q: "What should a Hotel Front Desk Agent CV include for UAE hotels?",
        a: "The hotel's star rating and room count, check-ins and check-outs per shift, your upselling revenue in AED, a guest satisfaction measure and the property management system you use. Add the languages you speak with guests, shift availability and visa status near the top. These are the facts a front office manager compares between candidates.",
      },
      {
        q: "How do I show upselling on a front desk CV?",
        a: "Give monthly revenue in AED and, if you know it, your rank in the team: \"AED 30,000 a month in upgrades and late check-outs, top 3 of 14 agents\". If your hotel did not share figures, count the upgrades you sold per week. Keep to numbers your former manager would confirm in a reference call.",
      },
      {
        q: "Do I need Opera PMS experience to work at a hotel front desk in the UAE?",
        a: "Not necessarily, but if the advert names it and you have used it, list it, with the version or cloud product if you know it. If you have used a different property management system, name that one and the tasks you did in it, such as reservations, check-in, billing and night audit. Do not list a system you have only seen in training videos.",
      },
      {
        q: "I am applying from abroad. How should my hotel CV show that?",
        a: "Put your current city and country in the header, state your visa status as \"Applying from abroad, employer visa required\", and give the date you could travel. Describe each hotel by star rating, room count and brand type, since a recruiter may not know the property. Keep the CV to one or two pages with a plain layout.",
      },
    ],
    guides: ["hospitality-cv-uae", "should-cv-have-photo-uae", "cv-for-freshers-uae"],
  },
];

const BY_SLUG = new Map(ROLE_EXAMPLES.map((r) => [r.slug, r]));

export function getRoleExample(slug: string): RoleExample | undefined {
  return BY_SLUG.get(slug);
}

export function rolePath(slug: string): string {
  return `/cv-examples-uae/${slug}`;
}

/** The question each page answers first; also the first FAQPage entry. */
export function roleQuestion(example: RoleExample): string {
  return `What should ${example.article} ${example.role} CV for the UAE include?`;
}
