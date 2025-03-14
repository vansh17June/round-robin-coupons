import React, { useEffect, useState } from "react";
import axios from "axios";

import Footer from "../components/Footer";

function AdminDashboard() {
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://round-robin-coupons.onrender.com/api/admin/coupons`, { withCredentials: true });
            setCoupons(response.data);
        } catch (error) {
            console.error("Error fetching coupons", error);
        }
        setLoading(false);
    };

    const handleAddCoupon = async () => {
        if (!newCoupon) return;
        try {
            await axios.post(`https://round-robin-coupons.onrender.com/api/admin/add`, { code: newCoupon }, { withCredentials: true });
            setNewCoupon("");
            fetchCoupons();
        } catch (error) {
            console.error("Error adding coupon", error);
        }
    };

    const handleDeleteCoupon = async (code) => {
        try {
            await axios.delete(`https://round-robin-coupons.onrender.com/api/admin/delete/${code}`, { withCredentials: true });
            fetchCoupons();
        } catch (error) {
            console.error("Error deleting coupon", error);
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
            <div className="flex justify-center gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Enter coupon code" 
                    value={newCoupon} 
                    onChange={(e) => setNewCoupon(e.target.value)} 
                    className="border px-4 py-3 w-80 text-lg rounded-lg"
                />
                <button 
                    onClick={handleAddCoupon} 
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                >
                    Add Coupon
                </button>
            </div>
            {loading ? <p className="text-center text-lg">Loading coupons...</p> : (
                <table className="w-full border text-lg bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="border px-6 py-3">Coupon Code</th>
                            <th className="border px-6 py-3">Claimed</th>
                            <th className="border px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon._id} className="border-b text-center">
                                <td className="border px-6 py-3">{coupon.code}</td>
                                <td className="border px-6 py-3">{coupon.claimed ? "Yes" : "No"}</td>
                                <td className="border px-6 py-3">
                                    <button 
                                        onClick={() => handleDeleteCoupon(coupon.code)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Footer />
        </div>
    );
}

export default AdminDashboard;
