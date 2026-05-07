-- ==========================================
-- FERTILITE IVF COORDINATOR DASHBOARD VIEWS
-- Using ACTUAL schema columns only
-- ==========================================

-- ==========================================
-- 1. HOT LEADS VIEW (Score 75+)
-- ==========================================
CREATE OR REPLACE VIEW hot_leads AS
SELECT
  id,
  first_name,
  last_name,
  email,
  phone,
  whatsapp,
  preferred_contact_method,
  lead_score,
  location,
  age_range,
  ivf_stage,
  timeline,
  travel_willingness,
  biggest_concern,
  clinic_status,
  path_interest,
  utm_source,
  utm_medium,
  utm_campaign,
  created_at,
  status,
  assigned_to,
  notes
FROM leads
WHERE lead_score >= 75
ORDER BY created_at DESC;


-- ==========================================
-- 2. WARM LEADS VIEW (Score 55-74)
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
  assigned_to,
  notes
FROM leads
WHERE lead_score BETWEEN 55 AND 74
ORDER BY lead_score DESC, created_at DESC;


-- ==========================================
-- 3. COOL LEADS VIEW (Score 35-54)
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
  status
FROM leads
WHERE lead_score BETWEEN 35 AND 54
ORDER BY lead_score DESC, created_at DESC;


-- ==========================================
-- 4. COORDINATOR DASHBOARD (Main View)
-- ==========================================
CREATE OR REPLACE VIEW coordinator_dashboard AS
SELECT
  id,
  first_name,
  last_name,
  email,
  phone,
  whatsapp,
  preferred_contact_method,
  lead_score,
  location,
  age_range,
  ivf_stage,
  timeline,
  travel_willingness,
  biggest_concern,
  clinic_status,
  path_interest,
  utm_source,
  utm_medium,
  utm_campaign,
  status,
  assigned_to,
  notes,
  created_at,
  updated_at,

  -- Priority label
  CASE
    WHEN lead_score >= 75 THEN '🔥 HOT'
    WHEN lead_score >= 55 THEN '🟡 WARM'
    WHEN lead_score >= 35 THEN '🔵 COOL'
    ELSE '❄️ COLD'
  END as priority,

  -- Action timeline
  CASE
    WHEN lead_score >= 75 THEN 'Contact within 1 hour'
    WHEN lead_score >= 55 THEN 'Contact within 4 hours'
    WHEN lead_score >= 35 THEN 'Follow up in 24 hours'
    ELSE 'Nurture sequence (48hrs)'
  END as action_timeline,

  -- Hours since created
  ROUND(EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600::numeric, 1) as hours_old,

  -- SLA status
  CASE
    WHEN lead_score >= 75 AND EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 > 1 THEN '⚠️ OVERDUE'
    WHEN lead_score >= 55 AND EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 > 4 THEN '⚠️ OVERDUE'
    ELSE '✅ On Time'
  END as sla_status

FROM leads
ORDER BY lead_score DESC, created_at DESC;


-- ==========================================
-- 5. OVERDUE LEADS VIEW
-- ==========================================
CREATE OR REPLACE VIEW overdue_leads AS
SELECT
  id,
  first_name,
  email,
  phone,
  whatsapp,
  preferred_contact_method,
  lead_score,
  location,
  timeline,
  created_at,
  status,
  assigned_to,

  -- Priority
  CASE
    WHEN lead_score >= 75 THEN '🔥 HOT'
    WHEN lead_score >= 55 THEN '🟡 WARM'
    ELSE '🔵 COOL'
  END as priority,

  -- Hours overdue
  ROUND(
    CASE
      WHEN lead_score >= 75 THEN EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 - 1
      WHEN lead_score >= 55 THEN EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 - 4
      ELSE EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 - 24
    END::numeric,
    1
  ) as hours_overdue

FROM leads
WHERE status NOT IN ('contacted', 'qualified', 'converted', 'dead')
  AND (
    (lead_score >= 75 AND NOW() - created_at > INTERVAL '1 hour')
    OR (lead_score >= 55 AND lead_score < 75 AND NOW() - created_at > INTERVAL '4 hours')
    OR (lead_score >= 35 AND lead_score < 55 AND NOW() - created_at > INTERVAL '24 hours')
  )
ORDER BY
  CASE
    WHEN lead_score >= 75 THEN 1
    WHEN lead_score >= 55 THEN 2
    ELSE 3
  END,
  created_at ASC;


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

  -- Average score
  ROUND(AVG(lead_score) FILTER (WHERE DATE(created_at) = CURRENT_DATE), 1) as avg_score_today,

  -- Path interest (multi-cycle leads are higher LTV)
  COUNT(*) FILTER (WHERE path_interest LIKE '%structured%' AND DATE(created_at) = CURRENT_DATE) as multi_cycle_today,

  -- Location breakdown
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


-- ==========================================
-- 7. MULTI-CYCLE LEADS VIEW (High LTV)
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
  path_interest,
  created_at,
  status,

  CASE
    WHEN lead_score >= 75 THEN '🔥 HOT'
    WHEN lead_score >= 55 THEN '🟡 WARM'
    WHEN lead_score >= 35 THEN '🔵 COOL'
    ELSE '❄️ COLD'
  END as priority

FROM leads
WHERE path_interest LIKE '%structured%'
   OR path_interest LIKE '%multi%'
ORDER BY lead_score DESC, created_at DESC;


-- ==========================================
-- 8. FAILED CYCLE PATIENTS VIEW
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
WHERE ivf_stage LIKE '%failed%'
   OR biggest_concern = 'Previous failed cycles'
ORDER BY lead_score DESC, created_at DESC;


-- ==========================================
-- 9. PENDING COORDINATOR ACTIONS VIEW
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
  ca.status as action_status,
  ca.assigned_to,
  ca.notes as action_notes,
  ca.created_at as action_created_at,

  -- Priority from lead score
  CASE
    WHEN l.lead_score >= 75 THEN '🔥 HOT'
    WHEN l.lead_score >= 55 THEN '🟡 WARM'
    WHEN l.lead_score >= 35 THEN '🔵 COOL'
    ELSE '❄️ COLD'
  END as priority,

  -- Hours since action created
  ROUND(EXTRACT(EPOCH FROM (NOW() - ca.created_at)) / 3600::numeric, 1) as hours_since_created

FROM coordinator_actions ca
JOIN leads l ON l.id = ca.lead_id
WHERE ca.status = 'pending'
ORDER BY l.lead_score DESC, ca.created_at ASC;
