import React from "react";

const Modal = ({ isOpen, onClose, onSubmit, children }) => {
    if (!isOpen) return null;

    const handleOutsideClick = (e) => {
        if (e.target.id === "modal-container") {
            onClose();
        }
    };

    return (
        <div
            id="modal-container"
            onClick={handleOutsideClick}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    ×
                </button>
                {children}
                <button
                    onClick={onSubmit}
                    className="w-full bg-indigo-500 text-white py-2 rounded mt-4 hover:bg-indigo-600"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Modal;
