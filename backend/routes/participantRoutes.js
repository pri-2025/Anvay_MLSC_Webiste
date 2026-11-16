const express = require('express');
const router = express.Router();
const {
    getParticipants,
    getParticipantByUce,
    updateScore,
    updateBonusScore,
    updateFinalProjectScore,
    completeRoom
} = require('../controllers/participantController');

router.get('/', getParticipants);
router.get('/:uce', getParticipantByUce);
router.put('/:uce/score', updateScore);
router.put('/:uce/bonus', updateBonusScore);
router.put('/:uce/finalproject', updateFinalProjectScore);
router.put('/:uce/complete-room', completeRoom);

module.exports = router;
