const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');

// Google OAuth Login
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    prompt: 'select_account' 
}));


// Google OAuth Callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authController.googleAuthCallback);

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
