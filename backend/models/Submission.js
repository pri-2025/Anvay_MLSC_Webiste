const mongoose = require('mongoose');

const extraHistorySchema = new mongoose.Schema({
    points: { type: Number, required: true },
    reason: { type: String, required: true },
    date: { type: Date, default: Date.now },
}, { _id: false });

const submissionSchema = new mongoose.Schema({
    uce: { type: String, required: true },
    roomId: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    basePoints: { type: Number, default: 0 },
    extraPoints: { type: Number, default: 0 },
    extraHistory: [extraHistorySchema],
    submittedAt: { type: Date, default: Date.now }
});

// Compound index so a user can't have duplicate submissions for the same room
submissionSchema.index({ uce: 1, roomId: 1 }, { unique: true });

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
