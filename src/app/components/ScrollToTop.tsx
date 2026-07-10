import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { Analytics } from './Analytics';

export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export function ScrollToTopLayout() {
  return (
    <>
      <ScrollRestoration />
      <Analytics />
      <Outlet />
    </>
  );
}
