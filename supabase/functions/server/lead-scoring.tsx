// Lead scoring logic for Fertilite IVF funnel
// Scores range from 0-100, higher = more qualified/urgent

export interface LeadScore {
  total: number;
  urgency: 'hot' | 'warm' | 'cool' | 'cold';
  qualificationLevel: 'highly_qualified' | 'qualified' | 'needs_nurturing' | 'low_intent';
  breakdown: {
    locationScore: number;
    ageScore: number;
    journeyScore: number;
    timelineScore: number;
    travelScore: number;
    concernScore: number;
    clinicScore: number;
    pathScore: number;
  };
  suggestedNextAction: string;
  pathInterest: 'single_cycle' | 'multi_cycle' | 'comparing' | 'undecided';
}

export function calculateLeadScore(data: Record<string, any>): LeadScore {
  const breakdown = {
    locationScore: scoreLocation(data.location),
    ageScore: scoreAge(data.age),
    journeyScore: scoreJourney(data.journey),
    timelineScore: scoreTimeline(data.timeline),
    travelScore: scoreTravel(data.travel),
    concernScore: scoreConcern(data.concern),
    clinicScore: scoreClinic(data.currentClinic),
    pathScore: scorePath(data.pathOpenness),
  };

  const total = Math.round(
    breakdown.locationScore * 0.10 +
    breakdown.ageScore * 0.05 +
    breakdown.journeyScore * 0.15 +
    breakdown.timelineScore * 0.25 +
    breakdown.travelScore * 0.20 +
    breakdown.concernScore * 0.05 +
    breakdown.clinicScore * 0.10 +
    breakdown.pathScore * 0.10
  );

  const urgency = total >= 75 ? 'hot' : total >= 55 ? 'warm' : total >= 35 ? 'cool' : 'cold';
  const qualificationLevel = total >= 75 ? 'highly_qualified' : total >= 55 ? 'qualified' : total >= 35 ? 'needs_nurturing' : 'low_intent';

  const pathInterest = data.pathOpenness?.includes('structured')
    ? 'multi_cycle'
    : data.pathOpenness?.includes('single')
    ? 'single_cycle'
    : data.pathOpenness?.includes('compare')
    ? 'comparing'
    : 'undecided';

  const suggestedNextAction = getSuggestedAction(urgency, data);

  return { total, urgency, qualificationLevel, breakdown, suggestedNextAction, pathInterest };
}

function scoreLocation(location?: string): number {
  switch (location) {
    case 'Southern California': return 100;
    case 'Arizona': return 85;
    case 'Northern Mexico': return 90;
    case 'Other US': return 60;
    case 'Other': return 30;
    default: return 0;
  }
}

function scoreAge(age?: string): number {
  switch (age) {
    case 'Under 35': return 90;
    case '35 to 37': return 85;
    case '38 to 40': return 75;
    case '41 to 42': return 65;
    case '43 plus': return 50;
    default: return 0;
  }
}

function scoreJourney(journey?: string): number {
  switch (journey) {
    case 'Had 1 failed IVF cycle': return 95;
    case 'Had 2 or more failed IVF cycles': return 90;
    case 'Choosing between clinics': return 85;
    case 'Looking for advanced options': return 80;
    case 'Just starting': return 60;
    default: return 0;
  }
}

function scoreTimeline(timeline?: string): number {
  switch (timeline) {
    case 'As soon as possible': return 100;
    case 'Within 1 to 3 months': return 85;
    case 'Within 3 to 6 months': return 55;
    case 'Just researching': return 15;
    default: return 0;
  }
}

function scoreTravel(travel?: string): number {
  switch (travel) {
    case 'Yes, definitely': return 100;
    case 'Yes, if the plan feels right': return 80;
    case 'Maybe—I need more information': return 40;
    case 'No': return 5;
    default: return 0;
  }
}

function scoreConcern(concern?: string): number {
  switch (concern) {
    case 'Previous failed cycles': return 90;
    case 'My age or ovarian reserve': return 85;
    case 'Male factor or embryo quality': return 80;
    case 'Choosing the right clinic': return 75;
    case 'IVF may not work': return 70;
    case 'Cost': return 65;
    case 'Travel logistics': return 50;
    case 'Not sure yet': return 30;
    default: return 0;
  }
}

function scoreClinic(clinic?: string): number {
  switch (clinic) {
    case 'Yes—but considering switching': return 100;
    case 'Completed treatment elsewhere': return 85;
    case 'Yes—currently in treatment': return 60;
    case 'Yes—testing only': return 70;
    case 'No': return 75;
    default: return 0;
  }
}

function scorePath(path?: string): number {
  switch (path) {
    case 'A more structured plan if it improves peace of mind': return 95;
    case 'I want to compare both': return 80;
    case 'A single IVF cycle': return 65;
    case 'Not sure yet': return 40;
    default: return 0;
  }
}

function getSuggestedAction(urgency: string, data: Record<string, any>): string {
  if (urgency === 'hot') {
    if (data.contactMethod === 'whatsapp') return 'WhatsApp within 1 hour';
    if (data.contactMethod === 'phone') return 'Call within 1 hour';
    return 'Email within 1 hour with call follow-up';
  }
  if (urgency === 'warm') {
    return 'Contact within 4 hours via preferred method';
  }
  if (urgency === 'cool') {
    return 'Email nurture sequence + follow-up in 24 hours';
  }
  return 'Add to nurture email list, follow up in 48 hours';
}
