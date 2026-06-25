/* ──────────────────────────────────────────────────────────────
   MayseQards — Seller reviews (feeds the "Wall of Cards" tab)
   ──────────────────────────────────────────────────────────────
   REAL buyer feedback ONLY. These render publicly on the storefront,
   so never invent, pad, or paraphrase a review into something nicer.
   Add an entry only when Mayson provides actual eBay feedback (or a
   real buyer message), copied verbatim.

   Each review object:
     text    the buyer's words, verbatim (trim only)
     author  buyer's eBay username (or "eBay buyer" if withheld)
     date    "YYYY-MM-DD" of the feedback
     stars   1–5 (eBay positive feedback → 5). Optional, defaults to 5.
     card    optional card id the sale was for, e.g. "C027"
   ────────────────────────────────────────────────────────────── */

window.REVIEWS = [
  // Real reviews go here. Example shape (commented out — not shown on the site):
  // {"text":"Card exactly as described, shipped fast and very well protected. A+ seller!","author":"hoops_collector_84","date":"2026-06-22","stars":5,"card":"C027"}
];
