# Supabase Database Schema

This document outlines the proposed database schema for the Credit Score Prediction application.

## 1. `profiles` Table

This table stores public user data and is linked to the `auth.users` table.

| Column      | Type                        | Constraints                               | Description                               |
|-------------|-----------------------------|-------------------------------------------|-------------------------------------------|
| `id`        | `uuid`                      | Primary Key, Foreign Key to `auth.users.id` | The user's unique identifier.             |
| `created_at`| `timestamp with time zone`  | Not Null, Default `now()`                 | The timestamp when the profile was created. |
| `name`      | `text`                      | Not Null                                  | The user's full name.                     |
| `user_type` | `text`                      | Not Null, Check (`client` or `bank`)      | The type of user.                         |
| `bank`      | `text`                      | Nullable                                  | The bank the user is associated with.     |

## 2. `financial_data` Table

This table stores the financial information for each client, which will be used to calculate their credit score.

| Column          | Type                        | Constraints                       | Description                               |
|-----------------|-----------------------------|-----------------------------------|-------------------------------------------|
| `id`            | `uuid`                      | Primary Key, Default `gen_random_uuid()` | A unique identifier for the financial record. |
| `user_id`       | `uuid`                      | Foreign Key to `profiles.id`      | The user this data belongs to.            |
| `created_at`    | `timestamp with time zone`  | Not Null, Default `now()`         | The timestamp when the record was created.|
| `income`        | `numeric`                   | Not Null                          | The user's monthly income.                |
| `debt`          | `numeric`                   | Not Null                          | The user's total debt.                    |
| `assets`        | `numeric`                   | Not Null                          | The user's total assets.                  |
| `payment_history`| `jsonb`                    | Nullable                          | A record of the user's payment history.   |

## 3. `credit_scores` Table

This table will store the calculated credit scores for each user.

| Column        | Type                        | Constraints                       | Description                               |
|---------------|-----------------------------|-----------------------------------|-------------------------------------------|
| `id`          | `uuid`                      | Primary Key, Default `gen_random_uuid()` | A unique identifier for the score record. |
| `user_id`     | `uuid`                      | Foreign Key to `profiles.id`      | The user this score belongs to.           |
| `created_at`  | `timestamp with time zone`  | Not Null, Default `now()`         | The timestamp when the score was calculated.|
| `score`       | `integer`                   | Not Null                          | The calculated credit score.              |
| `report_data` | `jsonb`                     | Nullable                          | A JSON object containing the full report. |