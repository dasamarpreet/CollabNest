import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ onNewGroupClick, isOpen }) => {
    return (
        <div
            className={`fixed top-16 left-0 h-[calc(100%-4rem)] bg-purple-600 text-white transition-transform duration-300 z-40 ${
                isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full"
            } w-64`}
        >
            <div className="p-4 text-lg font-bold">Menu</div>
            <nav className="mt-4">
                <NavLink
                    to="/dashboard"
                    className="block py-2.5 px-4 hover:bg-indigo-700 flex items-center"
                    activeClassName="bg-indigo-700"
                >
                    <i className="fa fa-home mr-3"></i> Dashboard
                </NavLink>
                <NavLink
                    to="/groups"
                    className="block py-2.5 px-4 hover:bg-indigo-700 flex items-center"
                    activeClassName="bg-indigo-700"
                >
                    <i className="fa fa-users mr-3"></i> Groups
                </NavLink>
                <button
                    onClick={onNewGroupClick}
                    className="w-full text-left py-2.5 px-4 hover:bg-indigo-700 flex items-center"
                >
                    <i className="fa fa-plus-circle mr-3"></i> New Group
                </button>
                <NavLink
                    to="/contact"
                    className="block py-2.5 px-4 hover:bg-indigo-700 flex items-center"
                    activeClassName="bg-indigo-700"
                >
                    <i className="fa fa-envelope mr-3"></i> Contact
                </NavLink>
                <NavLink
                    to="/about"
                    className="block py-2.5 px-4 hover:bg-indigo-700 flex items-center"
                    activeClassName="bg-indigo-700"
                >
                    <i className="fa fa-info-circle mr-3"></i> About Us
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
