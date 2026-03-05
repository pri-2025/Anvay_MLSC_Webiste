const admin = require("firebase-admin");

let db, auth;

try {
  let credential;

  if (process.env.FIREBASE_PRIVATE_KEY) {
    // Production (Vercel) — use env vars
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
    console.log("[Firebase] Using env var credentials. Project:", process.env.FIREBASE_PROJECT_ID);
    console.log("[Firebase] Client email:", process.env.FIREBASE_CLIENT_EMAIL);
    console.log("[Firebase] Private key starts with:", privateKey.substring(0, 30));

    credential = admin.credential.cert({
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: privateKey,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
    });
  } else {
    // Local dev — use the JSON file
    console.log("[Firebase] Using serviceAccountKey.json for local dev");
    const serviceAccount = require("./serviceAccountKey.json");
    credential = admin.credential.cert(serviceAccount);
  }

  // Prevent duplicate app initialization
  if (!admin.apps.length) {
    admin.initializeApp({ credential });
  }

  db = admin.firestore();
  auth = admin.auth();
  console.log("[Firebase] Initialized successfully");

} catch (err) {
  console.error("[Firebase] INITIALIZATION FAILED:", err.message);
  console.error(err.stack);
  // Re-throw so Vercel logs show the full error
  throw err;
}

module.exports = { admin, db, auth };