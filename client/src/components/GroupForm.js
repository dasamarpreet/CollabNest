import React, { useState } from "react";
import { createGroup } from "../services/groupService";

const GroupForm = ({ onGroupCreated }) => {
    const [groupName, setGroupName] = useState("");
    const [members, setMembers] = useState(""); // Comma-separated emails

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const memberEmails = members.split(",").map((email) => email.trim());
            const response = await createGroup({ name: groupName, members: memberEmails });
            onGroupCreated(response.data); // Notify parent component
            setGroupName("");
            setMembers("");
        } catch (err) {
            console.error("Error creating group:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Create Group</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Group Name</label>
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Members (emails)</label>
                <input
                    type="text"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                    placeholder="Enter emails, separated by commas"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
            >
                Create Group
            </button>
        </form>
    );
};

export default GroupForm;
