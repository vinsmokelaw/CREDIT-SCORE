/*
  # Create educational tips table

  1. New Tables
    - `educational_tips`
      - `id` (uuid, primary key)
      - `category` (text)
      - `title` (text)
      - `content` (text)
      - `read_time` (text)
      - `difficulty` (enum: beginner, intermediate, advanced)
      - `tags` (text array)
      - `is_featured` (boolean)
      - `sort_order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `educational_tips` table
    - Add policy for public read access

  3. Sample Data
    - Insert sample educational tips for credit education
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tip_difficulty') THEN
    CREATE TYPE tip_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS educational_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  read_time text DEFAULT '5 min read',
  difficulty tip_difficulty DEFAULT 'beginner',
  tags text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE educational_tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Educational tips are publicly readable"
  ON educational_tips
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_educational_tips_category 
  ON educational_tips(category);
  
CREATE INDEX IF NOT EXISTS idx_educational_tips_difficulty 
  ON educational_tips(difficulty);
  
CREATE INDEX IF NOT EXISTS idx_educational_tips_featured 
  ON educational_tips(is_featured, sort_order);

-- Insert sample educational tips
INSERT INTO educational_tips (category, title, content, read_time, difficulty, tags, is_featured, sort_order) VALUES
(
  'Credit Basics',
  'Understanding Your Credit Score',
  'Your credit score is a three-digit number that represents your creditworthiness. Scores range from 300-850, with higher scores indicating better credit health. The score is calculated based on five main factors: payment history (35%), credit utilization (30%), length of credit history (15%), credit mix (10%), and new credit (10%). Understanding these factors helps you make informed decisions about your credit.',
  '3 min read',
  'beginner',
  '{"credit score", "basics", "financial health"}',
  true,
  1
),
(
  'Payment Tips',
  'The Power of On-Time Payments',
  'Payment history makes up 35% of your credit score, making it the most important factor. Even one late payment can drop your score by 60-110 points. Set up automatic payments or calendar reminders to ensure you never miss a payment. If you do miss a payment, contact your creditor immediately to discuss options and get current as soon as possible.',
  '4 min read',
  'beginner',
  '{"payments", "payment history", "automation"}',
  true,
  2
),
(
  'Credit Utilization',
  'Optimal Credit Card Usage',
  'Credit utilization is the second most important factor in your credit score, accounting for 30% of the calculation. Keep your credit utilization below 30% of your available credit, but for the best scores, aim for under 10%. Consider making multiple payments per month or requesting credit limit increases to lower your utilization ratio.',
  '5 min read',
  'intermediate',
  '{"credit utilization", "credit cards", "optimization"}',
  false,
  3
),
(
  'Building Credit',
  'Building Credit from Scratch',
  'If you have no credit history, start with a secured credit card or become an authorized user on someone else''s account. Make small purchases and pay them off in full each month. Consider a credit-builder loan or store credit card as additional options. Be patient - building good credit takes time, typically 3-6 months to see initial progress.',
  '6 min read',
  'beginner',
  '{"building credit", "secured cards", "credit history"}',
  false,
  4
);

-- Create updated_at trigger
CREATE TRIGGER update_educational_tips_updated_at
  BEFORE UPDATE ON educational_tips
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();