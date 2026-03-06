import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import fs from "fs";

// Load firebase config from json
const firebaseConfig = JSON.parse(fs.readFileSync('./firebase.json', 'utf8'));

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testParticipants() {
    try {
        console.log("Fetching participants collection...");
        const snapshot = await getDocs(collection(db, "participants"));
        let count = 0;

        console.log(`Found ${snapshot.docs.length} participants.`);

        snapshot.forEach((doc) => {
            if (count < 5) {
                console.log(`ID: ${doc.id}`);
                console.log(`Data:`, doc.data());
                console.log("-------------------");
            }
            count++;
        });

    } catch (error) {
        console.error("Error fetching participants:", error);
    }
}

testParticipants();
