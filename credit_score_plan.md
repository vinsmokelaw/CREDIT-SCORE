# Credit Score Creation and Display Plan

This document outlines the plan for creating, calculating, and displaying credit scores within the application.

## 1. Data Collection

The first step is to collect the necessary financial data from the user. This will be done through a form in the client's dashboard.

*   **Form Fields:**
    *   Monthly Income
    *   Total Debt
    *   Total Assets
    *   Payment History (This could be a simplified input for now, perhaps a rating from 1-5 on payment consistency).
*   **Process:**
    1.  The user logs in and navigates to their dashboard.
    2.  If they haven't submitted their financial data yet, they will be prompted to fill out the form.
    3.  Upon submission, the data will be saved to the `financial_data` table.

## 2. Score Calculation

Once the data is collected, a credit score can be calculated. For the purpose of this application, we will use a simplified model.

*   **Simplified Scoring Model:**
    *   **Debt-to-Income Ratio (DTI):** `(debt / income) * 100`
        *   Lower DTI is better.
    *   **Assets-to-Debt Ratio (ADR):** `(assets / debt)`
        *   Higher ADR is better.
    *   **Payment History:** A score from 1 to 5, where 5 is excellent.

*   **Calculation (Example):**
    *   A base score of 300.
    *   Points are added based on the following criteria:
        *   DTI < 20%: +150 points
        *   DTI 20-40%: +100 points
        *   DTI > 40%: +50 points
        *   ADR > 2: +150 points
        *   ADR 1-2: +100 points
        *   ADR < 1: +50 points
        *   Payment History: `(payment_history_score * 50)` points
    *   The final score will be capped at 850.

This calculation should ideally be performed in a Supabase Edge Function for security and consistency.

## 3. Displaying the Score

The calculated score will be displayed on the user's dashboard.

*   **Client Dashboard:**
    *   A prominent display of the credit score (e.g., a gauge or a large number).
    *   A summary of the factors that contributed to the score.
    *   Educational tips on how to improve the score.
*   **Bank Dashboard:**
    *   A table of all clients with their names and credit scores.
    *   The ability to click on a client to view their detailed report.

This plan provides a clear path for implementing the core functionality of your application.