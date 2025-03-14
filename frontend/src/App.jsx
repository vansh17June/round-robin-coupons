import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClaimCoupon from "./pages/ClaimCoupon";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ClaimCoupon />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
           
            </Routes>
        </Router>
    );
}

export default App;
