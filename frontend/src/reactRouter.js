import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeadingBar from "./HeadingBar/headingBar";
import LandingPage from "./LandingPage/landingPage";
import LoginPage from "./LoginPage/loginPage";
import SignupPage from "./SignupPage/signupPage";
import DashboardPage from "./DashboardPage/dashboardPage";
import ViewConnections from "./connections/ViewConnections/viewConnections";
import FindConnections from "./connections/FindConnections/findConnections";
import LeagueStatsPage from "./LeagueStatsPage/leagueStatsPage";
import ProfilePage from "./ProfilePage/profilePage";

export default function App() {
    return (
        <Router>
            <HeadingBar />
            
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/viewConnections" element={<ViewConnections />} />
                <Route path="/findConnections" element={<FindConnections />} />
                <Route path="/leaguestats" element={<LeagueStatsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}
