const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');
const sequelize = require('./config/db');
const { User, Post } = require('./models');
const cors = require("cors");
const path = require("path");

const app = express();
console.log("CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN);

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "http://local.social-media-app.com",
        credentials: true,
    })
);
console.log("CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN);

const PORT = process.env.PORT || 5000;
console.log("CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN);

app.use(express.json());  // Middleware to parse JSON
app.use(session({
    secret: process.env.JWT_SECRET || "secret",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/posts', require('./routes/postRoutes'));
app.use('/comments', require('./routes/commentRoutes'));

app.get('/', (req, res) => {
    res.send("Welcome to Social Backend - Google OAuth Setup");
});


sequelize.sync({ force: false })  // Set force: true ONLY if you want to reset DB
    .then(() => console.log("✅ Database synced!"))
    .catch(err => console.error("❌ Database sync error:", err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on:${PORT}`);
});
