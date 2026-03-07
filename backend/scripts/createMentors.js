const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ayushirahane2021_db_user:cH3CUSjsn3swThMu@cluster0.rspwx9g.mongodb.net/?appName=Cluster0";

const mentors = [
  { email: "mentorR1Sahisha@blockcity.com", password: "Sah!R1#92XqL" },
  { email: "mentorR1Shriya@blockcity.com", password: "ShR1@7Lm#Qx2" },
  { email: "mentorR1Sofiya@blockcity.com", password: "SoF1#8Xp@Lr5" },
  { email: "mentorR2Aditi@blockcity.com", password: "Ad!R2#84KmZx" },
  { email: "mentorR2Srushti@blockcity.com", password: "SrU2@9Lp#Xt6" },
  { email: "mentorR2Mitwa@blockcity.com", password: "MiT2#7Qx@Lr8" },
  { email: "mentorR3Sanjana@blockcity.com", password: "SaN3@8Xq#Lp4" },
  { email: "mentorR3Prisha@blockcity.com", password: "PrI3#6Lm@Xq9" },
  { email: "mentorR3Disha@blockcity.com", password: "DiS3@9Xp#Kr5" },
  { email: "mentorR4Riya@blockcity.com", password: "RiY4#7Lm@Xp2" },
  { email: "mentorR4Tanmayi@blockcity.com", password: "TaN4@8Qx#Lp6" },
  { email: "mentorR4Aishwari@blockcity.com", password: "AiS4#9Lm@Xr3" },
  { email: "mentorR5Dynaneshwari@blockcity.com", password: "DyN5@7Xp#Lq4" },
  { email: "mentorR5Ayushi@blockcity.com", password: "AyU5#8Lm@Xq2" },
  { email: "mentorR5Sakshi@blockcity.com", password: "SaK5@9Qx#Lp7" },
  { email: "mentorR0Eesha@blockcity.com", password: "EeS0@7Lm#Xp4" },
  { email: "mentorR0Karishma@blockcity.com", password: "KaR0#9Xp@Lq6" },
  { email: "mentorR0Vaishnavi@blockcity.com", password: "VaI0@8Lm#Xr5" },
];

async function createMentors() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Mentor Importer');

    let createdCount = 0;
    let skipCount = 0;

    for (const mentor of mentors) {
      const exists = await Admin.findOne({ email: mentor.email });
      if (!exists) {
        await Admin.create({
          email: mentor.email,
          password: mentor.password
        });
        console.log(`Created: ${mentor.email}`);
        createdCount++;
      } else {
        console.log(`Skipped existing: ${mentor.email}`);
        skipCount++;
      }
    }

    console.log(`Finished migrating mentors! Created: ${createdCount}, Skipped: ${skipCount}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating mentors:', error);
    process.exit(1);
  }
}

createMentors();