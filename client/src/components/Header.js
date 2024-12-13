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
        <header className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-xl font-bold">CollabNest</h1>
            <nav>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Dashboard
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default Header;
