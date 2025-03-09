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
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ message: "Login successful!", token });
};
