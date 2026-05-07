# Fertilité IVF Funnel - Customization Guide

## Quick Start
This funnel is ready to deploy. To customize for your specific clinic needs, follow this guide.

## 🎨 Brand Customization

### Colors
The funnel uses a teal color scheme. To change to your brand colors:

**Primary Color (Teal)**: Search and replace these classes globally:
- `teal-50` → `your-color-50`
- `teal-100` → `your-color-100`
- `teal-200` → `your-color-200`
- `teal-600` → `your-color-600`
- `teal-700` → `your-color-700`
- `teal-800` → `your-color-800`
- `teal-900` → `your-color-900`

Files to update:
- All components in `/src/app/pages/`
- `/src/app/components/ProgressBar.tsx`
- `/src/app/components/AnswerChip.tsx`

### Clinic Information

**Landing Page** (`/src/app/pages/Landing.tsx`):
- Update clinic name from "Fertilité"
- Change location from "Tijuana" to your location
- Update statistics (years, successful cycles, savings, support)
- Modify trust indicators

**Contact Methods** (`/src/app/pages/Results.tsx`):
- Update WhatsApp number in `handleWhatsApp()`: `'https://wa.me/YOUR_NUMBER'`
- Update phone number in `handleCall()`: `'tel:+YOUR_NUMBER'`
- Update email in `handleEmail()`: `'mailto:YOUR_EMAIL'`

## 💰 Pricing Customization

**Location**: `/src/app/pages/Results.tsx`

**Function**: `getCostEstimate()`

Current structure:
```typescript
const getCostEstimate = () => {
  const isYounger = data.age === 'Under 35' || data.age === '35 to 37';
  return {
    singleCycle: isYounger ? '$5,500 - $6,800' : '$6,200 - $7,500',
    multiCycle: isYounger ? '$14,500 - $16,800' : '$16,200 - $18,500',
    usSingleCycle: isYounger ? '$15,000 - $20,000' : '$18,000 - $25,000'
  };
};
```

**Customize**:
- Adjust price ranges for your clinic
- Add more age-based pricing tiers if needed
- Update comparison pricing (usSingleCycle)

## 📝 Copy & Messaging

### Headlines
Key headlines to customize for your positioning:

1. **Landing Hero** (`/src/app/pages/Landing.tsx`):
   - Main H1: "A More Confident Path to IVF"
   - Subhead: "Fertilité offers premium IVF care..."

2. **Commitment Trigger** (`/src/app/pages/Commitment.tsx`):
   - Dynamic messages based on journey stage
   - Update `getMessage()` function

3. **Results Page** (`/src/app/pages/Results.tsx`):
   - Personalized messaging in `getPersonalizedMessage()`

### Multi-Cycle Framing
**Critical positioning language** - edit carefully:

Location: `/src/app/pages/Results.tsx` - Multi-Cycle card

Key phrases:
- "Not an upsell—a smarter path forward"
- "Less pressure, greater confidence"
- "One upfront price—no surprise costs"

**Maintain tone**: Peace of mind, not premium upsell

## 🔧 Filtering Logic

### Soft Filters (Low friction)

**Step 1 - Location** (`/src/app/pages/Step1.tsx`):
```typescript
const locations = [
  'Southern California',
  'Arizona',
  'Northern Mexico',
  'Other US',
  'Other'
];
```

**Step 2 - Age** (`/src/app/pages/Step2.tsx`):
```typescript
const ageRanges = [
  'Under 35',
  '35 to 37',
  '38 to 40',
  '41 to 42',
  '43 plus'
];
```

**Step 3 - Journey** (`/src/app/pages/Step3.tsx`):
```typescript
const journeyStages = [
  'Just starting',
  'Choosing between clinics',
  'Had 1 failed IVF cycle',
  'Had 2 or more failed IVF cycles',
  'Looking for advanced options'
];
```

### Hard Filters (Higher friction, quality control)

**Step 4** (`/src/app/pages/Step4.tsx`):
- Timeline options
- Travel willingness
- Low-intent warning logic

**Step 5** (`/src/app/pages/Step5.tsx`):
- Concerns list
- Current clinic status
- Path openness

## 🎯 Personalization Logic

### Commitment Trigger Messages
**File**: `/src/app/pages/Commitment.tsx`

Customize `getMessage()` to handle:
- Failed cycle patients
- First-time patients
- General patients

### Results Page Personalization
**File**: `/src/app/pages/Results.tsx`

Customize `getPersonalizedMessage()` based on:
- Primary concern
- Journey stage
- Path openness

## 📊 Analytics Integration

Add tracking to key conversion points:

