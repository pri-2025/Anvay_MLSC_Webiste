const mongoose = require('mongoose');
const Participant = require('../models/Participant');
require('dotenv').config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ayushirahane2021_db_user:cH3CUSjsn3swThMu@cluster0.rspwx9g.mongodb.net/?appName=Cluster0";

const seedParticipants = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');

        const testParticipants = [
            { citizenId: 'UCE2024001', name: 'Tester One', team: 'Team A' },
            { citizenId: 'UCE2024520', name: 'Ayushi Rahane', team: 'BlockCity' },
            { citizenId: 'BC2025001', name: 'BlockCity User', team: 'Alpha' }
        ];

        for (const p of testParticipants) {
            const exists = await Participant.findOne({ citizenId: p.citizenId });
            if (!exists) {
                await Participant.create(p);
                console.log(`Created test participant: ${p.citizenId}`);
            } else {
                console.log(`Participant ${p.citizenId} already exists`);
            }
        }

        console.log('Seeding completed!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedParticipants();
