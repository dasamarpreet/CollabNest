import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupById, createEvent, getEventById } from "../services/groupService"; // API calls
import Modal from "../components/eventModal";

const GroupDetails = () => {
    const { id } = useParams(); // Group ID from URL
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]); // List of events
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // Current event to view
    const [eventName, setEventName] = useState("");
    const [eventNote, setEventNote] = useState("");
    const [eventFiles, setEventFiles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await getGroupById(id);
                setGroup(response.data);
                setEvents(response.data.events || []);
            } catch (error) {
                console.error("Failed to fetch group details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [id]);

    const handleFileChange = (e) => {
        setEventFiles(e.target.files);
    };

    const handleSaveEvent = async () => {
        if (!eventName.trim() || (!eventNote.trim() && eventFiles.length === 0)) {
            setError("Please provide a name and either a note or at least one file.");
            return;
        }
        setError("");

        const formData = new FormData();
        formData.append("name", eventName.trim());
        formData.append("note", eventNote.trim());
        formData.append("groupId", id);
        Array.from(eventFiles).forEach((file) => formData.append("files", file));

        try {
            const response = await createEvent(formData); // Save event in DB
            setEvents([...events, response.data]);
            setIsAddModalOpen(false);
            setEventName("");
            setEventNote("");
            setEventFiles([]);
        } catch (error) {
            console.error("Failed to save event:", error);
            setError("Failed to save event. Please try again.");
        }
    };

    const handleViewEvent = async (eventId) => {
        try {
            const response = await getEventById(eventId);
            setSelectedEvent(response.data);
            setIsViewModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch event details:", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen pt-16">Loading...</div>;
    }

    if (!group) {
        return <div className="flex justify-center items-center min-h-screen pt-16">Group not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 pl-14">
            <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
            <p className="text-gray-600 mb-2">Created by: {group.createdBy.name}</p>
            <p className="text-gray-600 mb-2">Total Members: {group.members.length}</p>
            <h2 className="text-lg font-bold mt-4 mb-2">Members</h2>
            <ul className="list-disc pl-6">
                {group.members.map((member) => (
                    <li key={member._id}>{member.email}</li>
                ))}
            </ul>

            {/* Common Space Section */}
            <h2 className="text-lg font-bold mt-6 mb-4">Common Space</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="bg-white p-4 shadow rounded hover:shadow-lg cursor-pointer"
                        onClick={() => handleViewEvent(event._id)}
                    >
                        <h3 className="text-lg font-bold">{event.name}</h3>
                        {event.note && <p className="text-gray-600 mt-2">{event.note.slice(0, 50)}...</p>}
                        {event.files?.length > 0 && (
                            <p className="text-gray-500 text-sm mt-2">{event.files.length} file(s) attached</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Floating Add Button */}
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="fixed bottom-8 right-8 bg-indigo-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-600"
            >
                <i className="fa fa-plus text-xl"></i>
            </button>

            {/* Add Event Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Add Event</h2>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <input
                        type="text"
                        placeholder="Event Name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none mb-4"
                    />
                    <label className="block text-gray-700 text-sm mb-2">Add Note</label>
                    <textarea
                        value={eventNote}
                        onChange={(e) => setEventNote(e.target.value)}
                        placeholder="Write your note here..."
                        className="w-full h-32 px-3 py-2 border rounded focus:outline-none"
                    ></textarea>
                    <label className="block text-gray-700 text-sm mt-4 mb-2">Attach Files</label>
                    <input type="file" multiple onChange={handleFileChange} />
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-4"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveEvent}
                            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>

            {/* View Event Modal */}
            <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
                {selectedEvent && (
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-4">{selectedEvent.name}</h2>
                        <div className="max-h-64 overflow-y-auto mb-6">
                            <p>{selectedEvent.note || "No note provided."}</p>
                        </div>
                        {selectedEvent.files?.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-bold">Attachments</h3>
                                <ul>
                                    {selectedEvent.files.map((file, index) => (
                                        <li key={index}>
                                            <a href={file} target="_blank" rel="noopener noreferrer">
                                                {file.split("/").pop()}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default GroupDetails;
