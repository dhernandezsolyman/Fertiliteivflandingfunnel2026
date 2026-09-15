# 🌟 Fertilite IVF Funnel - Production Ready

Premium, high-converting multi-step landing page funnel for Fertilite IVF Clinic in Tijuana. Complete with Supabase backend, intelligent lead scoring (0-100), and coordinator dashboard.

**✅ Ready to deploy to Vercel with custom domain**

## 🎯 Project Goals

This funnel is specifically designed to:
- **Increase qualified lead conversion** through progressive commitment
- **Improve lead quality** via soft and hard filtering
- **Increase IVF treatment starts** per captured lead
- **Reduce spam and low-intent inquiries**
- **Increase multi-cycle treatment acceptance**
- **Maximize patient lifetime value**

## 🏗️ Architecture

### Technology Stack
- **React 19** + **Vite 8** - Fast, modern frontend
- **TypeScript 6** - Full type safety
- **React Router 7** - SPA routing with scroll restoration
- **Tailwind CSS v4** - Utility-first styling with custom theme
- **Supabase** - PostgreSQL database + Edge Functions
- **Lucide React** - Icon system

### Backend Integration
- **3-table normalized schema** (leads, lead_responses, coordinator_actions)
- **9 SQL views** for coordinator dashboard
- **Weighted lead scoring** algorithm (0-100 scale)
- **Real-time lead capture** with UTM attribution
- **SLA tracking** (1hr/4hr/24hr response times)

### Funnel Flow
```
Landing Page
    ↓
Soft Filters (Steps 1-3)
    ↓ Location → Age → Journey Stage
Commitment Trigger
    ↓ Personalized bridge message
Hard Filters (Steps 4-5)
    ↓ Timeline → Travel → Concerns → Clinic Status → Path Openness
Contact Gate
    ↓ Name → Email → Phone → Contact Preference
Personalized Results
    ↓ Summary → Pricing → Trust → Travel → Multi-Cycle Framing
Final Conversion
    ✓ WhatsApp / Phone / Email
```

## 📁 Project Structure

```
/src/app/
├── components/
│   ├── AnswerChip.tsx          # One-click answer selection
│   ├── ProgressBar.tsx         # Step progress indicator
│   ├── StepContainer.tsx       # Consistent step layout
│   └── ScrollToTop.tsx         # Auto-scroll on navigation
├── context/
│   └── FunnelContext.tsx       # Funnel data state management
├── pages/
│   ├── Landing.tsx             # Hero & value proposition
│   ├── Step1.tsx               # Location filter
│   ├── Step2.tsx               # Age filter
│   ├── Step3.tsx               # Journey stage filter
│   ├── Commitment.tsx          # Personalized bridge
│   ├── Step4.tsx               # Timeline & travel
│   ├── Step5.tsx               # Deep qualification
│   ├── Contact.tsx             # Lead capture form
│   ├── Results.tsx             # Personalized results & conversion
│   └── NotFound.tsx            # 404 page
├── routes.ts                   # React Router configuration
├── App.tsx                     # Root component
└── FUNNEL_STRATEGY.md          # Complete strategy documentation
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Setup
Create `.env`:
```env
VITE_SUPABASE_URL=https://mimwhojyxpeerfqtgmic.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Development Server
```bash
pnpm dev
```
Visit `http://localhost:5173`

### 4. Build for Production
```bash
pnpm build
pnpm preview  # Test production build
```

---

## 📊 Lead Scoring System

### Weighted Algorithm (0-100 scale)
| Factor | Weight | Purpose |
|--------|--------|---------|
| Timeline | 25% | Strongest urgency indicator |
| Travel Willingness | 20% | Must be willing to visit Tijuana |
| IVF Journey | 15% | Experience level + pain points |
| Location | 10% | Geographic proximity matters |
| Clinic Status | 10% | Switching intent signals quality |
| Path Interest | 10% | Multi-cycle = higher LTV |
| Age | 5% | Medical factor (less controllable) |
| Concern | 5% | Context for messaging |

### Score Thresholds
- **🔥 HOT (75-100):** Highly Qualified → Contact within 1 hour
- **🟡 WARM (55-74):** Qualified → Contact within 4 hours  
- **🔵 COOL (35-54):** Needs Nurturing → 24-hour follow-up
- **❄️ COLD (0-34):** Low Intent → Nurture sequence (48hrs)

See `/LEAD_SCORING_TEST_RESULTS.md` for 8 detailed test scenarios.

---

## 💾 Database Setup

### 1. Create Tables (Already Done!)
Your 3 tables are already created:
- `leads` - Main lead data with scoring
- `lead_responses` - Audit trail (question/answer pairs)
- `coordinator_actions` - Follow-up tasks

