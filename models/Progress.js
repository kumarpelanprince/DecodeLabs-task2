const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    weight: {
      type: Number,
      min: [20, 'Weight seems too low — minimum 20kg'],
      max: [300, 'Weight seems too high — maximum 300kg'],
    },
    bodyFat: {
      type: Number,
      min: [1, 'Body fat % must be at least 1'],
      max: [60, 'Body fat % cannot exceed 60'],
    },
    chest: {
      type: Number,
      min: [0, 'Measurement cannot be negative'],
    },
    waist: {
      type: Number,
      min: [0, 'Measurement cannot be negative'],
    },
    hips: {
      type: Number,
      min: [0, 'Measurement cannot be negative'],
    },
    arms: {
      type: Number,
      min: [0, 'Measurement cannot be negative'],
    },
    thighs: {
      type: Number,
      min: [0, 'Measurement cannot be negative'],
    },
    unit: {
      type: String,
      enum: {
        values: ['metric', 'imperial'],
        message: '{VALUE} is not a valid unit system',
      },
      default: 'metric',
    },
    mood: {
      type: String,
      enum: ['excellent', 'good', 'average', 'poor'],
      default: 'good',
    },
    energyLevel: {
      type: Number,
      min: [1, 'Energy level must be at least 1'],
      max: [10, 'Energy level cannot exceed 10'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for date-based queries (most common for progress tracking)
progressSchema.index({ date: -1 });

module.exports = mongoose.model('Progress', progressSchema);
