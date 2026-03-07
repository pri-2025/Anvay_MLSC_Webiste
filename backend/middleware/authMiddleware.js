const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_anvaya2025');

            // Find admin associated with token
            const adminUser = await Admin.findById(decoded.id).select('-password');
            if (!adminUser) {
                return res.status(401).json({ message: 'Not authorized, admin not found' });
            }

            req.admin = adminUser; // Attach admin to request
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };