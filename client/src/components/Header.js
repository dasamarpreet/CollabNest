import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // Clear global auth state
        navigate("/"); // Redirect to login
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white text-black py-4 px-6 flex justify-between items-center shadow-lg z-50">
            <h1 className="text-xl font-bold">
                <a href="/">CollabNest</a>
            </h1>
            <nav className="flex space-x-4">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 rounded hover:bg-gray-100 flex items-center"
                >
                    <i className="fa fa-home hidden sm:inline mr-2"></i> {/* Show text and icon on larger screens */}
                    <span className="hidden sm:inline">Dashboard</span> {/* Text only visible on larger screens */}
                    <i className="fa fa-home sm:hidden"></i> {/* Icon only visible on smaller screens */}
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 rounded hover:bg-gray-100 flex items-center"
                >
                    <i className="fa fa-envelope hidden sm:inline mr-2"></i>
                    <span className="hidden sm:inline">Contact</span>
                    <i className="fa fa-envelope sm:hidden"></i>
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 rounded hover:bg-gray-100 flex items-center"
                >
                    <i className="fa fa-info-circle hidden sm:inline mr-2"></i>
                    <span className="hidden sm:inline">About Us</span>
                    <i className="fa fa-info-circle sm:hidden"></i>
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded hover:bg-red-100 text-red-700 flex items-center"
                >
                    <i className="fa fa-sign-out hidden sm:inline mr-2"></i>
                    <span className="hidden sm:inline">Logout</span>
                    <i className="fa fa-sign-out sm:hidden"></i>
                </button>
            </nav>
        </header>
    );
};

export default Header;
