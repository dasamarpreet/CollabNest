import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current path
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // Clear global auth state
        navigate("/"); // Redirect to login
    };

    const isActive = (path) => location.pathname === path; // Check if the current path matches the button path

    return (
        <header className="fixed top-0 left-0 w-full bg-white text-black py-4 px-6 flex justify-between items-center shadow-lg z-50">
            <h1 className="text-xl font-bold">
                <a href="/">CollabNest</a>
            </h1>
            <nav className="flex space-x-4">
                <button
                    onClick={() => navigate("/dashboard")}
                    className={`px-4 py-2 rounded flex items-center ${
                        isActive("/dashboard") ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                    }`}
                >
                    <i className={`fa fa-home hidden sm:inline mr-2`}></i>
                    <span className="hidden sm:inline">Dashboard</span>
                    <i className="fa fa-home sm:hidden"></i>
                </button>
                <button
                    onClick={() => navigate("/contact")}
                    className={`px-4 py-2 rounded flex items-center ${
                        isActive("/contact") ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                    }`}
                >
                    <i className="fa fa-envelope hidden sm:inline mr-2"></i>
                    <span className="hidden sm:inline">Contact</span>
                    <i className="fa fa-envelope sm:hidden"></i>
                </button>
                <button
                    onClick={() => navigate("/about")}
                    className={`px-4 py-2 rounded flex items-center ${
                        isActive("/about") ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                    }`}
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
