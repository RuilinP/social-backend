const express = require('express');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Root routes
app.get('/', (req, res) => {
    res.send("Welcome to Social Backend");
});

// Sync database
sequelize.sync()
    .then(() => console.log('📦 Database models synced'))
    .catch(err => console.error('❌ Sequelize sync error:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
