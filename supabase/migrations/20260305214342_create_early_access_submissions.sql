/*
  # Create early access submissions table

  1. New Tables
    - `early_access_submissions`
      - `id` (uuid, primary key)
      - `full_name` (text, not null)
      - `phone` (text, not null)
      - `email` (text, not null)
      - `message` (text, default empty)
      - `consent_privacy` (boolean, not null, default false)
      - `consent_data_processing` (boolean, not null, default false)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `early_access_submissions` table
    - Add INSERT policy for anonymous users (public form)
    - No SELECT/UPDATE/DELETE policies for public access
*/

CREATE TABLE IF NOT EXISTS early_access_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  message text DEFAULT '',
  consent_privacy boolean NOT NULL DEFAULT false,
  consent_data_processing boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE early_access_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit early access form"
  ON early_access_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    consent_privacy = true
    AND consent_data_processing = true
  );
