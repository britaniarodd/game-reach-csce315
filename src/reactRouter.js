import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeadingBar from "./HeadingBar/headingBar";
import LandingPage from "./LandingPage/landingPage";
import LoginPage from "./LoginPage/loginPage";
import SignupPage from "./SignupPage/signupPage";
import DashboardPage from "./DashboardPage/dashboardPage";

export default function App() {
    return (
        <Router>
            <HeadingBar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </Router>
    );
}
