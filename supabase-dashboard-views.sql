-- ==========================================
-- FERTILITE IVF COORDINATOR DASHBOARD VIEWS
-- Run these in Supabase SQL Editor
-- ==========================================

-- ==========================================
-- 1. HOT LEADS VIEW (Contact within 1 hour)
-- ==========================================
CREATE OR REPLACE VIEW hot_leads AS
SELECT
  id,
  first_name,
  email,
  phone,
  preferred_contact_method,
  lead_score,
  location,
  age_range,
  ivf_stage,
  timeline,
  travel_willingness,
  biggest_concern,
  path_interest,
  utm_source,
  utm_medium,
  utm_campaign,
  created_at,
  status,
  notes,
  '🔥 HOT - Contact within 1 hour' as priority_label
FROM leads
WHERE lead_score >= 75
  AND status IN ('new', 'in_progress')
ORDER BY created_at DESC;

COMMENT ON VIEW hot_leads IS 'High-priority leads (score 75+) requiring immediate contact within 1 hour';


-- ==========================================
-- 2. WARM LEADS VIEW (Contact within 4 hours)
-- ==========================================
CREATE OR REPLACE VIEW warm_leads AS
SELECT
  id,
  first_name,
  email,
  phone,
  preferred_contact_method,
  lead_score,
  location,
  age_range,
  ivf_stage,
  timeline,
  travel_willingness,
  path_interest,
  created_at,
  status,
  notes,
  '🟡 WARM - Contact within 4 hours' as priority_label
FROM leads
WHERE lead_score BETWEEN 55 AND 74
  AND status IN ('new', 'in_progress')
ORDER BY lead_score DESC, created_at DESC;

COMMENT ON VIEW warm_leads IS 'Qualified leads (score 55-74) requiring contact within 4 hours';


-- ==========================================
-- 3. COOL LEADS VIEW (24 hour nurture)
-- ==========================================
CREATE OR REPLACE VIEW cool_leads AS
SELECT
  id,
  first_name,
  email,
  phone,
  preferred_contact_method,
  lead_score,
  location,
  timeline,
  path_interest,
  created_at,
  status,
  '🔵 COOL - Follow up in 24 hours' as priority_label
FROM leads
WHERE lead_score BETWEEN 35 AND 54
  AND status IN ('new', 'in_progress')
ORDER BY lead_score DESC, created_at DESC;

COMMENT ON VIEW cool_leads IS 'Nurture leads (score 35-54) requiring follow-up in 24 hours';


-- ==========================================
-- 4. MAIN COORDINATOR DASHBOARD VIEW
-- ==========================================
CREATE OR REPLACE VIEW coordinator_dashboard AS
SELECT
  l.id,
  l.first_name,
  l.email,
  l.phone,
  l.preferred_contact_method,
  l.lead_score,
  l.location,
  l.age_range,
  l.ivf_stage,
  l.timeline,
  l.travel_willingness,
  l.biggest_concern,
  l.clinic_status,
  l.path_interest,
  l.utm_source,
  l.utm_medium,
  l.utm_campaign,
  l.status,
  l.assigned_to,
  l.notes,
  l.created_at,
  l.updated_at,

  -- Priority label with emoji
  CASE
    WHEN l.lead_score >= 75 THEN '🔥 HOT'
    WHEN l.lead_score >= 55 THEN '🟡 WARM'
    WHEN l.lead_score >= 35 THEN '🔵 COOL'
    ELSE '❄️ COLD'
  END as priority,

  -- Urgency level
  CASE
    WHEN l.lead_score >= 75 THEN 'Contact within 1 hour'
    WHEN l.lead_score >= 55 THEN 'Contact within 4 hours'
    WHEN l.lead_score >= 35 THEN 'Follow up in 24 hours'
    ELSE 'Nurture sequence (48 hours)'
  END as action_timeline,

  -- Time since lead created
  NOW() - l.created_at as time_since_created,

  -- Hours old (for SLA tracking)
  EXTRACT(EPOCH FROM (NOW() - l.created_at)) / 3600 as hours_old,

  -- SLA status
  CASE
    WHEN l.lead_score >= 75 AND EXTRACT(EPOCH FROM (NOW() - l.created_at)) / 3600 > 1 THEN '⚠️ OVERDUE'
    WHEN l.lead_score >= 55 AND EXTRACT(EPOCH FROM (NOW() - l.created_at)) / 3600 > 4 THEN '⚠️ OVERDUE'
    ELSE '✅ On Time'
  END as sla_status,

  -- Count of responses (audit trail)
  (SELECT COUNT(*) FROM lead_responses lr WHERE lr.lead_id = l.id) as response_count,

  -- Has pending actions
  EXISTS(
    SELECT 1 FROM coordinator_actions ca
    WHERE ca.lead_id = l.id AND ca.status = 'pending'
  ) as has_pending_actions

