/*
  # Create loan applications table

  1. New Tables
    - `loan_applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `bank_name` (text)
      - `amount` (decimal)
      - `purpose` (text)
      - `status` (enum: pending, approved, rejected, withdrawn)
      - `interest_rate` (decimal, optional)
      - `term_months` (integer, optional)
      - `monthly_payment` (decimal, optional)
      - `application_date` (date)
      - `decision_date` (date, optional)
      - `notes` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `loan_applications` table
    - Add policies for users to manage their own applications

  3. Indexes
    - Add indexes for efficient querying by user and status
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'loan_status') THEN
    CREATE TYPE loan_status AS ENUM ('pending', 'approved', 'rejected', 'withdrawn');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS loan_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  bank_name text NOT NULL,
  amount decimal(12,2) NOT NULL CHECK (amount > 0),
  purpose text NOT NULL,
  status loan_status DEFAULT 'pending',
  interest_rate decimal(5,2),
  term_months integer,
  monthly_payment decimal(10,2),
  application_date date DEFAULT CURRENT_DATE,
  decision_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own loan applications"
  ON loan_applications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own loan applications"
  ON loan_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own loan applications"
  ON loan_applications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own loan applications"
  ON loan_applications
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_loan_applications_user_id_status 
  ON loan_applications(user_id, status);
  
CREATE INDEX IF NOT EXISTS idx_loan_applications_user_id_created_at 
  ON loan_applications(user_id, created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER update_loan_applications_updated_at
  BEFORE UPDATE ON loan_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();