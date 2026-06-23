const express = require('express');
const router = express.Router();
const {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
  getProgressStats,
} = require('../controllers/progressController');

// GET  /api/progress/stats/summary  → Summary stats (must be BEFORE /:id)
router.get('/stats/summary', getProgressStats);

// GET    /api/progress         → Get all progress entries
// POST   /api/progress         → Log new progress entry
router.route('/').get(getAllProgress).post(createProgress);

// GET    /api/progress/:id     → Get single entry
// PUT    /api/progress/:id     → Update entry
// DELETE /api/progress/:id     → Delete entry
router.route('/:id').get(getProgressById).put(updateProgress).delete(deleteProgress);

module.exports = router;
