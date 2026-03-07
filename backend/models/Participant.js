const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    citizenId: { type: String, required: true, unique: true }, // e.g. UCE2024001
    name: { type: String, required: true },
    team: { type: String, default: '' },
    role: { type: String, default: 'Citizen' },
    room1: { type: Number, default: 0 },
    room2: { type: Number, default: 0 },
    room3: { type: Number, default: 0 },
    room4: { type: Number, default: 0 },
    room5: { type: Number, default: 0 },
    bonusScore: { type: Number, default: 0 },
    finalProjectScore: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;
