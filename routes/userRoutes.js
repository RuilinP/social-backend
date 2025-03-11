const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const router = express.Router();

// Get current logged-in user profile
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'name', 'email', 'profile_picture'] 
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Update user profile
router.put('/:id', authMiddleware, async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.update(req.body);
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
