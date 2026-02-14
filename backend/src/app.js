const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// DB connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/faculty', require('./routes/faculty.routes'));
app.use('/api/contributions', require('./routes/contribution.routes'));
app.use('/api/evaluations', require('./routes/evaluation.routes'));
app.use('/api/reports', require('./routes/report.routes'));
app.use('/api/evaluator', require('./routes/evaluator.routes'));
// Global error handler (must be LAST)
app.use(errorMiddleware);

module.exports = app;
