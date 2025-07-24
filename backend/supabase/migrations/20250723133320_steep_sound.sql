/*
  # Create bank analytics table

  1. New Tables
    - `bank_analytics`
      - `id` (uuid, primary key)
      - `bank_id` (uuid, references bank_profiles)
      - `metric_name` (text) - total_applications, approval_rate, etc.
      - `metric_value` (decimal)
      - `metric_type` (text) - count, percentage, amount, etc.
      - `period_start` (date)
      - `period_end` (date)
      - `metadata` (jsonb, additional metric data)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `bank_analytics` table
    - Add policies for banks to read their own analytics

  3. Indexes
    - Add indexes for efficient querying by bank, metric, and date range
*/

CREATE TABLE IF NOT EXISTS bank_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_id uuid NOT NULL REFERENCES bank_profiles(id) ON DELETE CASCADE,
  metric_name text NOT NULL,
  metric_value decimal(15,2) NOT NULL,
  metric_type text NOT NULL DEFAULT 'count',
  period_start date NOT NULL,
  period_end date NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(bank_id, metric_name, period_start, period_end)
);

ALTER TABLE bank_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banks can read own analytics"
  ON bank_analytics
  FOR SELECT
  TO authenticated
  USING (bank_id = auth.uid());

CREATE POLICY "Banks can insert own analytics"
  ON bank_analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (bank_id = auth.uid());

CREATE POLICY "Banks can update own analytics"
  ON bank_analytics
  FOR UPDATE
  TO authenticated
  USING (bank_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bank_analytics_bank_id_metric_name 
  ON bank_analytics(bank_id, metric_name);
  
CREATE INDEX IF NOT EXISTS idx_bank_analytics_bank_id_period 
  ON bank_analytics(bank_id, period_start, period_end);

CREATE INDEX IF NOT EXISTS idx_bank_analytics_metric_name_period 
  ON bank_analytics(metric_name, period_start DESC);