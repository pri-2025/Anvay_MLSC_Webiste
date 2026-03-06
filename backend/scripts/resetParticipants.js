const path = require("path");
const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

// Firebase service account
const serviceAccount = require("../config/serviceAccountKey.json");

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Path to CSV (placed in backend folder)
const csvPath = path.join(__dirname, "../participants.csv");

// -------------------------------
// Delete old participants
// -------------------------------
async function deleteOldParticipants() {
    console.log("Deleting old participants...");

    const snapshot = await db.collection("participants").get();

    let batch = db.batch();
    let count = 0;

    for (const doc of snapshot.docs) {
        batch.delete(doc.ref);
        count++;

        if (count % 500 === 0) {
            await batch.commit();
            batch = db.batch();
        }
    }

    await batch.commit();

    console.log(`Deleted ${snapshot.size} participants`);
}

// -------------------------------
// Upload CSV participants
// -------------------------------
async function uploadCSV() {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(csvPath)
            .pipe(
                csv({
                    mapHeaders: ({ header }) => header.trim(),
                })
            )
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                console.log("Uploading new participants...");

                let batch = db.batch();
                let count = 0;

                for (const row of results) {
                    const name = row["Name"]?.trim();
                    let uce = row["uce"]?.trim();

                    const email = row["College Email"]?.trim();
                    const phone = row["Mobile Number"]?.trim();
                    const branch = row["Branch"]?.trim();
                    const year = row["Year"]?.trim();

                    // Skip invalid rows
                    if (!name || !uce) continue;

                    uce = uce.toUpperCase();

                    const ref = db.collection("participants").doc(uce);

                    batch.set(ref, {
                        name: name,
                        uce: uce,
                        email: email || "",
                        phone: phone || "",
                        branch: branch || "",
                        year: year || "",

                        room1: 0,
                        room2: 0,
                        room3: 0,
                        room4: 0,
                        room5: 0,

                        bonusScore: 0,
                        finalProjectScore: 0,
                        totalScore: 0,

                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    });

                    count++;

                    // Firestore batch limit
                    if (count % 500 === 0) {
                        await batch.commit();
                        batch = db.batch();
                    }

                    console.log(`Prepared: ${uce}`);
                }

                await batch.commit();

                console.log(`Uploaded ${count} participants successfully`);
                resolve();
            })
            .on("error", reject);
    });
}

// -------------------------------
// Run script
// -------------------------------
async function run() {
    try {
        await deleteOldParticipants();
        await uploadCSV();

        console.log("Participant reset complete!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();