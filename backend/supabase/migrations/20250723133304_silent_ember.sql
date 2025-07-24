/*
  # Create bank applications table for bank dashboard

  1. New Tables
    - `bank_applications`
      - `id` (uuid, primary key)
      - `bank_id` (uuid, references bank_profiles)
      - `client_id` (uuid, references user_profiles)
      - `application_id` (uuid, references loan_applications)
      - `risk_level` (enum: low, medium, high)
      - `risk_score` (decimal)
      - `debt_to_income_ratio` (decimal)
      - `employment_verified` (boolean)
      - `income_verified` (boolean)
      - `collateral_value` (decimal, optional)
      - `processing_notes` (text, optional)
      - `assigned_officer` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bank_applications` table
    - Add policies for banks to manage their applications

  3. Indexes
    - Add indexes for efficient querying by bank and risk level
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'risk_level') THEN
    CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS bank_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_id uuid NOT NULL REFERENCES bank_profiles(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  application_id uuid NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
  risk_level risk_level DEFAULT 'medium',
  risk_score decimal(5,2) DEFAULT 0.00,
  debt_to_income_ratio decimal(5,2),
  employment_verified boolean DEFAULT false,
  income_verified boolean DEFAULT false,
  collateral_value decimal(12,2),
  processing_notes text,
  assigned_officer text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(bank_id, application_id)
);

ALTER TABLE bank_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banks can read own applications"
  ON bank_applications
  FOR SELECT
  TO authenticated
  USING (bank_id = auth.uid());

CREATE POLICY "Banks can insert own applications"
  ON bank_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (bank_id = auth.uid());

CREATE POLICY "Banks can update own applications"
  ON bank_applications
  FOR UPDATE
  TO authenticated
  USING (bank_id = auth.uid());

CREATE POLICY "Banks can delete own applications"
  ON bank_applications
  FOR DELETE
  TO authenticated
  USING (bank_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bank_applications_bank_id_risk_level 
  ON bank_applications(bank_id, risk_level);
  
CREATE INDEX IF NOT EXISTS idx_bank_applications_bank_id_created_at 
  ON bank_applications(bank_id, created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER update_bank_applications_updated_at
  BEFORE UPDATE ON bank_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();