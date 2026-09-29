import { Routes, Route } from "react-router-dom";
import Interview from "../pages/Interview/Interview";

// Layouts
import DashboardLayout from "../layouts/DashboardLayout";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Resume from "../pages/Resume/Resume";
import JobMatch from "../pages/JobMatch/JobMatch";
import CoverLetter from "../pages/CoverLetter/CoverLetter";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Routes */}

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/resume"
                    element={<Resume />}
                />

                <Route
                    path="/jobs"
                    element={<JobMatch />}
                />

                <Route
                   path="/interview"
                   element={<Interview />}
                />

                <Route
                    path="/cover-letter"
                    element={<CoverLetter />}
                />

            </Route>

            {/* 404 */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
};

export default AppRoutes;