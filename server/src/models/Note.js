const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    content: { type: String, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Note", NoteSchema);
