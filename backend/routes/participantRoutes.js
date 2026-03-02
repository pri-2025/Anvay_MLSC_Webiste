const express = require('express');
const router = express.Router();
const {
    getParticipants,
    getParticipantByUce,
    updateScore,
    updateParticipant
} = require('../controllers/participantController');

router.get('/', getParticipants);
router.get('/:uce', getParticipantByUce);
router.put('/:uce/score', updateScore);   // for updating room scores
//router.put('/:uce', updateParticipant);   // for general updates

module.exports = router;