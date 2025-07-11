# EchoMe Backend

A simple Node.js backend for the EchoMe application.

## Project Structure

```
BackEnd/
├── config/          # Configuration files
│   ├── database.js  # Database connection setup
│   └── initDb.js    # Database initialization
├── controllers/     # Request handlers
├── middleware/      # Custom middleware functions
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic layer
│   └── authService.js # Authentication service
└── index.js        # Main server file
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with these variables:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=echome
   DB_USER=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Available Routes

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login to your account

## Development

- The server runs on port 3000 by default
- Database queries are logged in development mode
- Error handling is centralized in `middleware/errorHandler.js`
- Database configuration is managed in `config/database.js`
- Database initialization is handled in `config/initDb.js`
- Business logic is separated into services in the `services/` directory

## Architecture

The application follows a layered architecture:

1. **Controllers** (`/controllers`): Handle HTTP requests and responses
2. **Services** (`/services`): Contain business logic
3. **Models** (`/models`): Define database schema and relationships
4. **Routes** (`/routes`): Define API endpoints
5. **Middleware** (`/middleware`): Handle cross-cutting concerns
6. **Config** (`/config`): Manage application configuration
