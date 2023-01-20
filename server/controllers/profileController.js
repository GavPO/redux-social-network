const Profile = require('../models/Profile');
const User = require('../models/User');

async function getProfile(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['username', 'avatar']);
        if(!profile) return res.status(400).json({ message: "No Profile found for this User!" });

        res.status(200).json(profile)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getProfile,
}