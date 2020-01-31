const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const Event = require("../models/Event");

// @route       GET api/events
// @desc        Get all the events
// @access      Public

router.get("/", async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.id }).sort({
            date: -1
        });
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// @route       POST api/events
// @desc        Post a new event to directory
// @access      Private

router.post(
    "/",
    [
        check("eventName", "Name of event is required")
            .not()
            .isEmpty(),
        check("eventDesc", "Description of event is required")
            .not()
            .isEmpty(),
        check("toDonate", "Type of object being donated")
            .not()
            .isEmpty(),
        check("donorName", "Enter the name of donor")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            eventName,
            eventDesc,
            toDonate,
            donationAmt,
            donorName,
            donorFeedback,
            date
        } = req.body;

        try {
            const newEvent = new Event({
                eventName,
                eventDesc,
                toDonate,
                donationAmt,
                donorName,
                donorFeedback,
                date
            });

            const event = await newEvent.save();

            res.json(event);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
