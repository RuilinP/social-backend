const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "662571888584-427qc17hvbdu81gf32ofka0jeu8bq139.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET  || "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",
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
