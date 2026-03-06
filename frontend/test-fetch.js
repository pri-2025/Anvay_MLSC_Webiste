// test-fetch.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCPIkrViDgnr4NjMNwdGHJqocyMQrEtglU",
    authDomain: "block-city-281c6.firebaseapp.com",
    projectId: "block-city-281c6",
    storageBucket: "block-city-281c6.firebasestorage.app",
    messagingSenderId: "38983594655",
    appId: "1:38983594655:web:6884b38d477f88005728aa",
    measurementId: "G-EF95N782YC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
    console.log("Fetching participants collection...");
    try {
        const snapshot = await getDocs(collection(db, "participants"));
        console.log(`Found ${snapshot.docs.length} participants.`);

        let count = 0;
        snapshot.forEach((doc) => {
            if (count < 5) {
                console.log(`Firebase ID: ${doc.id}`);
                console.log(`Document Data:`, doc.data());
                console.log("-------------------");
            }
            count++;
        });
    } catch (err) {
        console.error(err);
    }
}

run();
