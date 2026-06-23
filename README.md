# 🏋️ FitForge — Backend API Engine

> **Task 2 | DecodeLabs Full Stack Development Internship 2026**

The backend infrastructure for **FitForge**, engineered explicitly for **Task 02: Backend API Development** of the DecodeLabs Full Stack Development Internship.

This system moves FitForge from localized client-only state storage to a resilient, stateless **RESTful API** powered by **Node.js, Express**, and native local file persistence (`notes.json`). It strictly respects the structural architecture guideline: *"Resources are Nouns. Methods are Verbs."*

---

## 📌 Project Architecture Blueprint

To run the unified stack seamlessly within VS Code, organize your workspace directory as follows:

```
fitforge-workspace/
├── backend/
│   ├── controllers/
│   │   ├── exercisesController.js   # Exercise CRUD logic
│   │   ├── workoutsController.js    # Workout CRUD logic
│   │   └── progressController.js   # Progress CRUD logic
│   ├── routes/
│   │   ├── exercises.js             # REST routes for exercises
│   │   ├── workouts.js              # REST routes for workouts
│   │   └── progress.js             # REST routes for progress
│   ├── public/
│   │   └── index.html              # Semantic layout landmarks
│   ├── .env                        # Backend environment config
│   ├── package.json                # Backend dependency configuration
│   └── server.js                  # Core Express API router and validation engine
```

---

## 🔧 Installation & Execution Setup

### 1. Initialize Runtime Environment

Open your integrated VS Code terminal (`Ctrl + `` `), navigate into your backend directory, and install the verified lightweight ecosystem modules:

```bash
cd fitforge-p4
npm install
```

### 2. Launch the Engine

Boot up the stateless server listener:

```bash
npm run dev    # Development (auto-restart with nodemon)
npm start      # Production
```

Upon a successful boot sequence, your terminal will confirm:

```
================================================
FitForge API Engine Online: Running on Port 5000
Base Endpoint Domain URL: http://localhost:5000
================================================
```

### 3. Open the App

```
http://localhost:5000
```

---

## 📡 RESTful API Contract Documentation

The FitForge backend relies on explicit semantic HTTP methods, clean resource mappings, and accurate status codes.

### Health Check
| HTTP | Resource Target | Success |
|------|----------------|---------|
| GET | `/api/health` | `200 OK` — server + DB status |

### Exercises Resource
| HTTP | Resource Target | Success |
|------|----------------|---------|
| GET | `/api/exercises` | `200 OK` — all exercises |
| GET | `/api/exercises?category=Chest` | `200 OK` — filtered list |
| GET | `/api/exercises/:id` | `200 OK` — single document |
| POST | `/api/exercises` | `201 Created` — new exercise |
| PUT | `/api/exercises/:id` | `200 OK` — updated document |
| DELETE | `/api/exercises/:id` | `200 OK` — deletion confirmed |

### Workouts Resource
| HTTP | Resource Target | Success |
|------|----------------|---------|
| GET | `/api/workouts` | `200 OK` — all workouts |
| GET | `/api/workouts?status=completed` | `200 OK` — filtered list |
| GET | `/api/workouts/:id` | `200 OK` — single workout |
| GET | `/api/workouts/stats/summary` | `200 OK` — aggregated stats |
| POST | `/api/workouts` | `201 Created` — new workout |
| PUT | `/api/workouts/:id` | `200 OK` — updated workout |
| DELETE | `/api/workouts/:id` | `200 OK` — deletion confirmed |

### Progress Resource
| HTTP | Resource Target | Success |
|------|----------------|---------|
| GET | `/api/progress` | `200 OK` — all entries |
| GET | `/api/progress?limit=7` | `200 OK` — last N entries |
| GET | `/api/progress/:id` | `200 OK` — single entry |
| GET | `/api/progress/stats/summary` | `200 OK` — latest weight + history |
| POST | `/api/progress` | `201 Created` — new entry |
| PUT | `/api/progress/:id` | `200 OK` — updated entry |
| DELETE | `/api/progress/:id` | `200 OK` — deletion confirmed |

---

## 🧪 Testing with Postman

### Create an Exercise
```
POST http://localhost:5000/api/exercises
Content-Type: application/json

{
  "name": "Bench Press",
  "category": "Chest",
  "muscleGroup": "Pectorals",
  "difficulty": "Intermediate",
  "equipment": "Barbell",
  "defaultSets": 4,
  "defaultReps": 8,
  "instructions": "Lie flat, grip bar shoulder-width, lower to chest, press up."
}
```

### Log a Workout
```
POST http://localhost:5000/api/workouts
Content-Type: application/json

{
  "title": "Push Day A",
  "date": "2025-06-19",
  "duration": 75,
  "status": "completed",
  "rating": 4,
  "exercises": [
    { "exerciseName": "Bench Press", "sets": 4, "reps": 8, "weight": 80 }
  ],
  "notes": "Felt strong today"
}
```

---

> This project strictly adheres to the **"No Frameworks"** mandate for the frontend and uses **MVC Architecture** for the backend.

---

*Developed for the 2026 Full Stack Summer Internship | Backend API Development Milestone Completed ✅*
