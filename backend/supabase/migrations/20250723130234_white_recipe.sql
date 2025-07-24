/*
  # Create credit scores table

  1. New Tables
    - `credit_scores`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `score` (integer, 300-850)
      - `score_change` (integer, difference from previous)
      - `factors` (jsonb, credit factors breakdown)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `credit_scores` table
    - Add policies for users to read/update their own credit scores

  3. Indexes
    - Add index on user_id and created_at for efficient queries
*/

CREATE TABLE IF NOT EXISTS credit_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score >= 300 AND score <= 850),
  score_change integer DEFAULT 0,
  factors jsonb DEFAULT '{
    "payment_history": 95,
    "credit_utilization": 75,
    "length_of_history": 85,
    "types_of_credit": 70,
    "new_credit": 80
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE credit_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own credit scores"
  ON credit_scores
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own credit scores"
  ON credit_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own credit scores"
  ON credit_scores
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_credit_scores_user_id_created_at 
  ON credit_scores(user_id, created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER update_credit_scores_updated_at
  BEFORE UPDATE ON credit_scores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();