# Credit Dashboard Backend

A comprehensive Node.js/Express backend for a credit dashboard application with Supabase integration.

## Features

- **Authentication**: Secure user authentication with Supabase Auth
- **Credit Score Management**: Track and manage credit scores with historical data
- **Loan Applications**: Create and manage loan applications with status tracking
- **Credit Alerts**: Real-time notifications and alerts system
- **Educational Content**: Credit education tips and resources
- **Credit Simulation**: Simulate credit score changes based on financial actions
- **Personalized Recommendations**: AI-driven credit improvement suggestions
- **Bank Dashboard**: Comprehensive loan application management for banks
- **Risk Assessment**: Advanced risk analysis and scoring for financial institutions
- **Analytics & Reporting**: Performance metrics and trend analysis

## Setup

1. **Environment Variables**
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   The database migrations are already created. Make sure your Supabase project has the required tables by running the migrations in your Supabase dashboard.

4. **Start the Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### Credit Scores
- `GET /api/credit/score` - Get current credit score
- `GET /api/credit/score/history` - Get credit score history
- `POST /api/credit/score` - Update credit score
- `GET /api/credit/factors` - Get credit factors
- `POST /api/credit/simulate` - Simulate credit score changes
- `GET /api/credit/trends` - Get credit score trends

### Loan Applications
- `GET /api/loans` - Get loan applications
- `POST /api/loans` - Create loan application
- `GET /api/loans/:id` - Get specific loan application
- `PUT /api/loans/:id` - Update loan application
- `DELETE /api/loans/:id` - Delete loan application
- `GET /api/loans/status/:status` - Get applications by status

### Credit Alerts
- `GET /api/alerts` - Get credit alerts
- `POST /api/alerts` - Create credit alert
- `PUT /api/alerts/:id/dismiss` - Dismiss alert
- `DELETE /api/alerts/:id` - Delete alert
- `PUT /api/alerts/dismiss-all` - Dismiss all alerts
- `GET /api/alerts/unread-count` - Get unread alerts count

### Education
- `GET /api/education/tips` - Get educational tips
- `GET /api/education/tips/:id` - Get specific tip
- `GET /api/education/categories` - Get tip categories
- `GET /api/education/score-ranges` - Get credit score ranges
- `GET /api/education/factors` - Get credit factors information

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/recommendations/improvement-plan` - Get improvement plan
- `POST /api/recommendations/mark-completed/:id` - Mark recommendation as completed

### Bank Management
- `GET /api/bank/dashboard/stats` - Get bank dashboard statistics
- `GET /api/bank/dashboard/recent-applications` - Get recent loan applications
- `GET /api/bank/applications` - Get all applications for bank
- `GET /api/bank/applications/search` - Search applications
- `PUT /api/bank/applications/:id/status` - Update application status
- `GET /api/bank/alerts` - Get bank-specific alerts
- `GET /api/bank/analytics/performance` - Get performance metrics
- `GET /api/bank/reports/risk-assessment` - Generate risk assessment report

## Database Schema

The backend uses the following main tables:
- `user_profiles` - User profile information
- `credit_scores` - Credit score history and factors
- `loan_applications` - Loan application data
- `credit_alerts` - User alerts and notifications
- `educational_tips` - Educational content
- `recommendations` - Personalized recommendations
- `bank_profiles` - Bank information and settings
- `bank_applications` - Bank-specific application data with risk assessment
- `bank_alerts` - Bank-specific alerts and notifications
- `bank_analytics` - Performance metrics and analytics data

## Security

- Row Level Security (RLS) enabled on all tables
- JWT authentication with Supabase
- Input validation and sanitization
- Rate limiting
- CORS protection
- Security headers with Helmet

## Architecture

```
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── routes/          # API routes
├── services/        # Business logic services
├── supabase/        # Database migrations
└── server.js        # Main server file
```

## Development

The backend is structured with:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and database operations
- **Middleware**: Handle authentication, validation, and error handling
- **Routes**: Define API endpoints and apply middleware

## Integration with Frontend

This backend is designed to work with the React credit dashboard frontend. Make sure to:
1. Update CORS settings in `server.js` for your frontend URL
2. Use the correct API endpoints in your frontend
3. Handle authentication tokens properly
4. Implement real-time updates using Supabase subscriptions if needed