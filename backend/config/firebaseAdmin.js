const admin = require("firebase-admin");

// Prevent duplicate app initialization (Vercel reuses function instances)
if (!admin.apps.length) {
  let credential;

  if (process.env.GOOGLE_CREDENTIALS_BASE64) {
    // Production (Vercel) — decode base64 JSON string
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, "base64").toString("utf8")
    );
    credential = admin.credential.cert(serviceAccount);
  } else {
    // Local dev — use the JSON file directly
    const serviceAccount = require("./serviceAccountKey.json");
    credential = admin.credential.cert(serviceAccount);
  }

  admin.initializeApp({ credential });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };