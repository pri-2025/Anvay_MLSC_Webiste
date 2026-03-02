const { auth } = require('../config/firebaseAdmin'); // your firebase admin instance

// @desc    Create a single mentor
// @route   POST /api/mentors
const createMentor = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await auth.createUser({ email, password });
        await auth.setCustomUserClaims(user.uid, { role: 'mentor' });

        res.status(201).json({ message: `Mentor created: ${email}`, uid: user.uid });
    } catch (error) {
        next(error);
    }
};

// @desc    Create multiple mentors in bulk
// @route   POST /api/mentors/bulk
const createMentorsBulk = async (req, res, next) => {
    try {
        const { mentors } = req.body; // array of { email, password }

        if (!Array.isArray(mentors) || mentors.length === 0) {
            return res.status(400).json({ message: 'Provide a non-empty mentors array' });
        }

        const results = [];

        for (const mentor of mentors) {
            try {
                const user = await auth.createUser({
                    email: mentor.email,
                    password: mentor.password,
                });
                await auth.setCustomUserClaims(user.uid, { role: 'mentor' });
                results.push({ email: mentor.email, status: 'created', uid: user.uid });
            } catch (error) {
                results.push({ email: mentor.email, status: 'failed', reason: error.message });
            }
        }

        res.status(201).json({ results });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all mentors (lists Firebase Auth users with mentor role)
// @route   GET /api/mentors
const getMentors = async (req, res, next) => {
    try {
        const listResult = await auth.listUsers();
        const mentors = listResult.users
            .filter(user => user.customClaims?.role === 'mentor')
            .map(user => ({ uid: user.uid, email: user.email }));

        res.json(mentors);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a mentor by UID
// @route   DELETE /api/mentors/:uid
const deleteMentor = async (req, res, next) => {
    try {
        await auth.deleteUser(req.params.uid);
        res.json({ message: `Mentor ${req.params.uid} deleted successfully` });
    } catch (error) {
        next(error);
    }
};

module.exports = { createMentor, createMentorsBulk, getMentors, deleteMentor };