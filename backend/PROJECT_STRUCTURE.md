# Credit Dashboard Backend - Project Structure

## Recommended Project Structure

```
credit-dashboard-backend/
├── package.json                 # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── .env                        # Environment variables (your Supabase credentials)
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── server.js                  # Main server entry point
├── README.md                  # Project documentation
│
├── config/                    # Configuration files
│   └── supabase.js           # Supabase client configuration
│
├── middleware/               # Express middleware
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Error handling middleware
│   └── validation.js        # Input validation middleware
│
├── routes/                   # API route definitions
│   ├── authRoutes.js        # Authentication routes
│   ├── creditRoutes.js      # Credit score routes
│   ├── loanRoutes.js        # Loan application routes
│   ├── alertRoutes.js       # Credit alerts routes
│   ├── educationRoutes.js   # Educational content routes
│   └── recommendationRoutes.js # Recommendation routes
│
├── controllers/              # Route controllers (handle HTTP requests)
│   ├── authController.js    # Authentication logic
│   ├── creditController.js  # Credit score logic
│   ├── loanController.js    # Loan application logic
│   ├── alertController.js   # Credit alerts logic
│   ├── educationController.js # Educational content logic
│   └── recommendationController.js # Recommendation logic
│
├── services/                 # Business logic services
│   ├── userService.js       # User profile management
│   ├── creditService.js     # Credit score operations
│   ├── loanService.js       # Loan application operations
│   ├── alertService.js      # Alert management
│   ├── educationService.js  # Educational content
│   ├── recommendationService.js # Recommendation engine
│   └── creditSimulator.js   # Credit score simulation
│
└── supabase/                 # Database related files
    └── migrations/           # Database migration files
        ├── 20250723130228_soft_rice.sql      # User profiles table
        ├── 20250723130234_white_recipe.sql   # Credit scores table
        ├── 20250723130241_wild_harbor.sql    # Loan applications table
        ├── 20250723130248_emerald_glitter.sql # Credit alerts table
        ├── 20250723130256_lingering_glade.sql # Educational tips table
        └── 20250723130311_bronze_dew.sql     # Recommendations table
```

## Architecture Overview

### 1. **Entry Point** (`server.js`)
- Main Express server setup
- Middleware configuration
- Route mounting
- Error handling setup

### 2. **Configuration** (`config/`)
- Supabase client setup
- Database connection configuration
- Environment-specific settings

### 3. **Middleware** (`middleware/`)
- **auth.js**: JWT token validation, user authentication
- **errorHandler.js**: Centralized error handling and logging
- **validation.js**: Input validation using express-validator

### 4. **Routes** (`routes/`)
- Define API endpoints
- Apply middleware (auth, validation)
- Route to appropriate controllers

### 5. **Controllers** (`controllers/`)
- Handle HTTP requests and responses
- Input validation and sanitization
- Call appropriate services
- Format responses

### 6. **Services** (`services/`)
- Business logic implementation
- Database operations
- Data processing and calculations
- External API integrations

### 7. **Database** (`supabase/migrations/`)
- SQL migration files
- Table creation and modifications
- Row Level Security (RLS) policies
- Indexes and constraints

## Data Flow

```
Client Request → Routes → Middleware → Controllers → Services → Database
                    ↓
Client Response ← Controllers ← Services ← Database Response
```

## Key Features by Module

### Authentication (`auth*`)
- User registration and login
- JWT token management
- Password reset functionality
- Session management

### Credit Management (`credit*`)
- Credit score tracking
- Historical data management
- Credit factor analysis
- Score trend calculations

### Loan Applications (`loan*`)
- Application creation and management
- Status tracking
- Bank integration ready
- Application history

### Alerts System (`alert*`)
- Real-time notifications
- Alert categorization
- Read/unread status
- Bulk operations

### Education (`education*`)
- Educational content delivery
- Category-based filtering
- Difficulty levels
- Progress tracking ready

### Recommendations (`recommendation*`)
- Personalized suggestions
- Credit improvement plans
- Action tracking
- Impact scoring

## Environment Setup

1. **Clone/Create the project structure** as shown above
2. **Install dependencies**: `npm install`
3. **Set up environment**: Copy `.env.example` to `.env` and add your Supabase credentials
4. **Run migrations**: Execute the SQL files in your Supabase dashboard
5. **Start server**: `npm run dev` for development or `npm start` for production

## API Endpoints Overview

- **Auth**: `/api/auth/*` - Authentication endpoints
- **Credit**: `/api/credit/*` - Credit score management
- **Loans**: `/api/loans/*` - Loan applications
- **Alerts**: `/api/alerts/*` - Credit alerts
- **Education**: `/api/education/*` - Educational content
- **Recommendations**: `/api/recommendations/*` - Improvement suggestions

This structure provides clear separation of concerns, making the codebase maintainable and scalable.