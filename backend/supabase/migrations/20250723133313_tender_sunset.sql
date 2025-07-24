/*
  # Create bank alerts table

  1. New Tables
    - `bank_alerts`
      - `id` (uuid, primary key)
      - `bank_id` (uuid, references bank_profiles)
      - `title` (text)
      - `message` (text)
      - `type` (enum: info, warning, error, success)
      - `severity` (enum: low, medium, high)
      - `category` (text) - risk, performance, compliance, etc.
      - `is_read` (boolean)
      - `is_dismissed` (boolean)
      - `metadata` (jsonb, optional extra data)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bank_alerts` table
    - Add policies for banks to manage their own alerts

  3. Indexes
    - Add indexes for efficient querying by bank, read status, and creation date
*/

CREATE TABLE IF NOT EXISTS bank_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_id uuid NOT NULL REFERENCES bank_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type alert_type DEFAULT 'info',
  severity alert_severity DEFAULT 'low',
  category text DEFAULT 'general',
  is_read boolean DEFAULT false,
  is_dismissed boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bank_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banks can read own alerts"
  ON bank_alerts
  FOR SELECT
  TO authenticated
  USING (bank_id = auth.uid());

CREATE POLICY "Banks can insert own alerts"
  ON bank_alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (bank_id = auth.uid());

CREATE POLICY "Banks can update own alerts"
  ON bank_alerts
  FOR UPDATE
  TO authenticated
  USING (bank_id = auth.uid());

CREATE POLICY "Banks can delete own alerts"
  ON bank_alerts
  FOR DELETE
  TO authenticated
  USING (bank_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bank_alerts_bank_id_created_at 
  ON bank_alerts(bank_id, created_at DESC);
  
CREATE INDEX IF NOT EXISTS idx_bank_alerts_bank_id_unread 
  ON bank_alerts(bank_id, is_read, is_dismissed);

CREATE INDEX IF NOT EXISTS idx_bank_alerts_bank_id_category 
  ON bank_alerts(bank_id, category);

-- Create updated_at trigger
CREATE TRIGGER update_bank_alerts_updated_at
  BEFORE UPDATE ON bank_alerts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();