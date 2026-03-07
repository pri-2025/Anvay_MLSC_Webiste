const Submission = require('../models/Submission');
const Participant = require('../models/Participant');

const calcTotal = (data) =>
    Number(data.room1 || 0) +
    Number(data.room2 || 0) +
    Number(data.room3 || 0) +
    Number(data.room4 || 0) +
    Number(data.room5 || 0) +
    Number(data.bonusScore || 0) +
    Number(data.finalProjectScore || 0);

// @desc    Create a new submission
// @route   POST /api/submissions
const createSubmission = async (req, res, next) => {
    try {
        const { uce, roomId, name, tier, secretCode } = req.body;
        if (!uce || !roomId) {
            return res.status(400).json({ message: 'UCE and roomId are required' });
        }

        const validRooms = ['room1', 'room2', 'room3', 'room4', 'room5'];
        if (!validRooms.includes(roomId)) {
            return res.status(400).json({ message: 'Invalid room id' });
        }

        // Secret code validation
        const ADMIN_SECRET_CODE = 'ANVAYA2025';
        if (secretCode !== ADMIN_SECRET_CODE) {
            return res.status(401).json({ message: 'Invalid secret code. Please ask the admin.' });
        }

        // Check if a pending or approved submission already exists for this UCE + SPECIFIC room
        const existingSub = await Submission.findOne({
            uce: uce.toUpperCase(),
            roomId,
            status: { $in: ['pending', 'approved'] }
        });

        if (existingSub) {
            return res.status(400).json({ message: 'Submission already exists for this specific room.' });
        }

        // Create new submission - Automatically approve if code is correct
        const newSubmission = await Submission.create({
            uce: uce.toUpperCase(),
            roomId,
            name: name || 'Unknown',
            tier: tier || 'Explorer',
            basePoints: 10,
            extraPoints: 0,
            status: 'approved',
            extraHistory: [],
            submittedAt: new Date(),
        });

        // Also update the participant's score immediately
        const pDoc = await Participant.findOne({ citizenId: uce.toUpperCase() });
        if (pDoc) {
            const updatedData = { ...pDoc.toObject(), [roomId]: 10 };
            const newTotalScore = calcTotal(updatedData);

            pDoc[roomId] = 10;
            pDoc.totalScore = newTotalScore;
            await pDoc.save();
        }

        res.status(201).json({ id: newSubmission._id, ...newSubmission.toObject() });
    } catch (error) {
        // Handle unique compound index error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Submission already exists for this specific room.' });
        }
        next(error);
    }
};

// @desc    Get submissions for a specific room (Admin use)
// @route   GET /api/submissions/room/:roomId
const getSubmissionsByRoom = async (req, res, next) => {
    try {
        const { roomId } = req.params;
        const submissions = await Submission.find({ roomId }).sort({ submittedAt: -1 }).lean();

        const mapped = submissions.map(doc => ({
            id: doc._id,
            citizenId: doc.uce,
            ...doc
        }));

        res.json(mapped);
    } catch (error) {
        next(error);
    }
};

// @desc    Update submission status & add extra points
// @route   PUT /api/submissions/:id/status
const updateSubmissionStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, extraPoints, reason } = req.body;

        const doc = await Submission.findById(id);
        if (!doc) return res.status(404).json({ message: 'Submission not found' });

        if (status) doc.status = status;

        // If adding extra points
        if (extraPoints !== undefined) {
            doc.extraPoints = doc.extraPoints + Number(extraPoints);
            doc.extraHistory.unshift({
                points: Number(extraPoints),
                reason: reason || '',
                date: new Date()
            });
        }

        await doc.save();
        const finalExtra = doc.extraPoints;

        // Update the actual participant score in DB for this room
        const totalRoomScore = doc.basePoints + finalExtra;
        const pDoc = await Participant.findOne({ citizenId: doc.uce });
        if (pDoc) {
            const updatedData = { ...pDoc.toObject(), [doc.roomId]: totalRoomScore };
            const newTotalScore = calcTotal(updatedData);

            pDoc[doc.roomId] = totalRoomScore;
            pDoc.totalScore = newTotalScore;
            await pDoc.save();
        }

        res.json({ message: 'Submission updated successfully', id, status: doc.status, extraPoints: doc.extraPoints, extraHistory: doc.extraHistory });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete submission (hard reject)
// @route   DELETE /api/submissions/:id
const deleteSubmission = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await Submission.findByIdAndDelete(id);
        if (!doc) return res.status(404).json({ message: 'Submission not found' });

        res.json({ message: 'Submission permanently deleted' });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove an extra points entry
// @route   DELETE /api/submissions/:id/extra/:index
const removeExtraPoints = async (req, res, next) => {
    try {
        const { id, index } = req.params;
        const doc = await Submission.findById(id);
        if (!doc) return res.status(404).json({ message: 'Submission not found' });

        const history = doc.extraHistory || [];
        const idx = parseInt(index);

        if (isNaN(idx) || idx < 0 || idx >= history.length) {
            return res.status(400).json({ message: 'Invalid history index' });
        }

        const removedEntry = history[idx];
        const newExtraPoints = doc.extraPoints - removedEntry.points;

        doc.extraHistory.splice(idx, 1);
        doc.extraPoints = newExtraPoints;
        await doc.save();

        // Update participant score
        const totalRoomScore = doc.basePoints + newExtraPoints;
        const pDoc = await Participant.findOne({ citizenId: doc.uce });
        if (pDoc) {
            const updatedData = { ...pDoc.toObject(), [doc.roomId]: totalRoomScore };
            const newTotalScore = calcTotal(updatedData);

            pDoc[doc.roomId] = totalRoomScore;
            pDoc.totalScore = newTotalScore;
            await pDoc.save();
        }

        res.json({ message: 'Extra points removed', extraPoints: newExtraPoints });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSubmission,
    getSubmissionsByRoom,
    updateSubmissionStatus,
    deleteSubmission,
    removeExtraPoints
};

