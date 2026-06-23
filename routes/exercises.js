const express = require('express');
const router = express.Router();
const {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} = require('../controllers/exercisesController');

// GET    /api/exercises         → Get all exercises
// POST   /api/exercises         → Create new exercise
router.route('/').get(getAllExercises).post(createExercise);

// GET    /api/exercises/:id     → Get single exercise
// PUT    /api/exercises/:id     → Update exercise
// DELETE /api/exercises/:id     → Delete exercise
router.route('/:id').get(getExerciseById).put(updateExercise).delete(deleteExercise);

module.exports = router;
