import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import {
  getStoredConsent,
  gtagConsentUpdate,
  initPixelAndTrackPageView,
} from '../lib/tracking';

const DEV = import.meta.env.DEV;

/**
 * Cookie consent banner.
 *
 * Scope is intentionally narrow:
 *  - Show the banner to new visitors (no stored choice).
 *  - Handle Accept All and Reject Non-Essential actions.
 *
 * Returning visitors: gtag consent was already restored in index.html
 * before gtag('config') ran. Meta Pixel init for returning visitors
 * is handled by Analytics.tsx on first render, not here.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();

    if (DEV) {
      console.log('[CookieConsent] Stored consent on mount:', stored ?? 'none (new visitor)');
    }

    if (!stored) {
      // New visitor — show banner after 1 s
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }

    // Returning visitor: nothing to do here.
    // gtag consent was applied in index.html.
    // Meta Pixel init is handled by Analytics.tsx.
  }, []);

  // ── Accept All ─────────────────────────────────────────────────────────────

  const handleAccept = () => {
    localStorage.setItem('fertilite_cookie_consent', 'accepted');

    // Update Google Consent Mode v2 immediately, before any navigation.
    gtagConsentUpdate(true);

    // Init Meta Pixel and fire the first PageView for the current route.
    // Analytics will handle all subsequent route-change PageViews;
    // trackPixelPageView's path dedup prevents a double-fire for this route.
    initPixelAndTrackPageView(window.location.pathname);

    setShow(false);
  };

  // ── Reject Non-Essential ───────────────────────────────────────────────────

  const handleDecline = () => {
    localStorage.setItem('fertilite_cookie_consent', 'declined');

    // Update Google Consent Mode v2 immediately, before any navigation.
    gtagConsentUpdate(false);

    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-teal-600 shadow-2xl z-50 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
                We use cookies to improve your experience and measure site traffic via Google Analytics.
                By clicking "Accept", you consent to our use of cookies and data collection as described in our{' '}
                <a href="/privacy" className="text-teal-600 underline hover:text-teal-700">
                  Privacy Policy
                </a>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-6 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors shadow-md"
            >
              Accept All
            </button>
          </div>

          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 sm:relative sm:top-0 sm:right-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
