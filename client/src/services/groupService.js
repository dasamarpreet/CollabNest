import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const getGroups = () => API.get("/groups"); // Fetch groups
export const createGroup = (groupData) => API.post("/groups/create", groupData); // Create new group
export const getGroupById = (id) => API.get(`/groups/${id}`); // Fetch group details by ID

// Create a new event
export const createEvent = (formData) => {
    return API.post("/events/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Fetch event details by ID
export const getEventById = (id) => {
    return API.get(`/events/${id}`);
};