import {

    LayoutDashboard,

    FileText,

    Briefcase,

    FileSignature,

    LogOut,

} from "lucide-react";

import {

    NavLink,

} from "react-router-dom";

const Sidebar = () => {

    return (

        <div className="w-64 h-screen bg-white border-r">

            <div className="p-5">

                <h1 className="text-2xl font-bold">

                    CareerCopilot

                </h1>

            </div>

            <nav className="space-y-2 p-4">

                <NavLink to="/dashboard">

                    Dashboard

                </NavLink>

                <NavLink to="/resume">

                    Resume

                </NavLink>

                <NavLink to="/jobs">

                    Job Match

                </NavLink>

                <NavLink to="/cover-letter">

                    Cover Letter

                </NavLink>

            </nav>

        </div>

    );

};

export default Sidebar;