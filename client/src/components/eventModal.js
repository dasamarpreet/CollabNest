import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(); // Close modal when clicking on the background
        }
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackgroundClick} // Attach handler to background
        >
            <div className="bg-white rounded-lg w-full max-w-lg p-6 relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Modal;
