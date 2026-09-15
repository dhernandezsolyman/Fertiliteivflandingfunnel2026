# 📊 Coordinator Dashboard Guide

## How to Set Up

### 1. Run the SQL Views
1. Go to your Supabase Dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy/paste the contents of `supabase-dashboard-views.sql`
5. Click **Run** (or press Cmd/Ctrl + Enter)

✅ You should see "Success. No rows returned" - this is correct!

### 2. Access the Views
1. Click **Table Editor** in the left sidebar
2. You'll now see 9 new "views" alongside your tables:
   - `hot_leads`
   - `warm_leads`
   - `cool_leads`
   - `coordinator_dashboard`
   - `pending_actions`
   - `daily_stats`
   - `overdue_leads`
   - `multi_cycle_leads`
   - `failed_cycle_patients`

---

## 📋 View Reference

### 🔥 `hot_leads` - Urgent Follow-Ups
**Use this first every morning**

Shows leads with score 75+ that need contact **within 1 hour**

**Columns:**
- Contact info (name, email, phone, preferred method)
- Lead score
- Full profile (location, age, IVF stage, timeline, travel, concern, path interest)
- UTM attribution (source, medium, campaign)
- Status and notes

**How to use:**
1. Open `hot_leads` view
2. Sort by `created_at` (newest first)
3. Contact each lead via their `preferred_contact_method`
4. After contacting, update `status` to "contacted" in main `leads` table

---

### 🟡 `warm_leads` - Same-Day Follow-Ups
Shows leads with score 55-74 that need contact **within 4 hours**

Sorted by score (highest first), then by date

---

### 🔵 `cool_leads` - 24-Hour Nurture
Shows leads with score 35-54 for nurture sequence

These go into email automation, follow up in 24 hours

---

### 📊 `coordinator_dashboard` - Main Work View
**Your primary daily view**

Shows ALL leads with:
- ✅ Priority labels (🔥 HOT, 🟡 WARM, 🔵 COOL, ❄️ COLD)
- ⏱️ SLA status (✅ On Time / ⚠️ OVERDUE)
- 🕐 Hours old
- 📝 Response count (how many questions answered)
- ⚡ Has pending actions flag

**How to use:**
1. Filter by `status = 'new'` to see uncontacted leads
2. Sort by `priority` and `created_at`
3. Check `sla_status` column for ⚠️ OVERDUE alerts
4. Click into a lead to see full details

**Pro tip:** Export to CSV for weekly reports

---

### ⚠️ `overdue_leads` - SLA Violations
**Check this multiple times per day**

Shows leads that have exceeded their contact timeframe:
- HOT leads: > 1 hour old
- WARM leads: > 4 hours old
- COOL leads: > 24 hours old

Includes `hours_overdue` and `should_contact_by` timestamp

**How to use:**
1. Open first thing in the morning
2. Contact all overdue leads immediately
3. Check again after lunch and before end of day

---

### 📈 `daily_stats` - Performance Dashboard
**Run this for daily/weekly reports**

Shows:
- Leads today, this week, this month
- Breakdown by priority (hot/warm/cool/cold)
- Average lead score
- Path interest (multi-cycle vs single-cycle)
- Top locations (SoCal, Arizona, N. Mexico)

**How to use:**
1. Query once per day for reporting
2. Track trends week-over-week
3. Share stats in team meetings

---

### 💎 `multi_cycle_leads` - High LTV Leads
Shows leads interested in multi-cycle paths (higher lifetime value)

Prioritize these for conversion calls - they represent $8,790-$14,190 vs $4,950 single cycles

---

### 💔 `failed_cycle_patients` - High Intent Leads
Shows patients with previous failed IVF cycles

These have high pain points and high intent - excellent conversion candidates

---

### 📋 `pending_actions` - Your To-Do List
Shows all coordinator actions marked as "pending"

Links to lead info and shows priority level

---

## 🎯 Daily Workflow

### Morning Routine (9am):
1. Open `overdue_leads` → Contact immediately
2. Open `hot_leads` → Contact all leads (1 hour SLA)
3. Open `pending_actions` → Review your to-do list
4. Check `daily_stats` → See overnight performance

