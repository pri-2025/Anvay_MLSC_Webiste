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

// Explorer: 0–24, Builder: 25–49, Architect: 50+ (max 75pts)
const calculateTier = (totalScore) => {
    if (totalScore >= 50) return 'Architect';
    if (totalScore >= 25) return 'Builder';
    return 'Explorer';
};

// Maps backend Firestore data → frontend room objects
// All rooms always accessible — no sequential lock
const mapRoomsForFrontend = (data) => {
    const roomDefs = [
        { id: 'room1', name: 'Law Foundry', description: 'Learn about smart contracts and Solidity basics' },
        { id: 'room2', name: 'Treasury Mint', description: 'Master ERC-20 tokens and DeFi fundamentals' },
        { id: 'room3', name: 'Identity Bureau', description: 'Explore NFTs and decentralized identity' },
        { id: 'room4', name: 'Council Chamber', description: 'Understand DAO governance and on-chain voting' },
        { id: 'room5', name: 'Control Center', description: 'Build Web3 frontend applications with Ethers.js' },
    ];

    return roomDefs.map(def => {
        const earnedPoints = Number(data[def.id] || 0);
        const completed = earnedPoints > 0;

        return {
            name: def.name,
            description: def.description,
            completed,
            inProgress: !completed,
            score: earnedPoints,  // actual pts earned (10 base + up to 5 bonus)
            points: 10,            // base pts per room
            maxProgress: 10,
            earnedPoints,
        };
    });
};

// @desc    Get all participants sorted by totalScore
// @route   GET /api/participants
const getParticipants = async (req, res, next) => {
    try {
        const snapshot = await participantsCollection.orderBy('totalScore', 'desc').get();
        const participants = snapshot.docs.map((doc, index) => ({
            rank: index + 1,
            id: doc.id,
            ...doc.data(),
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

        const rawData = doc.data();
        const rooms = mapRoomsForFrontend(rawData);
        const totalScore = calcTotal(rawData);
        const currentTier = calculateTier(totalScore);

        // currentRoom = first incomplete room, or 'All Complete'
        const currentRoom = rooms.find(r => !r.completed)?.name || 'All Complete';

        res.json({
            id: doc.id,
            citizenId: doc.id,
            ...rawData,
            totalScore,
            currentTier,
            currentRoom,
            rooms,
        });
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

// @desc    Participant completes a room — sets room score to 10 pts
// @route   PUT /api/participants/:uce/complete-room
const completeRoom = async (req, res, next) => {
    try {
        const uce = req.params.uce.toUpperCase();
        const { roomId } = req.body;

        if (!roomId || !['room1', 'room2', 'room3', 'room4', 'room5'].includes(roomId)) {
            return res.status(400).json({ message: 'Invalid roomId' });
        }

        const docRef = participantsCollection.doc(uce);
        const doc = await docRef.get();
        if (!doc.exists) return res.status(404).json({ message: 'Participant not found' });

        const rawData = doc.data();

        if (Number(rawData[roomId] || 0) > 0) {
            return res.status(400).json({ message: 'Room already completed' });
        }

        const updated = { ...rawData, [roomId]: 10 };
        const totalScore = calcTotal(updated);

        await docRef.update({ [roomId]: 10, totalScore });
        res.json({ message: 'Room completed', uce, roomId, roomScore: 10, totalScore });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getParticipants,
    getParticipantByUce,
    updateBonusScore,
    updateFinalProjectScore,
    completeRoom,
};