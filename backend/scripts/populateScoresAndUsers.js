const mongoose = require('../node_modules/mongoose');
const Participant = require('../models/Participant');
const Admin = require('../models/Admin');
require('dotenv').config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://prishaparikh_db_user:123321@cluster0.rspwx9g.mongodb.net/blockcity?retryWrites=true&w=majority';

// Specific targets from the screenshot:
// 1. Bhumika Tiwari - 68
// 2. Shreya - 65
// 3. Shreeya Unmesh Malu - 64
// 4. Harshada Pradeep Dhas - 63
// 5. Avani Rameshwar Thombre - 63
// 6. Rajvardhini Sachinkumar Nandgude - 59
// 7. Anjali Rathore - 58
// 8. Anushka Chandrakant Shinde - 58

const exactTop = [
  { namePattern: /Bhumika.*Tiwari/i, total: 68 },
  { namePattern: /^Shreya/i, total: 65 },
  { namePattern: /Shreeya.*Malu/i, total: 64 },
  { namePattern: /Harshada.*Dhas/i, total: 63 },
  { namePattern: /Avani.*Thombre/i, total: 63 },
  { namePattern: /Rajvardhini.*Nandgude/i, total: 59 },
  { namePattern: /Anjali.*Rathore/i, total: 58 },
  { namePattern: /Anushka.*Shinde/i, total: 58 }
];

function distributeScore(total) {
  // Rooms 1 to 5 + bonus
  // Max room scores are typically around 10-15 pts each
  // Let's divide roughly across 5 rooms
  let remaining = total;
  const r1 = Math.min(15, Math.floor(remaining * 0.22) + Math.floor(Math.random() * 3));
  remaining -= r1;
  const r2 = Math.min(15, Math.floor(remaining * 0.25) + Math.floor(Math.random() * 3));
  remaining -= r2;
  const r3 = Math.min(15, Math.floor(remaining * 0.30) + Math.floor(Math.random() * 3));
  remaining -= r3;
  const r4 = Math.min(15, Math.floor(remaining * 0.45));
  remaining -= r4;
  const r5 = Math.min(15, Math.floor(remaining * 0.8));
  remaining -= r5;
  const bonus = remaining; // remainder to bonus so total is exact
  return {
    room1: r1,
    room2: r2,
    room3: r3,
    room4: r4,
    room5: r5,
    bonusScore: bonus,
    totalScore: total
  };
}

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Ensure Admin accounts exist
  const adminEmail = 'admin@blockcity.com';
  let admin = await Admin.findOne({ email: adminEmail });
  if (!admin) {
    admin = await Admin.create({
      email: adminEmail,
      password: 'adminPassword123'
    });
    console.log('Admin account created: admin@blockcity.com / adminPassword123');
  } else {
    console.log('Admin account already exists: admin@blockcity.com');
  }

  // Also create a Mentor account if not present
  const mentorEmail = 'mentorR3Prisha@blockcity.com';
  let mentor = await Admin.findOne({ email: mentorEmail });
  if (!mentor) {
    await Admin.create({
      email: mentorEmail,
      password: 'PrI3#6Lm@Xq9'
    });
    console.log('Mentor account created: mentorR3Prisha@blockcity.com / PrI3#6Lm@Xq9');
  }

  const allParticipants = await Participant.find();
  console.log(`Total participants in DB: ${allParticipants.length}`);

  const matchedIds = new Set();

  // 1. Assign exact scores to screenshot participants
  for (const item of exactTop) {
    const p = allParticipants.find(doc => !matchedIds.has(doc._id.toString()) && item.namePattern.test(doc.name));
    if (p) {
      matchedIds.add(p._id.toString());
      const breakdown = distributeScore(item.total);
      await Participant.findByIdAndUpdate(p._id, breakdown);
      console.log(`[Top Rank] Matched: ${p.name} (${p.citizenId}) -> ${item.total} pts`);
    } else {
      console.log(`Warning: Could not match ${item.namePattern}`);
    }
  }

  // 2. Separate remaining participants
  const remaining = allParticipants.filter(p => !matchedIds.has(p._id.toString()));
  // Randomly select 20 participants who did NOT attend (score = 0)
  // Shuffle remaining
  const shuffled = remaining.sort(() => 0.5 - Math.random());
  const absentCount = 20;
  const absentParticipants = shuffled.slice(0, absentCount);
  const attendedParticipants = shuffled.slice(absentCount);

  // Set absent to 0
  for (const p of absentParticipants) {
    await Participant.findByIdAndUpdate(p._id, {
      room1: 0,
      room2: 0,
      room3: 0,
      room4: 0,
      room5: 0,
      bonusScore: 0,
      finalProjectScore: 0,
      totalScore: 0
    });
  }
  console.log(`Set 0 scores for ${absentParticipants.length} absent participants.`);

  // Set random scores for attended participants (ranging from 15 to 56, below rank #8's 58)
  for (const p of attendedParticipants) {
    // Realistic score distribution between 18 and 56
    const randomTotal = Math.floor(Math.random() * (56 - 18 + 1)) + 18;
    const breakdown = distributeScore(randomTotal);
    await Participant.findByIdAndUpdate(p._id, breakdown);
  }
  console.log(`Generated scores for ${attendedParticipants.length} attended participants.`);

  console.log('--- SAMPLE TEST PARTICIPANT ---');
  const sample = await Participant.findOne({ totalScore: { $gt: 50 } });
  console.log(`Citizen ID: ${sample.citizenId}, Name: ${sample.name}, Score: ${sample.totalScore}`);

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
