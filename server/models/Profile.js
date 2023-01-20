const { Schema, model, Types } = require("mongoose");
const User = require('./User');
const educationSchema = require('./Education');
const experienceSchema = require('./Experience');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: {
        type: String
    },
    github: {
        type: String
    },
    experiences: [experienceSchema],
    education: [educationSchema],
    socials: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
