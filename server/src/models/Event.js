const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    note: { type: String },
    files: [{ type: String }], // File URLs
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