### 2. Create Coordinator Views
Run `supabase-views-FIXED.sql` in Supabase SQL Editor to create 9 views:
- `hot_leads` - Score 75+ (1hr SLA)
- `warm_leads` - Score 55-74 (4hr SLA)
- `cool_leads` - Score 35-54 (24hr nurture)
- `coordinator_dashboard` - Main view with SLA tracking
- `overdue_leads` - Missed SLA deadlines
- `pending_actions` - To-do list
- `multi_cycle_leads` - High LTV segment ($8,790-$14,190)
- `failed_cycle_patients` - High intent (previous failures)
- `daily_stats` - Performance metrics

See `/COORDINATOR_DASHBOARD_GUIDE.md` for usage instructions.

---

## 🚢 Deploy to Production

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Fertilite IVF funnel"

# Option A: Using GitHub CLI
gh repo create fertilite-ivf-funnel --public --source=. --push

# Option B: Manual
# Create repo at github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/fertilite-ivf-funnel.git
git push -u origin main
```

### Deploy to Vercel (5 minutes)
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**
5. Add custom domain: `start.fertilite.com`

See `/DEPLOYMENT_GUIDE.md` for complete instructions.

---

## 🎨 Key Features

### 1. Progressive Commitment
Each step builds on previous user investment, creating a psychological commitment to complete the funnel.

### 2. Smart Filtering
- **Soft filters** (Steps 1-3): Low-friction, one-click answers for segmentation
- **Hard filters** (Steps 4-5): Higher-investment questions that filter low-intent leads

### 3. Multi-Cycle Positioning
Multi-cycle IVF is framed as:
- ✅ Peace of mind, not an upsell
- ✅ Structured path vs. single high-stakes bet
- ✅ Less pressure on individual attempts
- ✅ Clear treatment plan

**NOT** framed as:
- ❌ Premium pricing tier
- ❌ "Spend more, get more"
- ❌ Required path

### 4. Personalization
Content adapts based on:
- Journey stage (first-time vs. failed cycles)
- Age range (pricing, messaging)
- Primary concern (fear, cost, trust)
- Path openness (single vs. multi-cycle interest)

### 5. Mobile-First Design
- Touch-friendly controls (48px minimum)
- Sticky bottom CTAs on mobile
- Responsive layouts
- WhatsApp integration

### 6. Premium Medical Aesthetic
- Clean, modern design
- Teal color palette (trust + medical)
- Professional imagery
- Emotionally intelligent copy

## 📊 Conversion Psychology

### Emotional Journey
1. **Fear** - IVF might not work
2. **Hope** - There's a better path
3. **Curiosity** - What's my personalized option?
4. **Investment** - I've answered this much...
5. **Validation** - They understand my situation
6. **Trust** - Transparent, credible, premium
7. **Action** - I want to talk to them

### Filter Strategy
Filters out:
- Random curiosity (no timeline)
- Unwilling to travel
- Zero commitment signals
- Form spam

Keeps:
- Serious timeline (ASAP to 6 months)
- Open to travel
- Specific concerns
- Comparing clinics or switching

## 🎯 Target Audience

### Geographic
- Southern California
- Arizona
- Northern Mexico
- Broader US

### Demographic
- Ages 25-45+
- Couples experiencing infertility
- Previous failed IVF cycles
- First-time IVF patients
- Patients comparing clinics
- Cost-conscious patients

### Psychographic
- Emotionally exhausted
- Fear of IVF failure
- Seeking trust/credibility
- Want clear path forward
- Considering cross-border treatment

## 📱 Traffic Sources

### Google Search Ads (High Intent)
- IVF cost keywords
- IVF clinic comparison
- Failed IVF keywords
- Location-specific (Tijuana IVF, California IVF)

Expected behavior:
- Faster funnel completion
- Higher conversion rate
- More "ASAP" timeline selections

### Meta Ads (Awareness/Education)
- Broader targeting
- Education content
- Comparison messaging
- Success stories

Expected behavior:
- More exploration
- "Research" timeline selection
- May need remarketing

## 🔧 Customization

See `/CUSTOMIZATION_GUIDE.md` for detailed instructions on:
- Brand colors and styling
- Clinic information
- Pricing customization
- Copy and messaging
- Analytics integration
- Backend integration

## 📈 Key Metrics

### Funnel Metrics
- Landing → Step 1 (engagement rate)
- Step 1 → Commitment (soft filter completion)
- Commitment → Contact (hard filter completion)
- Contact → Results (lead capture rate)
- Results → Consultation (conversion rate)

### Lead Quality Metrics
- Timeline distribution
- Travel willingness
- Path openness (multi-cycle interest)
- Journey stage breakdown

### Business Metrics
- Cost per qualified lead
- Lead-to-consultation rate
- Consultation-to-treatment rate
- Multi-cycle acceptance rate
- Patient lifetime value

## 🔗 Backend API

### Supabase Edge Function
Base URL: `https://mimwhojyxpeerfqtgmic.supabase.co/functions/v1/make-server-41f10ad7`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/leads` | POST | Initialize lead tracking |
| `/leads/:id/responses` | POST | Save step responses |
| `/leads/:id/submit` | POST | Final submission + scoring |
| `/leads/:id` | GET | Retrieve lead details |

