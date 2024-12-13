import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ onNewGroupClick, isOpen }) => {
    return (
        <div
            className={`fixed top-16 left-0 h-[calc(100%-4rem)] bg-indigo-600 text-white transition-transform duration-300 z-40 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } w-64`}
        >
            <div className="p-4 text-lg font-bold">Menu</div>
            <nav className="mt-4">
                <NavLink
                    to="/dashboard"
                    className="block py-2.5 px-4 hover:bg-indigo-700"
                    activeClassName="bg-indigo-700"
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/groups"
                    className="block py-2.5 px-4 hover:bg-indigo-700"
                    activeClassName="bg-indigo-700"
                >
                    Groups
                </NavLink>
                <button
                    onClick={onNewGroupClick}
                    className="w-full text-left py-2.5 px-4 hover:bg-indigo-700"
                >
                    New Group
                </button>
                <NavLink
                    to="/"
                    className="block py-2.5 px-4 hover:bg-indigo-700"
                    activeClassName="bg-indigo-700"
                >
                    Contact
                </NavLink>
                <NavLink
                    to="/"
                    className="block py-2.5 px-4 hover:bg-indigo-700"
                    activeClassName="bg-indigo-700"
                >
                    About Us
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
