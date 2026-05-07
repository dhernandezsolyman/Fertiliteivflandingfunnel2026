# Fertilité IVF Funnel Strategy

## Overview
This is a premium, high-converting, multi-step landing page funnel designed for Fertilité, an IVF clinic in Tijuana targeting patients from California, Arizona, the broader US, and Northern Mexico.

## Core Objectives
1. **Increase qualified lead conversion** - Progressive commitment builds investment
2. **Improve lead quality** - Multi-layer filtering removes low-intent leads
3. **Increase IVF starts per lead** - Emotional positioning creates urgency
4. **Reduce spam/low-intent leads** - Soft and hard filters weed out unqualified prospects
5. **Increase patient commitment** - Multi-cycle framing reduces fear
6. **Increase multi-cycle acceptance** - Positioned as peace of mind, not upsell
7. **Increase lifetime value per patient** - Structured paths create higher value relationships

## Funnel Architecture

### 1. Landing Page (/)
**Purpose**: Set premium positioning and introduce multi-cycle concept
**Elements**:
- Hero with emotional hook: "A More Confident Path to IVF"
- Trust indicators (years, cycles, savings, support)
- Problem/solution framing (traditional vs structured approach)
- Clear CTA to start funnel

**Psychology**: Reduce fear of single-cycle failure, position clinic as premium and accessible

### 2. Soft Filter (Steps 1-3)
**Step 1 - Location**: `/step-1`
- Filters: Southern California, Arizona, Northern Mexico, Other US, Other
- Purpose: Qualify geographic fit

**Step 2 - Age**: `/step-2`
- Filters: Under 35, 35-37, 38-40, 41-42, 43+
- Purpose: Segment by treatment complexity and success probability

**Step 3 - Journey Stage**: `/step-3`
- Filters: Just starting, Choosing clinics, 1 failed cycle, 2+ failed cycles, Advanced options
- Purpose: Understand experience level and emotional state

**Psychology**: One-click answers reduce friction while collecting critical segmentation data

### 3. Commitment Trigger (/commitment)
**Purpose**: Bridge moment that creates momentum and personalization
**Elements**:
- Personalized message based on journey stage
- Reframe multi-cycle as structured support (not upsell)
- Preview what's coming next
- Build anticipation for personalized results

**Psychology**: Make user feel understood and create investment in continuing

### 4. Hard Filter (Steps 4-5)
**Step 4 - Timeline & Travel**: `/step-4`
- Timeline: ASAP, 1-3 months, 3-6 months, Just researching
- Travel willingness: Yes definitely, Yes if right, Maybe, No
- Purpose: Filter out low-intent leads
- Includes gentle warning for low-intent answers

**Step 5 - Deep Qualification**: `/step-5`
- Biggest concern (8 options covering fear, cost, trust, logistics)
- Current clinic status (identifies switchers and new patients)
- Path openness (identifies multi-cycle receptiveness)

**Psychology**: Higher investment at this stage filters serious prospects; detailed answers enable personalization

### 5. Contact Gate (/contact)
**Purpose**: Unlock personalized results with contact information
**Elements**:
- Premium "unlock" framing (not "submit form")
- First name, email, phone/WhatsApp
- Contact method preference (email, phone, WhatsApp)
- Security/privacy assurance

**Psychology**: User has invested enough to want their personalized path; gate feels like value exchange

### 6. Personalized Results (/results)
**Purpose**: Deliver value, build trust, frame multi-cycle, convert to consultation
**Structure**:
1. **Personalized Summary**: Dynamic message based on answers
2. **Cost Comparison**: 
   - Single cycle pricing
   - Multi-cycle path pricing (PREMIUM POSITIONED)
   - US comparison for context
   - Clear framing: "Not an upsell—a smarter path forward"
3. **Trust Stack**: Board-certified specialists, state-of-art lab, personalized care
4. **Travel Simplicity**: Address cross-border concerns with specific support
5. **Final Conversion**: 
   - Multiple contact options (WhatsApp, Phone, Email)
   - Sticky mobile CTA
   - Confirmation of preferred contact method

**Psychology**: 
- Multi-cycle positioned as peace of mind, not price anchor
- Addresses primary objections (cost, trust, travel)
- Creates multiple conversion paths
- Reinforces personal connection (uses first name)

## Multi-Cycle Positioning Strategy

