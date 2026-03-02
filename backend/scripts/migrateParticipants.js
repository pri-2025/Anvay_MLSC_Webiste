const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function migrate() {
    const snapshot = await db.collection("participants").get();

    for (const doc of snapshot.docs) {
        const data = doc.data();
        const updates = {};

        if (data.bonusScore === undefined)          updates.bonusScore = 0;
        if (data.finalProjectScore === undefined)   updates.finalProjectScore = 0;

        // If old hackathonScore exists, migrate it and delete old field
        if (data.hackathonScore !== undefined) {
            updates.finalProjectScore = data.hackathonScore;
            updates.hackathonScore = admin.firestore.FieldValue.delete();
        }

        if (Object.keys(updates).length > 0) {
            await doc.ref.update(updates);
            console.log(`Updated: ${doc.id}`);
        } else {
            console.log(`Skipped (already complete): ${doc.id}`);
        }
    }

    console.log("Migration done!");
    process.exit();
}

migrate();