# Snooker Scoreboard App - Setup Guide

## Features
✅ Responsive design (works on mobile, tablet, desktop)
✅ User authentication (Login & Registration)
✅ User account creation with email verification
✅ Database storage for user accounts
✅ JWT token-based authentication
✅ Match history tracking

## Prerequisites
- Node.js (v16 or higher)
- npm

## Installation & Setup

### 1. Install Frontend Dependencies
```bash
cd c:\Users\dell\Desktop\TEST
npm install
```

### 2. Install Backend Dependencies
```bash
cd c:\Users\dell\Desktop\TEST\backend
npm install
```

### 3. Configure Backend
The backend uses SQLite which doesn't require additional setup. The database file will be created automatically on first run.

Edit `backend/.env` to change the JWT secret for production:
```
JWT_SECRET=change_this_to_a_secure_random_string
```

## Running the Application

### Terminal 1: Start Backend Server
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```
Server will run on: `http://localhost:5000`

### Terminal 2: Start Frontend Development Server
```bash
npm run dev
```
Frontend will run on: `http://localhost:5173`

## How to Use

### 1. Create Account
- Click "Create New Account" on the login page
- Enter your details:
  - Full Name
  - Email Address
  - User ID (username)
  - Password (min 6 characters)
- Click "Create Account"
- You'll be automatically logged in

### 2. Login
- Enter your User ID and Password
- Click "Login"

### 3. Play
- Set up match with player names and number of frames
- Track the match score using the ball buttons
- Record fouls and other events
- View match results

### 4. Responsive Features
- Automatically adjusts for mobile, tablet, and desktop
- Touch-friendly buttons on mobile
- Optimized layouts for all screen sizes

## Database Schema

### Users Table
- `id`: Unique identifier
- `userId`: Username (unique)
- `email`: Email address (unique)
- `fullName`: Full name
- `password`: Hashed password (bcryptjs)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

### Matches Table
- `id`: Match identifier
- `userId`: Reference to user
- `players`: Match player names (JSON)
- `framesToWin`: Number of frames
- `winner`: Match winner name
- `matchData`: Full match data (JSON)
- `createdAt`: Match timestamp

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify token

### Matches
- `POST /api/matches/save` - Save match (requires auth)
- `GET /api/matches/user-matches` - Get user's matches (requires auth)

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Try: `npm install` in the backend folder

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in `backend/server.js`
- Verify API_BASE_URL in `src/services/authService.ts`

### Database issues
- Delete `backend/database.db` and restart the server to reset
- Database will be recreated automatically

## Production Deployment

### Backend (Example: Heroku)
1. Set environment variables:
   - `JWT_SECRET`: Your secure JWT secret
   - `NODE_ENV`: production

2. Deploy using Heroku CLI or Git integration

### Frontend (Example: Vercel/Netlify)
1. Update `API_BASE_URL` in `authService.ts` to your backend URL
2. Build: `npm run build`
3. Deploy the `dist` folder

## Security Notes
- Change JWT_SECRET in production
- Use HTTPS in production
- Implement rate limiting on backend
- Add email verification for registration
- Use environment variables for sensitive data

## Future Enhancements
- Email verification on registration
- Password reset functionality
- Match history and statistics
- Leaderboard/rankings
- Social features (friend matches)
