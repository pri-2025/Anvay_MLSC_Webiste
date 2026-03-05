const admin = require("firebase-admin");

// On Vercel: credentials come from env vars (no file access)
// Locally: falls back to serviceAccountKey.json if env vars not set
let credential;

if (process.env.FIREBASE_PRIVATE_KEY) {
  // Production (Vercel) — use env vars
  credential = admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
  });
} else {
  // Local dev — use the JSON file
  const serviceAccount = require("./serviceAccountKey.json");
  credential = admin.credential.cert(serviceAccount);
}

// Prevent duplicate app initialization (Vercel reuses function instances)
if (!admin.apps.length) {
  admin.initializeApp({ credential });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };