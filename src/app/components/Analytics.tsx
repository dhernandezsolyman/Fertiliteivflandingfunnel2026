import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { initMetaPixel, trackGtagPageView, trackPixelPageView } from '../lib/tracking';

/**
 * Route-change analytics tracker. Rendered inside ScrollToTopLayout so it
 * has router context and covers every route.
 *
 * Responsibilities:
 *  - Fire one GA4 page_view per route change (consent mode handles denied state).
 *  - Attempt Meta Pixel init on every route change (idempotent, gated on stored
 *    consent). This is the single place that initialises the pixel for returning
 *    visitors — no component mount timing is relied upon.
 *  - Fire one Meta Pixel PageView per route change when pixel is initialised.
 *
 * Returning visitors: stored consent was already applied to gtag in index.html
 * before gtag('config') and before the React bundle executed. Meta Pixel init
 * happens here on first render, not in CookieConsent.
 *
 * New visitors who accept: CookieConsent.handleAccept calls initMetaPixel()
 * and fires the first PageView. initMetaPixel() is idempotent, so subsequent
 * calls here are no-ops; trackPixelPageView's path dedup prevents double-fire.
 */
export function Analytics() {
  const location = useLocation();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const { pathname } = location;

    // Guard against React StrictMode double-invoke and same-path re-renders.
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    // GA4 — always fire unconditionally; Consent Mode handles denied state.
    // rAF lets the browser update document.title before we read it.
    requestAnimationFrame(() => {
      trackGtagPageView(pathname, document.title);
    });

    // Meta Pixel — attempt init (idempotent; bails if no ad consent or already done),
    // then fire PageView. trackPixelPageView deduplicates by path so the first
    // PageView fired by handleAccept is not repeated here for the same route.
    initMetaPixel();
    trackPixelPageView(pathname);
  }, [location]);

  return null;
}
