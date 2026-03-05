const STATUS = {
    OPEN: 'open',
    COMPLETED: 'completed',
};

const TIERS = {
    EXPLORER: 'Explorer',
    BUILDER: 'Builder',
    ARCHITECT: 'Architect',
};

const TIER_THRESHOLDS = {
    ARCHITECT: 50,  // 50+ pts
    BUILDER: 25,  // 25–49 pts
    EXPLORER: 0,   // 0–24 pts
};

const MAX_SCORE = 75; // 5 rooms × 10 base + 5 rooms × 5 bonus
const BASE_POINTS = 10; // per room on completion
const MAX_BONUS_PTS = 5;  // per room, admin-awarded

module.exports = { STATUS, TIERS, TIER_THRESHOLDS, MAX_SCORE, BASE_POINTS, MAX_BONUS_PTS };