### The Problem
Patients fear IVF failure. Traditional clinics sell single cycles, creating high-pressure situations and abandoned patients after failure.

### The Solution
Frame multi-cycle as:
- ✅ More structured path
- ✅ More stable journey
- ✅ Less pressure on one attempt
- ✅ Greater peace of mind
- ✅ Broader treatment plan

### NOT Framed As
- ❌ Upsell or "premium package"
- ❌ Spend more to get more
- ❌ Required or assumed path

### Positioning Language
"Some patients prefer a single cycle. Others choose a more structured approach. Let's find what works for you."

## Filtering Strategy

### Soft Filters (Steps 1-3)
- **Fast**: One-click chip selection
- **Non-threatening**: Basic demographic/journey info
- **Purpose**: Segment for personalization

### Hard Filters (Steps 4-5)
- **Investment-based**: User has already committed time
- **Disqualifying**: Timeline + Travel + Concern
- **Transparent**: Gentle warnings for low-intent answers
- **Purpose**: Reduce junk leads while maintaining premium feel

### Who Gets Filtered Out
- Timeline "Just researching" + Travel "No" = low intent
- No current urgency or willingness to travel
- Random curiosity without treatment intent

### Filter Philosophy
"Filter weak leads without feeling cold or hostile"

## Conversion Psychology

### Progressive Commitment
Each step builds on previous investment:
1. Click CTA (low friction)
2. Answer 1 question (easy)
3. Answer 2 questions (pattern established)
4. Answer 3 questions (invested)
5. Commitment trigger (emotion peak)
6. Answer deeper questions (high investment)
7. Provide contact info (conversion)
8. Book consultation (final conversion)

### Emotional Journey
1. **Fear**: IVF might not work
2. **Hope**: There's a better path
3. **Curiosity**: What's my personalized path?
4. **Investment**: I've answered this much...
5. **Validation**: They understand my situation
6. **Trust**: Transparent pricing, real benefits
7. **Action**: I want to talk to them

### Trust Building
- Board-certified specialists
- US training standards
- 15+ years experience
- 3,200+ successful cycles
- Real patient testimonial
- Premium imagery
- No hype or miracle language
- Transparent pricing

## Technical Implementation

### Stack
- React 18.3.1
- React Router 7 (data mode)
- Context API for state management
- Tailwind CSS v4
- Lucide React icons
- TypeScript

### State Management
`FunnelContext` stores all user answers across steps, enabling:
- Personalized messaging
- Dynamic pricing
- Conditional content
- Preferred contact method handling

### Mobile-First Design
- Sticky CTAs on mobile
- Touch-friendly chip selection
- Responsive layouts
- WhatsApp integration

### Accessibility
- Semantic HTML
- Keyboard navigation
- ARIA labels where needed
- Focus states on interactive elements

## Success Metrics

### Conversion Funnel
- Landing → Step 1: Engagement rate
- Step 1 → Step 3: Soft filter completion
- Step 3 → Commitment: Bridge effectiveness
- Commitment → Step 5: Hard filter completion
- Step 5 → Contact: Qualification rate
- Contact → Results: Lead capture rate
- Results → Consultation: Booking rate

### Lead Quality Indicators
- Timeline selection distribution
- Travel willingness distribution
- Path openness (multi-cycle interest)
- Journey stage (failed cycles = higher intent)

### Business Outcomes
- Cost per qualified lead
- Lead-to-consultation rate
- Consultation-to-treatment rate
- Multi-cycle acceptance rate
- Patient lifetime value

## Traffic Source Considerations

### Google Search Ads
- High intent users
- May skip directly to later steps if retargeted
- Expect higher conversion rates
- Look for: ASAP timeline, switching clinics, failed cycles

### Meta Ads
- Awareness and education stage
- May need more nurturing
- Comparison shoppers
- Look for: Research timeline, choosing between clinics

## Future Optimization Opportunities

1. **A/B Testing**:
   - Multi-cycle positioning language
   - Commitment trigger timing
   - Pricing display format
   - CTA button copy

2. **Personalization**:
   - Dynamic hero based on traffic source
   - Age-specific messaging
   - Journey-stage specific content
   - Geographic customization

3. **Remarketing**:
   - Email sequences based on drop-off point
   - WhatsApp follow-up sequences
   - Step completion tracking

4. **Analytics**:
   - Heatmaps on results page
   - Time on step tracking
   - Answer distribution analysis
   - Multi-cycle conversion correlation
