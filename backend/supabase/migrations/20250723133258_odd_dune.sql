/*
  # Create bank profiles table

  1. New Tables
    - `bank_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `bank_name` (text)
      - `bank_code` (text, unique)
      - `email` (text, unique)
      - `phone` (text, optional)
      - `address` (text, optional)
      - `license_number` (text, optional)
      - `established_date` (date, optional)
      - `total_assets` (decimal, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bank_profiles` table
    - Add policy for banks to read/update their own profile
*/

CREATE TABLE IF NOT EXISTS bank_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bank_name text NOT NULL,
  bank_code text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  address text,
  license_number text,
  established_date date,
  total_assets decimal(15,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bank_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banks can read own profile"
  ON bank_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Banks can update own profile"
  ON bank_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Banks can insert own profile"
  ON bank_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create updated_at trigger
CREATE TRIGGER update_bank_profiles_updated_at
  BEFORE UPDATE ON bank_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();