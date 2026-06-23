const express = require('express');
const router = express.Router();
const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats,
} = require('../controllers/workoutsController');

// GET  /api/workouts/stats/summary  → Aggregate stats (must be BEFORE /:id)
router.get('/stats/summary', getWorkoutStats);

// GET    /api/workouts         → Get all workouts
// POST   /api/workouts         → Create new workout
router.route('/').get(getAllWorkouts).post(createWorkout);

// GET    /api/workouts/:id     → Get single workout
// PUT    /api/workouts/:id     → Update workout
// DELETE /api/workouts/:id     → Delete workout
router.route('/:id').get(getWorkoutById).put(updateWorkout).delete(deleteWorkout);

module.exports = router;
