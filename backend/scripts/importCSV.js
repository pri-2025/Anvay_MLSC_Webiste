const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Participant = require('../models/Participant');
require('dotenv').config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ayushirahane2021_db_user:cH3CUSjsn3swThMu@cluster0.rspwx9g.mongodb.net/?appName=Cluster0";

const importCSVData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected for CSV Import');

        const participants = [];

        fs.createReadStream('./participants details.csv')
            .pipe(csv())
            .on('data', (row) => {
                const uce = row['USN Number'] ? row['USN Number'].trim().toUpperCase() : null;
                const name = row['Name'] ? row['Name'].trim() : null;

                if (uce && name && uce !== '') {
                    participants.push({
                        citizenId: uce,
                        name: name,
                        team: row['College Email'] ? row['College Email'].trim() : 'Unknown', // mapped strictly for visibility
                    });
                }
            })
            .on('end', async () => {
                console.log(`CSV file successfully processed. Found ${participants.length} valid rows.`);

                let inserted = 0;
                let ignored = 0;

                for (const p of participants) {
                    const exists = await Participant.findOne({ citizenId: p.citizenId });
                    if (!exists) {
                        await Participant.create(p);
                        inserted++;
                    } else {
                        ignored++;
                    }
                }

                console.log(`Import Summary: Inserted ${inserted} new participants, Ignored ${ignored} existing participants.`);
                process.exit(0);
            });

    } catch (err) {
        console.error('Import Failed:', err);
        process.exit(1);
    }
};

importCSVData();
