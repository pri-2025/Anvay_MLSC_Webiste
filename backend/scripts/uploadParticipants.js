const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const results = [];

fs.createReadStream("../participants.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    console.log("Uploading participants...");

    for (const row of results) {

      const name = row["Enter your Full Name (First Name – Middle Name – Last Name)"]?.trim();

      let uce = row["Enter your USN / Roll number"]?.trim();

      if (!name || !uce) {
        console.log("Skipping row due to missing data");
        continue;
      }

      // 🔥 Convert UCE to ALL CAPS (important)
      uce = uce.toUpperCase();

      await db.collection("participants").doc(uce).set({
    name: name,
    uce: uce,
    room1: 0,
    room2: 0,
    room3: 0,
    room4: 0,
    room5: 0,
    bonusScore: 0,
    finalProjectScore: 0,
    totalScore: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
});

      console.log(`Uploaded: ${uce}`);
    }

    console.log("All participants uploaded successfully!");
    process.exit();
  });