const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_anvaya2025', {
        expiresIn: '30d',
    });
};

// @desc    Create a single mentor
// @route   POST /api/mentors
const createMentor = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Mentor already exists' });
        }

        const admin = await Admin.create({ email, password });
        res.status(201).json({
            message: `Mentor created: ${email}`,
            id: admin._id,
            token: generateToken(admin._id)
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Auth admin / mentor & get token
// @route   POST /api/mentors/login
const loginMentor = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                email: admin.email,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
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
                const existing = await Admin.findOne({ email: mentor.email });
                if (existing) {
                    results.push({ email: mentor.email, status: 'failed', reason: 'Email already exists' });
                    continue;
                }
                const admin = await Admin.create({
                    email: mentor.email,
                    password: mentor.password,
                });
                results.push({ email: mentor.email, status: 'created', id: admin._id });
            } catch (error) {
                results.push({ email: mentor.email, status: 'failed', reason: error.message });
            }
        }

        res.status(201).json({ results });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all mentors
// @route   GET /api/mentors
const getMentors = async (req, res, next) => {
    try {
        const admins = await Admin.find().select('-password').lean();
        const mentors = admins.map(admin => ({ uid: admin._id, email: admin.email }));
        res.json(mentors);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a mentor by ID
// @route   DELETE /api/mentors/:uid
const deleteMentor = async (req, res, next) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.uid);
        if (!admin) return res.status(404).json({ message: 'Mentor not found' });
        res.json({ message: `Mentor ${req.params.uid} deleted successfully` });
    } catch (error) {
        next(error);
    }
};

module.exports = { createMentor, loginMentor, createMentorsBulk, getMentors, deleteMentor };