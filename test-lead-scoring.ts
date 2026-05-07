// Test Lead Scoring System
// Run with: deno run test-lead-scoring.ts

interface LeadScore {
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

function calculateLeadScore(data: Record<string, any>): LeadScore {
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

// ==========================================
// TEST SCENARIOS
// ==========================================

const testScenarios = [
  {
    name: "🔥 IDEAL HOT LEAD - Sarah from San Diego",
    description: "Failed cycle, ready to start ASAP, wants multi-cycle path",
    data: {
      location: 'Southern California',
      age: 'Under 35',
      journey: 'Had 1 failed IVF cycle',
      timeline: 'As soon as possible',
      travel: 'Yes, definitely',
      concern: 'Previous failed cycles',
      currentClinic: 'Yes—but considering switching',
      pathOpenness: 'A more structured plan if it improves peace of mind',
      contactMethod: 'whatsapp',
    }
  },
  {
    name: "🔥 HOT LEAD - Maria from Arizona",
    description: "Multiple failures, urgent timeline, cost-conscious",
    data: {
      location: 'Arizona',
      age: '35 to 37',
      journey: 'Had 2 or more failed IVF cycles',
      timeline: 'As soon as possible',
      travel: 'Yes, if the plan feels right',
      concern: 'Cost',
      currentClinic: 'Completed treatment elsewhere',
      pathOpenness: 'I want to compare both',
      contactMethod: 'phone',
    }
  },
  {
    name: "🟡 WARM LEAD - Jessica from Phoenix",
    description: "Clinic shopping, 1-3 month timeline, open to travel",
    data: {
      location: 'Arizona',
      age: '38 to 40',
      journey: 'Choosing between clinics',
      timeline: 'Within 1 to 3 months',
      travel: 'Yes, if the plan feels right',
      concern: 'Choosing the right clinic',
      currentClinic: 'No',
      pathOpenness: 'I want to compare both',
      contactMethod: 'email',
    }
  },
  {
    name: "🟡 WARM LEAD - Lisa from Northern Mexico",
    description: "Just starting, age concern, wants structure",
    data: {
      location: 'Northern Mexico',
      age: '41 to 42',
      journey: 'Just starting',
      timeline: 'Within 1 to 3 months',
      travel: 'Yes, definitely',
      concern: 'My age or ovarian reserve',
      currentClinic: 'No',
      pathOpenness: 'A more structured plan if it improves peace of mind',
      contactMethod: 'whatsapp',
    }
  },
  {
    name: "🔵 COOL LEAD - Amanda from Texas",
    description: "3-6 month timeline, maybe travel, needs info",
    data: {
      location: 'Other US',
      age: 'Under 35',
      journey: 'Just starting',
      timeline: 'Within 3 to 6 months',
      travel: 'Maybe—I need more information',
      concern: 'Travel logistics',
      currentClinic: 'No',
      pathOpenness: 'Not sure yet',
      contactMethod: 'email',
    }
  },
  {
    name: "🔵 COOL LEAD - Rachel from Seattle",
    description: "Mid-timeline, single cycle interest, cost concern",
    data: {
      location: 'Other US',
      age: '35 to 37',
      journey: 'Looking for advanced options',
      timeline: 'Within 3 to 6 months',
      travel: 'Yes, if the plan feels right',
      concern: 'Cost',
      currentClinic: 'Yes—testing only',
      pathOpenness: 'A single IVF cycle',
      contactMethod: 'email',
    }
  },
  {
    name: "❄️ COLD LEAD - Emily from New York",
    description: "Just researching, won't travel, no timeline",
    data: {
      location: 'Other US',
      age: '43 plus',
      journey: 'Just starting',
      timeline: 'Just researching',
      travel: 'No',
      concern: 'Not sure yet',
      currentClinic: 'No',
      pathOpenness: 'Not sure yet',
      contactMethod: 'email',
    }
  },
  {
    name: "❄️ COLD LEAD - Karen from Europe",
    description: "International, researching, hesitant",
    data: {
      location: 'Other',
      age: '38 to 40',
      journey: 'Just starting',
      timeline: 'Just researching',
      travel: 'Maybe—I need more information',
      concern: 'IVF may not work',
      currentClinic: 'No',
      pathOpenness: 'Not sure yet',
      contactMethod: 'email',
    }
  }
];

// ==========================================
// RUN TESTS
// ==========================================

console.log('\n╔═══════════════════════════════════════════════════════════════════════════╗');
console.log('║           FERTILITE IVF LEAD SCORING TEST RESULTS                        ║');
console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');

testScenarios.forEach((scenario, index) => {
  const score = calculateLeadScore(scenario.data);

  console.log(`\n${scenario.name}`);
  console.log('─'.repeat(75));
  console.log(`📋 Profile: ${scenario.description}`);
  console.log(`\n📊 SCORE: ${score.total}/100`);
  console.log(`🎯 Urgency: ${score.urgency.toUpperCase()}`);
  console.log(`✅ Qualification: ${score.qualificationLevel.replace(/_/g, ' ').toUpperCase()}`);
  console.log(`🛣️  Path Interest: ${score.pathInterest.replace(/_/g, ' ')}`);
  console.log(`📞 Next Action: ${score.suggestedNextAction}`);

  console.log(`\n📈 Score Breakdown (weighted):`);
  console.log(`   • Location (${scenario.data.location}): ${score.breakdown.locationScore} × 10% = ${(score.breakdown.locationScore * 0.10).toFixed(1)}`);
  console.log(`   • Age (${scenario.data.age}): ${score.breakdown.ageScore} × 5% = ${(score.breakdown.ageScore * 0.05).toFixed(1)}`);
  console.log(`   • Journey (${scenario.data.journey}): ${score.breakdown.journeyScore} × 15% = ${(score.breakdown.journeyScore * 0.15).toFixed(1)}`);
  console.log(`   • Timeline (${scenario.data.timeline}): ${score.breakdown.timelineScore} × 25% = ${(score.breakdown.timelineScore * 0.25).toFixed(1)}`);
  console.log(`   • Travel (${scenario.data.travel}): ${score.breakdown.travelScore} × 20% = ${(score.breakdown.travelScore * 0.20).toFixed(1)}`);
  console.log(`   • Concern (${scenario.data.concern}): ${score.breakdown.concernScore} × 5% = ${(score.breakdown.concernScore * 0.05).toFixed(1)}`);
  console.log(`   • Clinic (${scenario.data.currentClinic}): ${score.breakdown.clinicScore} × 10% = ${(score.breakdown.clinicScore * 0.10).toFixed(1)}`);
  console.log(`   • Path (${scenario.data.pathOpenness}): ${score.breakdown.pathScore} × 10% = ${(score.breakdown.pathScore * 0.10).toFixed(1)}`);
});

console.log('\n\n╔═══════════════════════════════════════════════════════════════════════════╗');
console.log('║                         SCORING THRESHOLDS                                ║');
console.log('╠═══════════════════════════════════════════════════════════════════════════╣');
console.log('║  🔥 HOT (75-100):     Highly Qualified | Contact within 1 hour           ║');
console.log('║  🟡 WARM (55-74):     Qualified | Contact within 4 hours                  ║');
console.log('║  🔵 COOL (35-54):     Needs Nurturing | Follow up in 24 hours             ║');
console.log('║  ❄️  COLD (0-34):      Low Intent | Nurture sequence, 48hr follow-up      ║');
console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');

console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
console.log('║                         WEIGHTING RATIONALE                               ║');
console.log('╠═══════════════════════════════════════════════════════════════════════════╣');
console.log('║  Timeline (25%):     Strongest urgency indicator                         ║');
console.log('║  Travel (20%):       Must be willing to cross border                     ║');
console.log('║  Journey (15%):      Experience level + pain points                      ║');
console.log('║  Location (10%):     Geographic proximity to Tijuana                     ║');
console.log('║  Clinic (10%):       Current status + switching intent                   ║');
console.log('║  Path (10%):         Multi-cycle interest = higher LTV                   ║');
console.log('║  Age (5%):           Medical factor but less controllable                ║');
console.log('║  Concern (5%):       Context for messaging, not qualification            ║');
console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');
