import React, { useEffect, useState } from "react";
import { getGroups } from "../services/groupService"; // API call service
import { useNavigate } from "react-router-dom";

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await getGroups();
                setGroups(response.data);
            } catch (error) {
                console.error("Failed to fetch groups:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    const handleGroupClick = (groupId) => {
        navigate(`/group/${groupId}`); // Navigate to group details page
    };

    if (loading) {
        // return <div className="flex justify-center items-center min-h-screen pt-16">Loading...</div>;
        return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-400"></div>
                    </div>
                </div>
                );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 pl-14">
            <h1 className="text-2xl font-bold mb-4">My Groups</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <div
                        key={group._id}
                        onClick={() => handleGroupClick(group._id)}
                        className="p-4 bg-white shadow-md rounded-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                        <h2 className="text-xl font-bold">{group.name}</h2>
                        <p className="text-gray-600">Created by: {group.createdBy.name}</p>
                        <p className="text-gray-500">Members: {group.members.length}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Groups;
