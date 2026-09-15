/**
 * Centralised tracking module.
 *
 * Owns:
 *  - gtag consent updates
 *  - GA4 page_view events (called by Analytics component on every route change)
 *  - Meta Pixel init + PageView (gated on advertising consent, deduped per navigation)
 *
 * Google Consent Mode v2 note:
 *  Advanced mode allows Google to send cookieless pings when storage is denied.
 *  Google may use these pings to produce modelled conversion estimates when
 *  eligibility requirements are met — this is not guaranteed.
 */

const DEV = import.meta.env.DEV;

const FB_PIXEL_ID = '480677391421581';

// ─── Module-level state (resets on full page reload) ─────────────────────────

/** True once fbq('init') has been called in this page session. */
let pixelInitialized = false;

/**
 * Dedup state for Meta Pixel PageView.
 * Prevents duplicate fires when both CookieConsent and Analytics attempt to
 * track the same route in the same render cycle (e.g. on initial accept).
 * Uses a time-window rather than permanent path suppression, so navigating
 * back to a previously visited pathname still generates a new PageView.
 */
let lastPixelPath: string | null = null;
let lastPixelTimestamp = 0;
const PIXEL_DEDUP_WINDOW_MS = 200;

// ─── Consent helpers ──────────────────────────────────────────────────────────

export type ConsentChoice = 'accepted' | 'declined' | null;

export function getStoredConsent(): ConsentChoice {
  try {
    return localStorage.getItem('fertilite_cookie_consent') as ConsentChoice;
  } catch {
    return null;
  }
}

export function hasAdConsent(): boolean {
  return getStoredConsent() === 'accepted';
}

// ─── Google tag ───────────────────────────────────────────────────────────────

/**
 * Update Google Consent Mode v2 state.
 * Called immediately on Accept or Decline — before any navigation.
 */
export function gtagConsentUpdate(granted: boolean): void {
  const g = window as any;
  if (typeof g.gtag !== 'function') {
    if (DEV) console.warn('[Tracking] gtagConsentUpdate called but gtag not loaded');
    return;
  }
  const state = granted ? 'granted' : 'denied';
  g.gtag('consent', 'update', {
    analytics_storage:  state,
    ad_storage:         state,
    ad_user_data:       state,
    ad_personalization: state,
  });
  if (DEV) console.log(`[Tracking] gtag consent update → ${state}`);
}

/**
 * Fire a GA4 page_view event.
 * Called on every SPA route change by the Analytics component.
 * Consent Mode handles denied sessions internally — always fire.
 */
export function trackGtagPageView(pathname: string, title: string): void {
  const g = window as any;
  if (typeof g.gtag !== 'function') {
    if (DEV) console.warn('[Tracking] trackGtagPageView: gtag not loaded');
    return;
  }
  g.gtag('event', 'page_view', {
    page_path:     pathname,
    page_title:    title,
    page_location: window.location.href,
  });
  if (DEV) {
    console.log(`[Tracking] GA4 page_view → ${pathname} | title: "${title}" | gtag loaded: true`);
  }
}

// ─── Meta Pixel ───────────────────────────────────────────────────────────────

/**
 * Initialize Meta Pixel.
 * Idempotent — safe to call multiple times; only runs once per page session.
 * Bails out silently if advertising consent has not been granted.
 */
export function initMetaPixel(): void {
  if (pixelInitialized) return;

  if (!hasAdConsent()) {
    if (DEV) console.log('[Tracking] Meta Pixel init skipped — ad consent not granted');
    return;
  }

  const w = window as any;

  // Bootstrap the fbq queue if the SDK has not loaded yet
  if (typeof w.fbq !== 'function') {
    const fbq: any = function (...args: any[]) {
      fbq.callMethod
        ? fbq.callMethod.apply(fbq, args)
        : fbq.queue.push(args);
    };
    fbq.push    = fbq;
    fbq.loaded  = true;
    fbq.version = '2.0';
    fbq.queue   = [];
    w.fbq  = fbq;
    w._fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src   = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  w.fbq('init', FB_PIXEL_ID);
  pixelInitialized = true;

  if (DEV) console.log(`[Tracking] Meta Pixel initialized → ${FB_PIXEL_ID}`);
}

/**
 * Fire a Meta Pixel PageView for the given pathname.
 * Guards:
 *  - pixel must be initialized (i.e., consent was granted)
 *  - deduplicates against lastPixelPath to prevent double-fire when
 *    CookieConsent and the Analytics component both run for the same route
 */
export function trackPixelPageView(pathname: string): void {
  if (!pixelInitialized) return;
  if (!hasAdConsent()) return;

  const now = Date.now();
  if (lastPixelPath === pathname && now - lastPixelTimestamp < PIXEL_DEDUP_WINDOW_MS) {
    if (DEV) console.log(`[Tracking] Meta Pixel PageView deduped (within ${PIXEL_DEDUP_WINDOW_MS}ms) → ${pathname}`);
    return;
  }

  lastPixelPath = pathname;
  lastPixelTimestamp = now;
  (window as any).fbq('track', 'PageView');

  if (DEV) console.log(`[Tracking] Meta Pixel PageView → ${pathname}`);
}

/**
 * Convenience: init pixel then fire PageView.
 * Called by CookieConsent on Accept and on returning-visitor mount.
 */
export function initPixelAndTrackPageView(pathname: string): void {
  initMetaPixel();
  trackPixelPageView(pathname);
}
