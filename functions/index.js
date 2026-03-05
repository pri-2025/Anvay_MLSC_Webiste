const functions = require('firebase-functions');
const path = require('path');

// Load .env from the root of the project
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Import the Express app from your existing backend
const app = require('../backend/server');

// Export it as a Firebase HTTPS Function
exports.api = functions
    .region('asia-south1') // Same region as your Firestore
    .https.onRequest(app);
