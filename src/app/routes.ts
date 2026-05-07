import { createBrowserRouter } from 'react-router';
import { ScrollToTopLayout } from './components/ScrollToTop';
import { Landing } from './pages/Landing';
import { Step1 } from './pages/Step1';
import { Step2 } from './pages/Step2';
import { Step3 } from './pages/Step3';
import { Commitment } from './pages/Commitment';
import { Step4 } from './pages/Step4';
import { Step5 } from './pages/Step5';
import { Contact } from './pages/Contact';
import { Results } from './pages/Results';
import { Privacy } from './pages/Privacy';
import { HeroExamples } from './pages/HeroExamples';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    Component: ScrollToTopLayout,
    children: [
      { path: '/', Component: Landing },
      { path: '/step-1', Component: Step1 },
      { path: '/step-2', Component: Step2 },
      { path: '/step-3', Component: Step3 },
      { path: '/commitment', Component: Commitment },
      { path: '/step-4', Component: Step4 },
      { path: '/step-5', Component: Step5 },
      { path: '/contact', Component: Contact },
      { path: '/results', Component: Results },
      { path: '/privacy', Component: Privacy },
      { path: '/hero-examples', Component: HeroExamples },
      { path: '*', Component: NotFound },
    ],
  },
]);
