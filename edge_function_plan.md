# Edge Function Plan for Credit Score Calculation

This document details the plan for a Supabase Edge Function that will handle the credit score calculation securely and efficiently on the server-side.

## 1. Function Trigger

The Edge Function should be triggered automatically whenever a new record is inserted into the `financial_data` table. This can be achieved using a Supabase database webhook or by invoking the function from the client-side after a successful data submission.

*   **Recommended Trigger:** A database trigger on the `financial_data` table that calls a PostgreSQL function, which in turn invokes the Edge Function. This is the most secure and reliable method.

## 2. Function Logic (`calculate-credit-score`)

The Edge Function will contain the core logic for calculating the credit score based on the user's financial data.

*   **Input:** The function will receive the `user_id` and the newly inserted `financial_data` record.
*   **Steps:**
    1.  Retrieve the financial data for the user.
    2.  Apply the scoring model as defined in `credit_score_plan.md`.
        *   Calculate Debt-to-Income Ratio (DTI).
        *   Calculate Assets-to-Debt Ratio (ADR).
        *   Factor in the payment history score.
    3.  Compute the final credit score.
    4.  Generate a JSON object for the `report_data`, detailing the factors that contributed to the score.
*   **Security:** The function will run with the permissions of the Supabase service role, allowing it to query and insert data as needed, but the invocation should be secured.

## 3. Storing the Result

After the calculation is complete, the function will store the result in the `credit_scores` table.

*   **Action:** Insert a new row into the `credit_scores` table with the following data:
    *   `user_id`: The ID of the user.
    *   `score`: The calculated credit score.
    *   `report_data`: The JSON object with the detailed report.

## Example Implementation (TypeScript)

This is a conceptual example of what the Edge Function code might look like.

```typescript
// supabase/functions/calculate-credit-score/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const { record } = await req.json()
  const { user_id, income, debt, assets, payment_history } = record

  // Simplified scoring logic
  let score = 300;
  const dti = (debt / income) * 100;
  const adr = assets / debt;

  if (dti < 20) score += 150;
  else if (dti <= 40) score += 100;
  else score += 50;

  if (adr > 2) score += 150;
  else if (adr >= 1) score += 100;
  else score += 50;

  score += (payment_history * 50);
  score = Math.min(score, 850); // Cap score at 850

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  await supabase.from("credit_scores").insert({
    user_id,
    score,
    report_data: { dti, adr, payment_history_score: payment_history },
  });

  return new Response("Credit score calculated.", { status: 200 });
})