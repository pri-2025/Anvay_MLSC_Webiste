const express = require('express');
const router = express.Router();
const {
    createMentor,
    createMentorsBulk,
    getMentors,
    deleteMentor
} = require('../controllers/mentorController');

router.get('/', getMentors);
router.post('/', createMentor);
router.post('/bulk', createMentorsBulk);
router.delete('/:uid', deleteMentor);

module.exports = router;