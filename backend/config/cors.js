const cors = require('cors');
require('dotenv').config({ path: '../.env' });
require('dotenv').config({ path: './.env' }); // fallback

// Allow localhost (dev) and any Vercel deployment (prod)
const corsOptions = {
    origin: (origin, callback) => {
        const allowed = [
            process.env.CLIENT_URL,
            'http://localhost:5173',
        ].filter(Boolean);
        // Allow Vercel preview URLs and same-origin requests
        if (!origin || allowed.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
