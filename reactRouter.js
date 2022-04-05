import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeadingBar from "./HeadingBar/headingBar";
import LandingPage from "./LandingPage/landingPage";
import LoginPage from "./LoginPage/loginPage";
import SignupPage from "./SignupPage/signupPage";
import DashboardPage from "./DashboardPage/dashboardPage";
import NavigationBar from "./NavigationBar/navBar";
import ViewConnectionsPage from "./ViewConnections/viewConnectionsPage";
import FindConnectionsPage from "./FindConnections/findConnectionsPage";
import LeagueStatsPage from "./src/LeagueStatsPage/leagueStatsPage";

export default function App() {
    return (
        <Router>
            <HeadingBar />
            
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/viewConnections" element={<ViewConnectionsPage />} />
                <Route path="/findConnections" element={<FindConnectionsPage />} />
                <Route path="/leaguestatistics" element={<LeagueStatsPage />} />
            </Routes>
        </Router>
    );
}
