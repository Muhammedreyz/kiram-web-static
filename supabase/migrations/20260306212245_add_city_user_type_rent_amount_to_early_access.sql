/*
  # Add city, user type, and rent amount fields to early access submissions

  1. Modified Tables
    - `early_access_submissions`
      - Added `city` (text, default empty) - user's city
      - Added `user_type` (text, default empty) - 'ev_sahibi' or 'kiraci'
      - Added `rent_amount` (text, default empty) - monthly rent amount
      - Removed `message` column requirement (replaced by new fields)

  2. Important Notes
    - Existing rows will have empty defaults for new columns
    - No data loss - message column preserved
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'early_access_submissions' AND column_name = 'city'
  ) THEN
    ALTER TABLE early_access_submissions ADD COLUMN city text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'early_access_submissions' AND column_name = 'user_type'
  ) THEN
    ALTER TABLE early_access_submissions ADD COLUMN user_type text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'early_access_submissions' AND column_name = 'rent_amount'
  ) THEN
    ALTER TABLE early_access_submissions ADD COLUMN rent_amount text DEFAULT '';
  END IF;
END $$;
