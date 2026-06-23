const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Exercise name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio', 'Full Body'],
        message: '{VALUE} is not a valid category',
      },
    },
    muscleGroup: {
      type: String,
      required: [true, 'Muscle group is required'],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: {
        values: ['Beginner', 'Intermediate', 'Advanced'],
        message: '{VALUE} is not a valid difficulty level',
      },
      default: 'Beginner',
    },
    equipment: {
      type: String,
      enum: {
        values: ['None', 'Dumbbells', 'Barbell', 'Machine', 'Cables', 'Bodyweight', 'Resistance Band', 'Kettlebell'],
        message: '{VALUE} is not valid equipment',
      },
      default: 'Bodyweight',
    },
    defaultSets: {
      type: Number,
      min: [1, 'Sets must be at least 1'],
      max: [20, 'Sets cannot exceed 20'],
      default: 3,
    },
    defaultReps: {
      type: Number,
      min: [1, 'Reps must be at least 1'],
      max: [100, 'Reps cannot exceed 100'],
      default: 10,
    },
    instructions: {
      type: String,
      trim: true,
      maxlength: [1000, 'Instructions cannot exceed 1000 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Index for faster search by name and category
exerciseSchema.index({ name: 1 });
exerciseSchema.index({ category: 1 });

module.exports = mongoose.model('Exercise', exerciseSchema);
