# Modern Weather App

A premium, glassmorphism-styled weather application built with Node.js, React, and OpenMeteo API.

## Features
- **Real-time Weather**: Current temperature, conditions, and wind speed.
- **Geolocation**: Automatically detects your location to show local weather.
- **Global Search**: Search for weather in any city worldwide.
- **Responsive Design**: Beautiful mobile-first UI with glassmorphism effects.
- **Privacy Focused**: No API keys required for frontend (uses OpenMeteo).

## Prerequisites
- Node.js (v14 or higher)
- npm

## Setup & Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   Runs both the backend proxy server and the React frontend.
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment
To build for production:

1. **Build the Frontend**
   ```bash
   npm run build
   ```

2. **Serve**
   You can serve the `dist` folder using any static file server, or extend the Node.js backend to serve the static files from `dist` on the root route `/`.

   *Note: The current backend is configured primarily for API proxying during development. For production, ensure your server serves the `index.html` for any unknown routes.*

## Technologies
- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Styling**: Vanilla CSS (Variables, Flexbox, Glassmorphism)
- **API**: Open-Meteo

## Project Structure
- `/src`: Frontend React code
- `/server`: Node.js Express backend
- `/dist`: Build output (created after build)
