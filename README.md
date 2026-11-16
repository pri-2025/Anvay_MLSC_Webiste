# Anvay: The BlockCity Edition - MLSC Website

Welcome to the official repository for **Anvay: The BlockCity Edition**, the website for MLSC (Microsoft Learn Student Ambassador Chapter). This project is a full-stack web application built to manage participants, mentors, admins, and event-related activities like the BlockCity simulation, points tracking, and live leaderboards.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS (v4), Framer Motion for animations
- **UI Components:** Radix UI primitives, Emotion, MUI Icons, Lucide React
- **Routing:** React Router DOM (v7)
- **Data Visualization:** Recharts
- **State Management & Extras:** React Hook Form, React DnD, Sonner (Toasts), Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Other Tools:** Morgan (logging), CORS, dotenv, CSV Parser

---

## 📁 Project Structure

This project is organized as a monorepo containing both frontend and backend applications.

```text
Anvay_MLSC_Webiste/
├── backend/               # Node.js & Express backend API
│   ├── config/            # Database and CORS configurations
│   ├── controllers/       # Route logic & business logic
│   ├── middleware/        # Custom Express middlewares (auth, error handling)
│   ├── models/            # Mongoose schemas (Admin, Participant, Submission)
│   ├── routes/            # API endpoints definition
│   ├── scripts/           # Migration, seeding & utility scripts
│   ├── utils/             # Helper functions & constants
│   ├── vercel.json        # Serverless backend deployment config
│   └── server.js          # Entry point for backend
├── frontend/              # React frontend application (Vite)
│   ├── public/            # Static assets
│   ├── src/               # React components, pages, context, and styles
│   │   ├── components/    # Admin, Leaderboard, CityMap, Hero, Navbar, etc.
│   │   ├── context/       # AuthContext, ParticipantContext, LeaderboardContext
│   │   ├── pages/         # Home, Admin, Participant Dashboard & Rooms
│   │   ├── services/      # Axios API client (api.js, firebaseApi.js)
│   │   └── routes.jsx     # Frontend routing setup
│   ├── index.html         # Main HTML file
│   ├── vercel.json        # Frontend routing & rewrite config
│   └── package.json       # Frontend dependencies
├── functions/             # Firebase Cloud Functions (if applicable)
├── shared/                # Shared utilities & constants
└── package.json           # Root package.json for monorepo scripts
```

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### 1. Clone the repository
```bash
git clone https://github.com/pri-2025/Anvay_MLSC_Webiste.git
cd Anvay_MLSC_Webiste
```

### 2. Install Dependencies
Install all root, frontend, and backend packages:
```bash
npm run install:all
```
*(Or run `npm install` inside both `frontend` and `backend` directories).*

### 3. Environment Variables

Create `.env` files for both backend and frontend:

**Backend (`backend/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Running the Project Locally

To run both the frontend and backend concurrently from the root directory:
```bash
npm run dev
```

This starts:
- 🌐 **Frontend Dev Server** → `http://localhost:5173`
- ⚙️ **Backend API** → `http://localhost:5000`

### Run Individually:
- Frontend only: `npm run dev:frontend`
- Backend only: `npm run dev:backend`

---

## 🔑 Test Credentials & Gateways

### 1. Participant Gateway
- **Route:** `/participant`
- **Authentication:** Citizen ID / USN only (no password required)
- **Sample IDs to test:**
  - `UEC2025114` (Bhumika Tiwari - Rank #1)
  - `UCE2024604` (Shreya Rakesh Agarwal - Rank #2)
  - `UCE2022416` (Anagha Kumar)

### 2. Admin & Mentor Gateway
- **Route:** `/admin`
- **Super Admin:**
  - **Email:** `admin@blockcity.com`
  - **Password:** `adminPassword123`
- **Mentor Account:**
  - **Email:** `mentorR3Prisha@blockcity.com`
  - **Password:** `PrI3#6Lm@Xq9`

---

## 👥 Key Features & Admin Controls

- **Interactive City Map:** Visual node map representing the 5 BlockCity rooms.
- **Real-Time Leaderboard:** Dynamic ranking tracking scores across rooms, bonus points, and tiers (`Explorer`, `Builder`, `Architect`).
- **Participant Dashboard:** Real-time personal score progress, room status, and tier badges.
- **Admin Score Management:**
  - Search any participant by Citizen ID / USN.
  - **Add (+) & Subtract (-)** points in real-time.
  - Granular control over **Room 1–5 scores, Bonus scores, and Final Project scores**.
  - Automatic tier updates and live recalculation.

---

## ☁️ Deployment (Vercel)

When deploying to Vercel:
1. **Backend Environment Variables:**
   - Add `MONGO_URI` to your backend project's Environment Variables in Vercel Settings.
   - Add `JWT_SECRET`.
2. **Frontend Environment Variables:**
   - Add `VITE_API_URL` pointing to your deployed backend URL (e.g. `https://your-backend.vercel.app/api`).
3. **MongoDB Atlas Network Access:**
   - Ensure IP access is set to `0.0.0.0/0` (Allow access from anywhere) in MongoDB Atlas so Vercel's serverless functions can connect.

---

## 📜 License
ISC
