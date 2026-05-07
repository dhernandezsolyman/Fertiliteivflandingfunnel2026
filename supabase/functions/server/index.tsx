import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { calculateLeadScore } from "./lead-scoring.tsx";
import * as db from "./database.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-41f10ad7/health", (c) => {
  return c.json({ status: "ok" });
});

// ==========================================
// LEAD MANAGEMENT ROUTES
// ==========================================

// Create a new lead (called when funnel starts)
// NOTE: We don't actually create database record here since schema requires contact info
// This endpoint just returns success to maintain frontend compatibility
app.post("/make-server-41f10ad7/leads", async (c) => {
  try {
    const body = await c.req.json();
    const { leadId } = body;

    if (!leadId) {
      return c.json({ error: "leadId is required" }, 400);
    }

    // Frontend tracks state in sessionStorage, we'll create DB record on final submit
    console.log(`[FUNNEL STARTED] ${leadId} - tracking in session, will create DB record on submit`);
    return c.json({ success: true, leadId });
  } catch (err) {
    console.log(`[ERROR] Funnel start: ${err}`);
    return c.json({ error: `Failed to start funnel: ${err}` }, 500);
  }
});

// Save step responses (called after each funnel step)
// NOTE: We don't save to DB here, just acknowledge receipt
// All data will be saved on final submission
app.post("/make-server-41f10ad7/leads/:leadId/responses", async (c) => {
  try {
    const leadId = c.req.param("leadId");
    const body = await c.req.json();
    const { step, responses } = body;

    if (!step || !responses) {
      return c.json({ error: "step and responses are required" }, 400);
    }

    // Frontend stores in sessionStorage, we'll save to DB on final submit
    console.log(`[STEP PROGRESS] Lead ${leadId}, Step ${step} - stored in session`);
    return c.json({ success: true });
  } catch (err) {
    console.log(`[ERROR] Saving step response: ${err}`);
    return c.json({ error: `Failed to save step response: ${err}` }, 500);
  }
});

// Submit final lead (called on contact form submission)
// This is where we create the complete lead record in the database
app.post("/make-server-41f10ad7/leads/:leadId/submit", async (c) => {
  try {
    const sessionLeadId = c.req.param("leadId");
    const body = await c.req.json();
    const { contact, allResponses, attribution } = body;

    if (!contact?.firstName || !contact?.email || !contact?.phone) {
      return c.json({ error: "firstName, email, and phone are required" }, 400);
    }

    // Calculate lead score from all responses
    const score = calculateLeadScore(allResponses);

    // Create complete lead record in database
    const lead = await db.createCompleteLead({
      firstName: contact.firstName,
      email: contact.email,
      phone: contact.phone,
      contactMethod: contact.contactMethod,
      location: allResponses.location,
      age: allResponses.age,
      journey: allResponses.journey,
      timeline: allResponses.timeline,
      travel: allResponses.travel,
      concern: allResponses.concern,
      currentClinic: allResponses.currentClinic,
      pathOpenness: allResponses.pathOpenness,
      utmSource: attribution?.utmSource || null,
      utmMedium: attribution?.utmMedium || null,
      utmCampaign: attribution?.utmCampaign || null,
      utmTerm: attribution?.utmTerm || null,
      utmContent: attribution?.utmContent || null,
      referrer: attribution?.referrer || null,
      leadScore: score.total,
      urgencyLevel: score.urgency,
      qualificationLevel: score.qualificationLevel,
      pathInterest: score.pathInterest,
    });

    // Save complete audit trail to lead_responses table
    await db.saveAllLeadResponses(lead.id, allResponses);

    // Create coordinator action item
    await db.createCoordinatorAction({
      leadId: lead.id,
      firstName: contact.firstName,
      urgency: score.urgency,
      qualificationLevel: score.qualificationLevel,
      contactMethod: contact.contactMethod,
      suggestedAction: score.suggestedNextAction,
    });

    console.log(`[LEAD SUBMITTED] Session: ${sessionLeadId} | DB: ${lead.id} | Score: ${score.total} | Urgency: ${score.urgency} | Name: ${contact.firstName}`);
    return c.json({ success: true, score, leadId: lead.id });
  } catch (err) {
    console.log(`[ERROR] Submitting lead ${c.req.param("leadId")}: ${err}`);
    return c.json({ error: `Failed to submit lead: ${err}` }, 500);
  }
});

// Get lead details (for results page or admin)
app.get("/make-server-41f10ad7/leads/:leadId", async (c) => {
  try {
    const leadId = c.req.param("leadId");

    const lead = await db.getLead(leadId);

    if (!lead) {
      return c.json({ error: "Lead not found" }, 404);
    }

    const responses = await db.getLeadResponses(lead.id);
    const actions = await db.getCoordinatorActions(lead.id);

    return c.json({ lead, responses, actions });
  } catch (err) {
    console.log(`[ERROR] Fetching lead: ${err}`);
    return c.json({ error: `Failed to fetch lead: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);