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

async function deleteProfileExperience(req, res) {
  try {
    const userProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { experiences: req.params.expId } },
      { new: true }
    );
    res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function addProfileEducation(req, res) {
    try {
      const userProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $addToSet: { education: req.body } },
        { new: true }
      );
  
      res.status(200).json(userProfile);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
  
  async function deleteProfileEducation(req, res) {
    try {
      const userProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $pull: { education: req.params.eduId } },
        { new: true }
      );
      res.status(200).json(userProfile);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async function getGitHubRepos(req, res) {
    try {
        const response = fetch(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUBCLIENTID}&client_secret=${process.env.GITHUBCLIENTSECRET}`, {
            headers: {
                'user-agent': 'node.js'
            }
        });
        await response.json();
        res.status(200).json(response);
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
  addProfileExperience,
  deleteProfileExperience,
  addProfileEducation,
  deleteProfileEducation,
  getGitHubRepos
};
