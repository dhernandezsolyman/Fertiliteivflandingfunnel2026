-- Test 1: Absolute minimum view
CREATE OR REPLACE VIEW test_view_1 AS
SELECT
  id,
  first_name,
  email
FROM leads
LIMIT 10;

-- If test 1 works, try test 2 with more columns
-- CREATE OR REPLACE VIEW test_view_2 AS
-- SELECT
--   id,
--   first_name,
--   email,
--   phone,
--   lead_score,
--   created_at
-- FROM leads
-- LIMIT 10;
