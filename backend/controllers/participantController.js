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

// Helper to map backend scores to frontend room objects
const mapRoomsForFrontend = (data) => {
    const roomDefs = [
        { id: 'room1', name: 'Law Foundry', description: 'Learn about smart contracts and blockchain law', maxProgress: 100, points: 100, tier: 'Architect' },
        { id: 'room2', name: 'Treasury Mint', description: 'Master DeFi and tokenomics', maxProgress: 100, points: 100, tier: 'Builder' },
        { id: 'room3', name: 'Identity Bureau', description: 'Explore decentralized identity solutions', maxProgress: 100, points: 100, tier: 'Architect' },
        { id: 'room4', name: 'Council Chamber', description: 'Understand DAO governance', maxProgress: 100, points: 100, tier: 'Builder' },
        { id: 'room5', name: 'Control Center', description: 'Build Web3 applications', maxProgress: 100, points: 100, tier: null }
    ];

    let foundInProgress = false;

    return roomDefs.map(def => {
        const earnedPoints = Number(data[def.id] || 0);
        const completed = earnedPoints > 0;
        let inProgress = false;

        // Make the very first uncompleted room "inProgress"
        if (!completed && !foundInProgress) {
            inProgress = true;
            foundInProgress = true;
        }

        return {
            name: def.name,
            description: def.description,
            completed,
            inProgress,
            progress: completed ? def.maxProgress : (inProgress ? 0 : 0),
            points: def.points,
            maxProgress: def.maxProgress,
            tier: def.tier,
            earnedPoints
        };
    });
};

// Helper to determine tier
const calculateTier = (totalScore) => {
    if (totalScore >= 120) return 'Architect';
    if (totalScore >= 60) return 'Builder';
    return 'Explorer';
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

        // Optional logic: assign badges based on score or specific rooms
        const badges = [];
        if (totalScore >= 100) badges.push({ name: 'Quick Learner', icon: 'zap' });
        if (rawData.room1 && rawData.room2) badges.push({ name: 'Team Player', icon: 'handshake' });

        res.json({
            id: doc.id,
            citizenId: doc.id,
            ...rawData,
            totalScore,
            currentTier,
            currentRoom: rooms.find(r => r.inProgress)?.name || 'None',
            rooms,
            badges
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

// @desc    Participant completes a room — increment room score by 10
// @route   PUT /api/participants/:uce/complete-room
const completeRoom = async (req, res, next) => {
    try {
        const uce = req.params.uce.toUpperCase();
        const { roomId } = req.body; // e.g. 'room1', 'room2', ...

        if (!roomId || !['room1', 'room2', 'room3', 'room4', 'room5'].includes(roomId)) {
            return res.status(400).json({ message: 'Invalid roomId' });
        }

        const docRef = participantsCollection.doc(uce);
        const doc = await docRef.get();
        if (!doc.exists) return res.status(404).json({ message: 'Participant not found' });

        const rawData = doc.data();

        // Prevent double-completion: only add if room score is currently 0
        if (Number(rawData[roomId] || 0) > 0) {
            return res.status(400).json({ message: 'Room already completed' });
        }

        const updatedRoomScore = 10;
        const updated = { ...rawData, [roomId]: updatedRoomScore };
        const totalScore = calcTotal(updated);

        await docRef.update({ [roomId]: updatedRoomScore, totalScore });
        res.json({ message: 'Room completed', uce, roomId, roomScore: updatedRoomScore, totalScore });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getParticipants,
    getParticipantByUce,
    updateBonusScore,
    updateFinalProjectScore,
    completeRoom
};