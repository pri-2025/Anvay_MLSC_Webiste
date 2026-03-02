const admin = require('firebase-admin');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = await admin.auth().verifyIdToken(token);
            req.admin = decoded; // contains uid, email, role (custom claim)

            // Only allow mentors and admins
            if (decoded.role !== 'mentor' && decoded.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized, insufficient role' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };