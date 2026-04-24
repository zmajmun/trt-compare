// lib/providers.js
// This is the canonical pricing data for all TRT providers.
// The daily cron job (api/cron) calls the Anthropic API to verify and
// refresh these values. Each field documents the source URL it was
// pulled from so the math can be independently audited.

export const PROVIDERS = [
  {
    id: "trt-nation",
    rank: 1,
    name: "TRT Nation",
    tagline: "trtnation.com · 45 states",
    badge: "Best Value",
    badgeColor: "green",
    cardClass: "best-value",
    advertisedMonthly: 99,
    // Math: $99/mo + ($129 labs × 2/yr) ÷ 12 = $99 + $21.50
    trueMonthly: 120.50,
    trueMonthlyDisplay: "~$120.50",
    annualTotal: 1446,
    mathNote: "$99 + ($258 labs ÷ 12)",
    annualNote: "$1,446/yr total · Advertised: $99/mo",
    breakdown: [
      { label: "Monthly medication", value: "$99.00", type: "included" },
      { label: "Labs × 2/yr ÷ 12", value: "+ $21.50", type: "extra" },
      { label: "Doctor/consult visits", value: "$0 (unlimited)", type: "included" },
      { label: "Supplies + shipping", value: "$0 (included)", type: "included" },
      { label: "Prescriber type", value: "NP / PA", type: "neutral" },
    ],
    features: [
      { text: "Injectable Testosterone Cypionate", icon: "💉", available: true },
      { text: "Unlimited provider consultations", icon: "🔁", available: true },
      { text: "No contract / cancel anytime", icon: "📦", available: true },
      { text: "No creams or oral options", icon: "🧴", available: false },
    ],
    source: {
      headline: "trtnation.com/faqs-2026",
      url: "https://trtnation.com/faqs-2026/",
      detail:
        "$99/mo pricing, $129 lab fee, and 6-month monitoring cadence pulled directly from their public FAQ page. Lab frequency (10 weeks, 6 months, then annually) confirmed on same page. Amortization uses 2 lab panels/yr as stated for ongoing patients.",
    },
  },
  {
    id: "maximus",
    rank: 2,
    name: "Maximus",
    tagline: "maximustribe.com · most states",
    badge: null,
    badgeColor: null,
    cardClass: "",
    advertisedMonthly: 99.99,
    // Math: $99.99/mo + ($99.99 initial lab + $99.99 follow-up) ÷ 12
    trueMonthly: 108.32,
    trueMonthlyDisplay: "~$108",
    annualTotal: 1300,
    mathNote: "$99.99 + ($199.98 labs ÷ 12)",
    annualNote: "$1,300/yr total · Advertised: $99.99/mo",
    breakdown: [
      { label: "Monthly medication (annual plan)", value: "$99.99", type: "included" },
      { label: "Initial lab ($99.99) ÷ 12", value: "+ $8.33", type: "extra" },
      { label: "Follow-up lab ($99.99) ÷ 12", value: "+ $8.33", type: "extra" },
      { label: "Doctor/consult visits", value: "$0 (included)", type: "included" },
      { label: "Prescriber type", value: "MD (Board-certified)", type: "neutral" },
    ],
    features: [
      { text: "Injectable, Oral, Cream & Enclomiphene", icon: "💊", available: true },
      { text: "Fertility-preserving protocols", icon: "🧬", available: true },
      { text: "24/7 doctor messaging", icon: "📲", available: true },
      { text: "At-home lab kit", icon: "🏠", available: true },
    ],
    source: {
      headline: "maximustribe.com/testosterone/Injectable-TRT",
      url: "https://www.maximustribe.com/testosterone/Injectable-TRT",
      detail:
        "$99.99/mo (annual plan) confirmed on product page. Lab kit pricing ($99.99 initial, $99.99 follow-up) sourced from leoweekly.com Maximus Tribe review and cross-referenced against their Quest lab order page. Two lab events assumed per year (baseline + one follow-up).",
    },
  },
  {
    id: "petermd",
    rank: 3,
    name: "PeterMD",
    tagline: "getpetermd.com · most states",
    badge: "~$140 Range",
    badgeColor: "purple",
    cardClass: "cmr",
    advertisedMonthly: 99,
    // Math: $99/mo + ($215 initial labs + $96 follow-up labs) ÷ 12 = $99 + $25.92 = $117.42/mo
    trueMonthly: 117.42,
    trueMonthlyDisplay: "~$117",
    annualTotal: 1409,
    mathNote: "$99 + ($215 initial labs + $96 follow-up) ÷ 12",
    annualNote: "$1,409/yr total · Advertised: $99/mo (labs extra)",
    breakdown: [
      { label: "Monthly medication + consults", value: "$99.00", type: "included" },
      { label: "Initial labs ($215) ÷ 12", value: "+$17.92", type: "extra" },
      { label: "Follow-up labs ($96/yr) ÷ 12", value: "+$8.00", type: "extra" },
      { label: "Supplies + shipping", value: "$0 (included)", type: "included" },
      { label: "Prescriber type", value: "MD (In-house)", type: "neutral" },
    ],
    features: [
      { text: "Injectable Testosterone Cypionate", icon: "💉", available: true },
      { text: "Unlimited consults + free shipping", icon: "🔁", available: true },
      { text: "Price-match guarantee (20% off)", icon: "💰", available: true },
      { text: "6-month initial commitment required", icon: "⏱️", available: false },
    ],
    source: {
      headline: "getpetermd.com",
      url: "https://getpetermd.com",
      detail:
        "$99/mo base price confirmed on homepage: 'plans starting at $99/month, free consults, shipping, and supplies included.' Lab costs ($215 first year, $96/yr after) sourced from optimizebiomarkers.com/hormone-optimization Jan 2026 comparison. Price-match guarantee and 6-month initial commitment confirmed in published terms.",
    },
  },
  {
    id: "henry-meds",
    rank: 4,
    name: "Henry Meds",
    tagline: "henrymeds.com · most states",
    badge: "Mid-Range Pick",
    badgeColor: "purple",
    cardClass: "mid-range",
    advertisedMonthly: 129,
    // Math: $129/mo flat — provider visits, labs, medication, supplies, shipping all included
    trueMonthly: 129,
    trueMonthlyDisplay: "$129",
    annualTotal: 1548,
    mathNote: "$129 + $0 extras = $129 flat",
    annualNote: "$1,548/yr total · Advertised: $129/mo ✓ accurate",
    breakdown: [
      { label: "Medication (inj, cream, or enclomiphene)", value: "$0 extra (bundled)", type: "included" },
      { label: "Lab work", value: "$0 extra (bundled)", type: "included" },
      { label: "Provider visits", value: "$0 extra (bundled)", type: "included" },
      { label: "Supplies + shipping", value: "$0 extra (bundled)", type: "included" },
      { label: "Prescriber type", value: "NP / PA", type: "neutral" },
    ],
    features: [
      { text: "Injectable, cream, oral, or enclomiphene", icon: "💊", available: true },
      { text: "Labs fully included, no extras", icon: "🔬", available: true },
      { text: "No contracts / cancel anytime", icon: "📦", available: true },
      { text: "Ages 35–65 only (eligibility restriction)", icon: "⚠️", available: false },
    ],
    source: {
      headline: "henrymeds.com/treatments/trt",
      url: "https://henrymeds.com/treatments/trt",
      detail:
        "Compounded TRT starts at $129/mo confirmed directly on their treatments page: 'That price includes everything — your healthcare provider visits, labwork, medication and supplies, shipping, and ongoing support.' Cross-referenced with innovativemen.com and 1stoptimal.com/best-online-trt-provider for consistency. Oral Kyzatrex tier is $179/mo (not used here — lowest compounded rate applied).",
    },
  },
  {
    id: "fountain-trt",
    rank: 5,
    name: "Fountain TRT",
    tagline: "fountain.net · most states",
    badge: "Most Inclusive",
    badgeColor: "blue",
    cardClass: "most-inclusive",
    advertisedMonthly: 199,
    // Math: $199 flat, zero extras — labs, urologist visits, meds, concierge all bundled
    trueMonthly: 199,
    trueMonthlyDisplay: "$199",
    annualTotal: 2388,
    mathNote: "$199 + $0 extras = $199 flat",
    annualNote: "$2,388/yr total · Advertised: $199/mo ✓ accurate",
    breakdown: [
      { label: "Medication (cream or injection)", value: "$0 extra (bundled)", type: "included" },
      { label: "Lab work (LabCorp, biannual)", value: "$0 extra (bundled)", type: "included" },
      { label: "MD Urologist video visits", value: "$0 extra (bundled)", type: "included" },
      { label: "Concierge + 24/7 support", value: "$0 extra (bundled)", type: "included" },
      { label: "Prescriber type", value: "MD (Urologist)", type: "neutral" },
    ],
    features: [
      { text: "Topical cream or injections", icon: "🧴", available: true },
      { text: "Live video with board-certified urologist", icon: "🎥", available: true },
      { text: "Labs fully included", icon: "🔬", available: true },
      { text: "Mobile-first app experience", icon: "📱", available: true },
    ],
    source: {
      headline: "fountain.net",
      url: "https://fountain.net",
      detail:
        "'One flat monthly fee, all-inclusive' language confirmed directly on site. $199/mo price verified via finvsfin.com/fountain-trt-reviews and optimizebiomarkers.com/hormone-providers/fountain-trt (Jan 2026 data). Inclusion of labs, medication, video visits, and concierge support confirmed across three independent sources.",
    },
  },
  {
    id: "hone-health",
    rank: 6,
    name: "Hone Health",
    tagline: "honehealth.com · 35 states",
    badge: "Most Comprehensive",
    badgeColor: "gold",
    cardClass: "premium",
    advertisedMonthly: 149,
    // Math: $149/mo Premium membership + $65 initial lab ÷ 12 + ~$40/mo medication avg
    trueMonthly: 199,
    trueMonthlyDisplay: "~$194–209",
    annualTotal: 2400,
    mathNote: "$149 + $5.42 (init lab) + $40–55 med",
    annualNote: "$2,340–2,508/yr total · Advertised: $149/mo (membership only)",
    breakdown: [
      { label: "Premium membership/mo", value: "$149.00", type: "included" },
      { label: "Initial $65 lab ÷ 12", value: "+ $5.42", type: "extra" },
      { label: "Medication (inj. avg)", value: "+ ~$40–55/mo", type: "extra" },
      { label: "Live MD/DO video visits", value: "$0 (included in Premium)", type: "included" },
      { label: "Prescriber type", value: "MD / DO", type: "neutral" },
    ],
    features: [
      { text: "Injections, creams, troches", icon: "💉", available: true },
      { text: "Live MD/DO video consults", icon: "🩺", available: true },
      { text: "Direct insurance billing", icon: "🏥", available: true },
      { text: "40+ biomarker panels", icon: "📊", available: true },
    ],
    source: {
      headline: "honehealth.com/mens/testosterone-replacement-therapy",
      url: "https://honehealth.com/mens/testosterone-replacement-therapy/",
      detail:
        "Premium plan at $149/mo confirmed directly. Medication as a separate charge ($40–55/mo for injectable testosterone) sourced from hims.com/blog/hims-vs-hone which states 'effective starting price ~$177/mo for TRT.' Initial $65 lab cost confirmed on honehealth.com/mens/testosterone-replacement-therapy. All three figures added and amortized.",
    },
  },
];
