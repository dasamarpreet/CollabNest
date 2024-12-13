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
            <h1 className="text-xl font-bold"><a href="/">CollabNest</a></h1>
            <nav>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 rounded hover:bg-gray-100"
                >
                    Dashboard
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 rounded hover:bg-gray-100"
                >
                    Contact
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 rounded hover:bg-gray-100"
                >
                    About Us
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded hover:bg-red-100 text-red-700"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default Header;
