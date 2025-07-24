/*
  # Create credit alerts table

  1. New Tables
    - `credit_alerts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `title` (text)
      - `message` (text)
      - `type` (enum: info, warning, error, success)
      - `severity` (enum: low, medium, high)
      - `is_read` (boolean)
      - `is_dismissed` (boolean)
      - `metadata` (jsonb, optional extra data)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `credit_alerts` table
    - Add policies for users to manage their own alerts

  3. Indexes
    - Add indexes for efficient querying by user, read status, and creation date
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'alert_type') THEN
    CREATE TYPE alert_type AS ENUM ('info', 'warning', 'error', 'success');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'alert_severity') THEN
    CREATE TYPE alert_severity AS ENUM ('low', 'medium', 'high');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS credit_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type alert_type DEFAULT 'info',
  severity alert_severity DEFAULT 'low',
  is_read boolean DEFAULT false,
  is_dismissed boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE credit_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own credit alerts"
  ON credit_alerts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own credit alerts"
  ON credit_alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own credit alerts"
  ON credit_alerts
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own credit alerts"
  ON credit_alerts
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_credit_alerts_user_id_created_at 
  ON credit_alerts(user_id, created_at DESC);
  
CREATE INDEX IF NOT EXISTS idx_credit_alerts_user_id_unread 
  ON credit_alerts(user_id, is_read, is_dismissed);

-- Create updated_at trigger
CREATE TRIGGER update_credit_alerts_updated_at
  BEFORE UPDATE ON credit_alerts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();