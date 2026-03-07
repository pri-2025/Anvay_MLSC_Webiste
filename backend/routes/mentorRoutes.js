const express = require('express');
const router = express.Router();
const {
    createMentor,
    loginMentor,
    createMentorsBulk,
    getMentors,
    deleteMentor
} = require('../controllers/mentorController');

router.get('/', getMentors);
router.post('/', createMentor);
router.post('/login', loginMentor);
router.post('/bulk', createMentorsBulk);
router.delete('/:uid', deleteMentor);

module.exports = router;