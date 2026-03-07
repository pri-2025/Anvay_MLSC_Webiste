const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ayushirahane2021_db_user:cH3CUSjsn3swThMu@cluster0.rspwx9g.mongodb.net/?appName=Cluster0";

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');

        // Check if admin exists
        const exists = await Admin.findOne({ email: 'admin@blockcity.com' });
        if (exists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create default admin
        await Admin.create({
            email: 'admin@blockcity.com',
            password: 'password123' // default password, change later
        });

        console.log('Admin created successfully! Email: admin@blockcity.com, Password: password123');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
