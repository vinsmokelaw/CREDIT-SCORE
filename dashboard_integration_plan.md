# Dashboard Integration Plan

This document outlines the strategy for connecting the React dashboard components to the Supabase backend.

## 1. Client Dashboard (`ClientDashboard.tsx`)

The client dashboard is the user's primary interface for managing their financial data and viewing their credit score.

### Data Fetching:

*   On component mount, fetch the user's financial data from the `financial_data` table.
*   Also, fetch the user's latest credit score from the `credit_scores` table.
*   Use the `user.id` from the `useAuth` hook to filter the queries.

### Data Submission:

*   Create a form for the user to submit their financial data (income, debt, assets, etc.).
*   On form submission, insert a new record into the `financial_data` table.
*   After a successful submission, trigger the credit score calculation (this will be handled by a Supabase function).

### Data Display:

*   If financial data exists, display it.
*   If a credit score exists, display it using a visual component (e.g., a gauge).
*   If no data exists, display the financial data submission form.

## 2. Bank Dashboard (`BankDashboard.tsx`)

The bank dashboard provides bank representatives with an overview of all clients and their credit scores.

### Data Fetching:

*   On component mount, fetch a list of all users with the `user_type` of 'client' from the `profiles` table.
*   For each client, fetch their latest credit score from the `credit_scores` table.
*   This will require a join or multiple queries. A Supabase RPC function might be efficient here.

### Data Display:

*   Display the list of clients in a table with their name, email, and credit score.
*   The table should be sortable and searchable.
*   Clicking on a client will navigate to a detailed view of their credit report (a future feature).

## 3. API Calls (`supabaseClient.tsx`)

All interactions with Supabase should be encapsulated in functions. While the `supabaseClient` is already set up, we can create a new file, perhaps `src/api/supabase.ts`, to hold all our data-related functions.

**Example Functions:**

*   `getFinancialData(userId)`
*   `createFinancialData(data)`
*   `getCreditScore(userId)`
*   `getAllClientScores()`

This approach will keep the components clean and separate the data logic.