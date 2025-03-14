import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../components/Footer";

function ClaimCoupon() {
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
    const [message, setMessage] = useState("");
    const [coupon,setCoupon]=useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    
    const handleClaim = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/coupons/claim`, {}, { withCredentials: true });
            setMessage(response.data.message);
            setCoupon(response.data.coupon);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error claiming coupon");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Claim Your Coupon</h1>
            <button 
                onClick={handleClaim} 
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Claiming..." : "Claim Now"}
            </button>
            {message && <p className="mt-4 text-red-500 text-lg">{message}</p>}
            {coupon && <p className="mt-4 text-red-500 text-lg">Your Coupon is {coupon}</p>}

            <button 
                onClick={() => navigate("/admin")} 
                className="mt-6 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
            >
                Go to Admin Panel
            </button>
            <Footer />
        </div>
    );
}

export default ClaimCoupon;