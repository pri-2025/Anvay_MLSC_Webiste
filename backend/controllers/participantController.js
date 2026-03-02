const { db } = require('../config/firebaseAdmin');

const participantsCollection = db.collection('participants');

const calcTotal = (data) =>
    Number(data.room1 || 0) +
    Number(data.room2 || 0) +
    Number(data.room3 || 0) +
    Number(data.room4 || 0) +
    Number(data.room5 || 0) +
    Number(data.bonusScore || 0) +
    Number(data.finalProjectScore || 0);

// @desc    Get all participants sorted by totalScore
// @route   GET /api/participants
const getParticipants = async (req, res, next) => {
    try {
        const snapshot = await participantsCollection.orderBy('totalScore', 'desc').get();
        const participants = snapshot.docs.map((doc, index) => ({
            rank: index + 1,
            id: doc.id,
            ...doc.data()
        }));
        res.json(participants);
    } catch (error) {
        next(error);
    }
};

// @desc    Get participant by UCE
// @route   GET /api/participants/:uce
const getParticipantByUce = async (req, res, next) => {
    try {
        const uce = req.params.uce.toUpperCase();
        const doc = await participantsCollection.doc(uce).get();

        if (!doc.exists) return res.status(404).json({ message: 'Participant not found' });

        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        next(error);
    }
};

// @desc    Update room score (triggered by QR scan)
// @route   PUT /api/participants/:uce/score
const updateScore = async (req, res, next) => {
    try {
        const uce = req.params.uce.toUpperCase();
        const { room, score } = req.body;

        const validRooms = ['room1', 'room2', 'room3', 'room4', 'room5'];
        if (!validRooms.includes(room)) {
            return res.status(400).json({ message: 'Invalid room. Must be room1 to room5' });
        }

        const docRef = participantsCollection.doc(uce);
        const doc = await docRef.get();
        if (!doc.exists) return res.status(404).json({ message: 'Participant not found' });

        const updated = { ...doc.data(), [room]: Number(score) };
        const totalScore = calcTotal(updated);

        await docRef.update({ [room]: Number(score), totalScore });
        res.json({ message: 'Room score updated', uce, room, score, totalScore });
    } catch (error) {
        next(error);
    }
};

// @desc    Mentor updates bonus score
// @route   PUT /api/participants/:uce/bonus
const updateBonusScore = async (req, res, next) => {
    try {
        const uce = req.params.uce.toUpperCase();
        const { bonusScore } = req.body;

        const docRef = participantsCollection.doc(uce);
        const doc = await docRef.get();
        if (!doc.exists) return res.status(404).json({ message: 'Participant not found' });

        const updated = { ...doc.data(), bonusScore: Number(bonusScore) };
        const totalScore = calcTotal(updated);

        await docRef.update({ bonusScore: Number(bonusScore), totalScore });
        res.json({ message: 'Bonus score updated', uce, bonusScore, totalScore });
    } catch (error) {
        next(error);
    }
};

// @desc    Admin updates final project score
// @route   PUT /api/participants/:uce/finalproject
const updateFinalProjectScore = async (req, res, next) => {
    try {
        const uce = req.params.uce.toUpperCase();
        const { finalProjectScore } = req.body;

        const docRef = participantsCollection.doc(uce);
        const doc = await docRef.get();
        if (!doc.exists) return res.status(404).json({ message: 'Participant not found' });

        const updated = { ...doc.data(), finalProjectScore: Number(finalProjectScore) };
        const totalScore = calcTotal(updated);

        await docRef.update({ finalProjectScore: Number(finalProjectScore), totalScore });
        res.json({ message: 'Final project score updated', uce, finalProjectScore, totalScore });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getParticipants,
    getParticipantByUce,
    updateScore,
    updateBonusScore,
    updateFinalProjectScore
};