# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Backend Dependencies
Open Terminal/PowerShell in the backend folder:
```powershell
cd backend
npm install
```

### Step 2: Start Backend Server
Still in the backend folder:
```powershell
npm start
```
✅ Backend running on http://localhost:5000

### Step 3: Install Frontend Dependencies
Open NEW Terminal in the main project folder:
```powershell
npm install
```

### Step 4: Start Frontend
```powershell
npm run dev
```
✅ Frontend running on http://localhost:5173

### Step 5: Access the App
Open your browser and go to: **http://localhost:5173**

---

## 📱 Responsive Design Tested On:
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (480x800, 375x667, 320x568)

## 👤 Test Account (After Creating)
After creating an account, you can:
1. Create a new snooker match
2. Track score in real-time
3. See responsive UI adapt to your screen size
4. View match history (feature for future)

---

## 🔧 Troubleshooting

### Port Already in Use?
Change port in `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 5000 to 3000
```

### Can't Connect Frontend to Backend?
Check `src/services/authService.ts` - verify API_BASE_URL is:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Database Issues?
Delete `backend/database.db` and restart server. It will recreate automatically.

---

## 📁 Project Structure
```
TEST/
├── src/
│   ├── components/
│   │   ├── Login.tsx (Login page)
│   │   ├── Register.tsx (Registration)
│   │   ├── Auth.css (Auth styling - RESPONSIVE)
│   │   ├── Scoreboard.tsx
│   │   ├── Controls.tsx
│   │   ├── MatchSetup.tsx
│   │   └── ...
│   ├── services/
│   │   └── authService.ts (Backend API calls)
│   ├── App.tsx (Main app with auth flow)
│   └── index.css (Responsive styles)
├── backend/
│   ├── server.js (Express server)
│   ├── database.js (SQLite setup)
│   ├── routes/
│   │   ├── auth.js (Login/Register endpoints)
│   │   └── matches.js (Match storage)
│   └── package.json
└── README_SETUP.md
```

---

## 🎨 Responsive CSS Features
- Mobile-first design approach
- Media queries for: 768px, 480px, 320px breakpoints
- Touch-friendly buttons
- Flexible layouts using flexbox
- Adjusted font sizes for all screen sizes

---

## 🔐 Security Features
- JWT token-based authentication
- Password hashing with bcryptjs
- CORS protection
- Token stored in localStorage
- Logout functionality

---

## ✨ Features Included
✅ Login page with validation
✅ Registration with email & password
✅ User account storage in SQLite database
✅ JWT authentication tokens
✅ Fully responsive design
✅ Scoreboard matching logic
✅ Match tracking

Enjoy your Snooker Scoreboard! 🎱