### Midday Check (1pm):
1. `overdue_leads` → Catch any new overdue items
2. `warm_leads` → Contact leads (4 hour SLA)
3. Update `status` on contacted leads in main `leads` table

### End of Day (5pm):
1. `overdue_leads` → Final check
2. `cool_leads` → Add to nurture email sequence
3. Update notes in `leads` table for next-day follow-ups

---

## 💡 Pro Tips

### Filtering
Click the filter icon next to any column header to filter:
- `location = 'Southern California'` → See SoCal leads only
- `timeline = 'As soon as possible'` → Most urgent
- `path_interest = 'multi_cycle'` → High LTV

### Sorting
Click column headers to sort:
- Sort `hot_leads` by `created_at DESC` → Newest first
- Sort `coordinator_dashboard` by `lead_score DESC` → Highest priority first

### Exporting
1. Click "Export as CSV" button (top right)
2. Use for weekly reports to management
3. Import to email marketing tool for campaigns

### Searching
Use the search box to find by:
- Name
- Email
- Phone number

---

## 🔍 Useful SQL Queries

Run these in **SQL Editor** for custom reports:

### Today's Hot Leads
```sql
SELECT * FROM hot_leads
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

### This Week's Multi-Cycle Interest
```sql
SELECT * FROM multi_cycle_leads
WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE)
ORDER BY lead_score DESC;
```

### Failed Cycles Ready to Start ASAP
```sql
SELECT * FROM failed_cycle_patients
WHERE timeline = 'As soon as possible'
ORDER BY lead_score DESC;
```

### Conversion Rate by Location (Last 30 Days)
```sql
SELECT
  location,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'converted') as converted,
  ROUND(COUNT(*) FILTER (WHERE status = 'converted')::numeric / COUNT(*) * 100, 1) as conversion_rate
FROM leads
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY location
ORDER BY total_leads DESC;
```

### Average Response Time by Priority
```sql
SELECT
  CASE
    WHEN lead_score >= 75 THEN 'HOT'
    WHEN lead_score >= 55 THEN 'WARM'
    ELSE 'COOL'
  END as priority,
  ROUND(AVG(EXTRACT(EPOCH FROM (updated_at - created_at)) / 3600), 1) as avg_hours_to_contact
FROM leads
WHERE status = 'contacted'
GROUP BY priority
ORDER BY priority;
```

---

## 📱 Mobile Access

Supabase dashboard works on mobile browsers:

1. Bookmark your Supabase project URL
2. Use `hot_leads` and `overdue_leads` views on phone
3. Update lead status on the go
4. Add notes from coordinator phone

---

## 🚨 Alerts to Set Up

Consider setting up email alerts for:

1. **New Hot Lead Alert**
   - When lead_score >= 75
   - Send to coordinator phone via email-to-SMS

2. **Overdue Lead Alert**
   - When lead exceeds SLA
   - Send every 30 minutes until contacted

3. **End of Day Summary**
   - Daily stats at 6pm
   - Pending actions count

*(These require Supabase Functions or external tools like Zapier)*

---

## ❓ FAQ

**Q: Can I edit leads directly in the views?**
A: No, views are read-only. Edit the main `leads` table instead.

**Q: Why don't I see new leads in the views?**
A: Views update in real-time. Try refreshing the page.

**Q: Can I add custom columns to views?**
A: Yes! Edit the SQL in the SQL Editor and re-run.

**Q: How do I update lead status after contacting?**
A: Go to main `leads` table, find the lead by ID or email, update `status` column to "contacted" or "qualified"

**Q: What's the difference between `status` and `priority`?**
A: `status` = workflow stage (new/contacted/qualified/converted)
   `priority` = urgency level based on score (hot/warm/cool/cold)

---

## 🎓 Next Steps

Once you're comfortable with views:

1. **Add custom columns** to track your workflow
2. **Create saved filters** for common searches
3. **Build custom reports** with SQL queries
4. **Export data** for marketing campaigns
5. **Consider building** a dedicated admin dashboard in Claude Code for even more features

---

Need help? Check the `/LEAD_SCORING_TEST_RESULTS.md` file for scoring details.
