const Participant = require('../models/Participant');

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

// Maps backend DB data → frontend room objects
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
        const participants = await Participant.find().sort({ totalScore: -1 }).lean();
        const mapped = participants.map((doc, index) => ({
            rank: index + 1,
            id: doc.citizenId,
            ...doc,
        }));
        res.json(mapped);
    } catch (error) {
        next(error);
    }
};

// @desc    Get participant by UCE
// @route   GET /api/participants/:uce
const getParticipantByUce = async (req, res, next) => {
    try {
        const uce = req.params.uce.toUpperCase();
        const doc = await Participant.findOne({ citizenId: uce }).lean();

        if (!doc) return res.status(404).json({ message: 'Participant not found' });

        const rooms = mapRoomsForFrontend(doc);
        const totalScore = calcTotal(doc);
        const currentTier = calculateTier(totalScore);

        // currentRoom = first incomplete room, or 'All Complete'
        const currentRoom = rooms.find(r => !r.completed)?.name || 'All Complete';

        res.json({
            id: doc.citizenId,
            ...doc,
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

        const doc = await Participant.findOne({ citizenId: uce });
        if (!doc) return res.status(404).json({ message: 'Participant not found' });

        const updatedData = { ...doc.toObject(), bonusScore: Number(bonusScore) };
        const totalScore = calcTotal(updatedData);

        doc.bonusScore = Number(bonusScore);
        doc.totalScore = totalScore;
        await doc.save();

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

        const doc = await Participant.findOne({ citizenId: uce });
        if (!doc) return res.status(404).json({ message: 'Participant not found' });

        const updatedData = { ...doc.toObject(), finalProjectScore: Number(finalProjectScore) };
        const totalScore = calcTotal(updatedData);

        doc.finalProjectScore = Number(finalProjectScore);
        doc.totalScore = totalScore;
        await doc.save();

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

        const doc = await Participant.findOne({ citizenId: uce });
        if (!doc) return res.status(404).json({ message: 'Participant not found' });

        if (Number(doc[roomId] || 0) > 0) {
            return res.status(400).json({ message: 'Room already completed' });
        }

        const updatedData = { ...doc.toObject(), [roomId]: 10 };
        const totalScore = calcTotal(updatedData);

        doc[roomId] = 10;
        doc.totalScore = totalScore;
        await doc.save();

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