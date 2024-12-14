import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <div className="py-3 bg-gray-100 flex justify-center mt-20">
            <nav className="text-gray-600 text-sm">
                <ol className="list-none flex space-x-2">
                    <li>
                        <Link to="/" className="text-indigo-500 hover:underline">
                            Home
                        </Link>
                    </li>
                    {pathnames.map((value, index) => {
                        // Handle specific replacement for "group" -> "groups"
                        const displayValue = value === "group" ? "Groups" : value;
                        const to =
                            value === "group"
                                ? "/groups"
                                : `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        return (
                            <li key={to} className="flex space-x-2">
                                <span>/</span>
                                {isLast ? (
                                    <span>
                                        {displayValue.charAt(0).toUpperCase() +
                                            displayValue.slice(1)}
                                    </span>
                                ) : (
                                    <Link to={to} className="text-indigo-500 hover:underline">
                                        {displayValue.charAt(0).toUpperCase() +
                                            displayValue.slice(1)}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
