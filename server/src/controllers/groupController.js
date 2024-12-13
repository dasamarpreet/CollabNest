const Group = require("../models/Group");
const User = require("../models/User");

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.userId }).populate("createdBy", "name");
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch groups." });
    }
};

exports.createGroup = async (req, res) => {
    const { name, members } = req.body;

    if (!name || !members || members.length < 1) {
        return res.status(400).json({ message: "A group must have a name and at least one member." });
    }

    try {
        // Validate if members exist in the database
        const validMembers = await User.find({ email: { $in: members } });
        if (validMembers.length !== members.length) {
            return res.status(400).json({ message: "One or more emails do not exist in the system." });
        }

        // Include the creator in the group
        const memberIds = validMembers.map((user) => user._id);
        memberIds.push(req.userId);

        const group = await Group.create({
            name,
            members: memberIds,
            createdBy: req.userId,
        });

        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ message: "Failed to create group." });
    }
};

exports.getGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const group = await Group.findById(id)
            .populate("createdBy", "name email")
            .populate("members", "name email");
        if (!group) {
            return res.status(404).json({ message: "Group not found." });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch group details." });
    }
};
