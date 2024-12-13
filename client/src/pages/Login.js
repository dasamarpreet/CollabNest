import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const navigate = useNavigate();
    const { login: authLogin } = useAuth(); // Use login from AuthContext

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true); // Show loader
        if (isSignup) {
            try {
                const response = await signup(formData);
                alert(response.data.message);
                setIsSignup(false); // Switch to login form
            } catch (err) {
                if (err.response?.status === 400) {
                    setError(err.response.data.message);
                }
            } finally {
                setIsLoading(false); // Hide loader
            }
        } else {
            try {
                const response = await login({ email: formData.email, password: formData.password });
                authLogin(response.data.token); // Update global auth state
                // alert(response.data.message);
                navigate("/dashboard");
            } catch (err) {
                if (err.response?.status === 404) {
                    setError(err.response.data.message); // User does not exist
                } else if (err.response?.status === 400) {
                    setError(err.response.data.message); // Invalid credentials
                }
            } finally {
                setIsLoading(false); // Hide loader
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-center text-2xl font-bold mb-4">
                            {isSignup ? "Sign Up" : "Login"}
                        </h2>
                        <p className="block text-center text-blue-800 text-sm font-bold mb-2">
                            Hi, Welcome to CollabNest!
                        </p>
                        <form onSubmit={handleSubmit}>
                            {isSignup && (
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
                            )}
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
                                {isSignup ? "Sign Up" : "Login"}
                            </button>
                        </form>
                        <div className="mt-4 text-center">
                            <button
                                onClick={() => {
                                    setIsSignup(!isSignup);
                                    setError("");
                                }}
                                className="text-indigo-500 hover:underline"
                            >
                                {isSignup
                                    ? "Already have an account? Login"
                                    : "Don't have an account? Sign Up"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