FROM leads l
ORDER BY
  l.lead_score DESC,
  l.created_at DESC;

COMMENT ON VIEW coordinator_dashboard IS 'Main dashboard view with all leads, priorities, SLA tracking, and action counts';


-- ==========================================
-- 5. PENDING COORDINATOR ACTIONS VIEW
-- ==========================================
CREATE OR REPLACE VIEW pending_actions AS
SELECT
  ca.id as action_id,
  ca.lead_id,
  l.first_name,
  l.email,
  l.phone,
  l.preferred_contact_method,
  l.lead_score,
  ca.next_action,
  ca.status,
  ca.assigned_to,
  ca.notes as action_notes,
  ca.created_at as action_created_at,
  ca.updated_at as action_updated_at,

  -- Priority from lead score
  CASE
    WHEN l.lead_score >= 75 THEN '🔥 HOT'
    WHEN l.lead_score >= 55 THEN '🟡 WARM'
    WHEN l.lead_score >= 35 THEN '🔵 COOL'
    ELSE '❄️ COLD'
  END as priority,

  -- Hours since action created
  EXTRACT(EPOCH FROM (NOW() - ca.created_at)) / 3600 as hours_since_created

FROM coordinator_actions ca
JOIN leads l ON l.id = ca.lead_id
WHERE ca.status = 'pending'
ORDER BY l.lead_score DESC, ca.created_at ASC;

COMMENT ON VIEW pending_actions IS 'All pending coordinator actions sorted by lead priority';


-- ==========================================
-- 6. DAILY STATS VIEW
-- ==========================================
CREATE OR REPLACE VIEW daily_stats AS
SELECT
  CURRENT_DATE as report_date,

  -- Today's leads
  COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE) as leads_today,

  -- By priority
  COUNT(*) FILTER (WHERE lead_score >= 75 AND DATE(created_at) = CURRENT_DATE) as hot_leads_today,
  COUNT(*) FILTER (WHERE lead_score BETWEEN 55 AND 74 AND DATE(created_at) = CURRENT_DATE) as warm_leads_today,
  COUNT(*) FILTER (WHERE lead_score BETWEEN 35 AND 54 AND DATE(created_at) = CURRENT_DATE) as cool_leads_today,
  COUNT(*) FILTER (WHERE lead_score < 35 AND DATE(created_at) = CURRENT_DATE) as cold_leads_today,

  -- Average score
  ROUND(AVG(lead_score) FILTER (WHERE DATE(created_at) = CURRENT_DATE), 1) as avg_score_today,

  -- Path interest breakdown
  COUNT(*) FILTER (WHERE path_interest = 'multi_cycle' AND DATE(created_at) = CURRENT_DATE) as multi_cycle_today,
  COUNT(*) FILTER (WHERE path_interest = 'single_cycle' AND DATE(created_at) = CURRENT_DATE) as single_cycle_today,

  -- Location breakdown (top markets)
  COUNT(*) FILTER (WHERE location = 'Southern California' AND DATE(created_at) = CURRENT_DATE) as socal_today,
  COUNT(*) FILTER (WHERE location = 'Arizona' AND DATE(created_at) = CURRENT_DATE) as arizona_today,
  COUNT(*) FILTER (WHERE location = 'Northern Mexico' AND DATE(created_at) = CURRENT_DATE) as mexico_today,

  -- This week
  COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE)) as leads_this_week,

  -- This month
  COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)) as leads_this_month,

  -- All time
  COUNT(*) as total_leads

FROM leads;

COMMENT ON VIEW daily_stats IS 'Daily statistics dashboard for coordinator reporting';


