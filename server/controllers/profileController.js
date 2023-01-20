const Profile = require("../models/Profile");
const User = require("../models/User");

async function getAllProfiles(req, res) {
  try {
    const allProfiles = await Profile.find().populate("user", [
      "username",
      "avatar",
    ]);
    res.status(200).json(allProfiles);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function getProfile(req, res) {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["username", "avatar"]
    );
    if (!profile)
      return res
        .status(400)
        .json({ message: "No Profile found for this User!" });

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function getProfileById(req, res) {
  try {
    const singleProfile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["username", "avatar"]);
    res.status(200).json(singleProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function createProfile(req, res) {
  try {
    const profileFields = { ...req.body };
    profileFields.skills = req.body.skills
      .split(",")
      .map((skill) => skill.trim());
    const newProfile = await Profile.create(profileFields);
    res.status(200).json(newProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function updateProfile(req, res) {
  try {
    const profileFields = { ...req.body };
    profileFields.skills = req.body.skills
      .split(",")
      .map((skill) => skill.trim());
    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function addProfileExperience(req, res) {
  try {
    const userProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $addToSet: { experiences: req.body } },
      { new: true }
    );

    res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getAllProfiles,
  getProfile,
  getProfileById,
  createProfile,
  updateProfile,
  addProfileExperience
};
