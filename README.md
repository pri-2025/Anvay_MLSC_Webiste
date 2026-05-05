# Anvaya: The BlockCity Edition - MLSC Website

Welcome to the official repository for **Anvaya: The BlockCity Edition**, the website for MLSC (Microsoft Learn Student Ambassador Chapter). This project is a full-stack web application built to manage participants, admins, and event-related activities like the BlockCity simulation, points tracking, and more.

## 🚀 Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS (v4), Framer Motion for animations
- **UI Components:** Radix UI primitives, Emotion, MUI Icons, Lucide React
- **Routing:** React Router DOM (v7)
- **Data Visualization:** Recharts
- **State Management & Extras:** React Hook Form, React DnD, Sonner (Toasts)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Other Tools:** Morgan (logging), CORS, dotenv, CSV Parser

## 📁 Project Structure

This project is organized as a monorepo containing both the frontend and backend applications.

```text
Anvay_MLSC_Webiste/
├── backend/               # Node.js & Express backend API
│   ├── config/            # Database and environment configurations
│   ├── controllers/       # Route logic & business logic
│   ├── middleware/        # Custom Express middlewares (e.g., auth)
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints definition
│   ├── scripts/           # Utility scripts (e.g., seeding data)
│   ├── utils/             # Helper functions
│   └── server.js          # Entry point for backend
├── frontend/              # React frontend application
│   ├── public/            # Static assets
│   ├── src/               # React components, pages, context, and styles
│   ├── index.html         # Main HTML file
│   └── package.json       # Frontend dependencies
├── functions/             # Firebase Cloud Functions (if applicable)
├── shared/                # Shared utilities/constants between frontend & backend
├── package.json           # Root package.json for monorepo scripts
└── firebase.json          # Firebase configuration (Hosting/Rules)
```

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd Anvay_MLSC_Webiste
```

### 2. Install Dependencies
You can install all dependencies for both the frontend and backend at once using the root script:
```bash
npm run install:all
```
*(Alternatively, you can navigate into `frontend` and `backend` directories and run `npm install` individually).*

### 3. Environment Variables
You will need to set up environment variables for both the frontend and backend.

**Backend (`backend/.env`):**
Create a `.env` file in the `backend` directory and add your MongoDB URI, JWT Secret, and Port (e.g., 5000).
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Frontend (`frontend/.env` - if applicable):**
Create a `.env` file in the `frontend` directory if you have API keys or backend URLs to configure.
```env
VITE_API_URL=http://localhost:5000
```

### 4. Running the Project Locally
To run both the frontend and backend concurrently in development mode, simply run from the root directory:
```bash
npm run dev
```

This will start:
- Backend Server (usually on `http://localhost:5000`)
- Frontend Dev Server (usually on `http://localhost:5173`)

You can also run them individually using:
- `npm run dev:frontend`
- `npm run dev:backend`

## 👥 Features
- **Participant Dashboard:** Real-time tracking of points, activities, and simulation status.
- **Admin Panel:** Management of participants, bonus points allocation, and global event controls.
- **Authentication:** Secure login and registration for participants and admins.

## 📜 License
ISC
