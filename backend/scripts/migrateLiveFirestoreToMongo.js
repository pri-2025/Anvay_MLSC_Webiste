const https = require('https');
const mongoose = require('../node_modules/mongoose');
const Participant = require('../models/Participant');

const MONGO_URI = 'mongodb+srv://prishaparikh_db_user:123321@cluster0.rspwx9g.mongodb.net/blockcity?retryWrites=true&w=majority';

async function fetchAllFirestoreDocs(url) {
  let docs = [];
  let nextPageToken = '';
  do {
    const pageUrl = url + (nextPageToken ? '&pageToken=' + nextPageToken : '');
    const data = await new Promise((resolve, reject) => {
      https.get(pageUrl, res => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => resolve(JSON.parse(raw)));
      }).on('error', reject);
    });
    if (data.documents) {
      docs = docs.concat(data.documents);
    }
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
  return docs;
}

function parseFirestoreFields(fields) {
  const result = {};
  for (const [key, valObj] of Object.entries(fields)) {
    if (valObj.stringValue !== undefined) result[key] = valObj.stringValue;
    else if (valObj.integerValue !== undefined) result[key] = parseInt(valObj.integerValue, 10);
    else if (valObj.doubleValue !== undefined) result[key] = parseFloat(valObj.doubleValue);
    else if (valObj.booleanValue !== undefined) result[key] = valObj.booleanValue;
    else if (valObj.timestampValue !== undefined) result[key] = new Date(valObj.timestampValue);
  }
  return result;
}

async function migrate() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    console.log('Fetching participants from Firestore...');
    const firestoreDocs = await fetchAllFirestoreDocs('https://firestore.googleapis.com/v1/projects/block-city-281c6/databases/(default)/documents/participants?pageSize=300');
    console.log('Total participants fetched from Firestore:', firestoreDocs.length);

    let inserted = 0;

    for (const doc of firestoreDocs) {
      const data = parseFirestoreFields(doc.fields);
      const citizenId = (data.uce || doc.name.split('/').pop()).toUpperCase();

      const docData = {
        citizenId: citizenId,
        name: data.name || 'Unknown',
        team: data.email || data.team || '',
        room1: Number(data.room1 || 0),
        room2: Number(data.room2 || 0),
        room3: Number(data.room3 || 0),
        room4: Number(data.room4 || 0),
        room5: Number(data.room5 || 0),
        bonusScore: Number(data.bonusScore || 0),
        finalProjectScore: Number(data.finalProjectScore || 0),
        totalScore: Number(data.totalScore || 0)
      };

      await Participant.findOneAndUpdate(
        { citizenId: docData.citizenId },
        { $set: docData },
        { upsert: true, new: true }
      );
      inserted++;
    }

    console.log(`Successfully synced ${inserted} participants into MongoDB!`);
    const totalCount = await Participant.countDocuments();
    console.log(`Total participants now in MongoDB: ${totalCount}`);
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

migrate();
