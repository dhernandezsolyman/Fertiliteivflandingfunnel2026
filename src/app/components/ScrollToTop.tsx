import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export function ScrollToTopLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
