# ShrinkIt Pro

ShrinkIt Pro is a high-performance URL shortening service and analytics platform.

## Features
- **Shorten URLs:** Convert long URLs into short, shareable links (Base62 encoded).
- **Custom Slugs:** Choose your own keywords.
- **Analytics:** Track clicks, countries, browsers, and referrers.
- **QR Codes:** Auto-generated QR codes for links.

## Tech Stack
- **Backend:** FastAPI (Python)
- **Frontend:** React.js + Tailwind CSS
- **Database:** SQLite (Dev) / PostgreSQL (Prod)

## Setup

### Backend (Server)
1. Navigate to `server/`:
   ```bash
   cd server
   ```
2. Create and activate virtual environment:
   ```bash
   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend (Client)
1. Navigate to `client/`:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Git Workflow
- `main`: Stable production code.
- `development`: Staging area for new features.
- Feature branches: `feat/feature-name` (merge into `development`).
