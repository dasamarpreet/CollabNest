import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/groupService";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getEventById(id);
                setEvent(response.data);
            } catch (error) {
                console.error("Failed to fetch event details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!event) {
        return <div className="flex justify-center items-center min-h-screen">Event not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
            <div className="mb-6">
                <h2 className="text-lg font-bold">Note</h2>
                <p>{event.note || "No note provided."}</p>
            </div>
            {event.files?.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold">Files</h2>
                    <ul>
                        {event.files.map((file, index) => (
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
    );
};

export default EventDetails;
