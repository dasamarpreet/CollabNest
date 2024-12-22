import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        if (isSignup) {
            try {
                const response = await signup(formData);
                alert(response.data.message);
                setIsSignup(false);
            } catch (err) {
                if (err.response?.status === 400) {
                    setError(err.response.data.message);
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            try {
                const response = await login({ email: formData.email, password: formData.password });
                authLogin(response.data.token);
                navigate("/dashboard");
            } catch (err) {
                if (err.response?.status === 404) {
                    setError(err.response.data.message);
                } else if (err.response?.status === 400) {
                    setError(err.response.data.message);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const toggleForm = () => {
        setIsSignup(!isSignup);
        setError(""); // Clear the error message when switching forms
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {/* Page Heading */}
            <h1 className="text-4xl font-bold text-gray-700 mb-6">Welcome to CollabNest</h1>

            {isLoading ? (
                // Bouncing Loader
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-400"></div>
                </div>
            ) : (
                <div className="relative w-[850px] h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Sign In Form */}
                    <div
                        className={`absolute top-0 left-0 w-[50%] h-full flex flex-col justify-center items-center transition-transform duration-700 ease-in-out ${
                            isSignup ? "translate-x-[-100%]" : "translate-x-0"
                        }`}
                    >
                        <form onSubmit={handleSubmit} className="w-full max-w-xs text-center">
                            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Sign Up Form */}
                    <div
                        className={`absolute top-0 left-[50%] w-[50%] h-full flex flex-col justify-center items-center transition-transform duration-700 ease-in-out ${
                            isSignup ? "translate-x-0" : "translate-x-[100%]"
                        }`}
                    >
                        <form onSubmit={handleSubmit} className="w-full max-w-xs text-center">
                            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>

                    {/* Overlay */}
                    <div
                        className="absolute top-0 left-[50%] w-[50%] h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                        style={{
                            zIndex: 30,
                            transition: "transform 0.6s ease-in-out",
                            transform: isSignup ? "translateX(-100%)" : "translateX(0)",
                        }}
                    >
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white">
                            <h1 className="text-xl text-center font-bold">Collaborate with your Colleagues!</h1>
                        </div>
                        <div className="h-full flex flex-col justify-center items-center text-white px-8">
                            <h1 className="text-2xl font-bold mb-4">
                                {isSignup ? "Hello, Friend!" : "Welcome Back!"}
                            </h1>
                            <p className="text-sm mb-4">
                                {isSignup
                                    ? "Enter your details and join us today!"
                                    : "To stay connected with us, please sign in."}
                            </p>
                            <p className="text-sm mb-4">
                                {isSignup
                                    ? "Already a member?"
                                    : "Don't Have an Account?."}
                            </p>
                            <button
                                onClick={toggleForm}
                                className="bg-white text-indigo-500 font-bold py-2 px-6 rounded hover:bg-gray-200"
                            >
                                {isSignup ? "Sign In" : "Sign Up"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
