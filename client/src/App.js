import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import { createGroup } from "./services/groupService";
import EventDetails from "./pages/EventDetails";
import Breadcrumbs from "./components/Breadcrumbs";
import Contact from "./pages/Contact";
import About from "./pages/About";

const App = () => {
    const { isLoggedIn } = useAuth(); // Access isLoggedIn from context
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar is closed by default
    const [isModalOpen, setIsModalOpen] = useState(false); // State for group creation popup
    const [groupName, setGroupName] = useState("");
    const [memberEmails, setMemberEmails] = useState(""); // Comma-separated emails
    const [error, setError] = useState("");

    // Handle New Group Popup
    const handleNewGroupClick = () => {
        setIsModalOpen(true);
        setError("");
    };

    // Handle Group Creation
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

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {isLoggedIn && <Header />}
                {isLoggedIn && (
                    <div className="relative">
                        <Breadcrumbs />
                    </div>
                )}
                <div className="flex flex-grow">
                    {isLoggedIn && (
                        <>
                            {/* Sidebar */}
                            <Sidebar
                                onNewGroupClick={handleNewGroupClick}
                                isOpen={isSidebarOpen}
                                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                            />

                            {/* Toggle Button */}
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className={`fixed top-20 z-50 bg-gray-800 text-white p-2 rounded-full transition-all duration-300 ${
                                    isSidebarOpen ? "left-[260px]" : "left-4"
                                }`}
                            >
                                <i
                                    className={`fa ${
                                        isSidebarOpen ? "fa-chevron-left" : "fa-chevron-right"
                                    }`}
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </>
                    )}
                    <div
                        className={`flex-grow ${
                            isSidebarOpen && isLoggedIn ? "lg:ml-64" : "ml-0"
                        } transition-all duration-300`}
                    >
                        <Routes>
                            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
                            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                            <Route path="/groups" element={<PrivateRoute><Groups /></PrivateRoute>} />
                            <Route path="/group/:id" element={<PrivateRoute><GroupDetails /></PrivateRoute>} />
                            <Route path="/event/:id" element={<EventDetails />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/logout" element={<Navigate to="/" replace />} />
                        </Routes>
                        {isLoggedIn && <Footer />}
                    </div>
                </div>

                {/* Modal for New Group */}
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
        </Router>
    );
};

export default App;
