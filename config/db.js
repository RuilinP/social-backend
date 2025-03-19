const { Sequelize } = require('sequelize');
require('dotenv').config();

// Ensure all required environment variables are set
const {
    DB_DATABASE = "social",
    DB_USERNAME = "ruilin",
    DB_PASSWORD = "alarm",
    DB_HOST = "34.234.162.51",
    DB_DIALECT = "mysql"
} = process.env;

// Log missing variables for debugging (optional)
if (!DB_DATABASE || !DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
    console.warn("⚠️ Missing database environment variables!");
}

// Database connection setup
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false, // Turn off SQL logs in production
});

// Test connection
sequelize.authenticate()
    .then(() => console.log('✅ Database connected!'))
    .catch(err => console.error('❌ Database connection failed:', err));

module.exports = sequelize;
