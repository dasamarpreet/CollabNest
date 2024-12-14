import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { createGroup } from "../services/groupService"; // API call service

const Dashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [memberEmails, setMemberEmails] = useState(""); // Comma-separated emails
    const [error, setError] = useState("");

    const handleCreateGroup = () => {
        setIsModalOpen(true);
        setError(""); // Reset errors
    };

    const handleSubmitGroup = async () => {
        if (!groupName || !memberEmails) {
            setError("Please enter a group name and at least one member email.");
            return;
        }

        const members = memberEmails.split(",").map((email) => email.trim());
        if (members.length < 1) {
            setError("Please provide at least one team member email.");
            return;
        }

        try {
            await createGroup({ name: groupName, members });
            alert("Group created successfully!");
            setIsModalOpen(false);
            setGroupName("");
            setMemberEmails("");
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create group.");
        }
    };

    const handleShowGroups = () => {
        navigate("/groups");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center pt-24">
            <img
                src="/dashboard_ad.png"
                alt="Welcome"
                className="w-auto h-64 mb-6"
            />
            <h1 className="text-2xl font-bold mb-4">Welcome to CollabNest</h1>
            <div className="space-x-4">
                <button
                    onClick={handleCreateGroup}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                >
                    <i className="fa fa-plus-circle mr-3"></i>New Group
                </button>
                <button
                    onClick={handleShowGroups}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    <i className="fa fa-users mr-3"></i>Show Groups
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitGroup}
            >
                <h2 className="text-xl font-bold mb-4">Create New Group</h2>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none mb-4"
                />
                <textarea
                    placeholder="Enter team member emails (comma-separated)"
                    value={memberEmails}
                    onChange={(e) => setMemberEmails(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </Modal>
        </div>
    );
};

export default Dashboard;
