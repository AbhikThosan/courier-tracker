# Courier Tracker - Backend

![Node.js](https://img.shields.io/badge/Node.js-16.x+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x+-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x+-green)

Backend API for Aamira Courier Package Tracking System with real-time updates and alerting.

## Features

- RESTful API endpoints
- Real-time updates via WebSocket
- JWT authentication
- MongoDB data persistence
- Stuck package detection (30+ minutes)
- Comprehensive logging
- TypeScript support

## Tech Stack

- **Runtime**: Node.js 16+
- **Language**: TypeScript 4+
- **Framework**: Express 4
- **Database**: MongoDB 5+
- **Real-time**: Socket.io
- **Authentication**: JWT
- **Logging**: Winston

## Setup Instructions

### Prerequisites

- Node.js 16+
- MongoDB 5+
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AbhikThosan/courier-tracker.git
cd courier-tracker/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
# Linux/Mac
touch .env

# Windows
New-Item -Path .env -ItemType File
```

4. Add environment variables (see Configuration)

## Configuration

Create `.env` file with these variables:

```env
MONGODB_URI=mongodb://localhost:27017/courier-tracker
PORT=5000
JWT_SECRET=your_strong_secret_here
```

## Running the App

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start development server (nodemon) |
| `npm run build` | Compile TypeScript to JavaScript   |
| `npm start`     | Start production server            |

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Packages

| Method | Endpoint            | Description                  | Auth Required |
| ------ | ------------------- | ---------------------------- | ------------- |
| POST   | `/packages/updates` | Submit package status update | Courier       |
| GET    | `/packages`         | List active packages         | Dispatcher    |
| GET    | `/packages/:id`     | Get package details          | Dispatcher    |

#### Alerts

| Method | Endpoint  | Description        | Auth Required |
| ------ | --------- | ------------------ | ------------- |
| GET    | `/alerts` | List active alerts | Dispatcher    |

## Development

### Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── interfaces/      # Type definitions
├── lib/             # Business logic
├── middleware/      # Express middleware
├── models/          # MongoDB models
├── routes/          # Route definitions
├── utils/           # Utility functions
└── app.ts           # Main application
```

## Deployment

1. Build the project:

```bash
npm run build
```

2. Start in production:

```bash
npm start
```

3. Recommended to use PM2 for process management:

```bash
npm install -g pm2
pm2 start dist/app.js --name courier-tracker
```

## Environment Variables

| Variable    | Required | Default | Description               |
| ----------- | -------- | ------- | ------------------------- |
| MONGODB_URI | Yes      | -       | MongoDB connection string |
| PORT        | No       | 5000    | API port                  |
| JWT_SECRET  | Yes      | -       | JWT signing secret        |
