const mongoose = require('mongoose');

// Sub-schema for each exercise set within a workout
const workoutExerciseSchema = new mongoose.Schema(
  {
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise', // Reference to Exercise collection (1:Many relationship)
    },
    exerciseName: {
      type: String,
      required: [true, 'Exercise name is required in workout'],
      trim: true,
    },
    sets: {
      type: Number,
      required: [true, 'Number of sets is required'],
      min: [1, 'Sets must be at least 1'],
      max: [20, 'Sets cannot exceed 20'],
    },
    reps: {
      type: Number,
      required: [true, 'Number of reps is required'],
      min: [1, 'Reps must be at least 1'],
      max: [200, 'Reps cannot exceed 200'],
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative'],
      default: 0, // 0 = bodyweight
    },
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [200, 'Notes cannot exceed 200 characters'],
    },
  },
  { _id: false } // No separate _id for sub-documents
);

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Workout title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Workout date is required'],
      default: Date.now,
    },
    duration: {
      type: Number, // in minutes
      min: [1, 'Duration must be at least 1 minute'],
      max: [300, 'Duration cannot exceed 300 minutes'],
    },
    exercises: {
      type: [workoutExerciseSchema],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: 'A workout must have at least one exercise',
      },
    },
    totalVolume: {
      type: Number, // sets * reps * weight — computed before save
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    status: {
      type: String,
      enum: ['planned', 'completed', 'skipped'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate total volume before saving
workoutSchema.pre('save', function (next) {
  this.totalVolume = this.exercises.reduce((total, ex) => {
    return total + ex.sets * ex.reps * (ex.weight || 1);
  }, 0);
  next();
});

// Index for faster date-based queries
workoutSchema.index({ date: -1 });

module.exports = mongoose.model('Workout', workoutSchema);