1. **Step Completions**:
   - Add event tracking to each step's "Continue" button
   - Track answer selections for optimization

2. **Contact Form Submission**:
   - Track in `/src/app/pages/Contact.tsx` `handleSubmit()`

3. **Results Page CTAs**:
   - Track WhatsApp clicks
   - Track phone clicks
   - Track email clicks

Example (Google Analytics):
```typescript
// In handleWhatsApp()
window.gtag?.('event', 'whatsapp_click', {
  event_category: 'Contact',
  event_label: 'Results Page'
});
```

## 🌐 Images

Current images use Unsplash. Replace with your clinic's images:

**Landing Page** (`/src/app/pages/Landing.tsx`):
- Hero background image
- Clinic interior image (if needed)

**Results Page** (`/src/app/pages/Results.tsx`):
- Clinic facility image

**Use ImageWithFallback component**:
```typescript
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

<ImageWithFallback
  src="YOUR_IMAGE_URL"
  alt="Description"
  className="w-full h-full object-cover"
/>
```

## 🧪 A/B Testing Opportunities

### High-Impact Tests:

1. **Multi-Cycle Positioning**:
   - Test different framing languages
   - Test pricing display (side-by-side vs sequential)

2. **Commitment Trigger Timing**:
   - Current: After Step 3
   - Test: After Step 2 or before Step 5

3. **CTA Copy**:
   - Landing: "Find Your Personalized IVF Path"
   - Test: "Discover Your Treatment Options", "Get Your Free Consultation"

4. **Pricing Display**:
   - Current: Range pricing
   - Test: Fixed pricing, age-specific pricing

5. **Social Proof**:
   - Add testimonials at different funnel stages
   - Test video vs text testimonials

## 🔒 Backend Integration

### Form Submission
Currently, the funnel stores data in React Context. To integrate with your backend:

**File**: `/src/app/pages/Contact.tsx`

Replace navigation with API call:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isValidForm) {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          firstName,
          email,
          phone,
          contactMethod
        })
      });
      
      if (response.ok) {
        updateData({ firstName, email, phone, contactMethod });
        navigate('/results');
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Show error message
    }
  }
};
```

### Recommended Backend Actions:
1. Store lead in CRM (Salesforce, HubSpot, etc.)
2. Send confirmation email to patient
3. Notify sales team via email/Slack
4. Create task in clinic management system

## 📱 Mobile Optimization

The funnel is mobile-first. Key mobile features:

1. **Sticky Bottom CTA** on Results page
2. **Touch-friendly** answer chips (48px minimum)
3. **Responsive** layouts with Tailwind breakpoints
4. **WhatsApp integration** (primary for mobile users)

Test on:
- iPhone SE (small screen)
- iPhone 14 Pro (standard)
- iPad (tablet)
- Various Android devices

## 🚀 Deployment Checklist

Before launching:

- [ ] Update all clinic information
- [ ] Customize pricing
- [ ] Replace placeholder images
- [ ] Update contact information (WhatsApp, phone, email)
- [ ] Add analytics tracking
- [ ] Integrate with backend/CRM
- [ ] Test full funnel on mobile
- [ ] Test all conversion paths
- [ ] Set up email confirmations
- [ ] Configure thank-you page
- [ ] Test form validations
- [ ] Review all copy for accuracy
- [ ] Verify multi-cycle positioning aligns with clinic policy

## 🎓 Traffic Source Optimization

### Google Search Ads
- Consider adding UTM parameters to track source
- May want different landing page for high-intent keywords
- Consider showing results earlier for branded searches

### Meta Ads
- Add Meta Pixel for conversion tracking
- Consider showing more education content
- May need longer nurture sequence

## 📈 Key Metrics to Track

1. **Funnel Completion Rate**:
   - Landing → Step 1: % who start
   - Step 1 → Contact: % who complete
   - Contact → Results: Lead capture rate

2. **Lead Quality Indicators**:
   - Timeline distribution (ASAP vs Research)
   - Travel willingness distribution
   - Multi-cycle interest %

3. **Business Outcomes**:
   - Cost per lead
   - Lead-to-consultation rate
   - Consultation-to-treatment rate
   - Multi-cycle acceptance rate

## 🆘 Support

For questions about implementation, refer to:
- `/src/app/FUNNEL_STRATEGY.md` - Complete strategy documentation
- Component files for specific functionality
- Tailwind CSS documentation for styling
- React Router documentation for navigation

## 🔄 Version Control

When making changes:
1. Test in development environment first
2. A/B test major changes before full rollout
3. Track conversion rates before/after changes
4. Keep this guide updated with customizations
