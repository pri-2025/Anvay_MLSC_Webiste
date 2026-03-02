const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
  for (const mentor of mentors) {
    try {
      const user = await admin.auth().createUser({
        email: mentor.email,
        password: mentor.password,
      });

      // Optional: add role claim
      await admin.auth().setCustomUserClaims(user.uid, { role: "mentor" });

      console.log(`Created: ${mentor.email}`);
    } catch (error) {
      console.log(`Error creating ${mentor.email}:`, error.message);
    }
  }
}

createMentors();