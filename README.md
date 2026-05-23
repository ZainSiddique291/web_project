# SkillBridge — Full Stack Web App

React + Node.js + MongoDB platform connecting local service professionals with customers.

## Prerequisites

- Node.js 18+
- MongoDB running locally (`mongodb://localhost:27017`) or update `backend/.env`

## Quick Start

### 1. Backend

```bash
cd web-project/backend
npm install
npm run dev
```

Server runs at `http://localhost:5000`

### 2. Frontend

```bash
cd web-project/frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Demo Accounts

Created automatically when the backend starts (MongoDB seed).

### Admin
| Email | Password | After login |
|-------|----------|-------------|
| admin@skillbridge.pk | admin123 | Goes to `/admin` |

### Customer
| Email | Password | After login |
|-------|----------|-------------|
| demo@skillbridge.pk | demo123 | Home + Settings |

### Workers (all use password `worker123`)

| Name | Profession | Email |
|------|------------|-------|
| Ahmed Raza | Electrician | ahmed.raza@skillbridge.pk |
| Ali Hassan | Plumber | ali.hassan@skillbridge.pk |
| Sara Khan | Tutor | sara.khan@skillbridge.pk |
| Usman Malik | Technician | usman.malik@skillbridge.pk |
| Fatima Noor | Painter | fatima.noor@skillbridge.pk |
| Bilal Ahmed | Carpenter | bilal.ahmed@skillbridge.pk |
| Ayesha Tariq | Cleaner | ayesha.tariq@skillbridge.pk |
| Hassan Sheikh | Electrician | hassan.sheikh@skillbridge.pk |
| Zainab Ali | Tutor | zainab.ali@skillbridge.pk |
| Imran Butt | Plumber | imran.butt@skillbridge.pk |
| Nadia Rashid | IT Technician | nadia.rashid@skillbridge.pk |
| Kamran Siddiqui | Painter | kamran.siddiqui@skillbridge.pk |

Workers can open their public profile from the welcome button or Settings.

Register at `/register` to create a **new customer** account (any email not listed above).

## Features

- **Home** — Live platform stats from MongoDB
- **Services** — Search, filter by category/rating/location, grid/list view
- **Worker profiles** — Full profiles with earnings charts
- **About** — Dynamic stats, mission, values
- **Contact** — Form saved to MongoDB
- **Auth** — Register, login, JWT sessions
- **Settings** — Update profile (logged-in users)
- **Admin** — Dashboard, users, bookings, messages, site settings

## API Endpoints

- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/workers` — List workers (query: search, location, category, minRating)
- `GET /api/workers/:id` — Worker profile
- `POST /api/contact` — Submit contact form
- `GET /api/stats` — Platform statistics
- `GET /api/admin/*` — Admin routes (requires admin JWT)
