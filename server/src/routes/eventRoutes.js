const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth"); // Auth middleware
const Event = require("../models/Event"); // Event model
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Files stored in "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file naming
    },
});
const upload = multer({ storage });

/**
 * Route: POST /api/events/create
 * Description: Create a new event in a group
 * Access: Protected
 */
router.post("/create", auth, upload.array("files"), async (req, res) => {
    try {
        const { name, note, groupId } = req.body;

        if (!name || !groupId) {
            return res.status(400).json({ error: "Name and groupId are required." });
        }

        const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);

        const event = new Event({
            name,
            note,
            files: fileUrls,
            groupId,
        });

        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Failed to create event." });
    }
});

/**
 * Route: GET /api/events/:id
 * Description: Fetch event details by ID
 * Access: Protected
 */
router.get("/:id", auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Failed to fetch event." });
    }
});

module.exports = router;
