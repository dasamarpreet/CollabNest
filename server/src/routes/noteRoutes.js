const express = require("express");
const { createNote, updateNote, deleteNote } = require("../controllers/noteController");
const router = express.Router();

router.post("/create", createNote);
router.put("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

module.exports = router;
