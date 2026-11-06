import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import apiRoutes from './routes/index.js';
import notFoundHandler from './middleware/notFoundMiddleware.js';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();

/* ---------------- Security & Parsing Middlewares ---------------- */

// Set security HTTP response headers
app.use(helmet());

// Enable CORS with configuration for the frontend client URL
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Built-in body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Application API Routes ---------------- */

// Mount all API routes under the /api namespace
app.use('/api', apiRoutes);

/* ---------------- Error & 404 Handling Middlewares ---------------- */

// Catch-all handler for requests to undefined routes (404)
app.use(notFoundHandler);

// Centralized error-handling middleware for caught and uncaught errors
app.use(errorHandler);

export default app;
