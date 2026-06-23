const Progress = require('../models/Progress');

// ─── GET /api/progress ────────────────────────────────────────────────────────
// Read all progress entries (newest first)
const getAllProgress = async (req, res) => {
  try {
    const filter = {};

    // Optional date range filter
    if (req.query.from || req.query.to) {
      filter.date = {};
      if (req.query.from) filter.date.$gte = new Date(req.query.from);
      if (req.query.to)   filter.date.$lte = new Date(req.query.to);
    }

    // Optional limit: /api/progress?limit=7 (last 7 entries)
    const limit = parseInt(req.query.limit) || 0; // 0 = no limit

    const progress = await Progress.find(filter)
      .sort({ date: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress entries',
      error: error.message,
    });
  }
};

// ─── GET /api/progress/:id ────────────────────────────────────────────────────
// Read a single progress entry by ID
const getProgressById = async (req, res) => {
  try {
    const entry = await Progress.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: `Progress entry not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid progress entry ID format: ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress entry',
      error: error.message,
    });
  }
};

// ─── POST /api/progress ───────────────────────────────────────────────────────
// Log a new progress entry
const createProgress = async (req, res) => {
  try {
    const entry = await Progress.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Progress entry logged successfully',
      data: entry,
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
    res.status(500).json({
      success: false,
      message: 'Failed to log progress entry',
      error: error.message,
    });
  }
};

// ─── PUT /api/progress/:id ────────────────────────────────────────────────────
// Update an existing progress entry
const updateProgress = async (req, res) => {
  try {
    const entry = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: `Progress entry not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Progress entry updated successfully',
      data: entry,
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
        message: `Invalid progress entry ID format: ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update progress entry',
      error: error.message,
    });
  }
};

// ─── DELETE /api/progress/:id ─────────────────────────────────────────────────
// Delete a progress entry
const deleteProgress = async (req, res) => {
  try {
    const entry = await Progress.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: `Progress entry not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Progress entry deleted successfully',
      data: {},
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid progress entry ID format: ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete progress entry',
      error: error.message,
    });
  }
};

// ─── GET /api/progress/stats/summary ─────────────────────────────────────────
// Latest weight + total entries count (for dashboard cards)
const getProgressStats = async (req, res) => {
  try {
    const latest = await Progress.findOne({ weight: { $exists: true } })
      .sort({ date: -1 });

    const total = await Progress.countDocuments();

    const weightHistory = await Progress.find({ weight: { $exists: true } })
      .sort({ date: 1 })
      .select('date weight -_id')
      .limit(30);

    res.status(200).json({
      success: true,
      data: {
        totalEntries: total,
        latestWeight: latest ? latest.weight : null,
        latestDate: latest ? latest.date : null,
        weightHistory,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress stats',
      error: error.message,
    });
  }
};

module.exports = {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
  getProgressStats,
};
