# Row Level Security (RLS) Policies

This document provides the SQL statements for creating Row Level Security (RLS) policies for your Supabase database. These policies are crucial for ensuring that users can only access the data they are permitted to see.

**How to Apply:**

1.  Navigate to the Supabase dashboard for your project.
2.  Go to the "SQL Editor" section.
3.  Copy and paste the SQL commands below and run them.

---

### 1. Enable RLS on all tables

First, you must enable RLS on each of the tables.

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_scores ENABLE ROW LEVEL SECURITY;
```

---

### 2. Policies for `profiles` table

These policies control access to the `profiles` table.

**Allow users to see their own profile:**

```sql
CREATE POLICY "Allow individual access to own profile"
ON profiles
FOR SELECT
USING (auth.uid() = id);
```

**Allow users to update their own profile:**

```sql
CREATE POLICY "Allow individual update of own profile"
ON profiles
FOR UPDATE
USING (auth.uid() = id);
```

---

### 3. Policies for `financial_data` table

These policies secure the `financial_data` table.

**Allow users to manage their own financial data:**

```sql
CREATE POLICY "Allow individual management of own financial data"
ON financial_data
FOR ALL
USING (auth.uid() = user_id);
```

---

### 4. Policies for `credit_scores` table

These policies govern access to the `credit_scores` table, with different rules for clients and bank representatives.

**Allow clients to see their own credit score:**

```sql
CREATE POLICY "Allow individual access to own credit score"
ON credit_scores
FOR SELECT
USING (auth.uid() = user_id);
```

**Allow bank representatives to see all credit scores:**

```sql
CREATE POLICY "Allow bank representatives to see all credit scores"
ON credit_scores
FOR SELECT
USING (
  (get_my_claim('user_type'::text)) = '"bank"'::jsonb
);
```

**Helper function to get user's user_type**
This function is needed for the bank policy above.

```sql
CREATE OR REPLACE FUNCTION get_my_claim(claim TEXT)
RETURNS JSONB
LANGUAGE SQL
STABLE
AS $$
  SELECT coalesce(
    current_setting('request.jwt.claims', true)::jsonb -> claim,
    null
  )
$$;