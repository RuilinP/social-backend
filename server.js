const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for sessions
app.use(session({
    secret: process.env.JWT_SECRET || "secret",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.send("Welcome to Social Backend - Google OAuth Setup");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
