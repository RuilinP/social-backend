const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.googleAuthCallback = async (req, res) => {
    const { id, displayName, emails, photos } = req.user;
    const email = emails[0].value;
    const profile_picture = photos[0].value;

    let user = await User.findOne({ where: { id } });

    if (!user) {
        user = await User.create({
            id,
            name: displayName,
            email,
            profile_picture
        });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "f27de97969c2e64b0f56efb8e5c79060b216b56b693a3837bc69e689ab912345",
        { expiresIn: '1h' }
    );

    // Instead of returning JSON, redirect with token in URL
    res.redirect(`http://frontend:80?token=${token}`);
};