-- ==========================================
-- 7. OVERDUE LEADS VIEW (SLA violations)
-- ==========================================
CREATE OR REPLACE VIEW overdue_leads AS
SELECT
  l.id,
  l.first_name,
  l.email,
  l.phone,
  l.preferred_contact_method,
  l.lead_score,
  l.location,
  l.timeline,
  l.created_at,
  l.status,

  -- Priority
  CASE
    WHEN l.lead_score >= 75 THEN '🔥 HOT'
    WHEN l.lead_score >= 55 THEN '🟡 WARM'
    ELSE '🔵 COOL'
  END as priority,

  -- Hours overdue
  CASE
    WHEN l.lead_score >= 75 THEN EXTRACT(EPOCH FROM (NOW() - l.created_at)) / 3600 - 1
    WHEN l.lead_score >= 55 THEN EXTRACT(EPOCH FROM (NOW() - l.created_at)) / 3600 - 4
    ELSE EXTRACT(EPOCH FROM (NOW() - l.created_at)) / 3600 - 24
  END as hours_overdue,

  -- Expected contact time
  CASE
    WHEN l.lead_score >= 75 THEN l.created_at + INTERVAL '1 hour'
    WHEN l.lead_score >= 55 THEN l.created_at + INTERVAL '4 hours'
    ELSE l.created_at + INTERVAL '24 hours'
  END as should_contact_by

FROM leads l
WHERE l.status IN ('new', 'in_progress')
  AND (
    (l.lead_score >= 75 AND NOW() - l.created_at > INTERVAL '1 hour')
    OR (l.lead_score >= 55 AND l.lead_score < 75 AND NOW() - l.created_at > INTERVAL '4 hours')
    OR (l.lead_score >= 35 AND l.lead_score < 55 AND NOW() - l.created_at > INTERVAL '24 hours')
  )
ORDER BY
  CASE
    WHEN l.lead_score >= 75 THEN 1
    WHEN l.lead_score >= 55 THEN 2
    ELSE 3
  END,
  l.created_at ASC;

COMMENT ON VIEW overdue_leads IS 'Leads that have exceeded their SLA contact timeframe and need immediate attention';


-- ==========================================
-- 8. MULTI-CYCLE INTEREST VIEW (High LTV)
-- ==========================================
CREATE OR REPLACE VIEW multi_cycle_leads AS
SELECT
  id,
  first_name,
  email,
  phone,
  preferred_contact_method,
  lead_score,
  location,
  age_range,
  ivf_stage,
  timeline,
  biggest_concern,
  created_at,
  status,

  CASE
    WHEN lead_score >= 75 THEN '🔥 HOT'
    WHEN lead_score >= 55 THEN '🟡 WARM'
    WHEN lead_score >= 35 THEN '🔵 COOL'
    ELSE '❄️ COLD'
  END as priority

FROM leads
WHERE path_interest = 'multi_cycle'
  AND status IN ('new', 'in_progress')
ORDER BY lead_score DESC, created_at DESC;

COMMENT ON VIEW multi_cycle_leads IS 'Leads interested in multi-cycle paths (higher LTV potential)';


-- ==========================================
-- 9. FAILED CYCLE PATIENTS VIEW (High Intent)
-- ==========================================
CREATE OR REPLACE VIEW failed_cycle_patients AS
SELECT
  id,
  first_name,
  email,
  phone,
  preferred_contact_method,
  lead_score,
  location,
  age_range,
  ivf_stage,
  timeline,
  clinic_status,
  path_interest,
  created_at,
  status,

  CASE
    WHEN lead_score >= 75 THEN '🔥 HOT'
    WHEN lead_score >= 55 THEN '🟡 WARM'
    ELSE '🔵 COOL'
  END as priority

FROM leads
WHERE (
  ivf_stage LIKE '%failed%'
  OR biggest_concern = 'Previous failed cycles'
)
AND status IN ('new', 'in_progress')
ORDER BY lead_score DESC, created_at DESC;

COMMENT ON VIEW failed_cycle_patients IS 'Patients with previous failed IVF cycles (high pain point, high intent)';


-- ==========================================
-- GRANT PERMISSIONS (if using RLS)
-- ==========================================
-- Uncomment if you need to grant permissions to authenticated coordinators
-- GRANT SELECT ON hot_leads TO authenticated;
-- GRANT SELECT ON warm_leads TO authenticated;
-- GRANT SELECT ON cool_leads TO authenticated;
-- GRANT SELECT ON coordinator_dashboard TO authenticated;
-- GRANT SELECT ON pending_actions TO authenticated;
-- GRANT SELECT ON daily_stats TO authenticated;
-- GRANT SELECT ON overdue_leads TO authenticated;
-- GRANT SELECT ON multi_cycle_leads TO authenticated;
-- GRANT SELECT ON failed_cycle_patients TO authenticated;
