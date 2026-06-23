const Exercise = require('../models/Exercise');

// ─── GET /api/exercises ───────────────────────────────────────────────────────
// Read all exercises (with optional category filter)
const getAllExercises = async (req, res) => {
  try {
    const filter = { isActive: true };

    // Optional query param: /api/exercises?category=Chest
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Optional query param: /api/exercises?difficulty=Beginner
    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }

    const exercises = await Exercise.find(filter).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exercises',
      error: error.message,
    });
  }
};

// ─── GET /api/exercises/:id ───────────────────────────────────────────────────
// Read a single exercise by ID
const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: `Exercise not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid exercise ID format: ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exercise',
      error: error.message,
    });
  }
};

// ─── POST /api/exercises ──────────────────────────────────────────────────────
// Create a new exercise
const createExercise = async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Exercise created successfully',
      data: exercise,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create exercise',
      error: error.message,
    });
  }
};

// ─── PUT /api/exercises/:id ───────────────────────────────────────────────────
// Update an existing exercise
const updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: `Exercise not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Exercise updated successfully',
      data: exercise,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid exercise ID format: ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update exercise',
      error: error.message,
    });
  }
};

// ─── DELETE /api/exercises/:id ────────────────────────────────────────────────
// Delete an exercise
const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: `Exercise not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Exercise deleted successfully',
      data: {},
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid exercise ID format: ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete exercise',
      error: error.message,
    });
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
};
