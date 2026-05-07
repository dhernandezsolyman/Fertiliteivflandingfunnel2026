import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Question label mapping for audit trail
const questionLabels: Record<string, string> = {
  location: 'Where are you located?',
  age: 'What is your age range?',
  journey: 'Where are you in your IVF journey?',
  timeline: 'When are you looking to start treatment?',
  travel: 'Are you open to traveling to Tijuana for treatment?',
  concern: 'What is your biggest concern?',
  currentClinic: 'Are you currently working with a fertility clinic?',
  pathOpenness: 'Which treatment path interests you most?',
  firstName: 'First Name',
  email: 'Email Address',
  phone: 'Phone Number',
  contactMethod: 'Preferred Contact Method',
};

// Step name mapping
const stepNames: Record<number, string> = {
  1: 'location',
  2: 'demographics',
  3: 'commitment_check',
  4: 'timeline_travel',
  5: 'qualification',
  6: 'contact_info',
};

// ==========================================
// CREATE COMPLETE LEAD WITH ALL DATA
// ==========================================

export async function createCompleteLead(data: {
  firstName: string;
  email: string;
  phone: string;
  contactMethod: string;
  location?: string;
  age?: string;
  journey?: string;
  timeline?: string;
  travel?: string;
  concern?: string;
  currentClinic?: string;
  pathOpenness?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  leadScore: number;
  urgencyLevel?: string;
  qualificationLevel?: string;
  pathInterest?: string;
}) {
  // Build notes with scoring metadata
  const scoringNotes = data.urgencyLevel && data.qualificationLevel && data.pathInterest
    ? `Score: ${data.leadScore} | Urgency: ${data.urgencyLevel} | Qualification: ${data.qualificationLevel} | Path: ${data.pathInterest}`
    : null;

  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      first_name: data.firstName,
      email: data.email,
      phone: data.phone,
      whatsapp: data.contactMethod === 'whatsapp' ? data.phone : null,
      preferred_contact_method: data.contactMethod,
      location: data.location || null,
      age_range: data.age || null,
      ivf_stage: data.journey || null,
      timeline: data.timeline || null,
      travel_willingness: data.travel || null,
      biggest_concern: data.concern || null,
      clinic_status: data.currentClinic || null,
      path_interest: data.pathOpenness || null,
      utm_source: data.utmSource || null,
      utm_medium: data.utmMedium || null,
      utm_campaign: data.utmCampaign || null,
      utm_term: data.utmTerm || null,
      utm_content: data.utmContent || null,
      referrer: data.referrer || null,
      status: 'new',
      lead_score: data.leadScore,
      notes: scoringNotes,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create lead in database: ${error.message}`);
  }

  return lead;
}

// ==========================================
// SAVE LEAD RESPONSES (AUDIT TRAIL)
// ==========================================

export async function saveAllLeadResponses(
  leadId: string,
  allResponses: Record<string, any>
) {
  // Map responses to steps and create audit trail rows
  const responseRows = [];

  // Step 1: Location
  if (allResponses.location) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[1],
      question_key: 'location',
      question_label: questionLabels.location,
      answer_value: allResponses.location,
      answer_label: allResponses.location,
    });
  }

  // Step 2: Age & Journey
  if (allResponses.age) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[2],
      question_key: 'age',
      question_label: questionLabels.age,
      answer_value: allResponses.age,
      answer_label: allResponses.age,
    });
  }
  if (allResponses.journey) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[2],
      question_key: 'journey',
      question_label: questionLabels.journey,
      answer_value: allResponses.journey,
      answer_label: allResponses.journey,
    });
  }

  // Step 4: Timeline & Travel
  if (allResponses.timeline) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[4],
      question_key: 'timeline',
      question_label: questionLabels.timeline,
      answer_value: allResponses.timeline,
      answer_label: allResponses.timeline,
    });
  }
  if (allResponses.travel) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[4],
      question_key: 'travel',
      question_label: questionLabels.travel,
      answer_value: allResponses.travel,
      answer_label: allResponses.travel,
    });
  }

  // Step 5: Concern, Clinic, Path
  if (allResponses.concern) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[5],
      question_key: 'concern',
      question_label: questionLabels.concern,
      answer_value: allResponses.concern,
      answer_label: allResponses.concern,
    });
  }
  if (allResponses.currentClinic) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[5],
      question_key: 'currentClinic',
      question_label: questionLabels.currentClinic,
      answer_value: allResponses.currentClinic,
      answer_label: allResponses.currentClinic,
    });
  }
  if (allResponses.pathOpenness) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[5],
      question_key: 'pathOpenness',
      question_label: questionLabels.pathOpenness,
      answer_value: allResponses.pathOpenness,
      answer_label: allResponses.pathOpenness,
    });
  }

  // Step 6: Contact Info
  if (allResponses.firstName) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[6],
      question_key: 'firstName',
      question_label: questionLabels.firstName,
      answer_value: allResponses.firstName,
      answer_label: allResponses.firstName,
    });
  }
  if (allResponses.email) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[6],
      question_key: 'email',
      question_label: questionLabels.email,
      answer_value: allResponses.email,
      answer_label: allResponses.email,
    });
  }
  if (allResponses.phone) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[6],
      question_key: 'phone',
      question_label: questionLabels.phone,
      answer_value: allResponses.phone,
      answer_label: allResponses.phone,
    });
  }
  if (allResponses.contactMethod) {
    responseRows.push({
      lead_id: leadId,
      step_name: stepNames[6],
      question_key: 'contactMethod',
      question_label: questionLabels.contactMethod,
      answer_value: allResponses.contactMethod,
      answer_label: allResponses.contactMethod,
    });
  }

  if (responseRows.length === 0) return;

  const { error } = await supabase
    .from('lead_responses')
    .insert(responseRows);

  if (error) {
    throw new Error(`Failed to save lead responses: ${error.message}`);
  }
}

// ==========================================
// COORDINATOR ACTIONS
// ==========================================

export async function createCoordinatorAction(data: {
  leadId: string;
  firstName: string;
  urgency: string;
  qualificationLevel: string;
  contactMethod: string;
  suggestedAction: string;
}) {
  const { error } = await supabase
    .from('coordinator_actions')
    .insert({
      lead_id: data.leadId,
      status: 'pending',
      next_action: data.suggestedAction,
      notes: `New ${data.urgency} lead: ${data.firstName} (${data.qualificationLevel}) - Prefers ${data.contactMethod}`,
    });

  if (error) {
    throw new Error(`Failed to create coordinator action: ${error.message}`);
  }
}

// ==========================================
// GET LEAD DATA
// ==========================================

export async function getLead(leadId: string) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get lead: ${error.message}`);
  }

  return data;
}

export async function getLeadResponses(leadId: string) {
  const { data, error } = await supabase
    .from('lead_responses')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to get lead responses: ${error.message}`);
  }

  return data;
}

export async function getCoordinatorActions(leadId: string) {
  const { data, error } = await supabase
    .from('coordinator_actions')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to get coordinator actions: ${error.message}`);
  }

  return data;
}