### Data Flow
1. **Funnel Start** → Create lead with UTM attribution
2. **Each Step** → Save responses (optional - stored in sessionStorage)
3. **Contact Submit** → Full lead created in database with score
4. **Coordinator** → Views update in real-time

### Privacy & Security
- ✅ Environment variables for API keys
- ✅ Supabase Row Level Security (RLS) enabled
- ✅ Input validation on all forms
- ✅ Service role key never exposed to frontend
- ✅ `.env` in `.gitignore`
- ✅ Privacy assurance messaging on contact form

## 🎓 Strategy Documentation

For complete strategic thinking behind this funnel, see:
- `/src/app/FUNNEL_STRATEGY.md` - Full strategy breakdown
- `/CUSTOMIZATION_GUIDE.md` - Implementation guide

## 🧪 Testing Recommendations

### A/B Test Ideas
1. Multi-cycle positioning language
2. Commitment trigger placement
3. Pricing display format
4. CTA button copy
5. Social proof placement

### Quality Assurance
- [ ] Test full funnel on mobile
- [ ] Verify all navigation paths
- [ ] Test form validation
- [ ] Check responsive breakpoints
- [ ] Verify personalization logic
- [ ] Test contact method handling

## 🆘 Troubleshooting

### Common Issues

**Routing not working**:
- Verify React Router is installed
- Check `routes.ts` configuration
- Ensure `RouterProvider` is in `App.tsx`

**State not persisting**:
- Verify `FunnelProvider` wraps `RouterProvider`
- Check Context imports in pages

**Styling issues**:
- Tailwind v4 uses new CSS syntax
- Check `/src/styles/tailwind.css`
- Verify `@tailwindcss/vite` plugin

## 📖 Documentation

- **`/DEPLOYMENT_GUIDE.md`** - Complete Vercel deployment instructions
- **`/LEAD_SCORING_TEST_RESULTS.md`** - 8 test scenarios with score breakdowns
- **`/COORDINATOR_DASHBOARD_GUIDE.md`** - How to use Supabase views
- **`/CUSTOMIZATION_GUIDE.md`** - Branding, copy, styling changes
- **`/supabase-views-FIXED.sql`** - SQL to create coordinator views

---

## 📱 Campaign URLs

### Add UTM Parameters for Attribution
The funnel automatically captures and stores:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `referrer` (previous page URL)

**Example URLs:**
```
https://start.fertilite.com?utm_source=facebook&utm_medium=cpc&utm_campaign=ivf_spring_2026
https://start.fertilite.com?utm_source=google&utm_medium=cpc&utm_campaign=ivf_search
https://start.fertilite.com?utm_source=instagram&utm_medium=social&utm_campaign=awareness
```

All attribution data stored in `leads` table for reporting.

---

## ✅ Production Checklist

- [x] Supabase backend integrated
- [x] Lead scoring algorithm implemented
- [x] Coordinator dashboard views created
- [x] Environment variables configured
- [x] Mobile-responsive design
- [x] Form validation
- [x] UTM tracking
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add custom domain
- [ ] Test full funnel end-to-end
- [ ] Update ad campaign URLs

---

## 📝 License

© 2026 Fertilite Reproductive Medicine Clinic. All rights reserved.

## 🤝 Credits

Built with:
- **React** + **Vite** + **TypeScript**
- **React Router 7** for navigation
- **Tailwind CSS v4** for styling
- **Supabase** for backend + database
- **Lucide React** for icons
- **Unsplash** for stock imagery

---

## 🆘 Need Help?

1. **Deployment issues?** → See `/DEPLOYMENT_GUIDE.md`
2. **Lead scoring questions?** → See `/LEAD_SCORING_TEST_RESULTS.md`
3. **Coordinator dashboard?** → See `/COORDINATOR_DASHBOARD_GUIDE.md`
4. **Customization?** → See `/CUSTOMIZATION_GUIDE.md`

---

**🚀 Ready to go live!** Follow `/DEPLOYMENT_GUIDE.md` to push to GitHub and deploy to Vercel.
