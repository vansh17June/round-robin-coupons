import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

    const handleLogin = async () => {
        setLoading(true);
        try {
            await axios.post(`https://round-robin-coupons.onrender.com/api/admin/login`, { username, password }, { withCredentials: true });
            navigate("/dashboard");
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
            <input 
                type="text" 
                placeholder="Username" 
                className="border px-4 py-3 mb-3 w-80 text-lg" 
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                className="border px-4 py-3 mb-3 w-80 text-lg" 
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                onClick={handleLogin} 
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                disabled={loading}
            >
               {loading ? "Logging in..." : "Login"}
            </button>
           
            {message && <p className="mt-4 text-red-500 text-lg">{message}</p>}
            <Footer />
        </div>
    );
}

export default AdminLogin;
