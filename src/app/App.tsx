import { RouterProvider } from 'react-router';
import { router } from './routes';
import { FunnelProvider } from './context/FunnelContext';
import { CookieConsent } from './components/CookieConsent';

export default function App() {
  return (
    <FunnelProvider>
      <RouterProvider router={router} />
      <CookieConsent />
    </FunnelProvider>
  );
}
