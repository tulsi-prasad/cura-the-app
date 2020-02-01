const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Profile = require("../models/Profile");

// @route       GET api/profile
// @desc        Get all users profiles
// @access      Private

router.get("/", auth, async (req, res) => {
    try {
        const profile = await Profile.find({ user: req.user.email });
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// @route       POST api/profile
// @desc        POST required details
// @access      Private

router.post(
    "/",
    [
        auth,
        [
            check("name", "Enter your name")
                .not()
                .isEmpty(),
            check("email", "Enter your email id").isEmail(),
            check("age", "Enter your age in number").isNumeric(),
            check("socialMedia", "Enter any social media links").isURL(),
            check("phone", "Enter a phone number").isMobilePhone()
        ]
    ],
    async (req, res) => {
        // res.send("Add contact");

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, age, socialMedia, phone } = req.body;

            let profile = new Profile({
                name,
                email,
                age,
                socialMedia,
                phone
            });

            profile = await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
