import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../services/groupService"; // API call service

const GroupDetails = () => {
    const { id } = useParams(); // Get group ID from URL
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await getGroupById(id);
                setGroup(response.data);
            } catch (error) {
                console.error("Failed to fetch group details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!group) {
        return <div className="flex justify-center items-center min-h-screen">Group not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
            <p className="text-gray-600 mb-2">Created by: {group.createdBy.name}</p>
            <p className="text-gray-600 mb-2">Total Members: {group.members.length}</p>
            <h2 className="text-lg font-bold mt-4 mb-2">Members</h2>
            <ul className="list-disc pl-6">
                {group.members.map((member) => (
                    <li key={member._id}>{member.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default GroupDetails;
